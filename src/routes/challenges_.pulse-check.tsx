import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, HeartPulse, X } from "lucide-react";

import { daysSinceStart } from "@/data/dailyQuestions";
import { todayKey, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/challenges_/pulse-check")({
  head: () => ({
    meta: [
      { title: "Daily Pulse Check — BEPlay" },
      { name: "description", content: "Read three patients' pulses each day and spot slow, normal or fast heart rates." },
    ],
  }),
  component: PulseCheck,
});

const PULSE_XP = 30;
const NAMES = ["Amira", "Ben", "Chen", "Dina", "Eli", "Farah", "Gus", "Hana", "Ivan", "Jude", "Kai", "Lina"];
const CHOICES = [
  { id: "slow", label: "Too slow", sub: "under 60 bpm" },
  { id: "normal", label: "Normal", sub: "60–100 bpm" },
  { id: "fast", label: "Too fast", sub: "over 100 bpm" },
] as const;
type Choice = (typeof CHOICES)[number]["id"];
const classify = (bpm: number): Choice => (bpm < 60 ? "slow" : bpm > 100 ? "fast" : "normal");

/** Three patients per day, picked from the local date so everyone gets the same set. */
function casesFor(day: number) {
  const rand = (n: number) => { const x = Math.sin(day * 97 + n * 13) * 10000; return x - Math.floor(x); };
  const bands = [[38, 55], [64, 96], [108, 150]];
  return [0, 1, 2].map((n) => {
    const band = bands[Math.floor(rand(n) * 3)]!;
    return { name: NAMES[Math.floor(rand(n + 5) * NAMES.length)]!, bpm: Math.round(band[0]! + rand(n + 9) * (band[1]! - band[0]!)) };
  });
}

function PulseCheck() {
  const { progress, update } = useProgress();
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  const cases = useMemo(() => (now ? casesFor(daysSinceStart(now)) : []), [now]);
  const [answers, setAnswers] = useState<(Choice | null)[]>([null, null, null]);
  const key = now ? `pulse:${todayKey(now)}` : "";
  const claimed = !!key && progress.completedTopics.includes(key);
  const allDone = answers.every(Boolean);
  const score = cases.filter((c, i) => answers[i] === classify(c.bpm)).length;

  useEffect(() => {
    if (allDone && key) update((p) => (p.completedTopics.includes(key) ? p : { ...p, xp: p.xp + PULSE_XP, completedTopics: [...p.completedTopics, key] }));
  }, [allDone, key, update]);

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <Link to="/challenges" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Interactive Challenges
      </Link>
      <p className="mt-6 font-mono text-xs uppercase tracking-widest text-mint">Daily challenge</p>
      <h1 className="mt-1 font-display text-4xl font-bold">Daily Pulse Check</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Three new patients every day. Watch each heart beat, read the heart rate and decide: too slow, normal or too fast?
        Finish all three for +{PULSE_XP} XP once a day.
      </p>
      {claimed && !allDone && <p className="mt-3 inline-block rounded-full bg-mint/15 px-3 py-1 text-sm text-mint">Today's XP already earned — practise anyway!</p>}

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {cases.map((c, i) => {
          const pick = answers[i];
          const right = classify(c.bpm);
          return (
            <div key={i} className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <p className="font-mono text-xs text-muted-foreground">Patient {i + 1}</p>
              <h2 className="font-display text-xl font-semibold">{c.name}</h2>
              <div className="mt-4 flex items-center gap-4 rounded-2xl bg-muted/60 p-4">
                <HeartPulse className="h-10 w-10 shrink-0 text-redcell" style={{ animation: `pulse-beat ${60 / c.bpm}s ease-in-out infinite` }} />
                <div>
                  <p className="font-display text-3xl font-bold">{c.bpm}<span className="ml-1 text-sm font-normal text-muted-foreground">bpm</span></p>
                  <p className="text-xs text-muted-foreground">Beat every {(60 / c.bpm).toFixed(2)} s</p>
                </div>
              </div>
              <div className="mt-4 grid gap-2">
                {CHOICES.map((ch) => {
                  const state = !pick ? "hover:border-mint" : ch.id === right ? "border-mint bg-mint/15" : ch.id === pick ? "border-destructive bg-destructive/10" : "opacity-50";
                  return (
                    <button key={ch.id} disabled={!!pick} onClick={() => setAnswers((a) => a.map((v, j) => (j === i ? ch.id : v)))}
                      className={`flex items-center justify-between rounded-2xl border border-border px-4 py-2 text-left transition ${state}`}>
                      <span><span className="font-semibold">{ch.label}</span> <span className="text-xs text-muted-foreground">{ch.sub}</span></span>
                      {pick && ch.id === right && <Check className="h-4 w-4 text-mint" />}
                      {pick === ch.id && ch.id !== right && <X className="h-4 w-4 text-destructive" />}
                    </button>
                  );
                })}
              </div>
              {pick && (
                <p className="mt-3 text-sm text-muted-foreground animate-in fade-in">
                  {right === "slow" ? "Bradycardia — a pacemaker might be needed if it causes symptoms." : right === "fast" ? "Tachycardia — could be exercise, fever or an arrhythmia." : "A healthy resting heart rate."}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {allDone && (
        <div className="mt-8 rounded-3xl border border-mint/40 bg-mint/10 p-6 text-center animate-in fade-in zoom-in-95">
          <p className="font-display text-3xl font-bold">{score} / 3 correct</p>
          <p className="mt-1 text-muted-foreground">{claimed ? `+${PULSE_XP} XP saved for today.` : ""} New patients arrive at midnight.</p>
        </div>
      )}
    </main>
  );
}
