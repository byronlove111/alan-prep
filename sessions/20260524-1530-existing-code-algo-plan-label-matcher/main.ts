import path from "path";

import { describeMatch, matchPlanLabel } from "./src/planMatcher";
import { readPlanLabels } from "./src/utils";

const planLabels = readPlanLabels(path.join(__dirname, "data", "plan-labels.txt"));

const samples = [
  "Basic plan",
  "  basic   plan  ",
  "basic-plan",
  "maternity_plan",
  "unknown plan",
];

for (const sample of samples) {
  const matchedLabel = matchPlanLabel(sample, planLabels);
  console.log(describeMatch(sample, matchedLabel));
}
