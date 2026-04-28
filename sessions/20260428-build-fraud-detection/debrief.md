# Debrief — Build Feature — Fraud Detection — 28/04/2026

> Session type: `tech` (build feature on existing codebase)
> No transcript available — review based on code only.

---

## 🎯 Signaux Alan


| Signal                          | Résultat | Preuve (citation)                                                                                   |
| ------------------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| Thinking out loud               | N/A      | No transcript                                                                                       |
| Tests unitaires proactifs       | ✅        | Wrote 2 additional edge case tests beyond the provided suite (empty array, exact threshold at 200€) |
| Edge cases trouvés              | ✅        | `amount === 200` not flagged (boundary condition), empty claims array handled                       |
| Pragmatisme (brute force first) | ✅        | Three separate `for` loops with a grouping dictionary — no overengineering, clean and readable      |
| IA challengée (si utilisée)     | N/A      | Not observable without transcript                                                                   |
| Objectif final atteint          | ✅        | 16/16 tests pass including all 7 provided + 2 custom edge cases                                     |


**Impression générale** : Le code est fonctionnel, bien structuré, et les edge cases choisis sont pertinents. Le pattern `byActAndDate` / `byMonth` est cohérent et lisible. L'accumulation des `reasons` et `suspiciousClaims` avant le push final du flag montre une bonne compréhension du problème.

---

## 💻 Code Review

### Ce qui est bien

**Structure générale propre** — la séparation en 3 blocs distincts (règle 1, règle 2, règle 3) avec un seul `flags.push` à la fin est exactement la bonne approche. Ça évite les flags dupliqués et permet d'accumuler plusieurs raisons naturellement.

**Détection des doublons correcte** — le pattern `byActAndDate` avec clé composite `actCode|date` est élégant et juste. La vérification `includes` sur `suspiciousClaims` avant chaque push évite les IDs dupliqués.

**Tests bien choisis** — `empty array` et `amount === 200` sont deux vrais boundary conditions. Le test sur le seuil exact est particulièrement bon : c'est exactement le genre d'edge case qu'un Alan interviewer regarderait.

### Ce qu'un senior Alan engineer dirait en PR review

**1. Return type incorrect**

```typescript
export function flagSuspicious(claims: Claim[]): [] { // ← [] n'est pas un type valide
```

Le type de retour devrait être `FraudFlag[]`. `[]` compile mais ne type pas le retour correctement.

**2. Dead code à supprimer**

```typescript
let suspiciousCounter = 0; // jamais utilisé
import { ActCode } from "./types"; // jamais utilisé
```

Un PR avec du dead code se fait rejeter en review chez Alan.

**3. `if (claims.length <= 0)` est redondant**
Si `claims` est vide, `claimsByMember([])` retourne `{}`, la boucle `Object.entries({})` ne s'exécute pas, et `flags` reste `[]`. Le return anticipé ne fait rien d'utile — retire-le.

**4. `formatDate` recoded alors que `extractMonth` existe dans `utils.ts`**

```typescript
function formatDate(date: string): string { ... } // recodé manuellement
```

`extractMonth` dans `src/utils.ts` fait exactement la même chose et est déjà testé. En production, un dev qui reCode un utilitaire déjà existant sans raison se fait signaler en review.

**5. Indentation inconsistante**
La boucle interne (lignes 27-32) n'est pas indentée par rapport à la boucle externe. Pas bloquant mais visible.

**6. `duplicate_act_same_day` peut être pushé plusieurs fois dans `reasons`**
Si un membre a deux groupes de doublons différents (ex: C23 dupliqué ET SPE7 dupliqué le même jour), la raison sera pushée deux fois. Il manque un `if (!reasons.includes("duplicate_act_same_day"))` comme pour les autres règles.

---

## 🇬🇧 English

Pas de transcript disponible — section basée sur les concepts utilisés dans le code.

Termes techniques à connaître en anglais pour l'essai écrit :


| Concept utilisé                     | En anglais (interview / essai)                      |
| ----------------------------------- | --------------------------------------------------- |
| Dictionnaire de groupement          | "grouping dictionary" / "lookup map"                |
| Clé composite                       | "composite key"                                     |
| Cas limite / valeur seuil           | "boundary condition" / "edge case at the threshold" |
| Accumuler les raisons avant de push | "accumulate reasons before committing the flag"     |
| Code mort                           | "dead code"                                         |


---

## 🔁 1 chose à corriger demain

**Réutilise ce qui existe avant de recoder.**

Tu as recodé `formatDate` alors que `extractMonth` était déjà dans `utils.ts`, importée dans d'autres fichiers, et documentée. Dans un vrai projet Alan, lire les utilitaires existants avant d'écrire quoi que ce soit est un réflexe attendu — c'est exactement ce que le BRIEF te demandait de faire ("explore la codebase avant de coder"). Avant de coder une nouvelle fonction, grep le codebase, lis `utils.ts`, et demande-toi si ça existe déjà.