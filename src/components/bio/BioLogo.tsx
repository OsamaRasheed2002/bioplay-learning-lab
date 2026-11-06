import { cn } from "@/lib/utils";

export function BioMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("size-9", className)} aria-hidden="true">
      <defs>
        <linearGradient id="bp-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--mint)" />
          <stop offset="55%" stopColor="var(--sky)" />
          <stop offset="100%" stopColor="var(--lavender)" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="12" fill="url(#bp-mark)" />
      <path
        d="M6 21h7l2.5-6 4 13 3.5-10 2 3H34"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BioLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <BioMark />
      <span className="font-display text-xl font-bold tracking-tight text-foreground">
        Bio<span className="text-gradient-brand">Play</span>
      </span>
    </span>
  );
}
