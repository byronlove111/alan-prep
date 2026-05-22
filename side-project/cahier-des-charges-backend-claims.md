# Cahier des charges - Side project backend "Claims & Reimbursements"

## 1. Contexte

Ce projet a pour but de simuler un petit backend inspiré du contexte metier d'un acteur comme Alan, sans chercher a reconstruire un assureur complet.

L'objectif principal est pedagogique et de preparation entretien backend :

- pratiquer la conception d'une API metier de bout en bout ;
- manipuler une architecture simple et propre de type `controller / service / repository` ;
- modeliser des regles de remboursement realistes mais limitees ;
- travailler avec une base PostgreSQL, des migrations, des tests et une logique metier explicable ;
- etre capable de parler du projet comme d'un vrai produit backend, avec des choix assumes, des compromis, des limites et des pistes d'evolution.

Le projet doit rester volontairement petit, livrable en quelques soirees ou en un week-end, mais suffisamment riche pour servir de support de discussion en entretien.

## 2. Vision produit

Construire une API qui permet de gerer un mini flux de remboursement sante :

1. un administrateur definit des plans de couverture ;
2. un administrateur rattache des membres a ces plans ;
3. un membre soumet une demande de remboursement (`claim`) ;
4. le systeme evalue la demande selon les regles du plan ;
5. la demande est acceptee, rejetee, ou envoyee en revue manuelle ;
6. le systeme conserve une trace lisible de la decision.

L'idee cle du projet est la suivante : **la valeur du backend ne vient pas du CRUD, mais de la decision metier et de sa transparence**.

## 3. Problematique metier

Dans un produit d'assurance sante moderne, un membre veut savoir rapidement :

- si sa demande est recevable ;
- combien il sera rembourse ;
- pourquoi sa demande est refusee ou partiellement acceptee ;
- si une action supplementaire est necessaire.

Le backend doit donc permettre :

- de stocker des contrats simples ;
- de calculer un remboursement a partir de regles explicites ;
- de produire une decision comprehensible ;
- de garder un historique consultable.

## 4. Personae

### 4.1 Administrateur interne

Personne qui configure les plans et leurs regles.

Besoins :

- creer un plan ;
- ajouter des regles de couverture ;
- creer des membres relies a un plan ;
- comprendre pourquoi une `claim` a produit telle decision.

### 4.2 Membre

Personne couverte par un plan et qui demande un remboursement.

Besoins :

- soumettre une demande simplement ;
- connaitre le statut de la demande ;
- obtenir une explication claire de la decision.

## 5. Objectifs du projet

### 5.1 Objectifs techniques

- exposer une API REST coherente ;
- utiliser PostgreSQL avec migrations versionnees ;
- structurer le code en couches claires ;
- valider les entrees et retourner des erreurs metier lisibles ;
- couvrir la logique principale avec des tests solides ;
- documenter les hypotheses et les limites.

### 5.2 Objectifs d'apprentissage

- raisonner sur des regles metier et pas seulement sur des schemas de donnees ;
- traiter des cas limites ;
- pratiquer la modelisation relationnelle ;
- justifier un design simple plutot qu'une architecture complexe ;
- montrer une sensibilite produit et user-centric dans un projet backend.

## 6. Hors scope explicite

Pour garder le projet realiste mais faisable, les sujets suivants sont exclus du MVP :

- authentification et autorisation complexes ;
- upload et stockage de vrais documents ;
- OCR ;
- workflows asynchrones avec queues ;
- microservices ;
- interface frontend ;
- paiement reel ;
- integration avec des API externes ;
- internationalisation ;
- gestion fine de la securite des donnees de sante ;
- edition complexe des regles avec DSL ou moteur de regles generique.

## 7. Scope fonctionnel

## 7.1 MVP

Le MVP doit couvrir les fonctionnalites suivantes :

### Gestion des plans

- creer un plan ;
- lister les plans ;
- consulter un plan ;
- ajouter des regles de couverture a un plan.

### Gestion des membres

- creer un membre ;
- lister les membres ;
- consulter un membre.

