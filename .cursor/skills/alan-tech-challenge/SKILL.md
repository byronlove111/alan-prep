---
name: alan-tech-challenge
description: Generates a TypeScript coding exercise simulating Alan's technical interview (45 min, CoderPad style). Use when the user says /alan-tech-challenge, wants to simulate Alan's technical interview, or wants to practice a timed coding challenge.
---

# Alan Tech Challenge

Simulates Alan's 45-minute technical interview. CoderPad style, not an algo puzzle — close to real engineering work. The candidate writes TypeScript backend code from scratch with an intentionally incomplete brief.

## Context loading — read before every session

Before proposing subjects, read `docs/alan-context.txt`, `docs/blog-articles.txt`, and `docs/glassdoor-interviews.txt`.
Use this to generate exercises grounded in Alan's real domain: their actual product areas, data flows, and engineering challenges.

## Facts to respect (from Alan's process + direct feedback from Alan engineer)

- 45 minutes of actual coding
- Language: TypeScript (candidate's choice — Alan allows any language)
- Tools allowed: AI (but must challenge output), Google, Stack Overflow
- NOT expected: Levenshtein, graph algorithms, DP, fancy data structures — brute force is explicitly fine
- The goal is to reach a working solution, not a perfect one
- The test is **100% backend**: controller → service → repository, Express, TypeScript
- Reasoning questions are asked mid-session and at wrap-up — niche backend questions where reasoning matters more than the exact answer
- **Brief is intentionally incomplete** — the user must ask questions before coding

## What Alan actually evaluates (confirmed by engineer, May 2026)

1. **Question-asking before coding** — can you identify what you don't know before writing a line?
2. **Understanding validation** — do you summarize your understanding and confirm before starting?
3. **Design before coding** — do you think through data model, layers, edge cases, and prod risks before writing code?
4. **Proactive thinking** — do you raise problems and edge cases before being asked?
5. **Think out loud** — do you narrate your reasoning, decisions, and doubts throughout?
6. **TDD** — do you write tests before or alongside your implementation?
7. **Test type awareness** — do you know the difference between unit, integration, and e2e tests?
8. **Reasoning under uncertainty** — if you don't know the answer, do you reason out loud and show your thinking?
9. **Niche backend questions** — not about memorizing answers, about showing you can deconstruct a problem

---

## Step 0 — Propose 3 subjects

Before generating anything, propose exactly 3 distinct exercise ideas and ask the user to pick one.

Rules for the 3 proposals:
- Each must be a different type (`endpoint-business-rules`, `endpoint-data-processing`, `endpoint-debug`, `cron-job`, `endpoint-pagination`, `endpoint-notion`)
- Each must be in a different sub-domain of Alan's world (claims, members, documents, contracts, reimbursements)
- Include at least one type involving non-trivial backend complexity per session (cron-job, endpoint-notion, or endpoint-debug)
- Present them as short pitches (2-3 lines each)
- Never propose something too similar to a previous session (check the `sessions/` folder)

Format:
```
Here are 3 subjects for today — pick one:

**A — [type] · [sub-domain]**
[2-3 line pitch]

**B — [type] · [sub-domain]**
[2-3 line pitch]

**C — [type] · [sub-domain]**
[2-3 line pitch]
```

Wait for the user's choice before generating anything.

---

## Step 0.5 — Generate brief + files immediately

As soon as the user picks a subject, do two things in the same response:

1. **Give the brief** (intentionally incomplete — same rules as before: 1-2 sentences context, high-level goal, 3-4 details left unspecified)
2. **Generate all session files** in `sessions/YYYYMMDD-HHmm-tech-challenge/`

The user needs to see `schema.sql`, `types.ts`, and the failing tests BEFORE asking questions — it gives them the vocabulary to ask better questions and understand the domain.

After generating the files, say:
**"Les fichiers sont créés. Lis le schema et les types, puis pose tes questions."**

Then wait for questions.

### File structure

**All exercises are backend (controller → service → repository):**
```
sessions/YYYYMMDD-HHmm-tech-challenge/
├── src/
│   ├── types.ts             # raw DB record types — provided
│   ├── app.ts               # Express app + error middleware — provided
│   ├── domain/              # entity classes with business methods — user creates files
│   ├── controllers/         # user creates files
│   ├── services/            # user creates files
│   └── repositories/        # user creates files
├── db/
│   ├── database.ts          # DB connection singleton (better-sqlite3)
│   ├── schema.sql           # CREATE TABLE statements
│   └── seed.ts              # seed data — npx tsx db/seed.ts to populate
├── [exercise-name].test.ts  # 3-4 failing tests calling the service directly
├── [exercise-name].http.test.ts  # 2-3 failing HTTP tests via supertest — provided
├── test-runner.ts
├── package.json             # express + better-sqlite3 + supertest + tsx + typescript
└── transcript.md
```

Provided files: `types.ts`, `app.ts`, `db/`, `test-runner.ts`, `package.json`, `[exercise-name].test.ts`, and `[exercise-name].http.test.ts`. The user writes everything else (domain, controllers, services, repositories).

**OOP rules — always apply:**
- Services and repositories MUST be classes (never plain functions or objects).
- For `endpoint-business-rules` and `cron-job` exercises: also require a `src/domain/` folder with entity classes that carry business logic.
- Entity classes have methods that encode business rules — NOT the service.
  ```typescript
  // src/domain/Claim.ts
  export class Claim {
    constructor(private readonly data: ClaimRecord) {}
    getId(): number { return this.data.id; }
    getStatus(): ClaimStatus { return this.data.status; }
    canBeStalled(): boolean { return this.data.status === "processing"; }
    stall(): Partial<ClaimRecord> { return { status: "stalled", stalled_at: new Date().toISOString() }; }
    toJSON(): ClaimRecord { return { ...this.data }; }
  }
  ```
- The repository converts raw DB records → entity instances. The service works only with entity instances, never with raw rows.
- `types.ts` contains only raw DB record interfaces (e.g. `ClaimRecord`, `MemberRecord`). Domain types (enums, status unions) live there too.
- For `endpoint-pagination`, `endpoint-debug` and `endpoint-data-processing`: classes for service/repository are required; domain entity layer is optional.
- The controller MUST be written for every exercise. It:
  - Uses `express.Router()`
  - Validates the request body (checks required fields, returns 400 if invalid)
  - Checks auth (`req.memberId === req.params.id` → 403 if mismatch) when applicable
  - Calls the service and returns the result with the correct status code
  - Never catches errors — the global error middleware in `app.ts` handles them

**package.json** must always include:
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "better-sqlite3": "^9.0.0"
  },
  "devDependencies": {
    "@types/better-sqlite3": "^7.6.0",
    "@types/express": "^4.17.21",
    "@types/node": "^20.0.0",
    "@types/supertest": "^6.0.0",
    "supertest": "^7.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.0.0"
  }
}
```

**`db/database.ts`** must always be:
```typescript
import Database from "better-sqlite3";
const db = new Database("./dev.db");
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
export default db;
```

**`src/app.ts`** must always be:
```typescript
import express from "express";
import { AppError } from "./errors/AppError";

