const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

function isLetter(character: string): boolean {
  const code = character.charCodeAt(0);
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

export class KeyFinder {
  constructor(private readonly dictionary: Set<string>) {}

  correctWord(word: string): string {
    const lower = word.toLowerCase();

    if (this.dictionary.has(lower)) {
      return lower;
    }

    for (const candidate of this.generateInsertionCandidates(lower)) {
      if (this.dictionary.has(candidate)) {
        return candidate;
      }
    }

    return lower;
  }

  correctText(text: string): string {
    const tokens = text.split(" ");

    return tokens
      .map((token) => {
        let start = 0;
        let end = token.length;

        while (start < end && !isLetter(token[start])) {
          start += 1;
        }

        while (end > start && !isLetter(token[end - 1])) {
          end -= 1;
        }

        const prefix = token.slice(0, start);
        const word = token.slice(start, end);
        const suffix = token.slice(end);

        if (!word) {
          return token;
        }

        return prefix + this.correctWord(word) + suffix;
      })
      .join(" ");
  }

  private generateInsertionCandidates(word: string): string[] {
    const candidates: string[] = [];

    for (let index = 0; index < word.length; index++) {
      for (const letter of ALPHABET) {
        candidates.push(word.slice(0, index) + letter + word.slice(index));
      }
    }

    return candidates;
  }
}
