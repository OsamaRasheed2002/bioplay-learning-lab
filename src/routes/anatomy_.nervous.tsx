import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NERVOUS_SECTIONS, nervousHead } from "@/data/nervous";
import { TONE_CLASSES } from "@/lib/modules";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/anatomy_/nervous")({
  head: () => nervousHead("Nervous System", "Explore nervous system anatomy, how neurons carry signals and how reflexes control movement in three short visual lessons."),
  component: NervousHub,
});

function NervousHub() {
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-6xl">
    <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/anatomy"><ArrowLeft /> Anatomy Explorer</Link></Button>
    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-lavender-deep"><Brain className="size-4" /> Anatomy Explorer · Unit 4</div>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Nervous System</h1>
    <p className="mt-4 max-w-2xl text-muted-foreground">Sense, think, respond: the communication network connecting your brain to the rest of your body.</p>
    <div className="mt-8 grid gap-4 md:grid-cols-3">{NERVOUS_SECTIONS.map((item, i) => <Link key={item.id} to={item.to} className="animate-fade-up rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-lavender motion-reduce:transform-none"><div className={cn("mb-5 grid size-10 place-items-center rounded-2xl font-mono text-sm font-bold", TONE_CLASSES[item.tone].soft, TONE_CLASSES[item.tone].text)}>0{i + 1}</div><h2 className="text-xl font-semibold">{item.title}</h2><p className="mt-2 min-h-12 text-sm text-muted-foreground">{item.description}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-lavender-deep">Explore <ArrowRight className="size-4" /></span></Link>)}</div>
  </div></section>;
}