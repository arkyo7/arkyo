import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function ValueProp() {
  const { t } = useTranslation();
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
            {t("valueProp.eyebrow")}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl lg:text-[2.5rem]">
            {t("valueProp.title")}
          </h2>
          <p className="mt-6 text-balance text-lg leading-relaxed text-muted-foreground">
            {t("valueProp.body")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
