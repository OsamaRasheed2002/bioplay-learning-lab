import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import stentImg from "@/assets/stent-artery.jpg";
import { StenosisTabs } from "@/components/bio/StenosisTabs";

export const Route = createFileRoute("/devices_/stenosis_/stents")({
  head: () => ({ meta: [
    { title: "Stents · BEPlay" },
    { name: "description", content: "How a tiny metal mesh tube called a stent is expanded inside a narrowed artery to hold it open and restore blood flow." },
    { property: "og:title", content: "Stents · BEPlay" },
    { property: "og:description", content: "See the parts of a stent and how it opens a narrowed artery." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Stents,
});

const PARTS = [
  { name: "Stent mesh", text: "A tiny tube of metal lattice, usually stainless steel, cobalt-chromium or nitinol. It arrives folded over a balloon, then expands and locks against the artery wall like scaffolding." },
  { name: "Artery wall", text: "The vessel the stent props open. The mesh presses gently into the wall so it stays put, and over the following months the lining grows over the struts." },
  { name: "Open channel", text: "The space the stent holds open. Where plaque once squeezed the artery to a thin gap, blood now has a wide, smooth path again." },
  { name: "Blood flow", text: "Red blood cells moving freely through the reopened artery. Restoring this flow is the whole point — the tissue downstream gets its oxygen back." },
];

const STEPS = [
  { name: "Guide wire in", text: "A thin wire is threaded through the blood vessels from the wrist or groin until it crosses the narrowed section." },
  { name: "Balloon expands", text: "The folded stent rides over the wire on a balloon. Inflating the balloon pushes the plaque back and expands the mesh." },
  { name: "Stent stays", text: "The balloon is deflated and removed, but the stent keeps its new shape and holds the artery open." },
  { name: "Flow restored", text: "Blood flows freely again. The vessel lining slowly grows over the struts, and medicine coatings help stop it narrowing again." },
];

const LABELS = [
  { id: 0, name: "Stent mesh", tx: 880, ty: 105, x: 760, y: 330 },
  { id: 1, name: "Artery wall", tx: 990, ty: 730, x: 1060, y: 500 },
  { id: 2, name: "Open channel", tx: 130, ty: 230, x: 520, y: 450 },
  { id: 3, name: "Blood flow", tx: 130, ty: 815, x: 210, y: 590 },
] as const;

function Stents() {
  const [part, setPart] = useState(0);
  const [step, setStep] = useState(0);
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-5xl">
    <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/devices"><ArrowLeft /> Medical Devices</Link></Button>
    <p className="font-mono text-xs uppercase tracking-widest text-lavender-deep">Medical Devices · Unit 3</p>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Stents</h1>
    <StenosisTabs />
    <p className="mt-6 max-w-2xl text-muted-foreground">A stent is the engineer's answer to stenosis: a tiny metal mesh tube that is expanded inside the narrowed artery to hold it open. Tap a label on the picture to learn about that part.</p>

    <figure className="mt-8 overflow-hidden rounded-3xl border border-border shadow-soft">
      <div className="relative">
        <img src={stentImg} alt="A metallic mesh stent expanded inside an artery, with red blood cells flowing through the open channel" width={1280} height={896} className="block w-full" />
        <svg viewBox="0 0 1280 896" role="group" aria-label="Labelled parts of the stent" className="absolute inset-0 h-full w-full">
          {LABELS.map((l) => {
            const active = l.id === part;
            return (
              <g
                key={l.id}
                role="button"
                tabIndex={0}
                aria-pressed={active}
                aria-label={l.name}
                onClick={() => setPart(l.id)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setPart(l.id); } }}
                className="cursor-pointer outline-none"
              >
                <rect
                  x={Math.min(l.x, l.tx) - 130}
                  y={Math.min(l.y, l.ty) - 40}
                  width={Math.abs(l.x - l.tx) + 260}
                  height={Math.abs(l.y - l.ty) + 80}
                  fill="transparent"
                />
                <line x1={l.x} y1={l.y} x2={l.tx} y2={l.ty} strokeWidth="3" className={active ? "stroke-mint" : "stroke-foreground/50"} />
                <circle cx={l.x} cy={l.y} r="10" className={active ? "fill-mint" : "fill-foreground/70"} />
                <text
                  x={l.tx}
                  y={l.ty}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="30"
                  fontWeight="700"
                  stroke="var(--background)"
                  strokeWidth="8"
                  strokeLinejoin="round"
                  style={{ paintOrder: "stroke" }}
                  className={active ? "fill-mint" : "fill-foreground"}
                >{l.name}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="border-t border-border bg-card/70 px-5 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">Tap a label on the picture</figcaption>
    </figure>

    <h2 className="mt-12 text-2xl font-bold">Main parts</h2>
    <p className="mt-4 rounded-2xl bg-card p-5 text-sm leading-relaxed shadow-soft"><strong>{PARTS[part]!.name}:</strong> {PARTS[part]!.text}</p>

    <h2 className="mt-12 text-2xl font-bold">How it is placed</h2>
    <div className="mt-4 grid gap-3 sm:grid-cols-4">
      {STEPS.map((s, i) => <button key={s.name} onClick={() => setStep(i)} className={cn("rounded-2xl border p-4 text-left transition-all", i === step ? "border-mint bg-mint/15" : "border-border bg-card hover:-translate-y-0.5")}>
        <div className="font-mono text-xs text-muted-foreground">0{i + 1}</div>
        <div className="font-display font-semibold">{s.name}</div>
      </button>)}
    </div>
    <p className="mt-4 rounded-2xl bg-card p-5 text-sm leading-relaxed shadow-soft">{STEPS[step]!.text}</p>

    <div className="mt-12 rounded-3xl border border-dashed border-border bg-card/70 p-6">
      <h2 className="font-display text-xl font-bold">Engineering link</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">A stent must be flexible enough to travel through twisting arteries, yet strong enough to resist the wall squeezing back — a balance of radial strength and flexibility. Modern stents are drug-eluting, coated with medicine that stops tissue growing back over the mesh, and some are bioresorbable, dissolving away once the vessel has healed. Every design is fatigue-tested for hundreds of millions of heartbeats before it reaches a patient.</p>
    </div>
  </div></section>;
}
