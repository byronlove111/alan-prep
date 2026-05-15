---
name: alan-tech-challenge
description: Generates a TypeScript coding exercise simulating Alan's technical interview (45 min, CoderPad style). Use when the user says /alan-tech-challenge, wants to simulate Alan's technical interview, or wants to practice a timed coding challenge.
---

# Alan Tech Challenge

Simulates Alan's 45-minute technical interview. Based on their actual process: exercise on CoderPad, not an algo puzzle, close to real engineering work, starter code provided with a potential bug, unit tests already written for the happy path.

## Context loading — read before every session

Before proposing subjects, read `docs/alan-context.txt`, `docs/blog-articles.txt`, and `docs/glassdoor-interviews.txt`.
Use this to generate exercises grounded in Alan's real domain: their actual product areas, data flows, and engineering challenges. The exercise should feel like it could have come from Alan's real codebase, not a generic health insurance system.

## Facts to respect (from Alan's process)

- 45 minutes (the first 5 min of the real interview is icebreaker — so 45 min of actual coding)
- Starter code is given — partially working, may contain a subtle bug
- Unit tests already exist for the happy path
- Language: TypeScript (the candidate chose it — Alan allows any language for backend)
- Tools allowed during interview: AI (but must challenge output), Google, Stack Overflow
- NOT expected: Levenshtein, graph algorithms, DP, fancy data structures — brute force is explicitly fine
- The goal is to reach a working solution, not a perfect one
- **Format évolution (mai 2026)** : le test peut être backend-focused — pas uniquement de la logique de données ou du parsing. Les deux formats restent possibles.
- Le candidat peut choisir entre frontend et backend ; TypeScript est recommandé pour le backend
- Un exercice backend implique une architecture complète : controller → service → repository
- Des questions de raisonnement large peuvent être posées en plus du code (migrations SQL, locking, architecture)

## Step 0 — Propose 3 subjects

Before generating anything, propose exactly 3 distinct exercise ideas and ask the user to pick one.

Rules for the 3 proposals:
- Each must be a different type (`parsing`, `business-rules`, `data-processing`, `refactoring`, `backend-architecture`)
- Each must be in a different sub-domain of Alan's world (e.g. one on claims, one on members, one on documents)
- Include at least one `backend-architecture` subject per session to train the new format
- Present them as short pitches (2-3 lines each) — enough context to choose, not the full exercise
- Never propose something too similar to what was done in a previous session (check the `sessions/` folder if needed)

Format:
```
Voici 3 sujets pour aujourd'hui — choisis en un :

**A — [type] · [sub-domain]**
[2-3 line pitch]

**B — [type] · [sub-domain]**
[2-3 line pitch]

**C — [type] · [sub-domain]**
[2-3 line pitch]
```

Wait for the user's choice before generating anything.

## What to generate

Create folder `sessions/YYYYMMDD-HHmm-tech-challenge/` in the workspace with:

```
sessions/YYYYMMDD-HHmm-tech-challenge/
├── main.ts              # runnable entry point showing expected usage
├── [exercise-name].ts   # main logic — starter code + 1 intentional bug
├── [exercise-name].test.ts  # 2-3 tests already written (happy path + 1 basic case)
├── test-runner.ts       # minimal inline test helper (see below)
├── transcript.md        # empty — user pastes their oral recording here after the session
└── data/                # input text files (only if the exercise needs them)
```

`transcript.md` initial content:
```markdown
# Transcript — [date]

<!-- Colle ici le transcript de ton enregistrement oral après la session -->
```

**test-runner.ts** — always generate this exact file so the user can run tests with `npx tsx [exercise].test.ts`:

```typescript
export function test(description: string, fn: () => void) {
  try {
    fn();
    console.log(`✅ ${description}`);
  } catch (e: any) {
    console.log(`❌ ${description}: ${e.message}`);
  }
}

export function expect(value: any) {
  return {
    toBe: (expected: any) => {
      if (value !== expected)
        throw new Error(`Expected "${expected}", got "${value}"`);
    },
    toEqual: (expected: any) => {
      if (JSON.stringify(value) !== JSON.stringify(expected))
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(value)}`);
    },
    toContain: (expected: any) => {
      if (!value.includes(expected))
        throw new Error(`Expected value to contain "${expected}"`);
    },
  };
}
```

## Exercise design

**Domain**: Always Alan's world — health insurance, medical documents, member records, claims, reimbursements, healthcare acts. Never generic.

**Types** — rotate freely, don't reuse the same type twice in a row:
- `parsing` — extract or correct structured data from raw/dirty text
- `business-rules` — apply insurance rules, calculate reimbursements, validate claims
- `data-processing` — transform, filter, deduplicate member or claims records
- `refactoring` — existing code with a subtle bug, user must find + fix + extend
- `backend-architecture` — implement a REST endpoint with controller → service → repository structure; may include a reasoning question about migrations or SQL (see "Backend architecture exercise" below)

**The bug**: embed exactly 1 subtle bug in the starter code. Prefer boundary conditions: first/last element, empty input, index off-by-one, slice that misses the last character. The bug must be findable by writing a targeted unit test.

**CRITICAL — never reveal the bug**: do NOT add any comment in the starter code that hints at the bug location (no `// ❌`, no `// bug here`, no explanatory comment near the buggy line). The bug must be invisible to the reader. Only the agent knows where it is — the user must find it themselves via tests.

