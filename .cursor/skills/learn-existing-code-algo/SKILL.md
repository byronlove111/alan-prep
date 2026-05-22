---
name: learn-existing-code-algo
description: Generates an Alan-style live-coding drill on a tiny existing TypeScript codebase with main.ts, simple data files, and tests. The user must quickly understand what is already handled, fix or complete one realistic logic path, add a targeted test, and extend the feature on 1 or 2 nearby cases. Use when the user says /learn-existing-code-algo or wants CoderPad-style existing-code reasoning practice close to Alan live coding.
disable-model-invocation: true
---

# Learn Existing Code Algo

Alan-style live-coding drill on a very small existing codebase.

This skill sits between `/learn-debug` and `/learn-business-logic`:
- harder and more "existing code" than `/learn-business-logic`
- lighter and more algorithmic than `/alan-tech-challenge`
- less hidden-bug-oriented than `/learn-debug`

The target feeling is close to a small CoderPad exercise with real files:
- `main.ts`
- 1 to 3 logic files
- 1 or 2 test files
- 1 or 2 tiny data files (`.txt` or `.json`) when useful
- existing code that already works for some cases

Do not generate a backend. No controller, no repository, no database, no HTTP, no Express.

## Context loading — read before every session

Before proposing subjects, read:
- `docs/alan-context.txt`
- `docs/blog-articles.txt`
- `docs/glassdoor-interviews.txt`

Use them to keep the exercise grounded in Alan's world and interview signals:
- realistic product vocabulary
- practical code and tests over cleverness
- small real-world logic problems instead of puzzle algorithms
- clear written reasoning and pragmatic scope control

**Stack**: TypeScript only  
**Duration**: ~25-35 min  
**Tests**: provided tests + at least 1 extra targeted test added by the user

Use Jest by default for all generated tests. Do not generate a homemade `test-runner.ts`.

## Workflow

### Step 0 — Propose 3 subjects

Before generating anything, propose exactly 3 distinct subjects and ask the user to pick one.

Rules for the 3 proposals:
- each must feel like a tiny existing codebase, not a blank exercise
- each must mention `main.ts`, tests, and at least one small data source
- each must use a different Alan-flavored sub-domain
- each must sound slightly algorithmic or data-transform-focused, but never like LeetCode
- each pitch must describe the observed limitation or missing behavior, not the implementation plan
- avoid repeating something too close to a recent session in `sessions/`

Good families:
- noisy input correction
- approximate matching
- text parsing or normalization
- candidate generation
- simple ranking or prioritization
- compact data transformation pipelines

Format:
```text
Voici 3 exercices existing-code / algo pragmatique — choisis-en un :

**A — [sub-domain]**
[2-3 line pitch with the tiny codebase shape, current behavior, and missing case]

**B — [sub-domain]**
[2-3 line pitch with the tiny codebase shape, current behavior, and missing case]

**C — [sub-domain]**
[2-3 line pitch with the tiny codebase shape, current behavior, and missing case]
```

Wait for the user's choice before generating anything.

### Step 1 — Generate the codebase

Create one session folder:

```text
sessions/YYYYMMDD-HHmm-existing-code-algo-[feature-slug]/
  src/
    types.ts
    utils.ts
    [mainLogicFile].ts
    [supportingLogicFile].ts      ← optional
  data/
    [small-data-file].txt
    [small-data-file].json        ← optional
  tests/
    existing-behavior.test.ts
    target-change.test.ts
  main.ts
  BRIEF.md
  transcript.md
  package.json
  tsconfig.json
```

Allowed variations:
- 1 or 2 logic files in `src/` is enough; 3 max
- use only 1 data file when that is enough
- `supportingLogicFile` can be omitted if the codebase is already readable
- `target-change.test.ts` can be the only failing test file; `existing-behavior.test.ts` should mostly stay green

