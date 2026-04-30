// ============================================================
// Alan Tech Challenge — Document Validation Pipeline
// ============================================================
// Context:
//   Alan processes insurance documents (invoices, prescriptions, SS statements).
//   Each document goes through 3 validation steps: transcription → classification → extraction.
//   If ANY step fails its threshold, the document is routed to human review.
//   The pipeline must STOP EARLY — never produce bad data silently.
//
// Run tests: npx tsx document-pipeline.test.ts
// Run demo:  npx tsx main.ts
// ============================================================

export type ValidationStatus = "validated" | "review_needed";
export type DocumentCategory = "invoice" | "prescription" | "ss_decompte" | "unknown";
export type FailedStep = "transcription" | "classification" | "extraction";

export interface DocumentConfig {
  minTranscriptionConfidence: number; // e.g. 0.6 — documents below this go to review
  minClassificationScore: number;     // e.g. 0.7 — weak classification goes to review
  requiredFields: string[];           // all must be present in extraction output
}

export interface TranscriptionResult {
  text: string;
  confidence: number; // 0 to 1
}

export interface ClassificationResult {
  category: DocumentCategory;
  score: number; // 0 to 1
}

export interface ExtractionResult {
  fields: Record<string, string>;
  complete: boolean;
}

export interface PipelineResult {
  documentId: string;
  status: ValidationStatus;
  failedStep?: FailedStep;
  category?: DocumentCategory;
  extractedFields?: Record<string, string>;
}

export interface BatchSummary {
  total: number;
  validated: number;
  reviewNeeded: number;
  failuresByStep: Record<string, number>;
}

// ------------------------------------------------------------
// TODO 1 — validateTranscription
// ------------------------------------------------------------
// Returns "validated" if confidence >= minTranscriptionConfidence
// Returns "review_needed" otherwise
// ------------------------------------------------------------
export function validateTranscription(
  result: TranscriptionResult,
  config: DocumentConfig
): ValidationStatus {
  if (result.confidence < config.minTranscriptionConfidence) {
    return "review_needed";
  }
  return "validated";
}

// ------------------------------------------------------------
// TODO 2 — validateClassification
// ------------------------------------------------------------
// Returns "validated" if score >= minClassificationScore AND category !== "unknown"
// Returns "review_needed" otherwise
// ------------------------------------------------------------
export function validateClassification(
  result: ClassificationResult,
  config: DocumentConfig
): ValidationStatus {
  if (result.score < config.minClassificationScore || result.category === "unknown") {
    return "review_needed";
  }
  return "validated";
}

// ------------------------------------------------------------
// TODO 3 — validateExtraction
// ------------------------------------------------------------
// Returns "validated" if complete === true AND all requiredFields are present in fields
// Returns "review_needed" otherwise
// ------------------------------------------------------------
export function validateExtraction(
  result: ExtractionResult,
  config: DocumentConfig
): ValidationStatus {
  if (!result.complete) return "review_needed";
  for (const field of config.requiredFields) {
    if (!(field in result.fields)) return "review_needed";
  }
  return "validated";
}

// ------------------------------------------------------------
// TODO 4 — processDocument
// ------------------------------------------------------------
// Runs all 3 steps in order. Stops at first failure.
// On failure: return { documentId, status: "review_needed", failedStep }
// On full success: return { documentId, status: "validated", category, extractedFields }
// ------------------------------------------------------------
export function processDocument(
  documentId: string,
  transcription: TranscriptionResult,
  classification: ClassificationResult,
  extraction: ExtractionResult,
  config: DocumentConfig
): PipelineResult {
  if (validateTranscription(transcription, config) === "review_needed") {
    return { documentId, status: "review_needed", failedStep: "transcription" };
  }
  if (validateClassification(classification, config) === "review_needed") {
    return { documentId, status: "review_needed", failedStep: "classification" };
  }
  if (validateExtraction(extraction, config) === "review_needed") {
    return { documentId, status: "review_needed", failedStep: "extraction" };
  }
  return {
    documentId,
    status: "validated",
    category: classification.category,
    extractedFields: extraction.fields,
  };
}

// ------------------------------------------------------------
// TODO 5 — processBatch
// ------------------------------------------------------------
// Processes a list of documents and returns a BatchSummary:
// - total, validated, reviewNeeded counts
// - failuresByStep: how many documents failed at each step
//   e.g. { transcription: 2, classification: 1 }
// ------------------------------------------------------------
export function processBatch(
  documents: Array<{
    id: string;
    transcription: TranscriptionResult;
    classification: ClassificationResult;
    extraction: ExtractionResult;
  }>,
  config: DocumentConfig
): BatchSummary {
  const summary: BatchSummary = {
    total: 0,
    validated: 0,
    reviewNeeded: 0,
    failuresByStep: {},
  }

  for (const document of documents){
    const processedDoc = processDocument(document.id, document.transcription, document.classification, document.extraction, config);
    summary.total += 1;
    if (processedDoc.status === "validated"){
      summary.validated += 1;
    } else {
      summary.reviewNeeded += 1;
    }
    if (processedDoc.failedStep) {
      const step = processedDoc.failedStep;
      summary.failuresByStep[step] = (summary.failuresByStep[step] ?? 0) + 1;
    }
  }
  return summary;
}
