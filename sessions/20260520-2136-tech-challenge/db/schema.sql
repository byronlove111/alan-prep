DROP TABLE IF EXISTS reimbursements;
DROP TABLE IF EXISTS claims;
DROP TABLE IF EXISTS members;

CREATE TABLE members (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE claims (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  member_id TEXT NOT NULL,
  care_category TEXT NOT NULL CHECK (care_category IN ('consultation', 'dental', 'optical', 'pharmacy')),
  provider_name TEXT NOT NULL,
  amount_cents INTEGER NOT NULL CHECK (amount_cents >= 0),
  status TEXT NOT NULL CHECK (status IN ('submitted', 'approved', 'rejected')),
  occurred_at TEXT NOT NULL,
  submitted_at TEXT NOT NULL,
  FOREIGN KEY (member_id) REFERENCES members(id)
);

CREATE TABLE reimbursements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  claim_id INTEGER NOT NULL UNIQUE,
  amount_cents INTEGER NOT NULL CHECK (amount_cents >= 0),
  reimbursed_at TEXT NOT NULL,
  FOREIGN KEY (claim_id) REFERENCES claims(id)
);

CREATE INDEX idx_claims_member_submitted_at ON claims (member_id, submitted_at);
CREATE INDEX idx_reimbursements_claim_id ON reimbursements (claim_id);
