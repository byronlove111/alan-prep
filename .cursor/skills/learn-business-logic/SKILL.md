---
name: learn-business-logic
description: Generates a business-logic feature exercise on an existing TypeScript codebase in Alan's domain. Agent sets up the full project, gives a feature brief, and asks the user to navigate the codebase to implement or extend a pure logic module. Focus on parsing, normalization, deduplication, aggregation, data shaping, and simple business calculations. Mix of provided failing tests + tests to write. Use when the user says /learn-business-logic or wants Alan-like backend logic practice without HTTP or database work.
disable-model-invocation: true
---

# Learn Business Logic

Business-logic feature exercise on an existing codebase. The user is dropped into a small Alan-flavored TypeScript project and must read the existing modules, infer the right patterns, and build or extend the missing logic. The focus is the messy middle: turn imperfect insurance data into clean business outputs.

## Context loading — read before every session

Before proposing subjects, read `docs/alan-context.txt`, `docs/blog-articles.txt`, and `docs/glassdoor-interviews.txt`.
Use this to generate realistic Alan-flavored codebases and briefs: claims, reimbursements, contracts, eligibility, documents, healthcare acts, member summaries, and light fraud signals.

**Stack**: TypeScript only  
**Duration**: ~30-45 min  
**Tests**: some failing tests provided + user writes a few more

The exercise must stay focused on business logic. No HTTP layer, no controller, no repository, no SQL, unless a fixture needs to look realistic.

---

## Workflow

### Step 0 — Propose 3 subjects

Before generating anything, propose exactly 3 distinct business-logic feature ideas and ask the user to pick one.

Rules for the 3 proposals:
- Each must live in a different Alan sub-domain: claims, reimbursements, eligibility, documents, member summaries, fraud checks...
- Each must be a different kind of logic challenge: parsing, normalization, deduplication, aggregation, shaping, simple calculations...
- Present them as short pitches (2-3 lines each), not full specs
- Avoid repeating something too close to a recent business-logic session in `sessions/`

Format:
```text
Voici 3 exercices business logic — choisis-en un :

**A — [sub-domain]**
[2-3 line pitch]

**B — [sub-domain]**
[2-3 line pitch]

**C — [sub-domain]**
[2-3 line pitch]
```

Wait for the user's choice before generating anything.

### Step 1 — Generate the codebase

Pick a feature from the brief bank below or invent a similar one in Alan's world. Then create the full project structure.

**Project structure to generate**:

```text
sessions/YYYYMMDD-HHmm-business-logic-[feature-slug]/
  src/
    types.ts                ← shared domain types
    fixtures.ts             ← realistic raw data and helper inputs
    utils.ts                ← reusable pure helpers
    [existing-module-1].ts  ← working logic module
    [existing-module-2].ts  ← another working module with a related pattern
    [feature-to-build].ts   ← missing or partial implementation
  tests/
    [existing-module-1].test.ts   ← passing tests
    [existing-module-2].test.ts   ← passing tests
    [feature-to-build].test.ts    ← failing tests for the target logic
  BRIEF.md
  transcript.md             ← empty — user pastes oral transcript after the session
  package.json
  tsconfig.json
  test-runner.ts
```

`transcript.md` initial content:
```markdown
# Transcript — [date]

<!-- Colle ici le transcript de ton enregistrement oral après la session -->
```

**Rules for the codebase:**
- `types.ts` defines the shared domain types used by all modules
- Existing modules are real, working business logic, not empty stubs
- Existing tests pass out of the box
- The target feature has a missing file or an incomplete implementation so its tests fail
- `utils.ts` contains helpers the user is expected to discover and reuse
- `fixtures.ts` contains messy but realistic Alan-like inputs
- The exercise should require reading the codebase before coding, not just filling a blank function

### Step 2 — Setup the environment

After generating the files:

```bash
cd sessions/YYYYMMDD-HHmm-business-logic-[feature-slug]
npm install
npx tsx test-runner.ts
```

Expected output: existing tests pass, target feature tests fail. Show the output to the user so they see the baseline.

If setup fails for any reason, fix it before handing off.

**`package.json`** (always this exact config):
```json
{
  "name": "alan-business-logic",
  "version": "1.0.0",
  "scripts": { "test": "npx tsx test-runner.ts" },
  "dependencies": {},
  "devDependencies": { "tsx": "latest", "typescript": "latest", "@types/node": "latest" }
}
```

