---
name: learn-repository
description: Generates a daily repository drill for Alan backend prep. Creates a small TypeScript plus SQLite exercise focused on raw SQL, row mapping, and persistence behavior without mixing in controller or service logic. Use when the user says /learn-repository or wants repository practice.
disable-model-invocation: true
---

# Learn Repository

Daily repository drill. The user practices persistence code only: SQL, mapping, and data access behavior.

## Context loading — read before every session

Before generating exercises, read `docs/alan-context.txt`, `docs/blog-articles.txt`, and `docs/glassdoor-interviews.txt`.
Use them to keep repository drills grounded in Alan's real product, vocabulary, use cases, and engineering concerns, even when the focus stays strictly on persistence work.

## Goal

Train the repository layer in isolation:
- read rows from SQLite
- write rows to SQLite
- map database records to TypeScript types
- handle nullable fields, sorting, filtering, and simple persistence edge cases

Do not move business rules into the repository. Do not turn the exercise into a service or controller task.

## Session format

Create one session folder:

```text
sessions/YYYYMMDD-HHmm-repository/
├── src/
│   ├── types.ts
│   ├── repositories/
│   │   └── [name]Repository.ts
│   └── errors.ts
├── db/
│   ├── database.ts
│   ├── schema.sql
│   └── seed.ts
├── repository.test.ts
├── test-runner.ts
├── package.json
└── BRIEF.md
```

Rules:
- the repository file is missing or mostly empty; the user must implement it
- `database.ts`, `types.ts`, `schema.sql`, and `seed.ts` are provided
- tests fail only because the repository behavior is incomplete
- the exercise must run locally without extra setup beyond `npm install` and `npm test`

## Scope

Allowed repository work:
- `findById`
- list with simple filters
- insert
- update
- delete
- existence checks
- simple transaction wrapper when a method writes to multiple tables

Allowed SQL:
- single-table queries by default
- one simple join only if mapping would otherwise feel artificial

Not allowed:
- business decisions
- HTTP concerns
- rich domain entities
- complex joins
- query builders or ORMs

## Progression

Increase difficulty slowly across days.

### Phase 1

Read-only repository:
- `findById`
- `listByStatus`
- `listRecent`

### Phase 2

Add writes:
- `create`
- `updateStatus`
- `deleteById`

### Phase 3

Add mapping details:
- nullable database columns
- enums or string unions
- timestamps stored as text
- one "not found" case

### Phase 4

Add one slightly richer persistence scenario:
- write to two tables in one transaction
- or list rows plus a simple joined label

Keep it repository-shaped. If the interesting part is the business rule, move that idea to `/learn-service` instead.

## Exercise design rules

Use Alan-style domain data:
- claims
- members
- contracts
- reimbursements
- documents

Each session should revolve around one repository class and one small table cluster.

Good repository prompts:
- save a claim draft
- fetch reimbursements for one member
- update document review status
- list contracts expiring this month

Bad repository prompts:
- decide whether reimbursement should be approved
- parse messy partner payloads
- validate HTTP query parameters

## Tests

Write 4-6 focused tests:
- happy path reads
- happy path writes
- one null or empty result case
- one ordering or filtering case
- one failure or not-found case if relevant

Prefer repository tests over HTTP tests.

## Output to the user

After generating the session and running the tests, say:

```text
Session repository créée.
Lis BRIEF.md, regarde schema.sql et les tests, puis implémente le repository.
Le but est de faire marcher la persistence, pas d'ajouter de logique métier.
```

Then wait.

## Coaching rules

During the drill:
- redirect business-rule questions back to the service layer
- encourage the user to read the schema before coding
- prefer one failing test at a time
- if SQL is wrong, fix the query before discussing refactors

Keep the block solvable in about 20 minutes.
