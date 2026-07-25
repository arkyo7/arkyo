import { Logo } from "./Logo";
import { contact, company, nav } from "@/data/company";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-arkyo py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              {company.description}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Navegação
            </p>
            <ul className="mt-4 space-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm text-foreground hover:text-muted-foreground">
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contato" className="text-sm text-foreground hover:text-muted-foreground">
                  Contato
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Contato
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href={contact.whatsappUrl} className="hover:text-muted-foreground">WhatsApp</a></li>
              <li><a href={contact.emailUrl} className="hover:text-muted-foreground">{contact.email}</a></li>
              <li><a href={contact.instagramUrl} className="hover:text-muted-foreground">{contact.instagram}</a></li>
              <li className="text-muted-foreground">{company.country}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {company.name}. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="/privacidade" className="hover:text-foreground">Política de Privacidade</a>
            <a href="/termos" className="hover:text-foreground">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
