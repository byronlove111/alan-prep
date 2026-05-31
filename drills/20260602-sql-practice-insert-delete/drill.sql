-- ============================================================
-- DRILL SQL PRACTICE — 3 tables : companies / members / claims
-- ============================================================
-- Modèle : une entreprise emploie des membres, chaque membre
-- dépose des remboursements (claims) par type de soin.
--
-- companies ──< members ──< claims
--
-- 8 exercices : double/triple JOIN, INSERT, DELETE.
-- Lance npm test après chaque exercice.
-- ============================================================

-- ============================================================
-- EXERCICE 1 / 8 — Triple JOIN
-- ============================================================
-- NOUVEAU CONCEPT : enchaîner 2 JOIN
-- claims → members → companies : tu remontes la chaîne via les clés
-- étrangères (member_id, company_id).
--
-- Ta mission : member_name, company_name, care_type, amount
-- pour toutes les claims, triées par created_at ASC.
--
-- Résultat attendu :
-- member_name  | company_name | care_type    | amount
-- Alice Martin | Alan Tech    | consultation | 120.0
-- Bob Dupont   | Alan Tech    | consultation | 80.0
-- Bob Dupont   | Alan Tech    | pharmacy     | 22.0
-- Alice Martin | Alan Tech    | pharmacy     | 45.5
-- Clara Renard | Studio Co    | optics       | 150.0
-- ============================================================

-- @query 01
SELECT members.name AS member_name, companies.name AS company_name, claims.care_type AS care_type, claims.amount AS amount
FROM claims JOIN members ON claims.member_id = members.id JOIN companies ON companies.id = members.company_id
ORDER BY claims.created_at ASC;
-- @end 01

-- ============================================================
-- EXERCICE 2 / 8 — JOIN + filtre sur la table du milieu
-- ============================================================
-- RAPPEL : JOIN members ↔ companies
-- Pas besoin de toucher claims ici — parfois tu lis juste
-- la relation entre deux tables.
--
-- Ta mission : member_name et company_name de tous les membres
-- de l'entreprise id = 1, triés par member_name ASC.
--
-- Résultat attendu :
-- member_name  | company_name
-- Alice Martin | Alan Tech
-- Bob Dupont   | Alan Tech
-- ============================================================

-- @query 02
SELECT members.name AS member_name, companies.name AS company_name
FROM members JOIN companies ON members.company_id = companies.id WHERE companies.id = 1 ORDER BY members.name ASC;
-- @end 02

-- ============================================================
-- EXERCICE 3 / 8 — Triple JOIN + filtre sur une colonne métier
-- ============================================================
-- RAPPEL : WHERE sur claims.care_type
-- Tu filtres sur une colonne de la table la plus "basse"
-- après avoir joint les 3 tables.
--
-- Ta mission : member_name, company_name, amount
-- pour les claims de type 'pharmacy', triées par amount DESC.
--
-- Résultat attendu :
-- member_name  | company_name | amount
-- Alice Martin | Alan Tech    | 45.5
-- Bob Dupont   | Alan Tech    | 22.0
-- ============================================================

-- @query 03
SELECT members.name AS member_name, companies.name AS company_name, claims.amount AS amount
FROM claims JOIN members ON members.id = claims.member_id JOIN companies ON members.company_id = companies.id WHERE claims.care_type = "pharmacy" ORDER BY claims.amount DESC;
-- @end 03

-- ============================================================
-- EXERCICE 4 / 8 — INSERT INTO claims
-- ============================================================
-- NOUVEAU CONCEPT : INSERT INTO
-- Nouvelle claim pour Clara (member_id 3).
-- Colonnes : id, member_id, care_type, amount, created_at.
--
-- INSERT ne retourne rien — npm test vérifie la table après.
--
-- Ta mission : id 6, member_id 3, care_type 'pharmacy',
-- amount 18.0, created_at '2024-04-10'.
--
-- État attendu (claims de Clara) :
-- care_type | amount
-- optics    | 150.0
-- pharmacy  | 18.0
-- ============================================================

-- @query 04
INSERT INTO claims (id, member_id, care_type, amount, created_at)
VALUES (6, 3, 'pharmacy', 18.0, '2024-04-10');
-- @end 04

-- ============================================================
-- EXERCICE 5 / 8 — INSERT INTO members (avec clé étrangère)
-- ============================================================
-- RAPPEL : INSERT avec FK
-- Un membre appartient à une entreprise → company_id obligatoire.
--
-- Ta mission : ajouter le membre id 4, company_id 2,
-- name 'David Leroy'.
--
-- État attendu (membres de Studio Co, id = 2) :
-- member_name
-- Clara Renard
-- David Leroy
-- ============================================================

-- @query 05
INSERT INTO members (id, company_id, name)
VALUES (4, 2, 'David Leroy');
-- @end 05

-- ============================================================
-- EXERCICE 6 / 8 — DELETE par id
-- ============================================================
-- NOUVEAU CONCEPT : DELETE
-- Supprime une ligne précise. Sans WHERE = catastrophe.
--
-- Ta mission : supprimer la claim id = 2 (pharmacie d'Alice).
--
-- État attendu (claims d'Alice, member_id 1) :
-- id | care_type    | amount
-- 1  | consultation | 120.0
-- ============================================================

-- @query 06
DELETE FROM claims WHERE claims.id = 2;
-- @end 06

-- ============================================================
-- EXERCICE 7 / 8 — DELETE + WHERE sur colonne métier
-- ============================================================
-- RAPPEL : DELETE + WHERE
-- Ici tu supprimes par type de soin, pas par id.
-- Toutes les consultations disparaissent d'un coup.
--
-- Ta mission : supprimer toutes les claims où care_type = 'consultation'.
--
-- État attendu (claims restantes) :
-- id | care_type | amount
-- 2  | pharmacy  | 45.5
-- 4  | optics    | 150.0
-- 5  | pharmacy  | 22.0
-- ============================================================

-- @query 07
DELETE FROM claims WHERE claims.care_type = 'consultation';
-- @end 07

-- ============================================================
-- EXERCICE 8 / 8 — INSERT INTO companies
-- ============================================================
-- RAPPEL : INSERT sur la table racine
-- companies n'a pas de clé étrangère — c'est le point de départ
-- de la chaîne.
--
-- Ta mission : ajouter l'entreprise id 3, name 'Startup Inc'.
--
-- État attendu (toutes les entreprises) :
-- id | name
-- 1  | Alan Tech
-- 2  | Studio Co
-- 3  | Startup Inc
-- ============================================================

-- @query 08
INSERT INTO companies (id, name)
VALUES (3, 'Startup Inc');
-- @end 08
