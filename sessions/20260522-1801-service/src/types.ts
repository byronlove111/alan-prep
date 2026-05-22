export type DocumentReviewStatus = "pending" | "confirmed" | "rejected";

export interface DocumentReviewRecord {
  id: string;
  documentId: string;
  status: DocumentReviewStatus;
  reviewerId: string;
  confirmedBy: string | null;
  confirmedAt: Date | null;
}

export interface ConfirmDocumentReviewCommand {
  reviewId: string;
  confirmedBy: string;
}

export interface ConfirmDocumentReviewResult {
  reviewId: string;
  documentId: string;
  status: "confirmed";
  message: string;
}
