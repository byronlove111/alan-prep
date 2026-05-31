-- ============================================================
-- DRILL SQL PRACTICE — 3 tables — SOLUCE
-- ============================================================

-- @query 01
SELECT
  m.name AS member_name,
  co.name AS company_name,
  cl.care_type AS care_type,
  cl.amount AS amount
FROM claims cl
INNER JOIN members m ON cl.member_id = m.id
INNER JOIN companies co ON m.company_id = co.id
ORDER BY cl.created_at ASC;
-- @end 01

-- @query 02
SELECT m.name AS member_name, co.name AS company_name
FROM members m
INNER JOIN companies co ON m.company_id = co.id
WHERE co.id = 1
ORDER BY m.name ASC;
-- @end 02

-- @query 03
SELECT m.name AS member_name, co.name AS company_name, cl.amount AS amount
FROM claims cl
INNER JOIN members m ON cl.member_id = m.id
INNER JOIN companies co ON m.company_id = co.id
WHERE cl.care_type = 'pharmacy'
ORDER BY cl.amount DESC;
-- @end 03

-- @query 04
INSERT INTO claims (id, member_id, care_type, amount, created_at)
VALUES (6, 3, 'pharmacy', 18.0, '2024-04-10');
-- @end 04

-- @query 05
INSERT INTO members (id, company_id, name) VALUES (4, 2, 'David Leroy');
-- @end 05

-- @query 06
DELETE FROM claims WHERE id = 2;
-- @end 06

-- @query 07
DELETE FROM claims WHERE care_type = 'consultation';
-- @end 07

-- @query 08
INSERT INTO companies (id, name) VALUES (3, 'Startup Inc');
-- @end 08
