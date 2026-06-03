import Database from "better-sqlite3";
import { ClaimRow } from "./types";

export function memberExists(db: Database.Database, memberId: number): boolean {
  const row = db
    .prepare("SELECT 1 FROM members WHERE id = ?")
    .get(memberId);
  return row !== undefined;
}

export function getClaimsByMemberId(
  db: Database.Database,
  memberId: number
): ClaimRow[] {
  // TODO: complète cette requête — claims d'UN membre, triées par date ASC
  const rows = db
    .prepare(
      `
      SELECT
        id,
        care_type AS careType,
        claimed_amount AS claimedAmount,
        reimbursed_amount AS reimbursedAmount,
        created_at AS createdAt
      FROM claims
      ORDER BY created_at ASC
    `
    )
    .all() as ClaimRow[];

  return rows;
}
