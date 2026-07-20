import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="servicos" className="border-y border-border bg-surface py-24 md:py-32">
      <div className="container-nexo">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Serviços
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Soluções desenhadas para o seu momento.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Preços a partir de. Todo projeto começa com um briefing gratuito para entender seu
            contexto.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-soft"
            >
              <div className="flex items-start justify-between">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground">
                  <s.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-foreground">{s.price}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              <ul className="mt-5 space-y-2 border-t border-border pt-5">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contato"
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground"
                aria-label={`Solicitar orçamento para ${s.name}`}
              >
                Solicitar orçamento
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
