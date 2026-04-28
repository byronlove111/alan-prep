# Feature — Fraud Detection Engine

## Contexte

Alan's claims processing pipeline can already parse batches of healthcare claims and generate per-member summaries.
The compliance team now needs a fraud detection layer: before any batch is approved for reimbursement, suspicious activity must be flagged automatically and reviewed by a human.
You are joining the team to build this detection module.

## Ce que tu dois construire

Implement a `flagSuspicious` function that scans a list of claims and returns a fraud report for every member whose activity matches at least one suspicious pattern.

## Acceptance criteria

- All provided failing tests in `tests/fraud.test.ts` pass
- You added at least 2 of your own tests covering edge cases
- The function handles an empty claims array (returns `[]`)
- A member can be flagged for multiple reasons simultaneously
- `suspiciousClaims` contains the IDs of the claims that triggered each rule

## Rules to implement


| Rule           | Condition                                           | Reason code              |
| -------------- | --------------------------------------------------- | ------------------------ |
| Duplicate act  | Same member, same `actCode`, same `date`, 2+ claims | `duplicate_act_same_day` |
| High amount    | A single claim `amount > 200`                       | `amount_above_threshold` |
| High frequency | More than 5 claims in the same calendar month       | `high_frequency`         |


## Hints (read only if stuck for > 15 min)

Hint 1 There's a function in `src/claims.ts` that groups claims by member. Start there — you'll need to iterate over each member's claims separately.

Hint 2 `src/utils.ts` has a function that extracts the year-month from a date string. Useful for grouping by calendar month within a member's claims.

## Contraintes

- TypeScript strict mode — use the `FraudFlag` and `FraudReason` types from `src/types.ts`
- Create your implementation in a new file: `src/fraud.ts`
- Do not modify existing files
- Export a single function: `flagSuspicious(claims: Claim[]): FraudFlag[]`