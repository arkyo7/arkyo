import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { company, contact } from "@/data/company";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso — Nexo Web" },
      { name: "description", content: "Termos e condições de uso dos serviços da Nexo Web." },
      { property: "og:title", content: "Termos de Uso — Nexo Web" },
      { property: "og:description", content: "Termos e condições de uso dos serviços." },
      { property: "og:url", content: "/termos" },
    ],
    links: [{ rel: "canonical", href: "/termos" }],
  }),
  component: Termos,
});

function Termos() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-24">
        <div className="container-nexo max-w-3xl">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">Termos de Uso</h1>
          <p className="mt-4 text-sm text-muted-foreground">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-foreground">
            <Section title="1. Aceitação">
              <p className="text-muted-foreground">
                Ao acessar ou utilizar o site da {company.name}, você concorda com estes Termos.
              </p>
            </Section>
            <Section title="2. Serviços">
              <p className="text-muted-foreground">
                Oferecemos desenvolvimento de sites, landing pages, sistemas de agendamento e
                soluções digitais sob medida, mediante contrato específico.
              </p>
            </Section>
            <Section title="3. Propriedade intelectual">
              <p className="text-muted-foreground">
                O conteúdo do site (marca, textos, layout) pertence à {company.name}. Projetos
                entregues seguem os termos definidos em contrato.
              </p>
            </Section>
            <Section title="4. Limitação de responsabilidade">
              <p className="text-muted-foreground">
                O site é fornecido "como está". A {company.name} não se responsabiliza por
                indisponibilidades pontuais ou por decisões tomadas com base em conteúdos deste site.
              </p>
            </Section>
            <Section title="5. Alterações">
              <p className="text-muted-foreground">
                Podemos atualizar estes Termos a qualquer momento. Alterações relevantes serão
                comunicadas no site.
              </p>
            </Section>
            <Section title="6. Lei aplicável">
              <p className="text-muted-foreground">
                Estes Termos são regidos pela legislação da {company.country}. Contato:{" "}
                <a href={contact.emailUrl} className="underline">{contact.email}</a>.
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
