# Debug — Optical Coverage Selection

## Contexte
Une petite codebase TypeScript calcule un devis de remboursement Alan pour quelques actes de soin courants a partir d'un plan membre et d'un code acte. Ce calcul est utilise pour expliquer rapidement aux ops et aux members quelle regle de couverture s'applique et combien Alan peut rembourser.

## Symptome observe
La plupart des devis sont coherents. Mais certains devis optiques sur des verres progressifs utilisent une couverture trop generique, ce qui sous-estime le remboursement et applique parfois un mauvais plafond annuel.

## Ce que tu dois faire
- Lire l'existant avant de modifier le code
- Reproduire le symptome a partir des tests
- Identifier precisement le bug metier
- Corriger la cause avec le plus petit changement coherent
- Ajouter au moins 1 test de regression
- Faire ensuite une petite extension metier

## Acceptance criteria
- [ ] All provided failing tests pass
- [ ] Existing green tests still pass
- [ ] Exactly one business bug was fixed
- [ ] You added at least 1 useful regression test
- [ ] A small business extension was added after the fix
- [ ] The final behavior stays coherent with the intended business rules

## Petite extension metier
Apres le fix, expose un champ derive `requiresPrescription` dans le resultat du devis.

Regle:
- `true` si la regle de couverture retenue exige une ordonnance
- `false` si une regle est retenue mais n'exige pas d'ordonnance
- `null` si aucun remboursement ne s'applique

## Hints (read only if stuck for >15 min)
<details>
<summary>Hint 1</summary>
Relis lentement `src/utils.ts`, puis compare les tests verts et rouges. Le bug est dans la maniere dont plusieurs regles candidates sont departagees.
</details>

<details>
<summary>Hint 2</summary>
La normalisation du code acte est deja correcte. Le probleme vient de la priorisation metier entre une regle large et une regle plus specifique.
</details>

## Contraintes
- TypeScript strict mode
- No large refactor unless the bug truly requires it
- Fix the cause, not only the symptom in one test
- Keep the extension small and business-focused
- Tests use Jest by default
