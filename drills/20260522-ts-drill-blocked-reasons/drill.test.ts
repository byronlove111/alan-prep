import {
  BlockedMovement,
  normalizeBlockedReason,
  topBlockedReasons,
} from "./drill";

const movements: BlockedMovement[] = [
  {
    movementId: "BM-001",
    source: "import",
    status: "blocked",
    rawReason: "SSN mismatch",
  },
  {
    movementId: "BM-002",
    source: "integration",
    status: "blocked",
    rawReason: "social-security number mismatch",
  },
  {
    movementId: "BM-003",
    source: "admin_invite",
    status: "resolved",
    rawReason: "duplicate employee account",
  },
  {
    movementId: "BM-004",
    source: "import",
    status: "blocked",
    rawReason: "employment start date issue",
  },
  {
    movementId: "BM-005",
    source: "import",
    status: "blocked",
    rawReason: "coverage end date mismatch",
  },
  {
    movementId: "BM-006",
    source: "integration",
    status: "blocked",
    rawReason: "first name typo",
  },
  {
    movementId: "BM-007",
    source: "import",
    status: "blocked",
    rawReason: "member already exists",
  },
  {
    movementId: "BM-008",
    source: "admin_invite",
    status: "blocked",
    rawReason: " National ID mismatch ",
  },
  {
    movementId: "BM-009",
    source: "integration",
    status: "blocked",
    rawReason: null,
  },
];

describe("normalizeBlockedReason", () => {
  test("normalizes identity mismatch synonyms", () => {
    expect(normalizeBlockedReason("SSN mismatch")).toBe("identity_mismatch");
    expect(normalizeBlockedReason("social-security number mismatch")).toBe(
      "identity_mismatch",
    );
    expect(normalizeBlockedReason(" National ID mismatch ")).toBe(
      "identity_mismatch",
    );
  });

  test("normalizes names, duplicates and contract dates", () => {
    expect(normalizeBlockedReason("first name typo")).toBe("name_mismatch");
    expect(normalizeBlockedReason("duplicate employee account")).toBe(
      "duplicate_member",
    );
    expect(normalizeBlockedReason("coverage end date mismatch")).toBe(
      "contract_dates",
    );
  });

  test("falls back to other for missing or unknown labels", () => {
    expect(normalizeBlockedReason("strange unmatched case")).toBe("other");
    expect(normalizeBlockedReason("")).toBe("other");
    expect(normalizeBlockedReason(undefined)).toBe("other");
    expect(normalizeBlockedReason(null)).toBe("other");
  });
});

describe("topBlockedReasons", () => {
  test("counts only unresolved blocked movements", () => {
    expect(topBlockedReasons(movements, 5)).toEqual([
      { reason: "identity_mismatch", count: 3 },
      { reason: "contract_dates", count: 2 },
      { reason: "duplicate_member", count: 1 },
      { reason: "name_mismatch", count: 1 },
      { reason: "other", count: 1 },
    ]);
  });

  test("sorts by count descending, then reason alphabetically", () => {
    const result = topBlockedReasons(
      [
        {
          movementId: "BM-010",
          source: "import",
          status: "blocked",
          rawReason: "member already exists",
        },
        {
          movementId: "BM-011",
          source: "integration",
          status: "blocked",
          rawReason: "first name typo",
        },
        {
          movementId: "BM-012",
          source: "admin_invite",
          status: "blocked",
          rawReason: "unmapped noise",
        },
      ],
      3,
    );

    expect(result).toEqual([
      { reason: "duplicate_member", count: 1 },
      { reason: "name_mismatch", count: 1 },
      { reason: "other", count: 1 },
    ]);
  });

  test("applies the limit and handles empty inputs", () => {
    expect(topBlockedReasons(movements, 2)).toEqual([
      { reason: "identity_mismatch", count: 3 },
      { reason: "contract_dates", count: 2 },
    ]);
    expect(topBlockedReasons([], 3)).toEqual([]);
    expect(topBlockedReasons(movements, 0)).toEqual([]);
  });
});
