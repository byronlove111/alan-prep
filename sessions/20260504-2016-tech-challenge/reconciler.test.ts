import { test, expect } from "./test-runner";
import {
  reconcileBatch,
  getMemberReport,
  getMembersWithDiscrepancies,
  SubmittedClaim,
  NoemieReturn,
} from "./reconciler";

// ─── Fixtures ────────────────────────────────────────────────────────────────

const claims: SubmittedClaim[] = [
  { claimId: "C001", memberId: "M1", actCategory: "consultation", actDate: "10/03/2025", submittedAmount: 25 },
  { claimId: "C002", memberId: "M1", actCategory: "pharmacy",     actDate: "05/03/2025", submittedAmount: 18 },
  { claimId: "C003", memberId: "M2", actCategory: "specialist",   actDate: "12/03/2025", submittedAmount: 60 },
  { claimId: "C004", memberId: "M2", actCategory: "lab",          actDate: "01/03/2025", submittedAmount: 40 },
  { claimId: "C005", memberId: "M3", actCategory: "dental",       actDate: "20/03/2025", submittedAmount: 120 },
];

const returns: NoemieReturn[] = [
  { claimId: "C001", paidAmount: 25,  rejectionCode: null },        // ok
  { claimId: "C002", paidAmount: 12,  rejectionCode: null },        // amount_mismatch
  { claimId: "C003", paidAmount: 60,  rejectionCode: "R001" },      // known rejection → ok (paidAmount becomes 0, but delta = -60)
  { claimId: "C004", paidAmount: 40,  rejectionCode: "RXXX" },      // unexpected_rejection
  { claimId: "C005", paidAmount: 150, rejectionCode: null },        // overpayment
];

// ─── reconcileBatch ───────────────────────────────────────────────────────────

test("reconcileBatch — correct totalClaims", () => {
  const report = reconcileBatch(claims, returns);
  expect(report.totalClaims).toBe(5);
});

test("reconcileBatch — totalSubmitted is sum of all submitted amounts", () => {
  const report = reconcileBatch(claims, returns);
  expect(report.totalSubmitted).toBe(25 + 18 + 60 + 40 + 120); // 263
});

test("reconcileBatch — C001 is ok with delta 0", () => {
  const report = reconcileBatch(claims, returns);
  const r = report.results.find((x) => x.claimId === "C001")!;
  expect(r.discrepancy).toBe("ok");
  expect(r.delta).toBe(0);
});

test("reconcileBatch — C002 is amount_mismatch with delta -6", () => {
  const report = reconcileBatch(claims, returns);
  const r = report.results.find((x) => x.claimId === "C002")!;
  expect(r.discrepancy).toBe("amount_mismatch");
  expect(r.delta).toBe(-6);
});

test("reconcileBatch — C004 is unexpected_rejection", () => {
  const report = reconcileBatch(claims, returns);
  const r = report.results.find((x) => x.claimId === "C004")!;
  expect(r.discrepancy).toBe("unexpected_rejection");
});

test("reconcileBatch — C005 is overpayment with delta +30", () => {
  const report = reconcileBatch(claims, returns);
  const r = report.results.find((x) => x.claimId === "C005")!;
  expect(r.discrepancy).toBe("overpayment");
  expect(r.delta).toBe(30);
});

// ─── getMemberReport ─────────────────────────────────────────────────────────

test("getMemberReport — returns only M1 results", () => {
  const report = reconcileBatch(claims, returns);
  const m1 = getMemberReport(report, "M1");
  expect(m1.length).toBe(2);
  expect(m1.every((r) => r.memberId === "M1")).toBe(true);
});

test("getMemberReport — M1 results sorted by actDate ascending", () => {
  const report = reconcileBatch(claims, returns);
  const m1 = getMemberReport(report, "M1");
  // C002 is 05/03/2025, C001 is 10/03/2025 → C002 first
  expect(m1[0].claimId).toBe("C002");
  expect(m1[1].claimId).toBe("C001");
});

// ─── getMembersWithDiscrepancies ─────────────────────────────────────────────

test("getMembersWithDiscrepancies — M3 has 1 discrepancy (overpayment)", () => {
  const report = reconcileBatch(claims, returns);
  const discrepant = getMembersWithDiscrepancies(report);
  const m3 = discrepant.find((x) => x.memberId === "M3");
  expect(m3?.discrepancyCount).toBe(1);
});

test("getMembersWithDiscrepancies — sorted by discrepancyCount descending", () => {
  const report = reconcileBatch(claims, returns);
  const discrepant = getMembersWithDiscrepancies(report);
  // M1 has 1 (amount_mismatch), M2 has 1 (unexpected_rejection), M3 has 1 (overpayment)
  // all equal — but M1 should not appear twice
  expect(discrepant.length).toBe(3);
  for (let i = 0; i < discrepant.length - 1; i++) {
    expect(discrepant[i].discrepancyCount >= discrepant[i + 1].discrepancyCount).toBe(true);
  }
});
