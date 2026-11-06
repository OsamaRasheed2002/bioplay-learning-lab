import { CheckCircle2, Clock, Flame, Sparkles, XCircle, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { PulseLine } from "@/components/bio/PulseLine";
import { questionFor } from "@/data/dailyQuestions";
import { DAILY_XP, answerDaily, currentStreak, todayKey, useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

function untilMidnight(now: Date) {
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const s = Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
}

export function DailyChallenge() {
  const { progress, update } = useProgress();
  // Clock starts after mount so server and browser render the same first frame.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const q = questionFor(now ?? undefined);
  const ready = now !== null;
  const answeredToday = ready && progress.dailyAnsweredOn === todayKey(now);
  const picked = answeredToday ? progress.dailyChoice : null;
  const revealed = answeredToday;
  const streak = ready ? currentStreak(progress, now) : 0;

  function choose(i: number) {
    if (!ready || revealed) return;
    const correct = i === q.answer;
    update((p) => answerDaily(p, i));
    if (correct) toast.success(`Correct! +${DAILY_XP} XP`);
    else toast(`Not quite — +${DAILY_XP} XP for showing up`, { description: "Check the explanation." });
  }

  return (
    <div className="relative overflow-hidden rounded-4xl border border-border bg-card p-6 shadow-soft sm:p-10">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-lavender-soft px-3 py-1 font-mono text-xs font-medium text-lavender-deep">
              <Zap className="size-3.5" /> Daily Warm-Up · +{DAILY_XP} XP
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-peach-soft px-3 py-1 font-mono text-xs font-medium text-peach-deep">
              <Flame className="size-3.5" /> {streak}-day streak
            </span>
          </div>
          <h3 className={cn("text-3xl font-bold sm:text-4xl", !ready && "opacity-0")}>{q.question}</h3>
          <PulseLine className="h-14" />
        </div>

        <div className={cn("space-y-3", !ready && "opacity-0")}>
          {q.options.map((opt, i) => {
            const isAnswer = i === q.answer;
            const isPicked = picked === i;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => choose(i)}
                disabled={!ready || revealed}
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

          {revealed && now && (
            <div className="animate-fade-up space-y-3 rounded-2xl bg-sky-soft p-4 text-sm text-foreground">
              <div className="flex items-center gap-1.5 font-semibold">
                <Sparkles className="size-4 text-sky-deep" />
                {picked === q.answer ? "You got it right!" : "Not quite this time."}
              </div>
              <p>{q.explanation}</p>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3 text-xs text-muted-foreground">
                <span>Come back tomorrow for a new question</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-foreground">
                  <Clock className="size-3.5" /> {untilMidnight(now)}
                </span>
              </div>
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
