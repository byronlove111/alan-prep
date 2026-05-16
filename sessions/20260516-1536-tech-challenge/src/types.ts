export type BeneficiaryType = "spouse" | "child";
export type ContractStatus = "pending" | "active" | "expired";
export type ContractPlan = "basic" | "comfort" | "premium";

export interface MemberRecord {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  deleted_at: string | null;
}

export interface ContractRecord {
  id: number;
  member_id: string;
  status: ContractStatus;
  plan: ContractPlan;
  started_at: string;
  ended_at: string | null;
}

export interface BeneficiaryRecord {
  id: number;
  member_id: string;
  type: BeneficiaryType;
  first_name: string;
  last_name: string;
  birth_date: string;
  created_at: string;
}

export interface AddBeneficiaryInput {
  type: BeneficiaryType;
  first_name: string;
  last_name: string;
  birth_date: string;
}
