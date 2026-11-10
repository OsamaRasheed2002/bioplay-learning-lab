import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { REPRODUCTIVE_SECTIONS, reproductiveHead } from "@/data/reproductive";
export const Route = createFileRoute("/anatomy_/reproductive")({
  head: () => reproductiveHead("Reproductive System", "Explore male and female reproductive anatomy and simple reproductive physiology in two visual lessons."),
  component: ReproductiveHub,
});
function ReproductiveHub() {
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-6xl"><Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/anatomy"><ArrowLeft /> Anatomy Explorer</Link></Button><p className="font-mono text-xs uppercase tracking-widest text-peach-deep">Anatomy Explorer · Unit 10</p><h1 className="mt-3 text-4xl font-bold sm:text-5xl">Reproductive System</h1><p className="mt-4 max-w-2xl text-muted-foreground">The organs, cells and hormones involved in reproduction—from sperm and eggs to pregnancy.</p><div className="mt-8 grid gap-4 md:grid-cols-2">{REPRODUCTIVE_SECTIONS.map((item,i) => <Link key={item.id} to={item.to} className="rounded-3xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1 hover:border-peach motion-reduce:transform-none"><div className="mb-5 grid size-10 place-items-center rounded-2xl bg-peach-soft font-mono text-sm font-bold text-peach-deep">0{i+1}</div><h2 className="text-xl font-semibold">{item.title}</h2><p className="mt-2 min-h-12 text-sm text-muted-foreground">{item.description}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-peach-deep">Explore <ArrowRight className="size-4" /></span></Link>)}</div></div></section>;
}