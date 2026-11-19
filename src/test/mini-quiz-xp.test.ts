import { describe, expect, it } from "vitest";

import { XP_PER_CORRECT, awardMiniQuizAnswer, miniQuizXpEarned } from "@/data/miniQuizzes";
import { STARTER_PROGRESS, type Progress } from "@/lib/progress";

const clean = (over: Partial<Progress> = {}): Progress => ({ ...STARTER_PROGRESS, ...over });

describe("mini quiz XP", () => {
  it("pays 5 XP for one correct answer", () => {
    const p = awardMiniQuizAnswer(clean(), { id: "skeletal", week: 3, qi: 0, correct: true });
    expect(XP_PER_CORRECT).toBe(5);
    expect(p.xp).toBe(5);
  });

  it("pays nothing for a wrong answer", () => {
    const p = awardMiniQuizAnswer(clean(), { id: "skeletal", week: 3, qi: 0, correct: false });
    expect(p.xp).toBe(0);
    expect(miniQuizXpEarned(p, "skeletal", 3, 3)).toBe(0);
  });

  it("pays all three correct answers: 15 XP", () => {
    let p = clean();
    for (const qi of [0, 1, 2]) p = awardMiniQuizAnswer(p, { id: "skeletal", week: 3, qi, correct: true });
    expect(p.xp).toBe(15);
    expect(miniQuizXpEarned(p, "skeletal", 3, 3)).toBe(15);
  });

  it("pays 10 XP for two right and one wrong", () => {
    let p = clean();
    p = awardMiniQuizAnswer(p, { id: "nervous", week: 3, qi: 0, correct: true });
    p = awardMiniQuizAnswer(p, { id: "nervous", week: 3, qi: 1, correct: false });
    p = awardMiniQuizAnswer(p, { id: "nervous", week: 3, qi: 2, correct: true });
    expect(p.xp).toBe(10);
    expect(miniQuizXpEarned(p, "nervous", 3, 3)).toBe(10);
  });

  it("never pays the same question twice", () => {
    const once = awardMiniQuizAnswer(clean(), { id: "skeletal", week: 3, qi: 1, correct: true });
    const twice = awardMiniQuizAnswer(once, { id: "skeletal", week: 3, qi: 1, correct: true });
    expect(twice.xp).toBe(5);
    expect(twice.completedTopics).toEqual(once.completedTopics);
  });

  it("does not pay a wrong-then-right retry of the same question", () => {
    let p = awardMiniQuizAnswer(clean(), { id: "skeletal", week: 3, qi: 2, correct: false });
    p = awardMiniQuizAnswer(p, { id: "skeletal", week: 3, qi: 2, correct: true });
    expect(p.xp).toBe(0);
  });

  it("pays again when a new week's questions appear", () => {
    const thisWeek = awardMiniQuizAnswer(clean(), { id: "skeletal", week: 3, qi: 0, correct: true });
    const nextWeek = awardMiniQuizAnswer(thisWeek, { id: "skeletal", week: 4, qi: 0, correct: true });
    expect(nextWeek.xp).toBe(10);
  });

  it("does not double-pay a learner already given the old flat 15 XP", () => {
    const old = clean({ xp: 15, completedTopics: ["quiz:skeletal:w3"] });
    const p = awardMiniQuizAnswer(old, { id: "skeletal", week: 3, qi: 0, correct: true });
    expect(p.xp).toBe(15);
  });
});
