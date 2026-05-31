import path from "path";

import { resolveActCode } from "../src/actMatcher";
import { loadCareActs } from "../src/utils";
import { CareAct } from "../src/types";

const acts = loadCareActs(path.join(__dirname, "..", "data", "acts.json"));

describe("resolveActCode - target change", () => {
  it("matches a common alias", () => {
    expect(resolveActCode("consult", acts)).toBe("CONSULT_GP");
  });

  it("matches a hyphenated noisy label", () => {
    expect(resolveActCode("seance-de-kine", acts)).toBe("PHYSIO");
  });

  it("matches a label with extra spaces", () => {
    expect(resolveActCode("  Analyse   sanguine ", acts)).toBe("LAB_BLOOD");
  });

  it("matches an underscored alias", () => {
    expect(resolveActCode("prise_de_sang", acts)).toBe("LAB_BLOOD");
  });
});

// describe("resolveActCode - additional edge cases ", () => {
//   it("returns null when the acts array is empty", () => {
//     // ARRANGE
//     const acts: CareAct[] = [];
//     const input = "Consultation generale";

//     // ACT
//     const result = resolveActCode(input, acts);

//     // ASSERT
//     expect(result).toBeNull();
//   });

//   it("finds an act in a very large acts array", () => {
//     // ARRANGE
//     const size = 10000;
//     const targetIndex = size - 1;
//     const acts: CareAct[] = Array.from({ length: size }, (_, i) => ({
//       code: `CODE_${i}`,
//       label: `Label ${i}`,
//       aliases: [],
//     }));
//     const input = `Label ${targetIndex}`;

//     // ACT
//     const result = resolveActCode(input, acts);

//     // ASSERT
//     expect(result).toBe(`CODE_${targetIndex}`);
//   });

//   it("returns null for a nonexistent act even when the acts array is large", () => {
//     // ARRANGE
//     const acts: CareAct[] = Array.from({ length: 1000 }, (_, i) => ({
//       code: `C${i}`,
//       label: `L${i}`,
//       aliases: [],
//     }));
//     const input = "Label-Not-Found";

//     // ACT
//     const result = resolveActCode(input, acts);

//     // ASSERT
//     expect(result).toBeNull();
//   });

//   it("prefers the first matching label when duplicates exist", () => {
//     // ARRANGE
//     const acts: CareAct[] = [
//       { code: "FIRST", label: "Duplicate", aliases: [] },
//       { code: "SECOND", label: "Duplicate", aliases: [] },
//     ];
//     const input = "duplicate";

//     // ACT
//     const result = resolveActCode(input, acts);

//     // ASSERT
//     expect(result).toBe("FIRST");
//   });

//   it("returns null for empty input string when acts is non-empty", () => {
//     // ARRANGE
//     const acts: CareAct[] = [{ code: "X", label: "Some", aliases: [] }];
//     const input = "";

//     // ACT
//     const result = resolveActCode(input, acts);

//     // ASSERT
//     expect(result).toBeNull();
//   });
// });
