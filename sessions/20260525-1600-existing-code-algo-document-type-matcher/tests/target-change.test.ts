import path from "path";

import { matchDocumentType } from "../src/documentMatcher";
import { readDocumentAliases } from "../src/utils";

const aliases = readDocumentAliases(
  path.join(__dirname, "..", "data", "document-aliases.json"),
);

describe("matchDocumentType - target change", () => {
  it("matches a hyphenated document type", () => {
    expect(matchDocumentType("mutual-certificate", aliases)).toBe(
      "Mutual certificate",
    );
  });

  it("matches an underscored document type", () => {
    expect(matchDocumentType("mutual_certificate", aliases)).toBe(
      "Mutual certificate",
    );
  });
});
