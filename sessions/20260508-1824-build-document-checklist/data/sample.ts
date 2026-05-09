import type { Contract, Member, MemberDocument } from "../src/types";

export const sampleMembers: Member[] = [
  {
    memberId: "m-001",
    firstName: "Sophie",
    lastName: "Martin",
    email: "sophie.martin@example.com",
  },
  {
    memberId: "m-002",
    firstName: "Julien",
    lastName: "Dupont",
    email: "julien.dupont@example.com",
  },
  {
    memberId: "m-003",
    firstName: "Camille",
    lastName: "Leroy",
    email: "camille.leroy@example.com",
  },
];

export const sampleContracts: Contract[] = [
  {
    contractId: "c-001",
    memberId: "m-001",
    plan: "basic",
    status: "pending_activation",
  },
  {
    contractId: "c-002",
    memberId: "m-002",
    plan: "premium",
    status: "active",
  },
  {
    contractId: "c-003",
    memberId: "m-003",
    plan: "premium_plus",
    status: "pending_activation",
  },
];

export const sampleDocuments: MemberDocument[] = [
  { memberId: "m-001", documentType: "identity", status: "received" },
  { memberId: "m-001", documentType: "rib", status: "received" },
  { memberId: "m-003", documentType: "identity", status: "received" },
  { memberId: "m-003", documentType: "rib", status: "pending" },
  { memberId: "m-003", documentType: "medical_certificate", status: "rejected" },
];
