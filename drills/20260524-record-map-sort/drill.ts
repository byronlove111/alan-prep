// ============================================================
// DRILL — Record · map · sort · Object.entries
// ============================================================
// Tu es dans l'equipe ops remboursements chez Alan. Chaque matin,
// la file contient des dizaines de claims ouverts repartis entre
// plusieurs membres. Avant le stand-up, tu dois extraire les bons
// identifiants, compter par membre, puis classer qui concentre le
// plus de travail.
//
// Lance : npm test
// ============================================================

export interface ClaimLine {
  submissionId: string;
  memberId: string;
  status: "open" | "closed";
  amountCents: number;
}

export interface MemberClaimCount {
  memberId: string;
  count: number;
}

// ------------------------------------------------------------
// 1. Lister les identifiants des claims encore ouverts
// ------------------------------------------------------------
// Le dashboard du matin affiche d'abord les submissionId des
// dossiers encore ouverts. Les claims deja fermes ne doivent
// pas apparaitre dans cette liste.
//
// mapOpenClaimIds(sampleClaims)
// => ["CL-100", "CL-102", "CL-105"]
//
// mapOpenClaimIds([])
// => []
// ------------------------------------------------------------
export function mapOpenClaimIds(claims: ClaimLine[]): string[] {

  const openClaims = claims.filter(claim => claim.status === "open");
  return openClaims.map(claim => claim.submissionId);
}

// ------------------------------------------------------------
// 2. Compter les claims ouverts par membre
// ------------------------------------------------------------
// L'equipe veut savoir combien de dossiers ouverts chaque membre
// a encore dans la file. Seuls les claims au statut "open"
// comptent. Le resultat est un dictionnaire memberId -> count.
//
// countOpenClaimsByMember(sampleClaims)
// => { "M-001": 2, "M-002": 1, "M-003": 1 }
//
// countOpenClaimsByMember([])
// => {}
// ------------------------------------------------------------
export function countOpenClaimsByMember(
  claims: ClaimLine[],
): Record<string, number> {
  const openClaimsByMembers : Record<string, number> = {};

  for (const claim of claims) {
    if (claim.status === "open") {
      if (!openClaimsByMembers[claim.memberId]) {
        openClaimsByMembers[claim.memberId] = 1;
      } else {
        openClaimsByMembers[claim.memberId] += 1;
      }
    }
  }

  return openClaimsByMembers;
}

// ------------------------------------------------------------
// 3. Transformer un dictionnaire de comptes en liste triee
// ------------------------------------------------------------
// Une fois les comptes calcules, l'ops veut une liste triee pour
// afficher le classement. Chaque entree doit devenir un objet
// { memberId, count }. On trie par count decroissant, puis par
// memberId alphabetique en cas d'egalite.
//
// sortMemberCounts({ "M-002": 1, "M-001": 2, "M-003": 2 })
// => [
//   { memberId: "M-001", count: 2 },
//   { memberId: "M-003", count: 2 },
//   { memberId: "M-002", count: 1 },
// ]
//
// sortMemberCounts({})
// => []
// ------------------------------------------------------------
export function sortMemberCounts(
  counts: Record<string, number>,
): MemberClaimCount[] {
  let arr = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const tmp : MemberClaimCount[] = [];

  for (const el of arr) {
    tmp.push({
      memberId: el[0],
      count: el[1]
    })
  }

  return tmp;
}

// ------------------------------------------------------------
// 4. Construire le classement complet depuis la file brute
// ------------------------------------------------------------
// Pour le stand-up, on veut directement le top des membres les
// plus charges a partir de la liste brute de claims. On ne garde
// que les claims ouverts, on compte par membre, puis on renvoie
// la liste triee. Si limit est fourni, on ne garde que les N
// premiers resultats.
//
// rankMembersByOpenClaims(sampleClaims)
// => [
//   { memberId: "M-001", count: 2 },
//   { memberId: "M-003", count: 1 },
//   { memberId: "M-002", count: 1 },
// ]
//
// rankMembersByOpenClaims(sampleClaims, 2)
// => [
//   { memberId: "M-001", count: 2 },
//   { memberId: "M-002", count: 1 },
// ]
// ------------------------------------------------------------
export function rankMembersByOpenClaims(
  claims: ClaimLine[],
  limit?: number,
): MemberClaimCount[] {
  const openClaims : ClaimLine[] = claims.filter(claim => claim.status === "open");
  const tmp : Record<string, number> = {};

  for (const claim of openClaims) {
    if (claim.status === "open") {
      if (!tmp[claim.memberId]) {
        tmp[claim.memberId] = 0;
      }
      tmp[claim.memberId] += 1;
    }
  }

  const arr = Object.entries(tmp).sort((a, b) => {
    if (b[1] - a[1] == 0) {
      return a[0].localeCompare(b[0])
    }
    return b[1] - a[1]
  });

  const memberClaimCount : MemberClaimCount[] = [];

  for (const el of arr) {
    memberClaimCount.push({
      memberId: el[0],
      count: el[1]
    })
  }

  if (!limit) {
    return memberClaimCount;
  }
  return memberClaimCount.slice(0, limit);
}

// ============================================================
// TESTS MANUELS — décommente pour tester dans le terminal
// npx tsx drill.ts
// ============================================================

const sampleClaims: ClaimLine[] = [
  { submissionId: "CL-100", memberId: "M-001", status: "open", amountCents: 4500 },
  { submissionId: "CL-101", memberId: "M-002", status: "closed", amountCents: 1200 },
  { submissionId: "CL-102", memberId: "M-001", status: "open", amountCents: 7800 },
  { submissionId: "CL-103", memberId: "M-003", status: "open", amountCents: 2300 },
  { submissionId: "CL-104", memberId: "M-002", status: "open", amountCents: 3100 },
];

// 1. mapOpenClaimIds
// console.log(mapOpenClaimIds(sampleClaims));
// => ["CL-100", "CL-102", "CL-103", "CL-104"]

// // 2. countOpenClaimsByMember
// console.log(countOpenClaimsByMember(sampleClaims));
// // => { "M-001": 2, "M-002": 1, "M-003": 1 }

// // 3. sortMemberCounts
// console.log(sortMemberCounts({ "M-002": 1, "M-001": 2, "M-003": 1 }));
// // => [
// //   { memberId: "M-001", count: 2 },
// //   { memberId: "M-002", count: 1 },
// //   { memberId: "M-003", count: 1 },
// // ]
// //
// 4. rankMembersByOpenClaims
// console.log(rankMembersByOpenClaims(sampleClaims, 2));
// => [
//   { memberId: "M-001", count: 2 },
//   { memberId: "M-002", count: 1 },
// ]
