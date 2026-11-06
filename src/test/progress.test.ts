import { describe, expect, it } from "vitest";

import { levelFromXp } from "@/lib/progress";

describe("levelFromXp", () => {
  it("starts at level 1 with 0 XP", () => {
    expect(levelFromXp(0)).toEqual({ level: 1, into: 0, pct: 0, toNext: 500 });
  });
  it("levels up every 500 XP", () => {
    expect(levelFromXp(1240).level).toBe(3);
    expect(levelFromXp(1240).toNext).toBe(260);
  });
});
