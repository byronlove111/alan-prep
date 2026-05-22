export type EligibilitySource = "hris" | "payroll" | "manual_review";

export type EligibilityStatus =
  | "eligible"
  | "pending_documents"
  | "suspended"
  | "terminated";

export type CountryCode = "FR" | "BE";

export type CanonicalPlan = "core" | "plus";

export interface RawEligibilityLine {
  lineId: string;
  memberId: string;
  memberName: string;
  source: EligibilitySource;
  country: CountryCode;
  planCode: string;
  status: EligibilityStatus;
  effectiveFrom: string;
  effectiveTo: string | null;
  reportedAt: string;
}

export interface NormalizedEligibilityLine {
  lineId: string;
  memberId: string;
  memberName: string;
  source: EligibilitySource;
  country: CountryCode;
  plan: CanonicalPlan;
  coverageKey: string;
  status: EligibilityStatus;
  effectiveFrom: string;
  effectiveTo: string | null;
  reportedAt: string;
}

export interface EligibilitySnapshot {
  memberId: string;
  memberName: string;
  country: CountryCode;
  plan: CanonicalPlan;
  coverageKey: string;
  finalStatus: EligibilityStatus;
  activeFrom: string | null;
  activeTo: string | null;
  contributingSources: EligibilitySource[];
  needsManualReview: boolean;
  isEndingSoon: boolean;
}