### Gestion des claims

- creer une `claim` pour un membre ;
- consulter une `claim` ;
- lister les `claims` d'un membre ;
- traiter une `claim` via une action explicite (`process`) ;
- stocker la decision de traitement.

### Transparence de la decision

Pour chaque `claim` traitee, le systeme doit enregistrer :

- le statut final ;
- le montant demande ;
- le montant approuve ;
- le motif de decision ;
- les regles qui ont conduit a cette decision ;
- la date de traitement.

## 7.2 Scope secondaire

A faire seulement si le MVP est termine :

- annuler une `claim` non traitee ;
- reprocess une `claim` uniquement si elle est en `manual_review` ;
- support de plusieurs `claim_items` dans une meme demande ;
- endpoint de simulation avant soumission ;
- filtres simples sur la liste des `claims` ;
- petite documentation OpenAPI ou collection Bruno/Postman.

## 8. Glossaire du domaine

- `Plan` : formule de couverture a laquelle un membre est rattache.
- `CoverageRule` : regle qui determine comment un type de soin est rembourse dans un plan.
- `Member` : personne couverte par un plan.
- `Claim` : demande de remboursement soumise par un membre.
- `ClaimItem` : ligne de soin dans une demande.
- `Decision` : resultat du traitement d'une claim.
- `Manual review` : statut intermediaire signalant qu'une revue humaine est necessaire.

## 9. Regles metier

Les regles doivent rester simples mais credibles. Le but n'est pas d'imiter le monde reel dans toute sa complexite, mais de disposer d'un noyau coherent.

### 9.1 Categories de soins

Le systeme doit au minimum supporter ces categories :

- `general_practitioner`
- `specialist`
- `dental`
- `optical`
- `pharmacy`

### 9.2 Structure minimale d'une regle

Une `CoverageRule` est definie par :

- une categorie de soin ;
- un taux de remboursement (`reimbursement_rate`) entre `0` et `1` ;
- un plafond par claim (`claim_cap_amount`) optionnel ;
- un plafond annuel (`annual_cap_amount`) optionnel ;
- une franchise (`deductible_amount`) optionnelle ;
- une exigence documentaire (`requires_receipt`) ;
- un seuil de revue manuelle (`manual_review_threshold`) optionnel.

### 9.3 Decision attendue

Une `claim` doit aboutir a l'un des statuts suivants :

- `approved`
- `rejected`
- `manual_review`

### 9.4 Cas de rejet

Une `claim` peut etre rejetee si :

- le membre n'existe pas ;
- le membre n'a pas de plan ;
- la categorie n'est pas couverte par le plan ;
- le document requis est absent ;
- le montant est invalide ;
- le plafond annuel est deja atteint ;
- la claim a deja ete traitee.

### 9.5 Cas de revue manuelle

Une `claim` passe en `manual_review` si :

- le montant depasse le seuil defini par la regle ;
- le systeme detecte un cas ambigu ;
- une anomalie de donnees empeche une decision fiable.

### 9.6 Cas d'approbation

Une `claim` est `approved` si :

- le membre est valide ;
- la categorie est couverte ;
- les conditions documentaires sont remplies ;
- aucun seuil de revue manuelle n'est depasse ;
- le montant remboursable calcule est strictement positif.

### 9.7 Formule de calcul simplifiee

Pour un `claim_item`, le remboursement peut etre calcule selon la formule :

`approved_amount = min((amount - deductible_amount) * reimbursement_rate, claim_cap_amount)`

Contraintes :

- si `amount - deductible_amount <= 0`, le montant approuve est `0` ;
- si un plafond annuel existe, il faut prendre en compte le montant deja rembourse cette annee pour la meme categorie ;
- le montant final ne peut jamais etre negatif ;
- les montants doivent etre arrondis proprement a deux decimales.

## 10. Hypotheses produit

Pour eviter les ambiguities, les hypotheses suivantes sont considerees comme vraies dans le projet :

