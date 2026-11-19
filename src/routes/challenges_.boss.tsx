import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Flame, RotateCcw, Skull, Trophy, X } from "lucide-react";

import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/challenges_/boss")({
  head: () => ({
    meta: [
      { title: "Boss Quizzes — BEPlay" },
      { name: "description", content: "University-level biomedical engineering questions. Are you up to the challenge?" },
    ],
  }),
  component: BossQuizzes,
});

const BOSS_XP = 100;
const PASS = 0.7;

type Q = { q: string; options: string[]; answer: number; why: string };
const BOSSES: { id: string; name: string; tag: string; questions: Q[] }[] = [
  {
    id: "biomechanics", name: "The Biomechanics Boss", tag: "Stress, strain and moments",
    questions: [
      { q: "A cortical bone sample (A = 50 mm²) carries an axial load of 5 kN. What is the normal stress?", options: ["10 MPa", "100 MPa", "250 MPa", "1 GPa"], answer: 1, why: "σ = F/A = 5000 N / 50×10⁻⁶ m² = 100 MPa." },
      { q: "Cortical bone has E ≈ 17 GPa. What strain does a 34 MPa stress produce in the elastic region?", options: ["0.0002", "0.002", "0.02", "0.2"], answer: 1, why: "ε = σ/E = 34×10⁶ / 17×10⁹ = 0.002." },
      { q: "Why is bone described as anisotropic?", options: ["It creeps under load", "Its properties depend on loading direction", "It is stronger in tension than compression", "It has no yield point"], answer: 1, why: "Osteon alignment makes stiffness and strength direction-dependent." },
      { q: "Titanium (E ≈ 110 GPa) hip stems in bone (E ≈ 17 GPa) can cause bone loss mainly through…", options: ["Corrosion", "Stress shielding", "Fatigue of the stem", "Osseointegration"], answer: 1, why: "The stiffer implant carries the load, so bone is under-loaded and resorbs (Wolff's law)." },
      { q: "A 20 N weight is held 0.35 m from the elbow; the biceps inserts 0.04 m from it. Biceps force (ignoring arm weight)?", options: ["≈ 70 N", "≈ 175 N", "≈ 350 N", "≈ 700 N"], answer: 1, why: "F × 0.04 = 20 × 0.35 → F = 175 N. A third-class lever trades force for speed." },
      { q: "Viscoelastic tissues like cartilage show which behaviour under constant load?", options: ["Stress relaxation", "Creep", "Strain hardening", "Brittle fracture"], answer: 1, why: "Under constant stress, strain increases over time — creep." },
    ],
  },
  {
    id: "signals", name: "The Signals Boss", tag: "Instrumentation and signal processing",
    questions: [
      { q: "An ECG contains content up to 150 Hz. The minimum sampling rate to avoid aliasing is…", options: ["75 Hz", "150 Hz", "300 Hz", "1500 Hz"], answer: 2, why: "Nyquist: fs > 2 × fmax = 300 Hz." },
      { q: "Mains interference in ECG recordings in the UK appears at…", options: ["0.5 Hz", "50 Hz", "60 Hz", "250 Hz"], answer: 1, why: "UK mains is 50 Hz; a notch filter or high CMRR amplifier removes it." },
      { q: "Why do biopotential amplifiers need a high common-mode rejection ratio (CMRR)?", options: ["To boost the signal bandwidth", "To reject interference that appears equally on both electrodes", "To reduce electrode impedance", "To increase sampling rate"], answer: 1, why: "Noise like mains hum is common to both inputs; the differential amp rejects it." },
      { q: "Baseline wander in ECG (breathing, movement) is best removed with a…", options: ["Low-pass filter at 0.5 Hz", "High-pass filter at ~0.5 Hz", "Notch at 50 Hz", "Band-stop at 10–40 Hz"], answer: 1, why: "Baseline wander is very low frequency, so a ~0.5 Hz high-pass removes it." },
      { q: "An R–R interval of 0.75 s corresponds to a heart rate of…", options: ["60 bpm", "75 bpm", "80 bpm", "133 bpm"], answer: 2, why: "HR = 60 / 0.75 = 80 bpm." },
      { q: "Alpha EEG rhythms (relaxed, eyes closed) lie in which band?", options: ["0.5–4 Hz", "4–8 Hz", "8–13 Hz", "13–30 Hz"], answer: 2, why: "Alpha is 8–13 Hz; delta, theta and beta are the others." },
    ],
  },
  {
    id: "physiology", name: "The Physiology Boss", tag: "Cardiovascular and renal engineering",
    questions: [
      { q: "Stroke volume 70 mL, heart rate 72 bpm. Cardiac output?", options: ["≈ 2.5 L/min", "≈ 5.0 L/min", "≈ 7.2 L/min", "≈ 10 L/min"], answer: 1, why: "CO = SV × HR = 0.07 × 72 ≈ 5.0 L/min." },
      { q: "By Poiseuille's law, halving a vessel's radius increases its resistance by a factor of…", options: ["2", "4", "8", "16"], answer: 3, why: "R ∝ 1/r⁴, so (1/2)⁻⁴ = 16. This is why stenosis is so dangerous." },
      { q: "Mean arterial pressure for BP 120/80 mmHg is approximately…", options: ["93 mmHg", "100 mmHg", "107 mmHg", "120 mmHg"], answer: 0, why: "MAP ≈ DBP + (SBP − DBP)/3 = 80 + 13 ≈ 93 mmHg." },
      { q: "In haemodialysis, urea leaves the blood mainly by…", options: ["Active transport", "Diffusion down a concentration gradient", "Osmosis of urea", "Filtration by the glomerulus"], answer: 1, why: "Counter-current dialysate keeps a gradient so urea diffuses across the membrane." },
      { q: "A normal adult glomerular filtration rate is roughly…", options: ["12 mL/min", "45 mL/min", "125 mL/min", "600 mL/min"], answer: 2, why: "GFR ≈ 125 mL/min (~180 L/day)." },
      { q: "The SA node sets heart rate because it…", options: ["Has the largest cells", "Has the fastest spontaneous depolarisation", "Is closest to the ventricles", "Is innervated only by the vagus"], answer: 1, why: "It reaches threshold first, so it paces the rest of the heart." },
    ],
  },
];

