import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { plans } from "@/data/pricing";
import { cn } from "@/lib/utils";

export function Pricing() {
  const { t } = useTranslation();
  return (
    <section id="planos" className="border-y border-border bg-surface py-24 md:py-32">
      <div className="container-arkyo">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("pricing.eyebrow")}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {t("pricing.title")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("pricing.subtitle")}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-4 md:grid-cols-2">
          {plans.map((p, i) => {
            const base = `pricing.plans.${p.id}`;
            const features = t(`${base}.features`, { returnObjects: true }) as string[];
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-7 transition-shadow",
                  p.highlighted
                    ? "border-foreground bg-foreground text-background shadow-elevated"
                    : "border-border bg-card",
                )}
              >
                {p.highlighted && (
                  <span className="absolute -top-3 right-6 rounded-full bg-background px-3 py-1 text-[11px] font-medium text-foreground">
                    {t("pricing.recommended")}
                  </span>
                )}
                <h3 className="text-lg font-semibold tracking-tight">{t(`${base}.name`)}</h3>
                <p className={cn("mt-1 text-sm", p.highlighted ? "text-background/70" : "text-muted-foreground")}>
                  {t(`${base}.description`)}
                </p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight">{p.price}</span>
                  <span className={cn("text-sm", p.highlighted ? "text-background/60" : "text-muted-foreground")}>
                    {t("pricing.perMonth")}
                  </span>
                </div>
                <ul className="mt-6 space-y-3 border-t border-current/10 pt-6">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" />
                      <span className={p.highlighted ? "text-background/90" : "text-foreground"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contato"
                  className={cn(
                    "mt-7 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-transform hover:-translate-y-px",
                    p.highlighted
                      ? "bg-background text-foreground"
                      : "border border-foreground text-foreground",
                  )}
                >
                  {t("pricing.cta")}
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
