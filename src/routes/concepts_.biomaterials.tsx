import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import biomaterialsImg from "@/assets/concept-biomaterials.jpg";

export const Route = createFileRoute("/concepts_/biomaterials")({
  head: () => ({ meta: [
    { title: "Biomaterials · BEPlay" },
    { name: "description", content: "The metals, ceramics and polymers engineers put inside the body — with real examples like titanium hips, zirconia crowns and dissolving stitches." },
    { property: "og:title", content: "Biomaterials · BEPlay" },
    { property: "og:description", content: "Titanium, zirconia, polyethylene and more: the materials that become implants." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Biomaterials,
});

const IDEAS = [
  { name: "Biocompatibility", text: "The golden rule: the material must not harm the body, and the body must not destroy the material. Every implant is tested for toxicity, corrosion and immune reaction before it goes near a patient." },
  { name: "Metals", text: "Titanium, stainless steel and cobalt-chromium are strong and fatigue-resistant — perfect for hip stems, plates and screws. Titanium even lets bone grow directly onto its surface." },
  { name: "Ceramics", text: "Extremely hard and smooth, ceramics like alumina make low-wear joint surfaces and dental implants. Their weakness is brittleness — they crack rather than bend." },
  { name: "Polymers", text: "Flexible and easy to shape, polymers appear as sutures, mesh, tubing and joint liners. Some are biodegradable, dissolving safely once healing is done." },
];

type Material = { name: string; also: string; text: string; used: string[] };

const METALS: Material[] = [
  {
    name: "Titanium",
    also: "Ti-6Al-4V",
    text: "Light, strong and corrosion-proof. Bone grows straight onto its oxide surface — a bond called osseointegration — so the implant locks in without cement.",
    used: ["Hip implant stems", "Dental implant screws", "Bone plates"],
  },
  {
    name: "Stainless steel",
    also: "316L",
    text: "Cheap, very strong and easy to shape, but it slowly corrodes inside the body — so it is used for short-term work, not permanent joints.",
    used: ["Fracture screws & plates", "Surgical instruments", "External fixators"],
  },
  {
    name: "Cobalt-chromium",
    also: "CoCr",
    text: "The hardest, most wear-resistant metal alloy used in the body. It survives millions of rubbing cycles, which is why it ends up on joint surfaces.",
    used: ["Hip & knee ball surfaces", "Stent struts", "Dental crowns"],
  },
];

const CERAMICS: Material[] = [
  {
    name: "Alumina",
    also: "aluminium oxide",
    text: "Polished to a mirror finish, it is incredibly hard and wears almost nothing. Its weakness is brittleness — it cracks rather than bends.",
    used: ["Hip joint ball surfaces", "Dental implant posts", "Wear-resistant bearings"],
  },
  {
    name: "Zirconia",
    also: "zirconium dioxide",
    text: "A tougher ceramic that can flex a little before breaking, and it can be made tooth-coloured — so it is the go-to where looks matter.",
    used: ["Dental crowns & bridges", "Hip replacement balls", "Implant abutments"],
  },
  {
    name: "Hydroxyapatite",
    also: "calcium phosphate",
    text: "The same mineral your bone is made of, so the body treats it as bone rather than rubbish. Often sprayed on as a thin coating.",
    used: ["Coating on hip stems", "Bone graft filler", "Dental bone grafts"],
  },
];

const POLYMERS: Material[] = [
  {
    name: "UHMWPE",
    also: "ultra-high-molecular-weight polyethylene",
    text: "A tough, slippery plastic that slides with almost no friction and sheds hardly any particles — the quiet workhorse inside every artificial joint.",
    used: ["Hip & knee socket liners", "Spinal disc replacements", "Knee patella buttons"],
  },
  {
    name: "Silicone",
    also: "polydimethylsiloxane",
    text: "Soft, flexible and very well tolerated, so it can sit in the body for decades while staying rubbery.",
    used: ["Catheters & drainage tubes", "Pacemaker lead insulation", "Breast implants"],
  },
  {
    name: "Polylactic acid",
    also: "PLA / PLGA",
    text: "Biodegradable: it holds strength while healing happens, then dissolves into harmless lactic acid the body already makes.",
    used: ["Dissolving stitches", "Bone screws & pins", "Drug-delivery beads"],
  },
];

const TONES = {
  metals: { chip: "bg-sky/15 text-sky-deep", bar: "bg-sky" },
  ceramics: { chip: "bg-lavender/15 text-lavender-deep", bar: "bg-lavender" },
  polymers: { chip: "bg-mint/20 text-mint-deep", bar: "bg-mint" },
} as const;

function MaterialGrid({ items, tone }: { items: Material[]; tone: keyof typeof TONES }) {
  const t = TONES[tone];
  return <div className="grid gap-4 sm:grid-cols-3">
    {items.map(m => <div key={m.name} className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <div className={"h-1.5 w-full " + t.bar} />
      <div className="p-5">
        <p className="font-display text-lg font-bold">{m.name}</p>
        <p className="mt-0.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{m.also}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Made into</p>
        <ul className="mt-2 space-y-1.5">
          {m.used.map(u => <li key={u} className="flex items-start gap-2 text-sm">
            <span className={"mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full " + t.bar} />
            <span className="text-foreground/90">{u}</span>
          </li>)}
        </ul>
      </div>
    </div>)}
  </div>;
}

function Biomaterials() {
  const [idea, setIdea] = useState(0);
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-5xl">
    <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/concepts"><ArrowLeft /> BME Concepts</Link></Button>
    <p className="font-mono text-xs uppercase tracking-widest text-peach-deep">BME Concepts · Unit 2</p>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Biomaterials</h1>
    <p className="mt-6 max-w-2xl text-muted-foreground">Biomaterials are the substances engineers are allowed to put inside you. Each family — metals, ceramics, polymers — brings different strengths. Tap each idea below to see the materials actually used.</p>

    <figure className="mt-8 overflow-hidden rounded-3xl border border-border shadow-soft">
      <img src={biomaterialsImg} alt="A titanium hip implant stem, a ceramic ball, a polymer mesh and a coil of nitinol wire on a dark surface" width={1280} height={896} className="block w-full" />
      <figcaption className="border-t border-border bg-card/70 px-5 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">A titanium hip stem, ceramic ball, polymer mesh and nitinol wire</figcaption>
    </figure>

    <h2 className="mt-12 text-2xl font-bold">Key ideas</h2>
    <div className="mt-4 flex flex-wrap gap-2">
      {IDEAS.map((x, i) => <Button key={x.name} size="sm" variant={i === idea ? "default" : "outline"} onClick={() => setIdea(i)}>{x.name}</Button>)}
    </div>
    <p className="mt-4 rounded-2xl bg-card p-5 text-sm leading-relaxed shadow-soft"><strong>{IDEAS[idea]!.name}:</strong> {IDEAS[idea]!.text}</p>
    <div key={idea} className="mt-6 animate-fade-up">
      {idea === 1 && <MaterialGrid items={METALS} tone="metals" />}
      {idea === 2 && <MaterialGrid items={CERAMICS} tone="ceramics" />}
      {idea === 3 && <MaterialGrid items={POLYMERS} tone="polymers" />}
    </div>

    <div className="mt-12 rounded-3xl border border-dashed border-border bg-card/70 p-6">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-peach-deep" />
        <h2 className="font-display text-xl font-bold">Why it matters</h2>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Choosing the wrong material can mean rejection, infection or a snapped implant. Biomaterials science is why modern hip replacements last decades, and why stents, sutures and artificial skin can sit in the body without it fighting back.</p>
    </div>
  </div></section>;
}
