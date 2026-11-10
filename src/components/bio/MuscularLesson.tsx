import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Pause } from "lucide-react";
import contractionImage from "@/assets/muscular-contraction.jpg";
import bicepsImage from "@/assets/biceps-movement.jpg";
import muscleImage from "@/assets/muscular-anatomy.png.asset.json";
import { Button } from "@/components/ui/button";
import { MUSCLE_PARTS, MUSCULAR_SECTIONS, type MuscularSection } from "@/data/muscular";

export function MuscularLesson({ section }: { section: MuscularSection }) {
  const current = MUSCULAR_SECTIONS.find(item => item.id === section);
  if (!current) return null;
  const next = MUSCULAR_SECTIONS[MUSCULAR_SECTIONS.findIndex(item => item.id === section) + 1];
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-6xl">
    <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/anatomy/muscular"><ArrowLeft /> Muscular System</Link></Button>
    <p className="font-mono text-xs uppercase tracking-widest text-lavender-deep">Anatomy Explorer · Muscular system</p>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{current.title}</h1><p className="mt-3 text-muted-foreground">{current.description}</p>
    <nav aria-label="Muscular system sections" className="my-7 flex flex-wrap gap-2">{MUSCULAR_SECTIONS.map(item => <Button key={item.id} asChild size="sm" variant={section === item.id ? "default" : "outline"}><Link to={item.to} aria-current={section === item.id ? "page" : undefined}>{item.title}</Link></Button>)}</nav>
    {section === "anatomy" ? <Anatomy /> : section === "movement" ? <Movement /> : <Biomechanics />}
    <div className="mt-10 flex justify-end"><Button asChild variant="outline"><Link to={next?.to ?? "/anatomy/muscular"}>{next ? "Next section" : "Back to sections"}<ArrowRight /></Link></Button></div>
  </div></section>;
}

function Anatomy() {
  const [selected, setSelected] = useState(0);
  const part = MUSCLE_PARTS[selected];
  const highlights = [
    "M292 145 Q314 125 351 140 L335 177 L289 202 Q278 174 292 145 Z",
    "M340 145 Q370 143 393 160 L392 245 Q346 238 314 201 L321 176 Z",
    "M285 202 Q310 190 311 214 L296 263 L277 280 L269 267 Z M462 172 Q484 172 495 225 L480 265 L460 215 Z",
    "M363 245 L393 248 L393 362 L360 350 Q352 298 363 245 Z M400 247 L423 254 L426 350 L402 362 Z",
    "M322 378 Q345 373 369 389 L380 459 L366 501 L340 508 Q310 466 314 420 Z M431 402 Q461 389 461 431 L446 495 L424 512 L409 475 Z",
  ];
  return <div><figure><div className="relative overflow-hidden rounded-3xl"><img src={muscleImage.url} alt="Detailed labelled anterior muscle anatomy chart from Gray's Anatomy showing the full human body" width={1664} height={1632} className="block h-auto w-full" /><svg viewBox="0 0 800 785" role="img" aria-label={`${part?.name} highlighted on the muscle anatomy chart`} className="pointer-events-none absolute inset-0 h-full w-full"><path d={highlights[selected]} className="fill-mint/25 stroke-mint-deep" strokeWidth="3" /></svg></div><figcaption className="mt-3 text-center font-mono text-xs text-muted-foreground">Anterior view · Gray’s Anatomy / Mikael Häggström · public domain</figcaption></figure><div className="mt-7"><h2 className="mb-4 text-2xl font-bold">Major muscle groups</h2><div className="flex flex-wrap gap-2">{MUSCLE_PARTS.map((item, i) => <Button key={item.name} variant={selected === i ? "default" : "outline"} aria-pressed={selected === i} onClick={() => setSelected(i)} className="h-auto min-h-12 whitespace-normal py-3"><span className="shrink-0 font-mono text-xs">0{i + 1}</span>{item.name}</Button>)}</div><div aria-live="polite" className="mt-6 min-h-28 border-l-2 border-mint pl-5"><h3 className="text-xl font-bold">{part?.name}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{part?.text}</p></div><p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">Tendons connect muscles to bones. Skeletal muscles pull on these attachments to move joints; they cannot actively push a bone.</p></div></div>;
}

