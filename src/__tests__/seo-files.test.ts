import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import pt from "@/i18n/locales/pt.json";
import en from "@/i18n/locales/en.json";
import fr from "@/i18n/locales/fr.json";

const locales = { pt, en, fr } as Record<string, any>;

describe("multilingual metadata", () => {
  for (const [lang, dict] of Object.entries(locales)) {
    it(`${lang} has title + description for every page`, () => {
      for (const page of ["home", "privacy", "terms"]) {
        expect(dict.seo[page].title.length).toBeGreaterThan(10);
        expect(dict.seo[page].title.length).toBeLessThan(70);
        expect(dict.seo[page].description.length).toBeGreaterThan(50);
        expect(dict.seo[page].description).toBeTruthy();
      }
    });
  }
});

describe("robots.txt", () => {
  const robots = readFileSync("public/robots.txt", "utf8");

  it("allows crawling and advertises the sitemap on the planned domain", () => {
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain("Sitemap: https://arkyo.co/sitemap.xml");
  });

  it("does not reference arkyo.com", () => {
    expect(robots).not.toMatch(/arkyo\.com/);
  });
});

describe("sitemap route", () => {
  const src = readFileSync("src/routes/sitemap[.]xml.ts", "utf8");

  it("uses the shared configurable base url", () => {
    expect(src).toContain("SITE_URL");
    expect(src).not.toContain('const BASE_URL = ""');
  });

  it("lists only public pages", () => {
    expect(src).toContain('path: "/"');
    expect(src).toContain('path: "/privacidade"');
    expect(src).toContain('path: "/termos"');
    expect(src).not.toMatch(/admin/i);
  });
});

describe("root metadata", () => {
  const root = readFileSync("src/routes/__root.tsx", "utf8");

  it("has no invalid twitter:site handle", () => {
    expect(root).not.toContain("twitter:site");
  });
});
