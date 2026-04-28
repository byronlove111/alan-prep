---
name: alan-build-feature
description: Generates a feature-addition exercise on an existing TypeScript codebase in Alan's domain. Agent sets up the full project (existing code + dependencies), gives a feature brief. User navigates the codebase, finds what to touch, and creates new files. Mix of provided failing tests + tests to write. ~1h. Use when the user says /alan-build-feature.
---

# Alan Build Feature

Feature addition exercise on an existing codebase. The user is a new engineer joining a project — they must read the existing code, understand it, decide what files to touch, and build the feature. No hand-holding on structure.

**Stack**: TypeScript only  
**Duration**: ~1h  
**Tests**: some failing tests provided + user must write their own

---

## Workflow

### Step 0 — Propose 3 subjects

Before generating anything, propose exactly 3 distinct feature ideas and ask the user to pick one.

Rules for the 3 proposals:
- Each must be in a different sub-domain of Alan's world (claims, members, contracts, documents, fraud...)
- Each must feel like a different kind of engineering challenge (data transformation, validation logic, querying, reporting...)
- Present them as short pitches (2-3 lines each) — enough context to choose, not the full brief
- Never propose something too similar to what was done in a previous build session (check `sessions/` for folders starting with `YYYYMMDD-build-`)

Format:
```
Voici 3 features à construire — choisis en une :

**A — [sub-domain]**
[2-3 line pitch]

**B — [sub-domain]**
[2-3 line pitch]

**C — [sub-domain]**
[2-3 line pitch]
```

Wait for the user's choice before generating anything.

### Step 1 — Generate the codebase

Pick a feature from the brief bank (or invent one in Alan's domain). Then create the full project structure.

**Project structure to generate** (always the same skeleton, feature content changes):

```
sessions/YYYYMMDD-build-[feature-slug]/
  src/
    types.ts          ← domain types (interfaces, enums)
    [existing-module-1].ts    ← an existing feature already implemented
    [existing-module-2].ts    ← another existing feature, related but distinct
    utils.ts          ← shared helpers (date parsing, formatting, etc.)
  tests/
    [existing-module-1].test.ts   ← passing tests for existing code
    [feature-to-build].test.ts    ← FAILING tests for the feature to build
  data/
    sample.ts         ← sample data the user can use to test manually
  BRIEF.md
  transcript.md       ← empty — user pastes their oral recording here after the session
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
- `types.ts` defines shared interfaces used across the project — the new feature must use them too
- The existing modules are real, working code. Not just stubs. The user can read them to understand patterns and reuse utilities.
- The existing module tests pass out of the box (green from the start)
- `[feature-to-build].test.ts` is provided but ALL tests fail because the source file doesn't exist yet — user must create it
- `utils.ts` has at least 2-3 helpers that are relevant to the new feature (the user needs to find and reuse them)
- `data/sample.ts` exports a few realistic data objects for manual testing

### Step 2 — Setup the environment

After generating the files:

```bash
cd sessions/YYYYMMDD-build-[feature-slug]
npm install
npx tsx test-runner.ts
```

Expected output: existing tests pass, feature tests fail. Show the output to the user so they see what's failing.

If setup fails for any reason, fix it before handing off.

**`package.json`** (always this exact config):
```json
{
  "name": "alan-build",
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

**`test-runner.ts`** (copy from project root if available, else use this):
```typescript
import * as fs from "fs";
import * as path from "path";

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passed++;
  } catch (e: any) {
    console.log(`  ❌ ${name}`);
    console.log(`     ${e.message}`);
    failed++;
  }
}

function expect(actual: any) {
  return {
    toBe: (expected: any) => {
      if (actual !== expected) throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    },
    toEqual: (expected: any) => {
      if (JSON.stringify(actual) !== JSON.stringify(expected))
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    },
    toBeNull: () => {
      if (actual !== null) throw new Error(`Expected null, got ${JSON.stringify(actual)}`);
    },
    toBeTruthy: () => {
      if (!actual) throw new Error(`Expected truthy, got ${JSON.stringify(actual)}`);
    },
    toBeFalsy: () => {
      if (actual) throw new Error(`Expected falsy, got ${JSON.stringify(actual)}`);
    },
  };
}

const testFiles = fs.readdirSync(path.join(__dirname, "tests")).filter(f => f.endsWith(".test.ts"));

for (const file of testFiles) {
  console.log(`\n📋 ${file}`);
  require(path.join(__dirname, "tests", file));
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
```

### Step 3 — Present the brief

After setup, show:

```
✅ Setup done. Existing tests: all green. Feature tests: failing (that's expected).

📋 Brief dans BRIEF.md
🗂️  Explore la codebase avant de coder
🎙️  Parle à voix haute pendant tout l'exercice — colle ton transcript dans transcript.md après
📝  Tu dois aussi écrire des tests supplémentaires (au moins 2)
🔚  Quand tu as fini, dis-le moi pour le review
```

**`BRIEF.md` format:**
```markdown
# Feature — [feature name]

## Contexte
[2-3 sentences: what this codebase does, what already exists, why the new feature is needed]

## Ce que tu dois construire
[Description of the feature from a business angle, not technical]

## Acceptance criteria
- [ ] All provided failing tests pass
- [ ] You added at least 2 of your own tests covering edge cases
- [ ] [domain-specific criterion]
- [ ] [domain-specific criterion]

## Hints (read only if stuck for >15 min)
<details>
<summary>Hint 1</summary>
[Point toward a useful util or pattern in the existing code — don't give the solution]
</details>
<details>
<summary>Hint 2</summary>
[Point toward a type or data structure they should reuse]
</details>

## Contraintes
- TypeScript strict mode
- Tu ne modifies pas les fichiers existants (sauf si vraiment nécessaire)
- Tu crées un nouveau fichier pour la feature
```

### Step 4 — Review (when user says they're done)

1. Run the tests and show output
2. Assess:
   - **Acceptance criteria**: which are met, which are not
   - **Code navigation**: did they find and reuse the right utilities and types?
   - **New tests quality**: do they cover meaningful edge cases?
   - **Code structure**: clean, readable, TypeScript-idiomatic?
   - **What a senior Alan engineer would say** in a PR review
3. Write debrief to `sessions/YYYYMMDD-build-[feature-slug]/debrief.md`

---

## Feature brief bank (generate original content inspired by these)

**Claims reimbursement rules**
Existing code: claim parsing, member registry, a working "submit claim" function.
Feature to add: reimbursement calculation engine — applies rates per act code, yearly cap, ALD override.

**Fraud detection flag**
Existing code: claim parsing, member registry, summary generator.
Feature to add: flag suspicious members — duplicate acts same day, amount above threshold, too many claims in a short window.

**Member document validator**
Existing code: member types, document upload tracking, status helpers.
Feature to add: validate that a member has all required documents before activating their contract. Return a validation report with missing items.

**Claim export formatter**
Existing code: claims storage, member registry, date utils.
Feature to add: generate a formatted export (CSV-like string) of all claims for a given member and month, sorted by date.

**Contract renewal checker**
Existing code: contract types, member registry, date utils.
Feature to add: find all contracts expiring within N days, generate a renewal notice object per member with urgency level (critical / warning / ok).
