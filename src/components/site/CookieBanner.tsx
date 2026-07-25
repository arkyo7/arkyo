import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const STORAGE_KEY = "arkyo-cookie-consent-v1";

export function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
      } catch {
        /* ignore */
      }
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    try { localStorage.setItem(STORAGE_KEY, value); } catch { /* ignore */ }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-2xl rounded-2xl border border-border bg-card p-5 shadow-elevated md:inset-x-6 md:bottom-6"
          role="dialog"
          aria-live="polite"
          aria-label={t("cookies.aria")}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground md:pr-6">
              {t("cookies.text")}{" "}
              <a href="/privacidade" className="text-foreground underline underline-offset-4">
                {t("cookies.privacy")}
              </a>.
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => decide("rejected")}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                {t("cookies.reject")}
              </button>
              <button
                onClick={() => decide("accepted")}
                className="rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background"
              >
                {t("cookies.accept")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
