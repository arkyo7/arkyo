import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { siteUrl } from "@/data/company";

type SeoLocalizedProps = {
  /** i18n namespace under "seo" (home | privacy | terms). */
  page: "home" | "privacy" | "terms";
  /** Route path, used for canonical / og:url. */
  path: string;
};

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Keeps title, description and Open Graph tags in sync with the active
 * language. The route head() still ships the default (PT) tags for crawlers.
 */
export function SeoLocalized({ page, path }: SeoLocalizedProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage ?? "pt";

  useEffect(() => {
    if (typeof document === "undefined") return;
    const title = t(`seo.${page}.title`);
    const description = t(`seo.${page}.description`);
    const ogDescription = t(`seo.${page}.ogDescription`, { defaultValue: description });
    const url = typeof window !== "undefined" ? new URL(path, window.location.origin).href : siteUrl(path);

    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", ogDescription);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:locale"]', "property", "og:locale", lang);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", ogDescription);
    setLink("canonical", url);
  }, [t, lang, page, path]);

  return null;
}
