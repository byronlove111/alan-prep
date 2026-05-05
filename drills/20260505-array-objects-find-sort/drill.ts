// ============================================================
// DRILL — Array<{}> · Array.find · Array.sort · interface · type inference
// ============================================================
// Tu travailles pour Alan, une assurance santé digitale.
// Chaque jour, des dizaines de claims (demandes de remboursement)
// arrivent de la part des membres. Ton rôle : implémenter les
// utilitaires qui permettent à l'équipe ops de naviguer dans ces données.
//
// Lance : npx tsx drill.test.ts
// ============================================================

export interface Claim {
  claimId: string;
  memberId: string;
  amount: number;       // montant soumis en euros
  category: "consultation" | "pharmacy" | "dental";
}

export interface MemberTotal {
  memberId: string;
  total: number;        // somme des amounts de ce membre
  claimCount: number;   // nombre de claims de ce membre
}

// ------------------------------------------------------------
// 1. Retrouver un claim par son identifiant
// ------------------------------------------------------------
// L'équipe support reçoit des tickets avec un claimId. Elle a
// besoin de retrouver rapidement le claim correspondant dans la liste.
// Si le claim n'existe pas, la fonction retourne undefined — le
// TypeScript l'indique dans le type de retour, inutile de le
// ré-annoter toi-même.
//
// findClaimById(claims, "C3")
// => { claimId: "C3", memberId: "M1", amount: 50, category: "dental" }
//
// findClaimById(claims, "C99")
// => undefined
// ------------------------------------------------------------
export function findClaimById(claims: Claim[], claimId: string): Claim | undefined { 
  return claims.find((claim) => claim.claimId === claimId);
}

// ------------------------------------------------------------
// 2. Calculer le total dépensé par membre
// ------------------------------------------------------------
// Pour préparer les rapports mensuels, l'équipe finance veut
// savoir combien chaque membre a soumis au total, et combien
// de claims il a déposés. Un même membre peut avoir plusieurs
// claims dans la liste.
//
// groupByMember([
//   { claimId: "C1", memberId: "M1", amount: 30, category: "consultation" },
//   { claimId: "C2", memberId: "M2", amount: 18, category: "pharmacy" },
//   { claimId: "C3", memberId: "M1", amount: 50, category: "dental" },
// ])
// => [
//   { memberId: "M1", total: 80, claimCount: 2 },
//   { memberId: "M2", total: 18, claimCount: 1 },
// ]
// ------------------------------------------------------------
export function groupByMember(claims: Claim[]): MemberTotal[] {
  const memberTotal : MemberTotal[] = []
  for (const claim of claims) {
    const member = memberTotal.find((member) => member.memberId === claim.memberId);
    if (!member) {
      memberTotal.push({
        memberId: claim.memberId,
        total: claim.amount,
        claimCount: 1
      })
    } else {
      member.total += claim.amount;
      member.claimCount += 1;
    }
  }
  return memberTotal;
}

// ------------------------------------------------------------
// 3. Trier les membres par montant total décroissant
// ------------------------------------------------------------
// Le rapport finance doit afficher les membres qui ont le plus
// dépensé en premier. La fonction ne doit pas modifier le tableau
// qu'elle reçoit en entrée — elle retourne un nouveau tableau trié.
//
// sortByTotalDesc([
//   { memberId: "M1", total: 80,  claimCount: 2 },
//   { memberId: "M2", total: 18,  claimCount: 1 },
//   { memberId: "M3", total: 250, claimCount: 3 },
// ])
// => [
//   { memberId: "M3", total: 250, claimCount: 3 },
//   { memberId: "M1", total: 80,  claimCount: 2 },
//   { memberId: "M2", total: 18,  claimCount: 1 },
// ]
// ------------------------------------------------------------
export function sortByTotalDesc(totals: MemberTotal[]): MemberTotal[] {
  const sortedTotal : MemberTotal[] = totals.sort((a, b) => b.total - a.total);
  return sortedTotal;
}

// ------------------------------------------------------------
// 4. Identifier le membre qui a le plus dépensé
// ------------------------------------------------------------
// En fin de mois, l'équipe data veut savoir quel membre a soumis
// le plus de claims en valeur totale. Si aucun claim n'a été
// déposé ce mois-ci, la fonction retourne undefined.
//
// getTopSpender(claims)
// => { memberId: "M3", total: 250, claimCount: 3 }
//
// getTopSpender([])
// => undefined
// ------------------------------------------------------------
export function getTopSpender(claims: Claim[]): MemberTotal | undefined {
  const members = groupByMember(claims);
  const sortedMembers = sortByTotalDesc(members);
  return sortedMembers[0];
}

// ============================================================
// TESTS MANUELS — décommente pour tester dans le terminal
// npx tsx drill.ts
// ============================================================

const sampleClaims: Claim[] = [
  { claimId: "C1", memberId: "M1", amount: 30,  category: "consultation" },
  { claimId: "C2", memberId: "M2", amount: 18,  category: "pharmacy" },
  { claimId: "C3", memberId: "M1", amount: 50,  category: "dental" },
  { claimId: "C4", memberId: "M3", amount: 150, category: "consultation" },
  { claimId: "C5", memberId: "M3", amount: 40,  category: "pharmacy" },
  { claimId: "C6", memberId: "M3", amount: 60,  category: "consultation" },
];

// // 1. findClaimById
// console.log(findClaimById(sampleClaims, "C3"));
// // => { claimId: 'C3', memberId: 'M1', amount: 50, category: 'dental' }
// console.log(findClaimById(sampleClaims, "C99"));
// // => undefined

// // 2. groupByMember
// console.log(groupByMember(sampleClaims));
// // => [
// //   { memberId: 'M1', total: 80,  claimCount: 2 },
// //   { memberId: 'M2', total: 18,  claimCount: 1 },
// //   { memberId: 'M3', total: 250, claimCount: 3 },
// // ]

// // 3. sortByTotalDesc
// console.log(sortByTotalDesc(groupByMember(sampleClaims)));
// // => M3 (250) → M1 (80) → M2 (18)

// // 4. getTopSpender
// console.log(getTopSpender(sampleClaims));
// // => { memberId: 'M3', total: 250, claimCount: 3 }
// console.log(getTopSpender([]));
// // => undefined
