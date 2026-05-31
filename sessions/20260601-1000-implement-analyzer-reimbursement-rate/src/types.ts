export type ClaimSnapshot = {
  date: Date;
  reimbursedAmount: number;
  claimedAmount: number;
};

export type ReimbursementLevel = "Faible" | "Moyen" | "Élevé";

export type ReimbursementAnalysis = {
  date: Date;
  reimbursementRate: number;
  level: ReimbursementLevel;
  changePercent: number | null;
};
