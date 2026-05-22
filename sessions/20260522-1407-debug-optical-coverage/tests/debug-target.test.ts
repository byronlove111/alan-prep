import { bluePlan, sampleClaims } from "../src/fixtures";
import { buildReimbursementQuote } from "../src/services/reimbursementQuote";

describe("optical quote behavior", () => {
  it("keeps the dedicated progressive-lens coverage for member claims", () => {
    const quote = buildReimbursementQuote(bluePlan, sampleClaims.progressiveLensesMember);

    expect(quote).toMatchObject({
      matchedRuleId: "optical-progressive-member",
      appliedCoveragePercent: 70,
      reimbursementCents: 14_000,
      remainingCents: 6_000
    });
  });

  it("applies the yearly limit of the rule that should actually be selected", () => {
    const quote = buildReimbursementQuote(bluePlan, sampleClaims.progressiveLensesNearLimit);

    expect(quote).toMatchObject({
      matchedRuleId: "optical-progressive-member",
      yearlyLimitCents: 30_000,
      reimbursementCents: 12_000,
      remainingCents: 38_000
    });
  });
});
