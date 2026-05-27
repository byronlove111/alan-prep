import path from "path";

import { matchPlanLabel } from "../src/planMatcher";
import { readPlanLabels } from "../src/utils";

const planLabels = readPlanLabels(
  path.join(__dirname, "..", "data", "plan-labels.txt"),
);

describe("matchPlanLabel - target change", () => {
  it("matches a hyphenated plan label", () => {
    expect(matchPlanLabel("basic-plan", planLabels)).toBe("Basic plan");
  });

  it("matches a hyphenated plan label with spaces between", () => {
    expect(matchPlanLabel("basic - plan", planLabels)).toBe("Basic plan");
  });

  it("matches an underscored plan label", () => {
    expect(matchPlanLabel("maternity_plan", planLabels)).toBe("Maternity plan");
  });
});
