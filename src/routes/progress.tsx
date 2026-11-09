import { createFileRoute } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";

import { ProgressPanel } from "@/components/bio/ProgressPanel";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "My Progress — BEPlay" },
      { name: "description", content: "Track your XP, achievements and completed biomedical engineering topics." },
      { property: "og:title", content: "My Progress — BEPlay" },
      { property: "og:description", content: "Track your XP, achievements and completed biomedical engineering topics." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const { reset } = useProgress();
  return (
    <section className="relative px-5 pt-10 sm:pt-16">
      <div className="bg-hero pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="animate-fade-up space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-mint-deep">
              Your lab notebook
            </span>
            <h1 className="text-5xl font-bold sm:text-6xl">My Progress</h1>
            <p className="max-w-lg text-muted-foreground">
              Every lesson, challenge and experiment adds XP. Level up and unlock achievements as you
              go.
            </p>
          </div>
          <Button variant="glass" size="sm" onClick={reset}>
            <RotateCcw /> Reset progress
          </Button>
        </div>
        <ProgressPanel />
      </div>
    </section>
  );
}
