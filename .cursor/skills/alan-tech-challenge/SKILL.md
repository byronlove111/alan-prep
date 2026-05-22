---
name: alan-tech-challenge
description: Generates a TypeScript coding exercise simulating Alan's technical interview (45 min, CoderPad style). Use when the user says /alan-tech-challenge, wants to simulate Alan's technical interview, or wants to practice a timed coding challenge.
---

# Alan Tech Challenge

Simulates Alan's 45-minute technical interview: realistic backend work in TypeScript, not an algo puzzle. The brief is intentionally incomplete so the candidate must ask questions, validate understanding, design first, then code.

## Context loading — read before every session

Before proposing subjects, read `docs/alan-context.txt`, `docs/blog-articles.txt`, and `docs/glassdoor-interviews.txt`.
Use them to keep exercises grounded in Alan's real product, vocabulary, and engineering concerns.

## Facts to respect (from Alan's process + direct feedback from Alan engineer)

- 45 minutes of actual coding
- Language: TypeScript
- Tools allowed: AI, Google, Stack Overflow
- Not expected: advanced algorithms or fancy data structures
- Goal: reach a working solution, not a perfect one
- Test is 100% backend: controller → service → repository, Express, TypeScript
- Reasoning questions happen during and after the session
- The brief must stay intentionally incomplete
- Use Jest by default for all generated tests; do not generate a homemade `test-runner.ts`

## What Alan actually evaluates (confirmed by engineer, May 2026)

1. Question-asking before coding
2. Validation of understanding before starting
3. Design before coding
4. Proactive thinking about edge cases and risks
5. Thinking out loud during the whole session
6. Tests before or alongside implementation
7. Test type awareness
8. Reasoning under uncertainty
9. Backend reasoning more than memorized answers

---

## Step 0 — Propose 3 subjects

Before generating anything, propose exactly 3 distinct exercise ideas and ask the user to pick one.

Rules:
- Each proposal must use a different type: `endpoint-business-rules`, `endpoint-data-processing`, `endpoint-debug`, `cron-job`, `endpoint-pagination`, `endpoint-notion`, or `endpoint-state-machine`
- Each must use a different Alan sub-domain: claims, members, documents, contracts, reimbursements
- Include at least one non-trivial backend-heavy option per session (`cron-job`, `endpoint-notion`, or `endpoint-debug`)
- Keep each pitch short: 2-3 lines
- Avoid repeating something too close to a previous session in `sessions/`

