import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faq } from "@/data/faq";

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container-nexo grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="max-w-md">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Perguntas frequentes
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Tudo o que você precisa saber antes de começar.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Não encontrou sua dúvida? Fale conosco pelo WhatsApp — respondemos em minutos no horário
            comercial.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faq.map((item, i) => (
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
