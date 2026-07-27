import { useTranslation } from "react-i18next";
import { whatsappUrl } from "@/data/company";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const { t } = useTranslation();
  const items = t("faq.items", { returnObjects: true }) as Array<{ q: string; a: string }>;
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container-arkyo grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="max-w-md">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("faq.eyebrow")}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {t("faq.title")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("faq.subtitle")}</p>
          <a
            href={whatsappUrl(t("contact.whatsappMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t("faq.whatsappCta")}
          </a>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
