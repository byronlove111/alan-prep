# Debrief — Tech Challenge — 30/04/2026

## Session

- **Exercice** : Document Validation Pipeline (business-rules)
- **Transcript** : absent (volontaire)
- **Tests** : 5/5 ✅

---

## 🎯 Signaux Alan


| Signal                          | Résultat | Preuve                                                                                                              |
| ------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| Thinking out loud               | ⚠️       | Pas de transcript — impossible à évaluer                                                                            |
| Tests unitaires proactifs       | ✅        | Test boundary écrit de façon autonome : "pass when confidence score is equals to minTranscriptionConfidence config" |
| Edge cases trouvés              | ✅        | Bug `<=` vs `<` trouvé via le cas limite confidence = 0.6                                                           |
| Pragmatisme (brute force first) | ✅        | `processBatch` : for loop simple et lisible, pas de sur-ingénierie                                                  |
| IA challengée                   | N/A      | —                                                                                                                   |
| Objectif final atteint          | ✅        | 5/5 tests verts, `processBatch` implémentée correctement                                                            |


Impression d'ensemble : code propre, bug trouvé par la bonne méthode (test ciblé sur boundary condition), logique correcte. La principale inconnue reste le thinking out loud — sans transcript, impossible de valider ce signal critique.

---

## 💻 Code Review

### Points forts

- Bug corrigé proprement : `<=` → `<` dans `validateTranscription`
- `processBatch` : initialisation correcte avec valeurs à 0, `?? 0` pour les clés absentes de `failuresByStep`
- `if / else` sur `validated / reviewNeeded` — mutually exclusive, pas de double comparaison inutile
- `processDocument` : early return propre à chaque étape

### Ce qu'un senior Alan dirait en PR review

1. `**;` après la `for` loop** (`};`) — pas une erreur mais inhabituel. Pas de `;` après un bloc `{}`.
2. **Tests de `validateExtraction` absents** — tu couvres `transcription` et `classification` mais pas `extraction` (champ requis manquant, `complete: false`). Ce sont des cas importants.
3. **Minor** : résultat de `validateTranscription/Classification/Extraction` appelé et comparé en ligne — lisible ici, mais si le calcul était coûteux, stocker dans une variable serait mieux.

### ⏱️ Complexity Analysis


| Fonction                 | Complexité temps | Complexité espace | Note                                                                                                                                 |
| ------------------------ | ---------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `validateTranscription`  | O(1)             | O(1)              | Comparaison simple, aucune itération                                                                                                 |
| `validateClassification` | O(1)             | O(1)              | Comparaison simple, aucune itération                                                                                                 |
| `validateExtraction`     | O(f)             | O(1)              | f = nombre de `requiredFields` — boucle sur les champs requis                                                                        |
| `processDocument`        | O(f)             | O(1)              | Dominé par `validateExtraction`, les autres étapes sont O(1)                                                                         |
| `processBatch`           | O(n × f)         | O(n)              | n = nombre de documents, f = nombre de champs requis. O(n) en espace pour stocker les résultats intermédiaires via `processDocument` |


La complexité est parfaitement acceptable pour ce contexte — les documents sont traités indépendamment, pas de structure de données complexe, pas de nested loop cachée. En vrai entretien, tu aurais pu dire :

> *"Ma solution est O(n) sur le batch — chaque document est traité en temps constant si le nombre de `requiredFields` est borné, ce qui est toujours le cas en pratique. Si on passait à des millions de documents, on parlerait de parallélisation, mais pour l'instant c'est hors scope."*

---

## 🇬🇧 English

Pas de transcript cette session — section skippée. À activer dès la prochaine session.

---

## 🔁 1 chose à corriger demain

**Enregistre-toi et colle le transcript.**

Alan rejette les candidats qui codent en silence — même si le code est bon. La prochaine session : micro ouvert, transcript collé dans `transcript.md`. C'est le seul signal qu'on ne peut pas évaluer sans.