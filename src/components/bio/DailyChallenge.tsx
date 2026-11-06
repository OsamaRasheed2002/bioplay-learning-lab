import { CheckCircle2, Sparkles, XCircle, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PulseLine } from "@/components/bio/PulseLine";
import { todayKey, useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

const QUESTION = {
  prompt: "On an ECG trace, which wave represents ventricular depolarization?",
  options: ["P wave", "QRS complex", "T wave", "U wave"],
  answer: 1,
  explain:
    "The QRS complex marks the rapid electrical spread through the ventricles, just before they contract.",
};

const REWARD = 50;

export function DailyChallenge() {
  const { progress, update } = useProgress();
  const [picked, setPicked] = useState<number | null>(null);
  const answeredToday = progress.dailyAnsweredOn === todayKey();
  const revealed = picked !== null || answeredToday;

  function choose(i: number) {
    if (revealed) return;
    setPicked(i);
    const correct = i === QUESTION.answer;
    update((p) => ({
      ...p,
      xp: p.xp + (correct ? REWARD : 10),
      dailyAnsweredOn: todayKey(),
      achievements: p.achievements.includes("pulse-check")
        ? p.achievements
        : [...p.achievements, "pulse-check"],
    }));
    if (correct) toast.success(`Correct! +${REWARD} XP`, { description: "Achievement unlocked: Pulse Check" });
    else toast("Nice try! +10 XP for showing up", { description: "Check the explanation below." });
  }

  return (
    <div className="relative overflow-hidden rounded-4xl border border-border bg-card p-6 shadow-soft sm:p-10">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-lavender-soft px-3 py-1 font-mono text-xs font-medium text-lavender-deep">
            <Zap className="size-3.5" /> Daily Pulse Check · +{REWARD} XP
          </span>
          <h3 className="text-3xl font-bold sm:text-4xl">{QUESTION.prompt}</h3>
          <PulseLine className="h-14" />
        </div>

        <div className="space-y-3">
          {QUESTION.options.map((opt, i) => {
            const isAnswer = i === QUESTION.answer;
            const isPicked = picked === i;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => choose(i)}
                disabled={revealed}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left font-medium transition-all duration-300",
                  !revealed &&
                    "cursor-pointer border-border bg-surface hover:-translate-y-0.5 hover:border-mint hover:shadow-soft",
                  revealed && isAnswer && "border-success bg-mint-soft text-foreground",
                  revealed && isPicked && !isAnswer && "border-destructive bg-peach-soft",
                  revealed && !isAnswer && !isPicked && "border-border bg-surface opacity-60",
                )}
              >
                <span className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-full bg-muted font-mono text-xs">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </span>
                {revealed && isAnswer && <CheckCircle2 className="size-5 text-success" />}
                {revealed && isPicked && !isAnswer && <XCircle className="size-5 text-destructive" />}
              </button>
            );
          })}

          {revealed && (
            <div className="animate-fade-up rounded-2xl bg-sky-soft p-4 text-sm text-foreground">
              <div className="mb-1 flex items-center gap-1.5 font-semibold">
                <Sparkles className="size-4 text-sky-deep" /> Why?
              </div>
              {QUESTION.explain}
              {answeredToday && picked === null && (
                <p className="mt-2 text-xs text-muted-foreground">
                  You've already answered today — come back tomorrow for a new one.
                </p>
              )}
            </div>
          )}
          {!revealed && (
            <p className="px-1 text-xs text-muted-foreground">Pick an answer to earn XP.</p>
          )}
        </div>
      </div>
    </div>
  );
}
