CREATE TABLE companies (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE members (
  id INTEGER PRIMARY KEY,
  company_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE claims (
  id INTEGER PRIMARY KEY,
  member_id INTEGER NOT NULL,
  care_type TEXT NOT NULL,
  amount REAL NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (member_id) REFERENCES members(id)
);
