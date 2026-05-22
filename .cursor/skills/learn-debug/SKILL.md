---
name: learn-debug
description: Generates a very readable debugging drill on a tiny existing TypeScript business-logic codebase in Alan's domain. The agent creates explicit types, fixtures/data, one main service, optionally one tiny helper, and tests with exactly one localized business bug, then asks the user to debug it, add a regression test, and ship one small follow-up business extension. Use when the user says /learn-debug or wants business-logic debugging practice on an existing codebase.
disable-model-invocation: true
---

# Learn Debug

Debugging drill on an existing TypeScript codebase centered on business logic only. The user lands in a tiny Alan-flavored project, reads a very small amount of existing code, reproduces a failing behavior from tests, identifies one broken business rule, fixes it cleanly, adds at least one regression test, and then ships one small business extension.

This skill must not generate a full backend. No controller/service/repository stack, no HTTP layer, no database setup, no API wiring. The exercise is about reasoning on business rules in a tiny, explicit, readable codebase.

The exercise must stay Alan-centric and business-logic only, but it must become much more pedagogical than a typical "debug this code" kata. The difficulty must come from understanding the business rule, not from decoding architecture, abstractions, indirection, terse helpers, or clever implementation tricks.

## Core pedagogical goal

The user must practice:
- reading a small existing codebase
- starting from red tests
- identifying one broken business rule
- shipping the minimal fix
- adding a regression test
- implementing one small follow-up extension

The user must **not** spend most of the session deciphering code shape. A good `learn-debug` exercise feels readable in a few minutes and debuggable through focused reading.

## Context loading — read before every session

Before proposing subjects, read `docs/alan-context.txt`, `docs/blog-articles.txt`, and `docs/glassdoor-interviews.txt`.
Use them to keep the exercise grounded in Alan's real product vocabulary, engineering style, and interview signals: claims, reimbursements, members, contracts, documents, eligibility, healthcare acts, careful tests, and practical reasoning on business rules.

**Stack**: TypeScript business logic  
**Duration**: ~30-45 min  
**Tests**: some passing tests + some failing tests provided

Use Jest by default for all generated tests. Do not generate a homemade `test-runner.ts`.

The exercise must feel like real work on an existing codebase, but on a deliberately small and readable slice of business logic.

## Pedagogy and readability rules

These rules are mandatory.

- optimize for fast understanding, not for realism-at-all-costs
- the first useful reading pass must take only a few minutes
- the user must be able to isolate the likely bug area from the failing tests plus a short targeted read
- the code must read almost like prose: the business rule should be easy to paraphrase out loud
- use explicit domain names everywhere: `isClaimEligible`, `remainingYearlyCapCents`, `selectedCoverageRule`, `submittedAt`
- if a rule matters, spell it out in code with intermediate variables instead of compressing it into one expression
- prefer straightforward `if` / `else` branches over compact chained transforms when the branches express business rules
- keep the main debugging path local: one main service, one target function, one bug
- the user should mostly need to read `types`, `fixtures`, one main service, and the tests

Difficulty must come from the business rule itself:
- wrong precedence between two valid rules
- boundary date handled incorrectly
- cap/limit applied in the wrong order
- wrong eligibility guard
- wrong normalization interpretation

Difficulty must not come from the form of the code:
- hidden logic spread across many files
- generic or misleading names
- compact comparator logic
- helper ping-pong
- indirection layers that obscure the business flow
- "engineer-y" code that hides the rule instead of expressing it

## Workflow

### Step 0 — Propose 3 debug subjects

Before generating anything, propose exactly 3 distinct debugging subjects and ask the user to pick one.

Rules for the 3 proposals:
- each must use a different Alan sub-domain
- each must imply a different kind of subtle but localized business bug
- each pitch must describe the observed symptom, not the hidden cause
- each pitch must mention a tiny existing business-logic codebase, not a backend
- each pitch must make the reading footprint feel small and concrete
- avoid repeating something too close to a recent debug or tech challenge session in `sessions/`

Format:
```text
Voici 3 exercices de debug — choisis-en un :

**A — [sub-domain]**
[2-3 line pitch with the symptom, the tiny codebase shape, and what the user will mostly read first]

**B — [sub-domain]**
[2-3 line pitch with the symptom, the tiny codebase shape, and what the user will mostly read first]

**C — [sub-domain]**
[2-3 line pitch with the symptom, the tiny codebase shape, and what the user will mostly read first]
```

