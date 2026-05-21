---
name: learn-debug
description: Generates a debugging drill on a small existing TypeScript business-logic codebase in Alan's domain. The agent creates realistic types, fixtures/data, utils, 1 or 2 services, and tests with exactly one subtle hidden business bug, then asks the user to debug it, add a regression test, and ship one small follow-up feature extension. Use when the user says /learn-debug or wants business-logic debugging practice on an existing codebase.
disable-model-invocation: true
---

# Learn Debug

Debugging drill on an existing TypeScript codebase centered on business logic only. The user lands in a small Alan-flavored project, reads the existing files, reproduces the failing behavior, identifies one subtle business bug, fixes it cleanly, adds at least one regression test, and then ships one small feature extension.

This skill must not generate a full backend. No controller/service/repository stack, no HTTP layer, no database setup, no API wiring. The exercise is about reasoning on business rules in a small existing codebase.

## Context loading — read before every session

Before proposing subjects, read `docs/alan-context.txt`, `docs/blog-articles.txt`, and `docs/glassdoor-interviews.txt`.
Use them to keep the exercise grounded in Alan's real product vocabulary, engineering style, and interview signals: claims, reimbursements, members, contracts, documents, eligibility, healthcare acts, careful tests, and practical reasoning on business rules.

**Stack**: TypeScript business logic  
**Duration**: ~30-45 min  
**Tests**: some passing tests + some failing tests provided

The exercise must feel like real work on an existing codebase, not like a toy bug hunt and not like building an architecture from scratch.

## Workflow

### Step 0 — Propose 3 debug subjects

Before generating anything, propose exactly 3 distinct debugging subjects and ask the user to pick one.

Rules for the 3 proposals:
- each must use a different Alan sub-domain
- each must imply a different kind of subtle business bug
- each pitch must describe the observed symptom, not the hidden cause
- each pitch must mention a small existing business-logic codebase, not a backend
- avoid repeating something too close to a recent debug or tech challenge session in `sessions/`

Format:
```text
Voici 3 exercices de debug — choisis-en un :

**A — [sub-domain]**
[2-3 line pitch with the symptom and the small codebase shape]

**B — [sub-domain]**
[2-3 line pitch with the symptom and the small codebase shape]

**C — [sub-domain]**
[2-3 line pitch with the symptom and the small codebase shape]
```

Wait for the user's choice before generating anything.

### Step 1 — Generate the codebase

Create one session folder:

```text
sessions/YYYYMMDD-HHmm-debug-[feature-slug]/
  src/
    types.ts
    fixtures.ts
    utils.ts
    services/
      [mainService].ts
      [supportingService].ts
  tests/
    [existing-behavior].test.ts
    [debug-target].test.ts
  BRIEF.md
  transcript.md
  package.json
  tsconfig.json
  test-runner.ts
```

Allowed variations:
- `src/fixtures.ts` can be replaced or complemented by JSON data files or another data source file
- only 1 or 2 services max
- add one focused helper file if truly useful
- `transcript.md`, `BRIEF.md`, `package.json`, `tsconfig.json`, and `test-runner.ts` are optional but recommended defaults

Forbidden structure:
- no `src/app.ts`
- no `controllers/`
- no `repositories/`
- no `db/`
- no HTTP tests
- no Express, no SQL, no persistence layer

`transcript.md` initial content:
```markdown
# Transcript — [date]

<!-- Colle ici le transcript de ton raisonnement oral après la session -->
```

Rules for the codebase:
- the project is already mostly implemented; the user debugs existing code instead of creating the architecture
- all main files must contain real code, not empty stubs
- include at least 2 existing modules or helpers that are already correct and worth reading first
- insert exactly 1 hidden bug in the target flow
- the bug must be business-facing and realistic
- the bug must never be revealed by comments, file names, TODOs, or test titles
- the failing tests must expose the symptom, not tell the user where to patch
- keep the codebase small enough to explore in one sitting
- default to plain in-memory data from fixtures, JSON, or constant arrays
- keep the logic centered on rules, transformations, prioritization, aggregation, normalization, or eligibility decisions

### Step 2 — Setup and baseline

After generating the files:

```bash
cd sessions/YYYYMMDD-HHmm-debug-[feature-slug]
npm install
npx tsx test-runner.ts
```

Expected baseline:
- some tests are already green
- target tests fail
- all failures come from the same hidden business bug

If setup fails, fix the environment before handing off.

**`package.json`** (default shape):
```json
{
  "name": "alan-debug",
  "version": "1.0.0",
  "scripts": { "test": "npx tsx test-runner.ts" },
  "devDependencies": {
    "@types/node": "latest",
    "tsx": "latest",
    "typescript": "latest"
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
    "esModuleInterop": true
  }
}
```

`test-runner.ts`: copy from a nearby session if available, else reuse the same minimal pattern as the other learning skills.

### Step 3 — Present the brief

After setup, show:

```text
✅ Setup done. Some tests are green, some are failing.

📋 Brief dans BRIEF.md
🗂️  Lis l'existant avant de modifier quoi que ce soit
🧪  Reproduis le symptôme avec les tests
🔎  Identifie la règle métier cassée
🛠️  Fixe proprement avec le plus petit changement cohérent
📝  Ajoute au moins 1 test de régression
✨  Puis fais une petite extension métier
🔚  Quand tu as fini, dis-le moi pour le review
```

