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

function Stents() {
  const [part, setPart] = useState(0);
  const [step, setStep] = useState(0);
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-5xl">
    <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/devices"><ArrowLeft /> Medical Devices</Link></Button>
    <p className="font-mono text-xs uppercase tracking-widest text-lavender-deep">Medical Devices · Unit 3</p>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Stents</h1>
    <StenosisTabs />
    <p className="mt-6 max-w-2xl text-muted-foreground">A stent is the engineer's answer to stenosis: a tiny metal mesh tube that is expanded inside the narrowed artery to hold it open. Tap each part below to see it on the picture.</p>

    <figure className="mt-8 overflow-hidden rounded-3xl border border-border shadow-soft">
      <div className="relative">
        <img src={stentImg} alt="A metallic mesh stent expanded inside an artery, with red blood cells flowing through the open channel" width={1280} height={896} className="block w-full" />
        <svg viewBox="0 0 1280 896" role="img" aria-label={`${PARTS[part]!.name} highlighted on the stent`} className="pointer-events-none absolute inset-0 h-full w-full text-mint">
          <defs><filter id="stent-highlight-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
          <g key={part} filter="url(#stent-highlight-glow)" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="animate-fade-up">
            {part === 0 && <ellipse cx="700" cy="390" rx="430" ry="180" transform="rotate(-18 700 390)" strokeWidth="6" />}
            {part === 1 && <g strokeWidth="14" opacity="0.8"><path d="M 60,420 C 350,300 700,180 1240,60" /><path d="M 20,700 C 350,640 750,520 1270,400" /></g>}
            {part === 2 && <ellipse cx="700" cy="390" rx="340" ry="110" transform="rotate(-18 700 390)" className="fill-mint/20" strokeWidth="6" />}
            {part === 3 && <g><ellipse cx="200" cy="560" rx="150" ry="110" className="fill-mint/15" strokeWidth="6" /><ellipse cx="1170" cy="200" rx="120" ry="90" className="fill-mint/15" strokeWidth="6" /></g>}
          </g>
        </svg>
      </div>
      <figcaption className="border-t border-border bg-card/70 px-5 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">Tap a part below to see it highlighted</figcaption>
    </figure>

    <h2 className="mt-12 text-2xl font-bold">Main parts</h2>
    <div className="mt-4 flex flex-wrap gap-2">
      {PARTS.map((p, i) => <Button key={p.name} size="sm" variant={i === part ? "default" : "outline"} onClick={() => setPart(i)}>{p.name}</Button>)}
    </div>
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
