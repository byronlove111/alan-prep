# Programme backend Alan

## Principes

- **Routine fixe tous les jours** : même ordre, mêmes blocs, difficulté qui monte doucement
- **5 jours par semaine**
- **Objectif** : maximiser ce qui est le plus corrélé à l'entretien Alan du 8 juin : lire de l'existant, debugger, raisonner métier, étendre proprement, communiquer, et finir sous contrainte avec `/alan-tech-challenge`
- **Toujours parler à voix haute** pendant les blocs pratiques
- **Même thème métier sur toute la journée si possible** : claims, contracts, members, documents, reimbursements

Le but n'est pas de couvrir toute la chaîne backend de façon équilibrée. Le but est d'investir l'énergie d'abord sur les blocs les plus prédictifs pour cet entretien précis, puis de garder un petit entretien des couches secondaires.

---

## Routine quotidienne

### Bloc 1 — Debug (~25-30 min)

Skill : `/learn-debug`

Objectif :
- apprendre à arriver sur une petite codebase existante et comprendre l'existant avant de coder
- devenir plus fiable pour reproduire un bug métier, isoler la vraie cause, puis corriger proprement
- travailler le mode entretien le plus corrélé au format Alan : lecture, tests rouges, hypothèse, vérification, fix minimal

Règle :
- ne pas partir en refactor large
- suivre la logique existante (`types`, `fixtures`, `utils`, `services`) avant de patcher
- ajouter au moins un test de régression après le fix

---

### Bloc 2 — Business logic (~25 min)

Skill : `/learn-business-logic`

Objectif :
- devenir bon sur ce qui revient souvent en entretien backend : parsing, déduplication, agrégation, transformation, data shaping, petits calculs métier
- découper une transformation en étapes lisibles
- muscler le raisonnement et l'explication à voix haute

Règle :
- pas de framework
- pas de base de données
- viser des fonctions simples, testables, lisibles

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

### Bloc 4 — Final Alan (~45 min)

Skill : `/alan-tech-challenge`

Objectif :
- réassembler sous contrainte de temps ce qui compte le plus pour l'entretien : lecture d'existant, compréhension du besoin, tests, extension pragmatique, communication
- rester backend, concret, orienté raisonnement et structure
- traiter ce bloc comme la répétition la plus proche du vrai match

Règle :
- poser des questions avant de coder
- concevoir avant d'implémenter
- privilégier le fix ou l'extension la plus simple qui marche

---

### Bloc 5 — Controller léger (~10-15 min)

Skill : `/learn-controller`

Objectif :
- rester fluide sur la couche HTTP pour ne pas bloquer le jour J
- pratiquer `req.params`, `req.query`, `req.body`, validation simple, status codes et réponse JSON minimale
- garder ce bloc comme entretien léger, pas comme gros sujet de la journée

Règle :
- garder le controller mince
- pousser toute la logique métier vers le service
- couper le scope dès que l'exercice commence à grossir

---

### Bloc 6 — Repository léger (~10-15 min)

Skill : `/learn-repository`

Objectif :
- savoir lire un schéma simple, écrire 1-2 queries basiques, mapper vers des types, gérer `not found`
- garder la main sur la persistence simple sans investir trop d'énergie
- traiter ce bloc comme entretien ciblé, pas comme approfondissement SQL

Règle :
- pas de logique métier dans le repository
- toujours regarder `schema.sql` et les tests avant de coder
- rester sur du SQL très simple

---

### Bloc 7 — SQL concepts minimum (~10 min)

Skill : `/learn-sql`

Objectif :
- garder la culture minimum sur SQL pour comprendre vite un schéma et une requête simple
- entretenir les bases utiles au repository sans en faire un gros bloc de pratique
- renforcer surtout la lecture et les concepts, pas la profondeur

Règle :
- rester strictement dans le scope de la skill
- viser des exercices courts
- ne pas transformer ce bloc en session lourde

---

## Récap rapide

| Bloc | Skill | Durée cible |
|------|-------|-------------|
| Debug | `/learn-debug` | ~25-30 min |
| Business logic | `/learn-business-logic` | ~25 min |
| Service | `/learn-service` | ~25 min |
| Final Alan | `/alan-tech-challenge` | ~45 min |
| Controller léger | `/learn-controller` | ~10-15 min |
| Repository léger | `/learn-repository` | ~10-15 min |
| SQL concepts minimum | `/learn-sql` | ~10 min |

**Total : ~2h30 à ~2h45 par jour**

Si une journée est plus courte, garde absolument les 4 premiers blocs. Coupe ou allège les blocs 5-7 en priorité.

---

## Comment enchaîner les skills

Ordre conseillé, tous les jours :

1. `/learn-debug`
2. `/learn-business-logic`
3. `/learn-service`
4. `/alan-tech-challenge`
5. `/learn-controller`
6. `/learn-repository`
7. `/learn-sql`

Logique pédagogique :

- `debug` te met immédiatement dans le mode "existing code + bug + fix pragmatique" qui ressemble le plus à l'entretien
- `business logic` te muscle sur le raisonnement métier, les transformations et l'explication claire
- `service` te fait porter la couche de décision backend la plus importante pour Alan
- `/alan-tech-challenge` te fait recombiner tôt, tant que ton énergie est encore haute
- `controller` reste utile, mais seulement comme petit entretien de fluidité HTTP
- `repository` reste utile, mais sur un scope réduit : schéma simple, requêtes simples, mapping simple
- `SQL` reste en fin de journée comme culture minimum et support du repository, pas comme priorité forte

---

## Progression sur plusieurs semaines

### Semaines 1-2

Objectif : **priorités fortes d'abord + propreté minimale**

- Debug : reproduire vite, lire avant de coder, faire un fix minimal
- Business logic : parsing, nettoyage, déduplication simple
- Service : validations directes, erreurs de base, orchestration courte
- Final : finir, même si ce n'est pas encore élégant
- Controller : params/query/body simples, `400`/`404`
- Repository : `findById`, lecture simple, `not found`
- SQL : lecture de schéma, `SELECT`/`WHERE`/`ORDER BY`

### Semaines 3-4

Objectif : **fluidité sur le coeur de l'entretien**

- Debug : lecture rapide d'une codebase existante avec un bug métier subtil à isoler
- Business logic : agrégations et sorties structurées
- Service : idempotence légère, conflits, coordination simple
- Final : finir plus souvent dans les temps avec une structure claire
- Controller : query params, `409`, shaping simple et propre
- Repository : mapping plus propre, cas nuls, une écriture simple
- SQL : joins simples et lecture de requêtes, sans en faire un gros bloc

### Semaines 5+

Objectif : **vitesse + autonomie**

- garder exactement la même routine
- garder les 4 premiers blocs comme noyau non négociable
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

- en debug tu lis vite l'existant et tu isoles mieux la vraie cause d'un bug
- en business logic tu sais découper une transformation en 2-4 étapes claires
- en service tu sais dire quelle règle métier chaque branche applique
- en `/alan-tech-challenge` tu poses de meilleures questions avant de commencer
- en controller tu choisis le bon status code sans hésiter
- en repository tu lis vite le schéma et tu sais quoi coder sans surcompliquer
- en SQL tu comprends vite une requête simple et un schéma simple
