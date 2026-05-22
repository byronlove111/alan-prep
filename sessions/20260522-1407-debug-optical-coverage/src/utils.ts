export function normalizeActCode(actCode: string): string {
  return actCode
    .trim()
    .toUpperCase()
    .replace(/[\s_-]+/g, "/")
    .replace(/\/+/g, "/");
}

export function actPatternMatches(pattern: string, normalizedActCode: string): boolean {
  const normalizedPattern = normalizeActCode(pattern);

  if (normalizedPattern === normalizedActCode){
    return true;
  } else if (normalizedPattern.endsWith("/*")) {
    const prefix = normalizedPattern.slice(0, -2);
    return normalizedActCode === prefix || normalizedActCode.startsWith(`${prefix}/`);
  } else {
    return false;
  }
}

export function countPatternSegments(pattern: string): number {
  return normalizeActCode(pattern)
    .split("/")
    .filter((segment) => segment.length > 0 && segment !== "*").length;
}

export function applyYearlyLimit(
  rawReimbursementCents: number,
  alreadyReimbursedThisYearCents: number,
  yearlyLimitCents: number | null
): number {
  if (yearlyLimitCents === null) {
    return rawReimbursementCents;
  }

  const remainingLimit = Math.max(yearlyLimitCents - alreadyReimbursedThisYearCents, 0);
  return Math.min(rawReimbursementCents, remainingLimit);
}
