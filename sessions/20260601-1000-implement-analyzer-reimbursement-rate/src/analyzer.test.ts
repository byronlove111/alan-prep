import { analyzeReimbursementHistory } from "./analyzer";

describe("analyzeReimbursementHistory", () => {
  it("retourne un tableau vide pour un tableau vide", () => {
    expect(analyzeReimbursementHistory([])).toEqual([]);
  });

  it("retourne changePercent null pour une seule facture", () => {
    const snapshots = [
      { date: new Date("2024-01-15"), reimbursedAmount: 60, claimedAmount: 100 },
    ];

    const result = analyzeReimbursementHistory(snapshots);

    expect(result).toHaveLength(1);
    expect(result[0].changePercent).toBeNull();
    expect(result[0].date).toEqual(snapshots[0].date);
  });

  it("produit un changePercent positif quand le taux augmente", () => {
    const snapshots = [
      { date: new Date("2024-01-01"), reimbursedAmount: 30, claimedAmount: 100 },
      { date: new Date("2024-02-01"), reimbursedAmount: 45, claimedAmount: 100 },
    ];

    const result = analyzeReimbursementHistory(snapshots);

    expect(result[1].changePercent).not.toBeNull();
    expect(result[1].changePercent!).toBeGreaterThan(0);
  });

  it("produit un changePercent egal a 0 quand le taux est identique", () => {
    const snapshots = [
      { date: new Date("2024-01-01"), reimbursedAmount: 60, claimedAmount: 100 },
      { date: new Date("2024-02-01"), reimbursedAmount: 120, claimedAmount: 200 },
    ];

    const result = analyzeReimbursementHistory(snapshots);

    expect(result[1].changePercent).toBe(0);
  });

  it("categorise un taux de 50.0 en Moyen et non Faible", () => {
    const snapshots = [
      { date: new Date("2024-01-01"), reimbursedAmount: 50, claimedAmount: 100 },
    ];

    const result = analyzeReimbursementHistory(snapshots);

    expect(result[0].reimbursementRate).toBe(50);
    expect(result[0].level).toBe("Moyen");
  });

  it("categorise un taux de 80.0 en Eleve et non Moyen", () => {
    const snapshots = [
      { date: new Date("2024-01-01"), reimbursedAmount: 80, claimedAmount: 100 },
    ];

    const result = analyzeReimbursementHistory(snapshots);

    expect(result[0].reimbursementRate).toBe(80);
    expect(result[0].level).toBe("Élevé");
  });

  it("calcule chaque changePercent par rapport a la facture precedente", () => {
    const snapshots = [
      { date: new Date("2024-01-01"), reimbursedAmount: 40, claimedAmount: 100 },
      { date: new Date("2024-02-01"), reimbursedAmount: 50, claimedAmount: 100 },
      { date: new Date("2024-03-01"), reimbursedAmount: 80, claimedAmount: 100 },
    ];

    const result = analyzeReimbursementHistory(snapshots);

    expect(result[0].changePercent).toBeNull();
    expect(result[1].changePercent).toBe(25);
    expect(result[2].changePercent).toBe(60);
  });
});
