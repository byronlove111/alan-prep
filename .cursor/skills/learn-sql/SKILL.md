---
name: learn-sql
description: Builds a lightweight SQL fundamentals session for Alan backend interview prep. The goal is not deep SQL practice but understanding the minimum database concepts a backend engineer should explain clearly: primary keys, foreign keys, indexes, transactions, locks, ALTER TABLE, simple joins, simple aggregation, concurrent access, and N+1. Includes only a tiny amount of local SQL practice (`SELECT`, `WHERE`, simple `JOIN`, `INSERT`, `UPDATE`). Use when the user says /learn-sql or wants SQL/backend fundamentals for interviews.
disable-model-invocation: true
---

# Learn SQL

SQL fundamentals for backend interviews. The goal is not to become strong at writing SQL live. The goal is to understand the minimum relational database concepts so the user is not lost in an Alan interview and can explain simple backend/database situations clearly.

## Context loading — read before every session

Before generating a session, read `docs/alan-context.txt`, `docs/blog-articles.txt`, and `docs/glassdoor-interviews.txt`.
Use them to keep the session grounded in Alan's real product, vocabulary, use cases, and engineering concerns, even when the focus is mostly conceptual.

## Goal

Prioritize concept understanding:
- what each database concept means in plain English
- what problem it solves in backend work
- how it appears in real code or schema discussions
- how to explain it simply out loud in an interview

Keep practical SQL intentionally tiny:
- `SELECT`
- `WHERE`
- simple `JOIN`
- `INSERT`
- `UPDATE`

The user does **not** need a deep SQL progression. They need to stop feeling lost when backend/database concepts come up.

Do not turn this skill into:
- a long SQL drill
- a syntax memorization marathon
- advanced SQL features
- a deep query optimization course
- a deep indexing lecture
- an ORM tutorial
- a full database design curriculum
- a deep isolation-level lecture

## Session philosophy

This skill is concept-first, not drill-first.

Default mindset:
- explain before asking the user to write anything
- prefer tiny examples over abstract definitions
- prefer one simple schema over many exercises
- make the user reformulate concepts in their own words
- ask short oral interview-style questions
- keep the practice block small enough that it supports understanding instead of taking over the session

If the user is tired, stressed, or close to the interview, prefer breadth and clarity over difficulty.

## Session format

Create one session folder:

```text
sessions/YYYYMMDD-HHmm-sql-fundamentals/
├── FOUNDATIONS.md
├── MINI-PRACTICE.sql
├── transcript.md
└── db/
    ├── schema.sql
    ├── seed.sql
    ├── init.sql
    └── training.sqlite
```

Rules:
- `FOUNDATIONS.md` is the main artifact and carries most of the value
- `MINI-PRACTICE.sql` contains only a few tiny SQL prompts
- `transcript.md` is used to capture the user's reformulations and short answers
- `schema.sql` defines a tiny readable SQLite schema with 2-3 tables max
- `seed.sql` inserts realistic Alan-style data: members, contracts, claims, documents, reimbursements
- `init.sql` resets the database, then loads schema and seed
- `training.sqlite` is optional but recommended if `sqlite3` is available

Default database setup:

```bash
sqlite3 db/training.sqlite < db/init.sql
```

If `sqlite3` is unavailable, do not block the session on setup. Keep the concept explanations and examples useful anyway.

## Mandatory structure of each session

Every session must contain two clearly separated blocks.

### Block 1 — Minimal practice

This block is small on purpose. It exists only to make the concepts less abstract.

Allowed scope:
- one tiny `SELECT` + `WHERE`
- one tiny simple `JOIN`
- one tiny `INSERT` or `UPDATE`
- optionally one tiny `GROUP BY`

Rules:
- 4 prompts max
- no tricky syntax
- no nested subqueries
- no CTEs
- no window functions
- no deletes unless the user explicitly asks
- no performance tuning exercises
- no "write a big report query" prompts

### Block 2 — Core backend concepts

This is the main block. Spend most of the session here.

Cover the concepts below directly and explicitly across the sessions, with short recaps of previous notions:
- primary key
- foreign key
- index
- transaction
- lock
- `ALTER TABLE`
- simple join
- `GROUP BY` / simple aggregation
- concurrent access
- N+1

Do not add extra concepts unless the mandatory list is already clear.

## Mandatory concept format

For **every** concept covered in `FOUNDATIONS.md`, include all of the following:

1. a simple explanation in plain English, in 3-6 lines max
2. why it matters in backend work
3. one tiny Alan-like example
4. one "how to say it in an interview" sentence starter
5. one prompt asking the user to reformulate it
6. one mini oral interview question
7. optionally one tiny SQL snippet if it truly helps

The agent should always teach the concept, then make the user say it back simply.

## Mandatory concepts to cover

Use simple Alan-like examples such as:
- members
- contracts
- claims
- reimbursements
- documents

For each concept, focus on the following angle.

### `primary key`

Teach:
- a primary key identifies one row uniquely
- backend code relies on it to fetch, update, and reference the right entity

Alan-like example:
- `claims.id` uniquely identifies one reimbursement claim

Good mini question:
- "Why is `status` a bad primary key for `claims`?"

### `foreign key`

Teach:
- a foreign key links one table to another
- it protects relationships such as "this claim belongs to this member"

