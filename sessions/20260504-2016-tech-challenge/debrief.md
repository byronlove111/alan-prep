# Debrief — Tech Challenge · 2026-05-04

---

## 🎯 Signaux Alan

| Signal | Résultat | Preuve |
|--------|----------|--------|
| Thinking out loud | ❌ | Pas de transcript — aucune narration observée. Les blocages (trouver le TODO, oublier le `return`) suggèrent une progression silencieuse plutôt qu'une réflexion verbalisée. |
| Tests unitaires proactifs | ❌ | 10/10 tests fournis ont passé, mais aucun test supplémentaire n'a été écrit. Le checklist l'exigeait explicitement. |
| Edge cases trouvés | ❌ | Le bug dans `reconcileBatch` (C003 — known rejection avec delta ≠ 0 classé `ok`) n'a pas été trouvé, même après avoir été pointé explicitement vers C003. |
| Pragmatisme (brute force first) | ✅ | `getMembersWithDiscrepancies` est une implémentation directe et lisible — pas de sur-ingénierie. Bonne instinct. |
| IA challengée (si utilisée) | N/A | Pas d'utilisation d'IA observée. |
| Objectif final atteint | ✅ | 10/10 tests verts en fin de session. |

**Impression globale (vue interviewer) :** Le candidat a livré une implémentation fonctionnelle et pragmatique, ce qui est positif. Cependant, les signaux les plus différenciants chez Alan — trouver les bugs via des tests ciblés, narrer son raisonnement en temps réel, écrire des tests de sa propre initiative — étaient absents. Un candidat qui passe 10/10 sans écrire un seul test et sans trouver le bug intentionnel envoie le signal qu'il code pour que ça marche, pas pour que ça soit correct.

---

## 💻 Code Review

### `getMembersWithDiscrepancies` (lignes 162–177)

```typescript
export function getMembersWithDiscrepancies(
  report: BatchReport
): Array<{ memberId: string; discrepancyCount: number }> {
  const membersWithDiscrepancies : Array<{ memberId: string; discrepancyCount: number }> = [];
  for (const result of report.results){
    if (result.discrepancy != "ok") {
      const member = membersWithDiscrepancies.find((x) => x.memberId === result.memberId);
      if (member) {
        member.discrepancyCount = member.discrepancyCount + 1;
      } else {
        membersWithDiscrepancies.push({memberId: result.memberId, discrepancyCount: 1});
      }
    }
  }
  return membersWithDiscrepancies.sort((a, b) => b.discrepancyCount - a.discrepancyCount);
}
```

**Ce qui fonctionne :**
- Logique correcte dans l'ensemble. Les tests passent.
- L'approche de mutation de l'objet trouvé par `find()` est valide.
- Le tri final est bien placé au `return`.

**Points à corriger :**

1. **`!= "ok"` → utiliser `!== "ok"`** : en TypeScript, toujours préférer l'égalité stricte. `!=` peut masquer des problèmes de type. Règle simple : `===` et `!==` partout.

2. **`member.discrepancyCount = member.discrepancyCount + 1`** → peut s'écrire `member.discrepancyCount++`. Ce n'est pas un bug, mais c'est plus idiomatique.

3. **Complexité O(n²) non mentionnée** : `find()` dans une boucle fait un scan linéaire à chaque itération. En entretien, il faut nommer ce problème à voix haute, même sans le corriger immédiatement (voir section complexité ci-dessous).

4. **Aucun test supplémentaire écrit.** C'est le signal manquant le plus important. Exemples de cas à tester : liste vide (`report.results = []`), tous les résultats `ok` (doit retourner `[]`), un même membre avec plusieurs discrepancies, le tri avec égalité.

---

### Bug dans `reconcileBatch` — **non trouvé**

C'est la miss la plus importante de la session.

**Le bug :** C003 a `rejectionCode: "R001"` (un code connu) et `submittedAmount: 60`. Le code calcule `effectivePaid = 0` et `delta = 0 - 60 = -60`. Ensuite la chaîne `if/else` :

- `rejectionCode !== null && !KNOWN_REJECTION_CODES.includes("R001")` → **false** (R001 est connu)
- `rejectionCode === null && ...` → **false**
- Tombe dans le `else` → `discrepancy = "ok"` ✗

