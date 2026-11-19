import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import tissueImg from "@/assets/concept-tissue-engineering.jpg";

export const Route = createFileRoute("/concepts_/tissue-engineering")({
  head: () => ({ meta: [
    { title: "Tissue Engineering · BEPlay" },
    { name: "description", content: "How cells, scaffolds and growth signals are combined to grow real tissue in the lab — with real examples of each." },
    { property: "og:title", content: "Tissue Engineering · BEPlay" },
    { property: "og:description", content: "Growing real tissue in the lab with cells, scaffolds and bioreactors." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: TissueEngineering,
});

const IDEAS = [
  { name: "Cells", text: "The builders. A small sample of a patient's own cells — or stem cells that can become many types — is multiplied in the lab until there are enough to build with." },
  { name: "Scaffolds", text: "The framework. A porous, often biodegradable structure gives cells a shape to grow on, like ivy on a trellis. As the tissue matures, the scaffold safely dissolves away." },
  { name: "Growth signals", text: "The instructions. Proteins called growth factors tell cells what to become and when to divide — bone, cartilage or skin — by copying the body's own chemical signals." },
  { name: "Bioreactors", text: "The nursery. These chambers keep the growing tissue at body temperature, feed it nutrients and even stretch or squeeze it, because cells need mechanical exercise to mature properly." },
];

type Example = { name: string; also: string; text: string; used: string[] };

const CELLS: Example[] = [
  {
    name: "Autologous cells",
    also: "the patient's own",
    text: "A tiny biopsy is taken, the cells are multiplied for a few weeks, then put back. Because they are your own, the immune system never rejects them.",
    used: ["Lab-grown skin for burns", "Engineered cartilage (MACI)", "Bladder patches"],
  },
  {
    name: "Mesenchymal stem cells",
    also: "from bone marrow or fat",
    text: "Adult stem cells that can turn into bone, cartilage or muscle. Easier to source than embryonic cells and far less controversial.",
    used: ["Bone fracture healing", "Cartilage repair", "Heart muscle patches"],
  },
  {
    name: "iPSCs",
    also: "induced pluripotent stem cells",
    text: "Ordinary skin cells reprogrammed backwards until they can become any cell in the body — made per patient, so no donor is needed.",
    used: ["Disease models & drug testing", "Retinal cell patches", "Lab-grown heart cells"],
  },
];

const SCAFFOLDS: Example[] = [
  {
    name: "Collagen sponges",
    also: "animal-derived",
    text: "Soft, porous and already familiar to the body, so cells move in quickly. It dissolves as new tissue takes over its job.",
    used: ["Wound dressings", "Dental bone grafts", "Skin templates (Integra)"],
  },
  {
    name: "Electrospun fibres",
    also: "PLA / PCL polymers",
    text: "Plastic melted and spun into threads thinner than a human hair, layered into a mat that mimics the fibrous structure of real tissue.",
    used: ["Small blood-vessel grafts", "Ligament repair", "Skin sheets"],
  },
  {
    name: "Bioceramic scaffolds",
    also: "hydroxyapatite / bioglass",
    text: "Porous ceramic lattices with the same chemistry as bone. Strong enough to carry load, and they slowly bond with living bone.",
    used: ["Bone defect fillers", "Spinal fusion cages", "Implant coatings"],
  },
];

const SIGNALS: Example[] = [
  {
    name: "EGF",
    also: "epidermal growth factor",
    text: "Tells skin cells to multiply and crawl across a wound, the same signal the body uses to close a cut.",
    used: ["Chronic wound healing", "Burn dressings", "Corneal repair"],
  },
  {
    name: "BMPs",
    also: "bone morphogenetic proteins",
    text: "Powerful signals that switch stem cells into bone-making cells — strong enough to start bone growing where there was none.",
    used: ["Spinal fusion", "Fracture repair", "Dental bone grafts"],
  },
  {
    name: "VEGF",
    also: "vascular endothelial growth factor",
    text: "The signal that grows new blood vessels. Without it, any scaffold thicker than a few millimetres starves from the inside.",
    used: ["Heart blood-supply trials", "Vascularising scaffolds", "Chronic wound therapy"],
  },
];

const BIOREACTORS: Example[] = [
  {
    name: "Spinner flask",
    also: "stirred-tank",
    text: "A simple rotating chamber that keeps the scaffold swimming in nutrient fluid, so cells reach every part of a small construct.",
    used: ["Cartilage pellets", "Cell expansion", "Lab research samples"],
  },
  {
    name: "Perfusion bioreactor",
    also: "fluid pushed through",
    text: "Nutrient fluid is forced straight through the pores of the scaffold, the only way to keep a thick piece of tissue alive while it grows.",
    used: ["Bone grafts", "Heart valve tissue", "Thick tissue constructs"],
  },
  {
    name: "Mechanical-loading rig",
    also: "stretch & squeeze",
    text: "Stretches, squeezes or pumps the construct on a schedule, because cells build stronger tissue when they are exercised like real tissue.",
    used: ["Ligament & tendon grafts", "Engineered bladders", "Cartilage conditioning"],
  },
];

const TONES = {
  cells: { bar: "bg-lavender" },
  scaffolds: { bar: "bg-sky" },
  signals: { bar: "bg-peach" },
  bioreactors: { bar: "bg-mint" },
} as const;

function ExampleGrid({ items, tone }: { items: Example[]; tone: keyof typeof TONES }) {
  const t = TONES[tone];
  return <div className="grid gap-4 sm:grid-cols-3">
    {items.map(m => <div key={m.name} className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <div className={"h-1.5 w-full " + t.bar} />
      <div className="p-5">
        <p className="font-display text-lg font-bold">{m.name}</p>
        <p className="mt-0.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{m.also}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Used for</p>
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

function TissueEngineering() {
  const [idea, setIdea] = useState(0);
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-5xl">
    <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/concepts"><ArrowLeft /> BME Concepts</Link></Button>
    <p className="font-mono text-xs uppercase tracking-widest text-peach-deep">BME Concepts · Unit 4</p>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Tissue engineering</h1>
    <p className="mt-6 max-w-2xl text-muted-foreground">Tissue engineering grows real living tissue in the lab by giving cells a scaffold to build on and the right signals to follow. Tap each idea below to see the real-world examples.</p>

    <figure className="mt-8 overflow-hidden rounded-3xl border border-border shadow-soft">
      <img src={tissueImg} alt="A porous scaffold with cells growing across it, held by tweezers above a petri dish" width={1280} height={896} className="block w-full" />
      <figcaption className="border-t border-border bg-card/70 px-5 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">Cells colonising a biodegradable scaffold</figcaption>
    </figure>

    <h2 className="mt-12 text-2xl font-bold">Key ideas</h2>
    <div className="mt-4 flex flex-wrap gap-2">
      {IDEAS.map((x, i) => <Button key={x.name} size="sm" variant={i === idea ? "default" : "outline"} onClick={() => setIdea(i)}>{x.name}</Button>)}
    </div>
    <p className="mt-4 rounded-2xl bg-card p-5 text-sm leading-relaxed shadow-soft"><strong>{IDEAS[idea]!.name}:</strong> {IDEAS[idea]!.text}</p>
    <div key={idea} className="mt-6 animate-fade-up">
      {idea === 0 && <ExampleGrid items={CELLS} tone="cells" />}
      {idea === 1 && <ExampleGrid items={SCAFFOLDS} tone="scaffolds" />}
      {idea === 2 && <ExampleGrid items={SIGNALS} tone="signals" />}
      {idea === 3 && <ExampleGrid items={BIOREACTORS} tone="bioreactors" />}
    </div>

    <div className="mt-12 rounded-3xl border border-dashed border-border bg-card/70 p-6">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-peach-deep" />
        <h2 className="font-display text-xl font-bold">Why it matters</h2>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Lab-grown skin already treats burn victims, and engineered cartilage is repairing knees. The long-term goal is whole organs grown from a patient's own cells — no donor list, no rejection.</p>
    </div>
  </div></section>;
}
