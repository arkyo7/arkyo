import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MessageSquare, CalendarX, Layers, Eye } from "lucide-react";

const icons = [MessageSquare, CalendarX, Layers, Eye];

export function Problems() {
  const { t } = useTranslation();
  const items = t("problems.items", { returnObjects: true }) as Array<{ title: string; desc: string }>;

  return (
    <section className="py-24 md:py-32">
      <div className="container-arkyo">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("problems.eyebrow")}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {t("problems.title")}
          </h2>
        </div>
        <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-soft"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
