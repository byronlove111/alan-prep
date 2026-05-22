import { ClaimInput, MemberPlan } from "./types";

export const bluePlan: MemberPlan = {
  planId: "alan_blue_v2",
  label: "Alan Blue v2",
  rules: [
    {
      id: "optical-generic",
      label: "Optical care",
      actPattern: "OPTICAL/*",
      beneficiary: "any",
      coveragePercent: 50,
      yearlyLimitCents: 20_000,
      requiresPrescription: false
    },
    {
      id: "optical-progressive-member",
      label: "Progressive lenses for members",
      actPattern: "OPTICAL/LENS/PROGRESSIVE",
      beneficiary: "member",
      coveragePercent: 70,
      yearlyLimitCents: 30_000,
      requiresPrescription: true
    },
    {
      id: "dental-cleaning",
      label: "Dental cleaning",
      actPattern: "DENTAL/CLEANING",
      beneficiary: "any",
      coveragePercent: 60,
      yearlyLimitCents: 8_000,
      requiresPrescription: false
    },
    {
      id: "consultation-general",
      label: "General consultation",
      actPattern: "CONSULTATION/GENERAL",
      beneficiary: "any",
      coveragePercent: 70,
      yearlyLimitCents: 5_000,
      requiresPrescription: false
    }
  ]
};

export const sampleClaims: Record<string, ClaimInput> = {
  dentalCleaning: {
    memberId: "mem-100",
    beneficiary: "member",
    actCode: "dental-cleaning",
    amountCents: 7_000,
    alreadyReimbursedThisYearCents: 0
  },
  genericOpticalForChild: {
    memberId: "mem-101",
    beneficiary: "child",
    actCode: "optical-frame",
    amountCents: 12_000,
    alreadyReimbursedThisYearCents: 0
  },
  unknownCare: {
    memberId: "mem-102",
    beneficiary: "member",
    actCode: "wellness-coaching",
    amountCents: 5_000,
    alreadyReimbursedThisYearCents: 0
  },
  progressiveLensesMember: {
    memberId: "mem-103",
    beneficiary: "member",
    actCode: "optical-lens-progressive",
    amountCents: 20_000,
    alreadyReimbursedThisYearCents: 0
  },
  progressiveLensesNearLimit: {
    memberId: "mem-104",
    beneficiary: "member",
    actCode: "OPTICAL/LENS/PROGRESSIVE",
    amountCents: 50_000,
    alreadyReimbursedThisYearCents: 18_000
  }
};