**Difficulty**: realistic for a final-year Master's student with some production experience. Not trivial, not impossible in 45 min.

## Backend architecture exercise

Use this format when the chosen subject is `backend-architecture`.

**What to generate instead of a single logic file:**

```
sessions/YYYYMMDD-HHmm-tech-challenge/
├── src/
│   ├── controllers/     ← receives HTTP request, validates input, calls service
│   ├── services/        ← business logic, orchestration, no direct DB access
│   ├── repositories/    ← data access layer (in-memory or stub — no real DB needed)
│   └── types.ts         ← shared domain types
├── main.ts              ← Express (or stub router) wiring — shows how the endpoint is mounted
├── [exercise-name].test.ts  ← integration-style tests calling the controller directly
├── test-runner.ts
└── transcript.md
```

**Brief format for backend exercises:**

- Give a feature brief framed as a product requirement: "Implement `POST /members/:id/documents` that uploads a document for a member"
- Specify the expected HTTP method, route, request body shape, and response shape
- Specify at least 2 error cases (e.g. member not found → 404, invalid file type → 422)

**Two scaffold levels — always use "from scratch" by default:**

**Level 1 — From scratch (default):**
- Only provide: `src/types.ts` (domain types) + `package.json` + `test-runner.ts` + empty folder structure
- The user writes everything: repository (in-memory store), service, controller, Express app wiring
- The bug: give a hint in the brief that a specific edge case must be handled — the user will naturally introduce the bug themselves if they don't think carefully
- Tests: provide 3-4 failing tests in `[exercise-name].test.ts` — no starter implementation anywhere

**Level 2 — Scaffolded (only if explicitly requested):**
- Provide the repository stub + types + app.ts wiring
- Leave the controller and service as empty stubs with signatures only
- The bug: embed it in the repository stub

**Reasoning question (optional but encouraged):**

After the code part, add one open-ended backend question for the user to answer verbally or in writing. Examples:
- "Ta migration pour ajouter une colonne `verified_at` échoue en prod — un job tourne sur cette table. Qu'est-ce que tu fais ?"
- "Tu vois des requêtes lentes sur `GET /claims`. Quelles pistes tu explores ?"
- "Ce service appelle 3 autres services pour construire sa réponse. Comment tu gères les pannes partielles ?"

These questions have no single right answer — the goal is to hear the candidate reason, not recite.

## Interviewer interruptions — mid-session questions

For all exercise types (not just backend), the agent plays the role of the interviewer and interrupts **once or twice** during the 45 minutes with a question. Never at the very start or the very end — interrupt when the user has written something to react to.

**3 moments to interrupt:**

**1. When the user has their structure laid out (10-15 min mark):**
System design angle:
- "If this endpoint is called 10,000 times per minute, what breaks first?"
- "Two simultaneous requests create the same document for the same member. What happens in your DB?"
- "How do you paginate the document list if a member has 10,000 documents?"

**2. When the user is mid-implementation (20-30 min mark):**
Complexity angle — react to their actual code:
- "You're calling `.find()` inside a loop here. What's the complexity?"
- "How would you make that O(1)?"
- "This SQL query does a full table scan. How would you fix that?"
- "You're making N repository calls for N members. How do you fix the N+1?"

**3. Wrap-up (last 5 min — if not already asked):**
One open backend reasoning question (pick from the list above or generate one relevant to their code).

**Rule:** Never ask more than 2 questions total. One mid-session, one at wrap-up. Keep the candidate coding — the interruption should take 60-90 seconds max.

## Examples — to inspire, not copy

These show the style and structure. Generate something original each time.

**Example A (parsing)**
Medical invoices arrive as raw text with occasional OCR typos. A dictionary of valid medical act codes is provided. Detect and correct single-character substitutions in act codes, then compute the total billed amount. Bug: the parser correctly handles acts in the middle of the document but skips the last one (off-by-one in the loop).

**Example B (business-rules)**
Given a list of healthcare reimbursement requests, apply coverage rules: 70% rate, €500 yearly cap, some act codes excluded, dental capped separately at €200/year. Bug: the yearly cap resets correctly for most members but not when a member has exactly 1 claim (boundary case).

