import path from "path";

import { resolveActCode } from "./src/actMatcher";
import { loadCareActs, readLines } from "./src/utils";

const acts = loadCareActs(path.join(__dirname, "data", "acts.json"));
const inputs = readLines(path.join(__dirname, "data", "sample-inputs.txt"));

console.log("Care act resolution:\n");

for (const input of inputs) {
  const code = resolveActCode(input, acts);
  console.log(`"${input}" -> ${code ?? "UNKNOWN"}`);
}
