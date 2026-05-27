const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

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
    return text.replace(/[a-zA-Z]+/g, (word) => this.correctWord(word));
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