const app = express();
app.use(express.json());

// Routes are imported here by the user
// e.g. import { router } from "./controllers/[feature]Controller";
// app.use("/", router);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const status = err.statusCode ?? 500;
  res.status(status).json({ error: err.message ?? "Internal server error" });
});

export default app;
```

The user must:
1. Create `src/errors/AppError.ts` with `class AppError extends Error { constructor(public message: string, public statusCode: number) { super(message); } }`
2. Create their controller that exports a `router`
3. Uncomment and add the import + `app.use()` in `app.ts` for their router

The repository imports `db` directly and uses raw SQL:
```typescript
import db from "../../db/database";
// Example:
const member = db.prepare("SELECT * FROM members WHERE id = ?").get(memberId);
```

**For `endpoint-debug`:** also provide the buggy `src/` files (controller + service + repository with exactly 1 subtle hidden bug). The user must find and fix the bug, then extend the feature.

**test-runner.ts** — always generate this exact file:
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
    toBeUndefined: () => {
      if (value !== undefined)
        throw new Error(`Expected undefined, got "${JSON.stringify(value)}"`);
    },
    toBeDefined: () => {
      if (value === undefined)
        throw new Error(`Expected a value, got undefined`);
    },
  };
}
```

**`[exercise-name].http.test.ts`** — always generate alongside the service tests. Uses supertest to test the full HTTP stack. Example structure:
```typescript
import request from "supertest";
import app from "./src/app";
import db from "./db/database";
import { readFileSync } from "fs";
import { join } from "path";

const schema = readFileSync(join(__dirname, "db/schema.sql"), "utf-8");
db.exec(schema);

function resetDb() { /* same as service tests */ }

// 2-3 HTTP-level tests (happy path + 1-2 error cases)
// These call the real HTTP endpoint via supertest
// They fail until the user wires up the controller in app.ts
```
Generate 2-3 HTTP tests that complement (not duplicate) the service tests:
- 1 happy path: POST returns 201 with the created resource
- 1 error: 404 or 422 with the correct error shape `{ error: string }`
- 1 auth check if applicable: 403 when memberId mismatch

