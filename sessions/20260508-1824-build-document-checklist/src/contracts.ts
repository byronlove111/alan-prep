import type { Contract } from "./types";

export function findContract(contracts: Contract[], memberId: string): Contract | undefined {
  return contracts.find((c) => c.memberId === memberId);
}

export function isPendingActivation(contract: Contract): boolean {
  return contract.status === "pending_activation";
}
