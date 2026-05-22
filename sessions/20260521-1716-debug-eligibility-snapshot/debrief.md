# Debrief — Eligibility Snapshot

## Result

- All tests pass
- The main business bug was fixed
- A regression test was added
- The small extension `isEndingSoon` was completed

## What Went Well

- Good final intuition on the root cause: `effectiveTo` had to be treated as inclusive on the reference day
- Useful regression test added for the end-date behavior
- No large refactor; the fix stayed small and coherent

## What Was Hard

- Too much time was spent on understanding vocabulary before returning to the failing behavior
- Reading the code flow was harder than necessary because the focus moved away from the red tests
- The extension was not fully implemented correctly on the first try

## Main Lesson

For this kind of exercise, the best order is:

1. Understand the business goal
2. Read the red tests first
3. Compare them with green tests
4. Form one root-cause hypothesis
5. Read only the code that decides the final behavior
6. Fix with the smallest coherent change
7. Add a regression test

## Interview Signal

- Good signal on business reasoning once the right hypothesis was formed
- Medium signal on autonomy because too much guidance was needed to isolate the fix

## Next Focus

- Get faster at moving from symptom to hypothesis
- Stay focused on the failing tests instead of trying to understand every term first
- Read messy code by following the decision flow, not line by line
