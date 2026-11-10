import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import pacemaker from "@/assets/pacemaker.jpg";

export const Route = createFileRoute("/devices_/pacemakers")({
  head: () => ({ meta: [
    { title: "Pacemakers · BEPlay" },
    { name: "description", content: "How a pacemaker senses the heartbeat and sends tiny electrical pulses to keep it on rhythm." },
    { property: "og:title", content: "Pacemakers · BEPlay" },
    { property: "og:description", content: "Learn the parts of a pacemaker and how it keeps the heart beating on time." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Pacemakers,
});

const PARTS = [
  { name: "Pulse generator", text: "A small sealed titanium case under the skin below the collarbone. It holds the battery and the computer chip." },
  { name: "Battery", text: "A lithium battery that lasts around 7–12 years. When it runs low, the whole generator is replaced." },
  { name: "Leads", text: "Thin insulated wires that travel through a vein into the heart, carrying signals both ways." },
  { name: "Electrode tip", text: "The end of the lead, fixed to the heart wall. It senses the heart's own beats and delivers the pulse." },
];

const STEPS = [
  { name: "Sense", text: "The electrode listens to the heart's natural electrical activity, beat by beat." },
  { name: "Decide", text: "If no beat arrives in time (heart too slow or paused), the chip decides a pulse is needed." },
  { name: "Pace", text: "It sends a tiny electrical pulse (a few volts, under 1 ms) that makes the muscle contract." },
  { name: "Adapt", text: "Motion sensors raise the heart rate during exercise, just like a healthy heart would." },
];

function Pacemakers() {
  const [part, setPart] = useState(0);
  const [step, setStep] = useState(0);
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-5xl">
    <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/devices"><ArrowLeft /> Medical Devices</Link></Button>
    <p className="font-mono text-xs uppercase tracking-widest text-lavender-deep">Medical Devices · Unit 1</p>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Pacemakers</h1>
    <p className="mt-3 max-w-2xl text-muted-foreground">A pacemaker is a small implanted device that keeps the heart beating at a safe rate when its natural electrical system is too slow or irregular.</p>

    <figure className="mt-8 overflow-hidden rounded-3xl border border-border shadow-soft">
      <div className="relative">
        <img src={pacemaker} alt="Pacemaker under the skin below the left collarbone with a lead running through a vein into the heart" width={1280} height={896} className="block w-full" />
        <svg viewBox="0 0 1280 896" role="img" aria-label={`${PARTS[part]!.name} highlighted on the pacemaker`} className="pointer-events-none absolute inset-0 h-full w-full text-mint">
          <defs><filter id="pacemaker-highlight-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
          <g key={part} filter="url(#pacemaker-highlight-glow)" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="animate-fade-up">
            {part === 0 && <rect x="929" y="143" width="152" height="148" rx="44" strokeWidth="6" />}
            {part === 1 && <rect x="938" y="186" width="136" height="100" rx="40" className="fill-mint/25" strokeWidth="6" />}
            {part === 2 && <g strokeWidth="5"><path d="M963 166 C880 148 782 146 702 166 C642 184 601 228 590 298 C584 348 592 400 601 442 C613 492 641 542 681 592 C696 616 705 640 708 657" /><path d="M963 180 C882 164 786 162 708 182 C648 200 610 242 599 302 C594 340 596 372 598 396" /></g>}
            {part === 3 && <g><circle cx="708" cy="657" r="19" className="fill-mint/30" strokeWidth="6" /><circle cx="598" cy="397" r="14" className="fill-mint/30" strokeWidth="5" /></g>}
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

    <h2 className="mt-12 text-2xl font-bold">How it works</h2>
    <div className="mt-4 grid gap-3 sm:grid-cols-4">
      {STEPS.map((s, i) => <button key={s.name} onClick={() => setStep(i)} className={cn("rounded-2xl border p-4 text-left transition-all", i === step ? "border-mint bg-mint/15" : "border-border bg-card hover:-translate-y-0.5")}>
        <div className="font-mono text-xs text-muted-foreground">0{i + 1}</div>
        <div className="font-display font-semibold">{s.name}</div>
      </button>)}
    </div>
    <p className="mt-4 rounded-2xl bg-card p-5 text-sm leading-relaxed shadow-soft">{STEPS[step]!.text}</p>

    <div className="mt-12 rounded-3xl border border-dashed border-border bg-card/70 p-6">
      <h2 className="font-display text-xl font-bold">Engineering link</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Engineers design pacemakers to be tiny, biocompatible and ultra low-power, and to ignore interference from phones or MRI. Newer leadless pacemakers fit entirely inside the heart.</p>
    </div>
  </div></section>;
}
