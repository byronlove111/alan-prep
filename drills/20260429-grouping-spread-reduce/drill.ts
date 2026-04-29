// ============================================================
// DRILL — Record<string, T[]> · Object.entries · spread (...) · reduce
// ============================================================
// Contexte :
//   Alan traite des remboursements de soins médicaux.
//   Chaque claim appartient à un membre et a un code acte (actCode).
//   On veut analyser les claims : les grouper, les compter, les agréger.
//
// Objectif :
//   Implémenter les 4 fonctions ci-dessous pour que tous les tests passent.
//   Lance : npx tsx drill.test.ts
// ============================================================

export interface Claim {
  id: string;
  memberId: string;
  actCode: string;
  amount: number;
}

// ------------------------------------------------------------
// TODO 1 — Record<string, Claim[]>
// ------------------------------------------------------------
// Input  : [{ id: "C1", memberId: "M-001", actCode: "C23", amount: 25 },
//           { id: "C2", memberId: "M-002", actCode: "SPE7", amount: 80 },
//           { id: "C3", memberId: "M-001", actCode: "MK50", amount: 35 }]
// Output : { "M-001": [C1, C3], "M-002": [C2] }
//
// Hint : initialise le tableau avec `if (!acc[key]) acc[key] = []` avant de push
// ------------------------------------------------------------
export function groupByMember(claims: Claim[]): Record<string, Claim[]> {
  const byMember : Record<string, Claim[]> = {};
  for (const c of claims) {
    if (!byMember[c.memberId]) {
      byMember[c.memberId] = [];
    }
    byMember[c.memberId].push(c);
  }
  return byMember;
}

// ------------------------------------------------------------
// TODO 2 — Object.entries + destructuring [key, value] + skip ,
// ------------------------------------------------------------
// Input  : { "M-001": [C1, C3], "M-002": [C2] }
// Output : ["M-001", "M-002"]  (only members with more than 1 claim)
//
// Hint : Object.entries() retourne des paires [key, value] — utilise for...of avec destructuring
//        Pour ignorer une variable dans le destructuring, utilise la virgule seule : [, value]
// ------------------------------------------------------------
export function activeMemberIds(grouped: Record<string, Claim[]>): string[] {
  const activeMembers: string[] = [];
  const iterableList = Object.entries(grouped);

  for (const [memberId, claim] of iterableList){
    if (claim.length > 1){
      activeMembers.push(memberId);
    }
  }
  return activeMembers;
}

// ------------------------------------------------------------
// TODO 3 — spread (...) dans push
// ------------------------------------------------------------
// Input  : [{ id: "C1", memberId: "M-001", actCode: "C23", amount: 25 },
//           { id: "C2", memberId: "M-001", actCode: "C23", amount: 30 }]
// Output : ["C1", "C2"]  (tous les ids du groupe en un seul tableau)
//
// Hint : group.map(c => c.id) retourne un tableau — spread (...) permet de push
//        tous ses éléments en une fois : arr.push(...autreArray)
// ------------------------------------------------------------
export function collectIds(groups: Claim[][]): string[] {
  const collection : string[] = [];
  for (const group of groups){
    collection.push(...group.map(c => c.id));
  }
  return collection;
}

// ------------------------------------------------------------
// TODO 4 — reduce
// ------------------------------------------------------------
// Input  : [{ id: "C1", memberId: "M-001", actCode: "C23", amount: 25 },
//           { id: "C2", memberId: "M-001", actCode: "C23", amount: 30 },
//           { id: "C3", memberId: "M-002", actCode: "SPE7", amount: 80 }]
// Output : { "C23": 55, "SPE7": 80 }  (total amount par actCode)
//
// Hint : reduce prend (accumulateur, élément) => nouvel accumulateur.
//        L'accumulateur de départ est {} — pense à initialiser acc[actCode] si absent.
//        À utiliser quand tu veux transformer un tableau en UN seul objet ou valeur.
// ------------------------------------------------------------
export function totalByActCode(claims: Claim[]): Record<string, number> {
  return claims.reduce((dict, claim) => {
    if (!dict[claim.actCode]) dict[claim.actCode] = 0;
    dict[claim.actCode] += claim.amount;
    return dict;
  }, {} as Record<string, number>);
}