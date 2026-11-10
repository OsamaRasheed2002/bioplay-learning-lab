import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import female from "@/assets/reproductive-female.png.asset.json";
import male from "@/assets/reproductive-male.png.asset.json";
import { REPRODUCTIVE_PARTS, REPRODUCTIVE_SECTIONS, REPRODUCTIVE_STEPS, type ReproductiveSection } from "@/data/reproductive";

export function ReproductiveLesson({ section }: { section: ReproductiveSection }) {
  const [view, setView] = useState<"female" | "male">("female");
  const [selected, setSelected] = useState(0);
  const current = REPRODUCTIVE_SECTIONS.find(s => s.id === section);
  if (!current) return null;
  const parts = REPRODUCTIVE_PARTS[view];
  const item = section === "anatomy" ? parts[selected] : REPRODUCTIVE_STEPS[selected];
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-6xl">
    <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/anatomy/reproductive"><ArrowLeft /> Reproductive System</Link></Button>
    <p className="font-mono text-xs uppercase tracking-widest text-peach-deep">Anatomy Explorer · Reproductive system</p>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{current.title}</h1><p className="mt-3 text-muted-foreground">{current.description}</p>
    <nav aria-label="Reproductive system sections" className="my-7 flex flex-wrap gap-2">{REPRODUCTIVE_SECTIONS.map(s => <Button key={s.id} asChild size="sm" variant={section === s.id ? "default" : "outline"} className="h-auto whitespace-normal py-2"><Link to={s.to} aria-current={section === s.id ? "page" : undefined}>{s.title}</Link></Button>)}</nav>
    <div role="group" aria-label="Anatomy view" className="mb-5 flex gap-2">{(["female", "male"] as const).map(v => <Button key={v} variant={view === v ? "default" : "outline"} aria-pressed={view === v} onClick={() => { setView(v); if (section === "anatomy") setSelected(0); }}>{v === "female" ? "Female anatomy" : "Male anatomy"}</Button>)}</div>
    <figure><div className="overflow-hidden rounded-3xl"><img src={view === "female" ? female.url : male.url} alt={view === "female" ? "Labelled female reproductive cross-section with ovary, uterine tube, uterus, cervix, vagina and vulva" : "Labelled male reproductive cross-section with testis, epididymis, vas deferens, prostate, seminal vesicle, penis and urethra"} width={view === "female" ? 2200 : 1920} height={view === "female" ? 1800 : 1050} className="block w-full" /></div><figcaption className="mt-3 text-center text-xs text-muted-foreground">{view === "female" ? <><a href="https://commons.wikimedia.org/wiki/File:Blausen_0400_FemaleReproSystem_02.png" target="_blank" rel="noreferrer" className="underline">Blausen Medical / BruceBlaus</a> · <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer" className="underline">CC BY 3.0</a></> : <><a href="https://commons.wikimedia.org/wiki/File:Male_anatomy_1.png" target="_blank" rel="noreferrer" className="underline">Sciencia58, based on Tsaitgaist</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer" className="underline">CC BY-SA 4.0</a></>}</figcaption></figure>
    <div className="mt-7 flex flex-wrap gap-2">{(section === "anatomy" ? parts : REPRODUCTIVE_STEPS).map((s,i) => <Button key={s.name} variant={selected === i ? "default" : "outline"} aria-pressed={selected === i} onClick={() => setSelected(i)} className="h-auto min-h-12 whitespace-normal py-3">{s.name}</Button>)}</div>
    <div aria-live="polite" className="mt-6 min-h-32 border-l-2 border-mint pl-5"><h2 className="text-xl font-bold">{section === "anatomy" ? item?.name : REPRODUCTIVE_STEPS[selected]?.title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{item?.text}</p></div>
    {section === "function" && <><Button variant="outline" className="mt-4" onClick={() => setSelected((selected + 1) % REPRODUCTIVE_STEPS.length)}>Follow the stages <ArrowRight /></Button><div className="mt-7 border-t border-border pt-6"><h3 className="text-xl font-bold text-peach-deep">Engineering link</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Ultrasound uses sound waves to image pelvic organs and monitor pregnancy. In IVF laboratories, engineers help control temperature, gases and fluid conditions while embryos develop outside the body before transfer.</p></div></>}
    <div className="mt-10 flex justify-end"><Button asChild variant="outline"><Link to={section === "anatomy" ? "/anatomy/reproductive/function" : "/anatomy/reproductive"}>{section === "anatomy" ? "Next section" : "Back to sections"}<ArrowRight /></Link></Button></div>
  </div></section>;
}