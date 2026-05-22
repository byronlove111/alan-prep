import { DocumentReviewRecord } from "../types";

export interface UpdateDocumentReviewInput {
  reviewId: string;
  status: "confirmed";
  confirmedBy: string;
  confirmedAt: Date;
}

export interface DocumentReviewRepository {
  findById(reviewId: string): Promise<DocumentReviewRecord | null>;
  confirm(input: UpdateDocumentReviewInput): Promise<DocumentReviewRecord>;
}

export class InMemoryDocumentReviewRepository
  implements DocumentReviewRepository
{
  public readonly records: DocumentReviewRecord[];

  constructor(records: DocumentReviewRecord[] = []) {
    this.records = [...records];
  }

  async findById(reviewId: string): Promise<DocumentReviewRecord | null> {
    return this.records.find((record) => record.id === reviewId) ?? null;
  }

  async confirm(
    input: UpdateDocumentReviewInput,
  ): Promise<DocumentReviewRecord> {
    const record = this.records.find((item) => item.id === input.reviewId);

    if (!record) {
      throw new Error(`Unknown review ${input.reviewId}`);
    }

    record.status = input.status;
    record.confirmedBy = input.confirmedBy;
    record.confirmedAt = input.confirmedAt;

    return record;
  }
}
