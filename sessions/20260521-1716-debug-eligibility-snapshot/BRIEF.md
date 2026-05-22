# Debug — Eligibility Snapshot

## Contexte
Une petite codebase TypeScript reconstruit un snapshot d'éligibilité membre à partir de lignes bruitées venant de `hris`, `payroll` et `manual_review`. Ce snapshot sert à afficher un statut final cohérent pour les ops Alan quand plusieurs sources disent presque la même chose avec des formats différents.

## Symptôme observé
Pour la plupart des membres, le snapshot final est cohérent. Mais certains membres basculent trop tôt vers un statut final qui ne colle pas avec la couverture attendue sur la journée de référence.

## Ce que tu dois faire
- Lire l'existant avant de modifier le code
- Reproduire le symptôme à partir des tests
- Identifier précisément le bug métier
- Corriger la cause avec le plus petit changement cohérent
- Ajouter au moins 1 test de régression
- Faire ensuite une petite extension métier

## Acceptance criteria
- [ ] All provided failing tests pass
- [ ] Existing green tests still pass
- [ ] Exactly one business bug was fixed
- [ ] You added at least 1 useful regression test
- [ ] A small business extension was added after the fix
- [ ] The final behavior stays coherent with the intended business rules

## Petite extension métier
Après le fix, ajoute un booléen dérivé `isEndingSoon` au snapshot final.

Règle:
- `true` si le membre est encore `eligible` ou `pending_documents` et que la couverture se termine dans les 3 jours suivant la date de référence
- `false` sinon

## Hints (read only if stuck for >15 min)
<details>
<summary>Hint 1</summary>
Compare les tests rouges avec les cas verts qui passent déjà. `src/utils.ts` et `src/services/eligibilitySnapshot.ts` sont les deux meilleurs endroits à relire lentement.
</details>

<details>
<summary>Hint 2</summary>
Le bug est une règle métier de temporalité, pas un souci de types, d'import, ni de normalisation de plan.
</details>

## Contraintes
- TypeScript strict mode
- No large refactor unless the bug truly requires it
- Fix the cause, not only the symptom in one test
- Keep the extension small and business-focused
