import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import valveTypes from "@/assets/valve-types.jpg";
import valveImplanted from "@/assets/valve-implanted.jpg";
import { ValveTabs } from "@/components/bio/ValveTabs";

export const Route = createFileRoute("/devices_/valves")({
  head: () => ({ meta: [
    { title: "Artificial Heart Valves · BEPlay" },
    { name: "description", content: "How mechanical and biological heart valves replace a damaged one, and the engineering behind each design." },
    { property: "og:title", content: "Artificial Heart Valves · BEPlay" },
    { property: "og:description", content: "Learn the parts of a prosthetic heart valve and how it opens, closes and seals." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Valves,
});

const PARTS = [
  { name: "Mechanical valve", text: "Two pyrolytic carbon discs on a polished metal ring. They snap open and shut and can last a lifetime, but blood clots easily on them, so the patient takes blood thinners for life." },
  { name: "Biological valve", text: "Three leaflets made from pig or cow heart tissue, sewn onto a metal stent. Closer to a natural valve and no long-term blood thinners, but they wear out after roughly 10–20 years." },
  { name: "Leaflets & discs", text: "The moving parts. Pressure from the heart pushes them open, and when pressure drops behind them they fall shut again to stop backflow." },
  { name: "Sewing ring", text: "A fabric cuff the surgeon stitches to the heart so the valve sits firmly in the annulus with no leaks around the edge." },
];

const STEPS = [
  { name: "Pressure builds", text: "The ventricle squeezes and the pressure behind the valve rises above the pressure in the artery." },
  { name: "Opens", text: "That pressure difference pushes the discs or leaflets open and blood rushes through the valve." },
  { name: "Closes", text: "As the ventricle relaxes, blood starts to fall back and catches the leaflets, snapping them shut." },
  { name: "Seals", text: "The closed valve stops backflow, so the heart does not have to pump the same blood twice." },
];


function Valves() {
  const [part, setPart] = useState(0);
  const [step, setStep] = useState(0);
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-5xl">
    <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/devices"><ArrowLeft /> Medical Devices</Link></Button>
    <p className="font-mono text-xs uppercase tracking-widest text-lavender-deep">Medical Devices · Unit 2</p>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Artificial valves</h1>
    <ValveTabs />
    <p className="mt-6 max-w-2xl text-muted-foreground">A heart valve is a one-way door. When a natural valve narrows or leaks, surgeons can replace it with a prosthetic one — and the two main designs make very different engineering trade-offs.</p>

    <figure className="mt-8 overflow-hidden rounded-3xl border border-border shadow-soft">
      <div className="relative">
        <img src={valveTypes} alt="A mechanical bileaflet heart valve next to a biological tissue heart valve" width={1280} height={896} className="block w-full" />
        <svg viewBox="0 0 1280 896" role="img" aria-label={`${PARTS[part]!.name} highlighted on the valves`} className="pointer-events-none absolute inset-0 h-full w-full text-mint">
          <defs><filter id="valve-highlight-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
          <g key={part} filter="url(#valve-highlight-glow)" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="animate-fade-up">
            {part === 0 && <ellipse cx="332" cy="432" rx="272" ry="252" strokeWidth="6" />}
            {part === 1 && <ellipse cx="958" cy="420" rx="272" ry="282" strokeWidth="6" />}
            {part === 2 && <g><ellipse cx="352" cy="414" rx="176" ry="172" transform="rotate(-22 352 414)" className="fill-mint/20" strokeWidth="6" /><ellipse cx="958" cy="336" rx="214" ry="182" className="fill-mint/20" strokeWidth="6" /></g>}
            {part === 3 && <g strokeWidth="26" className="stroke-mint/45"><ellipse cx="332" cy="436" rx="262" ry="244" /><ellipse cx="958" cy="612" rx="246" ry="86" strokeWidth="30" /></g>}
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

    <figure className="mt-10 overflow-hidden rounded-3xl border border-border shadow-soft">
      <img src={valveImplanted} alt="A mechanical heart valve sewn into the aortic position of a cross-sectioned human heart" width={1280} height={896} loading="lazy" className="block w-full" />
      <figcaption className="border-t border-border bg-card/70 px-5 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">A replacement valve sewn into the aortic position</figcaption>
    </figure>

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
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">A valve opens around 100,000 times a day, so engineers test every design in rigs that copy the heart's pressure and flow for tens of millions of cycles. They measure how wide the valve opens, how much the flow is disturbed, and how much blood is damaged by shear. Newer valves are folded into a catheter and expanded in place (TAVR), avoiding open-heart surgery.</p>
    </div>
  </div></section>;
}
