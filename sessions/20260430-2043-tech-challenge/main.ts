import { processDocument, processBatch } from "./document-pipeline";

const config = {
  minTranscriptionConfidence: 0.6,
  minClassificationScore: 0.7,
  requiredFields: ["amount", "date", "member_id"],
};

// Single document — should be validated
const result = processDocument(
  "DOC-002",
  { text: "...", confidence: 0.3 },
  { category: "invoice", score: 0.85 },
  { fields: { amount: "150", date: "2024-03-01", member_id: "M-001" }, complete: true },
  config
);
// console.log("Single document result:", result);

// Batch of 3 documents with different failure modes
const summary = processBatch(
  [
    {
      id: "DOC-001",
      transcription: { text: "Facture CHU Lyon", confidence: 0.92 },
      classification: { category: "invoice", score: 0.88 },
      extraction: { fields: { amount: "150", date: "2024-03-01", member_id: "M-001" }, complete: true },
    },
    {
      id: "DOC-002",
      transcription: { text: "scan illisible", confidence: 0.2 },
      classification: { category: "unknown", score: 0.3 },
      extraction: { fields: {}, complete: false },
    },
    {
      id: "DOC-003",
      transcription: { text: "Ordonnance Dr. Martin", confidence: 0.85 },
      classification: { category: "prescription", score: 0.78 },
      extraction: { fields: { amount: "30", date: "2024-03-05", member_id: "M-002" }, complete: true },
    },
  ],
  config
);
console.log("Batch summary:", summary);
// Expected: { total: 3, validated: 2, reviewNeeded: 1, failuresByStep: { transcription: 1 } }
