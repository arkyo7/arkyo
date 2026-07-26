export const company = {
  name: "Arkyo",
  tagline: "Sites que simplificam negócios.",
  countryCode: "BE",
  founded: 2024,
};

export const contact = {
  whatsapp: "+32 470 74 32 58",
  whatsappUrl: "https://wa.me/32470743258",
  instagram: "@arkyo.co",
  instagramUrl: "https://instagram.com/arkyo.co",
  email: "hello.arkyo@gmail.com",
  emailUrl: "mailto:hello.arkyo@gmail.com",
  phoneE164: "+32470743258",
  phoneUrl: "tel:+32470743258",
};

/**
 * Canonical public URL of the site. Set VITE_SITE_URL once the final domain is
 * live (e.g. https://arkyo.com). While it is empty the project falls back to
 * relative URLs, which crawlers resolve against the current host.
 */
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "").replace(/\/+$/, "");

/** Absolute URL when SITE_URL is configured, relative path otherwise. */
export function siteUrl(path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return SITE_URL ? `${SITE_URL}${clean}` : clean;
}

/**
 * Fixed revision date of the legal documents (Terms / Privacy Policy).
 * Change it manually whenever the legal texts are actually revised.
 */
export const LEGAL_UPDATED_AT = "2026-01-15";

const LEGAL_LOCALES: Record<string, string> = { pt: "pt-BR", en: "en-GB", fr: "fr-BE" };

/** Formats the fixed legal revision date for the active language. */
export function legalUpdatedLabel(language?: string) {
  const locale = LEGAL_LOCALES[(language ?? "pt").slice(0, 2)] ?? "pt-BR";
  const [year, month, day] = LEGAL_UPDATED_AT.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}


export const navItems = [
  { key: "services", hash: "servicos" },
  { key: "process", hash: "processo" },
  { key: "portfolio", hash: "portfolio" },
  { key: "plans", hash: "planos" },
  { key: "faq", hash: "faq" },
] as const;

