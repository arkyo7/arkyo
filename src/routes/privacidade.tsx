import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { contact, company } from "@/data/company";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Nexo Web" },
      {
        name: "description",
        content: "Como a Nexo Web coleta, utiliza e protege seus dados pessoais em conformidade com o GDPR.",
      },
      { property: "og:title", content: "Política de Privacidade — Nexo Web" },
      { property: "og:description", content: "Como tratamos seus dados em conformidade com o GDPR." },
      { property: "og:url", content: "/privacidade" },
    ],
    links: [{ rel: "canonical", href: "/privacidade" }],
  }),
  component: Privacidade,
});

function Privacidade() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-24">
        <div className="container-nexo max-w-3xl">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>

          <div className="prose prose-neutral mt-10 max-w-none space-y-8 text-[15px] leading-relaxed text-foreground">
            <Section title="1. Quem somos">
              <p>
                {company.name} é um estúdio digital com sede na {company.country}. Você pode nos
                contactar pelo email <a href={contact.emailUrl} className="underline">{contact.email}</a>.
              </p>
            </Section>
            <Section title="2. Dados que coletamos">
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                <li>Dados fornecidos no formulário de contato: nome, empresa, telefone, email, Instagram, mensagem, tipo de projeto, orçamento e prazo.</li>
                <li>Dados técnicos e de navegação (endereço IP, tipo de dispositivo, páginas visitadas), coletados por ferramentas analíticas mediante consentimento.</li>
              </ul>
            </Section>
            <Section title="3. Finalidade do tratamento">
              <p className="text-muted-foreground">Utilizamos seus dados exclusivamente para:</p>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                <li>Responder às suas solicitações de orçamento e contato.</li>
                <li>Executar contratos e prestar os serviços contratados.</li>
                <li>Melhorar a experiência do site (analytics agregado).</li>
              </ul>
            </Section>
            <Section title="4. Base legal (GDPR)">
              <p className="text-muted-foreground">
                O tratamento é baseado no seu consentimento (art. 6.º, n.º 1, alínea a do RGPD) ao
                enviar o formulário e aceitar cookies, e na execução de contrato (art. 6.º, n.º 1,
                alínea b) quando aplicável.
              </p>
            </Section>
            <Section title="5. Compartilhamento">
              <p className="text-muted-foreground">
                Não vendemos seus dados. Podemos compartilhar dados com processadores estritamente
                necessários (hospedagem, envio de emails) que atuam sob acordos de proteção de dados.
              </p>
            </Section>
            <Section title="6. Retenção">
              <p className="text-muted-foreground">
                Mantemos os dados apenas pelo tempo necessário à finalidade para a qual foram
                coletados, ou conforme exigido por lei.
              </p>
            </Section>
            <Section title="7. Seus direitos">
              <p className="text-muted-foreground">
                Você tem direito de acesso, retificação, apagamento, oposição, portabilidade e
                limitação. Para exercê-los, contate <a href={contact.emailUrl} className="underline">{contact.email}</a>.
              </p>
            </Section>
            <Section title="8. Cookies">
              <p className="text-muted-foreground">
                Utilizamos cookies essenciais e, mediante consentimento, cookies analíticos. Você
                pode alterar sua preferência a qualquer momento limpando os dados do site.
              </p>
            </Section>
            <Section title="9. Contato">
              <p className="text-muted-foreground">
                Dúvidas sobre esta política? Escreva para{" "}
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
