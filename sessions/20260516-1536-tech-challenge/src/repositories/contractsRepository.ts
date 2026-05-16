import db from "../../db/database";
import { ContractRecord } from "../types";

export class ContractsRepository {
  constructor() {}

  findActiveByMemberId(memberId: string): ContractRecord | undefined {
    const raw = db
      .prepare(
        "SELECT * FROM contracts WHERE member_id = ? AND status = 'active'",
      )
      .get(memberId);

    return raw as ContractRecord | undefined;
  }
}
