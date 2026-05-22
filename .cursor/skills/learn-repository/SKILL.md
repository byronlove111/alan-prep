---
name: learn-repository
description: Generates a daily repository drill for Alan backend prep. Creates a small TypeScript plus SQLite exercise focused on raw SQL, row mapping, and persistence behavior without mixing in controller or service logic. Use when the user says /learn-repository or wants repository practice.
disable-model-invocation: true
---

# Learn Repository

Daily repository drill. The user practices only the repository basics that are still worth keeping warm for the Alan interview.

## Context loading — read before every session

Before generating exercises, read `docs/alan-context.txt`, `docs/blog-articles.txt`, and `docs/glassdoor-interviews.txt`.
Use them to keep repository drills grounded in Alan's real product, vocabulary, use cases, and engineering concerns, even when the focus stays strictly on persistence work.

## Goal

Train the repository layer in isolation, but keep it light:
- read a simple schema
- write 1-2 simple SQL queries
- map database rows to TypeScript types
- handle one `not found` or empty-result case

The objective is not deep persistence mastery. The objective is to stay comfortable with simple repository work and not lose time when a small SQL or mapping task appears.

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
├── package.json
├── tsconfig.json
└── BRIEF.md
```

Rules:
- the repository file is missing or mostly empty; the user must implement it
- `database.ts`, `types.ts`, `schema.sql`, and `seed.ts` are provided
- tests fail only because the repository behavior is incomplete
- the exercise must run locally without extra setup beyond `npm install` and `npm test`
- use Jest by default for all generated tests; do not generate a homemade `test-runner.ts`
- keep the dataset and schema small enough to understand in a couple of minutes

## Scope

Allowed repository work:
- `findById`
- one simple list query with a basic filter
- one simple insert or update
- one `not found` or empty-result case
- row-to-type mapping

Allowed SQL:
- single-table queries by default
- only basic `SELECT`, `INSERT`, or `UPDATE`
- one very small join only if absolutely necessary

Not allowed:
- business decisions
- HTTP concerns
- rich domain entities
- complex joins
- transactions
- query builders or ORMs
- too many methods in one session

## Drill shape

Keep every drill intentionally small:
- one repository class
- one small schema
- 2 or 3 methods max
- simple SQL that can be read in one pass

Good session shapes:
- `findById` + `listByStatus`
- `findById` + `create`
- `listRecent` + row mapping + one empty result case

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

Write 3-5 focused tests:
- happy path reads
- happy path write if the drill includes one
- one null, empty, or `not found` result case
- one simple filtering or mapping case

Prefer repository tests over HTTP tests.
Write them as standard Jest tests (`describe`/`it`/`expect`) in TypeScript.

## Default test stack

For every generated repository session, default to:
- `jest`
- `ts-jest`
- `@types/jest`
- `@types/node`
- `typescript`

Use this minimal config:

**`package.json`**:
```json
{
  "name": "alan-repository",
  "version": "1.0.0",
  "scripts": { "test": "jest --runInBand" },
  "dependencies": {
    "better-sqlite3": "latest"
  },
  "devDependencies": {
    "@types/jest": "latest",
    "@types/node": "latest",
    "jest": "latest",
    "ts-jest": "latest",
    "typescript": "latest"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node"
  }
}
```

**`tsconfig.json`**:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "types": ["node", "jest"]
  }
}
```

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

Keep the block solvable in about 10-15 minutes.
