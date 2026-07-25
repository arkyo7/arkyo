import { motion } from "framer-motion";

const steps = [
  { n: "01", title: "Análise", desc: "Entendemos seu negócio, público e os gargalos atuais." },
  { n: "02", title: "Planejamento", desc: "Definimos escopo, funcionalidades, cronograma e investimento." },
  { n: "03", title: "Design", desc: "Criamos identidade visual e protótipos navegáveis." },
  { n: "04", title: "Desenvolvimento", desc: "Codificamos com foco em performance, SEO e acessibilidade." },
  { n: "05", title: "Entrega", desc: "Publicamos, treinamos você e transferimos o controle total." },
  { n: "06", title: "Suporte", desc: "Acompanhamos, otimizamos e evoluímos o projeto ao longo do tempo." },
];

export function Process() {
  return (
    <section id="processo" className="py-24 md:py-32">
      <div className="container-arkyo">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Processo
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Um caminho claro do briefing ao lançamento.
          </h2>
        </div>
        <div className="mx-auto mt-14 grid max-w-5xl gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="bg-background p-8"
            >
              <span className="font-mono text-xs text-muted-foreground">{s.n}</span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
