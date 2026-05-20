import { ContractPlan } from "../types";
import db from "../../db/database";

export class ContractsRepository {
  findActiveByMemberId(memberId: string): ContractPlan | undefined {
    const raw = db
      .prepare(
        "SELECT plan FROM contracts WHERE member_id = ? AND status = 'active'",
      )
      .get(memberId) as { plan: ContractPlan } | undefined;
    return raw?.plan;
  }
}
