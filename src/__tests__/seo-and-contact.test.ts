import { describe, expect, it } from "vitest";
import { SITE_URL, contact, siteUrl, whatsappUrl, legalUpdatedLabel } from "@/data/company";

describe("site url", () => {
  it("is absolute and points at the planned production domain", () => {
    expect(SITE_URL).toBe("https://arkyo.co");
    expect(siteUrl("/")).toBe("https://arkyo.co/");
    expect(siteUrl("/privacidade")).toBe("https://arkyo.co/privacidade");
  });

  it("never references the old .com domain", () => {
    expect(siteUrl("/termos")).not.toContain("arkyo.com/");
  });
});

describe("whatsapp link", () => {
  it("uses the official commercial number", () => {
    expect(whatsappUrl()).toBe("https://wa.me/32451036953");
    expect(contact.phoneE164).toBe("+32451036953");
  });

  it("encodes the localized message without sending it", () => {
    expect(whatsappUrl("Olá Arkyo, tudo bem?")).toBe(
      "https://wa.me/32451036953?text=Ol%C3%A1%20Arkyo%2C%20tudo%20bem%3F",
    );
  });
});

describe("legal revision date", () => {
  it("is fixed and localized", () => {
    expect(legalUpdatedLabel("pt")).toContain("2026");
    expect(legalUpdatedLabel("en")).toContain("2026");
    expect(legalUpdatedLabel("fr")).toContain("2026");
  });
});
