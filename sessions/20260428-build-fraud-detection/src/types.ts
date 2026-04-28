export type ActCode = "C23" | "SPE7" | "MK50" | "ALD1" | "INF3";

export interface Claim {
  id: string;
  memberId: string;
  actCode: ActCode;
  date: string; // DD/MM/YYYY
  amount: number;
}

export interface MemberSummary {
  memberId: string;
  claimCount: number;
  totalAmount: number;
  lastClaimDate: string;
  capExceeded: boolean;
}

export type FraudReason =
  | "duplicate_act_same_day"
  | "amount_above_threshold"
  | "high_frequency";

export interface FraudFlag {
  memberId: string;
  reasons: FraudReason[];
  suspiciousClaims: string[]; // claim ids
}
