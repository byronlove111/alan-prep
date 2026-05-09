# Debrief — Build Feature · Document Checklist — 08-09/05/2026

## Résultat final

**15/15 tests passent** — 9 fournis + 2 écrits proactivement (premium plan incomplete + premium plan fully ready).

---

## 🎯 Signaux Alan

| Signal | Résultat | Preuve |
|--------|----------|--------|
| Thinking out loud | ✅ | Narration continue pendant tout le coding — raisonnement verbalisé à chaque étape |
| Tests unitaires proactifs | ✅ | 2 tests bonus ajoutés après avoir fait passer les 9 existants |
| Edge cases trouvés | ⚠️ | Plan premium testé proactivement, mais bug memberId non filtré non détecté |
| Pragmatisme | ✅ | Brute force assumé : "it's not the purpose of this meeting, so I'll stay with this solution" |
| Complexité nommée spontanément | ✅ | [58:16] "we loop through the whole array a lot of time — I know I can mix the two into one function" |
| Objectif final atteint | ✅ | 15/15, code propre retourné |

Impression générale : session solide. Le moment de complexité à [58:16] est le signal le plus fort — nommer une trade-off de perf et décider consciemment de ne pas l'optimiser (avec justification) est un réflexe senior. La codebase a été bien explorée, les helpers existants trouvés sans aide.

---

## 💻 Code Review

### Point fort — exploration de la codebase

[15:08-16:25] : découverte autonome de `getRequiredDocuments`, `findContract`, `isPendingActivation`, `findMember` en lisant les fichiers existants. Aucune aide demandée pour ça.

### Point fort — structure logique

Checklist construite en premier, `activationStatus`/`missingDocuments`/`rejectedDocuments` dérivés ensuite. Bonne séparation, facile à lire.

### Bug silencieux — memberId non filtré dans le find

```typescript
// ❌ écrit
const memberDoc = documents.find((document) => document.documentType == requiredType);

// ✅ correct
const memberDoc = documents.find(
  (doc) => doc.memberId === memberId && doc.documentType === requiredType
);
```

Si `documents` contient les docs de tous les membres (cas réel en prod), le code trouve le doc du mauvais membre. Les tests passent parce que chaque test ne passe que les docs du membre concerné — le bug est silencieux.

### Autres points

- `activationStatus: ""` à l'init — TypeScript devrait refuser ça (`ActivationStatus` est `"ready" | "incomplete" | "blocked"`). Utilise une variable locale affectée à la fin.
- `==` au lieu de `===` (lignes 29, 37, 44, 61) — toujours `===` en TypeScript.
- Duration : ~65 min pour un exercice calibré à 1h. Légèrement long — la lecture du brief en diagonale au début a coûté ~5 min de retraitement.

---

## ⏱️ Complexity Analysis

| Fonction | Complexité temps | Complexité espace | Note |
|----------|-----------------|-------------------|------|
| `generateActivationReport` | O(R × D) | O(R) | R = docs requis (2-4), D = docs soumis. `find` dans une boucle = O(R × D) |

Acceptable : R ≤ 4, constant. En entretien, la phrase exacte à dire (et que tu as **dite à [58:16]**) :

> *"I'm looping through required documents and calling find each time, so it's O(R × D). Since R is at most 4, it's effectively linear. If I were batch-processing all members at once, I'd pre-index documents by memberId and type first — but for this scope, I'll keep it simple."*

---

## 🇬🇧 English — moments clés

> 🗣️ [58:16] *"We loop through the whole array a lot of time... I know that I can mix the two of them inside one function and just clean up the code, but it's not the purpose of this meeting."*
> 🇬🇧 En interview : *"I'm aware this makes multiple passes over the documents array. I could consolidate that into a single loop, but given the time constraint and the small fixed size of required documents, I'll keep it readable and flag it as a known trade-off."*

> 🗣️ [16:18] *"It's more clear, more clean, more scalable so I will just use that."*
> 🇬🇧 En interview : *"I see there's already a helper for this — I'll use it rather than re-implement it. Keeps the code consistent with the rest of the codebase."*

> 🗣️ [50:41] *"My function became pretty big so I will need to refactor maybe later."*
> 🇬🇧 En interview : *"The function is getting long — I'd normally split this into smaller helpers, but I'll ship the working version first and refactor after the tests pass."*

**3 termes à connaître en anglais :**
- "pending activation" → same in English
- "document checklist" → same
- "single responsibility" → tu l'as dit toi-même à [16:25] ✅

---

## 🔁 1 chose à corriger demain

**Lire le brief entièrement avant d'écrire la première ligne de code.** À [07:37] tu pensais encore qu'il fallait itérer tous les membres — parce que tu avais lu en diagonale. Une lecture de 2 minutes complète t'aurait économisé 5 minutes de retraitement. En entretien avec 45 min de chrono, ces 5 minutes coûtent cher.
