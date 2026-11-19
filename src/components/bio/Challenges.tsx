import { useEffect, useState } from "react";
import { Check, Cpu, Stethoscope, Timer, Wrench, X, RotateCcw, Trophy } from "lucide-react";

import { CHALLENGE_XP, DESIGN_MISSIONS, DEVICE_BRIEFS, DIAGNOSIS_PUZZLES, SPEED_QUIZ } from "@/data/challenges";
import { useProgress } from "@/lib/progress";

type Id = "quiz" | "diagnosis" | "design" | "device";
const CARDS: { id: Id; title: string; text: string; icon: typeof Timer; tone: string }[] = [
  { id: "quiz", title: "Speed Quiz", text: "10 questions, 60 seconds. How many can you get?", icon: Timer, tone: "bg-mint/20 text-mint" },
  { id: "diagnosis", title: "Diagnosis Puzzle", text: "Read the patient's clues and pick the right device.", icon: Stethoscope, tone: "bg-lavender/20 text-lavender" },
  { id: "design", title: "Design Mission", text: "Choose the best material for each engineering brief.", icon: Wrench, tone: "bg-peach/20 text-peach-deep" },
  { id: "device", title: "Design a Device", text: "Build a pacemaker, glucose monitor or prosthetic hand, part by part.", icon: Cpu, tone: "bg-sky/20 text-sky" },
];

function useAward() {
  const { progress, update } = useProgress();
  const done = (id: Id) => progress.completedTopics.includes(`challenge:${id}`);
  const award = (id: Id) =>
    update((p) => (p.completedTopics.includes(`challenge:${id}`) ? p : { ...p, xp: p.xp + CHALLENGE_XP, completedTopics: [...p.completedTopics, `challenge:${id}`] }));
  return { done, award };
}

export function Challenges() {
  const [active, setActive] = useState<Id>("quiz");
  const { done, award } = useAward();
  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.slice(1);
      if (CARDS.some((c) => c.id === h)) {
        setActive(h as Id);
        document.getElementById("challenge-games")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  return (
    <section id="challenge-games" className="scroll-mt-20 py-10">
      <p className="font-mono text-xs uppercase tracking-widest text-mint">Play</p>
      <h2 className="mt-1 font-display text-3xl font-bold">Pick a challenge</h2>
      <p className="mt-1 text-muted-foreground">Finish each one for +{CHALLENGE_XP} XP the first time. Replay as often as you like.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c) => (
          <button key={c.id} onClick={() => setActive(c.id)}
            className={`group rounded-3xl border p-5 text-left shadow-sm transition hover:-translate-y-1 ${active === c.id ? "border-mint bg-card ring-2 ring-mint/40" : "border-border bg-card/60"}`}>
            <div className="flex items-center justify-between">
              <span className={`grid h-11 w-11 place-items-center rounded-2xl ${c.tone}`}><c.icon className="h-5 w-5" /></span>
              {done(c.id) && <span className="rounded-full bg-mint/20 px-2 py-0.5 font-mono text-[10px] text-mint">DONE</span>}
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
          </button>
        ))}
      </div>
      <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
        {active === "quiz" && <SpeedQuiz onWin={() => award("quiz")} />}
        {active === "diagnosis" && <Steps kind="diagnosis" onWin={() => award("diagnosis")} />}
        {active === "design" && <Steps kind="design" onWin={() => award("design")} />}
        {active === "device" && <DesignDevice onWin={() => award("device")} />}
      </div>
    </section>
  );
}

function Result({ score, total, onAgain }: { score: number; total: number; onAgain: () => void }) {
  return (
    <div className="py-6 text-center animate-in fade-in zoom-in-95">
      <Trophy className="mx-auto h-12 w-12 text-peach-deep" />
      <p className="mt-3 font-display text-4xl font-bold">{score} / {total}</p>
      <p className="mt-1 text-muted-foreground">{score === total ? "Perfect run!" : score >= total / 2 ? "Nice work!" : "Keep practising!"}</p>
      <button onClick={onAgain} className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
        <RotateCcw className="h-4 w-4" /> Play again
      </button>
    </div>
  );
}

