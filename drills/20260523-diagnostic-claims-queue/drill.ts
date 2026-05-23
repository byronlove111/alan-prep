// ============================================================
// DRILL - Array.find · filter/map/reduce · Record · parsing · sorting
// ============================================================
// Tu travailles dans l'equipe ops remboursements chez Alan.
// Chaque matin, l'equipe ouvre une file de claims a relire avant paiement:
// certaines categories sont bruitees, certains flags sont concatnes dans
// une seule string, et plusieurs claims peuvent appartenir au meme membre.
//
// Lance : npm test
// ============================================================

export type ClaimStatus = "to_review" | "approved" | "rejected";
export type ClaimCategory = "consultation" | "pharmacy" | "dental" | "other";

export interface ClaimSubmission {
  submissionId: string;
  memberId: string;
  memberName?: string | null;
  status: ClaimStatus;
  amountCents: number;
  rawCategory?: string | null;
  rawFlags?: string | null;
  assignee?: {
    id: string;
    firstName: string;
  } | null;
}

export interface FlagCount {
  flag: string;
  count: number;
}

export interface MemberQueueSummary {
  memberId: string;
  memberName: string;
  claimCount: number;
  totalAmountEur: number;
  categories: ClaimCategory[];
  owner: string;
}

// ------------------------------------------------------------
// 1. Retrouver un claim par son identifiant
// ------------------------------------------------------------
// L'equipe support recoit souvent un ticket avec un submissionId.
// Elle veut juste retrouver la ligne brute correspondante dans la file
// pour voir le statut, le montant et les infos du membre.
//
// findSubmissionById(sampleSubmissions, "CL-103")
// => { submissionId: "CL-103", memberId: "M-003", ... }
//
// findSubmissionById(sampleSubmissions, "CL-999")
// => undefined
//
// Hint: pense a Array.find.
// ------------------------------------------------------------
export function findSubmissionById(
  submissions: ClaimSubmission[],
  submissionId: string,
): ClaimSubmission | undefined {
  return submissions.find((submission) => submission.submissionId === submissionId);
}

// ------------------------------------------------------------
// 2. Normaliser une categorie importee
// ------------------------------------------------------------
// Les partenaires n'envoient pas toujours la meme categorie:
// " Consultation ", "pharmacie", "DENTIST", ou parfois rien du tout.
// Alan veut ramener ces libelles a 4 valeurs stables.
//
// normalizeClaimCategory(" Consultation ")
// => "consultation"
//
// normalizeClaimCategory("pharmacie")
// => "pharmacy"
//
// normalizeClaimCategory(undefined)
// => "other"
//
// ------------------------------------------------------------
export function normalizeClaimCategory(
  rawCategory: string | null | undefined,
): ClaimCategory {
  const categories : ClaimCategory[] = ["consultation", "pharmacy", "dental"];
  const parsedInput = rawCategory?.trim().toLowerCase();
  if (!parsedInput)
    return "other";

  const res = categories.find(c => c.includes(parsedInput.slice(0, 4)));
  if (!res)
    return "other";
  return res
}

// ------------------------------------------------------------
// 3. Compter les flags des claims encore ouverts
// ------------------------------------------------------------
// Les claims "to_review" portent parfois plusieurs flags dans rawFlags,
// separes par des virgules: "manual review, missing rib".
// Le lead ops veut savoir quels problemes reviennent le plus souvent
// dans la file du matin, sans tenir compte des claims deja approved
// ou rejected.
//
// topOpenFlags(sampleSubmissions, 3)
// => [
//   { flag: "duplicate", count: 2 },
//   { flag: "manual review", count: 2 },
//   { flag: "missing rib", count: 2 },
// ]
//
// topOpenFlags([], 3)
// => []
//
// ------------------------------------------------------------
export function topOpenFlags(
  submissions: ClaimSubmission[],
  limit = 3,
): FlagCount[] {
  const dict : Record<string, FlagCount> = {};

  for (const submission of submissions) {
    if (!submission.rawFlags || submission.status !== "to_review" ) continue;
  
    for (const part of submission.rawFlags.split(",")) {
      const flag = part.trim().toLowerCase();
      if (!flag) continue;

      dict[flag] = (dict[flag] ?? 0) + 1;
    }
  }

  const result : FlagCount[] = [];

  for (const flag in dict) {
    result.push({flag, counts: dict[flag]});
  }

  return result
  .sort((a, b) => b.count - a.count || a.flag.localeCompare(b.flag))
  .slice(0, limit);
}

