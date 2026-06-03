# Brief — Reimbursement Calculator

Le service `calculateReimbursement` tourne et gère déjà 3 catégories (`consultation`, `pharmacy`, `specialist`).

**Ton job : étendre le système pour 2 nouveaux cas sans tout réécrire.**

## Ce que tu dois faire

1. Ajouter `"teleconsultation"` comme catégorie valide dans `types.ts`
2. Ajouter son taux dans `logic.ts`
3. Implémenter le plafonnement à 150€ dans `logic.ts`

## Taux de remboursement

| Catégorie | Taux |
|---|---|
| consultation | 70% |
| pharmacy | 65% |
| specialist | 80% |
| **teleconsultation** | **100%** ← à ajouter |

**Plafond** : le montant remboursé ne peut jamais dépasser **150€**.

## Les 4 tests

- Tests 1-2 : déjà verts — ne pas les casser
- Tests 3-4 : à faire passer
