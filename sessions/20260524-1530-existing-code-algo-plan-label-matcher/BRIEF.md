# Existing code — plan label matcher

## Contexte

Un petit outil interne Alan aide l'equipe support a retrouver le bon libelle de plan quand un membre ou un ops tape une formulation bruite dans un ticket. Le code marche deja pour les cas simples, mais certains separateurs cassent encore le match.

## Ce qui existe deja

- `main.ts` montre quelques exemples concrets
- Les libelles canoniques viennent de `data/plan-labels.txt`
- Le matching exact fonctionne
- Les differences de casse et les espaces en trop sont deja gerees

## Ce qui pose probleme

Quand le membre ecrit un plan avec un tiret ou un underscore (`basic-plan`, `maternity_plan`), le matcher ne retrouve pas le libelle canonique (`Basic plan`, `Maternity plan`) alors que c'est evident pour un humain.

## Ce que tu dois faire

- Lire `main.ts`, les tests, les fichiers `src/`, puis resumer ce qui est deja gere
- Identifier les cas manquants ou incoherents
- Corriger la logique avec le plus petit changement coherent
- Ajouter au moins 1 test cible utile
- Etendre ensuite la feature sur 1 ou 2 cas supplementaires proches

## Acceptance criteria

- [ ] `main.ts` reste executable
- [ ] All provided failing tests pass
- [ ] Existing passing tests still pass
- [ ] The first fix is small and coherent
- [ ] At least 1 targeted extra test was added
- [ ] The feature now handles 1 or 2 nearby additional cases
- [ ] The code stays readable and pragmatic

## Hints (read only if stuck for >10 min)

<details>
<summary>Hint 1</summary>
Compare la fonction de normalisation utilisee dans `planMatcher.ts` avec celle disponible dans `utils.ts`.
</details>

<details>
<summary>Hint 2</summary>
Le probleme vient surtout des separateurs comme `-` et `_`, pas du ranking.
</details>

## Contraintes

- TypeScript strict mode
- No backend and no framework
- Prefer a simple readable fix over an impressive algorithm
- Tests use Jest by default
