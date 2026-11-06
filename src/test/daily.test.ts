import { describe, expect, it } from "vitest";

import { DAILY_QUESTIONS, daysSinceStart, questionIndexFor } from "@/data/dailyQuestions";
import { STARTER_PROGRESS, answerDaily, currentStreak } from "@/lib/progress";

const day = (y: number, m: number, d: number, h = 12) => new Date(y, m - 1, d, h);

describe("daily question rotation", () => {
  it("has 30 questions with 4 options each", () => {
    expect(DAILY_QUESTIONS).toHaveLength(30);
    for (const q of DAILY_QUESTIONS) expect(q.options).toHaveLength(4);
  });
  it("6 Nov 2025 is day 0 and the index wraps every 30 days", () => {
    expect(daysSinceStart(day(2025, 11, 6))).toBe(0);
    expect(questionIndexFor(day(2025, 11, 6))).toBe(0);
    expect(questionIndexFor(day(2025, 12, 6))).toBe(0);
    expect(questionIndexFor(day(2025, 11, 7))).toBe(1);
  });
  it("changes at local midnight", () => {
    expect(questionIndexFor(day(2025, 11, 7, 23))).toBe(1);
    expect(questionIndexFor(day(2025, 11, 8, 0))).toBe(2);
  });
});

describe("daily answer rewards", () => {
  it("gives +20 XP only once per day", () => {
    const a = answerDaily(STARTER_PROGRESS, 1, day(2026, 1, 1));
    const b = answerDaily(a, 2, day(2026, 1, 1, 18));
    expect(a.xp).toBe(20);
    expect(b.xp).toBe(20);
    expect(b.dailyChoice).toBe(1);
  });
  it("grows the streak on consecutive days", () => {
    const a = answerDaily(STARTER_PROGRESS, 0, day(2026, 1, 1));
    const b = answerDaily(a, 0, day(2026, 1, 2));
    expect(b.streak).toBe(2);
  });
  it("resets the streak to 0 after a missed day", () => {
    const a = answerDaily(answerDaily(STARTER_PROGRESS, 0, day(2026, 1, 1)), 0, day(2026, 1, 2));
    expect(currentStreak(a, day(2026, 1, 4))).toBe(0);
    expect(answerDaily(a, 0, day(2026, 1, 4)).streak).toBe(1);
  });
});
