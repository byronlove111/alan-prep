---
name: learn-implement-analyzer
description: Generates a Doctolib/Alan-style technical interview exercise with TypeScript business logic, a SQLite model layer, fixed Jest tests, and a formal BRIEF. Use when the user says /learn-implement-analyzer, wants interview prep with model + business logic + SQL, or mentions the BMI/analyzer + SQLite interview format.
disable-model-invocation: true
---

# Learn Tech Interview (implement-analyzer)

Simulates the **real technical interview shape**:

- **`src/model.ts`** — SQLite data access (SELECT / JOIN)
- **`src/businessLogic.ts`** — business rules in TypeScript
- **`src/businessLogic.test.ts`** — fixed Jest tests
- **`db/schema.sql` + `db/seed.sql`** — SQLite database

Legacy pure-array analyzer exercises (no SQL) are still allowed as a **light variant**, but the **default** is **SQLite + model + business logic**.

**Stack**: TypeScript strict, Jest, SQLite via `better-sqlite3`  
**Duration**: ~45-90 min (target feel: 1h30 interview)  
**Domain**: Alan / health / members / claims

## Context loading — read before every session

Before proposing subjects, read:
- `docs/alan-context.txt`
- `docs/blog-articles.txt`
- `docs/glassdoor-interviews.txt`

## User preferences — always apply

- never use regular expressions in generated TypeScript; prefer `split`, `trim`, `includes`, `slice`, `join`, simple loops
- prefer `for` loops over `reduce`
- SQLite only — no Postgres, no ORM
- raw SQL in `model.ts`
- junior-friendly readability
- no HTTP, no Express, no framework

## Workflow

### Step 0 — Propose 3 subjects

Propose exactly 3 subjects and wait for the user's choice.

Each proposal must mention:
- `model.ts` + `businessLogic.ts` + tests + `db/`
- what SQL shape is needed (SELECT, JOIN, ORDER BY)
- what TS business rule must be implemented

Good families:
- member claim reimbursement timeline from DB
- care act history with JOIN on reference table
- teleconsultation usage per member from two tables
- eligibility snapshots read from SQLite then categorized in TS

Format:
```text
Voici 3 exercices style interview (model + SQL + business logic) — choisis-en un :

**A — [sub-domain]**
[2-3 lines]

**B — [sub-domain]**
[2-3 lines]

**C — [sub-domain]**
[2-3 lines]
```

### Step 1 — Generate the session

```text
sessions/YYYYMMDD-HHmm-tech-interview-[feature-slug]/
  db/
    schema.sql
    seed.sql
  src/
    types.ts
    model.ts
    businessLogic.ts
    businessLogic.test.ts
    testDb.ts
  BRIEF.md
  transcript.md
  package.json
  tsconfig.json
```

Rules:
- `types.ts` is complete — user must not modify it
- `businessLogic.test.ts` is complete — user must not modify it
- `schema.sql` and `seed.sql` are complete — user must not modify them
- `testDb.ts` creates `:memory:` DB for tests — provided and working
- `model.ts` may be empty, stubbed, or partially wrong — user completes/f fixes SQL here
- `businessLogic.ts` exports the main function with stub body
- never generate `soluce.ts`
- only `transcript.md` at start; `debrief.md` is written at review time

`transcript.md` initial content:
```markdown
# Transcript — [date]

<!-- Colle ici ton raisonnement oral pendant ou après la session.
     Le debrief sera généré à partir de ce transcript + ton code + les tests. -->
```

### Step 2 — Mandatory exercise shape (default: SQL + TS)

**Database**
- 2 tables minimum for a JOIN drill, 3 max
- foreign key relationship explicit in `schema.sql`
- seed data small but enough for 7 meaningful tests

**model.ts**
- opens/receives a `Database` from `better-sqlite3`
- exports query functions used by business logic
- at least one query already works (happy path)
- target query(ies) stubbed or incorrect — user fixes/completes SQL

**businessLogic.ts**
- exports one main function, e.g. `analyzeMemberClaims(db, memberId)`
- reads rows via `model.ts`
- applies TS rules: metric computation, categories, `changePercent`, rounding, null on first row when timeline exercise

**Tests — exactly 7 scenarios**

| # | Scenario |
|---|----------|
| 1 | unknown / empty case → empty result or null-safe behavior |
| 2 | single row → `changePercent` is `null` when timeline metric |
| 3 | metric increasing → positive `changePercent` |
| 4 | identical metric → `changePercent` is `0` |
| 5 | lower category boundary → higher category |
| 6 | upper category boundary → highest category |
| 7 | 3+ rows → each `changePercent` vs **immediate previous** |

