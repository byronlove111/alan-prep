# Learn Service — Confirm a document review

## Context

You are working in an Alan claims workflow.

After a claim document is manually checked, the backend can confirm the review. The controller and input parsing already happened. Your task is only the service layer: validate the command, fetch the existing review, enforce simple business rules, persist the change, and return a clean result.

## Task

Create `ConfirmDocumentReviewService` in `src/services/confirmDocumentReviewService.ts` and implement its public `execute()` method.

## Rules to enforce

1. `reviewId` must not be empty.
2. `confirmedBy` must not be empty.
3. The review must exist.
4. Only reviews with status `pending` can be confirmed.
5. If the review is already `confirmed`, raise a conflict error.
6. If the review is `rejected`, raise a conflict error.
7. If everything is valid, update the review with:
   - status `confirmed`
   - `confirmedBy` from the command
   - `confirmedAt` from `now()`
8. Return:

```ts
{
  reviewId: "...",
  documentId: "...",
  status: "confirmed",
  message: "Document review confirmed"
}
```

## Out of scope

- HTTP or controller concerns
- SQL
- complex domain modeling
- changing repository contracts

## Suggested approach

1. Read the tests first.
2. Create the service file and class.
3. Wire the repository and `now()` dependency in the constructor.
4. Implement guard clauses and business checks.
5. Persist the update and shape the result.

This session is intentionally small and should stay solvable in about 25 minutes.
