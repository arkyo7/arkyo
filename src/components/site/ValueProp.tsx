import { motion } from "framer-motion";

export function ValueProp() {
  return (
    <section className="border-y border-border bg-surface py-24 md:py-32">
      <div className="container-arkyo">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Nossa proposta
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl lg:text-[2.5rem]">
            A Arkyo não vende apenas sites.
          </h2>
          <p className="mt-6 text-balance text-lg leading-relaxed text-muted-foreground">
            Escutamos os problemas reais do seu dia a dia — mensagens desorganizadas, agendamentos
            perdidos, presença digital fraca — e desenhamos soluções simples que devolvem tempo,
            organização e confiança ao seu negócio.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
