import db from "./database";
import { readFileSync } from "fs";
import { join } from "path";

const schema = readFileSync(join(__dirname, "schema.sql"), "utf-8");
db.exec(schema);

// Members
db.prepare("INSERT OR IGNORE INTO members (id, email, first_name, last_name) VALUES (?, ?, ?, ?)").run("m-1", "alice@alan.com", "Alice", "Martin");
db.prepare("INSERT OR IGNORE INTO members (id, email, first_name, last_name) VALUES (?, ?, ?, ?)").run("m-2", "bob@alan.com", "Bob", "Dupont");
db.prepare("INSERT OR IGNORE INTO members (id, email, first_name, last_name) VALUES (?, ?, ?, ?)").run("m-3", "carol@alan.com", "Carol", "Leroy");

// Contracts
db.prepare("INSERT OR IGNORE INTO contracts (member_id, plan) VALUES (?, ?)").run("m-1", "basic");
db.prepare("INSERT OR IGNORE INTO contracts (member_id, plan) VALUES (?, ?)").run("m-2", "comfort");
db.prepare("INSERT OR IGNORE INTO contracts (member_id, plan) VALUES (?, ?)").run("m-3", "premium");

// Acts
db.prepare("INSERT OR IGNORE INTO acts (code, label, category) VALUES (?, ?, ?)").run("CONS001", "Consultation généraliste", "consultation");
db.prepare("INSERT OR IGNORE INTO acts (code, label, category) VALUES (?, ?, ?)").run("SPEC001", "Consultation spécialiste", "specialist");
db.prepare("INSERT OR IGNORE INTO acts (code, label, category) VALUES (?, ?, ?)").run("DENT001", "Soin dentaire", "dental");
db.prepare("INSERT OR IGNORE INTO acts (code, label, category) VALUES (?, ?, ?)").run("OPT001", "Montures optiques", "optical");

// Claims approved
db.prepare("INSERT INTO claims (member_id, act_code, amount_cents, status) VALUES (?, ?, ?, ?)").run("m-1", "CONS001", 10000, "approved");
db.prepare("INSERT INTO claims (member_id, act_code, amount_cents, status) VALUES (?, ?, ?, ?)").run("m-2", "SPEC001", 5000, "approved");
db.prepare("INSERT INTO claims (member_id, act_code, amount_cents, status) VALUES (?, ?, ?, ?)").run("m-3", "DENT001", 8000, "approved");
// Claim pending — non éligible
db.prepare("INSERT INTO claims (member_id, act_code, amount_cents, status) VALUES (?, ?, ?, ?)").run("m-1", "OPT001", 30000, "pending");

console.log("✅ Seed complete");
