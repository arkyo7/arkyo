import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Palette, HeartHandshake, Gauge, Search, Zap, Code2 } from "lucide-react";

const icons = [Palette, HeartHandshake, Gauge, Search, Zap, Code2];

export function Differentials() {
  const { t } = useTranslation();
  const items = t("differentials.items", { returnObjects: true }) as Array<{ title: string; desc: string }>;
  return (
    <section className="py-24 md:py-32">
      <div className="container-arkyo">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("differentials.eyebrow")}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {t("differentials.title")}
          </h2>
        </div>
        <div className="mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="flex gap-4"
              >
                <div className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
