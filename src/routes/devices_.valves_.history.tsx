import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ValveTabs } from "@/components/bio/ValveTabs";
import hufnagel from "@/assets/history-hufnagel.jpg";
import starrEdwards from "@/assets/history-starr-edwards.jpg";
import tissue from "@/assets/history-tissue.jpg";
import bjorkShiley from "@/assets/history-bjork-shiley.jpg";
import stJude from "@/assets/history-st-jude.jpg";
import tavr from "@/assets/history-tavr.jpg";

export const Route = createFileRoute("/devices_/valves_/history")({
  head: () => ({ meta: [
    { title: "History of Artificial Heart Valves · BEPlay" },
    { name: "description", content: "From the 1952 Hufnagel ball valve to catheter valves: each version of the artificial heart valve and why it failed." },
    { property: "og:title", content: "History of Artificial Heart Valves · BEPlay" },
    { property: "og:description", content: "Six generations of prosthetic heart valves and the problems each one exposed." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: ValveHistory,
});

const HISTORY = [
  { image: hufnagel, year: "1952", name: "Hufnagel ball valve", what: "The first artificial valve: a ball-in-cage clipped around the descending aorta, because surgeons still could not open a beating heart.", failed: "It sat outside the heart, only partly stopped the leak, and clots formed on it. Useless once valves could be sewn in place." },
  { image: starrEdwards, year: "1960", name: "Starr–Edwards caged ball", what: "The first valve widely used inside the heart — a silicone ball rattling inside a metal cage, still in use in modified form today.", failed: "The cage blocked a lot of flow, blood clotted on it and caused strokes, and the ball could wear, crack or jam. Lifelong blood thinners became mandatory." },
  { image: tissue, year: "1965", name: "First tissue valves", what: "Pig and cow heart leaflets, stiffened with glutaraldehyde and sewn onto a stent, so blood would not clot on them as easily.", failed: "The tissue slowly calcified and tore, usually within 10–15 years — much faster in young patients — so most needed a second operation." },
  { image: bjorkShiley, year: "1969", name: "Björk–Shiley tilting disc", what: "One carbon disc tilting on two struts instead of a ball in a cage, so blood could flow past it far more easily.", failed: "The outlet strut could snap, letting the disc escape into the bloodstream — a fatal failure in thousands of patients, and the valve was withdrawn." },
  { image: stJude, year: "1977", name: "St Jude bileaflet valve", what: "Two carbon half-discs that swing open like double doors — the shape still used in most mechanical valves today.", failed: "Not a failure, but the trade-off never went away: carbon is durable yet clot-prone, so patients still take warfarin for life." },
  { image: tavr, year: "2002", name: "Catheter valves (TAVR)", what: "A tissue valve folded into a tube and expanded in place through a blood vessel, no open-heart surgery.", failed: "Early versions leaked around the edge, could not be repositioned, and were only offered to patients too frail for surgery." },
];

function ValveHistory() {
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-5xl">
    <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/devices"><ArrowLeft /> Medical Devices</Link></Button>
    <p className="font-mono text-xs uppercase tracking-widest text-lavender-deep">Medical Devices · Unit 2</p>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Artificial valves</h1>
    <ValveTabs />
    <h2 className="mt-8 text-2xl font-bold">A short history</h2>
    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">Every generation of valve fixed one problem and exposed another. Here is the run of versions that led to today's designs.</p>
    <ol className="mt-5 grid gap-5 md:grid-cols-2">
      {HISTORY.map(h => <li key={h.year} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-0.5">
        <img src={h.image} alt={h.name} width={1024} height={768} loading="lazy" className="block aspect-[4/3] w-full object-cover" />
        <div className="p-5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-xs uppercase tracking-widest text-lavender-deep">{h.year}</span>
            <span className="font-display text-lg font-semibold">{h.name}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.what}</p>
          <p className="mt-3 rounded-xl bg-muted/60 px-4 py-3 text-sm leading-relaxed"><span className="font-mono text-xs uppercase tracking-widest text-mint">Why it failed</span> — {h.failed}</p>
        </div>
      </li>)}
    </ol>
  </div></section>;
}
