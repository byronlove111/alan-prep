import db from "../../db/database";
import { BeneficiaryRecord } from "../types";
import { Beneficiary } from "../domain/Beneficiary";

export class BeneficiaryRepository {
  constructor() {}

  findByMemberId(memberId: string): Beneficiary[] {
    const raw = db
      .prepare("SELECT * FROM beneficiaries WHERE member_id = ?")
      .all(memberId) as BeneficiaryRecord[];
    return raw.map((record) => new Beneficiary(record));
  }

  create(memberId: string, input: { type: string; first_name: string; last_name: string; birth_date: string }): Beneficiary {
    const raw = db
      .prepare(
        "INSERT INTO beneficiaries (member_id, type, first_name, last_name, birth_date) VALUES (?, ?, ?, ?, ?)",
      )
      .run(
        memberId,
        input.type,
        input.first_name,
        input.last_name,
        input.birth_date,
      );

    const record = db
      .prepare("SELECT * FROM beneficiaries WHERE id = ?")
      .get(raw.lastInsertRowid) as BeneficiaryRecord;

    const beneficiary = new Beneficiary(record);
    return beneficiary;
  }
}
