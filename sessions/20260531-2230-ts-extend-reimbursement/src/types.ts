export type ClaimCategory =
  | "consultation"
  | "pharmacy"
  | "specialist"
  | "teleconsultation";

export type Claim = {
  id: number;
  amount: number;
  category: ClaimCategory;
};

export type ReimbursementResult = {
  claimId: number;
  reimbursedAmount: number;
  rate: number;
};
