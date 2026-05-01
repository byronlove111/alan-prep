// ============================================================
// Domain types — shared across the codebase
// ============================================================

export type ContractStatus = "active" | "expired" | "cancelled" | "pending";
export type CoverageLevel = "basic" | "standard" | "premium";
export type UrgencyLevel = "critical" | "warning" | "ok";

export interface Contract {
  id: string;           // e.g. "CTR-001"
  memberId: string;     // e.g. "M-001"
  coverageLevel: CoverageLevel;
  startDate: string;    // "YYYY-MM-DD"
  endDate: string;      // "YYYY-MM-DD"
  status: ContractStatus;
  autoRenew: boolean;
}

export interface Member {
  id: string;           // e.g. "M-001"
  name: string;
  email: string;
  companyId: string;    // e.g. "COMP-001"
}

export interface RenewalNotice {
  contractId: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  coverageLevel: CoverageLevel;
  endDate: string;
  daysUntilExpiry: number;
  urgency: UrgencyLevel;
}