**Résultat :** une claim avec un rejection code connu mais un delta de -60€ est silencieusement marquée `ok`. Alan ne sera jamais remboursé de ces 60€, et le système ne le signale pas. C'est une perte financière cachée.

**Le fix :** ajouter une condition avant le `else` pour les known rejections avec `delta !== 0` :

```typescript
} else if (rejectionCode !== null && KNOWN_REJECTION_CODES.includes(rejectionCode) && delta !== 0) {
  discrepancy = "amount_mismatch"; // ou un type dédié "known_rejection_loss"
} else {
  discrepancy = "ok";
}
```

**Pourquoi les tests existants ne le catchent pas :** le test de C003 vérifie seulement que le type n'est *pas* `unexpected_rejection` — il n'assertait pas le type exact. Un test ciblé `expect(result.discrepancy).toBe("amount_mismatch")` l'aurait révélé immédiatement.

---

### ⏱️ Complexity Analysis

| Fonction | Complexité temps | Complexité espace | Note |
|---|---|---|---|
| `reconcileBatch` | O(n) | O(n) | Construction du `returnMap` en O(n), itération sur les claims en O(n) |
| `getMemberReport` | O(m log m) | O(m) | m = claims du membre — dominé par le `sort` final |
| `getMembersWithDiscrepancies` | **O(n²)** | O(k) | `find()` dans la boucle = scan linéaire à chaque itération. k = membres distincts avec discrepancy |

**Ce qu'il faut dire à voix haute en entretien pour `getMembersWithDiscrepancies` :**

> "Je vois que mon `find()` dans la boucle donne une complexité O(n²) — si on a des milliers de claims, ça va mal passer. Une alternative propre : accumuler dans un `Record<string, number>`, puis `Object.entries(acc).map(...).sort(...)` pour retomber en O(n). Je mets ça de côté pour l'instant, je peux y revenir si on a le temps."

**L'alternative O(n) :**

```typescript
const acc: Record<string, number> = {};
for (const result of report.results) {
  if (result.discrepancy !== "ok") {
    acc[result.memberId] = (acc[result.memberId] ?? 0) + 1;
  }
}
return Object.entries(acc)
  .map(([memberId, discrepancyCount]) => ({ memberId, discrepancyCount }))
  .sort((a, b) => b.discrepancyCount - a.discrepancyCount);
```

---

## 🇬🇧 English

Pas de transcript disponible — voici les 4 phrases-clés à connaître en anglais pour ce contexte précis.

---

**1. Expliquer une discrepancy de réconciliation**

> "The reconciliation found a discrepancy: the amount Alan actually paid differs from what was submitted by the healthcare provider. In this case, the delta is –60€, meaning Alan overpaid or was not reimbursed as expected."

---

**2. Expliquer un rejection code connu vs inconnu**

> "A known rejection code means the insurer has a documented reason for not reimbursing — Alan can anticipate it and adjust the effective paid amount to zero. An unknown rejection code is unexpected and flags a potential issue that needs manual review."

---

**3. Nommer le problème O(n²) et le déprioritiser**

> "I notice that calling `find()` inside a loop gives us O(n²) time complexity. For a large number of claims this would be a problem — I'd normally use a hash map to bring it down to O(n). For now I'll keep it simple and flag it as a known trade-off."

---

**4. Décrire le calcul du delta**

> "Delta is the difference between what was effectively paid by the insurer and what was originally submitted. A delta of zero means the claim was processed as expected. A negative delta means Alan received less than submitted — which is a discrepancy worth investigating."

---

## 🔁 1 chose à corriger demain

**Écrire au moins un test supplémentaire — avant toute autre chose.**

Tous les signaux qu'Alan évalue pendant le tech challenge coulent de la même source : est-ce que tu testes ce que tu codes ? Trouver le bug dans `reconcileBatch` n'était pas une question de chance — c'était une question d'écrire un test pour C003 qui asserte le type exact de discrepancy, pas juste une négation. Le `return` oublié, le `console.log` laissé en place, le bug non détecté : tous ces problèmes disparaissent quand tu as le réflexe de tester chaque cas que tu implémentes.

Demain, après avoir écrit une fonction, pose-toi la question : **"Quel input pourrait faire planter ça ?"** Écris un test pour ce cas. C'est tout.
