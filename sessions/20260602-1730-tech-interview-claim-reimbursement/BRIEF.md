# Analyseur de remboursement — Test technique

**Durée :** 1h30  
**Stack :** TypeScript + Jest + SQLite (`better-sqlite3`)

## Contexte

Chez Alan, l'équipe ops suit l'évolution du **taux de remboursement** des factures de soins par membre. Les données vivent en base SQLite. Tu dois brancher la couche **model** (SQL) et la couche **business logic** (TypeScript).

## Ta mission

### 1. `src/model.ts` — corriger la requête SQL

`getClaimsByMemberId` doit retourner les claims **d'un seul membre** (`WHERE member_id = ?`), triées par `created_at ASC`.

### 2. `src/businessLogic.ts` — implémenter la logique

`analyzeMemberClaimReimbursements(db, memberId)` :

- Membre inconnu ou sans claim → `[]`
- `reimbursementRate` = `(reimbursed / claimed) * 100`, arrondi 2 décimales
- `level` : Faible < 50, Moyen 50–79.99, Élevé ≥ 80
- `changePercent` vs claim précédente, `null` pour la première

## Contraintes

- Pas de regex, pas d'ORM
- Ne modifie pas types, tests, schema, seed

```bash
npm install && npm test
```
