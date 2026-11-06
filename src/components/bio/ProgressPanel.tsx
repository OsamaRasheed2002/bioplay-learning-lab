import { Link } from "@tanstack/react-router";
import { Activity, Brain, CheckCircle2, Flame, Heart, Lock, Trophy, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ACHIEVEMENTS, levelFromXp, useProgress, type Achievement } from "@/lib/progress";
import { MODULES } from "@/lib/modules";
import { cn } from "@/lib/utils";

const ICONS: Record<Achievement["icon"], typeof Heart> = {
  heart: Heart,
  brain: Brain,
  zap: Zap,
  flame: Flame,
  trophy: Trophy,
  activity: Activity,
};

function XpRing({ pct, level }: { pct: number; level: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative size-40 shrink-0">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90">
        <defs>
          <linearGradient id="xp-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--mint-deep)" />
            <stop offset="100%" stopColor="var(--lavender-deep)" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--muted)" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="url(#xp-ring)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (pct / 100) * c}
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Level
          </div>
          <div className="font-display text-5xl font-bold leading-none text-foreground">{level}</div>
        </div>
      </div>
    </div>
  );
}

export function ProgressPanel() {
  const { progress } = useProgress();
  const { level, pct, toNext } = levelFromXp(progress.xp);
  const allTopics = MODULES.flatMap((m) => m.topics.map((t) => ({ topic: t, module: m })));
  const done = new Set(progress.completedTopics);
  const doneCount = allTopics.filter((t) => done.has(t.topic)).length;

  return (
    <div className="grid gap-5 lg:grid-cols-12">
      {/* XP */}
      <div className="relative overflow-hidden rounded-4xl border border-border bg-card p-6 shadow-soft sm:p-8 lg:col-span-5">
        <div className="bg-hero pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-center">
          <XpRing pct={pct} level={level} />
          <div className="w-full space-y-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Total experience
              </div>
              <div className="font-display text-4xl font-bold text-foreground">
                {progress.xp.toLocaleString()} <span className="text-xl text-muted-foreground">XP</span>
              </div>
            </div>
            <div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="bg-xp h-full rounded-full transition-[width] duration-1000 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {toNext} XP to level {level + 1}
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 rounded-2xl bg-peach-soft px-3 py-2.5">
                <div className="flex items-center gap-1.5 text-peach-deep">
                  <Flame className="size-4" />
                  <span className="font-display text-xl font-bold">{progress.streak}</span>
                </div>
                <div className="text-[11px] text-muted-foreground">day streak</div>
              </div>
              <div className="flex-1 rounded-2xl bg-mint-soft px-3 py-2.5">
                <div className="flex items-center gap-1.5 text-mint-deep">
                  <CheckCircle2 className="size-4" />
                  <span className="font-display text-xl font-bold">{doneCount}</span>
                </div>
                <div className="text-[11px] text-muted-foreground">topics done</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="rounded-4xl border border-border bg-card p-6 shadow-soft sm:p-8 lg:col-span-7">
        <div className="mb-5 flex items-baseline justify-between">
          <h3 className="text-xl font-bold">Achievements</h3>
          <span className="font-mono text-xs text-muted-foreground">
            {progress.achievements.length}/{ACHIEVEMENTS.length} unlocked
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ACHIEVEMENTS.map((a, i) => {
            const Icon = ICONS[a.icon];
            const unlocked = progress.achievements.includes(a.id);
            const tones = ["bg-mint", "bg-sky", "bg-lavender", "bg-peach"];
            return (
              <div
                key={a.id}
                className={cn(
                  "group flex flex-col items-start gap-3 rounded-3xl border p-4 transition-all duration-300",
                  unlocked
                    ? "border-border bg-surface hover:-translate-y-1 hover:shadow-soft"
                    : "border-dashed border-border bg-muted/50",
                )}
              >
                <span
                  className={cn(
                    "grid size-11 place-items-center rounded-2xl transition-transform duration-500",
                    unlocked ? `${tones[i % tones.length]} group-hover:rotate-12` : "bg-muted",
                  )}
                >
                  {unlocked ? (
                    <Icon className="size-5 text-foreground" />
                  ) : (
                    <Lock className="size-4 text-muted-foreground" />
                  )}
                </span>
                <div>
                  <div
                    className={cn(
                      "text-sm font-semibold",
                      unlocked ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {a.title}
                  </div>
                  <div className="text-xs text-muted-foreground">{a.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Topics */}
      <div className="rounded-4xl border border-border bg-card p-6 shadow-soft sm:p-8 lg:col-span-12">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="text-xl font-bold">Completed topics</h3>
          <span className="font-mono text-xs text-muted-foreground">
            {doneCount} of {allTopics.length} topics
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {MODULES.map((m) => {
            const count = m.topics.filter((t) => done.has(t)).length;
            return (
              <div key={m.id} className="space-y-3">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>{m.title}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {count}/{m.topics.length}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {m.topics.map((t) => (
                    <li
                      key={t}
                      className={cn(
                        "flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-xs",
                        done.has(t) ? "bg-mint-soft text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {done.has(t) ? (
                        <CheckCircle2 className="size-3.5 shrink-0 text-mint-deep" />
                      ) : (
                        <span className="size-3.5 shrink-0 rounded-full border border-border" />
                      )}
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="hero" asChild>
            <Link to="/anatomy">Continue learning</Link>
          </Button>
          <Button variant="glass" asChild>
            <Link to="/challenges">Earn more XP</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
