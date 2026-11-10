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
    {section === "anatomy" ? <Anatomy /> : <Digestion />}
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
