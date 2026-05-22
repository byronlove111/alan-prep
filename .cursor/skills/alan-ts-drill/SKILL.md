---
name: alan-ts-drill
description: Generates targeted TypeScript/JavaScript exercises based on notions the user struggled with during a session. Use when the user says /alan-ts-drill, mentions struggling with a TS/JS concept, or wants to reinforce specific notions after a tech challenge session.
---

# Alan TS Drill

Generates a focused TypeScript exercise to reinforce specific JS/TS notions the user struggled with. Used as a bonus after `/alan-tech-challenge` sessions. Always in Alan's domain.

## Workflow

### Step 0 — Propose 3 drill themes

Before generating anything, propose exactly 3 different drill themes and ask the user to pick one (or give their own list of notions).

Rules for the 3 proposals:
- Each theme should combine 3-4 notions that naturally go together
- Vary the themes across the common notion list below — don't repeat the same notions
- Include at least one theme that focuses on things typically hard for JS/TS beginners
- Never repeat a theme from a recent `drills/` session (check the folder if needed)

Format:
```
Voici 3 thèmes de drill — choisis en un (ou donne-moi tes propres notions) :

**A — [theme name]**
Notions : [list]
[1-line description of the exercise angle]

**B — [theme name]**
Notions : [list]
[1-line description of the exercise angle]

**C — [theme name]**
Notions : [list]
[1-line description of the exercise angle]
```

Wait for the user's choice before generating anything.

### Step 1 — Identify the notions

Ask the user: "Sur quelles notions t'as eu des difficultés aujourd'hui ? Liste-les."

Common notions encountered in Alan-style exercises:
- `Array.map`, `Array.reduce`, `Array.filter`, `Array.find`
- Destructuring (arrays and objects)
- Arrow functions
- `Object.entries`, `Object.keys`, `Object.values`, `Object.fromEntries`
- `Record<K, V>` typing
- Writing unit tests with Jest (`describe`/`it`/`expect`)
- `interface` and type safety
- String methods (`split`, `trim`, `includes`, `startsWith`)
- `Date` objects and date formatting
- Optional chaining (`?.`) and nullish coalescing (`??`)
- `parseFloat`, `parseInt`

### Step 2 — Generate the exercise

Create folder `drills/YYYYMMDD-[notion-slug]/` with:

```
drills/YYYYMMDD-[notion-slug]/
├── drill.ts
├── drill.test.ts
├── package.json
└── tsconfig.json
```

**Design principles:**

- Always in Alan's domain (insurance, health, members, claims)
- Combine all the listed notions into ONE exercise — not one per notion
- Order the exercise so simpler notions appear first, harder ones build on top
- Instructions as `// TODO:` comments directly in the code — no separate consigne file
- 15-20 minutes max — this is a drill, not a full challenge
- The test file already contains the expected outputs — tests fail until the drill is complete
- Use Jest by default for all generated tests; do not generate a homemade `test-runner.ts`

**Structure of `drill.ts`:**

Inspired by Exercism's exercise format. Each function gets a narrative block that explains:
1. The business context (why this function exists in Alan's world)
2. A concrete call example with expected output — inline, not in a separate file
3. An optional one-line hint pointing to the right tool (never the solution)

```typescript
// ============================================================
// DRILL — [notion 1] · [notion 2] · [notion 3] · ...
// ============================================================
// [2-3 sentences setting the Alan domain scene — a character, a situation,
//  a real ops or data problem the team faces. Make it vivid, not abstract.]
//
// Lance : npm test
// ============================================================

// interface definitions here

// ------------------------------------------------------------
// 1. [Short imperative title — "Retrouver un claim par son identifiant"]
// ------------------------------------------------------------
// [2-4 sentences of narrative context. Who needs this? Why?
//  What happens if the data is missing? Don't mention the implementation.]
//
// foo(data, "X3")
// => { ... expected output ... }
//
// foo(data, "UNKNOWN")
// => undefined
// ------------------------------------------------------------
export function foo(...): ... {
  throw new Error('not implemented');
}

// [repeat for each function]

// ============================================================
// TESTS MANUELS — décommente pour tester dans le terminal
// npx tsx drill.ts
// ============================================================

// const sampleData = [ ... ]; // realistic Alan domain data

// // 1. [function name]
// console.log(foo(sampleData, "X3"));
// // => { ... }
// console.log(foo(sampleData, "UNKNOWN"));
// // => undefined

// [repeat for each function]
```

**Rules for function blocks:**
- Narrative first, example second — the reader must understand the *why* before seeing the *what*
- The call example is always shown *inside* the function block comment, not in a separate section
- Hint = one line, suggests the right tool (`Array.find`, `sort((a,b) => b-a)`, etc.) — never the implementation
- Never use `Input:` / `Output:` labels — use direct call syntax with `// =>` instead
- Each function starts with `throw new Error('not implemented')` — no starter logic
- The manual test block at the bottom uses the same sample data for all functions, with `// =>` comments showing expected output

**`package.json`** — always this standard Jest setup:
```json
{
  "name": "alan-ts-drill",
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

After generating the drill files, run `npm install`, then `npm test`.

### Step 3 — Launch

After generating the files, tell the user:

```
⏱️  DRILL — 15-20 minutes.

🎯  Notions : [list]
▶️  Lance : npm install puis npm test
✅  Objectif : tous les tests passent

Pas besoin d'enregistrement — c'est un drill technique, pas une simulation d'interview.
```

### Step 4 — Review (when user is done)

When the user says they're done or all tests pass:

Give a short feedback (5-10 lines max):
- Which notions are now solid
- Which one still needs attention
- 1 concrete thing to remember for the next tech challenge

No full debrief needed — this is a drill, not an interview simulation.
