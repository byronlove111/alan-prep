---
name: learn-controller
description: Generates a daily controller drill for Alan backend prep. Creates a small Express exercise focused on request parsing, validation, status codes, and response mapping on top of a provided service without mixing in repository or business-logic work. Use when the user says /learn-controller or wants controller practice.
disable-model-invocation: true
---

# Learn Controller

Daily controller drill. The user practices the HTTP edge of the backend: receive input, validate it, call the service, and shape the response.

## Context loading — read before every session

Before generating exercises, read `docs/alan-context.txt`, `docs/blog-articles.txt`, and `docs/glassdoor-interviews.txt`.
Use them to keep controller drills grounded in Alan's real product, vocabulary, use cases, and engineering concerns, even when the focus is only on HTTP-facing work.

## Goal

Train controller responsibilities only:
- read params, query, headers, and body
- validate required fields and simple formats
- call the right service method
- map service errors to HTTP status codes
- shape the JSON response

Do not put business logic in the controller. Do not touch the repository layer.

## Session format

Create one session folder:

```text
sessions/YYYYMMDD-HHmm-controller/
├── src/
│   ├── app.ts
│   ├── controllers/
│   │   └── [name]Controller.ts
│   ├── services/
│   │   └── [name]Service.ts
│   ├── types.ts
│   └── errors.ts
├── controller.http.test.ts
├── test-runner.ts
├── package.json
└── BRIEF.md
```

Rules:
- `app.ts` and a fake or stub service are provided
- the controller file is missing or incomplete
- the user implements only the controller and route wiring
- tests are HTTP-facing and fail because the controller behavior is incomplete

## Scope

Good controller concerns:
- `req.params`, `req.query`, `req.body`, `req.headers`
- parse booleans, numbers, and simple dates carefully
- return `200`, `201`, `204`, `400`, `404`, `409` when appropriate
- delegate to the service once the input is clean
- map service output to a response DTO

Not good controller concerns:
- deciding business policy
- building SQL queries
- doing heavy transformations
- implementing authentication systems from scratch

## Progression

### Phase 1

Simple read endpoint:
- one path param
- optional query params
- one success case
- one bad-request case

### Phase 2

Write endpoint:
- validate request body
- call service with a typed input
- return `201` or `204`

### Phase 3

Error mapping:
- service throws `NotFoundError`
- service throws `ConflictError`
- controller maps each one correctly

### Phase 4

One realistic controller refinement:
- pagination query params
- auth header extraction into a simple user context
- response shaping for a list endpoint

Keep it small and interview-relevant.

## Exercise design rules

Use realistic endpoint examples:
- `GET /members/:memberId/claims`
- `POST /claims/:claimId/documents`
- `PATCH /contracts/:contractId/status`
- `POST /reimbursements`

Each drill should focus on one route only.

## Tests

Write 4-6 HTTP tests:
- success path
- invalid param or body
- missing required field
- mapped not-found or conflict error
- one response-shaping assertion

Avoid duplicating service tests. The point is controller behavior.

## Output to the user

After generating the session, say:

```text
Session controller créée.
Lis BRIEF.md, app.ts et les tests HTTP, puis implémente le controller.
Garde toute la logique métier dans le service.
```

Then wait.

## Coaching rules

During the drill:
- if validation becomes large, suggest a tiny parsing helper but keep it near the controller
- if the user starts enforcing policy rules, ask them to move that logic back to the service
- push for explicit status-code reasoning
- ask "what should this endpoint return when the input is malformed?" before suggesting code

Keep the block solvable in about 20 minutes.
