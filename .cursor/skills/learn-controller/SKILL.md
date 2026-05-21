---
name: learn-controller
description: Generates a daily controller drill for Alan backend prep. Creates a small Express exercise focused on request parsing, validation, status codes, and response mapping on top of a provided service without mixing in repository or business-logic work. Use when the user says /learn-controller or wants controller practice.
disable-model-invocation: true
---

# Learn Controller

Daily controller drill. The user practices just enough HTTP work to avoid getting stuck on the web layer during the Alan interview.

## Context loading — read before every session

Before generating exercises, read `docs/alan-context.txt`, `docs/blog-articles.txt`, and `docs/glassdoor-interviews.txt`.
Use them to keep controller drills grounded in Alan's real product, vocabulary, use cases, and engineering concerns, even when the focus is only on HTTP-facing work.

## Goal

Train the minimum useful controller responsibilities only:
- read `req.params`, `req.query`, and `req.body`
- validate a few required fields or simple formats
- call the right service method
- map a small set of service errors to HTTP status codes
- return a small JSON response

The objective is not to go far. The objective is to become fluid enough not to block on the HTTP layer on interview day.

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
- the user implements only one small controller plus route wiring
- tests are HTTP-facing and fail because the controller behavior is incomplete

## Scope

Good controller concerns:
- `req.params`
- `req.query`
- `req.body`
- simple parsing for one number, boolean, or string field
- simple validation for required fields or obvious bad input
- return `200`, `201`, `400`, `404`, or `409` when appropriate
- delegate to the service once the input is clean
- map service output to a small response DTO or JSON object

Not good controller concerns:
- deciding business policy
- building SQL queries
- doing heavy transformations
- handling auth systems or middleware-heavy setups
- large validation schemas

## Drill shape

Keep every drill intentionally narrow:
- one route only
- one controller file
- one simple service dependency
- one or two validation points
- one or two mapped error cases at most

Good examples:
- `GET /members/:memberId/claims?status=open`
- `POST /reimbursements`
- `PATCH /documents/:documentId/review`

Prefer one read route or one write route. Do not combine multiple endpoints in the same session.

## Exercise design rules

Use realistic endpoint examples, but keep the payload small and the rules obvious.

## Tests

Write 3-5 HTTP tests:
- success path
- invalid param, query, or body
- missing required field if relevant
- mapped `NotFoundError` or `ConflictError`
- one simple response-shaping assertion if useful

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
- if validation starts growing, cut scope instead of adding more cases
- if validation becomes large, suggest a tiny parsing helper but keep it near the controller
- if the user starts enforcing policy rules, ask them to move that logic back to the service
- push for explicit status-code reasoning
- ask "what should this endpoint return when the input is malformed?" before suggesting code

Keep the block solvable in about 10-15 minutes.
