import { Link } from "@tanstack/react-router";
import { ArrowLeft, Cpu, MapPin } from "lucide-react";
import { useState } from "react";

import type { Vessel } from "@/data/cardio";
import { TONE_CLASSES } from "@/lib/modules";
import { cn } from "@/lib/utils";

const RING_TONES = ["bg-peach", "bg-destructive/70", "bg-sky"];

export function LessonShell({ unit, title, intro, children }: { unit: string; title: string; intro: string; children: React.ReactNode }) {
  return (
    <section className="relative px-5 pt-10 pb-10 sm:pt-14">
      <div className="bg-hero pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]" />
      <div className="mx-auto max-w-6xl">
        <Link to="/anatomy/cardiovascular" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Cardiovascular system
        </Link>
        <div className="mb-8 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-mint-deep">{unit}</span>
          <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
          <p className="max-w-2xl text-muted-foreground">{intro}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

export function VesselLesson({ vessel, unit }: { vessel: Vessel; unit: string }) {
  const [active, setActive] = useState(0);
  const layer = vessel.layers[active]!;
  const total = vessel.rings.reduce((a, b) => a + b, 0);
  let inset = 0;
  return (
    <LessonShell unit={unit} title={vessel.title} intro={vessel.intro}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-4xl border border-border bg-card p-6 shadow-soft">
          <p className="mb-4 font-mono text-xs text-muted-foreground">Cross-section · tap a layer</p>
          <div className={cn("relative mx-auto aspect-square w-full max-w-sm", vessel.kind === "vein" && "scale-y-[0.8]")}>
            {vessel.rings.map((t, i) => {
              const style = { inset: `${(inset / (total + 30)) * 50}%` };
              inset += t;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={vessel.layers[i]!.name}
                  onClick={() => setActive(i)}
                  style={style}
                  className={cn(
                    "absolute rounded-full border-2 border-background transition-all",
                    RING_TONES[i],
                    active === i ? "ring-4 ring-mint brightness-110" : "opacity-80 hover:opacity-100",
                  )}
                />
              );
            })}
            <div
              style={{ inset: `${(total / (total + 30)) * 50}%` }}
              className="pointer-events-none absolute grid place-items-center rounded-full bg-destructive/30 font-mono text-xs"
            >
              Lumen
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {vessel.layers.map((l, i) => (
              <button
                key={l.name}
                type="button"
                onClick={() => setActive(i)}
                className={cn("flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs", active === i ? "border-mint bg-mint-soft" : "border-border")}
              >
                <span className={cn("size-2.5 rounded-full", RING_TONES[i])} /> {l.name.split(" (")[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div key={layer.name} className="animate-fade-up rounded-4xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <span className="rounded-full bg-mint-soft px-3 py-1 font-mono text-xs text-mint-deep">{layer.nickname}</span>
            <h2 className="mt-3 text-3xl font-bold">{layer.name}</h2>
            <div className="mt-4 space-y-3 text-sm">
              <p><span className="font-semibold">Made of: </span><span className="text-muted-foreground">{layer.madeOf}</span></p>
              <p><span className="font-semibold">Function: </span><span className="text-muted-foreground">{layer.job}</span></p>
            </div>
          </div>
          <div className="rounded-4xl border border-border bg-card p-6 shadow-soft">
            <h3 className="mb-3 font-semibold">Key features</h3>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {vessel.facts.map((f) => <li key={f}>• {f}</li>)}
            </ul>
            <div className="mt-5 rounded-2xl bg-lavender-soft p-4 text-sm">
              <div className="mb-1 flex items-center gap-1.5 font-semibold text-lavender-deep"><Cpu className="size-4" /> Engineering link</div>
              {vessel.engineering}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-4xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <h3 className="text-2xl font-bold sm:text-3xl">
          Major {vessel.kind === "artery" ? "arteries" : "veins"} in the body
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          {vessel.kind === "artery"
            ? "From the aorta down to the pulse at your wrist — the arteries you will meet most often in clinics, imaging and device manuals."
            : "From the vena cavae back to the surface veins of the arm — the veins used for IVs, dialysis access and bypass grafts."}
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vessel.major.map((v) => {
            const tone = TONE_CLASSES[v.tone];
            return (
              <div key={v.name} className={cn("rounded-3xl border border-border p-5", tone.soft)}>
                <div className="flex items-center gap-2">
                  <span className={cn("size-2.5 shrink-0 rounded-full", tone.bg)} />
                  <h4 className="font-bold">{v.name}</h4>
                </div>
                <p className="mt-2 flex gap-1.5 text-sm text-muted-foreground">
                  <MapPin className={cn("mt-0.5 size-3.5 shrink-0", tone.text)} />
                  {v.where}
                </p>
                <p className="mt-2 text-sm">
                  <span className="font-semibold">Function: </span>
                  <span className="text-muted-foreground">{v.job}</span>
                </p>
                <p className="mt-3 rounded-2xl border border-border bg-background/70 p-3 text-xs text-muted-foreground">
                  {v.note}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </LessonShell>
  );
}
