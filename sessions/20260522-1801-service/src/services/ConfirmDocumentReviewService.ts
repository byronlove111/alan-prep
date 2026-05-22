import { documentReviewRepository } from "../repositories/documentReviewRepository.ts"
import { ConfirmDocumentReviewCommand, ConfirmDocumentReviewResult } from "../types.ts"

type Dependencies = {
  documentReviewRepository: DocumentReviewRepository;
  now: () => Date;
};

export class ConfirmDocumentReviewService {
  constructor(private readonly deps : Dependencies) {}

  async execute(command: ConfirmDocumentReviewCommand): Promise<ConfirmDocumentReviewResult> {
    if (!command.reviewId)
  }
}