Wait for the user's choice before generating anything.

### Step 1 — Generate the codebase

Create one session folder:

```text
sessions/YYYYMMDD-HHmm-debug-[feature-slug]/
  src/
    types.ts
    fixtures.ts
    services/
      [mainService].ts
    [optionalSmallHelper].ts
  tests/
    [existing-behavior].test.ts
    [debug-target].test.ts
  BRIEF.md
  transcript.md
  package.json
  tsconfig.json
```

Allowed variations:
- `src/fixtures.ts` can be replaced or complemented by one JSON data file if that is clearer
- exactly 1 main service is required
- add at most 1 helper file, and only if it makes reading easier
- `transcript.md`, `BRIEF.md`, `package.json`, and `tsconfig.json` are optional but recommended defaults

Forbidden structure:
- no `src/app.ts`
- no `controllers/`
- no `repositories/`
- no `db/`
- no HTTP tests
- no Express, no SQL, no persistence layer
- no mini-architecture with several service layers
- no second supporting service unless it is absolutely necessary and still trivial to read

`transcript.md` initial content:
```markdown
# Transcript — [date]

<!-- Colle ici le transcript de ton raisonnement oral après la session -->
```

Rules for the codebase:
- the project is already mostly implemented; the user debugs existing code instead of creating the architecture
- all main files must contain real code, not empty stubs
- insert exactly 1 hidden bug in the target flow
- the bug must be business-facing, realistic, and localized
- the bug must live in one small area, ideally one function in the main service
- the failing tests must expose the symptom, not tell the user where to patch
- the first useful reading path must be short: `types.ts` + `fixtures.ts` + main service + tests
- default to plain in-memory data from fixtures, JSON, or constant arrays
- keep the logic centered on rules, transformations, prioritization, aggregation, normalization, or eligibility decisions
- use Jest by default for all generated tests; do not generate a homemade `test-runner.ts`

Hard size limits:
- target 4 to 6 files that the user actually needs to read
- target roughly 80 to 180 lines of useful source code total, excluding config and lockfiles
- the main service should usually fit in about 40 to 90 lines
- helper files must stay tiny and obvious

Localization rules:
- the red tests must narrow the investigation to one business flow
- the user should not need to inspect more than one main service plus maybe one tiny helper
- do not scatter the bug across multiple helpers, tie-breakers, and normalization layers
- do not require global codebase exploration to find the root cause

Naming rules:
- function names must describe the business action, not a generic technical action
- variable names must name the business fact being computed
- use intermediate variables when they make the rule clearer
- prefer names like `matchingCoverageRules`, `contractEndsOnServiceDate`, `remainingFamilyDeductibleCents`
- avoid names like `process`, `resolve`, `handle`, `apply`, `compute`, `data`, `item`, `result` unless the context is already crystal clear

### Step 2 — Setup and baseline

After generating the files:

```bash
cd sessions/YYYYMMDD-HHmm-debug-[feature-slug]
npm install
npm test
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
  "scripts": { "test": "jest --runInBand" },
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

### Step 3 — Present the brief

After setup, show:

```text
✅ Setup done. Some tests are green, some are failing.

📋 Brief dans BRIEF.md
👀 Commence par une lecture courte : types, fixtures, service principal, puis tests
🧪 Reproduis le symptôme avec les tests rouges
🔎 Identifie la règle métier cassée
🛠️ Fixe avec le plus petit changement cohérent
📝 Ajoute au moins 1 test de régression
✨ Puis fais une petite extension métier
🔚 Quand tu as fini, dis-le moi pour le review
```

**`BRIEF.md` format:**
```markdown
# Debug — [feature name]

## Contexte
[2-3 sentences about what this business logic already does and why the behavior matters for Alan members or internal ops]

## Symptôme observé
[Concrete failing behavior from the user point of view]

## Lecture conseillée
1. `src/types.ts`
2. `src/fixtures.ts`
3. `src/services/[mainService].ts`
4. `tests/[existing-behavior].test.ts`
5. `tests/[debug-target].test.ts`

## Ce que tu dois faire
- Lire l'existant avant de modifier le code
- Reproduire le symptôme à partir des tests
- Identifier précisément la règle métier cassée
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
[Point toward the right area of the codebase or the one target function to inspect more carefully]
</details>

<details>
<summary>Hint 2</summary>
[Point toward the business reasoning to apply: dates, money, status, eligibility, prioritization, normalization...]
</details>

