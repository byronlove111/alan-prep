import { test, expect } from "./test-runner";
import { findClaimById, groupByMember, sortByTotalDesc, getTopSpender, Claim } from "./drill";

const claims: Claim[] = [
  { claimId: "C1", memberId: "M1", amount: 30,  category: "consultation" },
  { claimId: "C2", memberId: "M2", amount: 18,  category: "pharmacy" },
  { claimId: "C3", memberId: "M1", amount: 50,  category: "dental" },
  { claimId: "C4", memberId: "M3", amount: 150, category: "consultation" },
  { claimId: "C5", memberId: "M3", amount: 40,  category: "pharmacy" },
  { claimId: "C6", memberId: "M3", amount: 60,  category: "consultation" },
];

// ─── findClaimById ────────────────────────────────────────────────────────────

test("findClaimById — trouve un claim existant", () => {
  const result = findClaimById(claims, "C3");
  expect(result?.claimId).toBe("C3");
  expect(result?.memberId).toBe("M1");
  expect(result?.amount).toBe(50);
});

test("findClaimById — retourne undefined si inexistant", () => {
  const result = findClaimById(claims, "C99");
  expect(result).toBe(undefined);
});

// ─── groupByMember ────────────────────────────────────────────────────────────

test("groupByMember — total correct pour M1 (2 claims)", () => {
  const result = groupByMember(claims);
  const m1 = result.find((x) => x.memberId === "M1");
  expect(m1?.total).toBe(80);
  expect(m1?.claimCount).toBe(2);
});

test("groupByMember — total correct pour M3 (3 claims)", () => {
  const result = groupByMember(claims);
  const m3 = result.find((x) => x.memberId === "M3");
  expect(m3?.total).toBe(250);
  expect(m3?.claimCount).toBe(3);
});

test("groupByMember — retourne 3 membres distincts", () => {
  const result = groupByMember(claims);
  expect(result.length).toBe(3);
});

test("groupByMember — tableau vide retourne []", () => {
  const result = groupByMember([]);
  expect(result.length).toBe(0);
});

// ─── sortByTotalDesc ──────────────────────────────────────────────────────────

test("sortByTotalDesc — premier élément a le total le plus élevé", () => {
  const totals = [
    { memberId: "M1", total: 80,  claimCount: 2 },
    { memberId: "M2", total: 18,  claimCount: 1 },
    { memberId: "M3", total: 250, claimCount: 3 },
  ];
  const result = sortByTotalDesc(totals);
  expect(result[0].memberId).toBe("M3");
  expect(result[0].total).toBe(250);
});

test("sortByTotalDesc — dernier élément a le total le plus bas", () => {
  const totals = [
    { memberId: "M1", total: 80,  claimCount: 2 },
    { memberId: "M2", total: 18,  claimCount: 1 },
    { memberId: "M3", total: 250, claimCount: 3 },
  ];
  const result = sortByTotalDesc(totals);
  expect(result[result.length - 1].memberId).toBe("M2");
});

test("sortByTotalDesc — ne mute pas le tableau d'entrée", () => {
  const totals = [
    { memberId: "M1", total: 80,  claimCount: 2 },
    { memberId: "M2", total: 18,  claimCount: 1 },
  ];
  sortByTotalDesc(totals);
  expect(totals[0].memberId).toBe("M1"); // ordre original préservé
});

// ─── getTopSpender ────────────────────────────────────────────────────────────

test("getTopSpender — retourne M3 avec total 250", () => {
  const result = getTopSpender(claims);
  expect(result?.memberId).toBe("M3");
  expect(result?.total).toBe(250);
});

test("getTopSpender — retourne undefined si claims vide", () => {
  const result = getTopSpender([]);
  expect(result).toBe(undefined);
});
