# Existing code — care label suggester

## Contexte
This tiny internal tool helps claims and support operators map noisy care wording to a canonical Alan care label before a member request is reviewed. It already works for exact labels and a few simple formatting variations, which keeps dashboards and follow-up notes more consistent.

## Ce qui existe deja
- `main.ts` shows a few concrete inputs and the current suggestions
- Canonical care labels come from `data/care-labels.txt`
- The current logic already handles exact matches, casing differences, extra spaces, and common separators for multi-word labels
- A ranking helper already picks the best candidate once a candidate has a score

## Ce qui pose probleme
Some member wording splits one meaningful label into multiple pieces, especially around `Teleconsultation`. The current token-based scoring misses these noisy inputs even when the intended care label is obvious for an operator.

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
Compare the existing token helper with the shape of the `Teleconsultation` label and the failing examples in the target tests.
</details>
<details>
<summary>Hint 2</summary>
Focus on noisy inputs where one meaningful word becomes multiple tokens because of spaces or separators.
</details>

## Contraintes
- TypeScript strict mode
- No backend and no framework
- Prefer a simple readable fix over an impressive algorithm
- Use AI if useful, but only after a first pass on the code and cases
- Tests use Jest by default
