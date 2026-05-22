import { bluePlan, sampleClaims } from "../src/fixtures";
import { buildReimbursementQuote } from "../src/services/reimbursementQuote";

describe("existing reimbursement behavior", () => {
  it("reimburses a standard dental cleaning", () => {
    const quote = buildReimbursementQuote(bluePlan, sampleClaims.dentalCleaning);

    expect(quote).toMatchObject({
      matchedRuleId: "dental-cleaning",
      appliedCoveragePercent: 60,
      reimbursementCents: 4_200,
      remainingCents: 2_800
    });
  });

  it("falls back to the generic optical rule for a child claim", () => {
    const quote = buildReimbursementQuote(bluePlan, sampleClaims.genericOpticalForChild);

    expect(quote).toMatchObject({
      matchedRuleId: "optical-generic",
      appliedCoveragePercent: 50,
      reimbursementCents: 6_000,
      remainingCents: 6_000
    });
  });

  it("returns no reimbursement when no coverage rule matches", () => {
    const quote = buildReimbursementQuote(bluePlan, sampleClaims.unknownCare);

    expect(quote).toMatchObject({
      matchedRuleId: null,
      reimbursementCents: 0,
      remainingCents: 5_000
    });
  });
});
