# Debrief — Tech Challenge · 07/05/2026 · 18h15

**Exercise:** Reimbursement Eligibility Engine — bug in date comparison logic (Rule 3)
**Result:** ✅ 10/10 tests green · ~28 min

---

## 🎯 Signaux Alan

| Signal | Résultat | Preuve (citation) |
|--------|----------|-------------------|
| Thinking out loud | ✅ | [03:03] "the date comparison is string-based, not Date-based" — named the bug verbally before writing a single line of fix |
| Tests unitaires proactifs | ✅ | [11:07-14:16] Wrote 2 boundary tests (30-day / 31-day) without being asked — **first time doing this unprompted. Clear progression.** |
| Edge cases trouvés | ✅ | Identified the failing test immediately at [02:02]; tested both sides of the 30-day boundary |
| Pragmatisme (brute force first) | ✅ | Reused existing `parseDate` and `daysBetween` helpers instead of reimplementing date arithmetic from scratch |
| IA challengée (si utilisée) | N/A | No AI used during this session |
| Objectif final atteint | ✅ | 10/10 tests green; Rule 3 correctly fixed |

**Impression d'ensemble (vue de l'interviewer) :** C'était propre. Tu as lu le code avant de toucher quoi que ce soit, tu as localisé le bug rapidement, et tu as su reconnaître que les helpers existaient — ça c'est du pragmatisme réel, pas du pragmatisme déclaré. L'ajout spontané de tests montre une vraie progression par rapport aux sessions précédentes. Le seul doute qu'un interviewer Alan pourrait avoir : est-ce que tu aurais *trouvé* ce bug toi-même si le test fourni ne l'avait pas déjà exposé ? C'est la question ouverte.

---

## 💻 Code Review

### Le bug et le fix

**Buggy code (original Rule 3):**
```typescript
const claimDateStr = claim.submittedAt;
const requestDateStr = request.requestedAt;
const diff = Math.abs(
  parseInt(requestDateStr.replace(/\//g, "")) -
  parseInt(claimDateStr.replace(/\//g, ""))
);
return diff <= 30;
```

Le problème : `"05/05/2026".replace(/\//g, "")` → `"05052026"` → `5052026`. La soustraction entre deux entiers de ce format ne donne pas un nombre de jours — c'est une différence purement arithmétique sur des chaînes encodées. Le cas cross-mois brise complètement le calcul (ex : `05052026 - 28042026 = 1008007`, ce qui n'est pas 7 jours).

**Fixed code:**
```typescript
const diff = daysBetween(parseDate(claim.submittedAt), requestDate);
return diff <= 30;
```

Fix correct et idiomatique. `parseDate` et `daysBetween` étaient déjà dans le fichier — tu les as vus et utilisés. C'est exactement ce qu'il fallait faire.

### Runtime error intermédiaire

À [09:37], tu as eu : `Cannot read properties of undefined reading 'getTime'`. Tu avais passé `claim.submittedAt` (la string brute) directement à `daysBetween` au lieu de la wrapper dans `parseDate`. Corrigé en ~30 secondes à [10:07]. Ça arrive — l'important c'est que tu as lu le message d'erreur, tu as compris ce qu'il disait, et tu as corrigé immédiatement.

### Tests écrits

Tests ajoutés proactivement :
- `"rejected — same act submitted 30 days ago (same month)"` — ✅ correct, boundary diff === 30 doit rejeter
- `"rejected — same act submitted 31 days ago (same month)"` — ⚠️ **naming mismatch** : le test s'appelle "rejected" mais `expected.eligible === true`. La logique est correcte (31 jours = eligible), mais le nom du test dit le contraire. Dans un vrai PR chez Alan, ça se ferait retoquer immédiatement — un test mal nommé est un test qui ment à celui qui lit.

**Test critique manquant :** Le cas qui aurait *originalement exposé* le bug n'a jamais été écrit. Un claim soumis le `28/04/2026` pour une requête du `05/05/2026` — 7 jours réels, mais la comparaison string donne `5052026 - 28042026 = -22990000`, donc `Math.abs(...)` retourne un nombre énorme → bug silencieux. Ce test cross-mois est le test qui tue le bug. L'écrire *avant* de corriger le code est l'Alan signal.

