# Existing code — KeyFinder spell checker

## Contexte

Inspire de la technical interview Alan (KeyFinder / Peter Norvig spell checker).

Alan parse des documents d'assurance avec parfois des typos. Ce petit outil corrige les mots en generant des candidats proches et en verifiant s'ils existent dans un dictionnaire metier.

Comme dans la video :
- du code existant partiellement correct
- des tests unitaires deja ecrits
- un `main.ts` qui montre le comportement sur des textes
- un dossier `data/` avec dictionnaire + textes

## Ce qui existe deja

- `main.ts` corrige un texte mot par mot
- Le dictionnaire vient de `data/dictionary.txt`
- Le happy path marche : un mot deja correct reste correct
- Une typo avec **lettre manquante** est deja corrigee (`assurnce` -> `assurance`)

## Ce qui pose probleme

Le starter ne gere qu'un seul type de typo : **lettre manquante**.

Il reste a couvrir, comme dans la video :
1. **lettre en trop** (ex: `shiining` -> `shining`)
2. **mauvaise lettre** (ex: `neighhorhood` -> `neighborhood`)
3. un **bug aux bords du mot** sur la generation de candidats (pense aux lettres manquantes en fin de mot)

## Ce que tu dois faire

- Lire `main.ts`, les tests, `src/keyFinder.ts`, puis resumer ce qui marche deja
- Identifier les 3 types de typos et ce que le code corrige aujourd'hui
- Etendre `KeyFinder` avec le plus petit changement coherent (approche brute force OK)
- Ajouter au moins 1 test cible utile
- Verifier que `main.ts` corrige mieux le texte complexe

## Acceptance criteria

- [ ] `main.ts` reste executable
- [ ] All provided failing tests pass
- [ ] Existing passing tests still pass
- [ ] The first fix stays pragmatic, not over-engineered
- [ ] At least 1 targeted extra test was added
- [ ] The complex text is better corrected
- [ ] You can explain out loud what typo types you handle

## Hints (read only if stuck for >10 min)

<details>
<summary>Hint 1</summary>
Compare les 3 typo types de la video : lettre manquante, lettre en trop, mauvaise lettre.
</details>

<details>
<summary>Hint 2</summary>
Pour la lettre en trop, genere des candidats en enlevant une lettre. Pour la mauvaise lettre, genere des candidats en remplacant une lettre.
</details>

<details>
<summary>Hint 3</summary>
Emma parle d'un bug "au bord du mot" sur la generation de candidats. Regarde jusqu'ou va ta boucle sur les index.
</details>

## Contraintes

- TypeScript strict mode
- Pas de backend, pas de framework
- Approche brute force OK (pas de Levenshtein obligatoire)
- Pense a voix haute comme dans la video
- Tests Jest par defaut

## Bonus (comme la video)

Si tu vas vite : essayer de corriger **deux typos** sur le meme mot.
