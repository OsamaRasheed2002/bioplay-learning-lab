import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import digestiveImage from "@/assets/digestive-anatomy.jpg";
import { Button } from "@/components/ui/button";
import { DIGESTIVE_PARTS, DIGESTIVE_SECTIONS, DIGESTION_STEPS, type DigestiveSection } from "@/data/digestive";

export function DigestiveLesson({ section }: { section: DigestiveSection }) {
  const current = DIGESTIVE_SECTIONS.find((item) => item.id === section);
  if (!current) return null;
  const index = DIGESTIVE_SECTIONS.findIndex((item) => item.id === section);
  const next = DIGESTIVE_SECTIONS[index + 1];
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-6xl">
    <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/anatomy/digestive"><ArrowLeft /> Digestive System</Link></Button>
    <div className="font-mono text-xs uppercase tracking-widest text-peach-deep">Anatomy Explorer · Digestive system</div>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{current.title}</h1>
    <p className="mt-3 max-w-2xl text-muted-foreground">{current.description}</p>
    <nav aria-label="Digestive system sections" className="my-7 flex flex-wrap gap-2">{DIGESTIVE_SECTIONS.map((item) => <Button key={item.id} asChild size="sm" variant={section === item.id ? "default" : "outline"}><Link to={item.to} aria-current={section === item.id ? "page" : undefined}>{item.title}</Link></Button>)}</nav>
    {section === "anatomy" ? <Anatomy /> : section === "digestion" ? <Digestion /> : <Biomechanics />}
    <div className="mt-10 flex justify-end"><Button asChild variant="outline"><Link to={next?.to ?? "/anatomy/digestive"}>{next ? "Next section" : "Back to sections"}<ArrowRight /></Link></Button></div>
  </div></section>;
}

function DigestivePicture({ selected }: { selected: number }) {
  const part = DIGESTIVE_PARTS[selected];
  return <figure><div className="relative mx-auto max-w-md overflow-hidden rounded-3xl">
    <img src={digestiveImage} alt="Front-view anatomical render showing the mouth, oesophagus, liver, stomach, pancreas and intestines" width={1024} height={1536} className="block h-auto w-full" />
    <svg viewBox="0 0 1024 1536" role="img" aria-label={`${part?.name} highlighted on the digestive system`} className="pointer-events-none absolute inset-0 h-full w-full text-mint-deep">
      <path key={selected} d={part?.highlight} stroke="currentColor" strokeWidth={selected === 4 ? 22 : 5} strokeLinecap="round" strokeLinejoin="round" className={selected === 4 ? "fill-none" : "fill-mint/20"} />
    </svg>
  </div><figcaption className="mt-3 text-center font-mono text-xs text-muted-foreground">Front view · illustrative anatomical render</figcaption></figure>;
}

function Anatomy() {
  const [selected, setSelected] = useState(0);
  const part = DIGESTIVE_PARTS[selected];
  return <div className="grid items-start gap-8 md:grid-cols-2"><DigestivePicture selected={selected} /><div>
    <h2 className="mb-4 text-2xl font-bold">Meet the main organs</h2>
    <div className="flex flex-col gap-2" aria-label="Digestive structures">{DIGESTIVE_PARTS.map((item, i) => <Button key={item.name} className="h-auto min-h-12 justify-start whitespace-normal py-3 text-left" variant={selected === i ? "default" : "outline"} aria-pressed={selected === i} onClick={() => setSelected(i)}><span className="w-6 shrink-0 font-mono text-xs">0{i + 1}</span>{item.name}</Button>)}</div>
    <div aria-live="polite" className="mt-6 min-h-44 border-l-2 border-mint pl-5"><h3 className="text-xl font-bold">{part?.name}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{part?.text}</p></div>
    <div className="mt-6 border-t border-border pt-5"><h3 className="font-semibold text-peach-deep">One continuous route</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Mouth → pharynx → oesophagus → stomach → small intestine → large intestine → rectum → anus.</p></div>
  </div></div>;
}

