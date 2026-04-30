import { test, expect } from "./test-runner";
import { processDocument, processBatch } from "./document-pipeline";

const config = {
  minTranscriptionConfidence: 0.6,
  minClassificationScore: 0.7,
  requiredFields: ["amount", "date", "member_id"],
};

// --- processDocument ---

test("processDocument: validates a fully compliant document", () => {
  const result = processDocument(
    "DOC-001",
    { text: "Facture CHU Lyon 150€", confidence: 0.92 },
    { category: "invoice", score: 0.85 },
    { fields: { amount: "150", date: "2024-03-01", member_id: "M-001" }, complete: true },
    config
  );
  expect(result.status).toBe("validated");
  expect(result.category).toBe("invoice");
});

test("processDocument: pass when confidence score is equals to minTranscriptionConfidence config", () => {
  const result = processDocument(
    "DOC-001",
    { text: "Facture CHU Lyon - 150€ - M-001 - 01/03/2024", confidence: 0.6 },
    { category: "invoice", score: 0.88 },
    { fields: { amount: "150", date: "2024-03-01", member_id: "M-001" }, complete: true },
    config
  );
  expect(result.status).toBe("validated");
});


test("processDocument: fails at transcription when confidence is too low", () => {
  const result = processDocument(
    "DOC-002",
    { text: "...", confidence: 0.3 },
    { category: "invoice", score: 0.85 },
    { fields: { amount: "150", date: "2024-03-01", member_id: "M-001" }, complete: true },
    config
  );
  expect(result.status).toBe("review_needed");
  expect(result.failedStep).toBe("transcription");
});

test("processDocument: fails at classification when category is unknown", () => {
  const result = processDocument(
    "DOC-003",
    { text: "document illisible", confidence: 0.85 },
    { category: "unknown", score: 0.4 },
    { fields: { amount: "50", date: "2024-03-01", member_id: "M-002" }, complete: true },
    config
  );
  expect(result.status).toBe("review_needed");
  expect(result.failedStep).toBe("classification");
});


// --- processBatch ---

test("processBatch: returns correct totals for a mixed batch", () => {
  const summary = processBatch(
    [
      {
        id: "DOC-001",
        transcription: { text: "ok", confidence: 0.9 },
        classification: { category: "invoice", score: 0.85 },
        extraction: { fields: { amount: "150", date: "2024-03-01", member_id: "M-001" }, complete: true },
      },
      {
        id: "DOC-002",
        transcription: { text: "...", confidence: 0.2 },
        classification: { category: "invoice", score: 0.85 },
        extraction: { fields: { amount: "150", date: "2024-03-01", member_id: "M-001" }, complete: true },
      },
    ],
    config
  );
  expect(summary.total).toBe(2);
  expect(summary.validated).toBe(1);
  expect(summary.reviewNeeded).toBe(1);
});
