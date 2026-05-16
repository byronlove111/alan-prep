import { BeneficiaryRecord } from "../types";

export class Beneficiary {
  private readonly data: BeneficiaryRecord;
  constructor(data: BeneficiaryRecord) {
    this.data = data;
  }

  isSpouse(): boolean {
    return this.data.type === "spouse";
  }

  toRecord(): BeneficiaryRecord {
    return { ...this.data };
  }
}
