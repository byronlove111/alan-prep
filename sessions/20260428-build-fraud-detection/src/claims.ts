import { Claim, ActCode } from "./types";

const VALID_ACT_CODES: ActCode[] = ["C23", "SPE7", "MK50", "ALD1", "INF3"];

export function parseClaim(line: string): Claim {
  const parts = line.split(",").map((s) => s.trim());
  if (parts.length !== 5) throw new Error(`Invalid claim format: "${line}"`);
  const [id, memberId, actCode, date, amount] = parts;
  if (!VALID_ACT_CODES.includes(actCode as ActCode))
    throw new Error(`Unknown act code: ${actCode}`);
  return {
    id,
    memberId,
    actCode: actCode as ActCode,
    date,
    amount: parseFloat(amount),
  };
}

export function parseBatch(input: string): Claim[] {
  return input
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .map(parseClaim);
}

// Groups claims by memberId — returns a dictionary { memberId → Claim[] }
export function claimsByMember(claims: Claim[]): Record<string, Claim[]> {
  return claims.reduce(
    (acc, claim) => {
      if (!acc[claim.memberId]) acc[claim.memberId] = [];
      acc[claim.memberId].push(claim);
      return acc;
    },
    {} as Record<string, Claim[]>
  );
}
