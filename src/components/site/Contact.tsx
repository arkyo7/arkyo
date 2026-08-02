import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/data/company";

export function Contact() {
  const { t } = useTranslation();
  const href = whatsappUrl(t("contact.whatsappMessage"));

  return (
    <section id="contato" className="border-y border-border bg-surface py-20 md:py-24">
      <div className="container-arkyo">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-7 text-center md:p-12"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("contact.eyebrow")}
          </p>
          <h2
            data-section-focus
            tabIndex={-1}
            className="mt-4 text-balance text-3xl font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-card md:text-4xl"
          >
            {t("contact.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance leading-relaxed text-muted-foreground">
            {t("contact.subtitle")}
          </p>

          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-border bg-surface p-6 md:p-8">
            <span
              aria-hidden
              className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background"
            >
              <MessageCircle className="h-5 w-5" />
            </span>
            <p className="mt-5 text-base font-medium text-foreground">
              {t("contact.whatsappHint")}
            </p>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-3.5 text-sm font-medium text-background transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:w-auto"
            >
              {t("contact.whatsappCta")}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              {t("contact.whatsappNote")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
