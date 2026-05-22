---
name: learn-ts-drill
description: Generates short high-repetition TypeScript fluency drills in Alan business context, with light easy-algorithm reasoning on arrays, records, transforms, parsing, grouping, counting, normalization, and lookups. Use when the user says /learn-ts-drill or wants daily TypeScript practice for interview fluency.
disable-model-invocation: true
---

# Learn TS Drill

Short daily TypeScript drill for fluency first, not architecture.

This skill is the counterpart to `/learn-existing-code-algo`:
- less existing-code-heavy
- more language-focused
- more repetitive
- still grounded in Alan business context

The target feeling is: "I can solve small real TypeScript problems quickly without getting stuck on arrays, records, transforms, parsing, or nullish cases."

Do not generate a backend. No controller, no repository, no database, no HTTP, no Express.

## Context loading — read before every session

Before proposing subjects, read:
- `docs/alan-context.txt`
- `docs/blog-articles.txt`
- `docs/glassdoor-interviews.txt`

Use them to keep the drill:
- Alan-flavored
- practical
- concise
- focused on coding, not on theory

**Stack**: TypeScript only  
**Duration**: ~15-25 min  
**Tests**: Jest only

Use Jest by default for all generated tests. Do not generate a homemade `test-runner.ts`.

## Workflow

### Step 0 — Propose 3 drill subjects

Before generating anything, propose exactly 3 short drill subjects and ask the user to pick one.

Rules for the 3 proposals:
- each must stay in Alan domain
- each must train 2 to 4 TypeScript notions that naturally belong together
- each must have a light algorithmic flavor, similar to LeetCode easy, but never abstract for its own sake
- each must sound like a small business data task, not a puzzle
- avoid repeating something too close to a recent session in `drills/` or `sessions/`

Preferred notion families:
- arrays: `map`, `filter`, `find`, `reduce`, `some`, `every`, `sort`
- records and lookups: `Record`, grouping, counting, indexing
- object and array transforms: `Object.entries`, `Object.values`, `Object.fromEntries`
- parsing and normalization: `split`, `trim`, casing, punctuation cleanup, tokenization
- optional values: optional chaining, nullish coalescing, fallback logic
- practical primitives: strings, numbers, dates when useful

Easy algorithmic flavors:
- matching
- ranking
- deduplication
- scan and accumulate
- top-N
- grouping
- validation
- simple interval-ish reasoning

Format:
```text
Voici 3 drills TypeScript — choisis-en un :

**A — [theme name]**
Notions : [list]
[2 lines about the Alan business problem and the expected reasoning]

**B — [theme name]**
Notions : [list]
[2 lines about the Alan business problem and the expected reasoning]

**C — [theme name]**
Notions : [list]
[2 lines about the Alan business problem and the expected reasoning]
```

Wait for the user's choice before generating anything.

### Step 1 — Generate the drill

Create one folder:

```text
drills/YYYYMMDD-ts-drill-[feature-slug]/
  drill.ts
  drill.test.ts
  package.json
  tsconfig.json
```

Rules for the drill shape:
- one file for logic, one file for tests
- 1 or 2 exported functions max
- provide realistic types and small fixtures
- provide minimal scaffolding; the user writes the important logic
- start the target functions with `throw new Error('not implemented')` or very small starter code
- tests must express the expected behavior clearly
- keep the scope solvable in one sitting

### Step 2 — Design the right difficulty

The drill must train language fluency first.

Good drill shapes:
- normalize noisy reimbursement labels, then count by canonical value
- group document reviews by status or assignee
- rank the best matching care labels from noisy input
- deduplicate member events while keeping the latest valid one
- build a lookup table from raw rows, then answer a small query
- parse a compact claim line format into typed objects, then filter invalid rows
- compute top-N most frequent reasons or categories with a simple tie-break

Good difficulty:
- a few edge cases, but readable
- 1 main transformation pipeline
- 1 simple business rule or tie-break
- enough data noise to require attention

Bad difficulty:
- graph algorithms
- dynamic programming
- recursion-heavy tasks
- large object models
- architecture exercises
- more than 2 core steps of reasoning

### Step 3 — File conventions

`drill.ts` should contain:
- a short header with the business context
- the types
- the target function(s)
- a few commented manual examples at the bottom

`drill.test.ts` should contain:
- clear Jest tests
- a mix of happy path and small edge cases
- expectations that force the intended TypeScript manipulations

Keep the comments short. This is a drill, not a course.

### Step 4 — Setup and baseline

After generating the files:

```bash
cd drills/YYYYMMDD-ts-drill-[feature-slug]
npm install
npm test
```

Expected baseline:
- install succeeds
- tests run
- target tests fail because the user still has to implement the logic

If setup fails, fix the environment before handing off.

**`package.json`**:
```json
{
  "name": "alan-learn-ts-drill",
  "version": "1.0.0",
  "scripts": {
    "test": "jest --runInBand"
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

### Step 5 — Launch

After setup, tell the user:

```text
⏱️  Drill court — 15 à 25 minutes.

🎯  Focus : [list of notions]
🧠  But : être rapide et propre sur les transformations TypeScript utiles
▶️  Lance : npm test
✅  Objectif : faire passer tous les tests avec la solution la plus lisible

Ne sur-ingénierie pas. Cherche la solution simple et fiable.
```

### Step 6 — Review

When the user says they're done:

Give a short feedback centered on:
- which TypeScript tools they chose well
- whether the data transformation stayed clear
- whether they handled edge cases without overcomplicating
- 1 thing to repeat in the next drill

Keep the review short and practical.

## Coaching rules

During the drill:
- if the user hesitates, first ask which collection shape they want at each step
- push them to name the intermediate data shapes out loud
- prefer a clear pipeline over a clever one-liner
- if they are stuck, hint the tool category first (`reduce`, lookup map, normalization step, sort + slice, etc.)
- keep the problem small and repetitive on purpose

## Design rule

This skill exists to build TypeScript fluency through many small wins.

Always optimize for:
- fast repetition
- realistic Alan vocabulary
- everyday data manipulation
- simple reasoning
- readable code

Do not optimize for:
- architecture
- advanced algorithms
- framework knowledge
- "impressive" solutions
