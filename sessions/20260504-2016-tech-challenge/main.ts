import { reconcileBatch, getMemberReport, getMembersWithDiscrepancies } from "./reconciler";

const claims = [
  { claimId: "C001", memberId: "M1", actCategory: "consultation" as const, actDate: "10/03/2025", submittedAmount: 25 },
  { claimId: "C002", memberId: "M1", actCategory: "pharmacy" as const,     actDate: "05/03/2025", submittedAmount: 18 },
  { claimId: "C003", memberId: "M2", actCategory: "specialist" as const,   actDate: "12/03/2025", submittedAmount: 60 },
  { claimId: "C004", memberId: "M2", actCategory: "lab" as const,          actDate: "01/03/2025", submittedAmount: 40 },
  { claimId: "C005", memberId: "M3", actCategory: "dental" as const,       actDate: "20/03/2025", submittedAmount: 120 },
];

const returns = [
  { claimId: "C001", paidAmount: 25,  rejectionCode: null },
  { claimId: "C002", paidAmount: 12,  rejectionCode: null },
  { claimId: "C003", paidAmount: 60,  rejectionCode: "R001" },
  { claimId: "C004", paidAmount: 40,  rejectionCode: "RXXX" },
  { claimId: "C005", paidAmount: 150, rejectionCode: null },
];

const report = reconcileBatch(claims, returns);

console.log("=== Batch Report ===");
console.log("totalClaims:", report.totalClaims);
console.log("totalSubmitted:", report.totalSubmitted);
console.log("totalPaid:", report.totalPaid);
console.log("totalDelta:", report.totalDelta);
console.log("discrepancyCounts:", report.discrepancyCounts);

console.log("\n=== M1 report (sorted by date) ===");
console.log(getMemberReport(report, "M1"));

console.log("\n=== Members with discrepancies ===");
console.log(getMembersWithDiscrepancies(report));