**`BRIEF.md` format:**
```markdown
# Debug — [feature name]

## Contexte
[2-3 sentences about what this business logic already does and why the behavior matters for Alan members or internal ops]

## Symptôme observé
[Concrete failing behavior from the user point of view]

## Ce que tu dois faire
- Lire l'existant avant de modifier le code
- Reproduire le symptôme à partir des tests
- Identifier précisément le bug métier
- Corriger la cause avec le plus petit changement cohérent
- Ajouter au moins 1 test de régression
- Faire ensuite une petite extension métier

## Acceptance criteria
- [ ] All provided failing tests pass
- [ ] Existing green tests still pass
- [ ] Exactly one business bug was fixed
- [ ] You added at least 1 useful regression test
- [ ] A small business extension was added after the fix
- [ ] The final behavior stays coherent with the intended business rules

## Hints (read only if stuck for >15 min)
<details>
<summary>Hint 1</summary>
[Point toward the right area of the codebase or an existing helper to compare with]
</details>
<details>
<summary>Hint 2</summary>
[Point toward the kind of reasoning to apply: dates, money, status, eligibility, mapping, prioritization, normalization...]
</details>

## Contraintes
- TypeScript strict mode
- No large refactor unless the bug truly requires it
- Fix the cause, not only the symptom in one test
- Keep the extension small and business-focused
```

The small extension must come after the debug/fix/regression-test sequence. Typical examples:
- add one extra eligibility guard
- support one extra plan or rule variant
- expose one extra derived field in the result
- add one narrow deduplication or normalization rule

The extension must stay secondary. The main exercise is still debugging a subtle business bug in existing code.

### Step 4 — Review (when user says they're done)

1. Run the tests and show output.
2. Assess:
   - acceptance criteria
   - reading quality: did they inspect the existing code before patching?
   - root-cause accuracy: did they fix the true business rule?
   - fix size: is it minimal and readable?
   - regression-test quality: does the new test protect against the bug coming back?
   - extension quality: is the added feature small, coherent, and well integrated?
   - what a senior Alan engineer would say in PR review
3. Write a short debrief to `sessions/YYYYMMDD-HHmm-debug-[feature-slug]/debrief.md`.

Keep the review short, concrete, and focused on business logic quality.

## Exercise design rules

The bug must be one of these families:
- wrong reimbursement calculation or cap application
- wrong prioritization between two applicable rules
- bad deduplication or duplicate detection logic
- incorrect eligibility condition
- off-by-one temporal rule
- false aggregation or rollup result
- incorrect normalization or canonicalization
- wrong status transition or status interpretation

Good bug properties:
- subtle enough that reading is required
- realistic enough that it could survive a first implementation
- visible through behavior, not through an obvious typo
- fixable in one small area once the root cause is understood
- centered on reasoning, not framework knowledge

Bad bug properties:
- syntax error
- broken import
- null pointer from a trivial mistake
- giant refactor disguised as debugging
- multiple bugs interacting together
- framework setup issue
- anything that turns the exercise into backend plumbing

Architecture rules:
- business-logic only
- use 1 or 2 services max
- prefer pure or almost-pure functions when possible
- data comes from fixtures, JSON, constants, or small in-memory sources
- money stays in cents, never floats
- types must be explicit and useful
- utils stay small and focused

## Bug brief bank

Generate original content inspired by these patterns:

**Eligibility end-date bug**
Existing code: contract fixtures, eligibility service, date helpers.
Hidden bug: a contract ending on a given date is treated as inactive for claims submitted that same day.

**Reimbursement cap bug**
Existing code: reimbursement rules service, plan fixtures, amount helpers.
Hidden bug: the remaining yearly cap is applied before an ALD override that should bypass it for some healthcare acts.

**Coverage prioritization bug**
Existing code: plan fixtures, coverage selection service, normalization helpers.
Hidden bug: a more generic rule wins over a more specific one, producing the wrong reimbursement percentage.

**Deduplication window bug**
Existing code: reimbursement request fixtures, duplicate detection service, hash/date helpers.
Hidden bug: duplicate prevention ignores one important condition, so the same member request can be accepted twice in a narrow window.

**Aggregation bug**
Existing code: claim line fixtures, summary service, money helpers.
Hidden bug: the member rest amount is computed from mixed pre-cap and post-cap totals, making the final summary inconsistent.

**Normalization bug**
Existing code: healthcare act fixtures, import normalization helpers, matching service.
Hidden bug: two semantically identical act codes are not normalized to the same canonical value, so one rule never applies.

## Coaching rules

During the drill:
- ask the user to read the types, fixtures, utils, and services before editing
- ask them to start from the failing tests and compare them with existing green tests
- ask "what exact business rule is being violated?" before suggesting changes
- push them to reproduce the symptom before hypothesizing
- if they patch a symptom, challenge them to explain why the root cause is fixed
- after the fix, explicitly require at least one regression test
- only then move to the small business extension
- keep the framing in Alan's world: claims, reimbursements, members, contracts, documents, eligibility, healthcare acts

Keep the session concise, realistic, and centered on business-logic debugging in an existing codebase.
