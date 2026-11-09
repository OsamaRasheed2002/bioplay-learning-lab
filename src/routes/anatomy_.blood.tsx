import { createFileRoute } from "@tanstack/react-router";
import { Cpu } from "lucide-react";

import { LessonShell } from "@/components/bio/VesselLesson";
import { BLOOD_COMPONENTS } from "@/data/cardio";
import { TONE_CLASSES } from "@/lib/modules";
import { cn } from "@/lib/utils";

const T = "Blood & Its Components · BEPlay";
const D = "Learn what blood is made of — plasma, red cells, white cells and platelets — and what each does.";

export const Route = createFileRoute("/anatomy_/blood")({
  head: () => ({
    meta: [
      { title: T },
      { name: "description", content: D },
      { property: "og:title", content: T },
      { property: "og:description", content: D },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BloodPage,
});

const LEGEND = [
  { name: "Plasma", share: "~55%", fill: "bg-plasma" },
  { name: "Red cells", share: "~45%", fill: "bg-redcell" },
  { name: "White cells", share: "<1%", fill: "bg-whitecell" },
  { name: "Platelets", share: "<1%", fill: "bg-platelet" },
];

function BloodPage() {
  return (
    <LessonShell
      unit="Cardiovascular system · Section 2"
      title="Blood & Its Components"
      intro="An adult has about 5 litres of blood. Spin a sample in a centrifuge and it separates into plasma on top, a thin 'buffy coat' of white cells and platelets, and red cells at the bottom."
    >
      <div className="mb-3 flex h-11 overflow-hidden rounded-full border border-border font-mono text-xs">
        <div className="grid basis-[55%] place-items-center bg-plasma text-plasma-ink">Plasma 55%</div>
        <div
          className="grid basis-[3%] place-items-center bg-whitecell text-whitecell-ink"
          title="White blood cells — under 1% of blood"
        >
          <span className="hidden md:inline">WBC</span>
        </div>
        <div
          className="grid basis-[3%] place-items-center bg-platelet text-platelet-ink"
          title="Platelets — under 1% of blood"
        >
          <span className="hidden md:inline">PLT</span>
        </div>
        <div className="grid basis-[39%] place-items-center bg-redcell text-redcell-ink">Red cells ~45%</div>
      </div>
      <div className="mb-2 flex flex-wrap gap-2 font-mono text-xs">
        {LEGEND.map((l) => (
          <span
            key={l.name}
            className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 shadow-soft"
          >
            <span className={cn("size-3 rounded-full ring-1 ring-border", l.fill)} />
            {l.name}
            <span className="text-muted-foreground">{l.share}</span>
          </span>
        ))}
      </div>
      <p className="mb-8 font-mono text-xs text-muted-foreground">
        White cells and platelets are each under 1% of blood — drawn a little wider here so you can see them.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        {BLOOD_COMPONENTS.map((c, i) => (
          <div key={c.name} style={{ animationDelay: `${i * 80}ms` }} className="animate-fade-up overflow-hidden rounded-4xl border border-border bg-card shadow-soft">
            <div className="relative">
              <img src={c.image} alt={c.alt} loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full object-cover" />
              <span className={cn("absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-xs backdrop-blur-sm", TONE_CLASSES[c.tone].soft, TONE_CLASSES[c.tone].text)}>{c.share}</span>
            </div>
            <div className="p-6">
            <h2 className="text-2xl font-bold">{c.name}</h2>
            <p className="mt-3 text-sm"><span className="font-semibold">What it is: </span><span className="text-muted-foreground">{c.what}</span></p>
            <p className="mt-2 text-sm"><span className="font-semibold">Function: </span><span className="text-muted-foreground">{c.job}</span></p>
            <div className="mt-4 rounded-2xl bg-lavender-soft p-3 text-sm">
              <div className="mb-1 flex items-center gap-1.5 font-semibold text-lavender-deep"><Cpu className="size-4" /> Engineering link</div>
              {c.engineering}
            </div>
            </div>
          </div>
        ))}
      </div>
    </LessonShell>
  );
}
