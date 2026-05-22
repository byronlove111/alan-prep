import { ClaimInput, MemberPlan, QuoteResult } from "../types";
import { applyYearlyLimit, normalizeActCode } from "../utils";
import { findCoverageRule } from "./coverageMatcher";

export function buildReimbursementQuote(plan: MemberPlan, claim: ClaimInput): QuoteResult {
  const normalizedActCode = normalizeActCode(claim.actCode);
  const matchedRule = findCoverageRule(plan, claim);

  if (matchedRule === null) {
    return {
      memberId: claim.memberId,
      normalizedActCode,
      matchedRuleId: null,
      matchedRuleLabel: null,
      appliedCoveragePercent: null,
      yearlyLimitCents: null,
      reimbursementCents: 0,
      remainingCents: claim.amountCents
    };
  }

  const rawReimbursementCents = Math.floor((claim.amountCents * matchedRule.coveragePercent) / 100);
  const reimbursementCents = applyYearlyLimit(
    rawReimbursementCents,
    claim.alreadyReimbursedThisYearCents,
    matchedRule.yearlyLimitCents
  );

  return {
    memberId: claim.memberId,
    normalizedActCode,
    matchedRuleId: matchedRule.id,
    matchedRuleLabel: matchedRule.label,
    appliedCoveragePercent: matchedRule.coveragePercent,
    yearlyLimitCents: matchedRule.yearlyLimitCents,
    reimbursementCents,
    remainingCents: claim.amountCents - reimbursementCents
  };
}
