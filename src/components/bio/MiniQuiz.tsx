import { useEffect, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  XP_PER_CORRECT,
  awardMiniQuizAnswer,
  miniQuizXpEarned,
  quizWeek,
  weeklyQuiz,
} from "@/data/miniQuizzes";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function MiniQuiz({ id }: { id: string }) {
  const [week, setWeek] = useState(0);
  useEffect(() => setWeek(quizWeek()), []);
  const qs = weeklyQuiz(id, week);
  const [picks, setPicks] = useState<(number | null)[]>(() => qs.map(() => null));
  useEffect(() => setPicks(qs.map(() => null)), [week]);
  const { progress, update } = useProgress();
  const done = picks.every((p) => p !== null);
  const score = picks.filter((p, i) => p === qs[i]!.answer).length;
  const earned = miniQuizXpEarned(progress, id, week, qs.length);

  const choose = (qi: number, oi: number) => {
    if (picks[qi] !== null) return;
    const next = picks.map((p, i) => (i === qi ? oi : p));
    setPicks(next);
    const correct = oi === qs[qi]!.answer;
    update((p) => awardMiniQuizAnswer(p, { id, week, qi, correct }));
  };

  return <div className="mt-12 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
    <p className="font-mono text-xs uppercase tracking-widest text-mint-deep">
      Mini quiz · new questions every Thursday 9pm · +{XP_PER_CORRECT} XP per correct answer
    </p>
    <h2 className="mt-2 text-2xl font-bold">Test what you learned</h2>
    <div className="mt-6 space-y-6">{qs.map((q, qi) => <div key={qi}>
      <p className="font-semibold">{qi + 1}. {q.q}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">{q.options.map((o, oi) => {
        const picked = picks[qi];
        const right = picked !== null && oi === q.answer;
        const wrong = picked === oi && oi !== q.answer;
        return <button key={oi} type="button" onClick={() => choose(qi, oi)} disabled={picked !== null}
          className={cn("flex items-center justify-between gap-2 rounded-2xl border px-4 py-3 text-left text-sm transition-colors",
            right ? "border-mint bg-mint/20" : wrong ? "border-destructive bg-destructive/15" : "border-border hover:border-mint")}>
          {o}{right && <Check className="size-4 text-mint-deep" />}{wrong && <X className="size-4 text-destructive" />}
        </button>;
      })}</div>
      {picks[qi] !== null && <p className="mt-2 text-sm text-muted-foreground">{q.why}</p>}
    </div>)}</div>
    {done && <div className="mt-6 flex flex-wrap items-center gap-4">
      <p className="font-semibold">You scored {score}/{qs.length}{earned > 0 ? ` · +${earned} XP earned` : " · no XP this time"}</p>
      <Button variant="outline" size="sm" onClick={() => setPicks(qs.map(() => null))}><RotateCcw /> Try again</Button>
    </div>}
  </div>;
}
