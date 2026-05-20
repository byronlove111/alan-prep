# Session — 2026-05-20 · ClaimSummaryEndpoint

## Brief
The Claims crew wants to add a member-facing endpoint that gives a clean monthly recap of what a member submitted in the app. Members sometimes submit the same claim twice by mistake, so the recap must stay understandable and must not inflate totals.

## Goal
Build `GET /members/:memberId/claims/summary?month=YYYY-MM`.

## Left unspecified on purpose
- how you split repository methods across the three tables
- exactly how you structure the duplicate-detection helper inside the service
- which extra response fields you add beyond the tested contract
- which small guardrails you add around edge cases that are not explicitly tested

## Complexity covered
- Aggregation
- Deduplication
- Light temporal rule: duplicates only collapse when the second submission happens within 24 hours

## Transcript
_(colle ici ce que tu as dit pendant la session)_
