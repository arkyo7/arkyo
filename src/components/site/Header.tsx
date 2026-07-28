import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { navItems } from "@/data/company";
import { cn } from "@/lib/utils";
import { SectionLink } from "./SectionLink";

export function Header() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    let last = window.scrollY > 8;
    setScrolled(last);
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const next = window.scrollY > 8;
        // Only commit when the boolean actually flips: avoids a state update
        // (and a header re-render) on every scroll tick.
        if (next !== last) {
          last = next;
          setScrolled(next);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const timer = window.setTimeout(() => closeBtnRef.current?.focus(), 20);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-arkyo flex h-16 items-center justify-between">
        <SectionLink hash="top"  aria-label={t("nav.arkyoStart")} className="shrink-0">
          <Logo />
        </SectionLink>
        <nav className="hidden items-center gap-1 md:flex" aria-label={t("nav.primary")}>
          {navItems.map((item) => (
            <SectionLink
              key={item.hash}
              hash={item.hash}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(`nav.${item.key}`)}
            </SectionLink>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <SectionLink hash="contato"
            
            className="group inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:-translate-y-px">
            {t("nav.requestQuote")}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </SectionLink>
        </div>
        <div className="flex items-center gap-1 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            ref={triggerRef}
            onClick={() => setOpen(true)}
            className="rounded-md p-2 text-foreground"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <div className="md:hidden">
            <motion.button
              type="button"
              aria-label={t("nav.closeMenu")}
              tabIndex={-1}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              id="mobile-nav"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={t("nav.primary")}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-0 z-[70] bg-background shadow-elevated"
            >
              <div className="container-arkyo flex h-16 items-center justify-between">
                <Logo />
                <button
                  ref={closeBtnRef}
                  onClick={() => setOpen(false)}
                  className="rounded-md p-2"
                  aria-label={t("nav.closeMenu")}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="container-arkyo mt-2 flex flex-col gap-1 pb-8" aria-label={t("nav.mobile")}>
                {navItems.map((item) => (
                  <SectionLink
                    key={item.hash}
                    hash={item.hash}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-lg font-medium text-foreground hover:bg-muted"
                  >
                    {t(`nav.${item.key}`)}
                  </SectionLink>
                ))}
                <SectionLink hash="contato"
                  
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg bg-foreground px-4 py-3 text-sm font-medium text-background"
                >
                  {t("nav.requestQuote")}
                  <ArrowUpRight className="h-4 w-4" />
                </SectionLink>
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
