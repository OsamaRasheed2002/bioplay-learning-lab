import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { useState } from "react";

import lungs from "@/assets/respiratory-anatomy.jpg";
import { Button } from "@/components/ui/button";
import { RESPIRATORY_PARTS, RESPIRATORY_SECTIONS, type RespiratorySection } from "@/data/respiratory";
import { cn } from "@/lib/utils";

export function RespiratoryLesson({ section }: { section: RespiratorySection }) {
  const current = RESPIRATORY_SECTIONS.find((item) => item.id === section);
  if (!current) return null;
  return (
    <section className="px-5 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/anatomy/respiratory"><ArrowLeft /> Respiratory System</Link></Button>
        <div className="font-mono text-xs uppercase tracking-widest text-mint-deep">Anatomy Explorer · Respiratory system</div>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{current.title}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{current.description}</p>
        <nav aria-label="Respiratory sections" className="my-7 flex flex-wrap gap-2">
          {RESPIRATORY_SECTIONS.map((item) => <Button key={item.id} asChild size="sm" variant={section === item.id ? "default" : "outline"}><Link to={item.to} aria-current={section === item.id ? "page" : undefined}>{item.title}</Link></Button>)}
        </nav>
        {section === "anatomy" ? <Anatomy /> : section === "breathing" ? <Breathing /> : <Biomechanics />}
        <div className="mt-10 flex justify-end">
          <Button asChild variant="outline"><Link to={section === "anatomy" ? "/anatomy/respiratory/breathing" : section === "breathing" ? "/anatomy/respiratory/biomechanics" : "/anatomy/respiratory"}>{section === "biomechanics" ? "Back to sections" : "Next section"}<ArrowRight /></Link></Button>
        </div>
      </div>
    </section>
  );
}

function Anatomy() {
  const [selected, setSelected] = useState(0);
  const part = RESPIRATORY_PARTS[selected];
  return <div className="grid items-start gap-8 md:grid-cols-2">
    <figure><img src={lungs} alt="Front view of the trachea, branching bronchi, right and left lungs, and diaphragm" width={1024} height={1024} className="aspect-square w-full rounded-3xl object-contain" /><figcaption className="mt-3 text-center font-mono text-xs text-muted-foreground">Front view · Your right lung is on the left of the image</figcaption></figure>
    <div>
      <h2 className="mb-4 text-2xl font-bold">Meet the main structures</h2>
      <div className="flex flex-col gap-2" aria-label="Respiratory structures">{RESPIRATORY_PARTS.map((item, index) => <Button key={item.name} variant={selected === index ? "default" : "outline"} className="h-12 justify-start" aria-pressed={selected === index} onClick={() => setSelected(index)}><span className="w-6 font-mono text-xs">0{index + 1}</span>{item.name}</Button>)}</div>
      <div aria-live="polite" className="mt-6 min-h-40 border-l-2 border-mint pl-5"><h3 className="text-xl font-semibold">{part?.name}</h3><p className="mt-2 leading-relaxed text-muted-foreground">{part?.text}</p></div>
      <div className="mt-4 border-t border-border pt-5"><h3 className="font-semibold text-sky-deep">The route air takes</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Nose or mouth → throat → trachea → bronchi → bronchioles → alveoli.</p></div>
    </div>
  </div>;
}

function BreathingDiagram({ inhale }: { inhale: boolean }) {
  return <svg viewBox="0 0 400 340" role="img" aria-label={inhale ? "Inhalation: chest expands and diaphragm moves down" : "Exhalation: chest gets smaller and diaphragm relaxes upward"} className="mx-auto w-full max-w-md">
    <path d="M95 60 Q40 180 85 280 M305 60 Q360 180 315 280" className="stroke-border" fill="none" strokeWidth="5" />
    <path d="M200 28 V110 M200 105 L158 147 M200 105 L242 147" className="stroke-foreground" strokeWidth="13" fill="none" strokeLinecap="round" />
    <g className={cn("origin-center transition-transform duration-700 motion-reduce:transition-none", inhale ? "scale-100" : "scale-90")}>
      <path d="M170 102 C112 80 70 170 85 240 C92 268 164 255 176 238 L176 137 Z" className="fill-peach stroke-peach-deep" strokeWidth="2" />
      <path d="M230 102 C288 80 330 170 315 240 C308 268 236 255 224 238 L224 137 Z" className="fill-peach stroke-peach-deep" strokeWidth="2" />
      <path d="M155 149 L120 178 M153 150 L144 220 M245 149 L280 178 M247 150 L256 220" className="stroke-peach-deep" strokeWidth="5" fill="none" strokeLinecap="round" />
    </g>
    <path d={inhale ? "M78 286 Q200 261 322 286" : "M78 280 Q200 198 322 280"} className="stroke-mint-deep" strokeWidth="8" fill="none" strokeLinecap="round" />
    <text x="200" y="326" textAnchor="middle" className="fill-mint-deep font-mono text-sm">Diaphragm {inhale ? "contracts ↓" : "relaxes ↑"}</text>
  </svg>;
}

