import { readFileSync } from "fs";
import { join } from "path";
import db from "./database";

const schema = readFileSync(join(__dirname, "schema.sql"), "utf-8");

db.exec(schema);

db.prepare(
  "INSERT INTO members (id, email, first_name, last_name) VALUES (?, ?, ?, ?)",
).run("member-1", "alice@alan.fake", "Alice", "Martin");

db.prepare(
  "INSERT INTO members (id, email, first_name, last_name) VALUES (?, ?, ?, ?)",
).run("member-2", "bob@alan.fake", "Bob", "Dupont");

const firstClaim = db.prepare(
  [
    "INSERT INTO claims (member_id, care_category, provider_name, amount_cents, status, occurred_at, submitted_at)",
    "VALUES (?, ?, ?, ?, ?, ?, ?)",
  ].join(" "),
).run("member-1", "consultation", "Cabinet Pasteur", 5000, "approved", "2026-05-02T10:00:00.000Z", "2026-05-03T09:00:00.000Z");

db.prepare(
  [
    "INSERT INTO claims (member_id, care_category, provider_name, amount_cents, status, occurred_at, submitted_at)",
    "VALUES (?, ?, ?, ?, ?, ?, ?)",
  ].join(" "),
).run("member-1", "consultation", "cabinet pasteur", 5000, "approved", "2026-05-02T10:30:00.000Z", "2026-05-03T17:00:00.000Z");

db.prepare(
  [
    "INSERT INTO claims (member_id, care_category, provider_name, amount_cents, status, occurred_at, submitted_at)",
    "VALUES (?, ?, ?, ?, ?, ?, ?)",
  ].join(" "),
).run("member-1", "dental", "Smile Care", 6000, "approved", "2026-05-09T08:00:00.000Z", "2026-05-10T09:00:00.000Z");

db.prepare(
  "INSERT INTO reimbursements (claim_id, amount_cents, reimbursed_at) VALUES (?, ?, ?)",
).run(firstClaim.lastInsertRowid, 3500, "2026-05-04T12:00:00.000Z");

console.log("Seeded claim summary session data.");
