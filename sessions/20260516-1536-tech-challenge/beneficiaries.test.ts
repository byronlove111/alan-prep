import { test, expect } from "./test-runner";
import { BeneficiariesService } from "./src/services/beneficiariesService";
import { MembersRepository } from "./src/repositories/membersRepository";
import { BeneficiaryRepository } from "./src/repositories/beneficiariesRepository";
import { ContractsRepository } from "./src/repositories/contractsRepository";
import db from "./db/database";
import { readFileSync } from "fs";
import { join } from "path";

const schema = readFileSync(join(__dirname, "db/schema.sql"), "utf-8");
db.exec(schema);

function resetDb() {
  db.exec("DELETE FROM beneficiaries; DELETE FROM contracts; DELETE FROM members;");
  db.prepare("INSERT INTO members (id, email, first_name, last_name) VALUES (?, ?, ?, ?)").run("m-1", "alice@test.com", "Alice", "Martin");
  db.prepare("INSERT INTO contracts (member_id, status, plan) VALUES (?, ?, ?)").run("m-1", "active", "comfort");
}

const service = new BeneficiariesService(
  new MembersRepository(),
  new BeneficiaryRepository(),
  new ContractsRepository(),
);

test("adds a beneficiary successfully when all conditions are met", () => {
  resetDb();
  const result = service.addBeneficiary("m-1", {
    type: "child",
    first_name: "Tom",
    last_name: "Martin",
    birth_date: "2018-03-15",
  });
  expect(result.member_id).toBe("m-1");
  expect(result.type).toBe("child");
  expect(result.first_name).toBe("Tom");
});

test("throws 404 when member does not exist", () => {
  resetDb();
  try {
    service.addBeneficiary("m-unknown", {
      type: "child",
      first_name: "Tom",
      last_name: "Martin",
      birth_date: "2018-03-15",
    });
    throw new Error("Expected an error to be thrown");
  } catch (e: any) {
    expect(e.statusCode).toBe(404);
  }
});

test("throws 422 when member has no active contract", () => {
  resetDb();
  db.prepare("UPDATE contracts SET status = 'expired' WHERE member_id = ?").run("m-1");
  try {
    service.addBeneficiary("m-1", {
      type: "child",
      first_name: "Tom",
      last_name: "Martin",
      birth_date: "2018-03-15",
    });
    throw new Error("Expected an error to be thrown");
  } catch (e: any) {
    expect(e.statusCode).toBe(422);
  }
});

test("throws 422 when max beneficiaries reached", () => {
  resetDb();
  for (let i = 0; i < 5; i++) {
    db.prepare("INSERT INTO beneficiaries (member_id, type, first_name, last_name, birth_date) VALUES (?, ?, ?, ?, ?)").run("m-1", "child", `Child${i}`, "Martin", "2018-01-01");
  }
  try {
    service.addBeneficiary("m-1", {
      type: "child",
      first_name: "Tom",
      last_name: "Martin",
      birth_date: "2018-03-15",
    });
    throw new Error("Expected an error to be thrown");
  } catch (e: any) {
    expect(e.statusCode).toBe(422);
  }
});

test("throws 422 when adding a second spouse", () => {
  resetDb();
  db.prepare("INSERT INTO beneficiaries (member_id, type, first_name, last_name, birth_date) VALUES (?, ?, ?, ?, ?)").run("m-1", "spouse", "Marie", "Martin", "1990-05-20");
  try {
    service.addBeneficiary("m-1", {
      type: "spouse",
      first_name: "Sophie",
      last_name: "Dupont",
      birth_date: "1992-08-10",
    });
    throw new Error("Expected an error to be thrown");
  } catch (e: any) {
    expect(e.statusCode).toBe(422);
  }
});
