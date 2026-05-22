---
name: learn-business-logic
description: Generates a concise business-logic feature exercise on a light TypeScript codebase in Alan's domain. Agent creates a small existing project with shared types, simple fixtures/data, utils, at most one tiny existing module, and one target test file. The user implements one focused transformation such as parsing, normalization, deduplication, aggregation, or data shaping. Use when the user says /learn-business-logic or wants gentle Alan-like business-logic practice without heavy codebase exploration.
disable-model-invocation: true
---

# Learn Business Logic

Concise feature exercise on a light existing codebase. The goal is to practice Alan-flavored business rules in a calmer setup: a little context, a little existing code, and one clear transformation to build.

This skill is not the hard reading drill. Keep the more difficult existing-code investigation, debugging, and "read a lot before you understand the problem" work in `/learn-debug`.

## Context loading — read before every session

Before proposing subjects, read `docs/alan-context.txt`, `docs/blog-articles.txt`, and `docs/glassdoor-interviews.txt`.
Use them to keep the exercise grounded in Alan's product vocabulary and business reality: claims, reimbursements, contracts, eligibility, documents, healthcare acts, and member-facing summaries.

**Stack**: TypeScript only  
**Duration**: ~20-30 min  
**Tests**: one target test file provided; one extra user test is optional

Use Jest by default for all generated tests. Do not generate a homemade `test-runner.ts`.

The exercise must stay focused on business logic only. No HTTP layer, no controller, no repository, no SQL, no backend plumbing.

## Workflow

### Step 0 — Propose 3 subjects

Before generating anything, propose exactly 3 distinct business-logic feature ideas and ask the user to pick one.

Rules for the 3 proposals:
- each pitch must live in a different Alan sub-domain
- each pitch must focus on one main transformation only
- each pitch must mention that the codebase is light and quick to read
- present them as short pitches, not full specs
- avoid repeating something too close to a recent business-logic session in `sessions/`

Good transformation families:
- parsing
- normalization
- deduplication
- aggregation
- shaping

Do not combine multiple big transformation families in the same proposal.

Format:
```text
Voici 3 exercices business logic — choisis-en un :

**A — [sub-domain]**
[2-3 line pitch with the small codebase shape and the one transformation to build]

**B — [sub-domain]**
[2-3 line pitch with the small codebase shape and the one transformation to build]

**C — [sub-domain]**
[2-3 line pitch with the small codebase shape and the one transformation to build]
```

Wait for the user's choice before generating anything.

### Step 1 — Generate the codebase

Create one small session folder:

```text
sessions/YYYYMMDD-HHmm-business-logic-[feature-slug]/
  src/
    types.ts
    fixtures.ts
    utils.ts
    [small-existing-module].ts   ← optional, only if truly useful
    [feature-to-build].ts
  tests/
    [feature-to-build].test.ts
  BRIEF.md
  transcript.md
  package.json
  tsconfig.json
```

Allowed lightweight variations:
- `src/fixtures.ts` can be replaced or complemented by one tiny JSON or TXT data file
- add one small existing module only if it gives a directly reusable pattern
- if there is an existing module, keep it short and obvious enough to read quickly

`transcript.md` initial content:
```markdown
# Transcript — [date]

<!-- Colle ici le transcript de ton enregistrement oral après la session -->
```

Rules for the codebase:
- keep the full codebase understandable in under 10 minutes
- `types.ts` contains a few useful shared domain types, not a large model
- `fixtures.ts` or the data file contains small but realistic Alan-like inputs
- `utils.ts` contains only a few helpers directly useful for the target feature
- the target feature file is missing or partially implemented so the target tests fail
- there must be only one target test file
- there is no requirement for multiple existing modules or multiple passing test suites
- this is a feature exercise, not a hidden-bug exercise
- the user should not need a scavenger hunt to know where to look
- use Jest by default for all generated tests; do not generate a homemade `test-runner.ts`

### Step 2 — Keep the scope intentionally small

Each session must have exactly one main transformation:
- parse raw rows into a typed shape
- normalize business fields or statuses
- deduplicate noisy records
- aggregate a small set of values
- shape one useful summary object

Choose one. Not two or three.

Rules:
- calculations must stay simple
- avoid mixing several precedence systems
- avoid long pipelines with many stages
- avoid output formats that require many nested objects unless the nesting is tiny
- prefer one obvious input and one obvious output

### Step 3 — Setup the environment

After generating the files:

```bash
cd sessions/YYYYMMDD-HHmm-business-logic-[feature-slug]
npm install
npm test
```

Expected baseline:
- one test file runs
- some or all target tests fail
- failures come from the missing or partial feature implementation

If setup fails for any reason, fix it before handing off.

