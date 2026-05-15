export interface Member {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Claim {
  id: string;
  memberId: string;
  actCode: string;
  amount: number;
  submittedAt: string; // ISO date string
}

export interface ClaimInput {
  actCode: string;
  amount: number;
}
