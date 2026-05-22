import path from "path";

import { suggestCareLabel } from "./src/careLabelSuggester";
import { readCareLabels } from "./src/utils";

const careLabels = readCareLabels(path.join(__dirname, "data", "care-labels.txt"));

const samples = [
  "General consultation",
  "physiotherapy-session",
  "tele consultation follow up",
  "family doctor note",
];

for (const sample of samples) {
  const suggestion = suggestCareLabel(sample, careLabels);

  if (suggestion) {
    console.log(`${sample} -> ${suggestion.label} (score: ${suggestion.score})`);
  } else {
    console.log(`${sample} -> no suggestion`);
  }
}
