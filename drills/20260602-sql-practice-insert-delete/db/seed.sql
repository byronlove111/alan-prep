INSERT INTO companies (id, name) VALUES
  (1, 'Alan Tech'),
  (2, 'Studio Co');

INSERT INTO members (id, company_id, name) VALUES
  (1, 1, 'Alice Martin'),
  (2, 1, 'Bob Dupont'),
  (3, 2, 'Clara Renard');

INSERT INTO claims (id, member_id, care_type, amount, created_at) VALUES
  (1, 1, 'consultation', 120.0, '2024-01-10'),
  (2, 1, 'pharmacy', 45.5, '2024-02-15'),
  (3, 2, 'consultation', 80.0, '2024-01-20'),
  (4, 3, 'optics', 150.0, '2024-03-01'),
  (5, 2, 'pharmacy', 22.0, '2024-02-01');