---

## Step 1 — Question-asking phase

The user now has the schema, types, and tests in front of them. Ask:

**"Before coding — what questions do you have?"**

Wait for the user's questions. Answer them one by one, as a real interviewer would.

**Evaluate the question-asking phase:**
- Good questions: clarify edge cases, error handling, data shape, business constraints, expected behavior at boundaries, concurrency assumptions, scale expectations
- Bad questions: ask for implementation hints, ask what framework to use, ask about things already stated in the brief
- If the user tries to code before asking enough questions, say: *"Take a moment — what do you still not know about this problem?"*

---

## Step 2 — Validate understanding before coding

Once the user has finished asking questions, they must summarize their understanding.

Prompt them: **"Before you start — tell me what you're going to implement, point by point."**

The user should say something like: *"Okay, so: 1) the endpoint is POST /members/:id/claims, 2) I validate the member exists, 3) actCode must not be empty and amount must be > 0, 4) no duplicate claim for the same member + actCode + day, 5) on success I return 201 with the created claim."*

Only once this summary is validated, move to the design phase.

---

## Step 2.5 — Design phase (5-10 minutes)

Run a mandatory design phase before the user starts coding.

Ask: **"Before coding — design it out loud. Walk me through: your data model, the layers you'll create, the edge cases you anticipate, and what could break in production."**

The candidate must cover:
1. **Data model** — what entities, what fields, what relations?
2. **Layer breakdown** — what does the controller do? the service? the repository?
3. **Edge cases** — what inputs or states could go wrong? (without being prompted)
4. **Production risks** — concurrency, performance, migration side effects, scale
5. **Member/product impact** — what does this change for the member experience?

**Evaluate proactiveness:**
- Does the candidate raise problems before being asked?
- Does the candidate think about the member/client, not just the code?
- Does the candidate identify concurrency or scale risks before writing a line?

If the design is thin, give a nudge:
- *"What about concurrent requests hitting this endpoint for the same member?"*
- *"What about members with no prior data?"*
- *"At 100k claims per day, what does this query cost?"*
- *"What if the cron job runs on 3 pods at the same time?"*

Only confirm the design and move to Step 3 once the design is solid enough to start. If the candidate skips this phase entirely, do not proceed to Step 3 — prompt them again.

---

## Step 3 — Run the session

Display this block once the design is validated:

