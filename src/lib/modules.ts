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
  topicLinks?: Partial<Record<string, "/anatomy/cardiovascular" | "/anatomy/respiratory" | "/anatomy/skeletal" | "/anatomy/nervous" | "/anatomy/digestive">>;
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
    lessons: 24,
    minutes: 180,
    topics: ["Cardiovascular system", "Respiratory system", "Nervous system", "Skeletal system", "Digestive system"],
    topicLinks: { "Cardiovascular system": "/anatomy/cardiovascular", "Respiratory system": "/anatomy/respiratory", "Skeletal system": "/anatomy/skeletal", "Nervous system": "/anatomy/nervous", "Digestive system": "/anatomy/digestive" },
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
    lessons: 18,
    minutes: 140,
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
    lessons: 16,
    minutes: 120,
    topics: ["Pacemakers", "Pulse oximetry", "Imaging systems", "Infusion pumps"],
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
    lessons: 20,
    minutes: 160,
    topics: ["Biomechanics", "Biomaterials", "Bioinstrumentation", "Tissue engineering"],
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
    lessons: 30,
    minutes: 90,
    topics: ["Daily pulse check", "Diagnose the signal", "Design a device", "Boss quizzes"],
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
