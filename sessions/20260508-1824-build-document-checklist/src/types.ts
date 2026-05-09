export type PlanType = "basic" | "premium" | "premium_plus";
export type DocumentType = "identity" | "rib" | "medical_certificate" | "employer_attestation";
export type DocumentStatus = "received" | "pending" | "rejected";
export type ActivationStatus = "ready" | "incomplete" | "blocked";

export interface Member {
  memberId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Contract {
  contractId: string;
  memberId: string;
  plan: PlanType;
  status: "pending_activation" | "active" | "terminated";
}

export interface MemberDocument {
  memberId: string;
  documentType: DocumentType;
  status: DocumentStatus;
}

export interface DocumentCheckResult {
  documentType: DocumentType;
  required: boolean;
  status: DocumentStatus | "missing";
}

export interface ActivationReport {
  memberId: string;
  contractId: string;
  plan: PlanType;
  activationStatus: ActivationStatus;
  missingDocuments: DocumentType[];
  rejectedDocuments: DocumentType[];
  checklist: DocumentCheckResult[];
}
