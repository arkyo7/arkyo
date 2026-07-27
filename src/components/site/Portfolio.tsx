import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionLink } from "./SectionLink";

export function Portfolio() {
  const { t } = useTranslation();
  return (
    <section id="portfolio" className="border-y border-border bg-surface py-24 md:py-32">
      <div className="container-arkyo">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t("portfolio.eyebrow")}
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {t("portfolio.title")}
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => {
            const base = `portfolio.items.${p.id}`;
            const tags = t(`${base}.tags`, { returnObjects: true }) as string[];
            const challenges = t(`${base}.challenges`, { returnObjects: true }) as string[];
            const solutions = t(`${base}.solutions`, { returnObjects: true }) as string[];
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-foreground">
                  <div aria-hidden className="absolute inset-0 grid-lines opacity-30" />
                  <span className="absolute left-4 top-4 z-10 rounded-full border border-background/20 bg-background/90 px-2.5 py-1 text-[11px] font-medium text-foreground">
                    {t("portfolio.status")}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-white/20" />
                        <span className="h-2 w-2 rounded-full bg-white/20" />
                        <span className="h-2 w-2 rounded-full bg-white/20" />
                      </div>
                      <div className="mt-4 h-2 w-2/3 rounded bg-white/20" />
                      <div className="mt-2 h-2 w-1/2 rounded bg-white/10" />
                      <div className="mt-5 grid grid-cols-3 gap-2">
                        <div className="h-8 rounded bg-white/10" />
                        <div className="h-8 rounded bg-white/10" />
                        <div className="h-8 rounded bg-white/20" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight">{t(`${base}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`${base}.summary`)}</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                        {t("portfolio.challenges")}
                      </p>
                      <ul className="mt-2 space-y-2">
                        {challenges.map((c) => (
                          <li key={c} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                        {t("portfolio.solutions")}
                      </p>
                      <ul className="mt-2 space-y-2">
                        {solutions.map((c) => (
                          <li key={c} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-5 text-xs text-muted-foreground">
                    <span>{t(`${base}.category`)}</span>
                    <span>{p.year}</span>
                  </div>
                </div>
              </motion.article>
            );
          })}
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-border p-10 text-center">
            <div>
              <p className="text-sm font-medium text-foreground">{t("portfolio.openSlot.title")}</p>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">{t("portfolio.openSlot.desc")}</p>
              <SectionLink hash="contato"
                
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground">
                {t("portfolio.cta")} <ArrowUpRight className="h-4 w-4" />
              </SectionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
