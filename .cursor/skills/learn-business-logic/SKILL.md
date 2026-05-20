---
name: learn-business-logic
description: Generates a short daily TypeScript drill for Alan backend prep focused on business-logic transformations in Alan's domain: claims, reimbursements, members, contracts, eligibility, documents, and healthcare data shaping. Creates a practical exercise without HTTP or database concerns. Use when the user says /learn-business-logic or wants pure Alan-like backend logic practice.
disable-model-invocation: true
---

# Learn Business Logic

Daily Alan-style pure-logic drill. This skill trains the messy middle: take imperfect health-insurance data and turn it into clean, member-facing or internal business outputs.

## Context loading — read before every session

Before generating exercises, read `docs/alan-context.txt`, `docs/blog-articles.txt`, and `docs/glassdoor-interviews.txt`.
Use them to keep business-logic drills grounded in Alan's real product, vocabulary, use cases, and engineering concerns, even when the focus is only on pure transformation work.

## Goal

Train only these families of problems:
- parsing raw Alan-like input
- normalizing business fields
- deduplicating records
- grouping and aggregating domain data
- shaping output for another layer
- simple insurance-related calculations

Do not add HTTP, Express, repositories, or SQL unless a fixture needs to look realistic.

## Session format

Create one session folder:

```text
sessions/YYYYMMDD-HHmm-business-logic/
├── src/
│   ├── types.ts
│   ├── fixtures.ts
│   └── [exercise].ts
├── [exercise].test.ts
├── test-runner.ts
├── package.json
└── BRIEF.md
```

Rules:
- `types.ts` and `fixtures.ts` are provided
- the source file is missing or mostly empty
- tests fail because the transformation logic is not implemented yet
- the exercise is solvable with plain TypeScript only
- the business context must always feel like Alan, never generic CRUD

## Scope

Good topics:
- parse healthcare-act or claim payloads into clean internal objects
- merge duplicated reimbursement or document-review rows
- aggregate reimbursements by member, contract, or care category
- compute a concise member-facing claim or reimbursement summary
- shape eligibility, coverage, or fraud-check outputs for another layer
- normalize messy member, contract, or medical-document data

Bad topics:
- advanced graph algorithms
- large class hierarchies
- controller validation
- repository persistence behavior
- generic ecommerce, banking, or logistics examples

## Progression

### Phase 1

Parsing and normalization:
- trim member, provider, or document fields
- normalize claim, reimbursement, or eligibility statuses
- convert dates, euro amounts, or cent amounts
- reject unusable healthcare rows

### Phase 2

Deduplication and shaping:
- merge repeated claim acts, documents, or reimbursement events
- keep the newest, most complete, or most trustworthy row
- produce a clean internal array or a member-facing list

### Phase 3

Aggregation:
- group by member, contract, claim, or care category
- compute totals, counts, or remaining eligible amounts
- return a short summary object useful for Alan product surfaces

### Phase 4

Mixed exercise:
- parse first
- deduplicate next
- aggregate or summarize last

Keep calculations simple, practical, and business-facing.

## Exercise design rules

Use realistic Alan-style inputs only:
- claim events from a third-party healthcare provider
- reimbursement lines attached to members and contracts
- healthcare acts with labels, dates, categories, and amounts
- eligibility snapshots or coverage-rule outputs
- document review rows for invoices, prescriptions, or receipts
- light fraud-check signals such as duplicate document hashes or suspicious repeated amounts

Prefer arrays of objects with a few messy edge cases:
- duplicate claim ids or document ids
- missing optional member or contract fields
- mixed casing in statuses or care categories
- stale timestamps between two provider events
- amounts already in cents or still in euros
- partial parsing failures in business payloads

Prefer short drills that fit daily practice:
- one focused function
- one business question
- a few fixtures
- 4-6 targeted tests
- solvable in about 20-25 minutes

Suggested exercise families:
- build a member-facing summary from raw reimbursement events
- normalize healthcare acts before reimbursement eligibility checks
- deduplicate uploaded supporting documents before review
- aggregate claim lines by care category for a contract snapshot
- parse a partner payload into internal claim inputs
- shape a clean eligibility result for a member app surface

## Tests

Write 4-6 focused tests:
- happy path
- one malformed healthcare input case
- one deduplication case
- one aggregation or summary case
- one output-shaping assertion relevant to Alan's domain

Prefer small fixtures over giant datasets.

## Output to the user

After generating the session, say:

```text
Session business logic créée.
Lis BRIEF.md et les tests, puis implémente la transformation demandée.
Le but est de rendre la donnée propre, cohérente et exploitable.
```

Then wait.

## Coaching rules

During the drill:
- ask the user to name the transformation stages before coding
- encourage small pure helpers when the logic mixes parsing and aggregation
- prefer readability over clever one-liners
- if the user starts discussing routes or SQL, redirect them to the matching skill
- keep the framing in Alan's world: members, claims, reimbursements, contracts, documents, eligibility

Keep the block short, concrete, and solvable in about 25 minutes.
