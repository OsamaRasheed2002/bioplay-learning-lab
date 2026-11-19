import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import biomaterialsImg from "@/assets/concept-biomaterials.jpg";

export const Route = createFileRoute("/concepts_/biomaterials")({
  head: () => ({ meta: [
    { title: "Biomaterials · BEPlay" },
    { name: "description", content: "The metals, ceramics and polymers engineers put inside the body — and what makes a material safe to implant." },
    { property: "og:title", content: "Biomaterials · BEPlay" },
    { property: "og:description", content: "What makes a material safe to put inside the human body." },
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

function Biomaterials() {
  const [idea, setIdea] = useState(0);
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-5xl">
    <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/concepts"><ArrowLeft /> BME Concepts</Link></Button>
    <p className="font-mono text-xs uppercase tracking-widest text-peach-deep">BME Concepts · Unit 2</p>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Biomaterials</h1>
    <p className="mt-6 max-w-2xl text-muted-foreground">Biomaterials are the substances engineers are allowed to put inside you. Each family — metals, ceramics, polymers — brings different strengths. Tap each idea below.</p>

    <figure className="mt-8 overflow-hidden rounded-3xl border border-border shadow-soft">
      <img src={biomaterialsImg} alt="A titanium hip implant stem, a ceramic ball, a polymer mesh and a coil of nitinol wire on a dark surface" width={1280} height={896} className="block w-full" />
      <figcaption className="border-t border-border bg-card/70 px-5 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">A titanium hip stem, ceramic ball, polymer mesh and nitinol wire</figcaption>
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
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Choosing the wrong material can mean rejection, infection or a snapped implant. Biomaterials science is why modern hip replacements last decades, and why stents, sutures and artificial skin can sit in the body without it fighting back.</p>
    </div>
  </div></section>;
}