```
⏱️  CHRONO — 45 minutes. Go.

🎙️  Talk out loud throughout the entire exercise.
    Narrate your reasoning, decisions, and doubts.
    If you're stuck, say it — that's a positive signal.

✅  Checklist:
    - [ ] Summary validated before coding
    - [ ] Design phase completed (data model, layers, edge cases, prod risks)
    - [ ] Mentioned edge cases BEFORE being asked
    - [ ] Thought about concurrency or scale without being prompted
    - [ ] Mentioned member/UX impact during design
    - [ ] Tests written before or alongside implementation
    - [ ] Named test types (unit / integration / e2e) in context
    - [ ] Reached the final objective within the time limit
    - [ ] Amounts stored in cents (INTEGER), never FLOAT
    - [ ] Mutations wrapped in a transaction when touching multiple tables
    - [ ] Foreign keys enabled and respected
    - [ ] Services and repositories implemented as classes
    - [ ] Business logic lives on entity methods, not in the service (endpoint-business-rules / cron-job)
    - [ ] Controller written with express.Router()
    - [ ] Controller wired into app.ts
    - [ ] HTTP tests pass (npm run test:http)
    - [ ] README written before submitting

🔚  When you're done:
    Paste your transcript into transcript.md then run /alan-interview-review
```

Do not interfere during the 45 minutes unless:
- The user asks a direct question → answer it but give a hint, not the solution
- The user is clearly stuck for more than 5 minutes → give a small nudge: *"What have you tried so far? What do you know for certain?"*

---

## Step 5 — Post-session quick questions (2 questions, ~3 min total)

Ask these **immediately after the 45 min**, before the deep wrap-up. Pick one from each bank — react to what the user actually built.

**Question 1 — System design / product angle:**
- "If this endpoint is called by 10,000 members simultaneously, what breaks first?"
- "Two requests hit this at the same time for the same member. What happens?"
- "How do you handle the case where the member is deleted while this request is in flight?"
- "Your cron job runs on 3 pods. What happens to the batch?"
- "What would you add to improve the UX on the front-end side for this feature?"
- "Comment tu sais que c'est bien ce membre qui appelle cet endpoint — et pas un autre ?"
- "Si le client envoie la même requête deux fois à cause d'un retry réseau, que se passe-t-il ?"

**Question 2 — Complexity / SQL angle (react to their actual code):**
- "You're calling `.find()` in a loop here. What's the time complexity?"
- "How would you make that O(1)?"
- "If this table had 10M rows and no index, what does this query cost?"
- "You're making N DB calls for N members. How do you fix the N+1?"
- "Your pagination uses OFFSET. What happens at page 10,000?"
- "Ce claim est en statut `approved` — si quelqu'un envoie une requête pour le passer en `pending`, qu'est-ce qui se passe ?"
- "Tu as un `DELETE FROM claims` ici. Dans un système de santé, est-ce qu'on supprime vraiment des données ?"
- "Ta méthode `canBeStalled()` est sur l'entité. Qu'est-ce que tu perds si tu la mets dans le service à la place ?"

**Rule:** Each question takes 60-90 seconds max. The user answers, you react briefly, then move to Step 6.

---

## Step 6 — Wrap-up reasoning question

After the 45 min or when the user finishes, ask one niche backend reasoning question. Pick one that is relevant to what they built. Examples:

**Migrations:**
- "Your migration to add `verified_at` on the `claims` table fails in prod — a long-running job locks the table. What do you do?"
- "You need to rename column `user_id` to `member_id` with zero downtime. How do you proceed?"
- "You add a NOT NULL constraint on an existing column in prod. What can go wrong?"

**Concurrency:**
- "Two instances of your service run in parallel. A member submits two claims at the same moment. How do you prevent the duplicate?"
- "Your cron job runs on 3 pods. How do you prevent it from executing 3 times?"

**Scale:**
- "Your endpoint averages 500ms at 100 req/s. At 10,000 req/s, what happens?"
- "Your `claims` table has a FK to `members`. At 100M rows, how important is it to index that FK?"

