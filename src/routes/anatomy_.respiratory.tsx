import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESPIRATORY_SECTIONS, respiratoryHead } from "@/data/respiratory";
import { TONE_CLASSES } from "@/lib/modules";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/anatomy_/respiratory")({
  head: () => respiratoryHead("Respiratory System", "Explore the lungs, how breathing works and the basics of respiratory biomechanics in three short sections."),
  component: RespiratoryHub,
});

function RespiratoryHub() {
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-6xl">
    <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/anatomy"><ArrowLeft /> Anatomy Explorer</Link></Button>
    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-mint-deep"><Wind className="size-4" /> Anatomy Explorer · Unit 2</div>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Respiratory System</h1>
    <p className="mt-4 max-w-2xl text-muted-foreground">From your first breath to every breath after: the structures that bring air in, exchange gases and keep you moving.</p>
    <div className="mt-8 grid gap-4 md:grid-cols-3">{RESPIRATORY_SECTIONS.map((item, i) => <Link key={item.id} to={item.to} className="animate-fade-up rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-mint"><div className={cn("mb-5 grid size-10 place-items-center rounded-2xl font-mono text-sm font-bold", TONE_CLASSES[item.tone].soft, TONE_CLASSES[item.tone].text)}>0{i + 1}</div><h2 className="text-xl font-semibold">{item.title}</h2><p className="mt-2 min-h-12 text-sm text-muted-foreground">{item.description}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-mint-deep">Explore <ArrowRight className="size-4" /></span></Link>)}</div>
  </div></section>;
}