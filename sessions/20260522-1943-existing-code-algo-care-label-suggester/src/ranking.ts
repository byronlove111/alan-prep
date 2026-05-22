import { CareLabelSuggestion } from "./types";

export function pickBestSuggestion(
  suggestions: CareLabelSuggestion[],
): CareLabelSuggestion | null {
  if (suggestions.length === 0) {
    return null;
  }

  return [...suggestions].sort((left, right) => {
    if (right.score !== left.score) {
      return right.score - left.score;
    }

    if (right.matchedTokens.length !== left.matchedTokens.length) {
      return right.matchedTokens.length - left.matchedTokens.length;
    }

    return left.label.localeCompare(right.label);
  })[0];
}