// ------------------------------------------------------------
// 4. Construire le resume de file par membre
// ------------------------------------------------------------
// Avant le stand-up, la team veut une ligne par membre pour voir
// qui concentre le plus de travail dans la file. On ne garde que
// les claims "to_review". Pour chaque membre, il faut:
// - additionner les montants
// - compter les claims
// - lister les categories normalisees, sans doublons, triees par ordre alpha
// - garder le premier prenom d'assignee non vide rencontre, sinon "Unassigned"
// - utiliser "Unknown member" si memberName manque
//
// buildMemberQueueSummaries(sampleSubmissions)
// => [
//   {
//     memberId: "M-001",
//     memberName: "Alice Martin",
//     claimCount: 2,
//     totalAmountEur: 123,
//     categories: ["consultation", "dental"],
//     owner: "Anna",
//   },
//   // ...
// ]
//
// ------------------------------------------------------------
export function buildMemberQueueSummaries(
  submissions: ClaimSubmission[],
): MemberQueueSummary[] {
  // TODO: groupe les claims ouverts par memberId puis retourne
  // les resumes tries par totalAmountEur desc, puis memberName asc.
  throw new Error('not implemented');
}

// ============================================================
// TESTS MANUELS - decommenter pour tester dans le terminal
// npx tsx drill.ts
// ============================================================

const sampleSubmissions: ClaimSubmission[] = [
  {
    submissionId: "CL-100",
    memberId: "M-001",
    memberName: "Alice Martin",
    status: "to_review",
    amountCents: 4500,
    rawCategory: " Consultation ",
    rawFlags: "Manual review, Missing RIB",
    assignee: { id: "OPS-1", firstName: "Anna" },
  },
  {
    submissionId: "CL-101",
    memberId: "M-002",
    memberName: "Bob Chen",
    status: "approved",
    amountCents: 1200,
    rawCategory: "pharmacy",
    rawFlags: "duplicate",
    assignee: null,
  },
  {
    submissionId: "CL-102",
    memberId: "M-001",
    memberName: "Alice Martin",
    status: "to_review",
    amountCents: 7800,
    rawCategory: "DENTIST",
    rawFlags: "missing rib, specialist quote",
    assignee: { id: "OPS-1", firstName: "Anna" },
  },
  {
    submissionId: "CL-103",
    memberId: "M-003",
    memberName: null,
    status: "to_review",
    amountCents: 2300,
    rawCategory: null,
    rawFlags: null,
    assignee: null,
  },
  {
    submissionId: "CL-104",
    memberId: "M-004",
    memberName: "David Noa",
    status: "rejected",
    amountCents: 9900,
    rawCategory: "dentist",
    rawFlags: "manual review",
    assignee: { id: "OPS-3", firstName: "Leo" },
  },
  {
    submissionId: "CL-105",
    memberId: "M-002",
    memberName: "Bob Chen",
    status: "to_review",
    amountCents: 3100,
    rawCategory: "pharmacie",
    rawFlags: "duplicate, manual review",
    assignee: { id: "OPS-3", firstName: "Leo" },
  },
  {
    submissionId: "CL-106",
    memberId: "M-002",
    memberName: undefined,
    status: "to_review",
    amountCents: 2500,
    rawCategory: " Pharmacy ",
    rawFlags: "duplicate",
    assignee: null,
  },
];

// 1. findSubmissionById
// console.log(findSubmissionById(sampleSubmissions, "CL-103"));
// => { submissionId: "CL-103", memberId: "M-003", ... }
// console.log(findSubmissionById(sampleSubmissions, "CL-999"));
// => undefined

// // 2. normalizeClaimCategory
// console.log(normalizeClaimCategory(" Consultation "));
// // => "consultation"
// console.log(normalizeClaimCategory("pharmacie"));
// // => "pharmacy"
// console.log(normalizeClaimCategory(undefined));
// // => "other"
//
// 3. topOpenFlags
console.log(topOpenFlags(sampleSubmissions, 3));
// => [
//   { flag: "duplicate", count: 2 },
//   { flag: "manual review", count: 2 },
//   { flag: "missing rib", count: 2 },
// ]
//
// // 4. buildMemberQueueSummaries
// console.log(buildMemberQueueSummaries(sampleSubmissions));
// // => Alice Martin (123 EUR), Bob Chen (56 EUR), Unknown member (23 EUR)
