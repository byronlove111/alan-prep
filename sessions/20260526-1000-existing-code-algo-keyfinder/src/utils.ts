import fs from "fs";

export function readLines(filePath: string): string[] {
  return fs
    .readFileSync(filePath, "utf8")
    .split("\n")
    .map((line) => line.replace("\r", "").trim())
    .filter(Boolean);
}

export function readTextFile(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}

export function loadDictionary(filePath: string): Set<string> {
  return new Set(readLines(filePath));
}
