-- ============================================================
-- DRILL SQL — Parcours débutant (10 exercices) — SOLUCE
-- ============================================================

-- @query 01
SELECT * FROM members;
-- @end 01

-- @query 02
SELECT name FROM members WHERE id = 1;
-- @end 02

-- @query 03
SELECT id, amount FROM claims;
-- @end 03

-- @query 04
SELECT id, amount FROM claims WHERE member_id = 1;
-- @end 04

-- @query 05
SELECT id, amount FROM claims WHERE member_id = 1 ORDER BY created_at ASC;
-- @end 05

-- @query 06
SELECT m.name, c.amount
FROM members m
INNER JOIN claims c ON c.member_id = m.id;
-- @end 06

-- @query 07
SELECT m.name, c.amount
FROM members m
INNER JOIN claims c ON c.member_id = m.id
WHERE m.id = 1;
-- @end 07

-- @query 08
SELECT
  c.id AS claim_id,
  m.name AS member_name,
  c.amount AS amount,
  c.created_at AS created_at
FROM members m
INNER JOIN claims c ON c.member_id = m.id
WHERE m.id = 1
ORDER BY c.created_at ASC;
-- @end 08

-- @query 09
SELECT c.id, m.name, c.amount
FROM members m
INNER JOIN claims c ON c.member_id = m.id
WHERE m.id = 2;
-- @end 09

-- @query 10
SELECT m.name, c.amount
FROM members m
INNER JOIN claims c ON c.member_id = m.id
ORDER BY c.amount DESC;
-- @end 10
