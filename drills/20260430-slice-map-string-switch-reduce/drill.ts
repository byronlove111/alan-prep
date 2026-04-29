// ============================================================
// DRILL — split · switch/case · map · includes (string) · reduce · spread · slice
// ============================================================
// Contexte :
//   Alan gère l'onboarding de membres pour des entreprises clientes.
//   Chaque membre a un plan de couverture, un statut d'activation, et des documents requis.
//   On reçoit ces données sous forme de strings brutes qu'on doit parser et analyser.
//
// Objectif :
//   Implémenter les 5 fonctions ci-dessous pour que tous les tests passent.
//   Lance : npx tsx drill.test.ts
// ============================================================

export type MemberStatus = "active" | "pending" | "suspended";
export type CoverageLevel = "basic" | "standard" | "premium";

export interface Member {
  id: string;           // ex: "M-001"
  name: string;         // ex: "Dupont Jean"
  plan: CoverageLevel;
  status: MemberStatus;
}

export interface OnboardingSummary {
  totalMembers: number;
  pendingCount: number;
  activeIds: string[];
}

// ------------------------------------------------------------
// TODO 1 — split · trim · switch/case
// ------------------------------------------------------------
// Input  : "M-001:Dupont Jean:premium:active"
// Output : { id: "M-001", name: "Dupont Jean", plan: "premium", status: "active" }
//
// Hint : split(":") donne les 4 segments — utilise switch/case pour typer plan et status
// ------------------------------------------------------------
export function parseMemberString(line: string): Member {
  throw new Error('not implemented');
}

// ------------------------------------------------------------
// TODO 2 — map
// ------------------------------------------------------------
// Input  : ["M-001:Dupont Jean:premium:active", "M-002:Martin Claire:basic:pending"]
// Output : [Member, Member]
//
// Hint : lines.map(parseMemberString)
// ------------------------------------------------------------
export function parseMemberBatch(lines: string[]): Member[] {
  throw new Error('not implemented');
}

// ------------------------------------------------------------
// TODO 3 — includes sur une STRING
// ------------------------------------------------------------
// Retourne les membres dont le nom contient la chaîne recherchée (insensible à la casse non requis)
// Input  : members=[...], query="jean"
// Output : membres dont name.includes("jean") est vrai
//
// Hint : string.includes() fonctionne sur les strings, pas seulement les tableaux.
//        c'est la même méthode mais appliquée à un string : "Dupont Jean".includes("Jean") → true
// ------------------------------------------------------------
export function searchByName(members: Member[], query: string): Member[] {
  throw new Error('not implemented');
}

// ------------------------------------------------------------
// TODO 4 — reduce + spread (...)
// ------------------------------------------------------------
// Input  : [{ id:"M-001", status:"active", ... }, { id:"M-002", status:"pending", ... }]
// Output : { totalMembers: 2, pendingCount: 1, activeIds: ["M-001"] }
//
// Hint : utilise reduce avec { totalMembers: 0, pendingCount: 0, activeIds: [] } comme départ.
//        Pour ajouter un id sans muter l'acc : [...acc.activeIds, member.id]
//        N'oublie pas de return acc à la fin du callback.
// ------------------------------------------------------------
export function buildOnboardingSummary(members: Member[]): OnboardingSummary {
  throw new Error('not implemented');
}

// ------------------------------------------------------------
// TODO 5 — slice + map
// ------------------------------------------------------------
// Retourne les N derniers membres formatés comme strings d'audit
// Input  : members=[M1, M2, M3, M4], n=2
// Output : ["M-003 | Martin Claire | standard | pending", "M-004 | ..."]
//          format : "id | name | plan | status"
//
// Hint : slice(-n) retourne les n derniers éléments — puis map chaque member en string
// ------------------------------------------------------------
export function auditReport(members: Member[], n: number): string[] {
  throw new Error('not implemented');
}
