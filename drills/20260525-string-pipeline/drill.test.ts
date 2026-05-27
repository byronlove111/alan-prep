import {
  countKeywordOccurrences,
  extractKeywords,
  normalizeCareNote,
  rankTopKeywords,
} from "./drill";

describe("normalizeCareNote", () => {
  test("cleans casing, separators, and extra spaces", () => {
    expect(normalizeCareNote("  Missing-RIB  follow   up ")).toBe(
      "missing rib follow up",
    );
  });

  test("returns an empty string for empty input", () => {
    expect(normalizeCareNote("")).toBe("");
  });
});

describe("extractKeywords", () => {
  test("splits comma-separated keywords and removes empty entries", () => {
    expect(
      extractKeywords(" duplicate , Missing RIB, , manual review "),
    ).toEqual(["duplicate", "missing rib", "manual review"]);
  });

  test("returns an empty array for empty input", () => {
    expect(extractKeywords("")).toEqual([]);
  });
});

describe("countKeywordOccurrences", () => {
  test("counts normalized keywords across multiple lines", () => {
    expect(
      countKeywordOccurrences([
        " duplicate , missing rib ",
        "Manual review, duplicate",
      ]),
    ).toEqual({
      duplicate: 2,
      "missing rib": 1,
      "manual review": 1,
    });
  });

  test("returns an empty object when there are no lines", () => {
    expect(countKeywordOccurrences([])).toEqual({});
  });
});

describe("rankTopKeywords", () => {
  test("returns the ranked keyword counts", () => {
    expect(
      rankTopKeywords(
        [
          " duplicate , missing rib ",
          "Manual review, duplicate",
          "missing rib",
        ],
        3,
      ),
    ).toEqual([
      { keyword: "duplicate", count: 2 },
      { keyword: "missing rib", count: 2 },
      { keyword: "manual review", count: 1 },
    ]);
  });

  test("applies a limit when provided", () => {
    expect(
      rankTopKeywords(
        [
          " duplicate , missing rib ",
          "Manual review, duplicate",
          "missing rib",
        ],
        2,
      ),
    ).toEqual([
      { keyword: "duplicate", count: 2 },
      { keyword: "missing rib", count: 2 },
    ]);
  });

  test("returns an empty array when there are no lines", () => {
    expect(rankTopKeywords([], 3)).toEqual([]);
  });
});
