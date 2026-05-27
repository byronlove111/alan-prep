import path from "path";

import { KeyFinder } from "../src/keyFinder";
import { loadDictionary } from "../src/utils";

const dictionary = loadDictionary(
  path.join(__dirname, "..", "data", "dictionary.txt"),
);

describe("KeyFinder - existing behavior", () => {
  const keyFinder = new KeyFinder(dictionary);

  it("keeps a word that is already correct", () => {
    expect(keyFinder.correctWord("assurance")).toBe("assurance");
  });

  it("fixes a missing-letter typo", () => {
    expect(keyFinder.correctWord("assurnce")).toBe("assurance");
  });
});
