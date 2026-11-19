import anatomyImg from "@/assets/card-anatomy.jpg";
import signalsImg from "@/assets/card-signals.jpg";
import devicesImg from "@/assets/card-devices.jpg";
import conceptsImg from "@/assets/card-concepts.jpg";
import challengesImg from "@/assets/card-challenges.jpg";

export type ModuleTone = "mint" | "sky" | "lavender" | "peach";

export type LearningModule = {
  id: "anatomy" | "signals" | "devices" | "concepts" | "challenges";
  to: "/anatomy" | "/signals" | "/devices" | "/concepts" | "/challenges";
  title: string;
  kicker: string;
  description: string;
  image: string;
  tone: ModuleTone;
  lessons: number;
  minutes: number;
  topics: string[];
  /** Topics that already have a lesson page. */
  topicLinks?: Partial<Record<string, "/anatomy/cardiovascular" | "/anatomy/respiratory" | "/anatomy/skeletal" | "/anatomy/nervous" | "/anatomy/digestive" | "/anatomy/muscular" | "/anatomy/endocrine" | "/anatomy/integumentary" | "/anatomy/urinary" | "/anatomy/reproductive" | "/anatomy/planes" | "/devices/pacemakers" | "/devices/valves" | "/devices/stenosis" | "/concepts/biomechanics" | "/concepts/biomaterials" | "/concepts/bioinstrumentation" | "/concepts/tissue-engineering" | "/challenges/pulse-check" | "/challenges" | "/challenges/boss">>;
};

export const MODULES: LearningModule[] = [
  {
    id: "anatomy",
    to: "/anatomy",
    title: "Anatomy Explorer",
    kicker: "Systems & structures",
    description:
      "Rotate, zoom and dissect interactive organ systems to see how structure drives function.",
    image: anatomyImg,
    tone: "mint",
    lessons: 28,
    minutes: 230,
    topics: ["Cardiovascular system", "Respiratory system", "Nervous system", "Skeletal system", "Digestive system", "Muscular system", "Endocrine system", "Integumentary system", "Urinary system", "Reproductive system", "Anatomical planes"],
    topicLinks: { "Cardiovascular system": "/anatomy/cardiovascular", "Respiratory system": "/anatomy/respiratory", "Skeletal system": "/anatomy/skeletal", "Nervous system": "/anatomy/nervous", "Digestive system": "/anatomy/digestive", "Muscular system": "/anatomy/muscular", "Endocrine system": "/anatomy/endocrine", "Integumentary system": "/anatomy/integumentary", "Urinary system": "/anatomy/urinary", "Reproductive system": "/anatomy/reproductive", "Anatomical planes": "/anatomy/planes" },
  },
  {
    id: "signals",
    to: "/signals",
    title: "Biomedical Signals Lab",
    kicker: "ECG · EEG · EMG",
    description:
      "Record, filter and decode real physiological signals in a hands-on virtual lab bench.",
    image: signalsImg,
    tone: "sky",
    lessons: 0,
    minutes: 0,
    topics: ["ECG waveforms", "Noise & filtering", "Fourier analysis", "EEG rhythms"],
  },
  {
    id: "devices",
    to: "/devices",
    title: "Medical Devices",
    kicker: "From pacemakers to MRI",
    description:
      "Take apart the machines that keep us healthy and learn the engineering inside each one.",
    image: devicesImg,
    tone: "lavender",
    lessons: 5,
    minutes: 50,
    topics: ["Pacemakers", "Artificial valves", "Stenosis"],
    topicLinks: { Pacemakers: "/devices/pacemakers", "Artificial valves": "/devices/valves", Stenosis: "/devices/stenosis" },
  },
  {
    id: "concepts",
    to: "/concepts",
    title: "BME Concepts",
    kicker: "Core principles",
    description:
      "Biomechanics, biomaterials and transport phenomena — explained with visuals, not walls of text.",
    image: conceptsImg,
    tone: "peach",
    lessons: 4,
    minutes: 40,
    topics: ["Biomechanics", "Biomaterials", "Bioinstrumentation", "Tissue engineering"],
    topicLinks: { Biomechanics: "/concepts/biomechanics", Biomaterials: "/concepts/biomaterials", Bioinstrumentation: "/concepts/bioinstrumentation", "Tissue engineering": "/concepts/tissue-engineering" },
  },
  {
    id: "challenges",
    to: "/challenges",
    title: "Interactive Challenges",
    kicker: "Quizzes & puzzles",
    description:
      "Test yourself with timed quizzes, diagnosis puzzles and design missions that earn real XP.",
    image: challengesImg,
    tone: "mint",
    lessons: 6,
    minutes: 45,
    topics: ["Daily pulse check", "Boss quizzes"],
    topicLinks: { "Daily pulse check": "/challenges/pulse-check", "Boss quizzes": "/challenges/boss" },
  },
];

export const TONE_CLASSES: Record<
  ModuleTone,
  { bg: string; soft: string; text: string; ring: string; dot: string }
> = {
  mint: {
    bg: "bg-mint",
    soft: "bg-mint-soft",
    text: "text-mint-deep",
    ring: "hover:border-mint",
    dot: "bg-mint-deep",
  },
  sky: {
    bg: "bg-sky",
    soft: "bg-sky-soft",
    text: "text-sky-deep",
    ring: "hover:border-sky",
    dot: "bg-sky-deep",
  },
  lavender: {
    bg: "bg-lavender",
    soft: "bg-lavender-soft",
    text: "text-lavender-deep",
    ring: "hover:border-lavender",
    dot: "bg-lavender-deep",
  },
  peach: {
    bg: "bg-peach",
    soft: "bg-peach-soft",
    text: "text-peach-deep",
    ring: "hover:border-peach",
    dot: "bg-peach-deep",
  },
};

export function getModule(id: LearningModule["id"]) {
  const m = MODULES.find((x) => x.id === id);
  if (!m) throw new Error(`Unknown module ${id}`);
  return m;
}

/** Human-friendly lesson count and study time for a module. */
export function formatLessons(m: LearningModule) {
  return m.lessons === 0 ? "Coming soon" : `${m.lessons} ${m.lessons === 1 ? "lesson" : "lessons"}`;
}
export function formatMinutes(m: LearningModule) {
  if (m.minutes === 0) return "—";
  if (m.minutes < 60) return `~${m.minutes} min`;
  const h = Math.round((m.minutes / 60) * 2) / 2;
  return `~${h} ${h === 1 ? "hour" : "hours"}`;
}
