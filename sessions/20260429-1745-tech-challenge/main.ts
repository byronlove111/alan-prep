import { parsePrescription } from "./prescription-parser";

const sample = `ORDONNANCE
Patient : Moreau Claire
Medecin : Pr. Leclerc Antoine
Date : 15/03/2026
---
C 23|Consultation généraliste|25.00
SPE 7|Consultation spécialiste|80.00`;

console.log(JSON.stringify(parsePrescription(sample), null, 2));
