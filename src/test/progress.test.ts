import { describe, expect, it } from "vitest";

import {
  ACHIEVEMENTS,
  STARTER_PROGRESS,
  levelFromXp,
  loadProgress,
} from "@/lib/progress";

describe("levelFromXp", () => {
  it("starts at level 1 with 0 XP", () => {
    expect(levelFromXp(0)).toEqual({ level: 1, into: 0, pct: 0, toNext: 500 });
  });
  it("levels up every 500 XP", () => {
    expect(levelFromXp(1240).level).toBe(3);
    expect(levelFromXp(1240).toNext).toBe(260);
  });
});

describe("starting progress", () => {
  it("gives every new visitor 0 XP, no achievements and no completed topics", () => {
    expect(STARTER_PROGRESS).toEqual({
      xp: 0,
      streak: 0,
      achievements: [],
      completedTopics: [],
      dailyAnsweredOn: null,
    });
  });

  it("loads a blank profile when nothing is stored yet", () => {
    window.localStorage.clear();
    const loaded = loadProgress();
    expect(loaded.xp).toBe(0);
    expect(loaded.achievements).toEqual([]);
    expect(loaded.completedTopics).toEqual([]);
  });

  it("keeps every achievement locked for a brand-new visitor", () => {
    expect(STARTER_PROGRESS.achievements).toHaveLength(0);
    expect(ACHIEVEMENTS.length).toBeGreaterThan(0);
  });
});
