import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Cpu, Droplets } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import heartImg from "@/assets/heart-diagram.jpg";
import { Button } from "@/components/ui/button";
import { HEART_PARTS } from "@/data/heartParts";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

const TOPIC = "Cardiovascular system";
const REWARD = 50;

export const Route = createFileRoute("/anatomy_/heart")({
  head: () => ({
    meta: [
      { title: "The Human Heart — Interactive Diagram · BEPlay" },
      { name: "description", content: "Explore a detailed, interactive diagram of the heart's chambers, valves and vessels." },
      { property: "og:title", content: "The Human Heart — Interactive Diagram · BEPlay" },
      { property: "og:description", content: "Explore a detailed, interactive diagram of the heart's chambers, valves and vessels." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HeartPage,
});

function bloodDot(b: string) {
  return b === "oxygen-rich" ? "bg-destructive" : b === "oxygen-poor" ? "bg-sky-deep" : "bg-lavender-deep";
}

function HeartPage() {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<Set<string>>(() => new Set([HEART_PARTS[0]!.id]));
  const { progress, update } = useProgress();
  const part = HEART_PARTS[active]!;
  const done = progress.completedTopics.includes(TOPIC);
  const allSeen = seen.size === HEART_PARTS.length;

  function select(i: number) {
    setActive(i);
    setSeen((s) => new Set(s).add(HEART_PARTS[i]!.id));
  }

  function complete() {
    update((p) =>
      p.completedTopics.includes(TOPIC)
        ? p
        : {
            ...p,
            xp: p.xp + REWARD,
            completedTopics: [...p.completedTopics, TOPIC],
            achievements: p.achievements.includes("first-beat") ? p.achievements : [...p.achievements, "first-beat"],
          },
    );
    toast.success(`Topic complete! +${REWARD} XP`);
  }

  return (
    <section className="relative px-5 pt-10 pb-10 sm:pt-14">
      <div className="bg-hero pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]" />
      <div className="mx-auto max-w-7xl">
        <Link to="/anatomy" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Anatomy Explorer
        </Link>
        <div className="mb-8 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-mint-deep">Cardiovascular system · Unit 1</span>
          <h1 className="text-4xl font-bold sm:text-5xl">The Human Heart</h1>
          <p className="max-w-2xl text-muted-foreground">
            Tap any numbered point to explore that structure. Points are ordered the way blood flows — follow them
            from 1 to {HEART_PARTS.length}.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* Diagram */}
          <div className="relative overflow-hidden rounded-4xl border border-border bg-card shadow-soft">
            <img src={heartImg} alt="Cross-section diagram of the human heart" width={1024} height={1024} className="w-full" />
            {HEART_PARTS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => select(i)}
                aria-label={p.name}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                className={cn(
                  "absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 font-mono text-[11px] font-bold shadow-float transition-all duration-300 sm:size-8",
                  i === active
                    ? "scale-125 border-background bg-mint text-foreground ring-4 ring-mint/40"
                    : seen.has(p.id)
                      ? "border-background bg-card/90 text-foreground hover:scale-110"
                      : "animate-pulse border-background bg-lavender text-foreground hover:scale-110",
                )}
              >
                {i + 1}
              </button>
            ))}
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 rounded-2xl bg-card/85 px-3 py-2 text-[11px] backdrop-blur">
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-sky-deep" /> Oxygen-poor</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-destructive" /> Oxygen-rich</span>
            </div>
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-5">
            <div key={part.id} className="animate-fade-up rounded-4xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-mint-soft px-3 py-1 font-mono text-xs text-mint-deep">
                  {active + 1} / {HEART_PARTS.length}
                </span>
                <span className="rounded-full bg-muted px-3 py-1 font-mono text-xs">{part.group}</span>
                <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 font-mono text-xs">
                  <span className={cn("size-2 rounded-full", bloodDot(part.blood))} /> {part.blood}
                </span>
              </div>
              <h2 className="text-3xl font-bold">{part.name}</h2>
              <p className="mt-3 text-muted-foreground">{part.summary}</p>
              <div className="mt-5 rounded-2xl bg-lavender-soft p-4 text-sm">
                <div className="mb-1 flex items-center gap-1.5 font-semibold text-lavender-deep">
                  <Cpu className="size-4" /> Engineering link
                </div>
                {part.engineering}
              </div>
              <div className="mt-6 flex justify-between gap-3">
                <Button variant="glass" size="sm" disabled={active === 0} onClick={() => select(active - 1)}>
                  <ArrowLeft /> Previous
                </Button>
                <Button variant="hero" size="sm" disabled={active === HEART_PARTS.length - 1} onClick={() => select(active + 1)}>
                  Follow the blood <ArrowRight />
                </Button>
              </div>
            </div>

            <div className="rounded-4xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 font-semibold"><Droplets className="size-4 text-sky-deep" /> Structures explored</span>
                <span className="font-mono text-xs text-muted-foreground">{seen.size}/{HEART_PARTS.length}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {HEART_PARTS.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => select(i)}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-xs transition-colors",
                      i === active ? "border-mint bg-mint-soft" : seen.has(p.id) ? "border-border bg-surface" : "border-dashed border-border text-muted-foreground",
                    )}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
              <div className="mt-5">
                {done ? (
                  <p className="flex items-center gap-2 text-sm font-semibold text-mint-deep">
                    <CheckCircle2 className="size-4" /> Topic completed
                  </p>
                ) : (
                  <Button variant="hero" className="w-full" disabled={!allSeen} onClick={complete}>
                    {allSeen ? `Complete topic · +${REWARD} XP` : "Explore every structure to complete"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
