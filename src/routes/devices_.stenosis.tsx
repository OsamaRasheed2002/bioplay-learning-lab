import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Activity, Layers, Droplets, Wind, Wrench } from "lucide-react";
import stenosisImg from "@/assets/stenosis-artery.jpg";

export const Route = createFileRoute("/devices_/stenosis")({
  component: StenosisPage,
  head: () => ({
    meta: [
      { title: "Stenosis — Medical Devices | BEPlay" },
      {
        name: "description",
        content:
          "See how plaque narrows an artery in stenosis, what it does to blood flow, and how stents open the vessel back up.",
      },
      { property: "og:title", content: "Stenosis — Medical Devices | BEPlay" },
      {
        property: "og:description",
        content:
          "See how plaque narrows an artery in stenosis, what it does to blood flow, and how stents open the vessel back up.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type Part = {
  id: string;
  name: string;
  icon: typeof Layers;
  text: string;
};

const PARTS: Part[] = [
  {
    id: "wall",
    name: "Artery wall",
    icon: Layers,
    text: "The stretchy, layered tube that carries blood. Its smooth inner lining lets blood slide past with almost no friction — until plaque starts to grow inside it.",
  },
  {
    id: "plaque",
    name: "Plaque buildup",
    icon: Activity,
    text: "A fatty deposit of cholesterol, cells and calcium that slowly thickens inside the wall. Over years it hardens and bulges into the channel blood flows through.",
  },
  {
    id: "lumen",
    name: "Narrowed opening",
    icon: Wind,
    text: "The gap left for blood once plaque has grown. This narrowing is the stenosis itself — the tighter it gets, the harder the heart must push to move the same amount of blood.",
  },
  {
    id: "flow",
    name: "Blood flow",
    icon: Droplets,
    text: "Red blood cells cruising through the healthy, wide part of the artery. Downstream of the narrowing the flow becomes fast and turbulent, which can damage the wall and form clots.",
  },
];

const STEPS = [
  {
    title: "Buildup",
    text: "Fatty plaque slowly grows inside the artery wall over many years, often with no symptoms at all.",
  },
  {
    title: "Narrowing",
    text: "The plaque bulges into the channel and the opening shrinks — this is the stenosis.",
  },
  {
    title: "Strain",
    text: "The heart works harder to push blood through the tight gap, and the tissue beyond it gets less oxygen.",
  },
  {
    title: "Relieved",
    text: "A tiny mesh tube called a stent is expanded inside the artery to hold it open and restore flow.",
  },
];

function PartHighlight({ part }: { part: string }) {
  return (
    <svg
      viewBox="0 0 1280 896"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <filter id="stenosis-highlight-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {part === "wall" && (
        <g filter="url(#stenosis-highlight-glow)">
          <path
            d="M 15,130 C 300,90 600,140 850,230 C 1000,280 1150,260 1270,240"
            fill="none"
            stroke="currentColor"
            strokeWidth="16"
            strokeLinecap="round"
            className="text-mint"
            opacity="0.8"
          />
          <path
            d="M 15,650 C 300,690 600,660 850,590 C 1000,550 1150,580 1270,600"
            fill="none"
            stroke="currentColor"
            strokeWidth="16"
            strokeLinecap="round"
            className="text-mint"
            opacity="0.8"
          />
        </g>
      )}
      {part === "plaque" && (
        <g filter="url(#stenosis-highlight-glow)">
          <ellipse cx="880" cy="330" rx="240" ry="95" className="fill-mint/20 stroke-mint" strokeWidth="6" />
          <ellipse cx="880" cy="545" rx="240" ry="95" className="fill-mint/20 stroke-mint" strokeWidth="6" />
        </g>
      )}
      {part === "lumen" && (
        <g filter="url(#stenosis-highlight-glow)">
          <ellipse cx="1090" cy="438" rx="165" ry="26" className="fill-mint/30 stroke-mint" strokeWidth="6" />
        </g>
      )}
      {part === "flow" && (
        <g filter="url(#stenosis-highlight-glow)">
          <ellipse cx="240" cy="430" rx="225" ry="135" className="fill-mint/15 stroke-mint" strokeWidth="6" />
        </g>
      )}
    </svg>
  );
}

function StenosisPage() {
  const [part, setPart] = useState<string>(PARTS[0]!.id);
  const active = PARTS.find((p) => p.id === part) ?? PARTS[0]!;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-20 pt-8 sm:px-6">
      <Link
        to="/devices"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Medical Devices
      </Link>

      <header className="mt-6">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-lavender-deep">
          Medical Devices
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Stenosis: when arteries narrow
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Stenosis is the narrowing of a blood vessel, usually caused by plaque
          building up inside the wall. Tap each part below to see it on the
          picture, then follow what it does to blood flow — and how a stent
          fixes it.
        </p>
      </header>

      <figure className="mt-8 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm">
        <div className="relative">
          <img
            src={stenosisImg}
            alt="Cutaway of an artery with plaque buildup narrowing the channel, red blood cells squeezing through"
            width={1280}
            height={896}
            className="h-auto w-full"
          />
          <PartHighlight part={part} />
        </div>
        <figcaption className="border-t border-border/70 px-5 py-3 text-xs text-muted-foreground">
          Tap a part below to see it highlighted.
        </figcaption>
      </figure>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Main parts</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {PARTS.map((p) => {
            const Icon = p.icon;
            const isActive = p.id === part;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPart(p.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-mint bg-mint/15 text-mint"
                    : "border-border/70 bg-card text-muted-foreground hover:border-mint/60 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {p.name}
              </button>
            );
          })}
        </div>
        <div className="mt-4 rounded-2xl border border-border/70 bg-card p-5">
          <p className="font-display text-base font-semibold">{active.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{active.text}</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">How it develops</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div
              key={s.title}
              className="rounded-2xl border border-border/70 bg-card p-5"
            >
              <p className="font-mono text-xs text-lavender-deep">
                Step {i + 1}
              </p>
              <p className="mt-1 font-display text-base font-semibold">
                {s.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-lavender/40 bg-lavender-soft p-6">
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-lavender-deep" />
          <h2 className="font-display text-xl font-semibold">Engineering link</h2>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          The stent is the engineer's answer to stenosis: a tiny metal mesh tube
          delivered on a balloon catheter, then expanded to prop the artery
          open. Modern versions are drug-eluting — coated with medicine that
          stops tissue growing back over the mesh — and some are bioresorbable,
          dissolving away once the vessel has healed. Designing one means
          balancing flexibility, strength and blood-compatibility in a tube only
          a few millimetres wide.
        </p>
      </section>
    </main>
  );
}
