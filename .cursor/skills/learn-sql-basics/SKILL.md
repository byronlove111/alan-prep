---
name: learn-sql-basics
description: Generates progressive pure SQL SQLite drills — beginner (SELECT→JOIN) or practice track (JOIN + INSERT/DELETE). Same rhythm as alan-ts-drill. Use when the user says /learn-sql-basics or wants SQL interview practice.
disable-model-invocation: true
---

# Learn SQL Basics

Progressive **pure SQL** drills: **one `drill.sql`** with **6–10 exercises**, each introducing **one concept** with a short explanation.

Same packaging as `/alan-ts-drill`: `drill.sql` + `soluce.sql` + `npm test`. **No BRIEF.md.**

**Stack**: SQLite + `sqlite3` CLI  
**Duration**: ~25-40 min  
**Domain**: Alan / companies / members / claims (3-table chain for practice)

## Hard rules

- **no TypeScript**, no ORM, no separate brief file
- **one `drill.sql`** with numbered exercises
- each exercise introduces **exactly one new idea** and explains it in comments
- validate with **`check.sh`** (one diff per exercise)

## Two tracks — pick the right one

### Track A — Débutant (first contact SQL)

Use when the user has **never** done the claims drill or says they're starting from zero.

| # | Concept |
|---|---------|
| 1 | `SELECT` |
| 2 | `WHERE` |
| 3 | explicit columns |
| 4 | `ORDER BY` |
| 5 | filter + sort combined |
| 6 | `INNER JOIN` |
| 7 | `JOIN` + `WHERE` |
| 8 | `JOIN` + aliases + ORDER BY |
| 9 | variant (another member) |
| 10 | `ORDER BY DESC` |

**Never start with JOIN.** Never skip SELECT / WHERE.

### Track B — Practice (default after first drill)

Use when the user **already knows** SELECT / WHERE / ORDER BY / basic JOIN (ex 1–6 done).

**Skip the easy stuff.** Start directly on interview-shaped reads, then mutations.

| # | Concept |
|---|---------|
| 1 | **triple JOIN** (claims → members → companies) |
| 2 | JOIN 2 tables only (skip claims when not needed) |
| 3 | triple JOIN + filter on business column (`care_type`) |
| 4 | `INSERT INTO` claims (with FK) |
| 5 | `INSERT INTO` members (with `company_id` FK) |
| 6 | `DELETE` by id |
| 7 | `DELETE` + `WHERE` on business column |
| 8 | `INSERT INTO` root table (companies) |

**8 exercises**, **3 tables** (`companies` → `members` → `claims`). Vary which tables each exercise touches — never 8× the same JOIN pattern.

**Schema for Track B:**
```sql
companies (id, name)
members (id, company_id, name)      -- FK → companies
claims (id, member_id, care_type, amount, created_at)  -- FK → members
```

No SELECT `*` on one table alone.

When generating Track B, say explicitly in Step 0 that this is the practice track.

## Workflow

### Step 0 — Propose 3 drill themes

Propose exactly 3 themes. Wait for the user's choice.

Each theme must say **track** (A or B), exercise count, and final skill.

Format:
```text
Voici 3 parcours SQL — choisis en un :

**A — [theme]**
Track : Practice (JOIN + INSERT/DELETE) | 8 exos
[1 line]

**B — ...**
**C — ...**
```

If the user hasn't done any SQL drill yet, offer at least one Track A theme.

### Step 1 — Generate the drill

```text
drills/YYYYMMDD-sql-[slug]/
├── db/
│   ├── schema.sql
│   └── seed.sql
├── drill.sql
├── soluce.sql
├── expected/
│   ├── ex01.txt
│   └── ... (one file per exercise)
├── verify/              ← Track B only, for INSERT/DELETE exercises
│   ├── ex04.sql
│   └── ...
├── check.sh
└── package.json
```

**`verify/NN.sql`**: for mutation exercises (INSERT/DELETE), the user's query mutates the DB; `check.sh` runs the verify query after and diffs against `expected/exNN.txt`. Explain in the exercise comment: "ta requête ne retourne rien — le test vérifie l'état de la table après."

**`check.sh` rules:**
- **reset DB (schema + seed) before every exercise** — mandatory for Track B
- extract query between `@query NN` and `@end NN`
- if `verify/exNN.sql` exists: run user query (no output diff), then run verify query
- else: run user query and diff output directly
- print summary: `✅ 6/8` or list failed numbers

**`db/schema.sql`**: Track A = 2 tables max until JOIN exercise. Track B = **3 tables** (companies → members → claims).

**`db/seed.sql`**: 5–15 rows, readable names (Alice, Bob).

**`package.json`**:
```json
{
  "name": "alan-sql-drill",
  "version": "1.0.0",
  "scripts": { "test": "./check.sh" }
}
```

After generating: run `./check.sh` with `soluce.sql` copied to `drill.sql` — must pass 8/8 or 10/10. Then restore empty queries in `drill.sql`.

### Step 2 — Structure of `drill.sql`

Each exercise block:

```sql
-- ============================================================
-- EXERCICE 4 / 8 — INSERT INTO
-- ============================================================
-- NOUVEAU CONCEPT : INSERT INTO
-- INSERT INTO ajoute une nouvelle ligne dans une table.
-- Pense : "j'écris une ligne complète avec les bonnes colonnes".
--
-- Ta mission : ajouter une claim id 4 pour le membre 1,
-- amount 99.0, date 2024-03-01.
-- (INSERT ne retourne rien — npm test vérifie la table après)
--
-- État attendu après insertion (claims du membre 1) :
-- id | amount
-- 1  | 120.0
-- 2  | 45.5
-- 4  | 99.0
-- ============================================================

-- @query 04

-- @end 04
```

**Comment rules:**
- start with `NOUVEAU CONCEPT :` or `RAPPEL :`
- 2–4 lines plain French
- show expected output as ASCII table
- **never** give exact SQL syntax in the mission line
- empty query area between markers
- zero-padded ids: `@query 01`, ...

**`soluce.sql`**: same headers + filled queries.

### Step 3 — Launch

Track A:
```text
⏱️  DRILL SQL DÉBUTANT — 30-45 min
▶️  npm test
📝  drill.sql — exo 1 en haut, dans l'ordre
✅  Objectif : monter le score (ex 7/10)
```

Track B:
```text
⏱️  DRILL SQL PRACTICE — 25-35 min
▶️  npm test
📝  drill.sql — JOIN d'abord, puis INSERT/DELETE
✅  Objectif : 8/8
Pas de SELECT * basique — tu pratiques ce qui tombe en entretien.
```

### Step 4 — Review (when user is done)

Short feedback (5-10 lines):
- last exercise passed
- shaky concept (JOIN vs INSERT columns vs DELETE WHERE)
- 1 sentence per failed exercise type

## Subject bank

**Claims d'un membre (default)** — members + claims.

**Membres d'une entreprise** — companies + members.

**Actes de soin** — care_events + care_act_types.

## Coaching order (if stuck)

1. read only the `NOUVEAU CONCEPT` block
2. name the table aloud
3. SELECT: one clause at a time (`FROM`, `WHERE`, `ORDER BY`, `JOIN`)
4. INSERT: list columns, then values in the same order
5. DELETE: always ask "which rows?" → write the `WHERE` first on paper
6. run `npm test` — fix exercise N before N+1

Never give full soluce unless user explicitly asks for one exercise answer.
