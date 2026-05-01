// @ts-ignore
const { test, expect } = require("../test-runner-helpers");
import { filterByStatus, getActiveContractsForMember, getLatestContract, isExpired } from "../src/contracts";
import { Contract } from "../src/types";

const contracts: Contract[] = [
  { id: "CTR-001", memberId: "M-001", coverageLevel: "premium", startDate: "2025-01-01", endDate: "2026-06-01", status: "active", autoRenew: true },
  { id: "CTR-002", memberId: "M-001", coverageLevel: "basic", startDate: "2024-01-01", endDate: "2025-01-01", status: "expired", autoRenew: false },
  { id: "CTR-003", memberId: "M-002", coverageLevel: "standard", startDate: "2025-03-01", endDate: "2026-03-01", status: "active", autoRenew: true },
];

test("filterByStatus: returns only active contracts", () => {
  const result = filterByStatus(contracts, "active");
  expect(result.length).toBe(2);
  expect(result[0].id).toBe("CTR-001");
});

test("getActiveContractsForMember: returns active contracts for a specific member", () => {
  const result = getActiveContractsForMember(contracts, "M-001");
  expect(result.length).toBe(1);
  expect(result[0].id).toBe("CTR-001");
});

test("getLatestContract: returns the contract with the latest endDate", () => {
  const result = getLatestContract(contracts);
  expect(result?.id).toBe("CTR-001");
});

test("getLatestContract: returns null for empty array", () => {
  const result = getLatestContract([]);
  expect(result).toBeNull();
});

test("isExpired: returns true when endDate is before reference date", () => {
  const contract = contracts[1]; // ends 2025-01-01
  const ref = new Date(2025, 5, 1); // 2025-06-01
  expect(isExpired(contract, ref)).toBe(true);
});

test("isExpired: returns false when endDate is after reference date", () => {
  const contract = contracts[0]; // ends 2026-06-01
  const ref = new Date(2025, 5, 1); // 2025-06-01
  expect(isExpired(contract, ref)).toBe(false);
});
