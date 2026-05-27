# Debrief — plan label matcher

## Résultat

- 6/6 tests passent
- `main.ts` tourne correctement
- Fix minimal et cohérent

## Ce qui est bien

- Bon réflexe existing code : comparer `planMatcher.ts` avec `utils.ts` avant de recoder
- Fix ciblé : réutiliser `normalizeLooseText` au lieu de refaire toute la logique
- Test extra utile : `"basic - plan"` protège un cas voisin crédible
- Bonne décision de ne pas partir sur l’approche `includes` mot par mot

## À améliorer

- Enlever les `console.log` de debug dans `matchPlanLabel`
- `normalizeForMatch` est maintenant un simple wrapper : acceptable ici, mais en vrai tu pourrais appeler `normalizeLooseText` directement

## Niveau entretien

Réponse senior crédible :

> “Le matcher marchait déjà pour les cas simples. Le bug venait d’une normalisation incomplète dans le matcher, alors qu’une version plus robuste existait déjà dans les utils. J’ai réutilisé cette normalisation plutôt que de redesigner le matching.”

## Prochaine fois

Avant de modifier, dire à voix haute :
1. ce qui marche déjà
2. ce qui casse
3. le plus petit fix possible
