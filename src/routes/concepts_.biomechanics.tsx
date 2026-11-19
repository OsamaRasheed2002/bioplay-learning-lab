import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import biomechanicsImg from "@/assets/concept-biomechanics.jpg";

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
    <p className="mt-6 max-w-2xl text-muted-foreground">Biomechanics is physics applied to the body: the forces, stresses and levers behind every movement. Tap each idea below to explore it.</p>

    <figure className="mt-8 overflow-hidden rounded-3xl border border-border shadow-soft">
      <img src={biomechanicsImg} alt="A knee joint mid-stride with glowing arrows showing the forces acting on it" width={1280} height={896} className="block w-full" />
      <figcaption className="border-t border-border bg-card/70 px-5 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">Forces acting on the knee during a stride</figcaption>
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
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Every hip implant, prosthetic leg and sports shoe starts as a biomechanics problem. Engineers copy the loads a joint must carry, test designs against millions of walking cycles, and use gait analysis to fit devices that move the way a real limb does.</p>
    </div>
  </div></section>;
}
