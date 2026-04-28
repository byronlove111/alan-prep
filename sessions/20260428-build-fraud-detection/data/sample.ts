import { Claim } from "../src/types";

// M-001: normal activity
// M-002: 6 claims in March → high frequency
// M-003: duplicate SPE7 on 10/04 + amount > 200 → two reasons flagged
export const sampleClaims: Claim[] = [
  { id: "CLM-001", memberId: "M-001", actCode: "C23",  date: "01/03/2026", amount: 25.00 },
  { id: "CLM-002", memberId: "M-001", actCode: "SPE7", date: "15/03/2026", amount: 80.00 },
  { id: "CLM-003", memberId: "M-002", actCode: "C23",  date: "01/03/2026", amount: 25.00 },
  { id: "CLM-004", memberId: "M-002", actCode: "SPE7", date: "05/03/2026", amount: 80.00 },
  { id: "CLM-005", memberId: "M-002", actCode: "MK50", date: "08/03/2026", amount: 35.00 },
  { id: "CLM-006", memberId: "M-002", actCode: "INF3", date: "12/03/2026", amount: 20.00 },
  { id: "CLM-007", memberId: "M-002", actCode: "ALD1", date: "18/03/2026", amount: 45.00 },
  { id: "CLM-008", memberId: "M-002", actCode: "C23",  date: "25/03/2026", amount: 25.00 },
  { id: "CLM-009", memberId: "M-003", actCode: "SPE7", date: "10/04/2026", amount: 250.00 },
  { id: "CLM-010", memberId: "M-003", actCode: "SPE7", date: "10/04/2026", amount: 250.00 },
];
