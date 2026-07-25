import { useTranslation } from "react-i18next";
import { Logo } from "./Logo";
import { contact, company, navItems } from "@/data/company";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-arkyo py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">{t("footer.description")}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t("footer.nav")}
            </p>
            <ul className="mt-4 space-y-2">
              {navItems.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm text-foreground hover:text-muted-foreground">
                    {t(`nav.${n.key}`)}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contato" className="text-sm text-foreground hover:text-muted-foreground">
                  {t("nav.contact")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t("footer.contact")}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href={contact.whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-muted-foreground">WhatsApp</a></li>
              <li><a href={contact.emailUrl} className="hover:text-muted-foreground">{contact.email}</a></li>
              <li><a href={contact.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-muted-foreground">{contact.instagram}</a></li>
              <li className="text-muted-foreground">{t("footer.country")}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {company.name}. {t("footer.rights")}</p>
          <div className="flex gap-6">
            <a href="/privacidade" className="hover:text-foreground">{t("footer.privacy")}</a>
            <a href="/termos" className="hover:text-foreground">{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