function BossQuizzes() {
  const { progress, update } = useProgress();
  const [bossIdx, setBossIdx] = useState<number | null>(null);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const beaten = (id: string) => progress.completedTopics.includes(`boss:${id}`);
  const reset = () => { setI(0); setPicked(null); setScore(0); };

  const boss = bossIdx === null ? null : BOSSES[bossIdx]!;
  const finished = boss && i >= boss.questions.length;
  const won = boss && finished && score / boss.questions.length >= PASS;

  const next = () => {
    if (!boss) return;
    const n = i + 1;
    setPicked(null); setI(n);
    if (n >= boss.questions.length && score / boss.questions.length >= PASS) {
      const key = `boss:${boss.id}`;
      update((p) => (p.completedTopics.includes(key) ? p : { ...p, xp: p.xp + BOSS_XP, completedTopics: [...p.completedTopics, key] }));
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <Link to="/challenges" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Challenges</Link>

      {!boss && (
        <>
          <div className="mt-6 rounded-3xl border border-peach/40 bg-card p-8 text-center shadow-sm">
            <Skull className="mx-auto h-12 w-12 text-peach-deep" />
            <h1 className="mt-4 font-display text-4xl font-bold">Boss Quizzes</h1>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              These aren't warm-ups. Every question is pitched at university level — calculations, equations and the kind of thinking your exams expect. Score {Math.round(PASS * 100)}% or more to defeat a boss.
            </p>
            <p className="mt-4 font-display text-xl font-semibold text-peach-deep">Think you're up to the challenge?</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {BOSSES.map((b, n) => (
              <button key={b.id} onClick={() => { setBossIdx(n); reset(); }}
                className="rounded-3xl border border-border bg-card/60 p-5 text-left transition hover:-translate-y-1 hover:border-peach">
                <div className="flex items-center justify-between">
                  <Flame className="h-6 w-6 text-peach-deep" />
                  {beaten(b.id) && <span className="rounded-full bg-mint/20 px-2 py-0.5 font-mono text-[10px] text-mint">DEFEATED</span>}
                </div>
                <h2 className="mt-3 font-display text-lg font-semibold">{b.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{b.tag} · {b.questions.length} questions · +{BOSS_XP} XP</p>
              </button>
            ))}
          </div>
        </>
      )}

      {boss && !finished && (() => {
        const q = boss.questions[i]!;
        return (
          <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
              <span>{boss.name}</span><span>Q{i + 1}/{boss.questions.length} · Score {score}</span>
            </div>
            <h2 className="mt-4 font-display text-xl font-semibold">{q.q}</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {q.options.map((o, n) => {
                const state = picked === null ? "" : n === q.answer ? "border-mint bg-mint/15" : n === picked ? "border-destructive bg-destructive/10" : "opacity-60";
                return (
                  <button key={o} disabled={picked !== null} onClick={() => { setPicked(n); if (n === q.answer) setScore((s) => s + 1); }}
                    className={`flex items-center justify-between rounded-2xl border border-border p-4 text-left transition ${state}`}>
                    <span>{o}</span>
                    {picked !== null && n === q.answer && <Check className="h-4 w-4 text-mint" />}
                    {picked === n && n !== q.answer && <X className="h-4 w-4 text-destructive" />}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <div className="mt-5 rounded-2xl bg-muted/50 p-4 text-sm">
                <p>{q.why}</p>
                <button onClick={next} className="mt-3 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
                  {i + 1 < boss.questions.length ? "Next question" : "See result"}
                </button>
              </div>
            )}
          </div>
        );
      })()}

      {boss && finished && (
        <div className="mt-6 rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
          <Trophy className={`mx-auto h-12 w-12 ${won ? "text-peach-deep" : "text-muted-foreground"}`} />
          <p className="mt-3 font-display text-4xl font-bold">{score} / {boss.questions.length}</p>
          <p className="mt-2 text-muted-foreground">{won ? `Boss defeated! ${beaten(boss.id) ? `+${BOSS_XP} XP earned.` : ""}` : `Not quite — you need ${Math.ceil(PASS * boss.questions.length)} to win. Up for another go?`}</p>
          <div className="mt-5 flex justify-center gap-3">
            <button onClick={reset} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"><RotateCcw className="h-4 w-4" /> Fight again</button>
            <button onClick={() => setBossIdx(null)} className="rounded-full border border-border px-5 py-2 text-sm font-semibold">All bosses</button>
          </div>
        </div>
      )}
    </main>
  );
}
