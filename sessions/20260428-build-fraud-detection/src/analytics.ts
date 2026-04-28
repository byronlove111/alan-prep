import { Claim, MemberSummary } from "./types";
import { roundAmount, toSortableDate } from "./utils";
import { parseBatch, claimsByMember } from "./claims";

const YEARLY_CAP = 500;

export function analyzeBatch(input: string): MemberSummary[] {
  const claims = parseBatch(input);
  const byMember = claimsByMember(claims);

  return Object.entries(byMember).map(([memberId, memberClaims]) => {
    const totalAmount = memberClaims.reduce((acc, c) => acc + c.amount, 0);

    const lastClaimDate = memberClaims.reduce(
      (latest, c) =>
        toSortableDate(c.date) > toSortableDate(latest) ? c.date : latest,
      memberClaims[0].date
    );

    return {
      memberId,
      claimCount: memberClaims.length,
      totalAmount: roundAmount(totalAmount),
      lastClaimDate,
      capExceeded: totalAmount > YEARLY_CAP,
    };
  });
}
