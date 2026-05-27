import { normalizeLooseText } from "./utils";

function normalizeForMatch(value: string): string {
  return normalizeLooseText(value);
}

export function matchPlanLabel(
  rawInput: string,
  planLabels: string[],
): string | null {
  const normalizedInput = normalizeForMatch(rawInput);
  if (!normalizedInput) {
    return null;
  }

  for (const label of planLabels) {
    if (normalizeForMatch(label) === normalizedInput) {
      return label;
    }
  }

  return null;
}

export function describeMatch(rawInput: string, matchedLabel: string | null): string {
  if (!matchedLabel) {
    return `No plan matched for "${rawInput}"`;
  }

  return `"${rawInput}" -> ${matchedLabel}`;
}
