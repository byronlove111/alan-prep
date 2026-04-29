import { test, expect } from "./test-runner";
import { parsePrescription } from "./prescription-parser";

const samplePrescription = `ORDONNANCE
Patient : Moreau Claire
Medecin : Dr. Leclerc Antoine
Date : 15/03/2026
---
C 23|Consultation généraliste|25.00
SPE 7|Consultation spécialiste|80.00`;

const samplePrescriptionWithProfessor = `ORDONNANCE
Patient : Moreau Claire
Medecin : Pr. Leclerc Antoine
Date : 15/03/2026
---
C 23|Consultation généraliste|25.00
SPE 7|Consultation spécialiste|80.00`;

test("parses patient name correctly", () => {
  const result = parsePrescription(samplePrescription);
  expect(result.patient).toBe("Moreau Claire");
});

test("parses doctor name correctly", () => {
  const result = parsePrescription(samplePrescription);
  expect(result.doctor).toBe("Leclerc Antoine");
});

test("parses professor name correctly", () => {
  const result = parsePrescription(samplePrescriptionWithProfessor);
  expect(result.doctor).toBe("Leclerc Antoine");
});

test("parses prescription date", () => {
  const result = parsePrescription(samplePrescription);
  expect(result.date).toBe("15/03/2026");
});

test("normalizes act code — removes spaces (C 23 → C23)", () => {
  const result = parsePrescription(samplePrescription);
  expect(result.acts[0].code).toBe("C23");
});

test("parses first act amount correctly", () => {
  const result = parsePrescription(samplePrescription);
  expect(result.acts[0].amount).toBe(25);
});

test("parses more than one act", () => {
  const result = parsePrescription(samplePrescription);
  expect(result.acts.length).toBe(2);
});

test("parses if acts is empty", () => {
  const emptyAct = `ORDONNANCE
  Patient : Moreau Claire
  Medecin : Dr. Leclerc Antoine
  Date : 15/03/2026
  ---`;
  const result = parsePrescription(emptyAct);
  expect(result.acts.length).toBe(0);
})
