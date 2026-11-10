import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Brain, Hand, RotateCcw, Zap } from "lucide-react";
import anatomy from "@/assets/nervous-anatomy.jpg";
import neuron from "@/assets/nervous-neuron.jpg";
import { Button } from "@/components/ui/button";
import { NERVOUS_PARTS, NERVOUS_SECTIONS, NEURON_STEPS, REFLEX_STEPS, type NervousSection } from "@/data/nervous";

export function NervousLesson({ section }: { section: NervousSection }) {
  const current = NERVOUS_SECTIONS.find((item) => item.id === section);
  if (!current) return null;
  const index = NERVOUS_SECTIONS.findIndex((item) => item.id === section);
  const next = NERVOUS_SECTIONS[index + 1];
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-6xl">
    <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/anatomy/nervous"><ArrowLeft /> Nervous System</Link></Button>
    <div className="font-mono text-xs uppercase tracking-widest text-lavender-deep">Anatomy Explorer · Nervous system</div>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{current.title}</h1>
    <p className="mt-3 max-w-2xl text-muted-foreground">{current.description}</p>
    <nav aria-label="Nervous system sections" className="my-7 flex flex-wrap gap-2">{NERVOUS_SECTIONS.map((item) => <Button key={item.id} asChild size="sm" variant={section === item.id ? "default" : "outline"}><Link to={item.to} aria-current={section === item.id ? "page" : undefined}>{item.title}</Link></Button>)}</nav>
    {section === "anatomy" ? <Anatomy /> : section === "signals" ? <Signals /> : <Reflexes />}
    <div className="mt-10 flex justify-end"><Button asChild variant="outline"><Link to={next?.to ?? "/anatomy/nervous"}>{next ? "Next section" : "Back to sections"}<ArrowRight /></Link></Button></div>
  </div></section>;
}

function Anatomy() {
  const [selected, setSelected] = useState(0);
  const part = NERVOUS_PARTS[selected];
  return <>
    <div className="grid items-start gap-8 md:grid-cols-2">
      <figure>
        <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl">
          <img src={anatomy} alt="Realistic front-view anatomical render of the brain, spinal cord and branching peripheral nerves" width={1024} height={1536} className="h-auto w-full" />
          <svg viewBox="0 0 1024 1536" role="img" aria-label={`${part?.name} highlighted`} className="pointer-events-none absolute inset-0 h-full w-full text-mint-deep">
            <g stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="transition-all motion-reduce:transition-none">
              {selected === 0 && <ellipse cx="512" cy="80" rx="66" ry="62" className="fill-mint/20" />}
              {selected === 1 && <path d="M512 144 L512 640" fill="none" strokeWidth="15" opacity="0.7" />}
              {selected === 2 && <g fill="none" opacity="0.8"><path d="M502 238 L335 288 L284 472 L180 758 M522 238 L689 288 L740 472 L844 758 M490 665 L431 872 L414 1194 L391 1420 M534 665 L593 872 L610 1194 L633 1420" /><path d="M335 288 L416 338 M689 288 L608 338 M284 472 L332 604 M740 472 L692 604 M431 872 L391 1000 M593 872 L633 1000" /></g>}
            </g>
          </svg>
        </div>
        <figcaption className="mt-3 text-center font-mono text-xs text-muted-foreground">Front view · illustrative anatomical render</figcaption>
      </figure>
      <div className="md:pt-5">
        <h2 className="mb-4 text-2xl font-bold">The body's communication network</h2>
        <div className="flex flex-col gap-3" aria-label="Nervous structures">{NERVOUS_PARTS.map((item, i) => <Button key={item.name} className="h-12 justify-start" variant={selected === i ? "default" : "outline"} aria-pressed={selected === i} onClick={() => setSelected(i)}><span className="w-6 font-mono text-xs">0{i + 1}</span>{item.name}</Button>)}</div>
        <div aria-live="polite" className="mt-6 min-h-52 border-l-2 border-mint pl-5"><p className="font-mono text-xs text-mint-deep">{part?.group}</p><h3 className="mt-3 text-xl font-bold">{part?.name}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{part?.text}</p></div>
        <div className="mt-6 border-t border-border pt-6"><h3 className="font-semibold text-lavender-deep">Two ways the body is controlled</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">Somatic:</strong> carries sensation and controls skeletal muscles, including voluntary movement and reflexes.</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">Autonomic:</strong> regulates internal functions such as heart rate and digestion. Sympathetic activity supports action; parasympathetic activity supports rest and recovery.</p></div>
      </div>
    </div>
  </>;
}

