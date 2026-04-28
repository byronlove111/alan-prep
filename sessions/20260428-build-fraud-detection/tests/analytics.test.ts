import { test, expect } from "../test-utils";
import { parseClaim, parseBatch, claimsByMember } from "../src/claims";
import { analyzeBatch } from "../src/analytics";
import { extractMonth } from "../src/utils";

console.log("\n📋 analytics.test.ts");

test("parseClaim: parses a valid line", () => {
  const c = parseClaim("CLM-001,M-001,C23,15/03/2026,25.00");
  expect(c.id).toBe("CLM-001");
  expect(c.memberId).toBe("M-001");
  expect(c.actCode).toBe("C23");
  expect(c.date).toBe("15/03/2026");
  expect(c.amount).toBe(25);
});

test("parseClaim: throws on unknown act code", () => {
  let threw = false;
  try { parseClaim("CLM-001,M-001,ZZZ,15/03/2026,25.00"); } catch { threw = true; }
  expect(threw).toBe(true);
});

test("parseBatch: returns one claim per line", () => {
  const result = parseBatch("CLM-001,M-001,C23,01/03/2026,25.00\nCLM-002,M-002,SPE7,10/03/2026,80.00");
  expect(result.length).toBe(2);
});

test("parseBatch: ignores blank lines", () => {
  const result = parseBatch("CLM-001,M-001,C23,01/03/2026,25.00\n\nCLM-002,M-002,SPE7,10/03/2026,80.00");
  expect(result.length).toBe(2);
});

test("claimsByMember: groups by memberId", () => {
  const claims = parseBatch(
    "CLM-001,M-001,C23,01/03/2026,25.00\nCLM-002,M-002,SPE7,05/03/2026,80.00\nCLM-003,M-001,MK50,10/03/2026,35.00"
  );
  const grouped = claimsByMember(claims);
  expect(grouped["M-001"].length).toBe(2);
  expect(grouped["M-002"].length).toBe(1);
});

test("extractMonth: returns YYYY-MM format", () => {
  expect(extractMonth("15/03/2026")).toBe("2026-03");
  expect(extractMonth("01/12/2025")).toBe("2025-12");
});

test("analyzeBatch: correct totalAmount and claimCount", () => {
  const result = analyzeBatch("CLM-001,M-001,C23,01/03/2026,25.00\nCLM-002,M-001,SPE7,10/03/2026,80.00");
  expect(result[0].totalAmount).toBe(105);
  expect(result[0].claimCount).toBe(2);
});

test("analyzeBatch: lastClaimDate is most recent (not lexicographic)", () => {
  const result = analyzeBatch("CLM-001,M-001,C23,20/01/2026,25.00\nCLM-002,M-001,SPE7,05/12/2025,80.00");
  expect(result[0].lastClaimDate).toBe("20/01/2026");
});

test("analyzeBatch: capExceeded true when total > 500", () => {
  const result = analyzeBatch("CLM-001,M-001,SPE7,01/03/2026,300.00\nCLM-002,M-001,SPE7,15/03/2026,250.00");
  expect(result[0].capExceeded).toBe(true);
});
