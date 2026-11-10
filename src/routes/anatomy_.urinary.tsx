import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { URINARY_SECTIONS, urinaryHead } from "@/data/urinary";
export const Route = createFileRoute("/anatomy_/urinary")({
  head: () => urinaryHead("Urinary System", "Explore urinary anatomy, kidney filtration and urine flow in two simple visual lessons."),
  component: UrinaryHub,
});
function UrinaryHub() {
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-6xl"><Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/anatomy"><ArrowLeft /> Anatomy Explorer</Link></Button><p className="font-mono text-xs uppercase tracking-widest text-sky-deep">Anatomy Explorer · Unit 9</p><h1 className="mt-3 text-4xl font-bold sm:text-5xl">Urinary System</h1><p className="mt-4 max-w-2xl text-muted-foreground">Kidneys, ureters, bladder and urethra: removing waste and keeping the body’s water and salts in balance.</p><div className="mt-8 grid gap-4 md:grid-cols-2">{URINARY_SECTIONS.map((item,i) => <Link key={item.id} to={item.to} className="rounded-3xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1 hover:border-sky motion-reduce:transform-none"><div className="mb-5 grid size-10 place-items-center rounded-2xl bg-sky-soft font-mono text-sm font-bold text-sky-deep">0{i+1}</div><h2 className="text-xl font-semibold">{item.title}</h2><p className="mt-2 min-h-12 text-sm text-muted-foreground">{item.description}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-sky-deep">Explore <ArrowRight className="size-4" /></span></Link>)}</div></div></section>;
}