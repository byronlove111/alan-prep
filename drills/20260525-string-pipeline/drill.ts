// ============================================================
// DRILL — split · trim · includes · Record · sort · pipeline
// ============================================================
// Tu es dans l'equipe claims chez Alan. Les notes membres arrivent
// bruitees dans les tickets support: majuscules, espaces en trop,
// separateurs incoherents. Avant le tri du matin, tu dois nettoyer
// ces notes, extraire les mots-cles, compter ceux qui reviennent le
// plus, puis afficher un petit top pour l'equipe ops.
//
// Lance : npm test
// ============================================================

export interface SupportNote {
  ticketId: string;
  rawText: string;
}

export interface KeywordCount {
  keyword: string;
  count: number;
}

// ------------------------------------------------------------
// 1. Nettoyer une note brute
// ------------------------------------------------------------
// Les notes peuvent arriver en majuscules, avec des espaces en trop
// ou des separateurs du type "-" et "_". Alan veut une version stable
// en minuscules, sans accents, avec un seul espace entre les mots.
//
// normalizeCareNote("  Missing-RIB  follow   up ")
// => "missing rib follow up"
//
// normalizeCareNote("")
// => ""
// ------------------------------------------------------------
export function normalizeCareNote(rawText: string): string {
  let cleaned = rawText.toLowerCase();

  cleaned = cleaned.split("-").join(" ");
  cleaned = cleaned.split("_").join(" ");

  return cleaned
    .split(" ")
    .filter(Boolean)
    .join(" ");
}

// ------------------------------------------------------------
// 2. Extraire les mots-cles d'une ligne
// ------------------------------------------------------------
// Certaines notes contiennent plusieurs mots-cles separes par des
// virgules. Chaque mot-cle doit etre nettoye individuellement,
// sans entree vide dans le resultat final.
//
// extractKeywords(" duplicate , Missing RIB, , manual review ")
// => ["duplicate", "missing rib", "manual review"]
//
// extractKeywords("")
// => []
// ------------------------------------------------------------
export function extractKeywords(rawLine: string): string[] {
  const dup : string[] = [];
  for (const word of rawLine.split(",")) {
    const keyword : string = word.toLowerCase().trim();
    if (keyword) {
      dup.push(keyword);
    }
  }
  return dup;
}

// ------------------------------------------------------------
// 3. Compter combien de fois chaque mot-cle apparait
// ------------------------------------------------------------
// Le lead ops recoit une liste de lignes brutes contenant des mots-cles.
// Il veut savoir combien de fois chaque mot-cle revient, apres nettoyage
// et extraction. Deux lignes avec "Duplicate" et " duplicate " doivent
// compter pour le meme mot-cle normalise.
//
// countKeywordOccurrences([
//   " duplicate , missing rib ",
//   "Manual review, duplicate",
// ])
// => { "duplicate": 2, "missing rib": 1, "manual review": 1 }
//
// countKeywordOccurrences([])
// => {}
// ------------------------------------------------------------
export function countKeywordOccurrences(rawLines: string[]): Record<string, number> {
  const keywordOccurences : Record<string, number> = {};

  for (const line of rawLines) {
    const keywords = line.split(",");
      for (const word of keywords) {
        const keyword = word.toLocaleLowerCase().trim();
          if (!keywordOccurences[keyword]) {
            keywordOccurences[keyword] = 0;
          }
        keywordOccurences[keyword] += 1;
      }
  }

  return keywordOccurences;
}

// ------------------------------------------------------------
// 4. Afficher le top des mots-cles
// ------------------------------------------------------------
// A partir des lignes brutes, retourne les mots-cles les plus
// frequents sous forme de liste triee. On trie par count decroissant,
// puis par keyword alphabetique si egalite. Si limit est fourni, on
// ne garde que les N premiers resultats.
//
// rankTopKeywords([
//   " duplicate , missing rib ",
//   "Manual review, duplicate",
//   "missing rib",
// ], 2)
// => [
//   { keyword: "duplicate", count: 2 },
//   { keyword: "missing rib", count: 2 },
// ]
//
// rankTopKeywords([], 3)
// => []
// ------------------------------------------------------------
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

// ============================================================
// TESTS MANUELS — décommente pour tester dans le terminal
// npx tsx drill.ts
// ============================================================

const sampleLines = [
  " duplicate , missing rib ",
  "Manual review, duplicate",
  "missing rib",
];

// // 1. normalizeCareNote
// console.log(normalizeCareNote("  Missing-RIB  follow   up "));
// // => "missing rib follow up"

// // 2. extractKeywords
// console.log(extractKeywords(" duplicate , Missing RIB, , manual review "));
// // => ["duplicate", "missing rib", "manual review"]

// // 3. countKeywordOccurrences
// console.log(countKeywordOccurrences(sampleLines));
// // => { "duplicate": 2, "missing rib": 2, "manual review": 1 }

// // 4. rankTopKeywords
// console.log(rankTopKeywords(sampleLines, 2));
// => [
//   { keyword: "duplicate", count: 2 },
//   { keyword: "missing rib", count: 2 },
// ]
