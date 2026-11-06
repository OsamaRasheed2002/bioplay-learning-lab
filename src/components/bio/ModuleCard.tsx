import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, Layers } from "lucide-react";

import { TONE_CLASSES, type LearningModule } from "@/lib/modules";
import { cn } from "@/lib/utils";

export function ModuleCard({
  module,
  featured = false,
  className,
  style,
}: {
  module: LearningModule;
  featured?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const tone = TONE_CLASSES[module.tone];
  return (
    <Link
      to={module.to}
      style={style}
      className={cn(
        "group relative flex animate-fade-up flex-col overflow-hidden rounded-4xl border border-border bg-card p-3 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-float",
        tone.ring,
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl",
          tone.soft,
          featured ? "aspect-[4/3] lg:aspect-auto lg:flex-1" : "aspect-[4/3]",
        )}
      >
        <img
          src={module.image}
          alt={`${module.title} illustration`}
          loading="lazy"
          width={944}
          height={704}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="glass absolute left-3 top-3 rounded-full border border-border px-3 py-1 font-mono text-[11px] font-medium text-foreground">
          {module.kicker}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-3 pt-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className={cn("font-bold text-foreground", featured ? "text-3xl" : "text-xl")}>
            {module.title}
          </h3>
          <span
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-45",
              tone.bg,
            )}
          >
            <ArrowUpRight className="size-5 text-foreground" />
          </span>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{module.description}</p>
        <div className="mt-auto flex items-center gap-4 pt-1 font-mono text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Layers className="size-3.5" /> {module.lessons} lessons
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" /> ~{Math.round(module.minutes / 60)}h
          </span>
        </div>
      </div>
    </Link>
  );
}