function Movement() {
  const [contracted, setContracted] = useState(false);
  return <><div className="grid items-center gap-8 md:grid-cols-2"><figure className="rounded-3xl bg-card p-6">
    <img src={contractionImage} alt="Realistic sarcomere render showing red myosin and pale actin filaments between two Z discs" width={1536} height={1024} loading="lazy" className="w-full rounded-2xl" /><figcaption className="mt-3 text-center font-mono text-xs text-muted-foreground">Sarcomere · illustrative microscopic render</figcaption>
  </figure><div><h2 className="text-2xl font-bold">Sliding filaments</h2><p className="mt-3 leading-relaxed text-muted-foreground">A nerve signal triggers calcium release inside a muscle fibre. Myosin pulls on actin using energy from ATP. The filaments slide past one another, shortening the sarcomere; the filaments themselves do not shorten.</p><div className="mt-5 flex flex-wrap gap-2"><Button variant={!contracted ? "default" : "outline"} aria-pressed={!contracted} onClick={() => setContracted(false)}>Relax</Button><Button variant={contracted ? "default" : "outline"} aria-pressed={contracted} onClick={() => setContracted(true)}>Contract</Button></div><p aria-live="polite" className="mt-5 min-h-16 text-sm text-muted-foreground">{contracted ? "The attachment lines move closer together as actin slides towards the centre." : "When calcium is removed, active pulling stops and external forces can lengthen the muscle again."}</p></div></div>
    <div className="mt-9 grid gap-6 border-t border-border pt-7 sm:grid-cols-3"><div><h3 className="text-xl font-bold text-mint-deep">Opposing pairs</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Biceps bend the elbow; triceps straighten it. The nervous system coordinates both, and they can also contract together to stabilise a joint.</p></div><div><h3 className="text-xl font-bold text-lavender-deep">Force & movement</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Muscle force turns a bone around a joint. A larger moment arm gives more turning effect for the same force. Muscles can produce force while shortening, lengthening or holding still.</p></div><div><h3 className="text-xl font-bold text-sky-deep">Engineering link</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">EMG measures electrical activity linked to muscle activation. Engineers use it in rehabilitation and prosthetic control; it is not a direct measurement of muscle force.</p></div></div>
    <div className="mt-7 border-t border-border pt-6"><h3 className="font-semibold">Three muscle tissue types</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Skeletal muscle moves the body, cardiac muscle pumps the heart, and smooth muscle moves material through organs such as the digestive tract.</p></div>
  </>;
}

function Biomechanics() {
  const [selected, setSelected] = useState(0);
  const [replay, setReplay] = useState(0);
  const actions = [
    { name: "Lift", icon: ArrowUp, title: "Concentric · shortening", text: "As you curl a weight upwards, the biceps produce force while shortening. Their turning effect at the elbow lifts the load against gravity." },
    { name: "Lower", icon: ArrowDown, title: "Eccentric · lengthening", text: "As you slowly lower the weight, the biceps remain active while lengthening. They act like a brake, controlling the movement rather than simply switching off." },
    { name: "Hold", icon: Pause, title: "Isometric · holding steady", text: "When you hold the weight still, the biceps produce force with little overall change in length. Their turning effect balances the load, so the elbow stays in position." },
  ];
  const action = actions[selected];
  return <><div className="grid items-center gap-8 md:grid-cols-2"><figure>
    <svg viewBox="0 0 1024 1024" role="img" aria-label={`Biceps movement: ${action?.name}`} className="w-full rounded-3xl bg-card">
      <defs><clipPath id="biceps-upper"><path d="M85 40 H305 V610 L265 688 L160 760 L85 620 Z" /></clipPath><clipPath id="biceps-forearm"><path d="M188 640 Q300 607 430 651 L650 690 Q710 660 880 635 L995 671 L990 726 L925 770 L847 791 L666 792 Q388 811 180 750 Z" /></clipPath></defs>
      <image href={bicepsImage} width="1024" height="1024" clipPath="url(#biceps-upper)" />
      <g key={`${selected}-${replay}`} className={`biceps-forearm ${selected === 0 ? "biceps-lift" : selected === 1 ? "biceps-lower" : "biceps-hold"}`}><image href={bicepsImage} width="1024" height="1024" clipPath="url(#biceps-forearm)" /></g>
    </svg><figcaption className="mt-3 text-center font-mono text-xs text-muted-foreground">Biceps curl · illustrative arm motion</figcaption>
  </figure><div><h2 className="text-2xl font-bold">One muscle, three actions</h2><p className="mt-3 leading-relaxed text-muted-foreground">Think of a biceps curl: the muscle can move a load, control its descent or keep it still.</p><div className="mt-5 flex flex-wrap gap-2">{actions.map((item, i) => <Button key={item.name} variant={selected === i ? "default" : "outline"} aria-pressed={selected === i} onClick={() => { setSelected(i); setReplay(value => value + 1); }}><item.icon className="size-4" />{item.name}</Button>)}</div><div aria-live="polite" className="mt-6 min-h-44 border-l-2 border-mint pl-5"><h3 className="text-xl font-bold text-mint-deep">{action?.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{action?.text}</p></div></div></div><div className="mt-9 grid gap-6 border-t border-border pt-7 sm:grid-cols-3"><div><h3 className="text-xl font-bold text-lavender-deep">Bones are levers</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">A joint is the pivot. Tendons transfer muscle force to bones, creating a turning effect called torque.</p></div><div><h3 className="text-xl font-bold text-peach-deep">Distance matters</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">The same load held farther from a joint creates more torque. Holding a bag closer to your body can reduce the muscle effort needed to support it.</p></div><div><h3 className="text-xl font-bold text-sky-deep">Rehabilitation & design</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Engineers consider muscle force and joint leverage when designing braces, prostheses and exercise equipment. Controlled movement helps manage how tissues are loaded.</p></div></div></>;
}