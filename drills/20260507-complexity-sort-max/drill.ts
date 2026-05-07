// ============================================================
// COMPLEXITY DRILL — sort for max · claims reimbursement
// ============================================================
// L'équipe finance d'Alan veut identifier le claim le plus coûteux
// soumis par un membre donné, pour détecter les dépenses exceptionnelles
// et déclencher une vérification manuelle si nécessaire.
// Lance : npx tsx drill.ts  (pour vérifier que ta version compile)
// ============================================================

interface Claim {
  claimId: string;
  memberId: string;
  amount: number;
  category: "consultation" | "specialist" | "dental" | "pharmacy" | "lab";
}

// ---- VERSION ACTUELLE (non optimisée) ----
// Retourne le claim avec le montant le plus élevé parmi tous les claims
// d'un membre. Retourne undefined si la liste est vide.
// function getHighestClaim(claims: Claim[]): Claim | undefined {
//   return [...claims].sort((a, b) => b.amount - a.amount)[0];
// }

// ---- TODO : VERSION OPTIMISÉE ----
// Réécris la fonction ci-dessous pour atteindre O(n) temps.
function getHighestClaim(claims: Claim[]): Claim | undefined {
  if (claims.length === 0) return undefined;
  let highestClaim = claims[0];
  for (const claim of claims) {
    if (highestClaim.amount <= claim.amount) {
      highestClaim = claim;
    }
  }
  return highestClaim;
}

// Tests manuels — décommente pour vérifier ton implémentation
const claims: Claim[] = [
  { claimId: "C1", memberId: "M1", amount: 25,  category: "consultation" },
  { claimId: "C2", memberId: "M1", amount: 120, category: "dental" },
  { claimId: "C3", memberId: "M1", amount: 60,  category: "specialist" },
];
console.log(getHighestClaim(claims));
// => { claimId: "C2", memberId: "M1", amount: 120, category: "dental" }
console.log(getHighestClaim([]));
// => undefined