- un membre n'a qu'un seul plan actif ;
- une `claim` concerne un seul membre ;
- une `claim` contient au minimum un `claim_item` ;
- le traitement est declenche explicitement par un endpoint et non automatiquement ;
- les plans et les regles sont geres par des endpoints d'administration ouverts pour le side project ;
- le projet ne gere pas la fraude ;
- le projet ne gere pas les changements de plan dans le temps au niveau MVP.

## 11. Modele de donnees

Le schema exact peut varier selon l'ORM choisi, mais les tables suivantes sont attendues.

### 11.1 `plans`

Champs minimaux :

- `id`
- `code` unique
- `name`
- `created_at`

### 11.2 `coverage_rules`

Champs minimaux :

- `id`
- `plan_id`
- `care_category`
- `reimbursement_rate`
- `claim_cap_amount` nullable
- `annual_cap_amount` nullable
- `deductible_amount` nullable
- `requires_receipt`
- `manual_review_threshold` nullable
- `created_at`

Contrainte recommandee :

- unicite sur (`plan_id`, `care_category`)

### 11.3 `members`

Champs minimaux :

- `id`
- `external_id` unique
- `first_name`
- `last_name`
- `email`
- `plan_id`
- `created_at`

### 11.4 `claims`

Champs minimaux :

- `id`
- `member_id`
- `status`
- `submitted_at`
- `processed_at` nullable
- `currency`
- `total_claimed_amount`
- `total_approved_amount` nullable
- `decision_summary` nullable
- `created_at`

### 11.5 `claim_items`

Champs minimaux :

- `id`
- `claim_id`
- `care_category`
- `service_date`
- `amount`
- `has_receipt`
- `description` nullable
- `created_at`

### 11.6 `claim_decisions`

Champs minimaux :

- `id`
- `claim_id` unique
- `decision_status`
- `reason_code`
- `reason_message`
- `approved_amount`
- `metadata_json`
- `created_at`

`metadata_json` peut contenir par exemple :

- regle appliquee ;
- plafond restant ;
- calcul intermediaire ;
- causes de bascule en revue manuelle.

### 11.7 `audit_logs` (optionnel mais recommande)

Champs minimaux :

- `id`
- `entity_type`
- `entity_id`
- `action`
- `payload_json`
- `created_at`

## 12. API attendue

L'API doit etre en JSON.

La convention de reponse recommandee est :

- succes : payload metier simple ;
- erreur : `{ "error": "...", "message": "...", "code": "..." }`

## 12.1 Endpoints MVP

### Plans

#### `POST /plans`

Cree un plan.

Exemple de payload :

```json
{
  "code": "premium",
  "name": "Premium"
}
```

#### `GET /plans`

Liste les plans.

#### `GET /plans/:id`

Retourne le detail d'un plan.

#### `POST /plans/:id/rules`

Ajoute une regle a un plan.

Exemple de payload :

```json
{
  "careCategory": "dental",
  "reimbursementRate": 0.7,
  "claimCapAmount": 300,
  "annualCapAmount": 800,
  "deductibleAmount": 20,
  "requiresReceipt": true,
  "manualReviewThreshold": 500
}
```

### Members

#### `POST /members`

Cree un membre.

Exemple de payload :

```json
{
  "externalId": "mem_001",
  "firstName": "Lea",
  "lastName": "Martin",
  "email": "lea@example.com",
  "planId": "plan_uuid"
}
```

#### `GET /members`

Liste les membres.

#### `GET /members/:id`

Retourne le detail d'un membre.

#### `GET /members/:id/claims`

Liste les claims d'un membre.

### Claims

#### `POST /claims`

Soumet une demande de remboursement.

Exemple de payload :

```json
{
  "memberId": "member_uuid",
  "currency": "EUR",
  "items": [
    {
      "careCategory": "dental",
      "serviceDate": "2026-05-21",
      "amount": 120,
      "hasReceipt": true,
      "description": "Dental cleaning"
    }
  ]
}
```

#### `GET /claims/:id`

Retourne :

- les informations de la claim ;
- les items ;
- la decision si elle existe.

#### `POST /claims/:id/process`

Traite explicitement une claim.

