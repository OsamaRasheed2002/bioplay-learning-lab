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

// Everyone starts from zero: no XP, no badges, no finished topics.
export const STARTER_PROGRESS: Progress = {
  xp: 0,
  streak: 0,
  achievements: [],
  completedTopics: [],
  dailyAnsweredOn: null,
};

// v2: earlier builds seeded a fake starter profile, so old browsers start clean.
const KEY = "beplay.progress.v2";
export const LEGACY_KEY = "bioplay.progress.v2";
const EVENT = "beplay:progress";

export function levelFromXp(xp: number) {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const into = xp % XP_PER_LEVEL;
  return { level, into, pct: Math.round((into / XP_PER_LEVEL) * 100), toNext: XP_PER_LEVEL - into };
}

export function loadProgress(): Progress {
  try {
    let raw = window.localStorage.getItem(KEY);
    if (!raw) {
      // Carry over progress saved before the BioPlay → BEPlay rename.
      raw = window.localStorage.getItem(LEGACY_KEY);
      if (raw) window.localStorage.setItem(KEY, raw);
    }
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
    setProgress(loadProgress());
    const sync = () => setProgress(loadProgress());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback((fn: (p: Progress) => Progress) => {
    const next = fn(loadProgress());
    window.localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const reset = useCallback(() => {
    window.localStorage.removeItem(KEY);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { progress, update, reset };
}
