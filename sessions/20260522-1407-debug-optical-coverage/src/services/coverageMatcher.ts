import { ClaimInput, CoverageRule, MemberPlan } from "../types";
import { actPatternMatches, countPatternSegments, normalizeActCode } from "../utils";

function matchesBeneficiary(rule: CoverageRule, claim: ClaimInput): boolean {
  return rule.beneficiary === "any" || rule.beneficiary === claim.beneficiary;
}

export function findCoverageRule(plan: MemberPlan, claim: ClaimInput): CoverageRule | null {
  const normalizedActCode = normalizeActCode(claim.actCode);

  console.log("console log de la mort : ", plan.rules
    .filter((rule) => matchesBeneficiary(rule, claim) && actPatternMatches(rule.actPattern, normalizedActCode))
    .sort((left, right) => {
      const specificityDifference = countPatternSegments(right.actPattern) - countPatternSegments(left.actPattern);

      if (specificityDifference !== 0) {
        return specificityDifference;
      }

      if (left.beneficiary === right.beneficiary) {
        return 0;
      }

      return left.beneficiary === "any" ? 1 : -1;
    }));
 
  const matchingRules = plan.rules
    .filter((rule) => matchesBeneficiary(rule, claim) && actPatternMatches(rule.actPattern, normalizedActCode))
    .sort((left, right) => {
      const specificityDifference = countPatternSegments(left.actPattern) - countPatternSegments(right.actPattern);

      if (specificityDifference !== 0) {
        return specificityDifference;
      }

      if (left.beneficiary === right.beneficiary) {
        return 0;
      }

      return left.beneficiary === "any" ? 1 : -1;
    });

  return matchingRules[0] ?? null;
}
