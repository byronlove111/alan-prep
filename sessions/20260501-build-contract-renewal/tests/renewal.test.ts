// @ts-ignore
const { test, expect } = require("../test-runner-helpers");
import { checkRenewals } from "../src/renewal";
import { Contract, Member } from "../src/types";

const members: Member[] = [
  { id: "M-001", name: "Dupont Jean", email: "jean.dupont@corp.fr", companyId: "COMP-001" },
  { id: "M-002", name: "Martin Claire", email: "claire.martin@corp.fr", companyId: "COMP-001" },
  { id: "M-003", name: "Leroy Paul", email: "paul.leroy@startup.fr", companyId: "COMP-002" },
];

const contracts: Contract[] = [
  {
    id: "CTR-001",
    memberId: "M-001",
    coverageLevel: "premium",
    startDate: "2025-05-01",
    endDate: "2026-05-08",  // 7 days from ref → critical
    status: "active",
    autoRenew: true,
  },
  {
    id: "CTR-002",
    memberId: "M-002",
    coverageLevel: "standard",
    startDate: "2025-06-01",
    endDate: "2026-05-21",  // 20 days from ref → warning
    status: "active",
    autoRenew: false,
  },
  {
    id: "CTR-003",
    memberId: "M-003",
    coverageLevel: "basic",
    startDate: "2025-01-01",
    endDate: "2026-08-01",  // 92 days from ref → ok
    status: "active",
    autoRenew: true,
  },
  {
    id: "CTR-004",
    memberId: "M-001",
    coverageLevel: "basic",
    startDate: "2024-01-01",
    endDate: "2025-04-01",  // already expired → excluded
    status: "active",
    autoRenew: false,
  },
  {
    id: "CTR-005",
    memberId: "M-002",
    coverageLevel: "standard",
    startDate: "2025-01-01",
    endDate: "2026-06-01",  // 31 days → warning
    status: "cancelled",    // cancelled → excluded
    autoRenew: false,
  },
  {
    id: "CTR-006",
    memberId: "M-002",
    coverageLevel: "standard",
    startDate: "2025-06-01",
    endDate: "2026-05-31",
    status: "active",
    autoRenew: true,
  },
  {
    id: "CTR-007",
    memberId: "M-002",
    coverageLevel: "standard",
    startDate: "2025-06-01",
    endDate: "2026-05-15",
    status: "active",
    autoRenew: true,
  },
  {
    id: "CTR-008",
    memberId: "M-002",
    coverageLevel: "standard",
    startDate: "2025-06-01",
    endDate: "2026-06-01",
    status: "active",
    autoRenew: true,
  },
];

// Reference date: 2026-05-01
const referenceDate = new Date(2026, 4, 1);

test("checkRenewals: excludes expired and non-active contracts", () => {
  const notices = checkRenewals(contracts, members, referenceDate);
  const ids = notices.map(n => n.contractId);
  expect(ids.includes("CTR-004")).toBe(false); // expired
  expect(ids.includes("CTR-005")).toBe(false); // cancelled
});

test("checkRenewals: classifies urgency correctly", () => {
  const notices = checkRenewals(contracts, members, referenceDate);
  const ctr001 = notices.find(n => n.contractId === "CTR-001");
  const ctr002 = notices.find(n => n.contractId === "CTR-002");
  const ctr003 = notices.find(n => n.contractId === "CTR-003");

  expect(ctr001?.urgency).toBe("critical"); // 7 days
  expect(ctr002?.urgency).toBe("warning");  // 20 days
  expect(ctr003?.urgency).toBe("ok");       // 92 days
});

test("checkRenewals: fills member info correctly", () => {
  const notices = checkRenewals(contracts, members, referenceDate);
  const ctr001 = notices.find(n => n.contractId === "CTR-001");

  expect(ctr001?.memberName).toBe("Dupont Jean");
  expect(ctr001?.memberEmail).toBe("jean.dupont@corp.fr");
  expect(ctr001?.memberId).toBe("M-001");
});

test("checkRenewals: computes daysUntilExpiry correctly", () => {
  const notices = checkRenewals(contracts, members, referenceDate);
  const ctr001 = notices.find(n => n.contractId === "CTR-001");
  expect(ctr001?.daysUntilExpiry).toBe(7);
});

test("checkRenewals: returns empty array when no active contracts", () => {
  const expiredOnly: Contract[] = [
    { id: "CTR-X", memberId: "M-001", coverageLevel: "basic", startDate: "2023-01-01", endDate: "2024-01-01", status: "active", autoRenew: false },
  ];
  const notices = checkRenewals(expiredOnly, members, referenceDate);
  expect(notices.length).toBe(0);
});

test("checkRenewals: check every limit cases of expiry date", () => {
  const notices = checkRenewals(contracts, members, referenceDate);
  const ctr006 = notices.find(n => n.contractId === "CTR-006");
  const ctr007 = notices.find(n => n.contractId === "CTR-007");
  const ctr008 = notices.find(n => n.contractId === "CTR-008");

  expect(ctr006?.urgency).toBe("warning");
  expect(ctr007?.urgency).toBe("critical");
  expect(ctr008?.urgency).toBe("ok");
});