---
name: learn-sql
description: Builds a practical daily SQLite drill for Alan backend prep. Creates a tiny local database, schema, seed, and progressive SQL exercises covering basic queries, ALTER TABLE, locks, and simple joins without going beyond that scope. Use when the user says /learn-sql or wants hands-on SQL practice.
disable-model-invocation: true
---

# Learn SQL

Daily SQL drill for backend interview prep. Keep it concrete, small, and executable locally.

## Context loading — read before every session

Before generating exercises, read `docs/alan-context.txt`, `docs/blog-articles.txt`, and `docs/glassdoor-interviews.txt`.
Use them to keep SQL drills grounded in Alan's real product, vocabulary, use cases, and engineering concerns, even when the focus is only on query practice.

## Goal

Train only this scope:
- basic queries
- `ALTER TABLE`
- simple locks / concurrency
- simple joins

Do not go beyond that scope. Avoid CTEs, window functions, advanced subqueries, query optimization theory, indexing deep-dives, ORM usage, or database design lectures.

## Session format

Create one session folder:

```text
sessions/YYYYMMDD-HHmm-sql/
├── db/
│   ├── schema.sql
│   ├── seed.sql
│   ├── init.sql
│   └── training.sqlite
├── EXERCISES.md
├── work.sql
└── transcript.md
```

Rules:
- `schema.sql` defines a tiny SQLite schema with 3-4 tables max
- `seed.sql` inserts realistic Alan-style data: members, contracts, claims, documents, reimbursements
- `init.sql` resets the database, then loads schema and seed
- `training.sqlite` must actually be created locally
- `work.sql` starts empty except for short comments telling the user where to write queries
- `transcript.md` starts empty with a short placeholder comment

Default database setup:

```bash
sqlite3 db/training.sqlite < db/init.sql
```

If `sqlite3` is unavailable, create the database with a tiny Node script instead, but keep SQLite as the storage.

## Progression

Infer the phase from recent `sessions/*-sql/` folders. Reuse the same scope every day, but increase difficulty slowly.

### Phase 1

Focus only on:
- `SELECT`
- `WHERE`
- `ORDER BY`

Generate 5-6 exercises.

### Phase 2

Keep Phase 1 warm-up exercises, then add:
- `GROUP BY`
- `INSERT`
- `UPDATE`
- `DELETE`

Generate 6-7 exercises.

### Phase 3

Keep one warm-up query, then add:
- `ALTER TABLE`

Typical tasks:
- add a nullable column
- add a column with a default
- update old rows after the schema change

### Phase 4

Keep one warm-up query, then add:
- simple locks / concurrency

Keep it intuitive:
- two terminals
- one transaction that writes
- another transaction that tries to write
- observe what is blocked or rejected

Do not turn this into a deep lecture about isolation levels.

### Phase 5

Keep one warm-up query, then add:
- simple joins only

Allowed:
- `INNER JOIN`
- `LEFT JOIN`
- one join condition
- one aggregation after a join

Not allowed:
- multi-join monsters
- nested joins for cleverness
- query golf

## Database design rules

Use a tiny, readable schema:
- table names and columns must be explicit
- 5-20 rows per table
- realistic statuses and dates
- enough variation for filtering and grouping

Good examples:
- `members`
- `contracts`
- `claims`
- `documents`
- `reimbursements`

Avoid clever schemas. The point is query practice, not schema puzzles.

## Exercise writing rules

`EXERCISES.md` must contain:
1. a 2-3 line context
2. the goal of today's block
3. the ordered exercises
4. a short "how to run a query" reminder
5. a short correction workflow

Exercise style:
- one line of business context
- one precise expected result
- no hidden trick
- no solution in the prompt

Good exercise:
> List all pending claims created after `2026-01-01`, newest first.

Bad exercise:
> Build a robust reporting query for finance with performance in mind.

## Output to the user

After generation, say:

```text
Session SQL créée.
Commence par ouvrir EXERCISES.md, puis écris tes requêtes dans work.sql.
Quand tu veux, je corrige une requête ou je passe à l'exercice suivant.
```

Then wait.

## Correction style

When correcting:
- run the query if possible
- explain only the mistake that matters most
- prefer one hint, then one clearer hint, then the solution
- keep explanations short and practical

If the user asks for theory, answer only inside the allowed scope.

## Daily defaults

Prefer this shape unless recent sessions justify a harder block:
- 2 easy warm-up exercises
- 2 medium exercises
- 1 slightly harder exercise
- 1 recap exercise

Keep the whole SQL block solvable in about 20 minutes.
