import { Contract, ContractStatus } from "./types";
import { parseDate, isActiveStatus } from "./utils";

/**
 * Returns all contracts matching a given status.
 */
export function filterByStatus(contracts: Contract[], status: ContractStatus): Contract[] {
  return contracts.filter(c => c.status === status);
}

/**
 * Returns all active contracts for a given member.
 */
export function getActiveContractsForMember(contracts: Contract[], memberId: string): Contract[] {
  return contracts.filter(c => c.memberId === memberId && isActiveStatus(c.status));
}

/**
 * Returns the contract that ends the latest among a list.
 * Returns null if the list is empty.
 */
export function getLatestContract(contracts: Contract[]): Contract | null {
  if (contracts.length === 0) return null;
  return contracts.reduce((latest, c) =>
    parseDate(c.endDate) > parseDate(latest.endDate) ? c : latest
  );
}

/**
 * Returns true if a contract has already expired relative to a reference date.
 */
export function isExpired(contract: Contract, referenceDate: Date): boolean {
  return parseDate(contract.endDate) < referenceDate;
}
