import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

export function createTestDatabase(): Database.Database {
  const db = new Database(":memory:");
  const base = path.join(__dirname, "..", "db");
  db.exec(fs.readFileSync(path.join(base, "schema.sql"), "utf8"));
  db.exec(fs.readFileSync(path.join(base, "seed.sql"), "utf8"));
  return db;
}
