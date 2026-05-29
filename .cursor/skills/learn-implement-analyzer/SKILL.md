---
name: learn-implement-analyzer
description: Generates a Doctolib-style TypeScript interview exercise — one function to implement from scratch, provided types, fixed Jest tests, and a formal BRIEF. Use when the user says /learn-implement-analyzer, wants analyzer-style interview prep, or mentions the BMI history / patient dashboard exercise format.
disable-model-invocation: true
---

# Learn Implement Analyzer

Doctolib-style technical interview simulation: implement **one central function** from scratch while types and tests are already provided.

**Stack**: TypeScript strict, Jest  
**Duration**: ~45-90 min (target feel: 1h30 interview)  
**Domain**: Alan / health / member data over time

## Context loading — read before every session

Before proposing subjects, read:
- `docs/alan-context.txt`
- `docs/blog-articles.txt`
- `docs/glassdoor-interviews.txt`

Keep exercises grounded in Alan's world while matching the Doctolib exercise shape.

## User preferences — always apply

- never use regular expressions in generated code; prefer `split`, `trim`, `includes`, `slice`, `join`, simple loops
- prefer `for` loops over `reduce`
- junior-friendly readability over clever one-liners
- no backend, no framework, no HTTP

## Workflow

### Step 0 — Propose 3 subjects

Before generating anything, propose exactly 3 distinct subjects and ask the user to pick one.

Rules for the 3 proposals:
- each must be a **time-series analyzer** for a patient/member dashboard
- each must have one main function to implement from scratch
- each must mention provided types, 7 fixed tests, and boundary cases
- each must use a different Alan-flavored sub-domain
- avoid repeating something too close to a recent session in `sessions/`

Good families:
- BMI / weight tracking over time
- reimbursement rate evolution
- care act frequency trends
- eligibility score history
- teleconsultation usage metrics
- premium tier or coverage level timeline

Format:
```text
Voici 3 exercices style interview (implement analyzer) — choisis-en un :

**A — [sub-domain]**
[2-3 lines: dashboard context, input shape, what the function computes]

**B — [sub-domain]**
[2-3 lines: dashboard context, input shape, what the function computes]

**C — [sub-domain]**
[2-3 lines: dashboard context, input shape, what the function computes]
```

Wait for the user's choice before generating anything.

### Step 1 — Generate the session

Create one session folder:

```text
sessions/YYYYMMDD-HHmm-implement-analyzer-[feature-slug]/
  src/
    types.ts
    analyzer.ts
    analyzer.test.ts
  BRIEF.md
  transcript.md
  package.json
  tsconfig.json
```

Rules:
- `types.ts` is complete — user must not modify it
- `analyzer.test.ts` is complete — user must not modify it
- `analyzer.ts` exports the target function with a minimal stub (`return []` or `throw new Error('not implemented')`)
- never generate `soluce.ts` or any reference solution file
- no `main.ts` unless truly useful; this format is test-driven like the real interview
- put tests in `src/` next to the code, like the real exercise
- only generate `transcript.md` as session artifact besides the exercise files; `debrief.md` is created later at review time

`transcript.md` initial content:
```markdown
# Transcript — [date]

<!-- Colle ici ton raisonnement oral pendant ou après la session.
     Le debrief sera généré à partir de ce transcript + ton code + les tests. -->
```

### Step 2 — Mandatory exercise shape

Every generated exercise must follow this skeleton.

**1. One input type** — chronological records with `date: Date` and 1-2 numeric fields.

**2. One category union** — 3 labels with explicit inclusive/exclusive thresholds.

**3. One output type** — per input row:
- `date: Date`
- one computed numeric metric (rounded to 2 decimals when relevant)
- `category: ...Category`
- `changePercent: number | null` (`null` for the first row)

**4. One function** — e.g. `analyzePatientHistory(measurements: Input[]): Output[]`

**5. Exactly 7 tests** — always cover these scenarios:

| # | Scenario |
|---|----------|
| 1 | empty input → empty output |
| 2 | single row → `changePercent` is `null` |
| 3 | two rows, metric increasing → positive `changePercent` |
| 4 | two rows, identical metric → `changePercent` is `0` |
| 5 | metric exactly on lower category boundary → higher category, not lower |
| 6 | metric exactly on upper category boundary → highest category, not middle |
| 7 | 3+ rows → each `changePercent` vs **immediate previous**, not vs first |

In `BRIEF.md`, list these 7 scenarios explicitly and warn that tests 5, 6, and 7 are common traps.

**6. Formulas in the brief** — write them explicitly:
- how to compute the main metric from input fields
- how to pick the category from thresholds
- `changePercent = ((metricB - metricA) / metricA) * 100`

### Step 3 — Setup and baseline

After generating the files:

```bash
cd sessions/YYYYMMDD-HHmm-implement-analyzer-[feature-slug]
npm install
npm test
```

Expected baseline:
- all 7 tests fail (or most fail) because `analyzer.ts` is not implemented
- TypeScript compiles
- no setup errors

If setup fails, fix the environment before handing off.

**`package.json`** (default shape):
```json
{
  "name": "alan-implement-analyzer",
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
    "testEnvironment": "node",
    "testMatch": ["**/src/**/*.test.ts"]
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
✅ Setup done. Types and tests are ready — your job is to implement the analyzer.

📋 Brief dans BRIEF.md — lis-le entièrement avant de coder
🧪 7 tests fournis dans src/analyzer.test.ts — ne les modifie pas
📝 Implémente src/analyzer.ts
⏱️  Cible : ~45-90 min, comme un bloc d'interview
🎙️  Parle à voix haute pendant l'exercice — colle ton raisonnement dans transcript.md
🔚  Quand tu as fini, dis-le moi : je lirai transcript.md et je générerai le debrief
```

