// ============================================================
// DRILL — destructuring · Array.map · Array.reduce · Record<K,V> · Object.entries
// ============================================================
// Contexte :
//   Alan reçoit une liste d'actes médicaux au format texte.
//   Tu dois parser ces actes et générer un rapport : total par code + acte le plus fréquent.
//
// Objectif :
//   Implémenter les 4 fonctions ci-dessous pour que tous les tests passent.
//   Lance : npx tsx drill.test.ts
// ============================================================

export interface Act {
  code: string;    // ex: "C23"
  label: string;   // ex: "Consultation généraliste"
  amount: number;  // ex: 25.00
}

// ------------------------------------------------------------
// TODO 1 — destructuring
// ------------------------------------------------------------
// Input  : "C23|Consultation généraliste|25.00"
// Output : { code: "C23", label: "Consultation généraliste", amount: 25 }
//
// Hint : split puis destructuring, amount doit être un number
// ------------------------------------------------------------
export function parseLine(line: string): Act {
  if (!line) {
    throw new Error("parseLine function: String not valid");
  }
  const [code, label, amount] = line.split("|");
  return {
    code: code.trim(),
    label: label.trim(),
    amount: parseFloat(amount.trim()),
  };
}

// ------------------------------------------------------------
// TODO 2 — Array.map
// ------------------------------------------------------------
// Input  : ["C23|Consultation|25.00", "SPE7|Radiologie|45.00"]
// Output : [{ code: "C23", ... }, { code: "SPE7", ... }]
//
// Hint : une seule ligne suffit
// ------------------------------------------------------------
export function parseActs(lines: string[]): Act[] {
  if (!lines)
    throw new Error("parseActs function: lines array are not valid");
  return lines.map(parseLine);
}

// ------------------------------------------------------------
// TODO 3 — Record<string, number> + boucle
// ------------------------------------------------------------
// Input  : [{ code: "C23", amount: 25 }, { code: "C23", amount: 30 }, { code: "SPE7", amount: 45 }]
// Output : { "C23": 55, "SPE7": 45 }
//
// Hint : construis un dictionnaire vide et accumule les montants par code
// ------------------------------------------------------------
export function totalByCode(acts: Act[]): Record<string, number> {
  const dict: Record<string, number> = {};
  for (const act of acts) {
    if (!dict[act.code]) {
      dict[act.code] = act.amount;
    } else {
      dict[act.code] += act.amount;
    }
  }
  return dict;
}

// ------------------------------------------------------------
// TODO 4 — Object.entries + boucle
// ------------------------------------------------------------
// Input  : { "C23": 55, "SPE7": 90, "MK50": 35 }
// Output : "SPE7"
//
// Hint : Object.entries transforme un objet en tableau de paires [clé, valeur]
// ------------------------------------------------------------
export function topActCode(totals: Record<string, number>): string {
  const arr = Object.entries(totals);
  let topAmount = 0;
  let topCode = "";
  for (const [code, amount] of arr) {
    if (amount > topAmount) {
      topCode = code;
      topAmount = amount;
    }
  }
  return topCode;
}