Format:
```text
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

As soon as the user picks a subject, do both in the same response:

1. Give the brief: 1-2 sentences of context, one clear goal, and 3-4 important details left unspecified on purpose
2. Generate the full session in `sessions/YYYYMMDD-HHmm-tech-challenge/`

The user must see `schema.sql`, `types.ts`, and the failing tests before asking questions.

After file generation, say exactly:
**"Les fichiers sont créés. Lis le schema et les types, puis pose tes questions."**

Then wait for questions.

### File structure

```text
sessions/YYYYMMDD-HHmm-tech-challenge/
├── src/
│   ├── types.ts
│   ├── app.ts
│   ├── controllers/
│   ├── services/
│   └── repositories/
├── db/
│   ├── database.ts
│   ├── schema.sql
│   └── seed.ts
├── [exercise-name].test.ts
├── [exercise-name].http.test.ts
├── package.json
├── tsconfig.json
└── transcript.md
```

Provided by default: `types.ts`, `app.ts`, `db/`, `package.json`, `tsconfig.json`, `[exercise-name].test.ts`, and `[exercise-name].http.test.ts`.
The user creates the feature files in `controllers/`, `services/`, and `repositories/`, and only adds `domain/` if the exercise is `endpoint-state-machine`.

### Generation rules

- Always keep the architecture backend-only: controller → service → repository
- use Jest by default for all generated tests; do not generate a homemade `test-runner.ts`
- `package.json` must include `express`, `better-sqlite3`, `supertest`, `jest`, `ts-jest`, `@types/jest`, `@types/express`, `@types/supertest`, and `typescript`
- `db/database.ts` must use `better-sqlite3`, enable WAL, and enable foreign keys
- `app.ts` must expose an Express app with JSON parsing and a global error middleware
- The repository imports `db` directly and uses raw SQL
- Always generate 3-4 failing service tests plus 2-3 failing HTTP tests with `supertest`
- HTTP tests must complement service tests, not duplicate them
- If the exercise is `endpoint-debug`, provide the buggy controller/service/repository files with exactly 1 subtle hidden bug
- Design schema and tests so repositories can stay on simple single-table queries; if multiple tables are involved, combine results in TypeScript, not SQL joins

### OOP rules

- Services and repositories must be classes
- Do not generate a domain layer by default
- `src/domain/` is used only for `endpoint-state-machine` exercises
- For all other exercise types, business logic stays in the service
- If the exercise is `endpoint-state-machine`, transition logic belongs on the entity and the repository may return entity instances instead of raw rows
- `types.ts` contains raw DB record interfaces and shared unions/enums
- Every exercise still needs a controller using `express.Router()`, validating input, checking auth when relevant, calling the service, and letting the global middleware handle errors

### Default test stack

For every generated tech challenge session, default to:
- `jest`
- `ts-jest`
- `@types/jest`
- `@types/node`
- `supertest`
- `typescript`

Use this minimal config:

**`package.json`**:
```json
{
  "name": "alan-tech-challenge",
  "version": "1.0.0",
  "scripts": { "test": "jest --runInBand" },
  "dependencies": {
    "better-sqlite3": "latest",
    "express": "latest",
    "supertest": "latest"
  },
  "devDependencies": {
    "@types/express": "latest",
    "@types/jest": "latest",
    "@types/node": "latest",
    "@types/supertest": "latest",
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

---

## Step 1 — Question-asking phase

Once the files are generated, ask:

**"Before coding — what questions do you have?"**

Wait for the user's questions and answer them one by one like a real interviewer.

Evaluate this phase:
- Good questions clarify edge cases, business constraints, data shape, error behavior, concurrency, or scale
- Bad questions ask for implementation hints or repeat what is already explicit
- If the user starts coding too early, say: *"Take a moment — what do you still not know about this problem?"*

---

## Step 2 — Validate understanding before coding

Once questions are done, require a short summary before coding.

Prompt:
**"Before you start — tell me what you're going to implement, point by point."**

Only move on once the summary is correct and complete enough.

---

## Step 2.5 — Design phase (5-10 minutes)

Run a mandatory design phase before coding.

Ask:
**"Before coding — design it out loud. Walk me through your data model, the layers you'll create, the edge cases you anticipate, and what could break in production."**

The candidate should cover:
1. Data model
2. Layer breakdown
3. Edge cases
4. Production risks
5. Member/product impact

Evaluate proactiveness:
- Do they raise problems before being asked?
- Do they think about the member, not just the code?
- Do they surface concurrency or scale risks early?

If the design is too thin, nudge with one short prompt such as:
- *"What about concurrent requests?"*
- *"What if there is no prior data?"*
- *"What costs the most at scale here?"*
- *"What if this cron runs on several pods?"*

Do not proceed to Step 3 until the design is solid enough.

---

## Step 3 — Run the session

Display this once the design is validated:

```text
⏱️  CHRONO — 45 minutes. Go.

🎙️  Talk out loud throughout the entire exercise.
    Narrate your reasoning, decisions, and doubts.
    If you're stuck, say it.

✅  Checklist:
    - [ ] Summary validated before coding
    - [ ] Design phase completed
    - [ ] Edge cases raised before prompting
    - [ ] Concurrency or scale considered
    - [ ] Tests written before or alongside implementation
    - [ ] Reached the objective within the time limit
    - [ ] Amounts stored in cents, never floats
    - [ ] Transactions used when touching multiple tables
    - [ ] Services and repositories implemented as classes
    - [ ] Business logic stays in the service unless this is `endpoint-state-machine`
    - [ ] At least 2 meaningful backend difficulties covered
    - [ ] Controller written with express.Router()
    - [ ] Controller wired into app.ts
    - [ ] HTTP tests pass

🔚  When you're done:
    Paste your transcript into transcript.md then run /alan-interview-review
```

Do not interfere during the 45 minutes unless:
- The user asks a direct question: answer with a hint, not the solution
- The user is clearly stuck for several minutes: give a small nudge

---

## Step 5 — Post-session quick questions (2 questions, ~3 min total)

Ask these immediately after the coding phase. Pick one from each bank and adapt to what the user actually built.

**Question 1 — System design / product angle:**
- "If this endpoint is called by 10,000 members at once, what breaks first?"
- "Two requests hit this at the same time for the same member. What happens?"
- "Your cron job runs on 3 pods. What happens to the batch?"
- "Si le client envoie la même requête deux fois à cause d'un retry réseau, que se passe-t-il ?"

**Question 2 — Complexity / backend angle:**
- "You're calling `.find()` in a loop here. What's the time complexity?"
- "If this table had 10M rows and no index, what does this query cost?"
- "You're making N DB calls for N members. How do you fix the N+1?"
- "Ta méthode est sur l'entité. Qu'est-ce que tu perds si tu la remets dans le service ?"

Rule: each answer should stay short. React briefly, then move to Step 6.

---

## Step 6 — Wrap-up reasoning question

After the coding phase, ask one niche backend reasoning question relevant to what they built. Prefer one of these areas:

**Concurrency / idempotency**
- "Two instances run in parallel and the same member submits two claims at once. How do you prevent the duplicate?"
- "La réponse HTTP est perdue après création, le client retente. Comment éviter un double effet ?"

**Scale / persistence**
- "At 10,000 req/s, what becomes the bottleneck first in your design?"
- "How important is indexing the foreign key on a very large `claims` table?"

**Architecture / async**
- "Your cron runs on 3 pods. How do you ensure it executes once?"
- "You want to send an email after approval. Do you do it inside the service or delegate it asynchronously?"

**State machine / product**
- "A rejected claim must be resubmitted. What transitions are valid and where do you model them?"
- "The front-end needs near real-time claim status updates. What would you change in the architecture?"

Evaluate reasoning, not the exact answer. If the user says "I don't know", prompt:
*"What do you know about this? What would you try first?"*

---

## Exercise design

**Domain:** Always Alan's world: health insurance, medical documents, member records, claims, reimbursements, contracts, healthcare acts. Never generic.

**SQL simplicity rule — mandatory:** repositories use only simple SQL (`SELECT ... WHERE ...`, `INSERT`, `UPDATE`, `DELETE` when truly intended). No multi-table joins, no subqueries, no query cleverness. If multiple tables are needed, fetch separately and combine in TypeScript.

**Exercise types:**
- `endpoint-business-rules` — REST endpoint with multi-condition Alan rules
- `endpoint-data-processing` — REST endpoint doing aggregation, deduplication, or export
- `endpoint-debug` — existing backend with exactly 1 subtle hidden business bug to find, fix, and extend
- `cron-job` — batch processing job with idempotency, locking concerns, and per-item handling
- `endpoint-pagination` — paginated endpoint with at least one business-driven filter
- `endpoint-notion` — exercise centered on a concrete DB concept with business logic around it
- `endpoint-state-machine` — endpoint managing a strict entity lifecycle with explicit valid transitions

**Bug rule for `endpoint-debug`:**
- Embed exactly 1 subtle bug
- Prefer a wrong comparison, state transition, calculation, or eligibility condition
- Never reveal it in comments or hints

**Mandatory complexity rule:** every exercise must cover at least 2 meaningful backend difficulties chosen among:
1. Validation
2. Aggregation
3. Calculation
4. Temporal rule
5. Idempotency / deduplication
6. State transition
7. Eligibility check

Use the exercise type to shape the flavor of the problem, but keep the constraints light enough that the session still feels realistic and finishable in 45 minutes.

---

## Backend concepts reference

### Controller / Service / Repository
- **Controller**: HTTP layer only. Validate request, check auth when relevant, call service, return HTTP response. No business logic and no `try/catch`.
- **Service**: business logic and orchestration. It decides the workflow and throws business errors.
- **Repository**: data access only. Reads/writes with simple SQL via `better-sqlite3`.

### SQLite with better-sqlite3
- Synchronous API: `.get()` for one row, `.all()` for many, `.run()` for writes
- Keep each repository method to one simple query on one table
- If you need data from several tables, do several repository calls and combine in TypeScript
- Store money in integer cents, never floats
- Enable foreign keys and use transactions when mutating several tables

### Error handling
- Use a small `AppError` class with `message` and `statusCode`
- Services throw errors; they do not return `{ error }` objects
- Controllers let the global Express error middleware translate errors into `{ error: string }`
- Typical statuses: `400`, `403`, `404`, `409`, `422`, `500`

### Cron jobs
- A cron job processes a scheduled batch
- It must be idempotent: running twice should not double the effect
- Think about distributed locking when several pods may run it
- Per-item failures should be isolated rather than blocking the whole batch

### OOP & Domain Entities
- Services and repositories are always classes
- Do not add a domain layer by default
- Use `src/domain/` only for `endpoint-state-machine`
- For every other exercise type, keep business logic in the service
- In `endpoint-state-machine`, repositories may return entity instances instead of raw rows
