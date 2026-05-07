import { test, expect } from "./test-runner";
import { checkEligibility, Contract, PastClaim } from "./eligibility";

// ─── Fixtures ────────────────────────────────────────────────────────────────

const contracts: Contract[] = [
  { memberId: "M1", plan: "premium",      status: "active" },
  { memberId: "M2", plan: "basic",        status: "active" },
  { memberId: "M3", plan: "premium_plus", status: "suspended" },
];

// ─── Rule 1 — active contract ─────────────────────────────────────────────────

test("eligible — active contract, covered act, no past claim", () => {
  const result = checkEligibility(
    { memberId: "M1", actCategory: "consultation", requestedAt: "10/05/2025" },
    contracts,
    []
  );
  expect(result.eligible).toBe(true);
  expect(result.rejectionReason).toBe(null);
});

test("rejected — no contract found", () => {
  const result = checkEligibility(
    { memberId: "M99", actCategory: "consultation", requestedAt: "10/05/2025" },
    contracts,
    []
  );
  expect(result.eligible).toBe(false);
  expect(result.rejectionReason).toBe("no_active_contract");
});

test("rejected — contract is suspended", () => {
  const result = checkEligibility(
    { memberId: "M3", actCategory: "consultation", requestedAt: "10/05/2025" },
    contracts,
    []
  );
  expect(result.eligible).toBe(false);
  expect(result.rejectionReason).toBe("no_active_contract");
});

// ─── Rule 2 — act coverage ────────────────────────────────────────────────────

test("rejected — act not covered by basic plan", () => {
  const result = checkEligibility(
    { memberId: "M2", actCategory: "dental", requestedAt: "10/05/2025" },
    contracts,
    []
  );
  expect(result.eligible).toBe(false);
  expect(result.rejectionReason).toBe("act_not_covered");
});

test("eligible — dental covered by premium plan", () => {
  const result = checkEligibility(
    { memberId: "M1", actCategory: "dental", requestedAt: "10/05/2025" },
    contracts,
    []
  );
  expect(result.eligible).toBe(true);
});

// ─── Rule 3 — duplicate within 30 days ───────────────────────────────────────

test("rejected — same act submitted 10 days ago (same month)", () => {
  const pastClaims: PastClaim[] = [
    { memberId: "M1", actCategory: "consultation", submittedAt: "01/05/2025" },
  ];
  const result = checkEligibility(
    { memberId: "M1", actCategory: "consultation", requestedAt: "10/05/2025" },
    contracts,
    pastClaims
  );
  expect(result.eligible).toBe(false);
  expect(result.rejectionReason).toBe("duplicate_within_30_days");
});

test("rejected — same act submitted 30 days ago (same month)", () => {
  const pastClaims: PastClaim[] = [
    { memberId: "M1", actCategory: "consultation", submittedAt: "01/05/2025" },
  ];
  const result = checkEligibility(
    { memberId: "M1", actCategory: "consultation", requestedAt: "31/05/2025" },
    contracts,
    pastClaims
  );
  expect(result.eligible).toBe(false);
  expect(result.rejectionReason).toBe("duplicate_within_30_days");
});


test("rejected — same act submitted 31 days ago (same month)", () => {
  const pastClaims: PastClaim[] = [
    { memberId: "M1", actCategory: "consultation", submittedAt: "01/05/2025" },
  ];
  const result = checkEligibility(
    { memberId: "M1", actCategory: "consultation", requestedAt: "01/06/2025" },
    contracts,
    pastClaims
  );
  expect(result.eligible).toBe(true);
});

test("eligible — same act submitted 40 days ago", () => {
  const pastClaims: PastClaim[] = [
    { memberId: "M1", actCategory: "consultation", submittedAt: "01/03/2025" },
  ];
  const result = checkEligibility(
    { memberId: "M1", actCategory: "consultation", requestedAt: "10/04/2025" },
    contracts,
    pastClaims
  );
  expect(result.eligible).toBe(true);
});
