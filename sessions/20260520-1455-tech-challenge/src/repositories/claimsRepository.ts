import db from "../../db/database";
import { Claim } from "../domain/claim";
import { ActCategory, ClaimRecord } from "../types";

export class ClaimsRepository {
  findApprovedWithoutReimbursement() {
    const raw = db
      .prepare(
        `
  SELECT claims.*, acts.category
  FROM claims
  LEFT JOIN reimbursements ON reimbursements.claim_id = claims.id
  JOIN acts ON acts.code = claims.act_code
  WHERE claims.status = 'approved'
  AND reimbursements.id IS NULL
`,
      )
      .all() as (ClaimRecord & { category: ActCategory })[];
    return raw.map((row) => new Claim(row));
  }
}
