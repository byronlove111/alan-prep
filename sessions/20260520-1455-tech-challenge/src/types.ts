export type ClaimStatus = "pending" | "approved" | "rejected";
export type ContractPlan = "basic" | "comfort" | "premium";

// Coverage rates by plan and act category
export type ActCategory = "consultation" | "specialist" | "dental" | "optical";

export interface MemberRecord {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface ContractRecord {
  id: number;
  member_id: string;
  status: string;
  plan: ContractPlan;
  started_at: string;
}

export interface ActRecord {
  code: string;
  label: string;
  category: ActCategory;
}

export interface ClaimRecord {
  id: number;
  member_id: string;
  act_code: string;
  amount_cents: number;
  status: ClaimStatus;
  submitted_at: string;
}

export interface ReimbursementRecord {
  id: number;
  claim_id: number;
  member_id: string;
  amount_cents: number;
  created_at: string;
}

export interface JobResult {
  processed: number;
  created: number;
  errors: number;
}
