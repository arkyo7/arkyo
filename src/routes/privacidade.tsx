import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { contact, company, legalUpdatedLabel } from "@/data/company";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Arkyo" },
      { name: "description", content: "Como a Arkyo coleta, utiliza e protege seus dados pessoais em conformidade com o GDPR." },
      { property: "og:title", content: "Política de Privacidade — Arkyo" },
      { property: "og:description", content: "Como tratamos seus dados em conformidade com o GDPR." },
      { property: "og:url", content: "/privacidade" },
    ],
    links: [{ rel: "canonical", href: "/privacidade" }],
  }),
  component: Privacidade,
});

function Privacidade() {
  const { t, i18n } = useTranslation();
  const country = t("footer.country");
  const email = <a href={contact.emailUrl} className="underline">{contact.email}</a>;

  const section = (key: string) => t(`legal.privacy.sections.${key}`, { returnObjects: true }) as {
    title: string;
    body?: string;
    intro?: string;
    items?: string[];
  };

  const who = section("who");
  const data = section("data");
  const purpose = section("purpose");
  const legal = section("legal");
  const share = section("share");
  const retention = section("retention");
  const rights = section("rights");
  const cookies = section("cookies");
  const contactSec = section("contact");

  const whoBody = who.body!
    .replace("{{company}}", company.name)
    .replace("{{country}}", country);

  const rightsBody = rights.body!.replace("{{email}}", contact.email);
  const contactBody = contactSec.body!.replace("{{email}}", contact.email);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-24">
        <div className="container-arkyo max-w-3xl">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> {t("legal.back")}
          </Link>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            {t("legal.privacy.title")}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {t("legal.lastUpdate")} {legalUpdatedLabel(i18n.resolvedLanguage)}
          </p>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-foreground">
            <Section title={who.title}>
              <p className="text-muted-foreground">
                {whoBody.split(contact.email)[0]}
                {email}
                {whoBody.split(contact.email)[1] ?? "."}
              </p>
            </Section>
            <Section title={data.title}>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                {data.items!.map((li) => <li key={li}>{li}</li>)}
              </ul>
            </Section>
            <Section title={purpose.title}>
              <p className="text-muted-foreground">{purpose.intro}</p>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                {purpose.items!.map((li) => <li key={li}>{li}</li>)}
              </ul>
            </Section>
            <Section title={legal.title}><p className="text-muted-foreground">{legal.body}</p></Section>
            <Section title={share.title}><p className="text-muted-foreground">{share.body}</p></Section>
            <Section title={retention.title}><p className="text-muted-foreground">{retention.body}</p></Section>
            <Section title={rights.title}>
              <p className="text-muted-foreground">
                {rightsBody.split(contact.email)[0]}{email}{rightsBody.split(contact.email)[1] ?? "."}
              </p>
            </Section>
            <Section title={cookies.title}><p className="text-muted-foreground">{cookies.body}</p></Section>
            <Section title={contactSec.title}>
              <p className="text-muted-foreground">
                {contactBody.split(contact.email)[0]}{email}{contactBody.split(contact.email)[1] ?? "."}
              </p>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
