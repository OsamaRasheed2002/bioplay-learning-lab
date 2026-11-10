import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DIGESTIVE_SECTIONS, digestiveHead } from "@/data/digestive";
import { TONE_CLASSES } from "@/lib/modules";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/anatomy_/digestive")({
  head: () => digestiveHead("Digestive System", "Explore digestive anatomy and follow the journey of food in two interactive visual lessons."),
  component: DigestiveHub,
});

function DigestiveHub() {
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-6xl">
    <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/anatomy"><ArrowLeft /> Anatomy Explorer</Link></Button>
    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-peach-deep"><Utensils className="size-4" /> Anatomy Explorer · Unit 5</div>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Digestive System</h1>
    <p className="mt-4 max-w-2xl text-muted-foreground">From a bite of food to fuel for your cells: the organs that break down, absorb and move a meal.</p>
    <div className="mt-8 grid gap-4 md:grid-cols-2">{DIGESTIVE_SECTIONS.map((item, i) => <Link key={item.id} to={item.to} className="animate-fade-up rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-peach motion-reduce:transform-none"><div className={cn("mb-5 grid size-10 place-items-center rounded-2xl font-mono text-sm font-bold", TONE_CLASSES[item.tone].soft, TONE_CLASSES[item.tone].text)}>0{i + 1}</div><h2 className="text-xl font-semibold">{item.title}</h2><p className="mt-2 min-h-12 text-sm text-muted-foreground">{item.description}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-peach-deep">Explore <ArrowRight className="size-4" /></span></Link>)}</div>
  </div></section>;
}