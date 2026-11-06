import { Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Layers, Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TONE_CLASSES, getModule, type LearningModule } from "@/lib/modules";
import { cn } from "@/lib/utils";

export function ModulePage({ id }: { id: LearningModule["id"] }) {
  const m = getModule(id);
  const tone = TONE_CLASSES[m.tone];
  return (
    <section className="relative px-5 pb-10 pt-10 sm:pt-16">
      <div className="bg-hero pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px]" />
      <div className="mx-auto max-w-6xl">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft /> Back home
          </Link>
        </Button>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="animate-fade-up space-y-6">
            <span
              className={cn(
                "inline-flex rounded-full px-3 py-1 font-mono text-xs font-medium",
                tone.soft,
                tone.text,
              )}
            >
              {m.kicker}
            </span>
            <h1 className="text-5xl font-bold leading-[1.02] sm:text-6xl">{m.title}</h1>
            <p className="max-w-lg text-lg text-muted-foreground">{m.description}</p>
            <div className="flex gap-5 font-mono text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Layers className="size-4" /> {m.lessons} lessons
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" /> ~{Math.round(m.minutes / 60)} hours
              </span>
            </div>
            <div className="rounded-3xl border border-dashed border-border bg-card/70 p-5">
              <div className="mb-1 flex items-center gap-2 font-semibold">
                <Rocket className={cn("size-4", tone.text)} /> Interactive lab coming next
              </div>
              <p className="text-sm text-muted-foreground">
                This learning experience is being built step by step. Here's what's on the
                syllabus:
              </p>
            </div>
          </div>
          <div
            className={cn(
              "animate-float-slow overflow-hidden rounded-4xl border border-border p-3 shadow-float",
              tone.soft,
            )}
          >
            <img
              src={m.image}
              alt={`${m.title} illustration`}
              width={944}
              height={704}
              className="aspect-[4/3] w-full rounded-3xl object-cover"
            />
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {m.topics.map((t, i) => (
            <div
              key={t}
              style={{ animationDelay: `${i * 80}ms` }}
              className="animate-fade-up rounded-3xl border border-border bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-float"
            >
              <div className={cn("mb-4 grid size-10 place-items-center rounded-2xl font-mono text-sm font-bold", tone.bg)}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-display text-lg font-semibold">{t}</div>
              <div className="mt-1 text-xs text-muted-foreground">Unit {i + 1} · coming soon</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