Forbidden structure:
- no `controllers/`
- no `repositories/`
- no `services/` hierarchy unless one single existing file really deserves the name `service`
- no `db/`
- no HTTP layer
- no framework setup

`transcript.md` initial content:
```markdown
# Transcript — [date]

<!-- Colle ici le transcript de ton raisonnement oral après la session -->
```

Rules for the codebase:
- the project must already be partially implemented and partially correct
- the user must need to read the existing code before changing anything
- `main.ts` must run and demonstrate the current behavior on a concrete example
- the data file must matter; do not add `.txt` or `.json` just for decoration
- at least one helper or module should already be correct and worth reusing
- the main logic file should contain either one real bug or one real missing rule, not many
- the task must remain understandable in one sitting
- the code should invite reasoning about cases, not architecture
- use Jest by default for all generated tests; do not generate a homemade `test-runner.ts`

### Step 2 — Shape the exercise correctly

Each generated exercise must have this rhythm:

1. Read the tiny codebase quickly
2. Identify what is already handled correctly
3. List the missing or broken cases
4. Reproduce the issue with the provided tests
5. Add one targeted test if needed
6. Make the smallest coherent fix
7. Extend the logic to 1 or 2 nearby cases

Important:
- the first fix should be simple and pragmatic
- only refactor after the fix if readability clearly needs it
- do not optimize for the perfect algorithm
- do not turn the task into a redesign

### Step 3 — Setup and baseline

After generating the files:

```bash
cd sessions/YYYYMMDD-HHmm-existing-code-algo-[feature-slug]
npm install
npm test
npx tsx main.ts
```

Expected baseline:
- `main.ts` runs
- some tests are already green
- one or more target tests fail because of the bug or missing rule
- the failure must point to behavior, not directly to the patch location

If setup fails, fix the environment before handing off.

**`package.json`** (default shape):
```json
{
  "name": "alan-existing-code-algo",
  "version": "1.0.0",
  "scripts": {
    "test": "jest --runInBand",
    "start": "npx tsx main.ts"
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
    "types": ["node", "jest"],
    "resolveJsonModule": true
  }
}
```

### Step 4 — Present the brief

After setup, show:

```text
✅ Setup done. The codebase is small, partly working, and one logic path still needs work.

📋 Brief dans BRIEF.md
🗂️  Commence par lire l'existant et dire ce qui est déjà géré
🧠  Liste ensuite les cas manquants ou cassés avant de modifier le code
🧪  Appuie-toi sur les tests et ajoute 1 test ciblé si nécessaire
🛠️  Fais d'abord le fix le plus simple qui marche
✨  Puis étends la feature sur 1 ou 2 cas voisins
🎙️  Parle à voix haute pendant l'exercice
🔚  Quand tu as fini, dis-le moi pour le review
```

**`BRIEF.md` format:**
```markdown
# Existing code — [feature name]

## Contexte
[2-3 sentences about the tiny tool, what it already does, and why this behavior matters for Alan members or internal ops]

## Ce qui existe déjà
- [Short bullets listing the cases already handled]

## Ce qui pose problème
[Concrete bug, limitation, or missing behavior from a user-facing or ops-facing angle]

## Ce que tu dois faire
- Lire `main.ts`, les tests, les fichiers `src/`, puis résumer ce qui est déjà géré
- Identifier les cas manquants ou incohérents
- Corriger la logique avec le plus petit changement cohérent
- Ajouter au moins 1 test ciblé utile
- Étendre ensuite la feature sur 1 ou 2 cas supplémentaires proches

## Acceptance criteria
- [ ] `main.ts` reste exécutable
- [ ] All provided failing tests pass
- [ ] Existing passing tests still pass
- [ ] The first fix is small and coherent
- [ ] At least 1 targeted extra test was added
- [ ] The feature now handles 1 or 2 nearby additional cases
- [ ] The code stays readable and pragmatic

## Hints (read only if stuck for >10 min)
<details>
<summary>Hint 1</summary>
[Point toward the most relevant existing helper, data file, or comparison case]
</details>
<details>
<summary>Hint 2</summary>
[Point toward the missing category of cases: punctuation, spacing, aliases, ranking ties, tokenization, parsing noise, etc.]
</details>

## Contraintes
- TypeScript strict mode
- No backend and no framework
- Prefer a simple readable fix over an impressive algorithm
- Use AI if useful, but only after a first pass on the code and cases
- Tests use Jest by default
```

