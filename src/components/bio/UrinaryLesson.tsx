import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import chart from "@/assets/urinary-anatomy.png.asset.json";
import { URINARY_PARTS, URINARY_SECTIONS, URINARY_STEPS, type UrinarySection } from "@/data/urinary";

export function UrinaryLesson({ section }: { section: UrinarySection }) {
  const [selected, setSelected] = useState(0);
  const current = URINARY_SECTIONS.find(item => item.id === section);
  if (!current) return null;
  const part = section === "anatomy" ? selected : URINARY_STEPS[selected]?.part ?? 0;
  const item = section === "anatomy" ? URINARY_PARTS[selected] : URINARY_STEPS[selected];
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-6xl">
    <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/anatomy/urinary"><ArrowLeft /> Urinary System</Link></Button>
    <p className="font-mono text-xs uppercase tracking-widest text-sky-deep">Anatomy Explorer · Urinary system</p>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{current.title}</h1><p className="mt-3 text-muted-foreground">{current.description}</p>
    <nav aria-label="Urinary system sections" className="my-7 flex flex-wrap gap-2">{URINARY_SECTIONS.map(s => <Button key={s.id} asChild size="sm" variant={section === s.id ? "default" : "outline"} className="h-auto whitespace-normal py-2"><Link to={s.to} aria-current={section === s.id ? "page" : undefined}>{s.title}</Link></Button>)}</nav>
    <figure className="mx-auto max-w-3xl"><div className="relative overflow-hidden rounded-3xl"><img src={chart.url} alt="Detailed male urinary anatomy showing both kidneys, ureters, bladder and urethra, with the neighbouring prostate labelled" width={1500} height={1500} className="block w-full" /><svg viewBox="0 0 1000 1000" role="img" aria-label={`${URINARY_PARTS[part]?.name} highlighted on the urinary system`} className="pointer-events-none absolute inset-0 h-full w-full"><path d={URINARY_PARTS[part]?.highlight} className="fill-mint/20 stroke-mint-deep" strokeWidth="3" /></svg></div>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground"><a href="https://commons.wikimedia.org/wiki/File:Urinary_System_(Male).png" target="_blank" rel="noreferrer" className="underline">BruceBlaus</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer" className="underline">CC BY-SA 4.0</a> · selection highlights added; adapted visual under the same license</figcaption>
    </figure>
    <div className="mt-7 flex flex-wrap gap-2">{(section === "anatomy" ? URINARY_PARTS : URINARY_STEPS).map((s,i) => <Button key={s.name} variant={selected === i ? "default" : "outline"} aria-pressed={selected === i} onClick={() => setSelected(i)} className="h-auto min-h-12 whitespace-normal py-3">{s.name}</Button>)}</div>
    <div aria-live="polite" className="mt-6 min-h-32 border-l-2 border-mint pl-5"><h2 className="text-xl font-bold">{section === "anatomy" ? item?.name : URINARY_STEPS[selected]?.title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{item?.text}</p></div>
    {section === "function" && <><Button variant="outline" className="mt-4" onClick={() => setSelected((selected + 1) % URINARY_STEPS.length)}>Follow the urine <ArrowRight /></Button><div className="mt-7 border-t border-border pt-6"><h3 className="text-xl font-bold text-sky-deep">Engineering link</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Dialysis machines help remove waste and excess water when kidneys cannot do enough of this work. A membrane separates blood from dialysis fluid, allowing selected substances to move across without mixing the two fluids.</p></div></>}
    <div className="mt-10 flex justify-end"><Button asChild variant="outline"><Link to={section === "anatomy" ? "/anatomy/urinary/function" : "/anatomy/urinary"}>{section === "anatomy" ? "Next section" : "Back to sections"}<ArrowRight /></Link></Button></div>
  </div></section>;
}