**Product:**
- "The front-end needs to show claim status in real time. How do you architect that?"
- "A member wants a notification when their reimbursement is validated. What do you change?"

**Auth & Idempotency:**
- "Un membre appelle `POST /claims` depuis l'app mobile. Comment tu vérifies qu'il est bien authentifié et que la requête est pour son propre compte ?"
- "La connexion du client coupe après que l'endpoint a créé le claim mais avant que la réponse arrive. Le client retente. Tu crées deux claims ?"
- "Tu veux envoyer un email à chaque approbation de claim. Tu l'envoies directement dans le service ou tu le délègues à une queue ?"

**State machines:**
- "Un claim est en statut `rejected`. Le membre veut le resoumettre. Quelles transitions sont valides ? Comment tu modélises ça ?"

**Evaluate reasoning, not the exact answer.** If the user says "I don't know" → prompt: *"What do you know about this? What would you try first?"* Give a small hint if needed. The goal is to see them think, not to stump them.

---

## Step 7 — README as deliverable

After the code and reasoning question, the user must write a `README.md` in the session folder.

Prompt the user: **"Before we debrief — write your README.md. Treat it like a pull request description your teammates will read."**

The README must cover:
1. **Approach** — how you thought about the problem, why you structured it this way
2. **Technical choices** — why this data model, why this layer separation, key decisions made
3. **Edge cases handled** — what you explicitly covered and why
4. **Known issues / limitations** — what you didn't handle and why
5. **Potential improvements** — what you'd do with more time (concurrency, indexes, caching...)
6. **How to run** — setup, seed, start, test commands

Evaluate the README on:
- Is it concise and clear? (no wall of text)
- Does it explain the WHY, not just the WHAT?
- Does it anticipate reviewer questions?
- Does it mention improvements honestly?

A good README is worth as much as good code in a real interview.

---

## Exercise design

**Domain**: Always Alan's world — health insurance, medical documents, member records, claims, reimbursements, contracts, healthcare acts. Never generic.

**Types:**
- `endpoint-business-rules` — REST endpoint applying Alan business rules (reimbursement calculation, coverage validation, eligibility checks); if the operation touches multiple tables, the brief must explicitly require atomicity
- `endpoint-data-processing` — REST endpoint performing aggregation, deduplication, or export of claims/member data; if the operation writes to multiple tables, the brief must explicitly require atomicity
- `endpoint-debug` — existing backend (controller + service + repository) with exactly 1 subtle hidden bug; user finds, fixes, and extends
- `cron-job` — async batch processing (reimbursement notifications, reconciliation, cleanup of stale records)
- `endpoint-pagination` — cursor-based or offset pagination on a claims or member collection
- `endpoint-notion` — focus on a precise DB concept: transactions, foreign keys, migrations, indexes

**The bug (for `endpoint-debug`):** embed exactly 1 subtle bug. Prefer boundary conditions: off-by-one, wrong comparison, missing null check, incorrect filter in repository layer, wrong status transition. Never reveal it in comments.

**CRITICAL — never reveal the bug:** no `// ❌`, no `// bug here`, no hints near the buggy line.

---

## Backend concepts reference

### Controller / Service / Repository
- **Controller**: receives HTTP request, validates input (400 if invalid), checks auth (403 if unauthorized), calls service, returns response. No business logic. Uses `express.Router()`. Never try/catches — delegates to global error middleware.
- **Service**: business logic, orchestration. Never touches DB directly.
- **Repository**: data access layer. Uses better-sqlite3 with raw SQL. In prod: wraps SQL/ORM.

