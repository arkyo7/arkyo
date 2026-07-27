export const company = {
  name: "Arkyo",
  tagline: "Sites que simplificam negócios.",
  countryCode: "BE",
  founded: 2024,
};

/** Single source of truth for every public Arkyo contact channel. */
export const contact = {
  whatsapp: "+32 451 03 69 53",
  whatsappDigits: "32451036953",
  whatsappUrl: "https://wa.me/32451036953",
  instagram: "@arkyo.co",
  instagramUrl: "https://instagram.com/arkyo.co",
  email: "hello.arkyo@gmail.com",
  emailUrl: "mailto:hello.arkyo@gmail.com",
  phoneE164: "+32451036953",
  phoneUrl: "tel:+32451036953",
};

/**
 * Builds the WhatsApp link. The optional message is pre-filled in the chat and
 * stays editable by the visitor; nothing is sent automatically.
 */
export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${contact.whatsappDigits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

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
