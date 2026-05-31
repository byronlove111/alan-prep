CREATE TABLE members (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE claims (
  id INTEGER PRIMARY KEY,
  member_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (member_id) REFERENCES members(id)
);
