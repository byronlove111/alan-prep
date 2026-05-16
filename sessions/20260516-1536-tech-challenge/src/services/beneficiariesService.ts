import { AppError } from "../errors/AppError";
import { BeneficiaryRepository } from "../repositories/beneficiariesRepository";
import { ContractsRepository } from "../repositories/contractsRepository";
import { MembersRepository } from "../repositories/membersRepository";
import { AddBeneficiaryInput, BeneficiaryRecord } from "../types";

export class BeneficiariesService {
  constructor(
    private membersRepo: MembersRepository,
    private beneficiaryRepo: BeneficiaryRepository,
    private contractsRepo: ContractsRepository,
  ) {}

  addBeneficiary(memberId: string, data: AddBeneficiaryInput): BeneficiaryRecord {
    const member = this.membersRepo.findById(memberId);
    if (!member) throw new AppError("Member not found", 404);

    const contract = this.contractsRepo.findActiveByMemberId(memberId);
    if (!contract) throw new AppError("Member does not have an active contract", 422);

    const beneficiaries = this.beneficiaryRepo.findByMemberId(memberId);

    if (beneficiaries.length >= 5) {
      throw new AppError("Maximum number of beneficiaries reached", 422);
    }

    if (data.type === "spouse" && beneficiaries.some(b => b.isSpouse())) {
      throw new AppError("Member already has a spouse beneficiary", 422);
    }

    const created = this.beneficiaryRepo.create(memberId, data);
    return created.toRecord();
  }
}
