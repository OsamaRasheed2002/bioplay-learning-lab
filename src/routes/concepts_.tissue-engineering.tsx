import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import tissueImg from "@/assets/concept-tissue-engineering.jpg";

export const Route = createFileRoute("/concepts_/tissue-engineering")({
  head: () => ({ meta: [
    { title: "Tissue Engineering · BEPlay" },
    { name: "description", content: "How cells, scaffolds and growth signals are combined to grow real tissue in the lab." },
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

function TissueEngineering() {
  const [idea, setIdea] = useState(0);
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-5xl">
    <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/concepts"><ArrowLeft /> BME Concepts</Link></Button>
    <p className="font-mono text-xs uppercase tracking-widest text-peach-deep">BME Concepts · Unit 4</p>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Tissue engineering</h1>
    <p className="mt-6 max-w-2xl text-muted-foreground">Tissue engineering grows real living tissue in the lab by giving cells a scaffold to build on and the right signals to follow. Tap each idea below.</p>

    <figure className="mt-8 overflow-hidden rounded-3xl border border-border shadow-soft">
      <img src={tissueImg} alt="A porous scaffold with cells growing across it, held by tweezers above a petri dish" width={1280} height={896} className="block w-full" />
      <figcaption className="border-t border-border bg-card/70 px-5 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">Cells colonising a biodegradable scaffold</figcaption>
    </figure>

    <h2 className="mt-12 text-2xl font-bold">Key ideas</h2>
    <div className="mt-4 flex flex-wrap gap-2">
      {IDEAS.map((x, i) => <Button key={x.name} size="sm" variant={i === idea ? "default" : "outline"} onClick={() => setIdea(i)}>{x.name}</Button>)}
    </div>
    <p className="mt-4 rounded-2xl bg-card p-5 text-sm leading-relaxed shadow-soft"><strong>{IDEAS[idea]!.name}:</strong> {IDEAS[idea]!.text}</p>

    <div className="mt-12 rounded-3xl border border-dashed border-border bg-card/70 p-6">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-peach-deep" />
        <h2 className="font-display text-xl font-bold">Why it matters</h2>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Lab-grown skin already treats burn victims, and engineered cartilage is repairing knees. The long-term goal is whole organs grown from a patient's own cells — no donor list, no rejection.</p>
    </div>
  </div></section>;
}
