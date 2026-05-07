/**
 * Reimbursement Eligibility Engine
 *
 * Before processing a reimbursement, Alan checks whether the member
 * is eligible for the submitted act. This engine applies three rules:
 *   1. The member must have an active contract
 *   2. The act category must be covered by their plan
 *   3. The same act must not have been submitted in the last 30 days
 */

export type PlanType = "basic" | "premium" | "premium_plus";
export type ActCategory = "consultation" | "specialist" | "dental" | "pharmacy" | "lab" | "mental_health";
export type ContractStatus = "active" | "suspended" | "terminated";

export interface Contract {
  memberId: string;
  plan: PlanType;
  status: ContractStatus;
}

export interface PastClaim {
  memberId: string;
  actCategory: ActCategory;
  submittedAt: string; // "DD/MM/YYYY"
}

export interface EligibilityRequest {
  memberId: string;
  actCategory: ActCategory;
  requestedAt: string; // "DD/MM/YYYY"
}

export type RejectionReason =
  | "no_active_contract"
  | "act_not_covered"
  | "duplicate_within_30_days";

export interface EligibilityResult {
  eligible: boolean;
  rejectionReason: RejectionReason | null;
}

// Coverage rules per plan
const COVERAGE: Record<PlanType, ActCategory[]> = {
  basic: ["consultation", "pharmacy", "lab"],
  premium: ["consultation", "specialist", "pharmacy", "lab", "dental"],
  premium_plus: ["consultation", "specialist", "pharmacy", "lab", "dental", "mental_health"],
};

/**
 * Parse a date string "DD/MM/YYYY" into a Date object.
 */
function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Return the number of days between two dates (absolute value).
 */
function daysBetween(a: Date, b: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.abs(Math.round((a.getTime() - b.getTime()) / msPerDay));
}

/**
 * Check whether a member is eligible for reimbursement of a given act.
 *
 * Rules (applied in order — stop at first rejection):
 * 1. Member must have a contract with status "active"
 * 2. Act category must be in the coverage list for their plan
 * 3. No past claim with the same actCategory within the last 30 days
 *
 * @param request   - the eligibility request (member, act, date)
 * @param contracts - all known contracts (one per member)
 * @param pastClaims - all past claims across all members
 */
export function checkEligibility(
  request: EligibilityRequest,
  contracts: Contract[],
  pastClaims: PastClaim[]
): EligibilityResult {
  // Rule 1 — active contract
  const contract = contracts.find((c) => c.memberId === request.memberId);
  if (!contract || contract.status !== "active") {
    return { eligible: false, rejectionReason: "no_active_contract" };
  }

  // Rule 2 — act covered by plan
  const coveredActs = COVERAGE[contract.plan];
  if (!coveredActs.includes(request.actCategory)) {
    return { eligible: false, rejectionReason: "act_not_covered" };
  }

  // Rule 3 — no duplicate within 30 days
  const requestDate = parseDate(request.requestedAt);

  const hasDuplicate = pastClaims.some((claim) => {
    if (claim.memberId !== request.memberId) return false;
    if (claim.actCategory !== request.actCategory) return false;

    const diff = daysBetween(parseDate(claim.submittedAt), requestDate);
    return diff <= 30;
  });

  if (hasDuplicate) {
    return { eligible: false, rejectionReason: "duplicate_within_30_days" };
  }

  return { eligible: true, rejectionReason: null };
}
