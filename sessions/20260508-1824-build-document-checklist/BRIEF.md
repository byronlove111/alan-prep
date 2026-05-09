# Feature Brief — Member Onboarding · Document Checklist

**Durée estimée :** ~45–60 min  
**Niveau :** Software Engineer Internship  
**Domaine :** Alan — Assurance santé

---

## Contexte

Avant d'activer le contrat d'un adhérent, Alan vérifie que tous les documents requis ont bien été fournis. Selon le plan souscrit, la liste des pièces exigées varie :

| Plan | Documents requis |
|------|-----------------|
| `basic` | Identité, RIB |
| `premium` | Identité, RIB, Certificat médical |
| `premium_plus` | Identité, RIB, Certificat médical, Attestation employeur |

Le codebase existant gère déjà :
- **`src/members.ts`** — rechercher un adhérent, formater son label
- **`src/contracts.ts`** — rechercher un contrat, vérifier s'il est en attente d'activation
- **`src/utils.ts`** — retourner la liste des documents requis pour un plan donné
- **`src/types.ts`** — tous les types TypeScript du domaine

---

## Ce que tu dois construire

Alan a besoin d'un rapport d'activation pour chaque adhérent dont le contrat est en attente.

Ce rapport doit permettre à l'équipe Ops de savoir, en un coup d'œil :
- si un adhérent peut être activé immédiatement (tous ses documents sont reçus et valides),
- quels documents manquent ou sont en attente,
- si un document a été rejeté (ce qui bloque l'activation).

Tu dois créer **`src/checklist.ts`** qui expose une seule fonction publique :

```typescript
export function generateActivationReport(
  memberId: string,
  members: Member[],
  contracts: Contract[],
  documents: MemberDocument[]
): ActivationReport | null
```

---

## Acceptance criteria

- [ ] Retourne `null` si l'adhérent n'a pas de contrat avec le statut `pending_activation`
- [ ] Le rapport liste tous les documents requis pour le plan du contrat
- [ ] Pour chaque document requis, le statut est : `"received"` | `"pending"` | `"rejected"` | `"missing"` (si non soumis)
- [ ] `activationStatus` vaut `"ready"` si tous les documents requis sont `"received"`
- [ ] `activationStatus` vaut `"incomplete"` si au moins un document est `"missing"` ou `"pending"` (et aucun rejeté)
- [ ] `activationStatus` vaut `"blocked"` si au moins un document est `"rejected"` (prioritaire sur `"incomplete"`)
- [ ] `missingDocuments` contient uniquement les documents requis non soumis (ni pending, ni rejected)
- [ ] `rejectedDocuments` contient uniquement les documents requis avec statut `"rejected"`
- [ ] Le rapport inclut `memberId`, `contractId`, et `plan` corrects

---

## Hints

<details>
<summary>💡 Hint 1 — Par où commencer ?</summary>

Commence par trouver le bon contrat : cherche parmi les contrats de l'adhérent celui dont le statut est `"pending_activation"`. Si aucun n'existe, retourne `null`.

Utilise les fonctions déjà disponibles dans `src/contracts.ts` et `src/utils.ts`.

</details>

<details>
<summary>💡 Hint 2 — Construire le checklist</summary>

Pour chaque document requis (obtenu via `getRequiredDocuments(plan)`), cherche dans la liste `documents` s'il existe une entrée pour ce `memberId` + `documentType`.

- Si trouvé → utilise son statut (`received`, `pending`, `rejected`)
- Si non trouvé → statut = `"missing"`

</details>

<details>
<summary>💡 Hint 3 — Calculer l'activationStatus</summary>

Examine les statuts de ton checklist dans cet ordre de priorité :

1. Y a-t-il au moins un `"rejected"` ? → `"blocked"`
2. Y a-t-il au moins un `"missing"` ou `"pending"` ? → `"incomplete"`
3. Sinon → `"ready"`

</details>

<details>
<summary>💡 Hint 4 — Structure du fichier</summary>

```typescript
// src/checklist.ts
import type { ActivationReport, Contract, Member, MemberDocument } from "./types";
import { findContract, isPendingActivation } from "./contracts";
import { getRequiredDocuments } from "./utils";

export function generateActivationReport(
  memberId: string,
  members: Member[],
  contracts: Contract[],
  documents: MemberDocument[]
): ActivationReport | null {
  // 1. Trouver le contrat pending_activation
  // 2. Construire le checklist
  // 3. Calculer activationStatus, missingDocuments, rejectedDocuments
  // 4. Retourner le rapport
}
```

</details>

---

## Contraintes

- Tu ne dois **pas modifier** les fichiers existants (`types.ts`, `members.ts`, `contracts.ts`, `utils.ts`)
- Tu dois créer uniquement **`src/checklist.ts`**
- Utilise les fonctions exportées par les modules existants (ne les réimplémente pas)
- Strict TypeScript — pas de `any`, pas d'assertions inutiles

---

## Pour lancer les tests

```bash
npm test
# ou
npx tsx test-runner.ts
```

Les tests de `members.test.ts` doivent passer dès le départ.  
Les tests de `checklist.test.ts` doivent tous passer une fois ta fonctionnalité implémentée.
