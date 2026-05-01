// ============================================================
// DRILL — interface · Record<K,V> · Object.entries · Date
// ============================================================
// Contexte :
//   Alan suit les contrats actifs de ses membres et veut générer
//   des rapports : contrats par niveau de couverture, durée restante,
//   et alertes d'expiration imminente.
//
// Objectif :
//   Implémenter les 4 fonctions ci-dessous pour que tous les tests passent.
//   Lance : npx tsx drill.test.ts
// ============================================================

// Interface partagée — à utiliser dans toutes les fonctions
export interface Contract {
  id: string;           // ex: "CTR-001"
  memberId: string;     // ex: "M-001"
  coverage: "basic" | "standard" | "premium";
  startDate: string;    // format "YYYY-MM-DD"
  endDate: string;      // format "YYYY-MM-DD"
}

// ------------------------------------------------------------
// TODO 1 — interface · Record<K,V>
// ------------------------------------------------------------
// Regroupe les contrats par niveau de couverture.
// Input  : [{id:"CTR-001", coverage:"basic", ...}, {id:"CTR-002", coverage:"premium", ...}]
// Output : { basic: [{...}], premium: [{...}] }
//
// Hint : utilise un Record<string, Contract[]> comme accumulateur.
//        Pour chaque contrat, crée la clé si elle n'existe pas encore (??= []).
// ------------------------------------------------------------
export function groupByCoverage(contracts: Contract[]): Record<string, Contract[]> {
  throw new Error('not implemented');
}

// ------------------------------------------------------------
// TODO 2 — Object.entries · interface
// ------------------------------------------------------------
// À partir du résultat de groupByCoverage, retourne un résumé :
// combien de contrats par niveau de couverture.
// Input  : { basic: [{...}, {...}], premium: [{...}] }
// Output : { basic: 2, premium: 1 }
//
// Hint : Object.entries(grouped) te donne [[coverage, contracts], ...]
// ------------------------------------------------------------
export function countByCoverage(grouped: Record<string, Contract[]>): Record<string, number> {
  throw new Error('not implemented');
}

// ------------------------------------------------------------
// TODO 3 — Date · comparaison · calcul
// ------------------------------------------------------------
// Calcule le nombre de jours entre deux dates au format "YYYY-MM-DD".
// Retourne un nombre positif si dateB est après dateA, négatif sinon.
// Input  : dateA="2026-05-01", dateB="2026-05-15"
// Output : 14
//
// Hint : new Date("YYYY-MM-DD") crée un objet Date.
//        date.getTime() retourne les millisecondes depuis epoch.
//        1 jour = 1000 * 60 * 60 * 24 ms.
// ------------------------------------------------------------
export function daysBetween(dateA: string, dateB: string): number {
  throw new Error('not implemented');
}

// ------------------------------------------------------------
// TODO 4 — Date · Record<K,V> · Object.entries
// ------------------------------------------------------------
// Pour chaque contrat, calcule le nombre de jours restants avant expiration
// par rapport à une date de référence (referenceDate au format "YYYY-MM-DD").
// Retourne un Record avec l'id du contrat comme clé et les jours restants comme valeur.
// Les contrats déjà expirés (daysLeft <= 0) sont EXCLUS du résultat.
// Input  : contracts=[{id:"CTR-001", endDate:"2026-05-08", ...}], referenceDate="2026-05-01"
// Output : { "CTR-001": 7 }
//
// Hint : utilise daysBetween que tu viens d'implémenter.
//        Pour construire le Record final, Object.fromEntries([["CTR-001", 7], ...]) peut aider.
// ------------------------------------------------------------
export function daysUntilExpiry(contracts: Contract[], referenceDate: string): Record<string, number> {
  throw new Error('not implemented');
}
