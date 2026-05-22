export type Beneficiary = "member" | "child";

export interface CoverageRule {
  id: string;
  label: string;
  actPattern: string;
  beneficiary: Beneficiary | "any";
  coveragePercent: number;
  yearlyLimitCents: number | null;
  requiresPrescription: boolean;
}

export interface MemberPlan {
  planId: string;
  label: string;
  rules: CoverageRule[];
}

export interface ClaimInput {
  memberId: string;
  beneficiary: Beneficiary;
  actCode: string;
  amountCents: number;
  alreadyReimbursedThisYearCents: number;
}

export interface QuoteResult {
  memberId: string;
  normalizedActCode: string;
  matchedRuleId: string | null;
  matchedRuleLabel: string | null;
  appliedCoveragePercent: number | null;
  yearlyLimitCents: number | null;
  reimbursementCents: number;
  remainingCents: number;
}
