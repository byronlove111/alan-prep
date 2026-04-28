import { test, expect } from "./test-runner";
import { groupByMember, activeMemberIds, collectIds, totalByActCode, Claim } from "./drill";

const c1: Claim = { id: "C1", memberId: "M-001", actCode: "C23",  amount: 25 };
const c2: Claim = { id: "C2", memberId: "M-002", actCode: "SPE7", amount: 80 };
const c3: Claim = { id: "C3", memberId: "M-001", actCode: "MK50", amount: 35 };
const c4: Claim = { id: "C4", memberId: "M-001", actCode: "C23",  amount: 30 };

// --- TODO 1 : groupByMember ---

test("groupByMember: groups claims by memberId", () => {
  const result = groupByMember([c1, c2, c3]);
  expect(result["M-001"].length).toBe(2);
  expect(result["M-002"].length).toBe(1);
});

test("groupByMember: returns empty object for empty input", () => {
  expect(groupByMember([])).toEqual({});
});

test("groupByMember: preserves claim data in groups", () => {
  const result = groupByMember([c1, c2]);
  expect(result["M-001"][0].id).toBe("C1");
});

// --- TODO 2 : activeMemberIds ---

test("activeMemberIds: returns ids of members with more than 1 claim", () => {
  const grouped = groupByMember([c1, c2, c3]);
  const result = activeMemberIds(grouped);
  expect(result).toContain("M-001");
});

test("activeMemberIds: excludes members with only 1 claim", () => {
  const grouped = groupByMember([c1, c2, c3]);
  const result = activeMemberIds(grouped);
  expect(result.includes("M-002")).toBe(false);
});

// --- TODO 3 : collectIds ---

test("collectIds: flattens ids from multiple claim groups", () => {
  const result = collectIds([[c1, c3], [c2]]);
  expect(result).toContain("C1");
  expect(result).toContain("C3");
  expect(result).toContain("C2");
  expect(result.length).toBe(3);
});

test("collectIds: returns empty array for empty input", () => {
  expect(collectIds([])).toEqual([]);
});

// --- TODO 4 : totalByActCode ---

test("totalByActCode: sums amounts per actCode", () => {
  const result = totalByActCode([c1, c4]); // two C23 claims
  expect(result["C23"]).toBe(55);
});

test("totalByActCode: handles multiple act codes", () => {
  const result = totalByActCode([c1, c2, c3, c4]);
  expect(result["C23"]).toBe(55);
  expect(result["SPE7"]).toBe(80);
  expect(result["MK50"]).toBe(35);
});

test("totalByActCode: returns empty object for empty input", () => {
  expect(totalByActCode([])).toEqual({});
});
