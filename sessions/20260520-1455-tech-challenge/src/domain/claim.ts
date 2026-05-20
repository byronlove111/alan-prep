import { ActCategory, ClaimRecord, ContractPlan } from "../types";

export class Claim {
  private readonly data: ClaimRecord & { category: ActCategory };

  constructor(data: ClaimRecord & { category: ActCategory }) {
    this.data = data;
  }

  calculateReimbursement(plan: ContractPlan): number {
    let percentage: number = 0;

    if (plan === "basic") {
      percentage = 70;
    } else if (plan === "comfort") {
      percentage = 85;
    } else if (plan === "premium") {
      percentage = 100;
    }

    if (this.data.category === "dental") {
      percentage = Math.min(100, percentage + 10);
    } else if (this.data.category === "optical") {
      percentage = Math.min(100, percentage + 5);
    }

    return Math.floor((this.data.amount_cents * percentage) / 100);
  }

  getMember(): string {
    return this.data.member_id;
  }

  getClaimId(): number {
    return this.data.id;
  }
}
