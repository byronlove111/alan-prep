import { test, expect } from "../test-utils";
import { Claim } from "../src/types";

console.log("\n📋 fraud.test.ts");

let flagSuspicious: ((claims: Claim[]) => any) | null = null;
try {
  flagSuspicious = require("../src/fraud").flagSuspicious;
} catch {
  // src/fraud.ts doesn't exist yet
}

function impl(): (claims: Claim[]) => any {
  if (!flagSuspicious)
    throw new Error("src/fraud.ts not found — create it and export flagSuspicious");
  return flagSuspicious;
}

test("returns empty array when no suspicious activity", () => {
  const fn = impl();
  const claims: Claim[] = [
    { id: "C1", memberId: "M-001", actCode: "C23", date: "15/03/2026", amount: 25 },
  ];
  expect(fn(claims)).toEqual([]);
});

test("flags duplicate act on the same day", () => {
  const fn = impl();
  const claims: Claim[] = [
    { id: "C1", memberId: "M-001", actCode: "C23", date: "15/03/2026", amount: 25 },
    { id: "C2", memberId: "M-001", actCode: "C23", date: "15/03/2026", amount: 25 },
  ];
  const flags = fn(claims);
  expect(flags.length).toBe(1);
  expect(flags[0].memberId).toBe("M-001");
  expect(flags[0].reasons).toContain("duplicate_act_same_day");
});

test("does NOT flag same act code on different days", () => {
  const fn = impl();
  const claims: Claim[] = [
    { id: "C1", memberId: "M-001", actCode: "C23", date: "01/03/2026", amount: 25 },
    { id: "C2", memberId: "M-001", actCode: "C23", date: "02/03/2026", amount: 25 },
  ];
  expect(fn(claims)).toEqual([]);
});

test("flags amount above threshold (> 200€)", () => {
  const fn = impl();
  const claims: Claim[] = [
    { id: "C1", memberId: "M-003", actCode: "SPE7", date: "10/04/2026", amount: 250 },
  ];
  const flags = fn(claims);
  expect(flags.length).toBe(1);
  expect(flags[0].reasons).toContain("amount_above_threshold");
  expect(flags[0].suspiciousClaims).toContain("C1");
});

test("flags high frequency (more than 5 claims in same calendar month)", () => {
  const fn = impl();
  const claims: Claim[] = [
    { id: "C1", memberId: "M-002", actCode: "C23",  date: "01/03/2026", amount: 25 },
    { id: "C2", memberId: "M-002", actCode: "SPE7", date: "05/03/2026", amount: 80 },
    { id: "C3", memberId: "M-002", actCode: "MK50", date: "08/03/2026", amount: 35 },
    { id: "C4", memberId: "M-002", actCode: "INF3", date: "12/03/2026", amount: 20 },
    { id: "C5", memberId: "M-002", actCode: "ALD1", date: "18/03/2026", amount: 45 },
    { id: "C6", memberId: "M-002", actCode: "C23",  date: "25/03/2026", amount: 25 },
  ];
  const flags = fn(claims);
  expect(flags.length).toBe(1);
  expect(flags[0].memberId).toBe("M-002");
  expect(flags[0].reasons).toContain("high_frequency");
});

test("one member can cumulate multiple fraud reasons", () => {
  const fn = impl();
  const claims: Claim[] = [
    { id: "C1", memberId: "M-001", actCode: "C23", date: "15/03/2026", amount: 250 },
    { id: "C2", memberId: "M-001", actCode: "C23", date: "15/03/2026", amount: 250 },
  ];
  const flags = fn(claims);
  expect(flags.length).toBe(1);
  expect(flags[0].reasons).toContain("duplicate_act_same_day");
  expect(flags[0].reasons).toContain("amount_above_threshold");
});

test("only flags the suspicious member, leaves clean members untouched", () => {
  const fn = impl();
  const claims: Claim[] = [
    { id: "C1", memberId: "M-001", actCode: "C23", date: "15/03/2026", amount: 250 },
    { id: "C2", memberId: "M-002", actCode: "MK50", date: "20/03/2026", amount: 30 },
  ];
  const flags = fn(claims);
  expect(flags.length).toBe(1);
  expect(flags[0].memberId).toBe("M-001");
});

test("empty array, should handle", () => {
  const fn = impl();
  const claims: Claim[] = [];
  const flags = fn(claims);
  expect(flags.length).toBe(0);
})

test("flag equals threshold", () =>{
  const fn = impl();
  const claims: Claim[] = [
    { id: "C1", memberId: "M-001", actCode: "C23", date: "15/03/2026", amount: 200 },
    { id: "C2", memberId: "M-002", actCode: "MK50", date: "20/03/2026", amount: 30 },
  ];
  const flags = fn(claims);
  expect(flags.length).toBe(0);
})