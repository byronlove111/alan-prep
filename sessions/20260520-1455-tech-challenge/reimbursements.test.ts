import { test, expect } from "./test-runner";
import { ProcessReimbursementsJob } from "./src/services/processReimbursementsJob";
import db from "./db/database";
import { readFileSync } from "fs";
import { join } from "path";

const schema = readFileSync(join(__dirname, "db/schema.sql"), "utf-8");
db.exec(schema);

// Acts reference data
db.prepare("INSERT OR IGNORE INTO acts (code, label, category) VALUES (?, ?, ?)").run("CONS001", "Consultation", "consultation");
db.prepare("INSERT OR IGNORE INTO acts (code, label, category) VALUES (?, ?, ?)").run("DENT001", "Dentaire", "dental");

function resetDb() {
  db.exec("DELETE FROM job_locks; DELETE FROM reimbursements; DELETE FROM claims; DELETE FROM contracts; DELETE FROM members;");
  db.prepare("INSERT INTO members (id, email, first_name, last_name) VALUES (?, ?, ?, ?)").run("m-1", "alice@test.com", "Alice", "Martin");
  db.prepare("INSERT INTO members (id, email, first_name, last_name) VALUES (?, ?, ?, ?)").run("m-2", "bob@test.com", "Bob", "Dupont");
  db.prepare("INSERT INTO contracts (member_id, plan) VALUES (?, ?)").run("m-1", "basic");
  db.prepare("INSERT INTO contracts (member_id, plan) VALUES (?, ?)").run("m-2", "comfort");
}

function insertClaim(memberId: string, actCode: string, amountCents: number, status: string): number {
  const r = db.prepare("INSERT INTO claims (member_id, act_code, amount_cents, status) VALUES (?, ?, ?, ?)").run(memberId, actCode, amountCents, status);
  return r.lastInsertRowid as number;
}

const job = new ProcessReimbursementsJob();

test("creates reimbursements for all approved claims", () => {
  resetDb();
  insertClaim("m-1", "CONS001", 10000, "approved");
  insertClaim("m-2", "CONS001", 5000, "approved");
  const result = job.run();
  expect(result.created).toBe(2);
  expect(result.errors).toBe(0);
});

test("calculates amount correctly for plan basic — consultation (70%)", () => {
  resetDb();
  const claimId = insertClaim("m-1", "CONS001", 10000, "approved");
  job.run();
  const r = db.prepare("SELECT * FROM reimbursements WHERE claim_id = ?").get(claimId) as any;
  expect(r.amount_cents).toBe(7000);
});

test("calculates amount correctly for plan comfort — consultation (85%)", () => {
  resetDb();
  const claimId = insertClaim("m-2", "CONS001", 10000, "approved");
  job.run();
  const r = db.prepare("SELECT * FROM reimbursements WHERE claim_id = ?").get(claimId) as any;
  expect(r.amount_cents).toBe(8500);
});

test("is idempotent — running twice does not create duplicates", () => {
  resetDb();
  insertClaim("m-1", "CONS001", 10000, "approved");
  job.run();
  const result2 = job.run();
  expect(result2.created).toBe(0);
  const count = (db.prepare("SELECT COUNT(*) as n FROM reimbursements").get() as any).n;
  expect(count).toBe(1);
});

test("skips claims that are not approved", () => {
  resetDb();
  insertClaim("m-1", "CONS001", 10000, "pending");
  const result = job.run();
  expect(result.created).toBe(0);
});

test("dental acts get a bonus rate on top of base plan rate", () => {
  resetDb();
  // dental gets +10% on top of plan rate
  // basic dental = 70% + 10% = 80% → 8000 on 10000
  const claimId = insertClaim("m-1", "DENT001", 10000, "approved");
  job.run();
  const r = db.prepare("SELECT * FROM reimbursements WHERE claim_id = ?").get(claimId) as any;
  expect(r.amount_cents).toBe(8000);
});
