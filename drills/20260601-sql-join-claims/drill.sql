-- ============================================================
-- DRILL SQL — Parcours débutant (10 exercices)
-- ============================================================
-- Tu découvres SQL chez Alan sur des membres et leurs factures.
-- Fais les exercices DANS L'ORDRE — chaque exo ajoute UN concept.
--
-- Lance : npm test
-- ============================================================

-- ============================================================
-- EXERCICE 1 / 10 — SELECT
-- ============================================================
-- NOUVEAU CONCEPT : SELECT
-- Une requête SQL commence par SELECT. Ça veut dire "montre-moi des données".
-- SELECT * = toutes les colonnes. FROM = dans quelle table.
--
-- Ta mission : afficher TOUTES les lignes de la table members.
--
-- Résultat attendu :
-- id | name
-- 1  | Alice Martin
-- 2  | Bob Dupont
-- ============================================================

-- @query 01
SELECT * FROM members;
-- @end 01

-- ============================================================
-- EXERCICE 2 / 10 — WHERE
-- ============================================================
-- NOUVEAU CONCEPT : WHERE
-- WHERE filtre les lignes. Tu gardes seulement celles qui matchent.
-- Ici : le membre qui a id = 1 (Alice).
--
-- Ta mission : afficher la colonne name du membre id = 1.
--
-- Résultat attendu :
-- name
-- Alice Martin
-- ============================================================

-- @query 02
SELECT name FROM members WHERE id = 1;
-- @end 02

-- ============================================================
-- EXERCICE 3 / 10 — Colonnes explicites
-- ============================================================
-- NOUVEAU CONCEPT : choisir ses colonnes
-- Tu peux lister les colonnes au lieu de * : SELECT id, amount
-- Utile pour n'afficher que ce dont tu as besoin.
--
-- Ta mission : afficher id et amount de TOUTES les claims.
-- Résultat attendu :
-- id | amount
-- 1  | 120.0
-- 2  | 45.5
-- 3  | 80.0
-- ============================================================

-- @query 03
SELECT id, amount FROM claims;
-- @end 03

-- ============================================================
-- EXERCICE 4 / 10 — WHERE sur une autre table
-- ============================================================
-- RAPPEL : WHERE + colonnes explicites
-- La table claims a member_id : ça dit à quel membre appartient la facture.
--
-- Ta mission : id et amount des claims du membre 1 seulement.
--
-- Résultat attendu :
-- id | amount
-- 1  | 120.0
-- 2  | 45.5
-- ============================================================

-- @query 04
SELECT id, amount FROM claims WHERE member_id = 1;
-- @end 04

-- ============================================================
-- EXERCICE 5 / 10 — ORDER BY
-- ============================================================
-- NOUVEAU CONCEPT : ORDER BY
-- ORDER BY trie les résultats. ASC = du plus petit au plus grand (anciennes dates en premier).
--
-- Ta mission : id et amount des claims du membre 1, triés par created_at ASC.
-- (Tu auras besoin de SELECT created_at ou trier sur cette colonne.)
--
-- Résultat attendu :
-- id | amount
-- 1  | 120.0
-- 2  | 45.5
-- ============================================================

-- @query 05
SELECT id, amount FROM claims WHERE member_id = 1 ORDER BY created_at ASC
-- @end 05

-- ============================================================
-- EXERCICE 6 / 10 — INNER JOIN
-- ============================================================
-- NOUVEAU CONCEPT : INNER JOIN
-- Le nom est dans members, les factures dans claims.
-- JOIN = coller les deux tables quand member_id = members.id
-- m et c sont des raccourcis (alias) pour les noms de tables.
--
-- Ta mission : afficher name (members) et amount (claims) pour toutes les paires liées.
--
-- Résultat attendu :
-- name         | amount
-- Alice Martin | 120.0
-- Alice Martin | 45.5
-- Bob Dupont   | 80.0
-- ============================================================

-- @query 06
SELECT members.name, claims.amount FROM members JOIN claims ON members.id = claims.member_id;
-- @end 06

-- ============================================================
-- EXERCICE 7 / 10 — JOIN + WHERE
-- ============================================================
-- RAPPEL : JOIN + WHERE
-- D'abord tu joins, ensuite tu filtres avec WHERE sur la bonne table.
--
-- Ta mission : name et amount seulement pour le membre id = 1.
--
-- Résultat attendu :
-- name         | amount
-- Alice Martin | 120.0
-- Alice Martin | 45.5
-- ============================================================

-- @query 07
SELECT members.name, claims.amount FROM members JOIN claims ON members.id = claims.member_id WHERE members.id = 1;
-- @end 07

-- ============================================================
-- EXERCICE 8 / 10 — JOIN + WHERE + ORDER BY (complet)
-- ============================================================
-- RAPPEL : tout ensemble
-- C'est le type de requête utile en entretien : jointure + filtre + tri.
--
-- Ta mission : claim_id, member_name, amount, created_at pour le membre 1,
-- du plus ancien au plus récent. Utilise AS pour renommer les colonnes.
--
-- Résultat attendu :
-- claim_id | member_name  | amount | created_at
-- 1        | Alice Martin | 120.0  | 2024-01-10
-- 2        | Alice Martin | 45.5   | 2024-02-15
-- ============================================================

-- @query 08
SELECT claims.id AS claim_id, members.name AS member_name, claims.amount AS amount, claims.created_at AS created_at FROM claims JOIN members ON members.id = claims.member_id WHERE members.id = 1; 
-- @end 08

-- ============================================================
-- EXERCICE 9 / 10 — Changer le filtre
-- ============================================================
-- RAPPEL : même pattern, autre membre
-- Change juste le id dans WHERE.
--
-- Ta mission : id, name et amount pour le membre id = 2 (Bob).
--
-- Résultat attendu :
-- id | name       | amount
-- 3  | Bob Dupont | 80.0
-- ============================================================

-- @query 09
SELECT claims.id AS id, members.name AS name, claims.amount AS amount
FROM claims JOIN members ON claims.member_id = members.id
WHERE members.id = 2;
-- @end 09

-- ============================================================
-- EXERCICE 10 / 10 — ORDER BY DESC
-- ============================================================
-- NOUVEAU CONCEPT : DESC
-- DESC = du plus grand au plus petit. Ici : factures les plus chères en premier.
--
-- Ta mission : name et amount de toutes les claims, triées par amount DESC.
--
-- Résultat attendu :
-- name         | amount
-- Alice Martin | 120.0
-- Bob Dupont   | 80.0
-- Alice Martin | 45.5
-- ============================================================

-- @query 10
SELECT members.name AS name, claims.amount AS amount
FROM members JOIN claims ON members.id = claims.member_id ORDER BY amount DESC;
-- @end 10
