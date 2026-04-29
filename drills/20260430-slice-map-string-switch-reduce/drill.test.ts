import { test, expect } from "./test-runner";
import { parseMemberString, parseMemberBatch, searchByName, buildOnboardingSummary, auditReport, Member } from "./drill";

// --- TODO 1 : parseMemberString ---

test("parseMemberString: parses all fields correctly", () => {
  const result = parseMemberString("M-001:Dupont Jean:premium:active");
  expect(result.id).toBe("M-001");
  expect(result.name).toBe("Dupont Jean");
  expect(result.plan).toBe("premium");
  expect(result.status).toBe("active");
});

test("parseMemberString: handles pending status and basic plan", () => {
  const result = parseMemberString("M-002:Martin Claire:basic:pending");
  expect(result.status).toBe("pending");
  expect(result.plan).toBe("basic");
});

test("parseMemberString: handles suspended status", () => {
  const result = parseMemberString("M-003:Leclerc Paul:standard:suspended");
  expect(result.status).toBe("suspended");
});

// --- TODO 2 : parseMemberBatch ---

test("parseMemberBatch: parses a list of member strings", () => {
  const result = parseMemberBatch([
    "M-001:Dupont Jean:premium:active",
    "M-002:Martin Claire:basic:pending",
  ]);
  expect(result.length).toBe(2);
  expect(result[0].id).toBe("M-001");
  expect(result[1].name).toBe("Martin Claire");
});

test("parseMemberBatch: returns empty array for empty input", () => {
  expect(parseMemberBatch([])).toEqual([]);
});

// --- TODO 3 : searchByName ---

test("searchByName: returns members whose name contains the query", () => {
  const members: Member[] = [
    { id: "M-001", name: "Dupont Jean", plan: "premium",  status: "active"  },
    { id: "M-002", name: "Martin Claire", plan: "basic", status: "pending" },
    { id: "M-003", name: "Dupont Marie", plan: "standard", status: "active" },
  ];
  const result = searchByName(members, "Dupont");
  expect(result.length).toBe(2);
  expect(result[0].id).toBe("M-001");
});

test("searchByName: returns empty array when no match", () => {
  const members: Member[] = [
    { id: "M-001", name: "Dupont Jean", plan: "premium", status: "active" },
  ];
  expect(searchByName(members, "Moreau")).toEqual([]);
});

// --- TODO 4 : buildOnboardingSummary ---

test("buildOnboardingSummary: counts total members and pending", () => {
  const members: Member[] = [
    { id: "M-001", name: "Dupont Jean",   plan: "premium",  status: "active"  },
    { id: "M-002", name: "Martin Claire", plan: "basic",    status: "pending" },
    { id: "M-003", name: "Leclerc Paul",  plan: "standard", status: "pending" },
  ];
  const result = buildOnboardingSummary(members);
  expect(result.totalMembers).toBe(3);
  expect(result.pendingCount).toBe(2);
});

test("buildOnboardingSummary: collects active member ids", () => {
  const members: Member[] = [
    { id: "M-001", name: "Dupont Jean",   plan: "premium", status: "active"    },
    { id: "M-002", name: "Martin Claire", plan: "basic",   status: "suspended" },
    { id: "M-003", name: "Leclerc Paul",  plan: "standard", status: "active"   },
  ];
  const result = buildOnboardingSummary(members);
  expect(result.activeIds).toContain("M-001");
  expect(result.activeIds).toContain("M-003");
  expect(result.activeIds.length).toBe(2);
});

// --- TODO 5 : auditReport ---

test("auditReport: returns formatted strings for last N members", () => {
  const members: Member[] = [
    { id: "M-001", name: "Dupont Jean",   plan: "premium",  status: "active"  },
    { id: "M-002", name: "Martin Claire", plan: "basic",    status: "pending" },
    { id: "M-003", name: "Leclerc Paul",  plan: "standard", status: "active"  },
  ];
  const result = auditReport(members, 2);
  expect(result.length).toBe(2);
  expect(result[0]).toBe("M-002 | Martin Claire | basic | pending");
  expect(result[1]).toBe("M-003 | Leclerc Paul | standard | active");
});

test("auditReport: handles n larger than array length", () => {
  const members: Member[] = [
    { id: "M-001", name: "Dupont Jean", plan: "premium", status: "active" },
  ];
  expect(auditReport(members, 10).length).toBe(1);
});
