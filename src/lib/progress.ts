import { useCallback, useEffect, useState } from "react";

export const XP_PER_LEVEL = 500;

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: "heart" | "brain" | "zap" | "flame" | "trophy" | "activity";
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-beat", title: "First Heartbeat", description: "Completed your first lesson", icon: "heart" },
  { id: "signal-sleuth", title: "Signal Sleuth", description: "Identified 5 ECG rhythms", icon: "activity" },
  { id: "streak-3", title: "On a Roll", description: "3-day learning streak", icon: "flame" },
  { id: "pulse-check", title: "Pulse Check", description: "Answered a daily challenge", icon: "zap" },
  { id: "neuro-ninja", title: "Neuro Ninja", description: "Finish the nervous system path", icon: "brain" },
  { id: "device-master", title: "Device Master", description: "Complete all device teardowns", icon: "trophy" },
];

export type Progress = {
  xp: number;
  streak: number;
  achievements: string[];
  completedTopics: string[];
  dailyAnsweredOn: string | null;
};

// Starter profile so the dashboard has something to show before real lessons exist.
export const STARTER_PROGRESS: Progress = {
  xp: 1240,
  streak: 3,
  achievements: ["first-beat", "signal-sleuth", "streak-3"],
  completedTopics: ["Cardiovascular system", "ECG waveforms", "Pacemakers", "Biomechanics"],
  dailyAnsweredOn: null,
};

const KEY = "bioplay.progress.v1";
const EVENT = "bioplay:progress";

export function levelFromXp(xp: number) {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const into = xp % XP_PER_LEVEL;
  return { level, into, pct: Math.round((into / XP_PER_LEVEL) * 100), toNext: XP_PER_LEVEL - into };
}

function read(): Progress {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return STARTER_PROGRESS;
    return { ...STARTER_PROGRESS, ...(JSON.parse(raw) as Partial<Progress>) };
  } catch {
    return STARTER_PROGRESS;
  }
}

export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(STARTER_PROGRESS);

  useEffect(() => {
    setProgress(read());
    const sync = () => setProgress(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback((fn: (p: Progress) => Progress) => {
    const next = fn(read());
    window.localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const reset = useCallback(() => {
    window.localStorage.removeItem(KEY);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { progress, update, reset };
}
