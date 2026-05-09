import { generateActivationReport } from "../src/checklist";
import type { Contract, Member, MemberDocument } from "../src/types";

const members: Member[] = [
  { memberId: "m-001", firstName: "Sophie", lastName: "Martin", email: "sophie.martin@example.com" },
  { memberId: "m-002", firstName: "Julien", lastName: "Dupont", email: "julien.dupont@example.com" },
];

const contracts: Contract[] = [
  { contractId: "c-001", memberId: "m-001", plan: "basic", status: "pending_activation" },
  { contractId: "c-002", memberId: "m-002", plan: "premium", status: "active" },
];

// --- null when no pending_activation contract ---

test("returns null when no pending_activation contract exists for member", () => {
  const result = generateActivationReport("m-002", members, contracts, []);
  expect(result).toBeNull();
});

test("returns null when member has no contract at all", () => {
  const result = generateActivationReport("m-999", members, contracts, []);
  expect(result).toBeNull();
});

// --- basic plan: "ready" ---

test("returns activationStatus 'ready' when all required docs received (basic plan)", () => {
  const documents: MemberDocument[] = [
    { memberId: "m-001", documentType: "identity", status: "received" },
    { memberId: "m-001", documentType: "rib", status: "received" },
  ];
  const report = generateActivationReport("m-001", members, contracts, documents);
  expect(report).toBeTruthy();
  expect(report!.activationStatus).toBe("ready");
  expect(report!.missingDocuments).toEqual([]);
  expect(report!.rejectedDocuments).toEqual([]);
});

// --- incomplete: missing doc ---

test("returns activationStatus 'incomplete' when a required doc is missing", () => {
  const documents: MemberDocument[] = [
    { memberId: "m-001", documentType: "identity", status: "received" },
    // rib is missing
  ];
  const report = generateActivationReport("m-001", members, contracts, documents);
  expect(report!.activationStatus).toBe("incomplete");
  expect(report!.missingDocuments).toContain("rib");
});

// --- incomplete: pending doc ---

test("returns activationStatus 'incomplete' when a required doc is pending", () => {
  const documents: MemberDocument[] = [
    { memberId: "m-001", documentType: "identity", status: "received" },
    { memberId: "m-001", documentType: "rib", status: "pending" },
  ];
  const report = generateActivationReport("m-001", members, contracts, documents);
  expect(report!.activationStatus).toBe("incomplete");
  expect(report!.missingDocuments).toEqual([]);
});

// --- blocked: rejected doc ---

test("returns activationStatus 'blocked' when a required doc is rejected", () => {
  const documents: MemberDocument[] = [
    { memberId: "m-001", documentType: "identity", status: "rejected" },
    { memberId: "m-001", documentType: "rib", status: "received" },
  ];
  const report = generateActivationReport("m-001", members, contracts, documents);
  expect(report!.activationStatus).toBe("blocked");
  expect(report!.rejectedDocuments).toContain("identity");
});

// --- blocked takes priority over incomplete ---

test("'blocked' takes priority over 'incomplete' when both rejected and missing docs exist", () => {
  const documents: MemberDocument[] = [
    { memberId: "m-001", documentType: "identity", status: "rejected" },
    // rib is missing
  ];
  const report = generateActivationReport("m-001", members, contracts, documents);
  expect(report!.activationStatus).toBe("blocked");
  expect(report!.rejectedDocuments).toContain("identity");
  expect(report!.missingDocuments).toContain("rib");
});

// --- checklist shape ---

test("checklist contains one entry per required document with correct status", () => {
  const documents: MemberDocument[] = [
    { memberId: "m-001", documentType: "identity", status: "received" },
    // rib missing
  ];
  const report = generateActivationReport("m-001", members, contracts, documents);
  expect(report!.checklist).toHaveLength(2);

  const identityEntry = report!.checklist.find((c) => c.documentType === "identity");
  expect(identityEntry!.status).toBe("received");
  expect(identityEntry!.required).toBe(true);

  const ribEntry = report!.checklist.find((c) => c.documentType === "rib");
  expect(ribEntry!.status).toBe("missing");
  expect(ribEntry!.required).toBe(true);
});

// --- missingDocuments only contains actually missing docs ---

test("missingDocuments does not include pending or rejected documents", () => {
  const documents: MemberDocument[] = [
    { memberId: "m-001", documentType: "identity", status: "pending" },
    { memberId: "m-001", documentType: "rib", status: "rejected" },
  ];
  const report = generateActivationReport("m-001", members, contracts, documents);
  expect(report!.missingDocuments).toEqual([]);
  expect(report!.rejectedDocuments).toContain("rib");
});

// --- report metadata ---

test("report carries correct memberId, contractId, and plan", () => {
  const documents: MemberDocument[] = [
    { memberId: "m-001", documentType: "identity", status: "received" },
    { memberId: "m-001", documentType: "rib", status: "received" },
  ];
  const report = generateActivationReport("m-001", members, contracts, documents);
  expect(report!.memberId).toBe("m-001");
  expect(report!.contractId).toBe("c-001");
  expect(report!.plan).toBe("basic");
});

// === test premium_plus plan ---

test("report should fails due to missing documents on premium plan", () => {
  const documents: MemberDocument[] = [
    { memberId: "m-002", documentType: "identity", status: "received" },
    { memberId: "m-002", documentType: "rib", status: "received" },
  ];
  const contracts: Contract[] = [
    { contractId: "c-002", memberId: "m-002", plan: "premium", status: "pending_activation" },
  ];
  
  const report = generateActivationReport("m-002", members, contracts, documents);
  expect(report!.memberId).toBe("m-002");
  expect(report!.activationStatus).toBe("incomplete");
  expect(report!.contractId).toBe("c-002");
  expect(report!.plan).toBe("premium");
});

test("report should pass on premium plan fully submitted", () => {
  const documents: MemberDocument[] = [
    { memberId: "m-002", documentType: "identity", status: "received" },
    { memberId: "m-002", documentType: "rib", status: "received" },
    { memberId: "m-002", documentType: "medical_certificate", status: "received" },
    { memberId: "m-002", documentType: "employer_attestation", status: "received" },
  ];
  const contracts: Contract[] = [
    { contractId: "c-002", memberId: "m-002", plan: "premium", status: "pending_activation" },
  ];
  
  const report = generateActivationReport("m-002", members, contracts, documents);
  expect(report!.memberId).toBe("m-002");
  expect(report!.activationStatus).toBe("ready");
  expect(report!.contractId).toBe("c-002");
  expect(report!.plan).toBe("premium");
});
