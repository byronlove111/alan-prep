import path from "path";

import { matchDocumentType } from "../src/documentMatcher";
import { readDocumentAliases } from "../src/utils";

const aliases = readDocumentAliases(
  path.join(__dirname, "..", "data", "document-aliases.json"),
);

describe("matchDocumentType - existing behavior", () => {
  it("matches an exact canonical alias", () => {
    expect(matchDocumentType("Invoice", aliases)).toBe("Invoice");
  });

  it("handles case and extra spaces", () => {
    expect(matchDocumentType("  prescription  ", aliases)).toBe("Prescription");
  });

  it("returns null when the wording is unrelated", () => {
    expect(matchDocumentType("family letter", aliases)).toBeNull();
  });
});
