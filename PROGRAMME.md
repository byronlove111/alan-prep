# Programme backend Alan

## Principes

- **Routine fixe tous les jours** : même ordre, mêmes blocs, difficulté qui monte doucement
- **5 jours par semaine**
- **Objectif** : devenir solide sur la chaîne backend complète `SQL -> repository -> service -> controller -> business logic`, puis finir sous contrainte avec `/alan-tech-challenge`
- **Toujours parler à voix haute** pendant les blocs pratiques
- **Même thème métier sur toute la journée si possible** : claims, contracts, members, documents, reimbursements

Le but n'est pas de faire des grosses sessions "héroïques". Le but est d'empiler des répétitions courtes, ciblées, quotidiennes.

---

## Routine quotidienne

### Bloc 1 — SQL (~20 min)

Skill : `/learn-sql`

Objectif :
- devenir fluide sur les requêtes basiques
- comprendre petit à petit `GROUP BY`, `ALTER TABLE`, les locks simples et les joins simples
- manipuler une vraie mini base SQLite locale tous les jours

Règle :
- rester strictement dans le scope de la skill
- écrire les requêtes soi-même
- demander la correction exercice par exercice

---

### Bloc 2 — Repository (~20 min)

Skill : `/learn-repository`

Objectif :
- transformer un besoin simple en requêtes SQL lisibles
- mapper correctement les lignes SQL vers les types TypeScript
- être à l'aise avec les cas `not found`, filtres simples, écritures, et petites transactions

Règle :
- pas de logique métier dans le repository
- toujours regarder `schema.sql` et les tests avant de coder

---

### Bloc 3 — Service (~25 min)

Skill : `/learn-service`

Objectif :
- travailler la vraie couche de décision backend
- enchaîner validations, orchestration, règles simples, erreurs, idempotence légère
- apprendre à faire des services courts mais clairs

Règle :
- pas de HTTP
- pas de SQL
- chaque `if` doit correspondre à une règle explicable

---

### Bloc 4 — Controller (~20 min)

Skill : `/learn-controller`

Objectif :
- devenir rapide sur `req.params`, `req.query`, `req.body`
- valider les entrées
- appeler le service proprement
- renvoyer le bon status code et la bonne forme de réponse

Règle :
- garder le controller mince
- pousser toute la logique métier vers le service

---

### Bloc 5 — Business logic (~25 min)

Skill : `/learn-business-logic`

Objectif :
- devenir bon sur ce qui revient souvent en entretien backend : parsing, déduplication, agrégation, transformation, data shaping, petits calculs métier
- découper une transformation en étapes lisibles

Règle :
- pas de framework
- pas de base de données
- viser des fonctions simples, testables, lisibles

---

### Bloc 6 — Debug (~25-30 min)

Skill : `/learn-debug`

Objectif :
- apprendre à arriver sur une petite codebase existante et comprendre l'existant avant de coder
- devenir plus fiable pour reproduire un bug métier, isoler la vraie cause, puis corriger proprement
- travailler un vrai mode entretien business logic : tests rouges, lecture, hypothèse, vérification, fix minimal

Règle :
- ne pas partir en refactor large
- suivre la logique existante (`types`, `fixtures`, `utils`, `services`) avant de patcher
- ajouter au moins un test de régression après le fix

### Bloc 7 — Final Alan (~45 min)

Skill : `/alan-tech-challenge`

Objectif :
- réassembler sous contrainte de temps tout ce qui a été travaillé plus tôt dans la journée
- rester backend, concret, orienté tests, raisonnement et structure

Règle :
- traiter ce bloc comme le vrai match
- poser des questions avant de coder
- concevoir avant d'implémenter

---

## Récap rapide

| Bloc | Skill | Durée cible |
|------|-------|-------------|
| SQL | `/learn-sql` | ~20 min |
| Repository | `/learn-repository` | ~20 min |
| Service | `/learn-service` | ~25 min |
| Controller | `/learn-controller` | ~20 min |
| Business logic | `/learn-business-logic` | ~25 min |
| Debug | `/learn-debug` | ~25-30 min |
| Final | `/alan-tech-challenge` | ~45 min |

**Total : ~3h00 par jour**

Si une journée est plus courte, garde le même ordre mais coupe chaque bloc d'entraînement à 10-15 minutes. Ne supprime pas le bloc final.

---

## Comment enchaîner les skills

Ordre conseillé, tous les jours :

1. `/learn-sql`
2. `/learn-repository`
3. `/learn-service`
4. `/learn-controller`
5. `/learn-business-logic`
6. `/learn-debug`
7. `/alan-tech-challenge`

Logique pédagogique :

- `SQL` te donne la base des données et des requêtes
- `repository` te fait transformer cette base en code de persistence
- `service` te fait porter les règles métier
- `controller` te fait exposer proprement le comportement en HTTP
- `business logic` te muscle sur les transformations de données qui bloquent souvent en entretien
- `debug` te force à lire vite une codebase existante, isoler un bug métier, puis faire un fix propre
- `/alan-tech-challenge` te force à recombiner tout ça en situation réelle

---

## Progression sur plusieurs semaines

### Semaines 1-2

Objectif : **propreté minimale + répétition**

- SQL : `SELECT`, `WHERE`, `ORDER BY`, puis `GROUP BY` et écritures simples
- Repository : lectures et CRUD simples
- Service : validations directes, erreurs de base, orchestration courte
- Controller : params/body simples, `400`/`404`
- Business logic : parsing, nettoyage, déduplication simple
- Final : finir, même si ce n'est pas encore élégant

### Semaines 3-4

Objectif : **fluidité + moins d'hésitation**

- SQL : `ALTER TABLE`, locks simples, joins simples introduits progressivement
- Repository : mapping plus propre, cas nuls, une petite transaction
- Service : idempotence légère, conflits, coordination de deux repos
- Controller : query params, `409`, shaping un peu plus propre
- Business logic : agrégations et sorties structurées
- Debug : lecture rapide d'une codebase existante avec un bug métier subtil à isoler
- Final : finir plus souvent dans les temps avec une structure claire

### Semaines 5+

Objectif : **vitesse + autonomie**

- garder exactement la même routine
- garder `/learn-debug` dans la routine pour travailler le diagnostic sous contrainte
- demander moins d'indices
- écrire les tests plus vite
- expliquer à voix haute plus clairement
- viser un code correct du premier coup plus souvent

Le fond ne change pas. Seule la densité monte.

---

## Règles pratiques pour garder le programme tenable

- Une journée = **un thème métier principal** si possible
- Un bloc = **un seul objectif technique**
- Si un bloc dérape, tu notes l'erreur et tu passes au suivant
- Tu n'essaies pas de "rattraper" en allongeant la session
- Les skills servent à produire des exercices pratiques, pas des cours théoriques

---

## Signaux de progression

Tu progresses quand :

- en SQL tu écris les requêtes basiques sans chercher la syntaxe
- en repository tu lis vite le schéma et tu sais quoi coder
- en service tu sais dire quelle règle métier chaque branche applique
- en controller tu choisis le bon status code sans hésiter
- en business logic tu sais découper une transformation en 2-4 étapes claires
- en `/alan-tech-challenge` tu poses de meilleures questions avant de commencer
