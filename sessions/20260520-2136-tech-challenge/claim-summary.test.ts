import { readFileSync } from "fs";
import { join } from "path";
import db from "./db/database";
import { expect, run, test } from "./test-runner";

const schema = readFileSync(join(__dirname, "db/schema.sql"), "utf-8");

function resetDb() {
  db.exec(schema);

  db.prepare("INSERT INTO members (id, email, first_name, last_name) VALUES (?, ?, ?, ?)").run(
    "member-1",
    "alice@alan.fake",
    "Alice",
    "Martin",
  );
  db.prepare("INSERT INTO members (id, email, first_name, last_name) VALUES (?, ?, ?, ?)").run(
    "member-2",
    "bob@alan.fake",
    "Bob",
    "Dupont",
  );
}

function insertClaim(input: {
  memberId: string;
  careCategory: string;
  providerName: string;
  amountCents: number;
  status: string;
  occurredAt: string;
  submittedAt: string;
}) {
  const result = db.prepare(
    [
      "INSERT INTO claims (member_id, care_category, provider_name, amount_cents, status, occurred_at, submitted_at)",
      "VALUES (?, ?, ?, ?, ?, ?, ?)",
    ].join(" "),
  ).run(
    input.memberId,
    input.careCategory,
    input.providerName,
    input.amountCents,
    input.status,
    input.occurredAt,
    input.submittedAt,
  );

  return Number(result.lastInsertRowid);
}

function insertReimbursement(claimId: number, amountCents: number, reimbursedAt: string) {
  db.prepare("INSERT INTO reimbursements (claim_id, amount_cents, reimbursed_at) VALUES (?, ?, ?)").run(
    claimId,
    amountCents,
    reimbursedAt,
  );
}

function createService(): any {
  try {
    const module = require("./src/services/claimsSummaryService");

    if (typeof module.ClaimsSummaryService !== "function") {
      throw new Error("ClaimsSummaryService export is missing");
    }

    return new module.ClaimsSummaryService();
  } catch (error: any) {
    if (error?.code === "MODULE_NOT_FOUND") {
      throw new Error(
        "Create src/services/claimsSummaryService.ts and the repository classes it depends on.",
      );
    }

    throw error;
  }
}

test("aggregates canonical claims by category and ignores duplicates submitted within 24h", () => {
  resetDb();

  const consultationClaim = insertClaim({
    memberId: "member-1",
    careCategory: "consultation",
    providerName: "Cabinet Pasteur",
    amountCents: 5000,
    status: "approved",
    occurredAt: "2026-05-02T10:00:00.000Z",
    submittedAt: "2026-05-03T09:00:00.000Z",
  });

  insertClaim({
    memberId: "member-1",
    careCategory: "consultation",
    providerName: "cabinet pasteur",
    amountCents: 5000,
    status: "approved",
    occurredAt: "2026-05-02T10:15:00.000Z",
    submittedAt: "2026-05-03T17:00:00.000Z",
  });

  const dentalClaim = insertClaim({
    memberId: "member-1",
    careCategory: "dental",
    providerName: "Smile Care",
    amountCents: 6000,
    status: "approved",
    occurredAt: "2026-05-09T08:00:00.000Z",
    submittedAt: "2026-05-10T09:00:00.000Z",
  });

  insertClaim({
    memberId: "member-1",
    careCategory: "pharmacy",
    providerName: "Pharmacie Centrale",
    amountCents: 4000,
    status: "submitted",
    occurredAt: "2026-05-12T11:00:00.000Z",
    submittedAt: "2026-05-12T13:00:00.000Z",
  });

  insertReimbursement(consultationClaim, 3500, "2026-05-04T12:00:00.000Z");
  insertReimbursement(dentalClaim, 4100, "2026-05-11T08:30:00.000Z");

  const service = createService();
  const summary = service.getMemberClaimsSummary({ memberId: "member-1", month: "2026-05" });

  expect(summary).toEqual({
    memberId: "member-1",
    month: "2026-05",
    duplicateClaimsIgnored: 1,
    hasRecentDuplicate: true,
    totals: {
      claimCount: 3,
      totalClaimedCents: 15000,
      totalReimbursedCents: 7600,
    },
    categories: [
      {
        category: "consultation",
        claimCount: 1,
        claimedCents: 5000,
        reimbursedCents: 3500,
      },
      {
        category: "dental",
        claimCount: 1,
        claimedCents: 6000,
        reimbursedCents: 4100,
      },
      {
        category: "pharmacy",
        claimCount: 1,
        claimedCents: 4000,
        reimbursedCents: 0,
      },
    ],
  });
});

test("does not collapse similar claims when they were submitted more than 24h apart", () => {
  resetDb();

  insertClaim({
    memberId: "member-1",
    careCategory: "consultation",
    providerName: "Cabinet Pasteur",
    amountCents: 5000,
    status: "approved",
    occurredAt: "2026-05-02T10:00:00.000Z",
    submittedAt: "2026-05-03T09:00:00.000Z",
  });

  insertClaim({
    memberId: "member-1",
    careCategory: "consultation",
    providerName: "Cabinet Pasteur",
    amountCents: 5000,
    status: "approved",
    occurredAt: "2026-05-02T10:10:00.000Z",
    submittedAt: "2026-05-05T10:30:00.000Z",
  });

  const service = createService();
  const summary = service.getMemberClaimsSummary({ memberId: "member-1", month: "2026-05" });

  expect(summary.duplicateClaimsIgnored).toBe(0);
  expect(summary.totals.claimCount).toBe(2);
  expect(summary.totals.totalClaimedCents).toBe(10000);
});

test("filters claims to the requested month before aggregating", () => {
  resetDb();

  insertClaim({
    memberId: "member-1",
    careCategory: "optical",
    providerName: "Vision Plus",
    amountCents: 9000,
    status: "approved",
    occurredAt: "2026-04-28T10:00:00.000Z",
    submittedAt: "2026-04-29T10:00:00.000Z",
  });

  insertClaim({
    memberId: "member-1",
    careCategory: "optical",
    providerName: "Vision Plus",
    amountCents: 7000,
    status: "approved",
    occurredAt: "2026-05-15T10:00:00.000Z",
    submittedAt: "2026-05-15T11:00:00.000Z",
  });

  const service = createService();
  const summary = service.getMemberClaimsSummary({ memberId: "member-1", month: "2026-05" });

  expect(summary.totals.claimCount).toBe(1);
  expect(summary.totals.totalClaimedCents).toBe(7000);
});

test("throws a not found error when the member does not exist", () => {
  resetDb();

  const service = createService();

  try {
    service.getMemberClaimsSummary({ memberId: "missing-member", month: "2026-05" });
    throw new Error("Expected service to throw");
  } catch (error: any) {
    expect(error.message).toBe("Member not found");
    expect(error.statusCode).toBe(404);
  }
});

void run();