### Step 5 — Review (when the user says they're done)

1. Run the tests and `main.ts`.
2. Assess:
   - whether they understood what the code already handled before editing
   - whether they identified the right missing cases
   - whether the first fix was pragmatic
   - whether the added test really protects a useful case
   - whether the extension stayed close to the original logic
   - what a senior Alan engineer would say in a short PR review
3. Write a short debrief to `sessions/YYYYMMDD-HHmm-existing-code-algo-[feature-slug]/debrief.md`.

Keep the review short, concrete, and centered on code reasoning.

## Exercise design rules

The problem must feel like a tiny real tool or utility, not a puzzle.

Good problem shapes:
- a spell-checker-like helper for healthcare acts, care labels, or document types
- a noisy text parser that normalizes member or claim inputs
- a candidate generator that suggests likely canonical values
- a simple scorer or ranker for approximate matches
- a mini pipeline that tokenizes, normalizes, filters, then ranks

Good difficulty:
- slight noise in data
- subtle but readable edge cases
- one bug or one missing rule at the core
- a natural nearby extension after the fix

Bad difficulty:
- graph algorithms
- dynamic programming
- advanced data structures
- large class hierarchies
- architecture setup
- multiple hidden bugs at once
- a codebase that needs 12 files just to understand the goal

Prefer these ingredients:
- extra spaces
- punctuation noise
- casing differences
- accents or common aliases
- separators like `-`, `/`, `_`
- ambiguous but manageable labels
- simple tie-breaking rules

Avoid these ingredients unless tiny and justified:
- dates with timezone complexity
- money rules with many caps
- large business workflows
- long chains of nullable fields

## Subject bank

Generate original content inspired by these patterns:

**Spell-checker for care labels**
Tiny codebase with `main.ts`, `careLabels.ts`, token helpers, and a TXT file of canonical care labels.
Current limitation: slightly noisy inputs like punctuation or split words are not matched to the right canonical label.

**Document type suggester**
Tiny codebase with document fixtures, one JSON synonym map, and a ranking helper.
Current limitation: the current ranking is too naive and misses common aliases used by members.

**Claim note parser**
Tiny codebase with raw TXT lines, parsing helpers, and a summary builder.
Current limitation: comments with extra separators or duplicated tokens are parsed inconsistently.

**Healthcare act normalizer**
Tiny codebase with a JSON alias file, one existing normalizer, and one scoring helper.
Current limitation: the tool handles exact aliases but fails on slightly noisy wording.

**Member input cleaner**
Tiny codebase with one main formatter, one helper, and a TXT dictionary of known plan or status labels.
Current limitation: extra spaces, punctuation, or partial wording produce the wrong normalized value.

**Simple candidate ranker**
Tiny codebase with one existing candidate generator, one sort helper, and JSON fixtures.
Current limitation: ties and near-matches are ranked in a way that feels wrong for operators.

## Coaching rules

During the drill:
- first ask the user: "What is already handled here?"
- then ask: "Which cases are still missing or wrong?"
- push them to compare `main.ts`, data files, and tests before editing
- if they jump into AI or code too fast, ask for a short case inventory first
- prefer one targeted extra test over many broad tests
- if they want a refactor first, redirect them toward the smallest fix that works
- keep the framing concrete and Alan-flavored, but the code small and tool-like

Keep the session concise, realistic, and close to a pragmatic Alan live-coding exercise on existing code.
