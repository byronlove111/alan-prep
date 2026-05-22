import { RawEligibilityLine } from "./types";

export const REFERENCE_DATE = "2026-05-21";

export const rawEligibilityLines: RawEligibilityLine[] = [
  {
    lineId: "l-001",
    memberId: "m-001",
    memberName: "Alice Martin",
    source: "hris",
    country: "FR",
    planCode: "fr_core",
    status: "eligible",
    effectiveFrom: "2026-01-01",
    effectiveTo: null,
    reportedAt: "2026-05-19"
  },
  {
    lineId: "l-002",
    memberId: "m-001",
    memberName: "Alice Martin",
    source: "payroll",
    country: "FR",
    planCode: "FR-CORE",
    status: "eligible",
    effectiveFrom: "2026-01-01",
    effectiveTo: null,
    reportedAt: "2026-05-20"
  },
  {
    lineId: "l-003",
    memberId: "m-002",
    memberName: "Boris Leroy",
    source: "hris",
    country: "FR",
    planCode: "fr_core",
    status: "eligible",
    effectiveFrom: "2026-02-01",
    effectiveTo: null,
    reportedAt: "2026-05-18"
  },
  {
    lineId: "l-004",
    memberId: "m-002",
    memberName: "Boris Leroy",
    source: "manual_review",
    country: "FR",
    planCode: "fr-core",
    status: "suspended",
    effectiveFrom: "2026-05-20",
    effectiveTo: null,
    reportedAt: "2026-05-20"
  },
  {
    lineId: "l-005",
    memberId: "m-003",
    memberName: "Chloe Bernard",
    source: "payroll",
    country: "BE",
    planCode: "be_plus",
    status: "pending_documents",
    effectiveFrom: "2026-05-01",
    effectiveTo: null,
    reportedAt: "2026-05-19"
  },
  {
    lineId: "l-006",
    memberId: "m-003",
    memberName: "Chloe Bernard",
    source: "hris",
    country: "BE",
    planCode: "BE-PLUS",
    status: "pending_documents",
    effectiveFrom: "2026-05-01",
    effectiveTo: null,
    reportedAt: "2026-05-20"
  },
  {
    lineId: "l-007",
    memberId: "m-004",
    memberName: "Diego Ramos",
    source: "hris",
    country: "FR",
    planCode: "fr_plus",
    status: "eligible",
    effectiveFrom: "2026-03-01",
    effectiveTo: "2026-05-21",
    reportedAt: "2026-05-18"
  },
  {
    lineId: "l-008",
    memberId: "m-004",
    memberName: "Diego Ramos",
    source: "payroll",
    country: "FR",
    planCode: "FR-PLUS",
    status: "eligible",
    effectiveFrom: "2026-03-01",
    effectiveTo: "2026-05-21",
    reportedAt: "2026-05-20"
  },
  {
    lineId: "l-009",
    memberId: "m-004",
    memberName: "Diego Ramos",
    source: "manual_review",
    country: "FR",
    planCode: "FR_PLUS",
    status: "terminated",
    effectiveFrom: "2026-05-22",
    effectiveTo: null,
    reportedAt: "2026-05-20"
  },
  {
    lineId: "l-010",
    memberId: "m-005",
    memberName: "Emma Diallo",
    source: "hris",
    country: "FR",
    planCode: "fr_core",
    status: "eligible",
    effectiveFrom: "2026-05-21",
    effectiveTo: "2026-05-21",
    reportedAt: "2026-05-21"
  },
  {
    lineId: "l-011",
    memberId: "m-005",
    memberName: "Emma Diallo",
    source: "payroll",
    country: "FR",
    planCode: "FR CORE",
    status: "eligible",
    effectiveFrom: "2026-05-21",
    effectiveTo: "2026-05-21",
    reportedAt: "2026-05-21"
  },
  {
    lineId: "l-012",
    memberId: "m-006",
    memberName: "Farah Benali",
    source: "payroll",
    country: "FR",
    planCode: "fr_core",
    status: "eligible",
    effectiveFrom: "2026-01-01",
    effectiveTo: "2026-05-20",
    reportedAt: "2026-05-20"
  }
];
