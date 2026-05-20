import request from "supertest";
import { readFileSync } from "fs";
import { join } from "path";
import app from "./src/app";
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

test("GET /members/:memberId/claims/summary returns the monthly summary", async () => {
  resetDb();

  const firstClaim = insertClaim({
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

  insertReimbursement(firstClaim, 3500, "2026-05-04T12:00:00.000Z");

  const response = await request(app).get("/members/member-1/claims/summary?month=2026-05");

  expect(response.status).toBe(200);
  expect(response.body.memberId).toBe("member-1");
  expect(response.body.month).toBe("2026-05");
  expect(response.body.duplicateClaimsIgnored).toBe(1);
  expect(response.body.totals.totalClaimedCents).toBe(5000);
});

test("GET /members/:memberId/claims/summary validates the month query param", async () => {
  resetDb();

  const response = await request(app).get("/members/member-1/claims/summary");

  expect(response.status).toBe(400);
  expect(response.body).toEqual({ error: "month query param is required" });
});

test("GET /members/:memberId/claims/summary returns 404 for an unknown member", async () => {
  resetDb();

  const response = await request(app).get("/members/missing-member/claims/summary?month=2026-05");

  expect(response.status).toBe(404);
  expect(response.body).toEqual({ error: "Member not found" });
});

void run();
