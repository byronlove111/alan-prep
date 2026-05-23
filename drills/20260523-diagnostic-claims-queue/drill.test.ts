import {
  buildMemberQueueSummaries,
  ClaimSubmission,
  findSubmissionById,
  normalizeClaimCategory,
  topOpenFlags,
} from "./drill";

const submissions: ClaimSubmission[] = [
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

describe("findSubmissionById", () => {
  test("returns the matching submission", () => {
    expect(findSubmissionById(submissions, "CL-103")).toEqual({
      submissionId: "CL-103",
      memberId: "M-003",
      memberName: null,
      status: "to_review",
      amountCents: 2300,
      rawCategory: null,
      rawFlags: null,
      assignee: null,
    });
  });

  test("returns undefined when missing", () => {
    expect(findSubmissionById(submissions, "CL-999")).toBeUndefined();
  });
});

describe("normalizeClaimCategory", () => {
  test("normalizes consultation labels", () => {
    expect(normalizeClaimCategory(" Consultation ")).toBe("consultation");
  });

  test("normalizes pharmacy and dental aliases", () => {
    expect(normalizeClaimCategory("pharmacie")).toBe("pharmacy");
    expect(normalizeClaimCategory("DENTIST")).toBe("dental");
    expect(normalizeClaimCategory(" Pharmacy ")).toBe("pharmacy");
  });

  test("falls back to other", () => {
    expect(normalizeClaimCategory("wellness")).toBe("other");
    expect(normalizeClaimCategory(undefined)).toBe("other");
    expect(normalizeClaimCategory(null)).toBe("other");
  });
});

describe("topOpenFlags", () => {
  test("counts only to_review claims", () => {
    expect(topOpenFlags(submissions, 10)).toEqual([
      { flag: "duplicate", count: 2 },
      { flag: "manual review", count: 2 },
      { flag: "missing rib", count: 2 },
      { flag: "specialist quote", count: 1 },
    ]);
  });

  test("sorts by count desc then flag asc and applies the limit", () => {
    expect(topOpenFlags(submissions, 3)).toEqual([
      { flag: "duplicate", count: 2 },
      { flag: "manual review", count: 2 },
      { flag: "missing rib", count: 2 },
    ]);
  });

  test("handles empty inputs and zero limit", () => {
    expect(topOpenFlags([], 3)).toEqual([]);
    expect(topOpenFlags(submissions, 0)).toEqual([]);
  });
});

describe("buildMemberQueueSummaries", () => {
  test("groups only open claims by member", () => {
    expect(buildMemberQueueSummaries(submissions)).toEqual([
      {
        memberId: "M-001",
        memberName: "Alice Martin",
        claimCount: 2,
        totalAmountEur: 123,
        categories: ["consultation", "dental"],
        owner: "Anna",
      },
      {
        memberId: "M-002",
        memberName: "Bob Chen",
        claimCount: 2,
        totalAmountEur: 56,
        categories: ["pharmacy"],
        owner: "Leo",
      },
      {
        memberId: "M-003",
        memberName: "Unknown member",
        claimCount: 1,
        totalAmountEur: 23,
        categories: ["other"],
        owner: "Unassigned",
      },
    ]);
  });

  test("returns an empty array when there is nothing to review", () => {
    expect(
      buildMemberQueueSummaries(
        submissions.map((submission) => ({
          ...submission,
          status: "approved",
        })),
      ),
    ).toEqual([]);
  });
});
