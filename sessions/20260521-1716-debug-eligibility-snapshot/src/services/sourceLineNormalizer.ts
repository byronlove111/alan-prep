import { CanonicalPlan, EligibilitySource, NormalizedEligibilityLine, RawEligibilityLine } from "../types";
import { compareIsoDates, normalizeToken } from "../utils";

const SOURCE_PRIORITY: Record<EligibilitySource, number> = {
  manual_review: 0,
  payroll: 1,
  hris: 2
};

export function normalizePlanCode(planCode: string): CanonicalPlan {
  const token = normalizeToken(planCode);

  if (token.includes("PLUS")) {
    return "plus";
  }

  return "core";
}

export function normalizeEligibilityLine(line: RawEligibilityLine): NormalizedEligibilityLine {
  const plan = normalizePlanCode(line.planCode);

  return {
    lineId: line.lineId,
    memberId: line.memberId.trim(),
    memberName: line.memberName.trim(),
    source: line.source,
    country: line.country,
    plan,
    coverageKey: `${line.country}:${plan}`,
    status: line.status,
    effectiveFrom: line.effectiveFrom,
    effectiveTo: line.effectiveTo,
    reportedAt: line.reportedAt
  };
}

export function sortByPriorityAndFreshness(lines: NormalizedEligibilityLine[]): NormalizedEligibilityLine[] {
  return [...lines].sort((left, right) => {
    const priorityDifference = SOURCE_PRIORITY[left.source] - SOURCE_PRIORITY[right.source];

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    return compareIsoDates(right.reportedAt, left.reportedAt);
  });
}
