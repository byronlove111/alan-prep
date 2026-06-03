# Brief — Consultation Assignment

## Contexte

Alan route automatiquement les demandes de consultation vers les médecins partenaires disponibles. Pour une liste de demandes entrantes, on veut assigner chaque demande au médecin de la bonne spécialité qui a le plus de créneaux libres.

## Ce que tu dois implémenter

`assignConsultations(requests, doctors)` dans `src/logic.ts`.

## Règles

- Pour chaque demande, trouve les médecins qui ont la bonne spécialité
- Parmi eux, choisis celui qui a le plus de `availableSlots`
- Si personne n'est disponible → `status: "unassigned"`, `assignedDoctorId: null`, `assignedDoctorName: null`
- Les slots diminuent au fil des assignations — la même liste de médecins est partagée entre toutes les demandes
- Les demandes sont traitées dans l'ordre du tableau

## Les 6 tests

| # | Scénario |
|---|---|
| 1 | Aucune demande → `[]` |
| 2 | Spécialité sans médecin → `unassigned` |
| 3 | Une demande, un médecin → assigné |
| 4 | Deux médecins → choisi celui avec le plus de slots |
| 5 | Médecin plein → demande suivante va chez l'autre, troisième non assignée |
| 6 | Priorité dans l'ordre : premier arrivé, premier servi |

## Contraintes

- Pas de regex
- Boucles `for`, pas de `reduce`
- Ne pas modifier `types.ts` et `logic.test.ts`
