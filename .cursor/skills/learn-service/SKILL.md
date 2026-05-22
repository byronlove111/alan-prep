---
name: learn-service
description: Generates a daily service-layer drill for Alan backend prep. Creates a focused TypeScript exercise around validation, orchestration, and simple business decisions on top of provided repositories without involving controller code or raw SQL. Use when the user says /learn-service or wants service practice.
disable-model-invocation: true
---

# Learn Service

Daily service drill. The user practices the middle layer: validation, orchestration, and simple backend decisions.

## Context loading — read before every session

Before generating exercises, read `docs/alan-context.txt`, `docs/blog-articles.txt`, and `docs/glassdoor-interviews.txt`.
Use them to keep service drills grounded in Alan's real product, vocabulary, use cases, and engineering concerns, even when the focus is only on service-layer decisions.

## Goal

Train service work such as:
- validating inputs after they are already parsed
- coordinating one or two repositories
- checking simple business conditions
- shaping the service result for the next layer
- deciding which error to raise

Do not put HTTP details in the service. Do not write raw SQL in the service.

## Session format

Create one session folder:

```text
sessions/YYYYMMDD-HHmm-service/
├── src/
│   ├── types.ts
│   ├── services/
│   ├── repositories/
│   │   ├── [repo-a].ts
│   │   └── [repo-b].ts
│   └── errors.ts
├── service.test.ts
├── package.json
├── tsconfig.json
└── BRIEF.md
```

Rules:
- repository interfaces or fakes are provided
- the service implementation is not provided
- do not pre-create starter service code, a service class skeleton, or a partially implemented method
- the user must create the service file, constructor dependency wiring, public method signature, and the validation/orchestration logic
- tests fail because the service does not exist yet or because its behavior is still incomplete
- the exercise stays runnable with local tests only
- use Jest by default for all generated tests; do not generate a homemade `test-runner.ts`

## Scope

Good service concerns:
- guard clauses
- not-found handling
- conflict checks
- idempotency checks
- orchestrating two repository calls
- choosing when to use a repository transaction helper
- returning a shaped result object

Not good service concerns:
- body/query parsing
- SQL construction
- advanced domain modeling
- big algorithmic transformations better suited for `/learn-business-logic`

## Progression

### Phase 1

Single repository plus simple validation:
- reject missing entity
- reject invalid status change
- return a clean result

### Phase 2

Two repositories plus orchestration:
- fetch source data
- validate business preconditions
- persist the change

### Phase 3

Add one realistic service concern:
- idempotent create
- prevent duplicate processing
- simple transaction boundary
- map repository records to an API-ready result

### Phase 4

Add one slightly messy edge case:
- partial existing data
- archived or inactive entity
- optional related record

Still keep the exercise small enough for one service method.

## Exercise design rules

Use realistic Alan-style scenarios:
- open a reimbursement request
- confirm a document review
- refuse a claim because the contract is inactive
- reopen a pending task only if it was not already processed

Each drill should revolve around one service method and one explicit decision tree.
The repositories, types, errors, tests, and brief can be provided, but the service itself must be authored by the user from scratch.

## Tests

Write 4-6 service tests:
- happy path
- one validation failure
- one not-found case
- one conflict or duplicate case
- one result-shaping case if relevant

Tests should make the expected service shape clear enough for a junior developer to discover:
- which service class to create
- which dependencies it receives
- which public method to expose
- which outcomes and errors to handle

Prefer fakes or stubs over a real database unless the transaction behavior is the whole point.
Write them as standard Jest tests (`describe`/`it`/`expect`) in TypeScript.

## Default test stack

For every generated service session, default to:
- `jest`
- `ts-jest`
- `@types/jest`
- `@types/node`
- `typescript`

Use this minimal config:

**`package.json`**:
```json
{
  "name": "alan-service",
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

## Output to the user

After generating the session, say:

```text
Session service créée.
Lis BRIEF.md et les tests, puis crée et implémente le service depuis zéro.
Concentre-toi sur les règles, l'orchestration et les erreurs, pas sur HTTP ni SQL.
```

Then wait.

## Coaching rules

During the drill:
- if the user starts parsing HTTP input, remind them that HTTP parsing is out of scope for this drill
- if the user starts writing data-transformation-heavy helpers, ask whether that piece belongs in `/learn-business-logic`
- encourage tiny private helpers when the decision tree becomes hard to read
- ask "what rule are you enforcing here?" whenever the code becomes mechanical

Keep the block solvable in about 25 minutes.
