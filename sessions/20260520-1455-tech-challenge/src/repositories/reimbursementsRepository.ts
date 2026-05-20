import db from "../../db/database";

export class ReimbursementsRepository {
  create(claimId: number, memberId: string, amount: number): void {
    const raw = db
      .prepare(
        "INSERT INTO reimbursements (claim_id, member_id, amount_cents) VALUES (?, ?, ?)",
      )
      .run(claimId, memberId, amount);
  }
}
