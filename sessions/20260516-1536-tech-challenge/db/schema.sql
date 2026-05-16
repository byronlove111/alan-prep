CREATE TABLE IF NOT EXISTS members (
  id         TEXT PRIMARY KEY,
  email      TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  deleted_at TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS contracts (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  member_id  TEXT NOT NULL REFERENCES members(id),
  status     TEXT NOT NULL DEFAULT 'pending',
  plan       TEXT NOT NULL DEFAULT 'basic',
  started_at TIMESTAMP NOT NULL DEFAULT (datetime('now')),
  ended_at   TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS beneficiaries (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  member_id  TEXT NOT NULL REFERENCES members(id),
  type       TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  birth_date TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT (datetime('now'))
);
