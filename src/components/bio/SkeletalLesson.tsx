import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

import skeleton from "@/assets/skeleton-front.jpg";
import { Button } from "@/components/ui/button";
import { JOINT_TYPES, LOADS, SKELETAL_PARTS, SKELETAL_SECTIONS, type LoadId, type SkeletalSection } from "@/data/skeletal";
import { cn } from "@/lib/utils";

export function SkeletalLesson({ section }: { section: SkeletalSection }) {
  const current = SKELETAL_SECTIONS.find((item) => item.id === section);
  if (!current) return null;
  const next = section === "anatomy" ? "/anatomy/skeletal/bones" : section === "bones" ? "/anatomy/skeletal/biomechanics" : "/anatomy/skeletal";
  return (
    <section className="px-5 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/anatomy/skeletal"><ArrowLeft /> Skeletal System</Link></Button>
        <div className="font-mono text-xs uppercase tracking-widest text-mint-deep">Anatomy Explorer · Skeletal system</div>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{current.title}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{current.description}</p>
        <nav aria-label="Skeletal sections" className="my-7 flex flex-wrap gap-2">
          {SKELETAL_SECTIONS.map((item) => <Button key={item.id} asChild size="sm" variant={section === item.id ? "default" : "outline"}><Link to={item.to} aria-current={section === item.id ? "page" : undefined}>{item.title}</Link></Button>)}
        </nav>
        {section === "anatomy" ? <Anatomy /> : section === "bones" ? <Bones /> : <Biomechanics />}
        <div className="mt-10 flex justify-end">
          <Button asChild variant="outline"><Link to={next}>{section === "biomechanics" ? "Back to sections" : "Next section"}<ArrowRight /></Link></Button>
        </div>
      </div>
    </section>
  );
}

function Skeleton({ selected }: { selected: number }) {
  const bones = "M230 285 L205 520 M540 285 L565 520 M205 535 L165 710 M565 535 L605 710 M282 705 L318 975 M488 705 L452 975 M318 1035 L322 1350 M452 1035 L450 1350";
  return <div className="relative mx-auto aspect-[1/2] max-h-[620px] overflow-hidden rounded-2xl">
    <img src={skeleton} alt="Front view of a full human skeleton" width={768} height={1536} className="h-full w-full object-cover" />
    <svg viewBox="0 0 768 1536" role="img" aria-label={`${SKELETAL_PARTS[selected]?.name} highlighted on the skeleton`} className="pointer-events-none absolute inset-0 h-full w-full text-mint" strokeLinecap="round">
      <defs><filter id="bone-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="8" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
      <g key={selected} className="animate-fade-up" filter="url(#bone-glow)" stroke="currentColor" strokeWidth="6" fill="currentColor" fillOpacity="0.25">
        {selected === 0 && <ellipse cx="383" cy="92" rx="66" ry="88" />}
        {selected === 1 && <rect x="360" y="180" width="48" height="440" rx="22" />}
        {selected === 2 && <ellipse cx="385" cy="385" rx="128" ry="145" />}
        {selected === 3 && <ellipse cx="383" cy="660" rx="125" ry="92" />}
        {selected === 4 && <path d={bones} fill="none" strokeWidth="34" strokeOpacity="0.55" />}
      </g>
    </svg>
  </div>;
}

function Anatomy() {
  const [selected, setSelected] = useState(0);
  const part = SKELETAL_PARTS[selected];
  return <div className="grid items-start gap-8 md:grid-cols-2">
    <figure className="rounded-3xl border border-border bg-card p-4"><Skeleton selected={selected} /><figcaption className="mt-3 text-center font-mono text-xs text-muted-foreground">Simplified front view · 206 bones in an adult</figcaption></figure>
    <div>
      <h2 className="mb-4 text-2xl font-bold">Meet the main structures</h2>
      <div className="flex flex-col gap-2">{SKELETAL_PARTS.map((item, index) => <Button key={item.name} variant={selected === index ? "default" : "outline"} className="h-12 justify-start" aria-pressed={selected === index} onClick={() => setSelected(index)}><span className="w-6 font-mono text-xs">0{index + 1}</span>{item.name}</Button>)}</div>
      <div aria-live="polite" className="mt-6 min-h-32 border-l-2 border-mint pl-5"><h3 className="text-xl font-semibold">{part?.name}</h3><p className="mt-2 leading-relaxed text-muted-foreground">{part?.text}</p></div>
    </div>
  </div>;
}

const LAYERS = [
  { name: "Periosteum", text: "A tough outer skin with nerves and blood vessels. It helps bones grow and repair." },
  { name: "Compact bone", text: "Dense, hard outer layer that gives strength. Made of calcium phosphate minerals and collagen." },
  { name: "Spongy bone", text: "A light honeycomb inside the ends of bones. Its struts line up with the forces the bone feels." },
  { name: "Marrow", text: "Soft tissue in the centre. Red marrow makes blood cells; yellow marrow stores fat." },
];