Le traitement doit etre idempotent du point de vue metier : si la claim a deja ete traitee, l'API doit soit refuser avec un `409`, soit retourner la decision existante si ce choix est documente.

## 12.2 Codes HTTP attendus

- `200` pour lecture et traitement reussi
- `201` pour creation reussie
- `400` pour payload invalide
- `404` si ressource introuvable
- `409` si conflit metier
- `422` si contrainte metier non satisfaite
- `500` pour erreur non geree

## 13. Exemples de scenarios

## 13.1 Scenario nominal

1. creation du plan `premium`
2. ajout d'une regle `dental`
3. creation d'un membre rattache au plan
4. creation d'une claim dentaire avec recu
5. traitement de la claim
6. retour d'une decision `approved` avec montant approuve et explication

## 13.2 Scenario de rejet

1. plan sans couverture `optical`
2. membre rattache a ce plan
3. claim `optical`
4. traitement
5. decision `rejected` avec message du type `care category not covered by member plan`

## 13.3 Scenario de revue manuelle

1. regle `specialist` avec `manual_review_threshold = 300`
2. claim d'un montant de `450`
3. traitement
4. decision `manual_review`
5. metadata contenant la cause du seuil depasse

## 14. Architecture attendue

Le projet doit suivre une architecture simple, lisible et defendable.

Structure suggeree :

```text
src/
  app/
  controllers/
  services/
  repositories/
  schemas/
  routes/
  lib/
  db/
  types/
  tests/
```

### Roles des couches

- `controllers` : parsing HTTP, validation, mapping request/response
- `services` : logique metier, orchestration, decisions
- `repositories` : acces a la base
- `schemas` : validation des payloads
- `db` : client ORM, migrations, seeds eventuels

Le service de traitement des claims doit etre la piece centrale du projet.

## 15. Contraintes de qualite

Le projet doit privilegier :

- simplicite ;
- lisibilite ;
- noms explicites ;
- messages d'erreur clairs ;
- responsabilites bien separees ;
- code testable.

Le projet ne doit pas privilegier :

- abstraction prematuree ;
- genericite excessive ;
- patterns complexes sans besoin reel ;
- sur-ingenierie.

## 16. Attentes sur la persistence et les migrations

Le projet doit inclure :

- une base PostgreSQL ;
- des migrations versionnees ;
- au moins une strategie de seed simple si utile pour tester manuellement.

Les migrations doivent etre pensees proprement :

- operations additives privilegiees ;
- contraintes appliquees de maniere prudente ;
- coherence entre schema et code.

Ce point est important car il permet de discuter de sujets backend concrets en entretien :

- compatibilite montante ;
- locks de table ;
- backfill ;
- risques de migration bloquante.

## 17. Validation et gestion des erreurs

Le projet doit distinguer :

- erreurs de validation d'entree ;
- erreurs metier ;
- erreurs d'infrastructure.

Exemples :

- `member_not_found`
- `plan_not_found`
- `coverage_rule_not_found`
- `claim_already_processed`
- `receipt_required`
- `annual_cap_exceeded`
- `manual_review_required`

Les messages doivent etre lisibles par un humain.

## 18. Attentes sur les tests

Les tests sont une partie essentielle du projet.

### 18.1 Tests minimum attendus

- tests unitaires sur le calcul de remboursement ;
- tests unitaires sur les cas de rejet ;
- tests unitaires sur les cas de revue manuelle ;
- tests d'integration sur les endpoints principaux.

### 18.2 Cas a couvrir en priorite

- categorie couverte avec recu present ;
- categorie non couverte ;
- recu manquant alors qu'il est obligatoire ;
- franchise qui annule le remboursement ;
- plafond par claim ;
- plafond annuel deja atteint ;
- claim deja traitee ;
- seuil de revue manuelle depasse.

### 18.3 Philosophie de test

Les tests doivent montrer le comportement attendu, pas simplement verifier l'implementation ligne par ligne.

Le coeur du projet doit etre defendable en entretien a travers :