## Contraintes
- TypeScript strict mode
- No large refactor unless the bug truly requires it
- Fix the cause, not only the symptom in one test
- Keep the extension small and business-focused
- Tests use Jest by default
```

The small extension must come after the debug/fix/regression-test sequence. Typical examples:
- add one extra eligibility guard
- support one extra plan or rule variant
- expose one extra derived field in the result
- add one narrow deduplication or normalization rule

The extension must stay secondary. The main exercise is still debugging one localized business bug in existing code.

### Step 4 — Review (when user says they're done)

1. Run the tests and show output.
2. Assess:
   - acceptance criteria
   - reading quality: did they inspect the short reading path before patching?
   - root-cause accuracy: did they identify the broken business rule, not only the broken line?
   - fix size: is it minimal and readable?
   - regression-test quality: does the new test protect against the bug coming back?
   - extension quality: is the added feature small, coherent, and well integrated?
   - what a senior Alan engineer would say in PR review
3. Write a short debrief to `sessions/YYYYMMDD-HHmm-debug-[feature-slug]/debrief.md`.

Keep the review short, concrete, and focused on business logic quality and debugging method.

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
- explainable in one or two sentences of business language

Bad bug properties:
- syntax error
- broken import
- null pointer from a trivial mistake
- giant refactor disguised as debugging
- multiple bugs interacting together
- framework setup issue
- anything that turns the exercise into backend plumbing
- any bug that requires reading many files before the target area becomes clear

Architecture rules:
- business-logic only
- use 1 main service
- prefer pure or almost-pure functions when possible
- data comes from fixtures, JSON, constants, or small in-memory sources
- money stays in cents, never floats
- types must be explicit and useful
- helper files must stay tiny and obvious
- the main business rule should be readable directly in the main service

## Bad generated patterns to avoid

Never generate these patterns for `learn-debug`:

- compact `sort()` comparator logic with several hidden tie-breakers
- long `filter().map().reduce().sort()` chains when a few named steps would be clearer
- business logic hidden in vaguely named helpers
- two or three levels of indirection before the real rule appears
- a helper whose name sounds generic but secretly decides a key business rule
- clever one-liners that are shorter but harder to explain verbally
- generic function names like `resolveCoverage`, `processClaim`, or `computeResult` when the rule is more specific
- shared utility files that mix unrelated responsibilities
- branching logic expressed through nested ternaries
- debug noise such as stray `console.log`
- tests that require the user to reverse-engineer a mini-framework

If a piece of code would make an experienced engineer say "technically neat, but annoying to read in an exercise", do not generate it.

## Bug brief bank

Generate original content inspired by these patterns:

**Eligibility end-date bug**
Existing code: contract fixtures, one eligibility service, maybe one tiny date helper.
Hidden bug: a contract ending on a given date is treated as inactive for claims submitted that same day.

**Reimbursement cap bug**
Existing code: reimbursement rule fixtures and one quote service.
Hidden bug: the remaining yearly cap is applied before an ALD override that should bypass it for some healthcare acts.

**Coverage prioritization bug**
Existing code: plan fixtures and one coverage selection service.
Hidden bug: a more generic rule wins over a more specific one, producing the wrong reimbursement percentage.

**Deduplication window bug**
Existing code: reimbursement request fixtures and one duplicate detection service.
Hidden bug: duplicate prevention ignores one important condition, so the same member request can be accepted twice in a narrow window.

**Aggregation bug**
Existing code: claim line fixtures and one summary service.
Hidden bug: the member rest amount is computed from mixed pre-cap and post-cap totals, making the final summary inconsistent.

**Normalization bug**
Existing code: healthcare act fixtures, one tiny normalization helper, and one matching service.
Hidden bug: two semantically identical act codes are not normalized to the same canonical value, so one rule never applies.

## Coaching rules

During the drill:
- ask the user to start with the short reading path from the brief
- ask them to start from the failing tests and compare them with existing green tests
- ask "what exact business rule is being violated?" before suggesting changes
- push them to reproduce the symptom before hypothesizing
- if they patch a symptom, challenge them to explain why the root cause is fixed
- after the fix, explicitly require at least one regression test
- only then move to the small business extension
- keep the framing in Alan's world: claims, reimbursements, members, contracts, documents, eligibility, healthcare acts
- keep helping them narrow the bug area instead of suggesting broad exploration

Keep the session concise, explicit, realistic, and centered on business-logic debugging in an existing codebase.
