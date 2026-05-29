import { analyzePatientHistory } from "./analyzer";

describe("analyzePatientHistory", () => {
  it("retourne un tableau vide pour un tableau vide", () => {
    expect(analyzePatientHistory([])).toEqual([]);
  });

  it("retourne changePercent null pour une seule mesure", () => {
    const measurements = [
      { date: new Date("2024-01-15"), weight: 70, height: 170 },
    ];

    const result = analyzePatientHistory(measurements);

    expect(result).toHaveLength(1);
    expect(result[0].changePercent).toBeNull();
    expect(result[0].date).toEqual(measurements[0].date);
  });

  it("produit un changePercent positif quand l'IMC augmente", () => {
    const measurements = [
      { date: new Date("2024-01-01"), weight: 60, height: 170 },
      { date: new Date("2024-02-01"), weight: 75, height: 170 },
    ];

    const result = analyzePatientHistory(measurements);

    expect(result[1].changePercent).not.toBeNull();
    expect(result[1].changePercent!).toBeGreaterThan(0);
  });

  it("produit un changePercent negatif quand l'IMC diminue", () => {
    const measurements = [
      { date: new Date("2024-01-01"), weight: 75, height: 170 },
      { date: new Date("2024-02-01"), weight: 60, height: 170 },
    ];

    const result = analyzePatientHistory(measurements);

    expect(result[1].changePercent).not.toBeNull();
    expect(result[1].changePercent!).toBeLessThan(0);
  });

  it("produit un changePercent egal a 0 quand l'IMC est identique", () => {
    const measurements = [
      { date: new Date("2024-01-01"), weight: 70, height: 170 },
      { date: new Date("2024-02-01"), weight: 70, height: 170 },
    ];

    const result = analyzePatientHistory(measurements);

    expect(result[1].changePercent).toBe(0);
  });

  it("categorise un IMC de 24.0 en Normal", () => {
    const measurements = [
      { date: new Date("2024-01-01"), weight: 72.25, height: 180 },
    ];

    const result = analyzePatientHistory(measurements);

    expect(result[0].bmi).toBeLessThan(25);
    expect(result[0].category).toBe("Normal");
  });

  it("categorise un IMC de 25.0 en Surpoids et non Normal", () => {
    const measurements = [
      { date: new Date("2024-01-01"), weight: 72.25, height: 170 },
    ];

    const result = analyzePatientHistory(measurements);

    expect(result[0].bmi).toBe(25);
    expect(result[0].category).toBe("Surpoids");
  });

  it("categorise un IMC de 30.0 en Obese et non Surpoids", () => {
    const measurements = [
      { date: new Date("2024-01-01"), weight: 86.7, height: 170 },
    ];

    const result = analyzePatientHistory(measurements);

    expect(result[0].bmi).toBe(30);
    expect(result[0].category).toBe("Obèse");
  });

  it("calcule chaque changePercent par rapport a la mesure precedente", () => {
    const measurements = [
      { date: new Date("2024-01-01"), weight: 60, height: 170 },
      { date: new Date("2024-02-01"), weight: 72.25, height: 170 },
      { date: new Date("2024-03-01"), weight: 86.7, height: 170 },
    ];

    const result = analyzePatientHistory(measurements);

    expect(result[0].changePercent).toBeNull();
    expect(result[1].changePercent).toBeCloseTo(20.42, 1);
    expect(result[2].changePercent).toBe(20);
  });
});
