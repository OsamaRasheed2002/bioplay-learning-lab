import { cn } from "@/lib/utils";
import logoUrl from "@/assets/logo-beplay.png";

export function BioMark({ className }: { className?: string }) {
  return (
    <img
      src={logoUrl}
      alt=""
      width={128}
      height={128}
      draggable={false}
      className={cn("size-9 shrink-0", className)}
    />
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
