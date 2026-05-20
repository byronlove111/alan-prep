export type ClaimStatus = "submitted" | "approved" | "rejected";
export type CareCategory = "consultation" | "dental" | "optical" | "pharmacy";

export interface MemberRecord {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface ClaimRecord {
  id: number;
  member_id: string;
  care_category: CareCategory;
  provider_name: string;
  amount_cents: number;
  status: ClaimStatus;
  occurred_at: string;
  submitted_at: string;
}

export interface ReimbursementRecord {
  id: number;
  claim_id: number;
  amount_cents: number;
  reimbursed_at: string;
}

export interface ClaimsSummaryCategory {
  category: CareCategory;
  claimCount: number;
  claimedCents: number;
  reimbursedCents: number;
}

export interface MemberClaimsSummary {
  memberId: string;
  month: string;
  duplicateClaimsIgnored: number;
  hasRecentDuplicate: boolean;
  totals: {
    claimCount: number;
    totalClaimedCents: number;
    totalReimbursedCents: number;
  };
  categories: ClaimsSummaryCategory[];
}
