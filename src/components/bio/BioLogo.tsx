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
        <clipPath id="bp-flask">
          <path d="M17.5 16L9.6 30q-1 2 1.4 2h18q2.4 0 1.4-2L22.5 16Z" />
        </clipPath>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="12" fill="url(#bp-mark)" />
      <path
        d="M17.5 16L9.6 30q-1 2 1.4 2h18q2.4 0 1.4-2L22.5 16Z"
        fill="var(--card)"
        fillOpacity=".6"
      />
      <g clipPath="url(#bp-flask)">
        <rect x="5" y="25" width="30" height="10" fill="var(--mint-deep)" fillOpacity=".45" />
      </g>
      <g fill="none" stroke="var(--primary)" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M15.8 8h8.4M17.5 8v8L9.6 30q-1 2 1.4 2h18q2.4 0 1.4-2L22.5 16V8"
          strokeWidth="2.5"
        />
        <g strokeWidth="1.9">
          <path d="M20 19q6.4 1.3 0 2.625q-6.4 1.3 0 2.625q6.4 1.3 0 2.625q-6.4 1.3 0 2.625" />
          <path d="M20 19q-6.4 1.3 0 2.625q6.4 1.3 0 2.625q-6.4 1.3 0 2.625q6.4 1.3 0 2.625" />
        </g>
        <path
          d="M16.8 20.3h6.4M16.8 22.9h6.4M16.8 25.6h6.4M16.8 28.2h6.4"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}

export function BioLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <BioMark />
      <span className="font-display text-xl font-bold tracking-tight text-foreground">
        BE<span className="text-gradient-brand">Play</span>
      </span>
    </span>
  );
}
