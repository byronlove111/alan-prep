---
name: alan-tech-challenge
description: Generates a TypeScript coding exercise simulating Alan's technical interview (45 min, CoderPad style). Use when the user says /alan-tech-challenge, wants to simulate Alan's technical interview, or wants to practice a timed coding challenge.
---

# Alan Tech Challenge

Simulates Alan's 45-minute technical interview. Based on their actual process: exercise on CoderPad, not an algo puzzle, close to real engineering work, starter code provided with a potential bug, unit tests already written for the happy path.

## Facts to respect (from Alan's process)

- 45 minutes (the first 5 min of the real interview is icebreaker — so 45 min of actual coding)
- Starter code is given — partially working, may contain a subtle bug
- Unit tests already exist for the happy path
- Language: TypeScript (the candidate chose it — Alan allows any language for backend)
- Tools allowed during interview: AI (but must challenge output), Google, Stack Overflow
- NOT expected: Levenshtein, graph algorithms, DP, fancy data structures — brute force is explicitly fine
- The goal is to reach a working solution, not a perfect one

## Step 0 — Propose 3 subjects

Before generating anything, propose exactly 3 distinct exercise ideas and ask the user to pick one.

Rules for the 3 proposals:
- Each must be a different type (`parsing`, `business-rules`, `data-processing`, `refactoring`)
- Each must be in a different sub-domain of Alan's world (e.g. one on claims, one on members, one on documents)
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

**The bug**: embed exactly 1 subtle bug in the starter code. Prefer boundary conditions: first/last element, empty input, index off-by-one, slice that misses the last character. The bug must be findable by writing a targeted unit test.

**Difficulty**: realistic for a final-year Master's student with some production experience. Not trivial, not impossible in 45 min.

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
