# Existing code — Care act matcher

## Contexte

Chez Alan, les membres et le support decrivent souvent les actes de sante avec des libelles bruyants : alias metier, tirets, underscores, espaces en trop. Ce petit outil doit retrouver le code canonique d'un acte a partir d'une saisie imparfaite.

## Ce qui existe deja

- `main.ts` lit `data/sample-inputs.txt` et affiche le code trouve
- `data/acts.json` contient les actes canoniques avec leurs alias
- `utils.ts` expose `normalizeLooseText` (deja correct)
- Le happy path marche : un libelle canonique exact est reconnu (`Consultation generale`)
- Les actes inconnus retournent `null`

## Ce qui pose probleme

Le matcher ne compare que le libelle **exact** (trim + lowercase). Il ignore :

1. Les **alias** (`consult`, `kine`, `prise de sang`)
2. Le bruit de formatage (`seance-kine`, `prise_de_sang`, espaces multiples)

## Ce que tu dois faire

- Lire `main.ts`, les tests, `src/actMatcher.ts`, puis resumer ce qui marche deja
- Identifier les cas manquants
- Corriger avec le **plus petit changement coherent** — pense a reutiliser `normalizeLooseText`
- Ajouter au moins **1 test cible** utile
- Verifier que `main.ts` resout mieux les entrees bruitees

## Acceptance criteria

- [ ] `main.ts` reste executable
- [ ] All provided failing tests pass
- [ ] Existing passing tests still pass
- [ ] The first fix is small and coherent
- [ ] At least 1 targeted extra test was added
- [ ] You can explain out loud why normalization matters here

## Hints (read only if stuck for >10 min)

<details>
<summary>Hint 1</summary>
Compare ce qui est deja correct dans `utils.ts` avec ce que fait `resolveActCode` aujourd'hui.
</details>

<details>
<summary>Hint 2</summary>
Un alias dans `acts.json` doit etre traite comme un libelle possible, pas seulement le champ `label`.
</details>

## Contraintes

- TypeScript strict mode
- Pas de backend, pas de framework
- Pas de regex
- Fix minimal avant refactor
- Tests Jest par defaut
