import path from "path";

import { matchPlanLabel } from "../src/planMatcher";
import { readPlanLabels } from "../src/utils";

const planLabels = readPlanLabels(
  path.join(__dirname, "..", "data", "plan-labels.txt"),
);

describe("matchPlanLabel - existing behavior", () => {
  it("matches an exact canonical label", () => {
    expect(matchPlanLabel("Basic plan", planLabels)).toBe("Basic plan");
  });

  it("handles case and extra spaces", () => {
    expect(matchPlanLabel("  basic   plan  ", planLabels)).toBe("Basic plan");
  });

  it("returns null when the wording is unrelated", () => {
    expect(matchPlanLabel("family doctor note", planLabels)).toBeNull();
  });
});
