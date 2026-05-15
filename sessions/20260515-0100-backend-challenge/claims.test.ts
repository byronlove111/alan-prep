import { test, expect } from "./test-runner";
import { claimsService } from "./src/services/claimsService";

// Lance les tests avec : npx tsx claims.test.ts

test("creates a claim for a valid member and input", () => {
  const result = claimsService.submitClaim("m-1", { actCode: "C", amount: 25 });
  expect(result.error).toBeUndefined();
  expect(result.claim?.memberId).toBe("m-1");
  expect(result.claim?.actCode).toBe("C");
  expect(result.claim?.amount).toBe(25);
});

test("returns 404 when member does not exist", () => {
  const result = claimsService.submitClaim("m-unknown", { actCode: "C", amount: 25 });
  expect(result.code).toBe(404);
});

test("returns 422 when actCode is empty", () => {
  const result = claimsService.submitClaim("m-1", { actCode: "", amount: 25 });
  expect(result.code).toBe(422);
});

test("returns 422 when amount is zero", () => {
  const result = claimsService.submitClaim("m-1", { actCode: "C", amount: 0 });
  expect(result.code).toBe(422);
});

test("returns 409 when same actCode submitted twice today for same member", () => {
  claimsService.submitClaim("m-1", { actCode: "DUPTEST", amount: 50 });
  const result = claimsService.submitClaim("m-1", { actCode: "DUPTEST", amount: 50 });
  expect(result.code).toBe(409);
});

// À écrire toi-même :
// TODO: member with no prior claims can submit without crash
// TODO: member with existing claims can add a new one
// TODO: negative amount returns 422
