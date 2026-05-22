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

export function tokenizeLabel(value: string): string[] {
  const normalized = normalizeLooseText(value);
  return normalized ? normalized.split(" ") : [];
}

export function countSharedTokens(left: string[], right: string[]): string[] {
  const rightSet = new Set(right);
  return left.filter((token) => rightSet.has(token));
}

export function readCareLabels(filePath: string): string[] {
  return fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}