Tests must use real SQLite via `testDb.ts`, not mocked arrays.

**Split of work (pick one per exercise)**
- **Variant A (default)** : fix/completed SQL in `model.ts` + implement `businessLogic.ts`
- **Variant B** : working `model.ts` + fix only `businessLogic.ts`
- **Variant C** : both partial — harder, use only if user asks

State clearly in `BRIEF.md` which file(s) the user must implement.

### Step 3 — Default files

**`src/testDb.ts`**
```typescript
import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

export function createTestDatabase(): Database.Database {
  const db = new Database(":memory:");
  const base = path.join(__dirname, "..", "db");
  db.exec(fs.readFileSync(path.join(base, "schema.sql"), "utf8"));
  db.exec(fs.readFileSync(path.join(base, "seed.sql"), "utf8"));
  return db;
}
```

**`package.json`**
```json
{
  "name": "alan-tech-interview",
  "version": "1.0.0",
  "scripts": {
    "test": "jest --runInBand"
  },
  "dependencies": {
    "better-sqlite3": "latest"
  },
  "devDependencies": {
    "@types/better-sqlite3": "latest",
    "@types/jest": "latest",
    "@types/node": "latest",
    "jest": "latest",
    "ts-jest": "latest",
    "typescript": "latest"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "testMatch": ["**/src/**/*.test.ts"]
  }
}
```

**`tsconfig.json`**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "types": ["node", "jest"],
    "resolveJsonModule": true
  }
}
```

After generating:
```bash
cd sessions/YYYYMMDD-HHmm-tech-interview-[feature-slug]
npm install
npm test
```

Expected baseline: most tests fail; TypeScript compiles; DB setup works.

### Step 4 — Present the brief

```text
✅ Setup done. DB + tests are ready.

📋 Brief dans BRIEF.md
🗄️  Lis db/schema.sql et db/seed.sql avant de coder
📝 Complète src/model.ts (SQL) et/ou src/businessLogic.ts (TS) selon le brief
🧪 7 tests dans src/businessLogic.test.ts — ne les modifie pas
🎙️  Parle à voix haute → transcript.md
🔚  Dis-moi quand tu as fini pour le debrief
```

**`BRIEF.md` must include sections:**
- Contexte
- Fichiers fournis (`model`, `businessLogic`, `db`, tests)
- Ce que tu dois implémenter (SQL / TS / both)
- Schéma DB résumé (tables + relation)
- Règles métier + formules
- Les 7 scénarios de tests
- Contraintes (pas de regex TS, pas de ORM, ne pas modifier tests/types/schema)

### Step 5 — Coaching

If stuck on SQL:
- name the two tables and the linking key
- write `FROM ... INNER JOIN ... ON ...` first
- add `WHERE` + `ORDER BY`
- test the query via `db.prepare(...).all(...)`

If stuck on TS:
- read tests 5, 6, 7 first
- check rounding `Math.round(x * 100) / 100`
- check `changePercent` uses index `i - 1`

Do not give full solution during session.

### Step 6 — Review and debrief

1. Run `npm test`
2. Read `transcript.md`
3. Review `model.ts` SQL and `businessLogic.ts`
4. Write `debrief.md` covering SQL quality, TS logic, test traps, interview takeaways

## Legacy variant (no SQL)

Only use when the user explicitly asks to replay the pure IMC-style exercise:
- `src/types.ts`, `src/analyzer.ts`, `src/analyzer.test.ts`
- no `db/`
- same 7 test scenarios on in-memory arrays

## Subject bank

**Claim reimbursement timeline (default)**
`members` JOIN `claims` → TS computes rate, level, changePercent.

**Member BMI history from checkups table**
Single table SELECT ordered by date → TS computes BMI from weight/height columns.

**Care acts with canonical labels**
`care_events` JOIN `care_act_types` → TS maps to dashboard output.

**Teleconsultation usage**
`sessions` JOIN `members` → TS computes usage ratio over time.

## Code generation rules

- SQL uses parameterized queries (`?`) in `model.ts`
- close DB in tests with `afterEach(() => db.close())`
- seed dates as ISO strings if easier; convert in TS when needed
- keep one main exported business function
- no regex in generated TypeScript

Keep sessions realistic and aligned with the interview format: **SQLite model + TypeScript business logic + Jest**.
