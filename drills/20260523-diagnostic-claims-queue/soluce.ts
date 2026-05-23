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

function normalizeText(value: string | null | undefined): string {
  return value?.trim().toLowerCase() ?? "";
}

function parseFlags(rawFlags: string | null | undefined): string[] {
  return normalizeText(rawFlags)
    .split(",")
    .map((flag) => flag.trim())
    .filter((flag) => flag.length > 0);
}

function getDisplayMemberName(memberName: string | null | undefined): string {
  const trimmedName = memberName?.trim();
  return trimmedName ? trimmedName : "Unknown member";
}

function getAssigneeFirstName(
  assignee: ClaimSubmission["assignee"],
): string | undefined {
  const trimmedFirstName = assignee?.firstName?.trim();
  return trimmedFirstName ? trimmedFirstName : undefined;
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
  const category = normalizeText(rawCategory);

  switch (category) {
    case "consultation":
      return "consultation";
    case "pharmacy":
    case "pharmacie":
      return "pharmacy";
    case "dental":
    case "dentist":
      return "dental";
    default:
      return "other";
  }
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
  if (limit <= 0) {
    return [];
  }

  const counts = submissions.reduce<Map<string, number>>((accumulator, submission) => {
    if (submission.status !== "to_review") {
      return accumulator;
    }

    for (const flag of parseFlags(submission.rawFlags)) {
      accumulator.set(flag, (accumulator.get(flag) ?? 0) + 1);
    }

    return accumulator;
  }, new Map<string, number>());

  return Array.from(counts.entries())
    .map(([flag, count]) => ({ flag, count }))
    .sort((left, right) => right.count - left.count || left.flag.localeCompare(right.flag))
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
  const groupedByMember = submissions.reduce<
    Map<
      string,
      {
        memberId: string;
        memberName: string;
        claimCount: number;
        totalAmountCents: number;
        categories: Set<ClaimCategory>;
        owner: string;
      }
    >
  >((accumulator, submission) => {
    if (submission.status !== "to_review") {
      return accumulator;
    }

    const existingEntry = accumulator.get(submission.memberId);

    if (existingEntry) {
      existingEntry.claimCount += 1;
      existingEntry.totalAmountCents += submission.amountCents;
      existingEntry.categories.add(normalizeClaimCategory(submission.rawCategory));

      if (existingEntry.memberName === "Unknown member") {
        existingEntry.memberName = getDisplayMemberName(submission.memberName);
      }

      const assigneeFirstName = getAssigneeFirstName(submission.assignee);
      if (existingEntry.owner === "Unassigned" && assigneeFirstName) {
        existingEntry.owner = assigneeFirstName;
      }

      return accumulator;
    }

    accumulator.set(submission.memberId, {
      memberId: submission.memberId,
      memberName: getDisplayMemberName(submission.memberName),
      claimCount: 1,
      totalAmountCents: submission.amountCents,
      categories: new Set([normalizeClaimCategory(submission.rawCategory)]),
      owner: getAssigneeFirstName(submission.assignee) ?? "Unassigned",
    });

    return accumulator;
  }, new Map());

  return Array.from(groupedByMember.values())
    .map(({ totalAmountCents, categories, ...summary }) => ({
      ...summary,
      totalAmountEur: totalAmountCents / 100,
      categories: Array.from(categories).sort((left, right) => left.localeCompare(right)),
    }))
    .sort(
      (left, right) =>
        right.totalAmountEur - left.totalAmountEur ||
        left.memberName.localeCompare(right.memberName),
    );
}

// ============================================================
// TESTS MANUELS - decommenter pour tester dans le terminal
// npx tsx soluce.ts
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

// 2. normalizeClaimCategory
// console.log(normalizeClaimCategory(" Consultation "));
// => "consultation"
// console.log(normalizeClaimCategory("pharmacie"));
// => "pharmacy"
// console.log(normalizeClaimCategory(undefined));
// => "other"

// 3. topOpenFlags
// console.log(topOpenFlags(sampleSubmissions, 3));
// => [
//   { flag: "duplicate", count: 2 },
//   { flag: "manual review", count: 2 },
//   { flag: "missing rib", count: 2 },
// ]

// 4. buildMemberQueueSummaries
// console.log(buildMemberQueueSummaries(sampleSubmissions));
// => Alice Martin (123 EUR), Bob Chen (56 EUR), Unknown member (23 EUR)
