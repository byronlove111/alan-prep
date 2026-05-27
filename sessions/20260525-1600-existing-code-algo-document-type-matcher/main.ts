import path from "path";

import { describeDocumentMatch, matchDocumentType } from "./src/documentMatcher";
import { readDocumentAliases } from "./src/utils";

const aliases = readDocumentAliases(
  path.join(__dirname, "data", "document-aliases.json"),
);

const samples = [
  "Invoice",
  "  prescription  ",
  "mutual-certificate",
  "mutual_certificate",
  "family letter",
];

for (const sample of samples) {
  const matchedType = matchDocumentType(sample, aliases);
  console.log(describeDocumentMatch(sample, matchedType));
}
