CREATE TABLE IF NOT EXISTS members (
  id         TEXT PRIMARY KEY,
  email      TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS contracts (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  member_id  TEXT NOT NULL REFERENCES members(id),
  status     TEXT NOT NULL DEFAULT 'active',
  plan       TEXT NOT NULL DEFAULT 'basic',
  started_at TIMESTAMP NOT NULL DEFAULT (datetime('now'))
);

-- Table des actes médicaux avec leur catégorie
CREATE TABLE IF NOT EXISTS acts (
  code     TEXT PRIMARY KEY,
  label    TEXT NOT NULL,
  category TEXT NOT NULL  -- consultation | specialist | dental | optical
);

CREATE TABLE IF NOT EXISTS claims (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  member_id    TEXT NOT NULL REFERENCES members(id),
  act_code     TEXT NOT NULL REFERENCES acts(code),
  amount_cents INTEGER NOT NULL,
  status       TEXT NOT NULL DEFAULT 'pending',
  submitted_at TIMESTAMP NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS reimbursements (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  claim_id     INTEGER NOT NULL UNIQUE REFERENCES claims(id),
  member_id    TEXT NOT NULL REFERENCES members(id),
  amount_cents INTEGER NOT NULL,
  created_at   TIMESTAMP NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS job_locks (
  job_name  TEXT PRIMARY KEY,
  locked_at TIMESTAMP NOT NULL,
  locked_by TEXT NOT NULL
);