function Options({ options, answer, picked, onPick }: { options: string[]; answer: number; picked: number | null; onPick: (i: number) => void }) {
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {options.map((o, i) => {
        const state = picked === null ? "" : i === answer ? "border-mint bg-mint/15" : i === picked ? "border-destructive bg-destructive/10" : "opacity-50";
        return (
          <button key={o} disabled={picked !== null} onClick={() => onPick(i)}
            className={`flex items-center justify-between rounded-2xl border border-border px-4 py-3 text-left transition hover:border-mint ${state}`}>
            <span>{o}</span>
            {picked !== null && i === answer && <Check className="h-4 w-4 text-mint" />}
            {picked === i && i !== answer && <X className="h-4 w-4 text-destructive" />}
          </button>
        );
      })}
    </div>
  );
}

function SpeedQuiz({ onWin }: { onWin: () => void }) {
  const [started, setStarted] = useState(false);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [picked, setPicked] = useState<number | null>(null);
  const finished = started && (i >= SPEED_QUIZ.length || time <= 0);

  useEffect(() => {
    if (!started || finished) return;
    const t = setInterval(() => setTime((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [started, finished]);
  useEffect(() => { if (finished) onWin(); }, [finished]); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = () => { setI(0); setScore(0); setTime(60); setPicked(null); setStarted(true); };
  if (!started) return (
    <div className="py-6 text-center">
      <Timer className="mx-auto h-12 w-12 text-mint" />
      <h3 className="mt-3 font-display text-2xl font-bold">Speed Quiz</h3>
      <p className="mt-1 text-muted-foreground">10 questions from every part of BEPlay. The clock starts when you press go.</p>
      <button onClick={reset} className="mt-5 rounded-full bg-primary px-6 py-2 font-semibold text-primary-foreground">Go!</button>
    </div>
  );
  if (finished) return <Result score={score} total={SPEED_QUIZ.length} onAgain={reset} />;
  const q = SPEED_QUIZ[i]!;
  return (
    <div>
      <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span>Question {i + 1} / {SPEED_QUIZ.length}</span>
        <span className={time <= 10 ? "text-destructive" : "text-mint"}>{time}s</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-mint transition-all duration-1000" style={{ width: `${(time / 60) * 100}%` }} />
      </div>
      <h3 className="mt-6 font-display text-xl font-semibold">{q.q}</h3>
      <Options options={q.options} answer={q.answer} picked={picked} onPick={(p) => {
        setPicked(p); if (p === q.answer) setScore((s) => s + 1);
        setTimeout(() => { setPicked(null); setI((n) => n + 1); }, 700);
      }} />
    </div>
  );
}

function DesignDevice({ onWin }: { onWin: () => void }) {
  const [briefIdx, setBriefIdx] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [spec, setSpec] = useState<{ label: string; choice: string; good: boolean }[]>([]);

  const reset = () => { setBriefIdx(null); setStep(0); setPicked(null); setScore(0); setSpec([]); };

  if (briefIdx === null) return (
    <div className="py-4">
      <h3 className="text-center font-display text-2xl font-bold">Design a Device</h3>
      <p className="mt-1 text-center text-muted-foreground">Pick a brief, then choose each part. Good engineering choices score points.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {DEVICE_BRIEFS.map((b, i) => (
          <button key={b.device} onClick={() => setBriefIdx(i)}
            className="rounded-3xl border border-border bg-card/60 p-5 text-left transition hover:-translate-y-1 hover:border-sky">
            <Cpu className="h-6 w-6 text-sky" />
            <h4 className="mt-3 font-display text-lg font-semibold">{b.device}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{b.goal}</p>
          </button>
        ))}
      </div>
    </div>
  );

  const brief = DEVICE_BRIEFS[briefIdx]!;
  const total = brief.steps.length;

  if (step >= total) return (
    <div className="py-4 animate-in fade-in zoom-in-95">
      <div className="text-center">
        <Trophy className="mx-auto h-12 w-12 text-peach-deep" />
        <p className="mt-3 font-display text-4xl font-bold">{score} / {total}</p>
        <p className="mt-1 text-muted-foreground">{score === total ? "A device an engineer would sign off!" : score >= total / 2 ? "Solid prototype — a few parts to rethink." : "Back to the drawing board!"}</p>
      </div>
      <div className="mx-auto mt-6 max-w-md rounded-3xl border border-border bg-muted/50 p-5">
        <p className="font-mono text-[11px] uppercase tracking-widest text-sky">Your {brief.device} spec sheet</p>
        <ul className="mt-3 space-y-2">
          {spec.map((s) => (
            <li key={s.label} className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted-foreground">{s.label}</span>
              <span className={`flex items-center gap-1.5 font-medium ${s.good ? "text-mint" : "text-destructive"}`}>
                {s.choice} {s.good ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex justify-center gap-3">
        <button onClick={() => { setStep(0); setPicked(null); setScore(0); setSpec([]); }} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
          <RotateCcw className="h-4 w-4" /> Rebuild it
        </button>
        <button onClick={reset} className="rounded-full border border-border px-5 py-2 text-sm font-semibold">New brief</button>
      </div>
    </div>
  );

  const s = brief.steps[step]!;
  return (
    <div key={`${briefIdx}-${step}`} className="animate-in fade-in slide-in-from-right-4">
      <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span>{brief.device} — part {step + 1} / {total}</span>
        <span className="text-sky">{s.label}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-sky transition-all" style={{ width: `${(step / total) * 100}%` }} />
      </div>
      <h3 className="mt-6 font-display text-xl font-semibold">{s.question}</h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {s.options.map((o, i) => {
          const state = picked === null ? "" : i === s.best ? "border-mint bg-mint/15" : i === picked ? "border-destructive bg-destructive/10" : "opacity-50";
          return (
            <button key={o.name} disabled={picked !== null} onClick={() => {
              setPicked(i);
              const good = i === s.best;
              if (good) setScore((n) => n + 1);
              setSpec((sp) => [...sp, { label: s.label, choice: o.name, good }]);
            }}
              className={`rounded-2xl border border-border px-4 py-3 text-left transition hover:border-sky ${state}`}>
              <p className="flex items-center justify-between font-medium">
                {o.name}
                {picked !== null && i === s.best && <Check className="h-4 w-4 text-mint" />}
                {picked === i && i !== s.best && <X className="h-4 w-4 text-destructive" />}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{o.note}</p>
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-muted/60 p-4 sm:flex-row sm:items-center sm:justify-between animate-in fade-in">
          <p className="text-sm">{s.why}</p>
          <button onClick={() => {
            if (step + 1 >= total) onWin();
            setPicked(null); setStep((n) => n + 1);
          }} className="shrink-0 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
            {step + 1 === total ? "See my device" : "Next part"}
          </button>
        </div>
      )}
    </div>
  );
}

function Steps({ kind, onWin }: { kind: "diagnosis" | "design"; onWin: () => void }) {
  const items = kind === "diagnosis" ? DIAGNOSIS_PUZZLES : DESIGN_MISSIONS;
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  useEffect(() => { setI(0); setScore(0); setPicked(null); }, [kind]);
  useEffect(() => { if (i >= items.length) onWin(); }, [i]); // eslint-disable-line react-hooks/exhaustive-deps

  if (i >= items.length) return <Result score={score} total={items.length} onAgain={() => { setI(0); setScore(0); setPicked(null); }} />;
  const item = items[i]!;
  const isDx = "patient" in item;
  const options = isDx ? item.options : item.options.map((o) => `${o.name} — ${o.note}`);
  return (
    <div key={`${kind}-${i}`} className="animate-in fade-in slide-in-from-right-4">
      <p className="font-mono text-xs text-muted-foreground">{isDx ? "Case" : "Mission"} {i + 1} / {items.length}</p>
      <h3 className="mt-2 font-display text-xl font-semibold">{isDx ? `Patient: ${item.patient}` : item.brief}</h3>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-lavender">{isDx ? "Clues" : "Needs"}</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {(isDx ? item.clues : item.needs).map((c) => <li key={c} className="rounded-full bg-muted px-3 py-1 text-sm">{c}</li>)}
      </ul>
      <Options options={options} answer={item.answer} picked={picked} onPick={(p) => { setPicked(p); if (p === item.answer) setScore((s) => s + 1); }} />
      {picked !== null && (
        <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-muted/60 p-4 sm:flex-row sm:items-center sm:justify-between animate-in fade-in">
          <p className="text-sm">{item.why}</p>
          <button onClick={() => { setPicked(null); setI((n) => n + 1); }} className="shrink-0 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
            {i + 1 === items.length ? "See score" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