function Signals() {
  const [selected, setSelected] = useState(0);
  const step = NEURON_STEPS[selected];
  return <>
    <figure className="overflow-hidden rounded-3xl bg-skeleton-bg">
      <div className="relative mx-auto max-w-[780px]">
        <img src={neuron} alt="Realistic neuron render showing branching dendrites, a cell body, a myelinated axon and axon terminals" width={1536} height={1024} className="block h-auto w-full" />
        <svg viewBox="0 0 1536 1024" role="img" aria-label={`${step?.name} highlighted on the neuron`} className="pointer-events-none absolute inset-0 h-full w-full text-mint-deep">
          <defs><filter id="neuron-highlight-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
          <g key={selected} filter="url(#neuron-highlight-glow)" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="animate-fade-up">
            {selected === 0 && <>
              <ellipse cx="360" cy="462" rx="105" ry="97" className="fill-mint/20" />
              <g fill="none" strokeWidth="7"><path d="M323 400 L278 321 L207 268 L109 220 M278 321 L261 214 L292 157 M261 214 L211 172 M380 388 L420 293 L465 224 L520 182 M420 293 L421 216 L449 168 M420 293 L530 284 L589 254 M289 467 L182 449 L94 477 L25 461 M182 449 L139 389 L59 375 M139 389 L99 328 M306 524 L227 594 L139 638 L59 691 M227 594 L204 697 L141 766 M204 697 L247 786 M365 544 L363 662 L413 749 L420 838 M363 662 L311 732 L295 815 M413 749 L480 782 M423 509 L466 579 L492 656 L566 709" /></g>
            </>}
            {selected === 1 && <path d="M457 465 C548 481 602 479 676 495 S808 520 871 515 S1026 490 1080 503 S1180 507 1240 511" fill="none" strokeWidth="12" />}
            {selected === 2 && <>
              <g className="fill-mint/20"><rect x="550" y="449" width="108" height="64" rx="27" transform="rotate(7 604 481)" /><rect x="676" y="471" width="112" height="63" rx="27" transform="rotate(10 732 503)" /><rect x="804" y="490" width="111" height="60" rx="27" /><rect x="930" y="480" width="106" height="60" rx="27" transform="rotate(-8 983 510)" /><rect x="1046" y="475" width="103" height="60" rx="27" /><rect x="1156" y="488" width="71" height="53" rx="24" /></g>
              <g fill="none" strokeWidth="7"><circle cx="666" cy="491" r="12" /><circle cx="796" cy="512" r="12" /><circle cx="922" cy="515" r="12" /><circle cx="1040" cy="502" r="12" /><circle cx="1152" cy="511" r="12" /></g>
            </>}
            {selected === 3 && <g fill="none" strokeWidth="8"><path d="M1236 511 L1301 465 L1344 399 L1389 346 M1301 465 L1386 416 L1447 393 M1301 465 L1371 477 L1472 466 M1236 511 L1309 544 L1377 578 L1450 576 M1309 544 L1373 635 L1432 670 M1309 544 L1322 664 L1375 716" />{[{ x: 1389, y: 346 }, { x: 1447, y: 393 }, { x: 1472, y: 466 }, { x: 1450, y: 576 }, { x: 1432, y: 670 }, { x: 1375, y: 716 }].map(({ x, y }) => <circle key={x} cx={x} cy={y} r="15" className="fill-mint/25" />)}</g>}
          </g>
        </svg>
      </div>
    </figure>
    <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4" aria-label="Neuron signal stages">{NEURON_STEPS.map((item, i) => <Button key={item.name} variant={selected === i ? "default" : "outline"} aria-pressed={selected === i} onClick={() => setSelected(i)} className="h-auto min-h-14 justify-start whitespace-normal py-3 text-left"><span className="font-mono">0{i + 1}</span>{item.name}</Button>)}</div>
    <div aria-live="polite" className="mt-6 min-h-32"><h2 className="text-2xl font-bold">{step?.name}</h2><p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{step?.text}</p></div>
    <div className="mt-4 flex justify-end"><Button onClick={() => setSelected((selected + 1) % NEURON_STEPS.length)}><Zap />{selected === NEURON_STEPS.length - 1 ? "Follow again" : "Follow the signal"}<ArrowRight /></Button></div>
    <div className="mt-8 grid gap-6 border-t border-border pt-7 sm:grid-cols-2"><div><h3 className="text-xl font-bold text-sky-deep">Electrical along the neuron</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">An action potential is all-or-none. Stronger input is often represented by more frequent impulses, rather than larger individual impulses.</p></div><div><h3 className="text-xl font-bold text-lavender-deep">Chemical across most synapses</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Neurotransmitters can make the receiving cell more or less likely to fire. A neuron combines many such inputs.</p></div></div>
  </>;
}