**`package.json`** (always this exact config):
```json
{
  "name": "alan-business-logic",
  "version": "1.0.0",
  "scripts": { "test": "jest --runInBand" },
  "dependencies": {},
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

### Step 4 — Present the brief

After setup, show:

```text
✅ Setup done. One test file is ready and the feature is not finished yet.

📋 Brief dans BRIEF.md
🗂️  Lis seulement les quelques fichiers utiles avant de coder
🧠  Le but est une transformation métier claire, pas une grosse exploration
🎙️  Parle à voix haute pendant l'exercice — colle ton transcript dans transcript.md après
📝  Tu peux ajouter 1 petit test si ça t'aide, mais ce n'est pas obligatoire
🔚  Quand tu as fini, dis-le moi pour le review
```

**`BRIEF.md` format:**
```markdown
# Feature — [feature name]

## Contexte
[2-3 sentences: what this small codebase already does, what raw data comes in, and why this new transformation matters for Alan]

## Ce que tu dois construire
[Describe one clear transformation and the expected output from a business angle]

## Acceptance criteria
- [ ] All provided tests pass
- [ ] The output follows the expected business rules
- [ ] The implementation stays small, readable, and pure
- [ ] Shared types and helpers are reused when useful

## Bonus test (optional)
- Add 1 extra test for one meaningful edge case if it stays quick

## Hints (read only if stuck for >10 min)
<details>
<summary>Hint 1</summary>
[Point toward the most relevant helper, fixture, or tiny existing module]
</details>
<details>
<summary>Hint 2</summary>
[Point toward the main business rule to respect, not the full solution]
</details>

## Contraintes
- TypeScript strict mode
- No framework, no I/O, no database
- Prefer 1 or 2 small helpers if the logic becomes easier to read
- Stay focused on the single transformation described above
- Tests use Jest by default
```

The brief should be clear and reassuring. The user should quickly understand what to build without having to reverse-engineer half the project.

### Step 5 — Review (when the user says they are done)

1. Run the tests and show output.
2. Assess:
   - acceptance criteria
   - clarity of the business rules
   - whether the solution stayed focused on the intended single transformation
   - whether the user reused the right shared types and helpers
   - test quality if they added the optional extra test
   - what a senior Alan engineer would say in a short PR review
3. Write a short debrief to `sessions/YYYYMMDD-HHmm-business-logic-[feature-slug]/debrief.md`.

Keep the review short, concrete, and calm.

## Exercise design rules

Good subjects:
- parse noisy claim rows into a typed summary input
- normalize eligibility statuses from partner wording to Alan wording
- deduplicate uploaded documents by a simple business rule
- aggregate reimbursement lines into a compact claim summary
- shape raw member events into a small member-facing status object

Good ingredients:
- bounded input data
- one or two business rules max
- one useful output object or array
- a small edge case that feels real but not overwhelming

Bad ingredients:
- advanced algorithms
- large OO hierarchies
- hidden bugs
- controller or persistence logic
- a codebase that requires opening many files before the task is clear
- one exercise that mixes parsing, normalization, deduplication, and aggregation all together

Prefer a little realistic noise, not a lot:
- duplicate ids
- mixed casing
- extra whitespace
- nullable fields
- one date or amount formatting inconsistency

Keep calculations simple and business-facing. The difficulty should come from understanding one business rule, not from math or exploration load.

## Feature brief bank

Generate original content inspired by these smaller patterns:

**Eligibility status normalizer**
Small codebase: shared types, a few raw eligibility rows, date helpers.
Feature to add: normalize partner statuses into one clean member eligibility snapshot with one explanation field.

**Claim event shaper**
Small codebase: claim event fixtures, status helpers, lightweight types.
Feature to add: turn raw claim events into a compact member-facing summary object.

**Document deduplicator**
Small codebase: uploaded document fixtures, one hash helper, shared types.
Feature to add: keep only the useful document entries and return a compact review-ready list.

**Reimbursement line aggregator**
Small codebase: reimbursement line fixtures, money helper, shared types.
Feature to add: aggregate a few reimbursement lines into one simple claim summary.

**Care category parser**
Small codebase: healthcare act fixtures, string normalization helpers, shared types.
Feature to add: map messy care labels to canonical categories and return grouped results.

**Member status shaper**
Small codebase: member event fixtures, one small existing helper, shared types.
Feature to add: shape a few raw contract or claim signals into one readable member status output.

## Coaching rules

During the drill:
- remind the user that this is a feature exercise, not a bug hunt
- ask them to read `types.ts`, the data file, `utils.ts`, and the target test first
- if there is an existing module, point to it only as a tiny reference, not as a maze to explore
- ask them to say the single transformation in one sentence before coding
- if they start over-exploring, redirect them to the smallest useful path
- prefer readable business rules over clever one-liners
- keep the framing in Alan's world: claims, reimbursements, members, contracts, eligibility, documents, healthcare acts

Keep the session concise, reassuring, and implementation-focused.
