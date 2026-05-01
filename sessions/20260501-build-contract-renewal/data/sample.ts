import { Contract, Member } from "../src/types";

export const sampleMembers: Member[] = [
  { id: "M-001", name: "Dupont Jean", email: "jean.dupont@corp.fr", companyId: "COMP-001" },
  { id: "M-002", name: "Martin Claire", email: "claire.martin@corp.fr", companyId: "COMP-001" },
  { id: "M-003", name: "Leroy Paul", email: "paul.leroy@startup.fr", companyId: "COMP-002" },
  { id: "M-004", name: "Bernard Sophie", email: "sophie.bernard@corp.fr", companyId: "COMP-001" },
];

// Reference date for manual testing: 2026-05-01
export const sampleContracts: Contract[] = [
  {
    id: "CTR-001",
    memberId: "M-001",
    coverageLevel: "premium",
    startDate: "2025-05-01",
    endDate: "2026-05-10",  // expires in 9 days → critical
    status: "active",
    autoRenew: true,
  },
  {
    id: "CTR-002",
    memberId: "M-002",
    coverageLevel: "standard",
    startDate: "2025-06-01",
    endDate: "2026-05-25",  // expires in 24 days → warning
    status: "active",
    autoRenew: false,
  },
  {
    id: "CTR-003",
    memberId: "M-003",
    coverageLevel: "basic",
    startDate: "2025-01-01",
    endDate: "2026-08-01",  // expires in 92 days → ok
    status: "active",
    autoRenew: true,
  },
  {
    id: "CTR-004",
    memberId: "M-004",
    coverageLevel: "standard",
    startDate: "2024-01-01",
    endDate: "2025-04-01",  // already expired → should be excluded
    status: "active",
    autoRenew: false,
  },
];
