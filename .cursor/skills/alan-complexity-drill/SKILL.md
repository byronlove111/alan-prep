---
name: alan-complexity-drill
description: Trains complexity analysis (Big O time + space) on realistic Alan domain code. Presents a non-optimized function, asks the user to identify its complexity, then explains the optimal complexity and guides them to rewrite it. Use when the user says /alan-complexity-drill or wants to practice Big O notation.
---

# Alan Complexity Drill

Trains the user to identify and improve time/space complexity on realistic Alan domain code.
Always one function at a time. Always health insurance domain.

## Flow

### Step 1 — Create the drill file and present the code

Create folder `drills/YYYYMMDD-complexity-[slug]/` with a single file:

```
drills/YYYYMMDD-complexity-[slug]/
└── drill.ts    # non-optimized function + TODO comment for the rewrite
```

Structure of `drill.ts`:
```typescript
// ============================================================
// COMPLEXITY DRILL — [pattern name] · [domain context]
// ============================================================
// [2-3 sentences Alan domain context — who uses this, why it exists]
// Lance : npx tsx drill.ts  (pour vérifier que ta version compile)
// ============================================================

// [interfaces needed]

// ---- VERSION ACTUELLE (non optimisée) ---- 
// [business comment explaining what the function does]
function foo(...): ... {
  // ... non-optimized implementation ...
}

// ---- TODO : VERSION OPTIMISÉE ----
// Réécris la fonction ci-dessous pour atteindre O(...) temps.
// function foo(...): ... {
//   throw new Error('not implemented');
// }

// Tests manuels — décommente pour vérifier ton implémentation
// console.log(foo(...));
// // => [expected output]
```

Generate a short, self-contained TypeScript function in Alan's domain (claims, members, reimbursements, documents).

Rules:
- The function must be simple enough to understand in 30 seconds
- It must have a clear, non-optimal complexity (O(n²), O(n log n) where O(n) is possible, etc.)
- Include realistic types (interfaces, arrays, Records)
- Add a 2-3 line comment above the function explaining what it does in business terms

After creating the file, show the function in the chat and ask:

```
Quelle est la complexité de cette fonction ?

**⏱️ Temps :**

> A — `O(...)` · [explication en français liée au code]
>
> B — `O(...)` · [explication en français liée au code]
>
> C — `O(...)` · [explication en français liée au code]

**🗄️ Espace :**

> A — `O(...)` · [explication en français liée au code]
>
> B — `O(...)` · [explication en français liée au code]
>
> C — `O(...)` · [explication en français liée au code]

→ Réponds avec deux lettres (ex : **Temps : B / Espace : C**) et justifie chaque choix en une phrase.
```

Rules for the options:
- Always include the correct answer among the 3
- The other 2 must be plausible mistakes (e.g. O(n) and O(n log n) if correct is O(n²))
- Explain each option in plain French, tied to what the code actually does — not abstract

### Step 2 — Validate and explain the optimal complexity

After the user answers:

1. Tell them if they're right or wrong on each dimension, and why (1-2 sentences, tied to the actual code)
2. Then explain:
   - What the optimal complexity is for this case
   - Why it's achievable (what pattern enables it — e.g. "un Record pour lookup O(1) au lieu de find() O(n)")
   - What the trade-off is if any (e.g. "O(n) en espace supplémentaire pour le Record")

Format:
```
✅ / ❌ Temps : [correct answer] — [explanation tied to the code]
✅ / ❌ Espace : [correct answer] — [explanation tied to the code]

**Complexité optimale : O(...) temps / O(...) espace**

[2-4 sentences explaining what pattern to use and why it's better.
Be concrete — name the data structure or method that makes it possible.]
```

### Step 3 — User rewrites the function

After the explanation, say:

```
À toi — réécris la fonction dans le TODO de drill.ts pour atteindre O(...) temps.
```

Wait for the user to edit `drill.ts` and share their implementation.

### Step 4 — Validate the rewrite

When the user pastes their code:

1. Check if the complexity is actually improved
2. Check if the logic is correct (same behavior, just more efficient)
3. Give brief feedback (3-5 lines max):
   - Is the complexity correct? Why?
   - One thing to improve in the code if any (naming, edge case, etc.)
   - One-line summary of what to remember

## Patterns to cover (rotate across sessions)

Never use the same pattern twice in a row. Check `drills/` and `sessions/` for recent ones.

| Pattern | Non-optimal | Optimal | When to use |
|---------|-------------|---------|-------------|
| Lookup in loop | `find()` inside `for` → O(n²) | `Record` index → O(n) | Finding by ID repeatedly |
| Sort then access | `sort()` + `[0]` → O(n log n) | Single pass `reduce` → O(n) | Finding max/min |
| Nested loops | Two `for` loops → O(n²) | One loop + accumulator → O(n) | Grouping, deduplication |
| Repeated filter | `filter()` inside loop → O(n²) | Pre-build a Set → O(n) | Membership checks |
| Full sort for top-k | `sort()` entire array → O(n log n) | Single pass → O(n) | Finding top 1 or top k with small k |

## Domain context

Always Alan's world: health insurance, member records, claims, reimbursements, documents, batch processing. Never generic arrays of numbers.

## Examples of non-optimized functions to generate

**Example A — find() in a loop (O(n²) → O(n))**
```typescript
// Pour chaque claim, retrouve le membre correspondant dans la liste
// et ajoute son nom au résultat.
function enrichClaims(claims: Claim[], members: Member[]): EnrichedClaim[] {
  return claims.map((claim) => {
    const member = members.find((m) => m.memberId === claim.memberId);
    return { ...claim, memberName: member?.name ?? "Unknown" };
  });
}
```
Correct: O(n×m) temps, O(n) espace. Optimal: O(n+m) avec un Record de membres indexés par memberId.

**Example B — sort for max (O(n log n) → O(n))**
```typescript
// Retourne le claim avec le montant le plus élevé pour un membre donné.
function getHighestClaim(claims: Claim[]): Claim | undefined {
  return [...claims].sort((a, b) => b.amount - a.amount)[0];
}
```
Correct: O(n log n) temps, O(n) espace (copie pour le sort). Optimal: O(n) avec un single-pass reduce.

**Example C — nested loop for deduplication (O(n²) → O(n))**
```typescript
// Supprime les claims en double (même claimId) d'une liste.
function deduplicateClaims(claims: Claim[]): Claim[] {
  return claims.filter(
    (claim, index) => claims.findIndex((c) => c.claimId === claim.claimId) === index
  );
}
```
Correct: O(n²) temps, O(1) espace supplémentaire. Optimal: O(n) avec un Set de claimIds déjà vus.
