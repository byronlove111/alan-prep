export type ClaimRow = {
  id: number;
  careType: string;
  claimedAmount: number;
  reimbursedAmount: number;
  createdAt: string;
};

export type ReimbursementLevel = "Faible" | "Moyen" | "Élevé";

export type ClaimReimbursementAnalysis = {
  date: Date;
  careType: string;
  reimbursementRate: number;
  level: ReimbursementLevel;
  changePercent: number | null;
};