function Digestion() {
  const [selected, setSelected] = useState(0);
  const step = DIGESTION_STEPS[selected];
  return <><div className="grid items-start gap-8 md:grid-cols-2"><DigestivePicture selected={step?.part ?? 0} /><div>
    <h2 className="mb-4 text-2xl font-bold">The journey of a meal</h2>
    <div className="flex flex-col gap-2" aria-label="Digestion stages">{DIGESTION_STEPS.map((item, i) => <Button key={item.name} variant={selected === i ? "default" : "outline"} aria-pressed={selected === i} onClick={() => setSelected(i)} className="h-auto min-h-12 justify-start whitespace-normal py-3 text-left"><span className="w-6 shrink-0 font-mono text-xs">0{i + 1}</span>{item.name}</Button>)}</div>
    <div aria-live="polite" className="mt-6 min-h-48 border-l-2 border-mint pl-5"><p className="font-mono text-xs text-mint-deep">STAGE {selected + 1} / {DIGESTION_STEPS.length}</p><h3 className="mt-2 text-xl font-bold">{step?.name}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{step?.text}</p></div>
    <div className="mt-5 flex justify-end gap-2"><Button variant="outline" size="icon" aria-label="Reset digestion" title="Reset digestion" onClick={() => setSelected(0)}><RotateCcw /></Button><Button onClick={() => setSelected((selected + 1) % DIGESTION_STEPS.length)}>{selected === DIGESTION_STEPS.length - 1 ? "Start again" : "Follow the food"}<ArrowRight /></Button></div>
  </div></div><div className="mt-9 grid gap-6 border-t border-border pt-7 sm:grid-cols-2"><div><h3 className="text-xl font-bold text-peach-deep">Mechanical digestion</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Chewing, churning and mixing physically break food up and bring it into contact with digestive fluids.</p></div><div><h3 className="text-xl font-bold text-mint-deep">Chemical digestion</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Enzymes break large molecules into smaller ones that can be absorbed. Bile helps fat digestion by emulsifying fats; it is not an enzyme.</p></div></div></>;
}

function Biomechanics() {
  const [mixing, setMixing] = useState(false);
  const [phase, setPhase] = useState(0);
  return <>
    <div className="grid items-center gap-8 md:grid-cols-2"><div>
      <h2 className="text-2xl font-bold">Muscles move the meal</h2>
      <div className="mt-5 flex flex-wrap gap-2" aria-label="Gut movement"><Button variant={!mixing ? "default" : "outline"} aria-pressed={!mixing} onClick={() => { setMixing(false); setPhase(0); }}>Peristalsis</Button><Button variant={mixing ? "default" : "outline"} aria-pressed={mixing} onClick={() => { setMixing(true); setPhase(0); }}>Segmentation</Button></div>
      <div aria-live="polite" className="mt-5 min-h-40"><h3 className="text-xl font-bold text-mint-deep">{mixing ? "Mixing in place" : "A travelling squeeze"}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{mixing ? "Alternating local contractions mix intestinal contents with enzymes and bring nutrients against the lining. Segmentation mainly mixes rather than pushing everything in one direction." : "A coordinated wave of smooth-muscle contraction behind the contents, with relaxation ahead, helps propel them along the digestive tract."}</p></div>
    </div><div>
      <svg viewBox="0 0 600 240" role="img" aria-label={`${mixing ? "Segmentation mixing" : "Peristaltic wave"}, phase ${phase + 1}`} className="w-full">
        <path d="M25 65 H575 M25 175 H575" className="stroke-peach" fill="none" strokeWidth="18" strokeLinecap="round" />
        <path d="M25 90 H575 V150 H25 Z" className="fill-peach-soft" />
        {(mixing ? (phase % 2 === 0 ? [140, 330, 500] : [230, 420]) : [90 + phase * 100]).map((x) => <g key={x} className="stroke-mint-deep" fill="none" strokeWidth="12" strokeLinecap="round"><path d={`M${x - 30} 65 Q${x} 125 ${x + 30} 65`} /><path d={`M${x - 30} 175 Q${x} 115 ${x + 30} 175`} /></g>)}
        <ellipse cx={mixing ? 290 + (phase % 2) * 35 : 160 + phase * 90} cy="120" rx="32" ry="20" className="fill-sky stroke-sky-deep" strokeWidth="3" />
        <text x="300" y="220" textAnchor="middle" className="fill-muted-foreground font-mono text-sm">{mixing ? "Local squeezes · mixing" : "Wave travels → · propulsion"}</text>
      </svg>
      <div className="mt-3 flex items-center justify-between gap-3"><span className="font-mono text-xs text-muted-foreground">Simplified gut segment · {phase + 1} / 5</span><Button variant="outline" onClick={() => setPhase((phase + 1) % 5)}>Next phase<ArrowRight /></Button></div>
    </div></div>
    <div className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-3"><div><h2 className="text-xl font-bold text-peach-deep">Stretch & storage</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">The stomach relaxes and expands to accommodate a meal. Its muscle wall later contracts to mix and empty the contents.</p></div><div><h2 className="text-xl font-bold text-mint-deep">Sphincter control</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Rings of muscle regulate passage between regions. The lower oesophageal sphincter helps limit reflux; the pylorus controls release from the stomach.</p></div><div><h2 className="text-xl font-bold text-sky-deep">Absorption surface</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Folds and microscopic projections increase the small intestine's surface area. A thin lining keeps the transport distance short.</p></div></div>
    <div className="mt-8 border-l-2 border-lavender pl-5"><h3 className="font-semibold text-lavender-deep">Biomedical engineering link</h3><p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">Manometry measures pressure patterns to study gut movement. Endoscopes and capsule cameras reveal the lining, while drug-delivery systems use changes in pH and transit to release medicine at a chosen region.</p></div>
  </>;
}