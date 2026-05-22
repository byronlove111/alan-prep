import { pickBestSuggestion } from "./ranking";
import { CareLabelSuggestion } from "./types";
import {
  countSharedTokens,
  normalizeLooseText,
  tokenizeLabel,
} from "./utils";

function scoreCandidate(rawInput: string, candidate: string): CareLabelSuggestion | null {
  const inputTokens = tokenizeLabel(rawInput);
  const candidateTokens = tokenizeLabel(candidate);
  const matchedTokens = countSharedTokens(inputTokens, candidateTokens);

  if (matchedTokens.length === 0) {
    return null;
  }

  let score = matchedTokens.length * 3;

  if (matchedTokens.length === candidateTokens.length) {
    score += 2;
  }

  if (
    inputTokens.length === candidateTokens.length &&
    matchedTokens.length === candidateTokens.length
  ) {
    score += 4;
  }

  return {
    label: candidate,
    score,
    matchedTokens,
  };
}

export function suggestCareLabel(
  rawInput: string,
  canonicalLabels: string[],
): CareLabelSuggestion | null {
  const normalizedInput = normalizeLooseText(rawInput);

  if (!normalizedInput) {
    return null;
  }

  for (const candidate of canonicalLabels) {
    if (normalizeLooseText(candidate) === normalizedInput) {
      return {
        label: candidate,
        score: 99,
        matchedTokens: tokenizeLabel(candidate),
      };
    }
  }

  const rankedCandidates = canonicalLabels
    .map((candidate) => scoreCandidate(rawInput, candidate))
    .filter((candidate): candidate is CareLabelSuggestion => candidate !== null);

  const bestSuggestion = pickBestSuggestion(rankedCandidates);

  if (!bestSuggestion || bestSuggestion.score < 3) {
    return null;
  }

  return bestSuggestion;
}
