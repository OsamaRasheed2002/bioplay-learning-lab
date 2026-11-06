import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Activity, Brain, Cpu, Heart, Play, Sparkles, Users } from "lucide-react";

import heroHeart from "@/assets/hero-heart.jpg";
import { DailyChallenge } from "@/components/bio/DailyChallenge";
import { ModuleCard } from "@/components/bio/ModuleCard";
import { ProgressPanel } from "@/components/bio/ProgressPanel";
import { PulseLine } from "@/components/bio/PulseLine";
import { Button } from "@/components/ui/button";
import { MODULES } from "@/lib/modules";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BioPlay — Explore the Science Behind the Human Body" },
      {
        name: "description",
        content:
          "BioPlay makes biomedical engineering fun and visual: anatomy, biosignals, medical devices and interactive challenges for university students.",
      },
      { property: "og:title", content: "BioPlay — Explore the Science Behind the Human Body" },
      {
        property: "og:description",
        content:
          "A playful, interactive biomedical engineering learning platform for university students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <Modules />
      <section className="mx-auto mt-24 max-w-7xl px-5">
        <SectionHeading
          kicker="Daily challenge"
          title="Warm up your brain"
          subtitle="One quick question a day keeps the knowledge flowing — and earns you XP."
        />
        <DailyChallenge />
      </section>
      <section className="mx-auto mt-24 max-w-7xl px-5" id="progress">
        <SectionHeading
          kicker="Your progress"
          title="Level up as you learn"
          subtitle="Track XP, collect achievements and watch your completed topics grow."
          action={
            <Button variant="glass" asChild>
              <Link to="/progress">
                Open dashboard <ArrowRight />
              </Link>
            </Button>
          }
        />
        <ProgressPanel />
      </section>
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-10 pt-8 sm:pt-14">
      <div className="bg-hero pointer-events-none absolute inset-0 -z-10" />
      <div className="bg-dots pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div className="space-y-8">
          <span className="glass inline-flex animate-fade-up items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold shadow-soft">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint-deep opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-mint-deep" />
            </span>
            Biomedical engineering, made playful
          </span>

          <h1
            className="animate-fade-up text-5xl font-extrabold leading-[0.98] sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "80ms" }}
          >
            Explore the <span className="text-gradient-brand">Science</span> Behind the{" "}
            <span className="relative inline-block">
              Human Body
              <svg
                viewBox="0 0 300 20"
                className="absolute -bottom-2 left-0 h-3 w-full"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 14 Q 75 2 150 10 T 298 6"
                  fill="none"
                  stroke="var(--mint)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p
            className="max-w-xl animate-fade-up text-lg leading-relaxed text-muted-foreground sm:text-xl"
            style={{ animationDelay: "160ms" }}
          >
            Interactive anatomy, real biosignals and the medical devices that keep us alive —
            turned into bite-sized, game-like lessons for curious engineering students.
          </p>

          <div
            className="flex animate-fade-up flex-wrap items-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Button variant="hero" size="lg" asChild>
              <Link to="/anatomy">
                Start learning <ArrowRight />
              </Link>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <Link to="/challenges">
                <Play className="text-mint-deep" /> Try a challenge
              </Link>
            </Button>
          </div>

          <div
            className="flex animate-fade-up items-center gap-4 pt-2"
            style={{ animationDelay: "320ms" }}
          >
            <div className="flex -space-x-2">
              {["bg-mint", "bg-lavender", "bg-sky", "bg-peach"].map((c, i) => (
                <span
                  key={c}
                  className={`grid size-9 place-items-center rounded-full border-2 border-background ${c} font-display text-xs font-bold`}
                >
                  {["AK", "SL", "MR", "JD"][i]}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Built for <span className="font-semibold text-foreground">university students</span>{" "}
              in BME, medicine & beyond
            </p>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl animate-fade-up" style={{ animationDelay: "200ms" }}>
      <div className="pointer-events-none absolute -inset-6 animate-spin-slow rounded-full border border-dashed border-lavender" />
      <div className="relative animate-float overflow-hidden rounded-[2.75rem] border border-border bg-surface p-3 shadow-float">
        <img
          src={heroHeart}
          alt="Translucent glass heart surrounded by DNA, molecules and an ECG ribbon"
          width={1280}
          height={1280}
          className="aspect-square w-full rounded-[2.25rem] object-cover"
        />
      </div>

      {/* Floating vitals card */}
      <div className="glass absolute -left-4 bottom-10 w-56 animate-float-slow rounded-3xl border border-border p-4 shadow-float sm:-left-10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Live ECG
          </span>
          <Heart className="size-4 animate-heartbeat fill-peach text-peach-deep" />
        </div>
        <div className="mt-1 font-display text-3xl font-bold">
          72 <span className="text-sm font-medium text-muted-foreground">bpm</span>
        </div>
        <PulseLine className="h-10" />
      </div>

      {/* Floating XP badge */}
      <div
        className="glass absolute -right-2 top-8 animate-float rounded-2xl border border-border px-4 py-3 shadow-float sm:-right-8"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-xl bg-mint">
            <Sparkles className="size-4" />
          </span>
          <div>
            <div className="text-xs text-muted-foreground">Lesson complete</div>
            <div className="font-display font-bold">+120 XP</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsStrip() {
  const stats = [
    { icon: Heart, label: "Organ systems", value: "11", tone: "bg-mint-soft text-mint-deep" },
    { icon: Activity, label: "Signal datasets", value: "40+", tone: "bg-sky-soft text-sky-deep" },
    { icon: Cpu, label: "Device teardowns", value: "16", tone: "bg-lavender-soft text-lavender-deep" },
    { icon: Brain, label: "Bite-sized lessons", value: "108", tone: "bg-peach-soft text-peach-deep" },
  ];
  return (
    <section className="mx-auto mt-10 max-w-7xl px-5">
      <div className="grid grid-cols-2 gap-3 rounded-4xl border border-border bg-card p-3 shadow-soft md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3 rounded-3xl p-3 sm:p-4">
            <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${s.tone}`}>
              <s.icon className="size-5" />
            </span>
            <div>
              <div className="font-display text-2xl font-bold leading-none">{s.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Modules() {
  const [featured, ...rest] = MODULES;
  return (
    <section className="mx-auto mt-24 max-w-7xl px-5" id="learn">
      <SectionHeading
        kicker="Learning paths"
        title="Pick your adventure"
        subtitle="Five playful paths through biomedical engineering. Jump in anywhere — every path earns XP."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        <ModuleCard module={featured} featured className="md:col-span-2 lg:row-span-2" />
        {rest.map((m, i) => (
          <ModuleCard key={m.id} module={m} style={{ animationDelay: `${(i + 1) * 90}ms` }} />
        ))}
      </div>
    </section>
  );
}

function SectionHeading({
  kicker,
  title,
  subtitle,
  action,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl space-y-3">
        <span className="font-mono text-xs uppercase tracking-widest text-mint-deep">{kicker}</span>
        <h2 className="text-4xl font-bold sm:text-5xl">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-5">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12 sm:py-20">
        <div className="bg-hero pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-2xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3.5 py-1.5 text-xs font-semibold">
            <Users className="size-3.5" /> Free for students
          </span>
          <h2 className="text-4xl font-bold sm:text-5xl">Your body is the coolest machine ever built.</h2>
          <p className="text-lg opacity-80">Learn how it works — and how engineers help keep it running.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="mint" size="lg" asChild>
              <Link to="/anatomy">
                Start learning now <ArrowRight />
              </Link>
            </Button>
            <Button variant="inverse" size="lg" asChild>
              <Link to="/signals">Open the Signals Lab</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
