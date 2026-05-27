# Existing code — document type matcher

## Contexte

Avant qu'un document membre soit classe dans la file claims, l'equipe support doit retrouver le bon type de document. Un petit outil existe deja et marche pour les cas simples, mais certaines formulations bruitees passent encore a cote.

## Ce qui existe deja

- `main.ts` montre quelques exemples concrets
- Les alias canoniques viennent de `data/document-aliases.json`
- Le matching exact fonctionne deja
- Les differences de casse et les espaces en trop sont deja gerees

## Ce qui pose probleme

Quand le membre ecrit un type avec un tiret ou un underscore (`mutual-certificate`, `mutual_certificate`), le matcher ne retrouve pas le libelle canonique alors que c'est evident pour un humain.

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
Compare la normalisation dans `documentMatcher.ts` avec celle disponible dans `utils.ts`.
</details>

<details>
<summary>Hint 2</summary>
Le bug vient surtout des separateurs `-` et `_`, pas d'un probleme de ranking.
</details>

## Contraintes

- TypeScript strict mode
- No backend and no framework
- Prefer a simple readable fix over an impressive algorithm
- Tests use Jest by default
