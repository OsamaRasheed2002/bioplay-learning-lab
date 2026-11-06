import { cn } from "@/lib/utils";

/** Animated ECG trace drawn with SVG stroke-dash. */
export function PulseLine({ className }: { className?: string }) {
  const beat = "l20 0 l6 -10 l6 10 l8 0 l5 -42 l7 70 l6 -36 l8 8 l10 -6 l12 6 l22 0";
  const d = `M0 50 ${beat} ${beat} ${beat} ${beat}`;
  return (
    <svg
      viewBox="0 0 440 100"
      preserveAspectRatio="none"
      className={cn("h-16 w-full", className)}
      aria-hidden="true"
    >
      <path d={d} fill="none" stroke="var(--border)" strokeWidth="2" />
      <path
        d={d}
        fill="none"
        stroke="var(--mint-deep)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="160 840"
        className="animate-pulse-line"
      />
    </svg>
  );
}
