import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import chart from "@/assets/skin-anatomy.jpg.asset.json";
import { SKIN_PARTS, SKIN_SECTIONS, SKIN_FUNCTIONS, type SkinSection } from "@/data/integumentary";

function SkinPicture({ selected }: { selected: number }) {
  return <figure><div className="relative overflow-hidden rounded-3xl"><img src={chart.url} alt="Detailed three-dimensional skin cross-section showing epidermis, dermis, subcutaneous fat, hair follicles, glands, nerves and vessels" width={1920} height={1080} className="block w-full" /><svg viewBox="0 0 1000 562.5" role="img" aria-label={`${SKIN_PARTS[selected]?.name} highlighted on the skin cross-section`} className="pointer-events-none absolute inset-0 h-full w-full"><path d={SKIN_PARTS[selected]?.highlight} className="fill-mint/20 stroke-mint-deep" strokeWidth="3" /></svg></div><figcaption className="mt-3 text-center text-xs text-muted-foreground"><a href="https://commons.wikimedia.org/wiki/File:Integumentary_system.jpg" target="_blank" rel="noreferrer" className="underline">Scientific Animations</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer" className="underline">CC BY-SA 4.0</a> · selection highlights added; adapted visual under the same license</figcaption></figure>;
}

export function SkinLesson({ section }: { section: SkinSection }) {
  const [selected, setSelected] = useState(0);
  const current = SKIN_SECTIONS.find(item => item.id === section);
  if (!current) return null;
  const item = section === "anatomy" ? SKIN_PARTS[selected] : SKIN_FUNCTIONS[selected];
  return <section className="px-5 py-10 sm:py-14"><div className="mx-auto max-w-6xl"><Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/anatomy/integumentary"><ArrowLeft /> Integumentary System</Link></Button><p className="font-mono text-xs uppercase tracking-widest text-peach-deep">Anatomy Explorer · Integumentary system</p><h1 className="mt-3 text-4xl font-bold sm:text-5xl">{current.title}</h1><p className="mt-3 text-muted-foreground">{current.description}</p><nav aria-label="Integumentary system sections" className="my-7 flex flex-wrap gap-2">{SKIN_SECTIONS.map(s => <Button key={s.id} asChild size="sm" variant={section === s.id ? "default" : "outline"}><Link to={s.to} aria-current={section === s.id ? "page" : undefined}>{s.title}</Link></Button>)}</nav>
  <SkinPicture selected={section === "anatomy" ? selected : SKIN_FUNCTIONS[selected]?.part ?? 0} />
  <div className="mt-7 flex flex-wrap gap-2">{(section === "anatomy" ? SKIN_PARTS : SKIN_FUNCTIONS).map((s,i) => <Button key={s.name} variant={selected === i ? "default" : "outline"} aria-pressed={selected === i} onClick={() => setSelected(i)} className="h-auto min-h-12 whitespace-normal py-3">{s.name}</Button>)}</div><div aria-live="polite" className="mt-6 min-h-32 border-l-2 border-mint pl-5"><h2 className="text-xl font-bold">{section === "anatomy" ? item?.name : SKIN_FUNCTIONS[selected]?.title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{item?.text}</p></div>
  {section === "functions" && <div className="mt-7 border-t border-border pt-6"><h3 className="text-xl font-bold text-peach-deep">Engineering link</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Engineers design wound dressings, artificial skin and wearable sensors that interact with this barrier. Good designs consider moisture, flexibility and contact with sensitive skin.</p></div>}
  <div className="mt-10 flex justify-end"><Button asChild variant="outline"><Link to={section === "anatomy" ? "/anatomy/integumentary/functions" : "/anatomy/integumentary"}>{section === "anatomy" ? "Next section" : "Back to sections"}<ArrowRight /></Link></Button></div></div></section>;
}