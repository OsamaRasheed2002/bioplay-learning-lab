import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import contractionImage from "@/assets/muscular-contraction.jpg";
import { Button } from "@/components/ui/button";
import { MUSCLE_PARTS, MUSCULAR_SECTIONS, type MuscularSection } from "@/data/muscular";

export function MuscularLesson({ section }: { section: MuscularSection }) {
  const current = MUSCULAR_SECTIONS.find(item => item.id === section);
  if (!current) return null;
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-6xl">
    <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/anatomy/muscular"><ArrowLeft /> Muscular System</Link></Button>
    <p className="font-mono text-xs uppercase tracking-widest text-lavender-deep">Anatomy Explorer · Muscular system</p>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{current.title}</h1><p className="mt-3 text-muted-foreground">{current.description}</p>
    <nav aria-label="Muscular system sections" className="my-7 flex flex-wrap gap-2">{MUSCULAR_SECTIONS.map(item => <Button key={item.id} asChild size="sm" variant={section === item.id ? "default" : "outline"}><Link to={item.to} aria-current={section === item.id ? "page" : undefined}>{item.title}</Link></Button>)}</nav>
    {section === "anatomy" ? <Anatomy /> : <Movement />}
    <div className="mt-10 flex justify-end"><Button asChild variant="outline"><Link to={section === "anatomy" ? "/anatomy/muscular/movement" : "/anatomy/muscular"}>{section === "anatomy" ? "Next section" : "Back to sections"}<ArrowRight /></Link></Button></div>
  </div></section>;
}

function Anatomy() {
  const [selected, setSelected] = useState(0);
  const part = MUSCLE_PARTS[selected];
  return <div className="grid items-start gap-8 md:grid-cols-2"><figure>
    <svg viewBox="0 0 360 600" role="img" aria-label={`${part?.name} highlighted on a front-view muscle illustration`} className="mx-auto w-full max-w-sm rounded-3xl bg-card">
      <g className="fill-peach-soft stroke-peach-deep" strokeWidth="2" strokeLinejoin="round">
        <ellipse cx="180" cy="57" rx="29" ry="37" /><path d="M166 92 L165 110 Q120 103 100 132 L77 224 L58 290 L64 313 L79 299 L97 246 L116 189 L129 223 L131 284 L122 326 L134 418 L137 511 L126 565 L151 570 L162 547 L169 435 L180 327 L191 435 L198 547 L209 570 L234 565 L223 511 L226 418 L238 326 L229 284 L231 223 L244 189 L263 246 L281 299 L296 313 L302 290 L283 224 L260 132 Q240 103 195 110 L194 92" />
        <path d="M133 181 L145 274 L180 302 L215 274 L227 181 M180 113 L180 299 M140 430 Q152 442 167 430 M193 430 Q208 442 220 430 M141 448 L149 519 M219 448 L211 519 M86 232 L69 289 M274 232 L291 289" className="fill-none" />
      </g>
      {MUSCLE_PARTS.map((muscle, i) => <g key={muscle.name} className={selected === i ? "fill-mint stroke-mint-deep" : "fill-peach stroke-peach-deep"} strokeWidth={selected === i ? 3 : 1.5}>{muscle.paths.map(d => <path key={d} d={d} />)}</g>)}
      <path d="M151 208 H175 M185 208 H209 M151 233 H175 M185 233 H209 M153 256 H175 M185 256 H207 M147 318 L153 404 M213 318 L207 404" className="fill-none stroke-background/50" strokeWidth="2" />
    </svg><figcaption className="mt-3 text-center font-mono text-xs text-muted-foreground">Front view · simplified superficial muscles</figcaption>
  </figure><div><h2 className="mb-4 text-2xl font-bold">Major muscle groups</h2><div className="flex flex-col gap-2">{MUSCLE_PARTS.map((item, i) => <Button key={item.name} variant={selected === i ? "default" : "outline"} aria-pressed={selected === i} onClick={() => setSelected(i)} className="h-auto min-h-12 justify-start whitespace-normal py-3 text-left"><span className="w-6 shrink-0 font-mono text-xs">0{i + 1}</span>{item.name}</Button>)}</div><div aria-live="polite" className="mt-6 min-h-40 border-l-2 border-mint pl-5"><h3 className="text-xl font-bold">{part?.name}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{part?.text}</p></div><p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">Tendons connect muscles to bones. Skeletal muscles pull on these attachments to move joints; they cannot actively push a bone.</p></div></div>;
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