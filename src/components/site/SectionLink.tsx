import { Link } from "@tanstack/react-router";
import { forwardRef, type MouseEvent, type ReactNode } from "react";

type SectionLinkProps = {
  hash: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
};

/**
 * Links to a landing-page section from anywhere in the app.
 * On internal routes (/termos, /privacidade) it navigates to "/" first,
 * so anchors never dead-end; on the home page it just scrolls.
 */
export const SectionLink = forwardRef<HTMLAnchorElement, SectionLinkProps>(function SectionLink(
  { hash, children, className, onClick, "aria-label": ariaLabel },
  ref,
) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    if (typeof window === "undefined" || window.location.pathname !== "/") return;
    const target = document.getElementById(hash);
    if (!target) return;
    event.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    const focusTarget =
      target.querySelector<HTMLElement>("[data-section-focus]") ??
      (target instanceof HTMLElement ? target : null);
    focusTarget?.focus({ preventScroll: true });
    window.history.replaceState(null, "", `#${hash}`);
  };

  return (
    <Link
      ref={ref}
      to="/"
      hash={hash}
      className={className}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
});
