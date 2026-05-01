import { test, expect } from "./test-runner";
import { groupByCoverage, countByCoverage, daysBetween, daysUntilExpiry, Contract } from "./drill";

const contracts: Contract[] = [
  { id: "CTR-001", memberId: "M-001", coverage: "premium", startDate: "2025-05-01", endDate: "2026-05-08" },
  { id: "CTR-002", memberId: "M-002", coverage: "basic", startDate: "2025-06-01", endDate: "2026-05-21" },
  { id: "CTR-003", memberId: "M-003", coverage: "basic", startDate: "2025-01-01", endDate: "2026-08-01" },
  { id: "CTR-004", memberId: "M-004", coverage: "standard", startDate: "2025-03-01", endDate: "2026-05-01" },
  { id: "CTR-005", memberId: "M-005", coverage: "premium", startDate: "2025-04-01", endDate: "2025-12-01" },
];

// --- groupByCoverage ---

test("groupByCoverage: groups contracts by coverage level", () => {
  const result = groupByCoverage(contracts);
  expect(result["premium"].length).toBe(2);
  expect(result["basic"].length).toBe(2);
  expect(result["standard"].length).toBe(1);
});

test("groupByCoverage: each group contains the right contracts", () => {
  const result = groupByCoverage(contracts);
  expect(result["standard"][0].id).toBe("CTR-004");
});

test("groupByCoverage: returns empty object for empty input", () => {
  const result = groupByCoverage([]);
  expect(JSON.stringify(result)).toBe("{}");
});

// --- countByCoverage ---

test("countByCoverage: counts contracts per coverage level", () => {
  const grouped = groupByCoverage(contracts);
  const result = countByCoverage(grouped);
  expect(result["premium"]).toBe(2);
  expect(result["basic"]).toBe(2);
  expect(result["standard"]).toBe(1);
});

// --- daysBetween ---

test("daysBetween: returns positive number when dateB is after dateA", () => {
  expect(daysBetween("2026-05-01", "2026-05-15")).toBe(14);
});

test("daysBetween: returns 0 when dates are equal", () => {
  expect(daysBetween("2026-05-01", "2026-05-01")).toBe(0);
});

test("daysBetween: returns negative number when dateB is before dateA", () => {
  expect(daysBetween("2026-05-15", "2026-05-01")).toBe(-14);
});

// --- daysUntilExpiry ---

test("daysUntilExpiry: returns days remaining for active contracts", () => {
  const result = daysUntilExpiry(contracts, "2026-05-01");
  expect(result["CTR-001"]).toBe(7);   // ends 2026-05-08
  expect(result["CTR-002"]).toBe(20);  // ends 2026-05-21
  expect(result["CTR-003"]).toBe(92);  // ends 2026-08-01
});

test("daysUntilExpiry: excludes already expired contracts", () => {
  const result = daysUntilExpiry(contracts, "2026-05-01");
  expect(result["CTR-005"] === undefined).toBe(true); // ended 2025-12-01
});

test("daysUntilExpiry: excludes contract expiring exactly on reference date", () => {
  const result = daysUntilExpiry(contracts, "2026-05-01");
  expect(result["CTR-004"] === undefined).toBe(true); // ends exactly 2026-05-01 → 0 days → excluded
});
