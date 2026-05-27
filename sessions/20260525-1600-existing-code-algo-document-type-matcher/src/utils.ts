import fs from "fs";

export function normalizeLooseText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[-_/]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function readDocumentAliases(
  filePath: string,
): Record<string, string> {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as Record<string, string>;
}
