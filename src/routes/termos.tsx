import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { company, contact, legalUpdatedLabel } from "@/data/company";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso — Arkyo" },
      { name: "description", content: "Termos e condições de uso dos serviços da Arkyo." },
      { property: "og:title", content: "Termos de Uso — Arkyo" },
      { property: "og:description", content: "Termos e condições de uso dos serviços." },
      { property: "og:url", content: "/termos" },
    ],
    links: [{ rel: "canonical", href: "/termos" }],
  }),
  component: Termos,
});

function Termos() {
  const { t, i18n } = useTranslation();
  const country = t("footer.country");
  const section = (key: string) => t(`legal.terms.sections.${key}`, { returnObjects: true }) as { title: string; body: string };
  const keys = ["accept", "services", "ip", "liability", "changes", "law"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-24">
        <div className="container-arkyo max-w-3xl">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> {t("legal.back")}
          </Link>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">{t("legal.terms.title")}</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {t("legal.lastUpdate")} {legalUpdatedLabel(i18n.resolvedLanguage)}
          </p>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-foreground">
            {keys.map((k) => {
              const s = section(k);
              const body = s.body
                .replaceAll("{{company}}", company.name)
                .replaceAll("{{country}}", country)
                .replaceAll("{{email}}", contact.email);
              return (
                <section key={k}>
                  <h2 className="text-xl font-semibold tracking-tight">{s.title}</h2>
                  <p className="mt-3 text-muted-foreground">{body}</p>
                </section>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
