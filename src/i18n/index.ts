import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pt from "./locales/pt.json";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

export const LANGS = ["pt", "en", "fr"] as const;
export type Lang = (typeof LANGS)[number];

export const languageMeta: Record<Lang, { label: string; flag: string }> = {
  pt: { label: "Português", flag: "🇧🇷" },
  en: { label: "English", flag: "🇬🇧" },
  fr: { label: "Français", flag: "🇫🇷" },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      fr: { translation: fr },
    },
    // SSR and the first client render must agree, so boot is always "pt".
    // The visitor's stored/browser language is applied after hydration by
    // syncDetectedLanguage() to avoid a hydration text mismatch.
    lng: "pt",
    fallbackLng: "pt",
    supportedLngs: LANGS as unknown as string[],
    interpolation: { escapeValue: false },
    returnObjects: true,
  });
}

export default i18n;

/**
 * Applies the stored (or browser) language after hydration. Safe to call
 * multiple times: it is a no-op when the language already matches.
 */
export const LANG_STORAGE_KEY = "arkyo-lang";

let persistBound = false;

export function syncDetectedLanguage() {
  if (typeof window === "undefined") return;
  const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
  const candidate = (stored ?? window.navigator.language ?? "pt").slice(0, 2).toLowerCase();
  const next = (LANGS as readonly string[]).includes(candidate) ? candidate : "pt";
  if (!persistBound) {
    persistBound = true;
    // Persist the visitor's choice (detection caching used to do this).
    i18n.on("languageChanged", (lng) => {
      try {
        window.localStorage.setItem(LANG_STORAGE_KEY, lng);
      } catch {
        /* storage unavailable: language still applies for this session */
      }
    });
  }
  if (i18n.resolvedLanguage !== next) void i18n.changeLanguage(next);
}
