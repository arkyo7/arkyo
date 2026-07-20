import { motion } from "framer-motion";
import { MessageSquare, CalendarX, Layers, Eye } from "lucide-react";

const items = [
  {
    icon: MessageSquare,
    title: "WhatsApp sobrecarregado",
    desc: "Perde clientes porque não consegue responder todas as mensagens a tempo.",
  },
  {
    icon: CalendarX,
    title: "Agendamentos confusos",
    desc: "Marca, remarca e às vezes esquece — sem um sistema que organize sua agenda.",
  },
  {
    icon: Layers,
    title: "Informação espalhada",
    desc: "Cardápio no Instagram, preços no PDF, contato na bio. Cliente se perde.",
  },
  {
    icon: Eye,
    title: "Imagem que não representa",
    desc: "Seu trabalho é excelente, mas a apresentação digital não transmite isso.",
  },
];

export function Problems() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-nexo">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Problemas reais
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Se algo aqui soa familiar, podemos ajudar.
          </h2>
        </div>
        <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-soft"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
