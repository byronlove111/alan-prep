import type { DocumentType, PlanType } from "./types";

const REQUIRED_DOCUMENTS: Record<PlanType, DocumentType[]> = {
  basic: ["identity", "rib"],
  premium: ["identity", "rib", "medical_certificate"],
  premium_plus: ["identity", "rib", "medical_certificate", "employer_attestation"],
};

export function getRequiredDocuments(plan: PlanType): DocumentType[] {
  return REQUIRED_DOCUMENTS[plan];
}