**`tsconfig.json`**:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true
  }
}
```

**`test-runner.ts`**: copy from project root if available, else reuse the same minimal runner pattern as `alan-build-feature`.

### Step 3 — Present the brief

After setup, show:

```text
✅ Setup done. Existing tests: all green. Feature tests: failing (that's expected).

📋 Brief dans BRIEF.md
🗂️  Explore la codebase avant de coder
🧠  Le but est de rendre la donnée propre, fiable et exploitable
🎙️  Parle à voix haute pendant tout l'exercice — colle ton transcript dans transcript.md après
📝  Tu dois aussi écrire des tests supplémentaires (au moins 2)
🔚  Quand tu as fini, dis-le moi pour le review
```

**`BRIEF.md` format:**
```markdown
# Feature — [feature name]

## Contexte
[2-3 sentences: what this codebase already does, what data comes in messy, why this new logic matters]

## Ce que tu dois construire
[Business-facing description of the transformation or summary to produce]

## Acceptance criteria
- [ ] All provided failing tests pass
- [ ] You added at least 2 of your own tests covering edge cases
- [ ] The output is normalized, deduplicated, or aggregated exactly as expected
- [ ] The implementation reuses the right existing types and helpers

## Hints (read only if stuck for >15 min)
<details>
<summary>Hint 1</summary>
[Point toward a useful helper or existing module pattern]
</details>
<details>
<summary>Hint 2</summary>
[Point toward a type, normalization rule, or grouping strategy to reuse]
</details>

## Contraintes
- TypeScript strict mode
- No framework, no I/O, no database
- Prefer small pure helpers if the logic has clear stages
```

The brief should be clear but slightly incomplete. Give enough business context to work, but leave some implementation decisions to the user.

### Step 4 — Review (when user says they're done)

1. Run the tests and show output
2. Assess:
   - **Acceptance criteria**: which are met, which are not
   - **Code navigation**: did they find and reuse the right helpers, types, and patterns?
   - **Business logic clarity**: are the parsing / normalization / aggregation stages readable?
   - **New tests quality**: do they cover meaningful edge cases?
   - **What a senior Alan engineer would say** in a PR review
3. Write debrief to `sessions/YYYYMMDD-HHmm-business-logic-[feature-slug]/debrief.md`

---

## Exercise design rules

Train only these families of problems:
- parsing raw partner or provider payloads
- normalizing business fields and statuses
- deduplicating claims, acts, documents, or events
- aggregating reimbursements, eligibility signals, or contract data
- shaping outputs for another internal or member-facing layer
- simple insurance-related calculations and thresholds

Good exercise ingredients:
- messy but bounded inputs
- a few trust rules or precedence rules
- at least one ambiguous edge case
- an output object that feels useful to a product or ops surface

Bad exercise ingredients:
- advanced algorithms
- large OO hierarchies
- controller logic
- persistence behavior
- generic CRUD outside Alan's world

Prefer arrays of objects with realistic noise:
- duplicate claim ids, act ids, or document hashes
- mixed casing in statuses or care categories
- timestamps where the newest row wins
- amounts expressed in euros in one payload and cents in another
- partial records with nullable member, contract, or provider fields
- raw strings that need trimming, parsing, or normalization

Keep calculations simple and business-facing. The difficulty should come from shaping messy domain data, not from math.

---

## Feature brief bank (generate original content inspired by these)

**Claim summary builder**
Existing code: raw claim parsing, status normalization, member helpers.
Feature to add: build a member-facing summary from claim events, deduplicate repeated acts, compute totals, and expose review flags.

**Reimbursement reconciliation**
Existing code: reimbursement line parsing, money helpers, contract snapshots.
Feature to add: merge duplicate reimbursement events from two sources and return a clean per-claim reimbursement summary.

**Eligibility snapshot normalizer**
Existing code: coverage rule helpers, date normalization, contract utilities.
Feature to add: transform noisy eligibility rows into a clean member eligibility snapshot with normalized status and explanation fields.

**Document review aggregator**
Existing code: document metadata parsing, hash helpers, reviewer status formatting.
Feature to add: group uploaded documents by type, deduplicate by hash, and return a compact review summary with missing required documents.

**Healthcare act shaper**
Existing code: act categorization helpers, amount normalization, claim linkage.
Feature to add: reshape raw healthcare act rows into a contract-level care-category summary used by another service.

**Light fraud signal scorer**
Existing code: claim parsing, date helpers, member summary generation.
Feature to add: compute light fraud flags from duplicate same-day acts, suspicious repeated amounts, and repeated document uploads.

---

## Coaching rules

During the drill:
- ask the user to identify the transformation stages before coding
- push them to explore existing files before opening the target file
- encourage small pure helpers when parsing, deduplication, and aggregation mix together
- prefer readable business rules over clever one-liners
- keep the framing in Alan's world: claims, reimbursements, members, contracts, eligibility, documents, healthcare acts

Keep the session concise, realistic, and implementation-focused.
