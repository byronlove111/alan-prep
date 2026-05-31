INSERT INTO members (id, name) VALUES
  (1, 'Alice Martin'),
  (2, 'Bob Dupont');

INSERT INTO claims (id, member_id, amount, created_at) VALUES
  (1, 1, 120.0, '2024-01-10'),
  (2, 1, 45.5, '2024-02-15'),
  (3, 2, 80.0, '2024-01-20');