**Example C (data-processing)**
A list of insurance members exported from two systems contains duplicates. Same person may appear with slightly different name formatting or email casing. Detect duplicates by matching on birthdate + normalized name, merge their records. Bug: normalization function trims spaces but doesn't lowercase, missing case-insensitive duplicates.

**Example D (refactoring)**
A claims batch processor groups claims by member ID and computes totals per batch. The existing code works for members with multiple claims but silently drops members with exactly 1 claim. User must: find the bug via tests, fix it, then extend the processor to flag claims above a suspicious amount threshold.

**Example E (backend-architecture)**
Implement `POST /members/:id/documents` that records a new document for a member (type, filename, uploaded_at). The repository stub exists but has a bug: it crashes on members with no prior documents because it tries to push into `undefined` instead of initializing the array. The service and controller files are empty stubs. Bonus reasoning question: "Ta migration pour ajouter `verified_at` sur la table `documents` échoue en prod parce qu'un long-running job lock la table. Qu'est-ce que tu fais ?"

## Backend concepts to know

Reference these when generating backend exercises or reasoning questions. Also useful for the user as a quick reminder before a session.

### Controller / Service / Repository pattern
- **Controller**: receives the HTTP request, validates input (body, params, query), calls the service, formats and returns the HTTP response. No business logic here.
- **Service**: contains the business logic, orchestrates calls between repositories and other services. Never touches the DB directly.
- **Repository**: abstraction over the data layer — wraps SQL/ORM queries. Swappable for tests (in-memory stub vs real DB).
- Why this separation: testability (each layer can be tested in isolation), single responsibility, easier to swap implementations.

### Database migrations
- Versioned files that modify the DB schema (CREATE TABLE, ALTER TABLE, ADD COLUMN, ADD INDEX...).
- Run sequentially; once applied, they're not re-run.
- **Prod pitfalls**:
  - `ALTER TABLE` can take an exclusive lock on the table → blocks all reads and writes while running.
  - Rolling deploys: old and new code run simultaneously → new columns must be backward-compatible (nullable, with a default).
  - Strategies for zero-downtime: additive-first (add nullable column → backfill → add constraint), or use tools like `pg-osc` (Postgres), `gh-ost` (MySQL).
  - Creating indexes: use `CREATE INDEX CONCURRENTLY` in Postgres to avoid locking.

### SQL basics
- **Transactions**: group of operations that succeed or fail together. ACID: Atomicity, Consistency, Isolation, Durability.
- **Locks**: shared lock (read, concurrent), exclusive lock (write, blocks others). Deadlock = two transactions each waiting on the other's lock.
- **Indexes**: speed up lookups (B-tree default). Trade-off: faster reads, slower writes, disk space. Don't index everything.
- **N+1 problem**: load N entities then make N individual queries → fix with a join or `IN (ids)`.

### REST conventions
- `GET` (read, idempotent), `POST` (create), `PUT` (full replace), `PATCH` (partial update), `DELETE`.
- Status codes: `200` OK, `201` Created, `400` Bad Request, `401` Unauthorized, `403` Forbidden, `404` Not Found, `409` Conflict, `422` Unprocessable Entity, `500` Internal Server Error.
- Error response structure: `{ error: string, message: string, code?: string }`.
- Always validate input before hitting the service layer.

## How to run the session

After generating the files:

1. Show the user a clear exercise brief (goal, inputs, expected output, constraints)
2. Then display exactly this block:

```
⏱️  CHRONO — 45 minutes. Partez maintenant.

🎙️  Parlez à voix haute pendant TOUT l'exercice.
    Narrez votre raisonnement, vos doutes, vos décisions.
    Si vous bloquez, dites-le. C'est un signal positif, pas négatif.

✅  Checklist des signaux Alan à démontrer :
    - [ ] Identifier les types de cas à gérer (comme les types de typos chez Alan)
    - [ ] Écrire des tests unitaires à chaque nouvelle étape
    - [ ] Trouver le bug via les edge cases, pas par chance
    - [ ] Brute force d'abord — nommer les problèmes de perf sans les fixer maintenant
    - [ ] Utiliser l'IA si besoin, mais challenger son output
    - [ ] Atteindre l'objectif final dans le temps imparti

🔚  Quand vous avez fini (ou que les 45 min sont écoulées) :
    Collez votre code final + le transcript de votre session dans /alan-interview-review
```

3. Do not interfere during the 45 minutes unless the user asks a direct question.
4. After the session, remind the user: paste your oral transcript into `transcript.md`, then run `/alan-interview-review` — the debrief will be written to `debrief.md` in the same folder.
