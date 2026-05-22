import { ConflictError, NotFoundError, ValidationError } from "./src/errors";
import { InMemoryDocumentReviewRepository } from "./src/repositories/documentReviewRepository";
import { ConfirmDocumentReviewService } from "./src/services/confirmDocumentReviewService";
import { DocumentReviewRecord } from "./src/types";

const fixedNow = new Date("2026-05-22T16:00:00.000Z");

function createService(records: DocumentReviewRecord[] = []) {
  const documentReviewRepository = new InMemoryDocumentReviewRepository(records);

  const service = new ConfirmDocumentReviewService({
    documentReviewRepository,
    now: () => fixedNow,
  });

  return {
    service,
    documentReviewRepository,
  };
}

describe("ConfirmDocumentReviewService", () => {
  const pendingReview: DocumentReviewRecord = {
    id: "review-1",
    documentId: "document-42",
    status: "pending",
    reviewerId: "reviewer-7",
    confirmedBy: null,
    confirmedAt: null,
  };

  it("confirms a pending document review", async () => {
    const { service, documentReviewRepository } = createService([pendingReview]);

    await expect(
      service.execute({
        reviewId: "review-1",
        confirmedBy: "agent-9",
      }),
    ).resolves.toEqual({
      reviewId: "review-1",
      documentId: "document-42",
      status: "confirmed",
      message: "Document review confirmed",
    });

    expect(documentReviewRepository.records).toEqual([
      {
        id: "review-1",
        documentId: "document-42",
        status: "confirmed",
        reviewerId: "reviewer-7",
        confirmedBy: "agent-9",
        confirmedAt: fixedNow,
      },
    ]);
  });

  it("rejects an empty reviewId", async () => {
    const { service } = createService([pendingReview]);

    await expect(
      service.execute({
        reviewId: "",
        confirmedBy: "agent-9",
      }),
    ).rejects.toEqual(new ValidationError("reviewId must not be empty"));
  });

  it("fails when the review does not exist", async () => {
    const { service } = createService();

    await expect(
      service.execute({
        reviewId: "missing-review",
        confirmedBy: "agent-9",
      }),
    ).rejects.toEqual(new NotFoundError("Document review not found"));
  });

  it("rejects a review that is already confirmed", async () => {
    const { service } = createService([
      {
        ...pendingReview,
        status: "confirmed",
        confirmedBy: "agent-1",
        confirmedAt: new Date("2026-05-21T10:00:00.000Z"),
      },
    ]);

    await expect(
      service.execute({
        reviewId: "review-1",
        confirmedBy: "agent-9",
      }),
    ).rejects.toEqual(new ConflictError("Document review is already confirmed"));
  });

  it("rejects a review that was rejected", async () => {
    const { service } = createService([
      {
        ...pendingReview,
        status: "rejected",
      },
    ]);

    await expect(
      service.execute({
        reviewId: "review-1",
        confirmedBy: "agent-9",
      }),
    ).rejects.toEqual(
      new ConflictError("Only pending document reviews can be confirmed"),
    );
  });
});
