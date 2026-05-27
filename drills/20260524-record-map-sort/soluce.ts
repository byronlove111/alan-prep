// ============================================================
// SOLUCE — Record · map · sort · Object.entries
// ============================================================

export interface ClaimLine {
  submissionId: string;
  memberId: string;
  status: "open" | "closed";
  amountCents: number;
}

export interface MemberClaimCount {
  memberId: string;
  count: number;
}

export function mapOpenClaimIds(claims: ClaimLine[]): string[] {
  return claims
    .filter((claim) => claim.status === "open")
    .map((claim) => claim.submissionId);
}

export function countOpenClaimsByMember(
  claims: ClaimLine[],
): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const claim of claims) {
    if (claim.status !== "open") {
      continue;
    }

    counts[claim.memberId] = (counts[claim.memberId] ?? 0) + 1;
  }

  return counts;
}

export function sortMemberCounts(
  counts: Record<string, number>,
): MemberClaimCount[] {
  const ranking: MemberClaimCount[] = [];

  for (const memberId in counts) {
    ranking.push({
      memberId,
      count: counts[memberId],
    });
  }

  ranking.sort((left, right) => {
    if (right.count !== left.count) {
      return right.count - left.count;
    }

    return left.memberId.localeCompare(right.memberId);
  });

  return ranking;
}

export function rankMembersByOpenClaims(
  claims: ClaimLine[],
  limit?: number,
): MemberClaimCount[] {
  const counts = countOpenClaimsByMember(claims);
  const ranking = sortMemberCounts(counts);

  if (limit === undefined) {
    return ranking;
  }

  return ranking.slice(0, limit);
}
