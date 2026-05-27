import {
  ClaimLine,
  countOpenClaimsByMember,
  mapOpenClaimIds,
  rankMembersByOpenClaims,
  sortMemberCounts,
} from "./drill";

const sampleClaims: ClaimLine[] = [
  {
    submissionId: "CL-100",
    memberId: "M-001",
    status: "open",
    amountCents: 4500,
  },
  {
    submissionId: "CL-101",
    memberId: "M-002",
    status: "closed",
    amountCents: 1200,
  },
  {
    submissionId: "CL-102",
    memberId: "M-001",
    status: "open",
    amountCents: 7800,
  },
  {
    submissionId: "CL-103",
    memberId: "M-003",
    status: "open",
    amountCents: 2300,
  },
  {
    submissionId: "CL-104",
    memberId: "M-002",
    status: "open",
    amountCents: 3100,
  },
];

describe("mapOpenClaimIds", () => {
  test("returns only open submission ids", () => {
    expect(mapOpenClaimIds(sampleClaims)).toEqual([
      "CL-100",
      "CL-102",
      "CL-103",
      "CL-104",
    ]);
  });

  test("returns an empty array when there are no claims", () => {
    expect(mapOpenClaimIds([])).toEqual([]);
  });
});

describe("countOpenClaimsByMember", () => {
  test("counts open claims per member", () => {
    expect(countOpenClaimsByMember(sampleClaims)).toEqual({
      "M-001": 2,
      "M-002": 1,
      "M-003": 1,
    });
  });

  test("returns an empty object when there are no claims", () => {
    expect(countOpenClaimsByMember([])).toEqual({});
  });
});

describe("sortMemberCounts", () => {
  test("sorts by count desc then memberId asc", () => {
    expect(
      sortMemberCounts({
        "M-002": 1,
        "M-001": 2,
        "M-003": 2,
      }),
    ).toEqual([
      { memberId: "M-001", count: 2 },
      { memberId: "M-003", count: 2 },
      { memberId: "M-002", count: 1 },
    ]);
  });

  test("returns an empty array for an empty dictionary", () => {
    expect(sortMemberCounts({})).toEqual([]);
  });
});

describe("rankMembersByOpenClaims", () => {
  test("builds the full ranking from raw claims", () => {
    expect(rankMembersByOpenClaims(sampleClaims)).toEqual([
      { memberId: "M-001", count: 2 },
      { memberId: "M-002", count: 1 },
      { memberId: "M-003", count: 1 },
    ]);
  });

  test("applies a limit when provided", () => {
    expect(rankMembersByOpenClaims(sampleClaims, 2)).toEqual([
      { memberId: "M-001", count: 2 },
      { memberId: "M-002", count: 1 },
    ]);
  });
});
