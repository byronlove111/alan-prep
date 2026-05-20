import { ClaimsRepository } from "../repositories/claimsRepository";
import { ContractsRepository } from "../repositories/contractsRepository";
import { ReimbursementsRepository } from "../repositories/reimbursementsRepository";

export class ProcessReimbursementsJob {
  private claimsRepo = new ClaimsRepository();
  private contractsRepo = new ContractsRepository();
  private reimbursementsRepo = new ReimbursementsRepository();

  constructor() {}
  run() {
    let processed = 0;
    let created = 0;
    let errors = 0;

    const claims = this.claimsRepo.findApprovedWithoutReimbursement();

    for (const claim of claims) {
      processed++;
      const plan = this.contractsRepo.findActiveByMemberId(claim.getMember());
      if (!plan) {
        errors++;
        continue;
      }
      try {
        const totalToReimburse = claim.calculateReimbursement(plan);
        this.reimbursementsRepo.create(
          claim.getClaimId(),
          claim.getMember(),
          totalToReimburse,
        );
        created++;
      } catch {
        errors++;
      }
    }
    return { processed, created, errors };
  }
}