### Express Router & App wiring
```typescript
// src/controllers/beneficiariesController.ts
import { Router } from "express";
const router = Router();

router.post("/members/:id/beneficiaries", (req, res) => {
  const { id } = req.params;
  // 1. Validate body
  const { type, first_name, last_name, birth_date } = req.body;
  if (!type || !first_name || !last_name || !birth_date) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // 2. Auth check
  if (req.memberId !== id) return res.status(403).json({ error: "Forbidden" });
  // 3. Call service (throws AppError on failure → caught by global middleware)
  const result = service.addBeneficiary(id, req.body);
  res.status(201).json(result);
});

export { router };
```
- Wire in `app.ts`: `app.use("/", router)`
- The global error middleware in `app.ts` catches all `AppError` throws automatically
- `req.memberId` is injected by an auth middleware (in exercises, assume it's already set)

### SQLite with better-sqlite3
- Synchronous API — no async/await needed
- `db.prepare("SELECT ...").get(param)` — single row
- `db.prepare("SELECT ...").all(param)` — multiple rows
- `db.prepare("INSERT ...").run(params)` — insert/update/delete
- Transactions:
  ```typescript
  const tx = db.transaction(() => {
    db.prepare("UPDATE ...").run(...);
    db.prepare("INSERT ...").run(...);
  });
  tx(); // atomic — all or nothing
  ```
- Always store monetary amounts in INTEGER cents (never FLOAT)
  - "14.50" EUR → 1450 cents
  - `Math.round(parseFloat(amount) * 100)`
- Foreign keys: enabled via `db.pragma("foreign_keys = ON")`

### Database migrations
- `ALTER TABLE` takes an exclusive lock → blocks all reads/writes.
- Zero-downtime strategy: additive-first (add nullable column → backfill → add constraint).
- `CREATE INDEX CONCURRENTLY` in Postgres avoids locking.

### SQL basics
- **Transactions**: ACID — all or nothing.
- **Locks**: shared (read), exclusive (write). Deadlock = two txns waiting on each other.
- **Indexes**: faster reads, slower writes. Always index foreign keys.
- **N+1**: N entities → N queries → fix with join or `IN (ids)`.

### Pagination
- **Offset-based**: `LIMIT n OFFSET k` — simple but degrades at high page numbers (full scan to skip rows).
- **Cursor-based**: encode last seen `id` or `created_at` in the token → stable and fast regardless of depth.

### Cron jobs
- Idempotency: the job must produce the same result if run twice.
- Distributed lock: use a DB lock or Redis SETNX to prevent multi-pod duplicate runs.
- Dead letter: if a batch item fails, log it and move on — never block the whole batch.

### REST conventions
- `GET` (idempotent), `POST` (create), `PUT` (replace), `PATCH` (partial), `DELETE`.
- Status codes: `200`, `201`, `400`, `401`, `403`, `404`, `409`, `422`, `500`.
- Error shape: `{ error: string, message: string }`.

### Test types
- **Unit**: test a single function in isolation. Fast, no DB, no HTTP.
- **Integration**: test multiple layers together (e.g. service + repository). May use a test DB.
- **End-to-end**: test the full stack via HTTP (e.g. Supertest, Playwright). Slowest, most realistic.
- In a 45-min exercise: write unit tests. Mention you'd add integration tests in a real project.

### Error handling
- Custom error class : `class AppError extends Error { constructor(public message: string, public statusCode: number) { super(message); } }`
- Le service **lance** une erreur (`throw new AppError("Not found", 404)`), ne retourne jamais `{ error, code }`.
- Le controller ne fait jamais de `try/catch` — un middleware global Express attrape toutes les `AppError`.
- Middleware global : `app.use((err: AppError, req, res, next) => res.status(err.statusCode).json({ error: err.message }))`
- 400 = bad input, 401 = not authenticated, 403 = forbidden, 404 = not found, 409 = conflict, 422 = business rule violation

### OOP & Domain Entities
- Services et repositories sont toujours des **classes**, jamais des objets littéraux ou des fonctions exportées.
- Le repository retourne des **instances d'entité**, pas des rows brutes : `return new Claim(row)`.
- Les entités portent la **logique métier** : `claim.canBeStalled()`, `contract.isExpired()`, `member.isActive()`.
- Le service orchestre : il ne contient pas de règles métier — il délègue aux entités.
- `types.ts` = interfaces pour les rows DB. `src/domain/` = classes avec comportement.
- Avantage : la logique est testable unitairement sur l'entité, sans toucher la DB ni le service.
- Pattern repository complet :
  ```typescript
  // repository retourne une entité
  findById(id: number): Claim | null {
    const row = db.prepare("SELECT * FROM claims WHERE id = ?").get(id) as ClaimRecord | undefined;
    return row ? new Claim(row) : null;
  }
  // service travaille avec l'entité
  stall(claimId: number): void {
    const claim = this.claimsRepository.findById(claimId);
    if (!claim) throw new AppError("Claim not found", 404);
    if (!claim.canBeStalled()) throw new AppError("Invalid transition", 422);
    this.claimsRepository.update(claimId, claim.stall());
  }
  ```

### Idempotency
- Un POST soumis deux fois (retry réseau, double-click) ne doit produire l'effet qu'une seule fois.
- Stratégie DB : contrainte `UNIQUE` sur les champs métier (ex: `UNIQUE(member_id, act_code, date)`) → la DB rejette le doublon, le service attrape l'erreur et retourne 409.
- Stratégie header : `Idempotency-Key: <uuid>` — le serveur stocke la réponse et la rejoue si la clé est vue deux fois.
- Retourner 200 (déjà traité) ou 201 (créé), jamais créer deux fois.

### State machines
- Les entités Alan (claims, contracts) ont des statuts avec des transitions définies.
- Exemple : `pending → processing → approved | rejected`. La transition `pending → approved` est invalide.
- Le service valide la transition AVANT l'UPDATE : si invalide → `throw new AppError("Invalid transition", 422)`.
- Ne jamais faire `UPDATE SET status = ?` sans vérifier l'état courant d'abord.

### Soft deletes
- Dans un système de santé, on ne supprime jamais de données (`DELETE` est interdit).
- Ajouter `deleted_at TIMESTAMP NULL` à chaque table. Suppression = `UPDATE SET deleted_at = datetime('now')`.
- Toutes les queries filtrent `WHERE deleted_at IS NULL`.
- Permet un audit trail complet et facilite la conformité (RGPD, HIPAA).

### Authentication & Authorization
- `Authorization: Bearer <jwt>` header sur chaque requête.
- Middleware auth : vérifie le token, extrait le `memberId`, l'injecte dans `req.memberId`.
- Authorization : le controller vérifie `req.memberId === req.params.memberId` — un membre ne peut pas agir pour un autre.
- 401 = non authentifié (pas de token / token expiré), 403 = authentifié mais non autorisé.

### Background jobs vs Cron
- **Cron** : s'exécute à heure fixe, traite un batch global (ex : tous les claims `pending` à minuit).
- **Queue (Bull/BullMQ)** : traite un item individuel de manière asynchrone, déclenché par un événement (ex : envoyer un email quand UN claim est approuvé). Retry automatique sur échec.
- Différence clé : le cron est planifié, la queue réagit à un événement.
- Dead letter queue : si un item échoue N fois, il est mis de côté pour inspection manuelle sans bloquer la queue.

### Cursor-based pagination (implémentation)
```typescript
// Cursor = dernier id vu, encodé en base64
// GET /claims?limit=20&cursor=eyJpZCI6NDJ9
const decodedCursor = cursor ? JSON.parse(Buffer.from(cursor, 'base64').toString()) : null;
const rows = db.prepare(
  `SELECT * FROM claims WHERE deleted_at IS NULL ${decodedCursor ? 'AND id > ?' : ''} ORDER BY id ASC LIMIT ?`
).all(...(decodedCursor ? [decodedCursor.id, limit] : [limit]));
const nextCursor = rows.length === limit
  ? Buffer.from(JSON.stringify({ id: rows[rows.length - 1].id })).toString('base64')
  : null;
// Réponse : { data: rows, nextCursor }
```
