import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

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
  const g = (i: number) => cn("transition-all duration-300", selected === i ? "stroke-mint-deep fill-mint/25" : "stroke-muted-foreground/50 fill-transparent");
  return <svg viewBox="0 0 200 400" role="img" aria-label={`${SKELETAL_PARTS[selected]?.name} highlighted on the skeleton`} className="mx-auto h-full max-h-[520px] w-full" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
    <defs><filter id="bone-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
    <g className={g(0)} filter={selected === 0 ? "url(#bone-glow)" : undefined}><ellipse cx="100" cy="32" rx="20" ry="23" /><path d="M87 50 Q100 64 113 50" /></g>
    <g className={g(1)} filter={selected === 1 ? "url(#bone-glow)" : undefined}>{Array.from({ length: 14 }, (_, i) => <rect key={i} x="95" y={62 + i * 11.5} width="10" height="8" rx="2" />)}</g>
    <g className={g(2)} filter={selected === 2 ? "url(#bone-glow)" : undefined} fill="none"><path d="M100 78 V140" />{[85, 97, 109, 121, 133].map((y, i) => <g key={y}><path d={`M96 ${y} Q${66 - i} ${y + 2} ${70 + i * 2} ${y + 14}`} /><path d={`M104 ${y} Q${134 + i} ${y + 2} ${130 - i * 2} ${y + 14}`} /></g>)}</g>
    <g className={g(3)} filter={selected === 3 ? "url(#bone-glow)" : undefined}><path d="M100 225 C80 218 66 222 64 238 C64 254 80 262 92 258 L100 250 L108 258 C120 262 136 254 136 238 C134 222 120 218 100 225 Z" /></g>
    <g className={g(4)} filter={selected === 4 ? "url(#bone-glow)" : undefined}>
      <path d="M64 76 H136" /><path d="M66 80 L56 160 M134 80 L144 160" /><path d="M55 166 L48 236 M60 166 L54 236 M145 166 L152 236 M140 166 L146 236" />
      <path d="M82 262 L78 334 M118 262 L122 334" /><path d="M77 340 L76 392 M83 340 L82 392 M123 340 L124 392 M117 340 L118 392" />
    </g>
    <g className="fill-background stroke-muted-foreground/50" strokeWidth="2">{[[56, 163], [144, 163], [80, 337], [120, 337]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="4" />)}</g>
  </svg>;
}

function Anatomy() {
  const [selected, setSelected] = useState(0);
  const part = SKELETAL_PARTS[selected];
  return <div className="grid items-start gap-8 md:grid-cols-2">
    <figure className="rounded-3xl border border-border bg-card p-6"><Skeleton selected={selected} /><figcaption className="mt-3 text-center font-mono text-xs text-muted-foreground">Simplified front view · 206 bones in an adult</figcaption></figure>
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