- quelques tests unitaires tres lisibles ;
- quelques tests d'integration bien choisis ;
- un discours clair sur ce qui a ete teste ou non.

## 19. Definition of Done

Le projet est considere comme "done" pour le MVP si :

- il est possible de creer un plan ;
- il est possible d'ajouter une regle a un plan ;
- il est possible de creer un membre rattache a un plan ;
- il est possible de soumettre une claim ;
- il est possible de traiter la claim ;
- la decision est persistante et consultable ;
- les erreurs principales sont gerees ;
- les migrations fonctionnent ;
- les tests principaux passent ;
- le projet est documente dans un `README`.

## 20. Livrables attendus

- code source du backend ;
- schema de base de donnees via ORM/migrations ;
- jeu minimal de donnees de demo ou endpoints suffisants pour tout creer ;
- suite de tests ;
- `README` avec :
  - instructions de lancement ;
  - architecture ;
  - hypotheses ;
  - exemples de requetes ;
  - limites connues.

## 21. Plan de realisation recommande

L'ordre de build suggere est le suivant :

### Etape 1 - Bootstrapping

- initialiser le projet ;
- connecter PostgreSQL ;
- choisir le framework HTTP ;
- installer validation et outil de test ;
- configurer les migrations.

### Etape 2 - Modele minimal

- creer les tables `plans`, `coverage_rules`, `members`, `claims`, `claim_items`, `claim_decisions` ;
- ajouter les contraintes principales.

### Etape 3 - Endpoints de reference

- implementer `POST /plans`
- implementer `POST /plans/:id/rules`
- implementer `POST /members`

### Etape 4 - Soumission de claims

- implementer `POST /claims`
- persister les `claim_items`
- calculer `total_claimed_amount`

### Etape 5 - Traitement metier

- implementer `POST /claims/:id/process`
- resoudre la regle applicable ;
- calculer la decision ;
- persister `claim_decisions` ;
- mettre a jour le statut de `claims`.

### Etape 6 - Lecture et test

- implementer `GET /claims/:id`
- ecrire les tests unitaires et d'integration critiques
- documenter les scenarios de demo.

## 22. Choix techniques suggeres

Le stack exact est libre, mais une proposition simple et credibe est :

- `TypeScript`
- `Fastify` ou `Express`
- `PostgreSQL`
- `Prisma` ou `Drizzle`
- `Zod`
- `Vitest`

Ce choix est recommande parce qu'il favorise :

- la rapidite d'execution ;
- la clarte du code ;
- la precision des types ;
- une bonne experience de test.

## 23. Points d'evaluation implicites

Si ce projet est utilise pour se preparer a un entretien backend, il doit permettre de discuter des sujets suivants :

- pourquoi ce modele de donnees ;
- pourquoi cette architecture ;
- pourquoi ces regles metier ;
- comment tu as delimite le scope ;
- comment tu aurais gere la production a plus grande echelle ;
- quels compromis tu as faits ;
- comment tu ferais evoluer les migrations ;
- comment tu assurerais l'idempotence et la concurrence ;
- ce que tu as volontairement laisse hors scope.

## 24. Evolutions possibles apres MVP

Une fois le MVP termine, les evolutions les plus pertinentes sont :

- support multi-items plus pousse ;
- ajout d'un endpoint de simulation avant soumission ;
- historique des changements de statut ;
- pagination et filtres ;
- support de plusieurs plans actifs dans le temps ;
- endpoint de reporting simple ;
- seed de donnees de demo ;
- documentation OpenAPI ;
- dockerisation.

## 25. Note finale

Le succes du projet ne se mesure pas au nombre d'endpoints ni au volume de code.

Le succes se mesure plutot a ta capacite a produire un backend :

- petit mais propre ;
- metierement coherent ;
- facile a expliquer ;
- bien teste ;
- avec des choix simples et defendables.

Si un arbitrage est necessaire, privilegier toujours :

1. la clarte du domaine ;
2. la qualite de la logique de traitement ;
3. la lisibilite du code ;
4. la solidite des tests ;
5. la documentation des hypotheses.
