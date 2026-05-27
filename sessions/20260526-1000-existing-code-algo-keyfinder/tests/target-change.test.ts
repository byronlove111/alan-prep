import path from "path";

import { KeyFinder } from "../src/keyFinder";
import { loadDictionary } from "../src/utils";

const dictionary = loadDictionary(
  path.join(__dirname, "..", "data", "dictionary.txt"),
);

describe("KeyFinder - target change", () => {
  const keyFinder = new KeyFinder(dictionary);

  it("fixes an extra-letter typo", () => {
    expect(keyFinder.correctWord("shiining")).toBe("shining");
  });

  it("fixes a wrong-letter typo", () => {
    expect(keyFinder.correctWord("neighhorhood")).toBe("neighborhood");
  });

  it("fixes a missing letter at the end of the word", () => {
    expect(keyFinder.correctWord("assuranc")).toBe("assurance");
  });
});
