import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import bioinstrumentationImg from "@/assets/concept-bioinstrumentation.jpg";

export const Route = createFileRoute("/concepts_/bioinstrumentation")({
  head: () => ({ meta: [
    { title: "Bioinstrumentation · BEPlay" },
    { name: "description", content: "How electrodes, sensors and amplifiers turn the body's tiny electrical signals into readings doctors can trust." },
    { property: "og:title", content: "Bioinstrumentation · BEPlay" },
    { property: "og:description", content: "The electronics that measure the body — from electrodes to amplifiers." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Bioinstrumentation,
});

const IDEAS = [
  { name: "Sensors & electrodes", text: "Everything starts with a sensor. Skin electrodes pick up the heart's electrical activity, pressure sensors track blood pressure, and temperature probes watch fever — each turning a body signal into a voltage." },
  { name: "Amplifiers", text: "Body signals are tiny — an ECG is about a millivolt, brainwaves a hundred times smaller. Amplifiers boost them thousands of times so they can be displayed and recorded." },
  { name: "Noise & filtering", text: "Mains hum, muscle twitches and movement all pollute the signal. Filters remove the frequencies we don't want and keep the ones that carry the diagnosis." },
  { name: "Patient safety", text: "Any device connected to a person must be electrically isolated and current-limited, so a fault can never send dangerous current through the body. Medical standards force this by design." },
];

function Bioinstrumentation() {
  const [idea, setIdea] = useState(0);
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-5xl">
    <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/concepts"><ArrowLeft /> BME Concepts</Link></Button>
    <p className="font-mono text-xs uppercase tracking-widest text-peach-deep">BME Concepts · Unit 3</p>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Bioinstrumentation</h1>
    <p className="mt-6 max-w-2xl text-muted-foreground">Bioinstrumentation is the electronics of medicine: measuring the body's faint signals and turning them into readings a doctor can trust. Tap each idea below.</p>

    <figure className="mt-8 overflow-hidden rounded-3xl border border-border shadow-soft">
      <img src={bioinstrumentationImg} alt="ECG electrodes on a chest with a glowing heartbeat waveform trace" width={1280} height={896} className="block w-full" />
      <figcaption className="border-t border-border bg-card/70 px-5 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">Electrodes turning the heart's activity into an ECG trace</figcaption>
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
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Every monitor in a hospital — ECG, pulse oximeter, infusion pump — is bioinstrumentation. Get the measurement wrong and the diagnosis is wrong, which is why this field mixes careful electronics with strict safety standards.</p>
    </div>
  </div></section>;
}
