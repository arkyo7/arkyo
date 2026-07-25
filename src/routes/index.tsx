import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ValueProp } from "@/components/site/ValueProp";
import { Problems } from "@/components/site/Problems";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Portfolio } from "@/components/site/Portfolio";
import { Differentials } from "@/components/site/Differentials";
import { Pricing } from "@/components/site/Pricing";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { CookieBanner } from "@/components/site/CookieBanner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arkyo — Sites que simplificam negócios" },
      {
        name: "description",
        content:
          "Desenvolvimento de sites, landing pages e sistemas de agendamento para pequenos negócios. Design profissional, performance e SEO técnico. Bélgica.",
      },
      { property: "og:title", content: "Arkyo — Sites que simplificam negócios" },
      {
        property: "og:description",
        content:
          "Estúdio digital sob medida para pequenos negócios. Sites, agendamento e soluções que funcionam.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: "Arkyo — Sites que simplificam negócios" },
      {
        name: "twitter:description",
        content: "Estúdio digital sob medida para pequenos negócios.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Arkyo",
          description:
            "Desenvolvimento de sites e soluções digitais para pequenos negócios.",
          url: "/",
          areaServed: "BE",
          address: { "@type": "PostalAddress", addressCountry: "BE" },
          email: "nexoweb30@arkyo.be",
          telephone: "+32470743258",
          sameAs: ["https://instagram.com/arkyo"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ValueProp />
        <Problems />
        <Services />
        <Process />
        <Portfolio />
        <Differentials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
      <Toaster position="bottom-center" />
    </div>
  );
}
