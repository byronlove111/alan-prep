# Cahier des charges - Simulation de remboursement sante avec OCR

## Contexte

Le projet est une webapp simple de simulation.

Un utilisateur remplit un formulaire, choisit un plan de couverture, envoie un ou plusieurs documents, puis le systeme :

1. extrait les informations utiles via OCR ;
2. reconstruit une demande de remboursement ;
3. applique les regles du plan ;
4. renvoie une decision claire au frontend.

Le but n'est pas de reproduire un vrai assureur, mais de construire un projet simple, coherent et presentable pour un entretien backend.

## Probleme utilisateur

Un membre avance des frais de sante et veut savoir rapidement :

- si sa demande est recevable ;
- combien il sera rembourse ;
- pourquoi sa demande est refusee ou incomplete ;
- si une verification manuelle est necessaire.

## Vision du projet

Le projet doit simuler un parcours tres simple :

- l'utilisateur renseigne son identite ;
- il choisit un plan de couverture ;
- il envoie une image ou un document ;
- le systeme traite la demande ;
- le frontend affiche le resultat.

Le coeur du projet est donc :

> prendre un document medical, en extraire une claim exploitable, puis calculer une decision de remboursement selon le plan choisi.

## Scope MVP

Le MVP doit couvrir uniquement ce qui suit.

### Cote frontend

- un formulaire simple ;
- saisie de `firstName`, `lastName`, `email` ;
- choix d'un `plan` ;
- upload d'un ou plusieurs fichiers ;
- affichage du resultat final.

### Cote backend

- recevoir le formulaire ;
- creer ou retrouver un `member` ;
- stocker la demande ;
- envoyer le document a un service OCR ;
- recuperer les donnees extraites ;
- transformer ces donnees en claim exploitable ;
- appliquer les regles du plan ;
- retourner une decision au frontend.

### Resultat attendu

Le systeme doit renvoyer l'un de ces statuts :

- `approved`
- `rejected`
- `manual_review`

Et aussi :

- le montant reclame ;
- le montant rembourse ;
- une explication simple.

## Documents acceptes en input

Pour garder le projet simple, les documents acceptes sont :

- `medical_invoice`
- `receipt`
- `prescription`
- `medical_certificate`

Le MVP peut se limiter en pratique a :

- facture ;
- justificatif de paiement ;
- ordonnance.

## Hypothese cle

Le systeme ne lit pas parfaitement tous les documents.

L'OCR sert a extraire un minimum d'informations utiles, par exemple :

- type de soin ;
- date ;
- montant ;
- presence d'un justificatif exploitable ;
- nom du praticien si disponible.

Si les informations sont insuffisantes ou ambigues, la decision peut etre `manual_review`.

## Donnees metier minimales

Le projet peut rester base sur tres peu d'entites :

- `Plan`
- `CoverageRule`
- `Member`
- `Claim`
- `Decision`

## Regles metier minimales

Chaque plan contient quelques regles simples :

- categories de soins couvertes ou non ;
- pourcentage de remboursement ;
- plafond eventuel ;
- justificatif obligatoire ou non ;
- seuil au-dela duquel on passe en revue manuelle.

## Exemple de logique

1. le user choisit le plan `premium`
2. il upload une facture ou un justificatif
3. l'OCR extrait un soin `dental` et un montant `120`
4. le backend regarde les regles du plan
5. le backend decide :
   - `approved` avec montant rembourse
   - ou `rejected`
   - ou `manual_review`

## Hors scope

Pour eviter de compliquer inutilement le projet, on exclut :

- authentification complexe ;
- dashboard admin ;
- edition complete des plans depuis le front ;
- paiement reel ;
- OCR local avance ;
- fraude ;
- multi-pays ;
- workflow metier complexe ;
- systeme de notifications ;
- microservices.

## Persistence

Les plans de couverture doivent etre preconfigures en base.

Le frontend peut ensuite creer le reste via le formulaire, mais le backend doit quand meme persister au minimum :

- le membre ;
- la claim ;
- le resultat OCR ;
- la decision finale.

## UX cible

L'experience utilisateur doit etre tres simple :

1. je remplis mes infos ;
2. je choisis mon plan ;
3. j'envoie mon document ;
4. j'obtiens une reponse.

## Definition of Done

Le projet est considere termine pour le MVP si :

- l'utilisateur peut soumettre un formulaire complet ;
- un document est envoye au backend ;
- l'OCR retourne des donnees exploitables ;
- une claim est construite a partir de ces donnees ;
- le systeme calcule une decision selon le plan choisi ;
- le frontend affiche la decision, le montant et une explication ;
- les plans sont precharges en base ;
- les claims et decisions sont persistantes.

## Notes de cadrage

Ce projet doit rester une simulation propre et limitee.

Le but n'est pas de faire un produit d'assurance complet, mais de montrer que tu sais :

- prendre un input reel ;
- le transformer en donnees metier ;
- appliquer une logique backend claire ;
- renvoyer un resultat comprensible.
