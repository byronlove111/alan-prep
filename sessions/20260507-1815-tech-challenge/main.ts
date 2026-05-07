import { checkEligibility, Contract, PastClaim } from "./eligibility";

const contracts: Contract[] = [
  { memberId: "M1", plan: "premium",      status: "active" },
  { memberId: "M2", plan: "basic",        status: "active" },
  { memberId: "M3", plan: "premium_plus", status: "suspended" },
];

const pastClaims: PastClaim[] = [
  { memberId: "M1", actCategory: "consultation", submittedAt: "01/05/2025" },
  { memberId: "M1", actCategory: "dental",       submittedAt: "15/04/2025" },
  { memberId: "M2", actCategory: "pharmacy",     submittedAt: "20/04/2025" },
];

// Should be eligible (dental, 40 days after last dental claim)
console.log("M1 dental 25/05:", checkEligibility(
  { memberId: "M1", actCategory: "dental", requestedAt: "25/05/2025" },
  contracts, pastClaims
));

// Should be rejected (duplicate consultation within 30 days)
console.log("M1 consultation 10/05:", checkEligibility(
  { memberId: "M1", actCategory: "consultation", requestedAt: "10/05/2025" },
  contracts, pastClaims
));

// Should be rejected (act not covered by basic plan)
console.log("M2 dental 10/05:", checkEligibility(
  { memberId: "M2", actCategory: "dental", requestedAt: "10/05/2025" },
  contracts, pastClaims
));

// Should be rejected (suspended contract)
console.log("M3 consultation 10/05:", checkEligibility(
  { memberId: "M3", actCategory: "consultation", requestedAt: "10/05/2025" },
  contracts, pastClaims
));