function Breathing() {
  const [inhale, setInhale] = useState(true);
  return <>
    <div className="grid items-center gap-8 md:grid-cols-2">
      <div className="rounded-3xl border border-border bg-card p-5"><BreathingDiagram inhale={inhale} /><p className="text-center font-mono text-xs text-muted-foreground">Simplified breathing cycle</p></div>
      <div>
        <div className="mb-6 flex gap-2" aria-label="Breathing phase"><Button aria-pressed={inhale} variant={inhale ? "default" : "outline"} onClick={() => setInhale(true)}><ArrowDown /> Breathe in</Button><Button aria-pressed={!inhale} variant={!inhale ? "default" : "outline"} onClick={() => setInhale(false)}><ArrowUp /> Breathe out</Button></div>
        <div aria-live="polite" className="min-h-56"><h2 className="text-2xl font-bold">{inhale ? "Inhalation" : "Quiet exhalation"}</h2><ol className="mt-4 space-y-4 text-muted-foreground">
          {(inhale ? ["The diaphragm contracts downward, and the rib cage expands.", "Chest volume increases, so pressure inside the lungs falls below outside air pressure.", "Air flows into the lungs."] : ["The diaphragm relaxes upward, and the rib cage returns inward.", "Elastic recoil reduces lung volume, raising pressure inside the lungs above outside air pressure.", "Air flows out. At rest, this is mostly passive."]).map((text, i) => <li key={text} className="flex gap-3"><span className="font-mono text-mint-deep">0{i + 1}</span>{text}</li>)}
        </ol></div>
      </div>
    </div>
    <div className="mt-10 border-t border-border pt-8"><h2 className="text-2xl font-bold">At the alveoli: swapping gases</h2><div className="mt-4 grid gap-6 sm:grid-cols-2"><div className="border-l-2 border-mint pl-4"><h3 className="font-semibold text-mint-deep">Oxygen → blood</h3><p className="mt-2 text-sm text-muted-foreground">Oxygen diffuses from the alveoli into nearby capillaries, then is carried mainly by haemoglobin in red blood cells.</p></div><div className="border-l-2 border-sky pl-4"><h3 className="font-semibold text-sky-deep">Carbon dioxide → alveoli</h3><p className="mt-2 text-sm text-muted-foreground">Carbon dioxide diffuses from the blood into the alveoli and leaves when you breathe out.</p></div></div><p className="mt-4 text-sm text-muted-foreground">Each gas moves down its own partial-pressure gradient — from higher to lower.</p></div>
  </>;
}

function Biomechanics() {
  const [narrow, setNarrow] = useState(false);
  return <>
    <div className="grid gap-8 md:grid-cols-2">
      <div><h2 className="text-2xl font-bold">Airflow & resistance</h2><p className="mt-3 leading-relaxed text-muted-foreground">A pressure difference drives airflow. Narrower airways create more resistance, so the same pressure difference moves less air.</p><div className="mt-5 flex flex-wrap gap-2" aria-label="Airway width"><Button variant={!narrow ? "default" : "outline"} aria-pressed={!narrow} onClick={() => setNarrow(false)}>Open airway</Button><Button variant={narrow ? "default" : "outline"} aria-pressed={narrow} onClick={() => setNarrow(true)}>Narrow airway</Button></div><p aria-live="polite" className="mt-5 min-h-16 text-sm text-muted-foreground">{narrow ? "Higher resistance → less airflow at the same pressure difference. This can happen when airways tighten, as in asthma." : "Lower resistance → easier airflow at the same pressure difference."}</p></div>
      <div className="rounded-3xl border border-border bg-card p-6"><div className="font-mono text-xs text-muted-foreground">Same driving pressure · simplified airway</div><div className="mt-7 flex h-40 items-center"><div className={cn("flex w-full items-center justify-center gap-3 border-y-[12px] border-peach bg-sky-soft transition-all duration-500 motion-reduce:transition-none", narrow ? "h-14" : "h-32")} role="img" aria-label={narrow ? "Narrow airway with reduced airflow" : "Open airway with greater airflow"}>{Array.from({ length: narrow ? 1 : 4 }, (_, i) => <ArrowRight key={i} className="size-6 text-sky-deep" />)}</div></div><p className="mt-4 text-center font-semibold text-sky-deep">{narrow ? "Less airflow" : "More airflow"}</p></div>
    </div>
    <div className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
      <div><h2 className="text-xl font-bold text-mint-deep">Compliance</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">How easily the lungs stretch. Stiffer lungs have lower compliance and need more pressure for the same increase in volume.</p></div>
      <div><h2 className="text-xl font-bold text-peach-deep">Elastic recoil</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Stretched lung tissue tends to spring back. This helps push air out during a quiet breath.</p></div>
      <div><h2 className="text-xl font-bold text-lavender-deep">Surfactant</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">A coating inside the alveoli lowers surface tension, helping keep the air sacs open and reducing the effort of inflation.</p></div>
    </div>
    <div className="mt-8 border-l-2 border-sky pl-5"><h3 className="font-semibold text-sky-deep">Biomedical engineering link</h3><p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">Ventilators use controlled pressure or volume to support breathing. Airway resistance and lung compliance help explain how much support a person needs.</p></div>
  </>;
}