import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";

const T = "Cardiovascular System · BEPlay";
const D = "Four sections: the human heart, blood and its components, arteries and veins.";

export const Route = createFileRoute("/anatomy_/cardiovascular")({
  head: () => ({
    meta: [
      { title: T },
      { name: "description", content: D },
      { property: "og:title", content: T },
      { property: "og:description", content: D },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CardioHub,
});

const SECTIONS = [
  { to: "/anatomy/heart", title: "The Human Heart", text: "Interactive diagram of chambers, valves and vessels.", tone: "bg-mint" },
  { to: "/anatomy/blood", title: "Blood & Its Components", text: "Plasma, red cells, white cells and platelets.", tone: "bg-peach" },
  { to: "/anatomy/arteries", title: "Arteries", text: "Wall layers, what they're made of and what they do.", tone: "bg-lavender" },
  { to: "/anatomy/veins", title: "Veins", text: "Wall layers, valves and low-pressure return flow.", tone: "bg-sky" },
] as const;

function CardioHub() {
  return (
    <section className="relative px-5 pt-10 pb-10 sm:pt-14">
      <div className="bg-hero pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]" />
      <div className="mx-auto max-w-6xl">
        <Link to="/anatomy" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Anatomy Explorer
        </Link>
        <span className="font-mono text-xs uppercase tracking-widest text-mint-deep">Anatomy Explorer · Unit 1</span>
        <h1 className="mt-3 mb-8 text-4xl font-bold sm:text-5xl">Cardiovascular System</h1>
        <div className="grid gap-4 sm:grid-cols-2">
          {SECTIONS.map((s, i) => (
            <Link
              key={s.to}
              to={s.to}
              style={{ animationDelay: `${i * 80}ms` }}
              className="animate-fade-up rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-mint hover:shadow-float"
            >
              <div className={cn("mb-4 grid size-10 place-items-center rounded-2xl font-mono text-sm font-bold", s.tone)}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-display text-xl font-semibold">{s.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              <div className="mt-3 text-xs font-semibold text-mint-deep">Explore →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
