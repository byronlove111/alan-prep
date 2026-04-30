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
  id: string; // ex: "M-001"
  name: string; // ex: "Dupont Jean"
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
// ------------------------------------------------------------
export function parseMemberString(line: string): Member {
  const [id, name, plan, status] = line.split(":")
  return {
    id: id,
    name: name,
    plan: plan,
    status: status
  };
}

// ------------------------------------------------------------
// TODO 2 — map
// ------------------------------------------------------------
// Input  : ["M-001:Dupont Jean:premium:active", "M-002:Martin Claire:basic:pending"]
// Output : [Member, Member]
//
// ------------------------------------------------------------
export function parseMemberBatch(lines: string[]): Member[] {
  return lines.map(line => parseMemberString(line));
}

// ------------------------------------------------------------
// TODO 3 — includes sur une STRING
// ------------------------------------------------------------
// Retourne les membres dont le nom contient la chaîne recherchée (insensible à la casse non requis)
// Input  : members=[...], query="jean"
// Output : membres dont name.includes("jean") est vrai
// ------------------------------------------------------------
export function searchByName(members: Member[], query: string): Member[] {
  const membersFound : Member[] = [];
  for (const member of members){
    if (member.name.includes(query)){
      membersFound.push(member);
    }
  }
  return membersFound;
}

// ------------------------------------------------------------
// TODO 4 — reduce + spread (...)
// ------------------------------------------------------------
// Input  : [{ id:"M-001", status:"active", ... }, { id:"M-002", status:"pending", ... }]
// Output : { totalMembers: 2, pendingCount: 1, activeIds: ["M-001"] }
//
// ------------------------------------------------------------
export function buildOnboardingSummary(members: Member[]): OnboardingSummary {
  const summary : OnboardingSummary = {
    totalMembers : 0,
    pendingCount: 0,
    activeIds: []
  };

  for (const member of members) {
    summary.totalMembers += 1;
    if (member.status === "pending"){
      summary.pendingCount += 1;
    }
    if (member.status === "active"){
      summary.activeIds.push(member.id);
    }
  }
  return summary
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
  const report: Member[] = members.slice(-n);
  return report.map(r => `${r.id} | ${r.name} | ${r.plan} | ${r.status}`);
}

const members: Member[] = [
  { id: "M-001", name: "Dupont Jean", plan: "premium", status: "active" },
  { id: "M-002", name: "Martin Claire", plan: "basic", status: "pending" },
  { id: "M-003", name: "Leroy Paul", plan: "standard", status: "suspended" },
  { id: "M-004", name: "Bernard Sophie", plan: "premium", status: "active" },
]
console.log(auditReport(members, 1));
// // → ['M-002 | Martin Claire | basic | pending']