### `console.log` en production

Un `console.log(diff)` a été laissé dans le code de production pendant une partie de la session. Même si tu l'as retiré avant la fin, c'est un réflexe à éliminer : chez Alan, tout passe par les tests et le diff PR — un log de debug dans le code soumis est un signal négatif.

---

### ⏱️ Complexity Analysis

| Fonction | Complexité temps | Complexité espace | Note |
|----------|-----------------|-------------------|------|
| `checkEligibility` | O(c + a + n) | O(1) | c = contrats (find → linéaire), a = actes couverts (includes → linéaire, mais borné par la taille du plan : constant en pratique), n = past claims (some → linéaire dans le pire cas). Trois passes linéaires indépendantes, pas imbriquées. |
| `parseDate` | O(1) | O(1) | Split + map sur exactement 3 éléments — toujours constant |
| `daysBetween` | O(1) | O(1) | Arithmétique simple sur deux timestamps |

**Ce que tu dois dire à voix haute en vrai entretien :**

> "Dans l'état actuel, `checkEligibility` est O(n) sur les past claims — pour chaque requête, on scanne tous les claims de tous les membres. En production, si on a des millions de claims, cette approche va peser. Je le note maintenant : si le contexte l'exige, l'optimisation naturelle serait un index des claims par memberId + actCategory, ce qui ramènerait la recherche à O(1). Pour l'instant je mets ça de côté — ça ne change pas la logique et l'exercice ne justifie pas cette complexité ajoutée."

Cette phrase montre que tu as vu le problème, tu sais comment le résoudre, et tu priorises. C'est exactement ce qu'Alan veut entendre.

---

## 🇬🇧 English

The transcript was in English. Here are 3 key moments where you explained your reasoning — cleaned up to interview-grade English:

---

> 🗣️ Tu as dit (approximatif) : *"the test is failing because the date comparison is string-based, not Date-based"*
> 🇬🇧 Interview-grade : *"The root cause here is that the comparison is operating on raw date strings as integers, not on actual Date objects — so the arithmetic is meaningless, especially across month boundaries."*

---

> 🗣️ Tu as dit (approximatif) : *"there's already a parseDate and daysBetween function, I can just use those"*
> 🇬🇧 Interview-grade : *"I notice we already have `parseDate` and `daysBetween` utilities defined in the file — rather than reimplementing date arithmetic, I'll reuse them. That keeps the fix minimal and consistent with the existing style."*

---

> 🗣️ Tu as dit (approximatif) : *"I want to add a test for the 30-day boundary to make sure the edge case is covered"*
> 🇬🇧 Interview-grade : *"Before moving on, I want to add a test for the exact boundary — a claim submitted exactly 30 days ago. Off-by-one errors at boundaries are a classic source of bugs, and I want to make sure the `<= 30` condition behaves as expected at the edge, not just in the middle of the range."*

---

**3 termes techniques à maîtriser en anglais pour l'essai écrit :**
- **date arithmetic** (pas "date calculation" — le terme précis est "arithmetic" ou "date math")
- **off-by-one error** (l'erreur de borne, très courant dans ce type d'exercice)
- **boundary condition / edge case** (à utiliser systématiquement quand tu parles des limites)

---

## 🔁 1 chose à corriger demain

**Écrire le test cross-mois *avant* de corriger le bug.**

Tu as trouvé le bug parce que le test fourni était déjà rouge. C'est bien — tu l'as compris, tu l'as fixé. Mais l'Alan signal, c'est différent : c'est *toi* qui écris le test qui expose le bug, avant de toucher au code.

Demain, si tu vois un bug suspect dans du code de comparaison de dates, la séquence est :
1. Hypothèse : "ce code va casser si les dates sont dans des mois différents"
2. Test : claim `28/04`, request `05/05` — 7 jours réels
3. Run → rouge → maintenant tu peux corriger

Le test cross-mois (`28/04` → `05/05`) est *le* test qui tue ce bug. Sans lui, tu ne peux pas prouver que tu as compris *pourquoi* ça cassait. Avec lui, tu n'as même pas besoin de l'expliquer — le test parle pour toi.
