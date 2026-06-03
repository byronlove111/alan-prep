import { Claim, ReimbursementResult } from "./types";

const RATES: Record<string, number> = {
  consultation: 0.7,
  pharmacy: 0.65,
  specialist: 0.8,
  teleconsultation: 1.0,
};

const MAX_REIMBURSEMENT = 150;

export function calculateReimbursement(claim: Claim): ReimbursementResult {
  const rate = RATES[claim.category];

  if (rate === undefined) {
    throw new Error(`Unknown category: ${claim.category}`);
  }

  let reimbursedAmount = Math.round(claim.amount * rate * 100) / 100;
  if (reimbursedAmount > MAX_REIMBURSEMENT) {
    reimbursedAmount = MAX_REIMBURSEMENT;
  }

  return {
    claimId: claim.id,
    reimbursedAmount,
    rate,
  };
}
