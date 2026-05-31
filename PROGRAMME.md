# Programme Alan

## Routine (entretien J-1 / jour J)

Ordre du jour — **priorité SQL + format réel** :

1. **`/learn-sql-basics`** — 30-45 min — **10 exos progressifs** dans `drill.sql`, `npm test` après chaque exo
2. **`/learn-implement-analyzer`** — 45-90 min (model SQLite + business logic TS + tests)
3. **`/alan-ts-drill`** — 15 min si encore de l'énergie (nombres, %, floats)

Option variante : `/learn-existing-code-algo` si tu veux lire du code existant avec bug SQL ou TS.

---

## Format entretien (nouvelles infos)

Le test technique ressemble à :

```
src/
  model.ts           ← requêtes SQLite (SELECT, JOIN)
  businessLogic.ts   ← règles métier TypeScript
  businessLogic.test.ts
db/
  schema.sql
  seed.sql
```

Stack : **TypeScript + Jest + SQLite** (`better-sqlite3`).

---

## Intention

- muscler **JOIN + ORDER BY** en SQL (drills courts)
- enchaîner sur un **bloc entretien complet** model + business logic
- garder les réflexes TS (pourcentages, arrondi, boucles) via drills si besoin

---

## Skills

| Skill | Rôle |
|-------|------|
| `/learn-sql-basics` | **10 exos SQL progressifs** dans un seul `drill.sql` (SELECT → JOIN) |
| `/learn-implement-analyzer` | Simulation entretien complète (model + TS + db) |
| `/learn-existing-code-algo` | Petite codebase existante, bug à corriger (TS ou SQL) |
| `/alan-ts-drill` | Réflexes TS courts |

---

## Aujourd'hui — prep intensive

1. `/learn-sql-basics` → premier drill JOIN
2. `/learn-implement-analyzer` → exercice model + business logic
3. Rejouer l'**IMC analyzer** ou le **remboursement** si temps restant

Dis **`/learn-sql-basics`** ou **`/learn-implement-analyzer`** pour lancer.
