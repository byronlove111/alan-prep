# Programme Alan

## Reset

Tu lisais trop d'existant et tu ne t'entraînais pas assez sur la mécanique TypeScript elle-même.

Le programme est donc réduit à **2 skills par jour, pas plus** :

1. `/learn-ts-drill`
2. `/learn-existing-code-algo`

Le but est simple :
- devenir très fluide en TypeScript sur les manipulations qui bloquent vite en entretien
- garder un seul bloc de lecture d'existant pour rester proche du format Alan

On enlève tout le reste.

---

## Routine quotidienne

### Bloc 1 — TS fluency drill (~20-30 min)

Skill : `/learn-ts-drill`

Objectif :
- construire des réflexes solides sur `map`, `filter`, `reduce`, `find`, `sort`, `Object.entries`, `Record`, lookups, regroupements, comptages, parsing, normalisation
- devenir fiable sur les cas qui coincent souvent en live coding : tableaux, dictionnaires, chaînes, `null`/`undefined`, petits calculs et transformations
- travailler un raisonnement simple type "LeetCode easy utile" mais toujours ancré dans un contexte métier Alan

Règle :
- exercice court, très ciblé, beaucoup de répétition
- scaffolding minimal, tu écris la logique
- solution pragmatique et lisible avant toute envie d'optimisation

### Bloc 2 — Existing code / algo pragmatique (~25-35 min)

Skill : `/learn-existing-code-algo`

Objectif :
- garder un entraînement quotidien à la lecture rapide d'une petite codebase existante
- apprendre à identifier vite ce qui est déjà géré, puis corriger ou compléter une logique simple
- transférer la fluidité TypeScript du bloc 1 dans un format plus proche du live coding Alan

Règle :
- pas de backend complet
- pas de controller, repository, DB, HTTP
- d'abord comprendre l'existant, ensuite faire le plus petit fix cohérent

---

## Pourquoi cette version

Cette routine assume un choix clair :
- **priorité 1** : ne plus te faire bloquer par le langage
- **priorité 2** : garder un seul bloc "existing code" pour rester connecté au format d'entretien

Le programme ne cherche plus à couvrir toutes les couches backend. Il cherche à maximiser :
- la vitesse sur les transformations TypeScript
- la qualité du raisonnement simple
- la capacité à lire un petit existant sans te disperser

---

## Ordre conseillé

Tous les jours :

1. `/learn-ts-drill`
2. `/learn-existing-code-algo`

Logique :
- tu commences par de la répétition pure sur le langage
- tu enchaînes avec un exercice où cette fluidité doit survivre au contact d'un petit existant

Si tu as peu de temps, **réduis la durée mais garde les 2 blocs**.  
Ordre à conserver : TypeScript d'abord, existing code ensuite.

---

## Rythme hebdo simple

5 jours par semaine, même structure.

- **Lundi à jeudi** : routine normale
- **Vendredi** : routine plus courte si besoin, mais mêmes 2 skills

Variation autorisée :
- change le sous-thème métier de la journée (`claims`, `documents`, `reimbursements`, `members`, `contracts`)
- garde la même structure technique

---

## Signaux de progression

Tu progresses quand :

- tu sais transformer une collection sans hésiter sur l'outil à utiliser
- tu manipules facilement `Record`, regroupements, comptages et lookups
- tu es plus propre sur parsing, normalisation, tri, déduplication et petites validations
- tu te bloques moins sur `?.`, `??`, chaînes, nombres, dates simples
- en existing code, tu comprends plus vite ce qui est déjà géré avant de modifier le code
- tu résous plus souvent le problème avec un fix simple du premier coup
