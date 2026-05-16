import db from "./database";
import { readFileSync } from "fs";
import { join } from "path";

const schema = readFileSync(join(__dirname, "schema.sql"), "utf-8");
db.exec(schema);

db.prepare("INSERT OR IGNORE INTO members (id, email, first_name, last_name) VALUES (?, ?, ?, ?)").run("m-1", "alice@alan.com", "Alice", "Martin");
db.prepare("INSERT OR IGNORE INTO members (id, email, first_name, last_name) VALUES (?, ?, ?, ?)").run("m-2", "bob@alan.com", "Bob", "Dupont");
db.prepare("INSERT OR IGNORE INTO members (id, email, first_name, last_name) VALUES (?, ?, ?, ?)").run("m-3", "carol@alan.com", "Carol", "Leroy");

// m-1 : active contract, 1 existing beneficiary
db.prepare("INSERT OR IGNORE INTO contracts (member_id, status, plan) VALUES (?, ?, ?)").run("m-1", "active", "comfort");
db.prepare("INSERT INTO beneficiaries (member_id, type, first_name, last_name, birth_date) VALUES (?, ?, ?, ?, ?)").run("m-1", "child", "Lucas", "Martin", "2018-04-10");

// m-2 : expired contract
db.prepare("INSERT OR IGNORE INTO contracts (member_id, status, plan) VALUES (?, ?, ?)").run("m-2", "expired", "basic");

// m-3 : active contract, 5 beneficiaries (max reached)
db.prepare("INSERT OR IGNORE INTO contracts (member_id, status, plan) VALUES (?, ?, ?)").run("m-3", "active", "premium");
for (let i = 1; i <= 5; i++) {
  db.prepare("INSERT INTO beneficiaries (member_id, type, first_name, last_name, birth_date) VALUES (?, ?, ?, ?, ?)").run("m-3", "child", `Child${i}`, "Leroy", "2015-01-01");
}

console.log("✅ Seed complete");