function Reflexes() {
  const [selected, setSelected] = useState(0);
  const step = REFLEX_STEPS[selected];
  return <>
    <h2 className="text-2xl font-bold">The withdrawal reflex</h2>
    <p className="mt-3 max-w-3xl text-muted-foreground">A fast protective response: your spinal cord can coordinate pulling your hand away before you consciously feel the pain.</p>
    <div className="mt-7 grid gap-2 sm:grid-cols-5" aria-label="Reflex pathway">{REFLEX_STEPS.map((item, i) => <Button key={item.name} variant={selected === i ? "default" : "outline"} aria-pressed={selected === i} onClick={() => setSelected(i)} className="h-auto min-h-24 flex-col gap-2 whitespace-normal py-4"><span className="font-mono text-xs">0{i + 1}</span>{i === 0 || i === 4 ? <Hand className="size-5" /> : i === 2 ? <Brain className="size-5" /> : <Zap className="size-5" />}{item.name}</Button>)}</div>
    <div aria-live="polite" className="mt-7 min-h-36 border-l-2 border-mint pl-5"><p className="font-mono text-xs text-mint-deep">STEP {selected + 1} / {REFLEX_STEPS.length}</p><h3 className="mt-2 text-xl font-bold">{step?.name}</h3><p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{step?.text}</p></div>
    <div className="mt-5 flex justify-end gap-2"><Button variant="outline" size="icon" aria-label="Reset reflex" title="Reset reflex" onClick={() => setSelected(0)}><RotateCcw /></Button><Button onClick={() => setSelected((selected + 1) % REFLEX_STEPS.length)}>{selected === REFLEX_STEPS.length - 1 ? "Start again" : "Next step"}<ArrowRight /></Button></div>
    <div className="mt-10 grid gap-7 border-t border-border pt-8 sm:grid-cols-2"><div><h2 className="text-xl font-bold text-lavender-deep">From nerve signal to movement</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">At the neuromuscular junction, a motor neuron releases acetylcholine, triggering electrical activity in muscle. Calcium release allows muscle fibres to contract, pulling on tendons and moving joints.</p></div><div><h2 className="text-xl font-bold text-mint-deep">Feedback keeps movement steady</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Sensors in muscles and tendons report stretch and tension. This feedback helps the nervous system adjust posture, grip and movement without you thinking about every muscle.</p></div></div>
    <div className="mt-8 border-l-2 border-sky pl-5"><h3 className="font-semibold text-sky-deep">Biomedical engineering link</h3><p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">EEG measures brain activity at the scalp; EMG records muscle electrical activity. Engineers use these signals in rehabilitation and prosthetic control. Electrical stimulation can also activate nerves to help produce movement.</p></div>
  </>;
}