import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGS, languageMeta, type Lang } from "@/i18n";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { i18n, t } = useTranslation();
  const current = (LANGS as readonly string[]).includes(i18n.resolvedLanguage ?? "")
    ? (i18n.resolvedLanguage as Lang)
    : "pt";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={t("lang.change")}
          title={t("lang.change")}
          className={
            "inline-flex h-9 items-center gap-1.5 rounded-md px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
            className
          }
        >
          <Globe className="h-4 w-4" />
          {current}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {LANGS.map((lng) => (
          <DropdownMenuItem
            key={lng}
            onSelect={() => {
              i18n.changeLanguage(lng);
              if (typeof document !== "undefined") document.documentElement.lang = lng;
            }}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="flex items-center gap-2">
              <span aria-hidden>{languageMeta[lng].flag}</span>
              {languageMeta[lng].label}
            </span>
            {current === lng && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-foreground" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
