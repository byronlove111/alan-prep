import path from "path";

import { KeyFinder } from "./src/keyFinder";
import { loadDictionary, readTextFile } from "./src/utils";

const dictionary = loadDictionary(
  path.join(__dirname, "data", "dictionary.txt"),
);
const keyFinder = new KeyFinder(dictionary);

const simpleText = readTextFile(
  path.join(__dirname, "data", "simple-text.txt"),
);
const complexText = readTextFile(
  path.join(__dirname, "data", "complex-text.txt"),
);

console.log("Simple text:");
console.log(keyFinder.correctText(simpleText));

console.log("\nComplex text:");
console.log(keyFinder.correctText(complexText));
