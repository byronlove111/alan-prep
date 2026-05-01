# Feature — Contract Renewal Checker

## Contexte

Alan gère des contrats d'assurance santé pour des entreprises clientes. Chaque contrat est associé à un membre et a une date de fin. L'équipe ops doit être alertée à l'avance des contrats qui arrivent à expiration pour déclencher le processus de renouvellement. Une codebase existante gère déjà les contrats (`contracts.ts`) et les membres (`members.ts`). Tu dois construire la feature de détection des renouvellements.

## Ce que tu dois construire

Crée le fichier `src/renewal.ts` qui exporte une fonction `checkRenewals`.

Cette fonction prend une liste de contrats, une liste de membres, et une date de référence. Elle retourne une liste de `RenewalNotice` — un objet par contrat actif non expiré — avec le niveau d'urgence calculé selon le nombre de jours restants avant expiration.

**Règles d'urgence :**

- `critical` : expiration dans ≤ 14 jours
- `warning` : expiration dans 15 à 30 jours
- `ok` : expiration dans > 30 jours

**Exclusions :**

- Les contrats dont le statut n'est pas `active` sont ignorés
- Les contrats déjà expirés à la date de référence sont ignorés (daysUntilExpiry ≤ 0)

## Acceptance criteria

- Tous les tests fournis dans `tests/renewal.test.ts` passent
- Tu as ajouté au moins 2 tests supplémentaires couvrant des edge cases
- Tu réutilises les utilitaires existants dans `utils.ts` (ne pas recoder `daysBetween`, `parseDate`, etc.)
- Tu réutilises `findMember` depuis `members.ts`
- Tu n'as pas modifié les fichiers existants

## Hints (lis seulement si bloqué > 15 min)

Hint 1 `utils.ts` contient `daysBetween(a, b)` et `parseDate(str)` — tu en as besoin pour calculer les jours restants. `daysBetween(referenceDate, parseDate(contract.endDate))` te donne exactement ce qu'il faut.

Hint 2 `findMember` dans `members.ts` retourne `Member | null`. Si un contrat référence un memberId qui n'existe pas dans la liste, décide comment tu veux gérer ce cas — et écris un test pour ça.

## Contraintes

- TypeScript strict mode
- Tu crées uniquement `src/renewal.ts` (et éventuellement des tests supplémentaires)
- Tu ne modifies pas les fichiers existants