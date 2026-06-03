import { calculateReimbursement } from "./logic";

describe("calculateReimbursement", () => {
  // --- cas existants (doivent continuer à passer) ---

  it("consultation : rembourse 70%", () => {
    const result = calculateReimbursement({ id: 1, amount: 100, category: "consultation" });
    expect(result.reimbursedAmount).toBe(70);
    expect(result.rate).toBe(0.70);
  });

  it("specialist : rembourse 80%", () => {
    const result = calculateReimbursement({ id: 2, amount: 100, category: "specialist" });
    expect(result.reimbursedAmount).toBe(80);
    expect(result.rate).toBe(0.80);
  });

  // --- nouveaux cas à faire passer ---

  it("teleconsultation : rembourse 100%", () => {
    // @ts-ignore — à corriger en étendant ClaimCategory dans types.ts
    const result = calculateReimbursement({ id: 3, amount: 50, category: "teleconsultation" });
    expect(result.reimbursedAmount).toBe(50);
    expect(result.rate).toBe(1.0);
  });

  it("le remboursement est plafonné à 150€ même si le calcul dépasse", () => {
    const result = calculateReimbursement({ id: 4, amount: 300, category: "specialist" });
    expect(result.reimbursedAmount).toBe(150);
  });
});
