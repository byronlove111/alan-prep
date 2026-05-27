// ============================================================
// SOLUCE — split · trim · includes · Record · sort · pipeline
// ============================================================

export interface SupportNote {
  ticketId: string;
  rawText: string;
}

export interface KeywordCount {
  keyword: string;
  count: number;
}

function normalizeToken(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[-_/]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeCareNote(rawText: string): string {
  return normalizeToken(rawText);
}

export function extractKeywords(rawLine: string): string[] {
  const keywords: string[] = [];

  for (const part of rawLine.split(",")) {
    const keyword = normalizeToken(part);

    if (keyword) {
      keywords.push(keyword);
    }
  }

  return keywords;
}

export function countKeywordOccurrences(
  rawLines: string[],
): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const rawLine of rawLines) {
    for (const keyword of extractKeywords(rawLine)) {
      counts[keyword] = (counts[keyword] ?? 0) + 1;
    }
  }

  return counts;
}

export function rankTopKeywords(
  rawLines: string[],
  limit?: number,
): KeywordCount[] {
  const counts = countKeywordOccurrences(rawLines);
  const ranking: KeywordCount[] = [];

  for (const keyword in counts) {
    ranking.push({
      keyword,
      count: counts[keyword],
    });
  }

  ranking.sort((left, right) => {
    if (right.count !== left.count) {
      return right.count - left.count;
    }

    return left.keyword.localeCompare(right.keyword);
  });

  if (limit === undefined) {
    return ranking;
  }

  return ranking.slice(0, limit);
}
