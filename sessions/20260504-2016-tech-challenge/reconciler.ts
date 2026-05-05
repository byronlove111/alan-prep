/**
 * Claim Reconciliation Engine
 *
 * After a reimbursement batch is processed by the Sécurité Sociale,
 * Alan receives a NOEMIE return file listing what was actually paid
 * for each claim. Alan must reconcile this against what it expected to pay,
 * detect discrepancies, and produce a structured report.
 */

export type ActCategory = "consultation" | "specialist" | "dental" | "pharmacy" | "lab";

export interface SubmittedClaim {
  claimId: string;
  memberId: string;
  actCategory: ActCategory;
  actDate: string;       // "DD/MM/YYYY"
  submittedAmount: number; // amount Alan expected to reimburse (in euros)
}

export interface NoemieReturn {
  claimId: string;
  paidAmount: number;    // amount Sécu actually paid (in euros)
  rejectionCode: string | null; // null = accepted, string = rejection reason code
}

export type DiscrepancyType =
  | "amount_mismatch"   // paid != expected, no rejection
  | "unexpected_rejection" // rejected with no explanation we know
  | "overpayment"       // paid > expected
  | "ok";

export interface ReconciliationResult {
  claimId: string;
  memberId: string;
  actCategory: ActCategory;
  actDate: string;
  submittedAmount: number;
  paidAmount: number;
  discrepancy: DiscrepancyType;
  delta: number; // paidAmount - submittedAmount (negative = underpaid)
}

export interface BatchReport {
  totalClaims: number;
  totalSubmitted: number;    // sum of all submittedAmounts
  totalPaid: number;         // sum of all paidAmounts
  totalDelta: number;        // totalPaid - totalSubmitted
  discrepancyCounts: Record<DiscrepancyType, number>;
  results: ReconciliationResult[];
}

const KNOWN_REJECTION_CODES = ["R001", "R002", "R003", "R010", "R011"];

/**
 * Reconcile a batch of submitted claims against NOEMIE return data.
 *
 * Rules:
 * - If rejectionCode is non-null AND not in KNOWN_REJECTION_CODES → "unexpected_rejection"
 * - If rejectionCode is null AND paidAmount > submittedAmount → "overpayment"
 * - If rejectionCode is null AND paidAmount !== submittedAmount (and not overpayment) → "amount_mismatch"
 * - Otherwise → "ok"
 *
 * The delta is always: paidAmount - submittedAmount
 * A NOEMIE return with a known rejection code is treated as paidAmount = 0.
 *
 * @param claims - list of claims Alan submitted
 * @param returns - list of NOEMIE return entries (one per claim)
 * @returns BatchReport
 */
export function reconcileBatch(
  claims: SubmittedClaim[],
  returns: NoemieReturn[]
): BatchReport {
  const returnMap: Record<string, NoemieReturn> = {};
  for (const r of returns) {
    returnMap[r.claimId] = r;
  }

  const results: ReconciliationResult[] = [];

  for (const claim of claims) {
    const ret = returnMap[claim.claimId];
    if (!ret) continue;

    const effectivePaid = ret.rejectionCode !== null ? 0 : ret.paidAmount;
    const delta = effectivePaid - claim.submittedAmount;

    let discrepancy: DiscrepancyType;

    if (ret.rejectionCode !== null && !KNOWN_REJECTION_CODES.includes(ret.rejectionCode)) {
      discrepancy = "unexpected_rejection";
    } else if (ret.rejectionCode === null && effectivePaid > claim.submittedAmount) {
      discrepancy = "overpayment";
    } else if (ret.rejectionCode === null && effectivePaid !== claim.submittedAmount) {
      discrepancy = "amount_mismatch";
    } else {
      discrepancy = "ok";
    }

    results.push({
      claimId: claim.claimId,
      memberId: claim.memberId,
      actCategory: claim.actCategory,
      actDate: claim.actDate,
      submittedAmount: claim.submittedAmount,
      paidAmount: effectivePaid,
      discrepancy,
      delta,
    });
  }

  const totalSubmitted = claims.reduce((sum, c) => sum + c.submittedAmount, 0);
  const totalPaid = results.reduce((sum, r) => sum + r.paidAmount, 0);

  const discrepancyCounts: Record<DiscrepancyType, number> = {
    ok: 0,
    amount_mismatch: 0,
    unexpected_rejection: 0,
    overpayment: 0,
  };

  for (const r of results) {
    discrepancyCounts[r.discrepancy] += 1;
  }

  return {
    totalClaims: claims.length,
    totalSubmitted,
    totalPaid,
    totalDelta: totalPaid - totalSubmitted,
    discrepancyCounts,
    results,
  };
}

/**
 * Given a BatchReport, return only the results for a specific member,
 * sorted by actDate ascending (DD/MM/YYYY).
 */
export function getMemberReport(
  report: BatchReport,
  memberId: string
): ReconciliationResult[] {
  return report.results
    .filter((r) => r.memberId === memberId)
    .sort((a, b) => {
      const toSortable = (d: string) => {
        const [day, month, year] = d.split("/");
        return `${year}${month}${day}`;
      };
      return toSortable(a.actDate) < toSortable(b.actDate) ? -1 : 1;
    });
}

/**
 * Return the list of members who have at least one discrepancy that is NOT "ok",
 * with the count of non-ok results per member.
 * Sorted by count descending.
 *
 * TODO — implement this function
 */
export function getMembersWithDiscrepancies(
  report: BatchReport
): Array<{ memberId: string; discrepancyCount: number }> {
  const membersWithDiscrepancies : Array<{ memberId: string; discrepancyCount: number }> = [];
  for (const result of report.results){
    if (result.discrepancy != "ok") {
      const member = membersWithDiscrepancies.find((x) => x.memberId === result.memberId);
      if (member) {
        member.discrepancyCount = member.discrepancyCount + 1;
      } else {
        membersWithDiscrepancies.push({memberId: result.memberId, discrepancyCount: 1});
      }
    }
  }
  return membersWithDiscrepancies.sort((a, b) => b.discrepancyCount - a.discrepancyCount);
}