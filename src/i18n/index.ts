import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
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
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
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
      detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        caches: ["localStorage"],
        lookupLocalStorage: "arkyo-lang",
      },
      returnObjects: true,
    });
}

export default i18n;

/**
 * Applies the stored (or browser) language after hydration. Safe to call
 * multiple times: it is a no-op when the language already matches.
 */
export function syncDetectedLanguage() {
  if (typeof window === "undefined") return;
  const stored = window.localStorage.getItem("arkyo-lang");
  const candidate = (stored ?? window.navigator.language ?? "pt").slice(0, 2).toLowerCase();
  const next = (LANGS as readonly string[]).includes(candidate) ? candidate : "pt";
  if (i18n.resolvedLanguage !== next) void i18n.changeLanguage(next);
}
