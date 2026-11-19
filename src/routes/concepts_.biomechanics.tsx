import { Link, createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import biomechanicsImg from "@/assets/concept-biomechanics.jpg";
import { JOINT_TYPES } from "@/data/skeletal";

export const Route = createFileRoute("/concepts_/biomechanics")({
  head: () => ({ meta: [
    { title: "Biomechanics · BEPlay" },
    { name: "description", content: "How forces, stress and levers explain the way the body moves — and how engineers use that to design implants and prosthetics." },
    { property: "og:title", content: "Biomechanics · BEPlay" },
    { property: "og:description", content: "Forces, stress, levers and gait — the mechanics of the human body." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Biomechanics,
});

const IDEAS = [
  { name: "Forces & loads", text: "Every step sends a force through your legs — often two to three times your body weight. Biomechanics measures these loads so implants and prosthetics can be designed to survive them." },
  { name: "Stress & strain", text: "Stress is the force spread over an area; strain is how much the tissue stretches in response. Too much stress in one spot is how stress fractures and worn-out joints happen." },
  { name: "Levers & joints", text: "Bones are levers, joints are pivots and muscles supply the force. Most body levers trade strength for speed and range — which is why your biceps can move your hand fast but can't lift a car." },
  { name: "Gait & motion", text: "Walking is a controlled fall, repeated. Motion-capture labs track joint angles and ground forces to spot injuries, tune running shoes and programme prosthetic knees." },
];

function Biomechanics() {
  const [idea, setIdea] = useState(0);
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-5xl">
    <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/concepts"><ArrowLeft /> BME Concepts</Link></Button>
    <p className="font-mono text-xs uppercase tracking-widest text-peach-deep">BME Concepts · Unit 1</p>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Biomechanics</h1>
    <p className="mt-6 max-w-2xl text-muted-foreground">Biomechanics is physics applied to the body: the forces, stresses and levers behind every movement. Tap each idea below to see its diagram.</p>

    <h2 className="mt-12 text-2xl font-bold">Key ideas</h2>
    <div className="mt-4 flex flex-wrap gap-2">
      {IDEAS.map((x, i) => <Button key={x.name} size="sm" variant={i === idea ? "default" : "outline"} onClick={() => setIdea(i)}>{x.name}</Button>)}
    </div>
    <p className="mt-4 rounded-2xl bg-card p-5 text-sm leading-relaxed shadow-soft"><strong>{IDEAS[idea]!.name}:</strong> {IDEAS[idea]!.text}</p>
    <div key={idea} className="mt-6 animate-fade-up">
      {idea === 0 && <ForcesVisual />}
      {idea === 1 && <StressStrainVisual />}
      {idea === 2 && <JointsVisual />}
      {idea === 3 && <GaitVisual />}
    </div>

    <div className="mt-12 rounded-3xl border border-dashed border-border bg-card/70 p-6">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-peach-deep" />
        <h2 className="font-display text-xl font-bold">Why it matters</h2>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Every hip implant, prosthetic leg and sports shoe starts as a biomechanics problem. Engineers copy the loads a joint must carry, test designs against millions of walking cycles, and use gait analysis to fit devices that move the way a real limb does.</p>
    </div>
  </div></section>;
}

const card = "overflow-hidden rounded-3xl border border-border bg-card shadow-soft";
const cap = "border-t border-border bg-card/70 px-5 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground";

function ForcesVisual() {
  return <figure className={card}>
    <img src={biomechanicsImg} alt="A knee joint mid-stride with glowing arrows showing the forces acting on it" width={1280} height={896} className="block w-full" />
    <figcaption className={cap}>Forces acting on the knee during a stride</figcaption>
  </figure>;
}

function Equation({ symbol, name, formula, parts, unit }: { symbol: string; name: string; formula: string; parts: string[]; unit: string }) {
  return <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
    <p className="font-mono text-xs uppercase tracking-widest text-peach-deep">{name}</p>
    <p className="mt-2 font-display text-3xl font-bold">{symbol} = {formula}</p>
    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">{parts.map(x => <li key={x}>{x}</li>)}</ul>
    <p className="mt-2 text-xs text-muted-foreground">Unit: {unit}</p>
  </div>;
}

function Graph({ title, children, xLabel, yLabel }: { title: string; children: ReactNode; xLabel: string; yLabel: string }) {
  return <figure className={card}>
    <svg viewBox="0 0 320 220" className="block w-full" role="img" aria-label={title}>
      <line x1="40" y1="180" x2="300" y2="180" className="stroke-foreground/60" strokeWidth="2" />
      <line x1="40" y1="180" x2="40" y2="20" className="stroke-foreground/60" strokeWidth="2" />
      <text x="170" y="208" textAnchor="middle" fontSize="12" className="fill-muted-foreground">{xLabel}</text>
      <text x="16" y="100" textAnchor="middle" fontSize="12" transform="rotate(-90 16 100)" className="fill-muted-foreground">{yLabel}</text>
      {children}
    </svg>
    <figcaption className={cap}>{title}</figcaption>
  </figure>;
}

function StressStrainVisual() {
  return <div className="space-y-4">
    <div className="grid gap-4 sm:grid-cols-2">
      <Equation symbol="σ" name="Stress" formula="F / A" parts={["F = force applied (N)", "A = cross-sectional area (m²)"]} unit="pascal (Pa = N/m²)" />
      <Equation symbol="ε" name="Strain" formula="ΔL / L₀" parts={["ΔL = change in length", "L₀ = original length"]} unit="none (a ratio)" />
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      <Graph title="Stress vs area: same force, smaller area = more stress" xLabel="Area (A)" yLabel="Stress (σ)">
        <path d="M 55,30 C 80,120 150,160 290,170" fill="none" className="stroke-mint" strokeWidth="3" />
      </Graph>
      <Graph title="Stress–strain curve of bone" xLabel="Strain (ε)" yLabel="Stress (σ)">
        <path d="M 40,180 L 170,70" fill="none" className="stroke-mint" strokeWidth="3" />
        <path d="M 170,70 C 210,45 250,40 280,50" fill="none" className="stroke-peach" strokeWidth="3" />
        <circle cx="280" cy="50" r="5" className="fill-peach" />
        <text x="95" y="110" fontSize="11" className="fill-mint">elastic</text>
        <text x="200" y="35" fontSize="11" className="fill-peach">plastic</text>
        <text x="270" y="72" fontSize="11" className="fill-foreground">break</text>
      </Graph>
    </div>
    <p className="rounded-2xl bg-card p-4 text-sm text-muted-foreground shadow-soft">In the straight elastic region, stress and strain are linked by <strong className="text-foreground">E = σ / ε</strong> — Young's modulus, a measure of stiffness. Bone springs back here; past it, the damage is permanent until it breaks.</p>
  </div>;
}

function JointsVisual() {
  return <div className="grid gap-4 sm:grid-cols-2">
    {JOINT_TYPES.map(j => <figure key={j.name} className={card}>
      <img src={j.image} alt={j.alt} width={1024} height={768} loading="lazy" className="block w-full" />
      <figcaption className="p-4">
        <p className="font-display font-semibold">{j.name} <span className="font-mono text-xs text-muted-foreground">· {j.where}</span></p>
        <p className="mt-1 text-sm text-muted-foreground">{j.text}</p>
      </figcaption>
    </figure>)}
  </div>;
}

const GAIT = [
  { name: "Heel strike", pct: 0 },
  { name: "Mid-stance", pct: 30 },
  { name: "Toe-off", pct: 60 },
  { name: "Mid-swing", pct: 80 },
];

function GaitVisual() {
  return <div className="space-y-4">
    <div className={card + " p-5"}>
      <p className="font-mono text-xs uppercase tracking-widest text-peach-deep">One gait cycle (one stride)</p>
      <div className="mt-4 flex h-10 overflow-hidden rounded-full text-xs font-semibold">
        <div className="flex w-[60%] items-center justify-center bg-mint/30">Stance · 60% (foot on ground)</div>
        <div className="flex w-[40%] items-center justify-center bg-lavender/40">Swing · 40%</div>
      </div>
      <div className="relative mt-2 h-12">
        {GAIT.map(g => <div key={g.name} className="absolute top-0 -translate-x-1/2 text-center" style={{ left: `${Math.max(g.pct, 6)}%` }}>
          <div className="mx-auto h-3 w-0.5 bg-foreground/60" />
          <p className="mt-1 whitespace-nowrap text-[11px] text-muted-foreground">{g.name}</p>
        </div>)}
      </div>
    </div>
    <div className="mx-auto max-w-xl"><Graph title="Vertical ground force during stance — the classic double hump" xLabel="Time in stance" yLabel="Force (× body weight)">
      <path d="M 40,180 C 70,60 90,50 110,70 C 140,110 190,110 220,70 C 240,50 260,60 290,180" fill="none" className="stroke-mint" strokeWidth="3" />
      <line x1="40" y1="100" x2="300" y2="100" className="stroke-foreground/30" strokeDasharray="4 4" />
      <text x="296" y="95" fontSize="10" textAnchor="end" className="fill-muted-foreground">1× body weight</text>
    </Graph></div>
  </div>;
}