Alan-like example:
- `claims.member_id -> members.id`

Good mini question:
- "What problem do we create if claims can reference a member that does not exist?"

### `index`

Teach:
- an index is a data structure that helps the database find rows faster
- it improves reads on frequent lookup paths, but writes may cost a bit more

Alan-like example:
- index on `claims(member_id)` or `documents(status)`

Good mini question:
- "Why might a backend team add an index on `member_id`?"

### `transaction`

Teach:
- a transaction groups several changes so they succeed or fail together
- backend code uses it when one action spans multiple writes

Alan-like example:
- create a reimbursement row and update the claim status in one transaction

Good mini question:
- "Why is one API request sometimes more than one SQL statement?"

### `lock`

Teach:
- a lock is how the database protects data while a read or write is in progress
- it matters when two operations touch the same rows or table at the same time

Alan-like example:
- two workers try to update the same claim from `pending` to different statuses

Good mini question:
- "Why can one write wait or fail when another write is already running?"

### `ALTER TABLE`

Teach:
- `ALTER TABLE` changes the schema, not the business data itself
- backend teams use it during migrations when the model evolves

Alan-like example:
- add `reviewed_at` to `documents`

Good mini question:
- "Why do teams often add a nullable column first instead of changing everything at once?"

### simple join

Teach:
- a join combines rows from related tables
- backend code uses it to avoid multiple disconnected lookups

Alan-like example:
- join `claims` with `members` to display the member name next to the claim status

Good mini question:
- "What are we combining when we join `claims` and `members`?"

### `GROUP BY` / simple aggregation

Teach:
- aggregation summarizes many rows into a smaller result
- `GROUP BY` is useful for counts and totals

Alan-like example:
- count pending claims per member

Good mini question:
- "Why is `COUNT(*)` often paired with `GROUP BY`?"

### concurrent access

Teach:
- concurrent access means multiple requests, workers, or processes touch the same data at the same time
- this is normal in a backend system, not an edge case

Alan-like example:
- one admin reviews a document while an automated job also updates its status

Good mini question:
- "Why do concurrency problems appear even when each individual query looks correct?"

### N+1

Teach:
- N+1 happens when the backend does one query to fetch a list, then one extra query per row
- the problem is not correctness but unnecessary database round-trips

Alan-like example:
- fetch 50 claims, then fetch the member separately for each claim

Good mini question:
- "Why can code that works perfectly still be bad because of N+1?"

## Suggested progression

Do not create a long difficulty ladder. Prefer a short, calm progression.

### Session 1 — relational basics

Focus on:
- primary key
- foreign key
- simple join
- `INSERT`
- `UPDATE`

### Session 2 — reading and summarizing data

Focus on:
- `SELECT`
- `WHERE`
- `GROUP BY`
- simple aggregation
- index

### Session 3 — write safety and schema evolution

Focus on:
- transaction
- lock
- concurrent access
- `ALTER TABLE`
- migration intuition

### Session 4 — backend intuition recap

Focus on:
- N+1
- recap of joins vs multiple queries
- recap of transaction vs one query
- recap of why indexes and locks exist

If time is short, compress the progression and still cover the full mandatory concept list lightly.

## `FOUNDATIONS.md` structure

`FOUNDATIONS.md` must contain:
1. a 2-3 line Alan-style context
2. the goal of today's session
3. the two clearly separated blocks
4. the concept cards for today's concepts
5. a short recap section: "what to remember for interview day"
6. a short oral questions section

## `MINI-PRACTICE.sql` rules

Keep it tiny and confidence-building.

Good prompts:
- "List pending claims for one member."
- "Show each claim with the member name."
- "Insert one new claim draft."
- "Update one document status."
- "Count claims by status."

Bad prompts:
- "Write a complex analytics query."
- "Optimize this slow report."
- "Use nested subqueries to..."
- "Design a full schema from scratch."

## Coaching style

During the session:
- explain simply first
- use business examples before formal wording
- ask the user to reformulate often
- prefer short oral questions over long written exercises
- if the user struggles, simplify further instead of adding more syntax
- correct misunderstandings about concepts before correcting SQL syntax

Good prompt style:
> Explique avec tes mots ce qu'une transaction protège ici.

Good follow-up style:
> Si deux traitements modifient la meme claim en meme temps, qu'est-ce qui peut mal se passer ?

## Output to the user

After generation, say:

```text
Session SQL fundamentals créée.
Commence par lire FOUNDATIONS.md.
Le coeur du travail est de comprendre et reformuler les concepts backend, avec seulement un tout petit peu de SQL pratique.
Quand tu veux, on prend une notion et je te pose une mini question d'entretien.
```

Then wait.

## Correction style

When correcting:
- prioritize the concept over the syntax
- explain only the most important misunderstanding first
- use a tiny example if needed
- prefer one hint, then one clearer hint, then the answer
- keep the tone calm, concrete, and interview-oriented

If the user asks for more theory, stay within the mandatory concept list and keep the explanations intuitive.

## Default session size

Prefer this shape unless the user explicitly asks for more:
- 2-4 mini SQL prompts total
- 3-5 concept cards in the main block
- 4-6 short oral questions
- one recap at the end

Keep the whole session useful in about 20-30 minutes.
