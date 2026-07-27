import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function About() {
  const { t } = useTranslation();
  return (
    <section id="sobre" className="py-24 md:py-32">
      <div className="container-arkyo">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 md:p-12"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("about.eyebrow")}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {t("about.title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{t("about.body")}</p>
        </motion.div>
      </div>
    </section>
  );
}
