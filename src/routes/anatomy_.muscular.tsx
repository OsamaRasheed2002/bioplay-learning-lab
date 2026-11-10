import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MUSCULAR_SECTIONS, muscularHead } from "@/data/muscular";

export const Route = createFileRoute("/anatomy_/muscular")({
  head: () => muscularHead("Muscular System", "Explore major muscles, contraction and movement in two simple interactive lessons."),
  component: MuscularHub,
});
function MuscularHub() {
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-6xl"><Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/anatomy"><ArrowLeft /> Anatomy Explorer</Link></Button><div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-lavender-deep"><Dumbbell className="size-4" /> Anatomy Explorer · Unit 6</div><h1 className="mt-3 text-4xl font-bold sm:text-5xl">Muscular System</h1><p className="mt-4 max-w-2xl text-muted-foreground">From lifting an arm to taking a step: discover the muscles that move your body and how they generate force.</p><div className="mt-8 grid gap-4 md:grid-cols-2">{MUSCULAR_SECTIONS.map((item, i) => <Link key={item.id} to={item.to} className="rounded-3xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1 hover:border-lavender motion-reduce:transform-none"><div className="mb-5 grid size-10 place-items-center rounded-2xl bg-lavender-soft font-mono text-sm font-bold text-lavender-deep">0{i + 1}</div><h2 className="text-xl font-semibold">{item.title}</h2><p className="mt-2 min-h-12 text-sm text-muted-foreground">{item.description}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-lavender-deep">Explore <ArrowRight className="size-4" /></span></Link>)}</div></div></section>;
}