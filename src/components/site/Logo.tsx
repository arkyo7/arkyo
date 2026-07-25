import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  className?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
}

export function Logo({
  size = 22,
  className = "",
  showWordmark = true,
  wordmarkClassName = "",
}: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2 text-foreground", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M 48 158 C 55 120, 78 62, 97 44 C 98.5 42.5, 101.5 42.5, 103 44 C 122 62, 145 120, 152 158"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showWordmark && (
        <span className={cn("text-[15px] font-semibold tracking-tight", wordmarkClassName)}>
          Arkyo
        </span>
      )}
    </div>
  );
}
