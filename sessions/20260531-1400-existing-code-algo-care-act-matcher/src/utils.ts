import fs from "fs";

import { CareAct } from "./types";

export function normalizeLooseText(value: string): string {
  let cleaned = value.toLowerCase().trim();
  cleaned = cleaned.split("-").join(" ");
  cleaned = cleaned.split("_").join(" ");
  cleaned = cleaned.split("/").join(" ");

  return cleaned
    .split(" ")
    .filter(Boolean)
    .join(" ");
}

export function loadCareActs(filePath: string): CareAct[] {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as CareAct[];
}

export function readLines(filePath: string): string[] {
  return fs
    .readFileSync(filePath, "utf8")
    .split("\n")
    .map((line) => line.replace("\r", "").trim())
    .filter(Boolean);
}