function Bones() {
  const [layer, setLayer] = useState(1);
  const ring = (i: number) => layer === i ? "stroke-mint-deep" : "stroke-transparent";
  return <>
    <div className="grid items-center gap-8 md:grid-cols-2">
      <div className="rounded-3xl border border-border bg-card p-6">
        <svg viewBox="0 0 240 240" role="img" aria-label={`Bone cross-section with ${LAYERS[layer]?.name} highlighted`} className="mx-auto w-full max-w-xs" strokeWidth="4">
          <circle cx="120" cy="120" r="108" className={cn("fill-peach-soft", ring(0))} />
          <circle cx="120" cy="120" r="98" className={cn("fill-peach", ring(1))} />
          <circle cx="120" cy="120" r="66" className={cn("fill-plasma", ring(2))} />
          <circle cx="120" cy="120" r="40" className={cn("fill-redcell", ring(3))} />
        </svg>
        <p className="mt-3 text-center font-mono text-xs text-muted-foreground">Cross-section of a long bone</p>
      </div>
      <div>
        <div className="flex flex-wrap gap-2">{LAYERS.map((l, i) => <Button key={l.name} size="sm" variant={layer === i ? "default" : "outline"} aria-pressed={layer === i} onClick={() => setLayer(i)}>{l.name}</Button>)}</div>
        <div aria-live="polite" className="mt-6 min-h-28 border-l-2 border-mint pl-5"><h2 className="text-2xl font-bold">{LAYERS[layer]?.name}</h2><p className="mt-2 leading-relaxed text-muted-foreground">{LAYERS[layer]?.text}</p></div>
        <p className="mt-4 text-sm text-muted-foreground">Bones support the body, protect organs, anchor muscles, store calcium and make blood cells.</p>
      </div>
    </div>
    <div className="mt-10 border-t border-border pt-8"><h2 className="text-2xl font-bold">Joints: where movement happens</h2><p className="mt-2 text-sm text-muted-foreground">Muscles pull on bones through tendons; joints decide which way they can move.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{JOINT_TYPES.map((j) => <div key={j.name} className="rounded-2xl border border-border bg-card p-5"><h3 className="font-semibold text-sky-deep">{j.name}</h3><div className="mt-1 font-mono text-xs text-muted-foreground">{j.where}</div><p className="mt-3 text-sm text-muted-foreground">{j.text}</p></div>)}</div>
    </div>
  </>;
}

function LoadDiagram({ load }: { load: LoadId }) {
  const arrows: Record<LoadId, string> = {
    compression: "M120 10 V45 M110 35 L120 45 L130 35 M120 230 V195 M110 205 L120 195 L130 205",
    tension: "M120 45 V10 M110 20 L120 10 L130 20 M120 195 V230 M110 220 L120 230 L130 220",
    bending: "M40 120 H85 M75 110 L85 120 L75 130 M160 40 L150 55 M160 200 L150 185",
    torsion: "M85 40 A40 12 0 0 0 155 40 M147 32 L155 40 L145 46 M155 200 A40 12 0 0 1 85 200 M93 192 L85 200 L95 206",
  };
  return <svg viewBox="0 0 240 240" role="img" aria-label={`Bone under ${load}`} className="mx-auto w-full max-w-xs">
    <rect x="100" y="50" width="40" height="140" rx="16" className={cn("fill-peach stroke-peach-deep transition-transform duration-500 motion-reduce:transition-none", load === "compression" && "[transform:scaleY(0.92)]", load === "tension" && "[transform:scaleY(1.05)]", load === "bending" && "[transform:skewX(-6deg)]")} style={{ transformOrigin: "120px 120px" }} strokeWidth="3" />
    <path d={arrows[load]} className="stroke-sky-deep" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

function Biomechanics() {
  const [load, setLoad] = useState<LoadId>("compression");
  const current = LOADS.find((l) => l.id === load);
  return <>
    <div className="grid items-center gap-8 md:grid-cols-2">
      <div className="rounded-3xl border border-border bg-card p-6"><LoadDiagram load={load} /><p className="mt-3 text-center font-mono text-xs text-muted-foreground">Forces acting on a bone</p></div>
      <div><h2 className="text-2xl font-bold">Four ways bones get loaded</h2>
        <div className="mt-5 flex flex-wrap gap-2">{LOADS.map((l) => <Button key={l.id} size="sm" variant={load === l.id ? "default" : "outline"} aria-pressed={load === l.id} onClick={() => setLoad(l.id)}>{l.name}</Button>)}</div>
        <p aria-live="polite" className="mt-5 min-h-16 text-muted-foreground">{current?.text}</p>
      </div>
    </div>
    <div className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
      <div><h2 className="text-xl font-bold text-mint-deep">Stiff yet tough</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Minerals make bone hard; collagen fibres stop it from being brittle — like reinforced concrete.</p></div>
      <div><h2 className="text-xl font-bold text-peach-deep">Wolff's law</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Bone adapts to the loads it gets. Exercise makes it denser; long bed rest or space flight makes it weaker.</p></div>
      <div><h2 className="text-xl font-bold text-lavender-deep">Levers</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Bones are levers, joints are pivots and muscles provide the pull that creates movement.</p></div>
    </div>
    <div className="mt-8 border-l-2 border-sky pl-5"><h3 className="font-semibold text-sky-deep">Biomedical engineering link</h3><p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">Hip implants and bone plates are designed to carry these loads. If an implant is much stiffer than bone, it can "shield" the bone from stress and the bone weakens over time.</p></div>
  </>;
}
