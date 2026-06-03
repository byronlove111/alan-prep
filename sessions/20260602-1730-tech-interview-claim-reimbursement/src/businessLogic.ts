import Database from "better-sqlite3";
import { ClaimReimbursementAnalysis } from "./types";
import { getClaimsByMemberId, memberExists } from "./model";

export function analyzeMemberClaimReimbursements(
  db: Database.Database,
  memberId: number
): ClaimReimbursementAnalysis[] {
  // TODO: implémenter les règles métier (voir BRIEF.md)
  return [];
}
