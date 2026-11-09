import { describe, expect, it } from "vitest";
import { MAJOR_ARTERIES, MAJOR_VEINS } from "@/data/cardio";

// Osama wants only the main vessels listed on the Arteries and Veins pages.
describe("major vessel lists", () => {
  it("keeps at most 5 examples in each list", () => {
    expect(MAJOR_ARTERIES.length).toBeLessThanOrEqual(5);
    expect(MAJOR_VEINS.length).toBeLessThanOrEqual(5);
  });

  it("keeps the headline arteries", () => {
    const names = MAJOR_ARTERIES.map((a) => a.name);
    expect(names).toContain("Aorta");
    expect(names).toContain("Coronary arteries");
    expect(names).toContain("Carotid arteries");
    expect(names).toContain("Femoral artery");
    expect(names).toContain("Pulmonary artery");
  });

  it("keeps the headline veins", () => {
    const names = MAJOR_VEINS.map((v) => v.name);
    expect(names).toContain("Superior vena cava");
    expect(names).toContain("Inferior vena cava");
    expect(names).toContain("Jugular veins");
    expect(names).toContain("Femoral vein");
    expect(names).toContain("Pulmonary veins");
  });

  it("drops the minor examples", () => {
    const arteryNames = MAJOR_ARTERIES.map((a) => a.name);
    const veinNames = MAJOR_VEINS.map((v) => v.name);
    for (const gone of ["Radial artery", "Brachial artery", "Renal arteries", "Subclavian arteries"]) {
      expect(arteryNames).not.toContain(gone);
    }
    for (const gone of [
      "Great saphenous vein",
      "Hepatic portal vein",
      "Renal veins",
      "Subclavian vein",
      "Cephalic, basilic & median cubital veins",
    ]) {
      expect(veinNames).not.toContain(gone);
    }
  });
});
