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

function BloodPage() {
  return (
    <LessonShell
      unit="Cardiovascular system · Section 2"
      title="Blood & Its Components"
      intro="An adult has about 5 litres of blood. Spin a sample in a centrifuge and it separates into plasma on top, a thin 'buffy coat' of white cells and platelets, and red cells at the bottom."
    >
      <div className="mb-8 flex h-10 overflow-hidden rounded-full border border-border font-mono text-xs">
        <div className="grid basis-[55%] place-items-center bg-peach">Plasma 55%</div>
        <div className="grid basis-[3%] place-items-center bg-lavender" title="White cells & platelets" />
        <div className="grid basis-[42%] place-items-center bg-sky">Red cells ~45%</div>
      </div>
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
