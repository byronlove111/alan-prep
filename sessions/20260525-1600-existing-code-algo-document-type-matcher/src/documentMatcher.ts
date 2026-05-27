import { normalizeLooseText } from "./utils";

function normalizeForLookup(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function matchDocumentType(
  rawInput: string,
  aliases: Record<string, string>,
): string | null {
  const normalizedInput = normalizeForLookup(rawInput);

  if (!normalizedInput) {
    return null;
  }

  for (const [alias, canonicalType] of Object.entries(aliases)) {
    if (normalizeForLookup(alias) === normalizedInput) {
      return canonicalType;
    }
  }

  return null;
}

export function describeDocumentMatch(
  rawInput: string,
  matchedType: string | null,
): string {
  if (!matchedType) {
    return `No document type matched for "${rawInput}"`;
  }

  return `"${rawInput}" -> ${matchedType}`;
}