**`BRIEF.md` format** — mirror the real interview handout:

```markdown
# [Analyzer title] — Test technique

**Durée :** 1h30
**Langage :** TypeScript
**Framework de test :** Jest (déjà configuré)

---

### Contexte

[2-4 sentences: Alan dashboard context, why this metric evolves over time, what the UI needs]

---

### Votre mission

Implémenter la fonction `[functionName]` dans le fichier `src/analyzer.ts`.

---

### Types de données

Les types suivants vous sont fournis (ne pas les modifier) :

[Describe each type with field meanings and category thresholds]

---

### Fonction à implémenter

[Signature]

Cette fonction prend un **tableau de mesures**, triées chronologiquement, et retourne un tableau de résultats où chaque entrée correspond à une mesure.

**Pour chaque mesure, vous devez :**

1. [Compute metric — explicit formula]
2. [Determine category — explicit thresholds with >= and <]
3. [Compute changePercent vs immediate previous — explicit formula]
4. Pour la **première mesure**, `changePercent` doit être `null`

---

### Règles & contraintes

- Ne pas modifier les types fournis
- Ne pas modifier le fichier de tests
- Vous pouvez ajouter des fonctions utilitaires privées dans `src/analyzer.ts`
- La fonction doit gérer les cas limites sans lever d'exception non gérée
- Pas de regex dans le code

---

### Tests

Sept tests unitaires sont fournis dans `src/analyzer.test.ts`. L'objectif est de les faire tous passer.

Les tests couvrent les scénarios suivants — **lisez-les attentivement avant d'implémenter :**

1. [empty]
2. [single row, null change]
3. [increasing metric, positive change]
4. [identical metric, zero change]
5. [lower boundary → higher category]
6. [upper boundary → highest category]
7. [3+ rows, each change vs previous]

> ⚠️ Portez une attention particulière aux tests 5, 6 et 7 — la gestion des bornes et des indices est une source d'erreur fréquente.

---

### Critères d'évaluation

- Les 7 tests passent
- Clarté et lisibilité du code
- Bonne gestion des cas limites
- Qualité des éventuelles fonctions utilitaires introduites
```

Do not add hints section in `BRIEF.md` — this simulates a real interview handout.

### Step 5 — Coaching during the session

If the user is stuck:
- ask them to re-read tests 5, 6, and 7 out loud
- ask whether boundaries use `>=` or `>` before coding categories
- ask whether `changePercent` compares to index `i - 1`, not index `0`
- nudge toward small private helpers (`computeMetric`, `getCategory`, `roundToTwoDecimals`) without writing the solution

Do not give the full solution during the session.

### Step 6 — Review and debrief (when the user says they're done)

1. Run `npm test`.
2. Read `transcript.md` in the session folder. If it is still empty, ask the user to paste their oral reasoning there before writing the debrief.
3. Read the user's implementation in `src/analyzer.ts`.
4. Write `debrief.md` by cross-analyzing:
   - what the transcript shows about their reasoning process
   - whether tests pass and which ones failed
   - boundary handling, sequential `changePercent`, readability
   - gaps between what they said out loud and what the code actually does
   - 2-3 concrete points to improve for the real interview

**`debrief.md` format:**
```markdown
# Debrief — [feature name]

## Résultat tests
[pass/fail summary]

## Ce que le transcript montre
[reasoning quality, hesitations, good instincts, missed steps]

## Code
[what worked, what broke, boundary/index traps]

## Pour l'entretien
[2-3 actionable takeaways]
```

Keep the debrief short, concrete, and centered on interview performance — not a full solution walkthrough.

## Exercise design rules

Good problems:
- one clear formula
- three category thresholds with one trap boundary each
- chronological array processing
- `null` on first element for relative change

Bad problems:
- multiple functions to implement
- sorting required (input is already sorted)
- timezone-heavy date logic
- nested objects or deep domain modeling
- LeetCode-style algorithms
- regex-based parsing

## Subject bank

Generate original Alan-flavored variants:

**Member BMI tracker**
Like the real exercise but Alan member wellness dashboard vocabulary.

**Claim reimbursement ratio history**
Input: date + reimbursed amount + claimed amount. Output: ratio, category (Low / Medium / High), changePercent.

**Teleconsultation monthly usage**
Input: date + session count + member active days. Output: sessions per active day, category, changePercent.

**Care act frequency analyzer**
Input: date + act count + covered days. Output: acts per week equivalent, category tiers, changePercent.

**Eligibility score timeline**
Input: date + score components. Output: weighted score, eligibility band, changePercent.

## Code generation rules

**`types.ts`** — export all types used by tests and analyzer.

**`analyzer.ts`** — only export the main function; stub body allowed.

**`analyzer.test.ts`** — import from `./types` and `./analyzer`; use explicit `Date` constructors; use `toBeCloseTo` for floats when needed; test names in French or English consistently within one file.

Example helper patterns the user may introduce (do not ship these pre-written):
```typescript
function roundToTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}

function getCategory(bmi: number): BmiCategory {
  if (bmi >= 30) {
    return "Obèse";
  }
  if (bmi >= 25) {
    return "Surpoids";
  }
  return "Normal";
}
```

Keep the session concise, realistic, and as close as possible to the Doctolib analyzer interview format.
