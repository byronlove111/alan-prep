INSERT INTO companies (id, name) VALUES
  (1, 'Alan Tech'),
  (2, 'Studio Co');

INSERT INTO members (id, company_id, name) VALUES
  (1, 1, 'Alice Martin'),
  (2, 1, 'Bob Dupont'),
  (3, 2, 'Clara Renard');

INSERT INTO claims (id, member_id, care_type, claimed_amount, reimbursed_amount, created_at) VALUES
  (1, 1, 'consultation', 100.0, 80.0, '2024-01-10'),
  (2, 1, 'pharmacy', 50.0, 30.0, '2024-02-15'),
  (3, 2, 'consultation', 120.0, 60.0, '2024-01-20');
