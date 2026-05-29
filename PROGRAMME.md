# Programme Alan

## Routine

Routine quotidienne :

1. Matin : `/alan-ts-drill`
2. Ensuite : `/learn-implement-analyzer` ou `/learn-existing-code-algo`

Priorité si l'entretien approche : **`/learn-implement-analyzer`** — c'est le format le plus proche du test technique réel (une fonction à implémenter, types + tests fournis).

---

## Intention

Le but est simple :

- devenir vraiment fluide en TypeScript sur les manipulations qui bloquent vite en entretien
- s'entraîner sur le format réel d'interview (analyzer + historique patient)
- garder `/learn-existing-code-algo` pour la lecture d'existant quand tu veux varier

La logique :

- d'abord un drill court pour muscler les réflexes TS
- puis un exercice style interview Doctolib/Alan : implémenter `analyzeXxx` avec 7 tests imposés

---

## Cadre

Chaque jour, même ordre :

1. `/alan-ts-drill`
2. `/learn-implement-analyzer` (prioritaire) ou `/learn-existing-code-algo`

Si tu as peu de temps, tu raccourcis la durée, mais tu gardes ces 2 blocs et cet ordre.

---

## Prochaine session — 30/05

**Matin : `/alan-ts-drill`** — thème **nombres & structures**

Notions à muscler (pièges de l'exercice IMC) :

- calculer un pourcentage : `((b - a) / a) * 100`
- arrondir à N décimales : `Math.round(x * 100) / 100`
- float vs int — ne pas confondre avec `Math.round()` seul
- manipuler des floats (`toBeCloseTo`, comparaisons)
- listes de dictionnaires : boucler, accéder à `array[i]` et `array[i - 1]`, construire un tableau de résultats

Lancer avec : `/alan-ts-drill` + mentionner ces notions.
