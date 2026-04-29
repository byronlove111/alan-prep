# Debrief — Tech Challenge — 29/04/2026

## 🎯 Signaux Alan


| Signal                          | Résultat | Preuve (citation)                                                                                                                                                                               |
| ------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Thinking out loud               | ✅        | Narration constante — "my first reflex is to create a test that shows that we have a bug", "I don't understand why the minus one was the problem, I just removed it to see if it was a problem" |
| Tests unitaires proactifs       | ✅        | Bug identifié via `main.ts`, test écrit AVANT la correction : "I will implement a new test in test-runner just to show that we have this problem"                                               |
| Edge cases trouvés              | ✅        | Test `empty acts`, test `Pr.` vs `Dr.` — deux edge cases pertinents identifiés et testés                                                                                                        |
| Pragmatisme (brute force first) | ✅        | "This will not be clean code, my first idea is to just make an if condition" → bonne approche, refacto ensuite                                                                                  |
| IA challengée (si utilisée)     | ⚠️       | AI utilisée pour comprendre `slice` — "I will just ask the AI to explain how we use slice" — mais pas de mention si l'output a été challengé                                                    |
| Objectif final atteint          | ✅        | 8/8 tests passent — bug fixé, extension `Pr.` implémentée et testée                                                                                                                             |


**Impression générale** : Nette progression par rapport à lundi. Le réflexe "test d'abord, fix ensuite" est maintenant en place — c'est le signal le plus important chez Alan. La narration est présente et compréhensible tout au long. L'objectif est pleinement atteint.

---

## 💻 Code Review

### Ce qui est bien

**Bug trouvé et fixé via test** — l'ordre est bon : observe le problème dans `main.ts`, écrit le test qui le prouve, puis cherche dans le code. C'est exactement la méthodologie attendue.

**Extraction dans une fonction dédiée** — `extractDoctorName` est une bonne décision. La logique de parsing du médecin est isolée, testable séparément, et extensible.

**Tests cohérents** — `samplePrescriptionWithProfessor` comme fixture séparée pour le test `Pr.` est propre.

**Test empty acts** — bonne initiative de gérer le cas sans actes.

### Ce qu'un senior Alan engineer dirait en PR review

**1. `slice(0, actLines.length)` est identique à `actLines` seul**

```typescript
// Ce que t'as écrit :
const acts = actLines.slice(0, actLines.length).map(parseAct);

// Équivalent à :
const acts = actLines.map(parseAct);
```

Le fix est correct dans ses effets mais laisse du code redondant. En PR ça se fait noter.

**2. `console.log` dans `parseAct` non supprimé**
La version finale avait toujours un `console.log(line)` dans `parseAct` — tu l'as peut-être enlevé entre temps, mais à vérifier. Les logs de debug en production se font rejeter en review chez Alan.

**3. `extractDoctorName` : le `if (line.includes("Dr"))` est trop large**
"Pr" contient "r" donc si jamais un nom de médecin commence par "Dr" dans le champ patient par exemple, ça peut matcher par erreur. Plus robuste :

```typescript
if (line.includes("Dr."))  // avec le point — plus précis
```

**4. Le fix du bug aurait pu être commenté**
La ligne `actLines.slice(0, actLines.length - 1)` → fix → `actLines.slice(0, actLines.length)` est peu lisible sans contexte. Un commentaire `// Bug: was slice(0, length - 1) which dropped the last act` aurait documenté l'intention.

---

## 🇬🇧 English

> 🗣️ "I don't know how we say it in English but we have an ordinance"
> 🇬🇧 En interview : *"We receive medical prescriptions as raw text — the goal is to parse them into structured data for the reimbursement pipeline."*

> 🗣️ "My first reflex is to create a test that shows that we have a bug"
> 🇬🇧 En interview : *"Before touching the code, I want to write a failing test that reproduces the bug — that way I know exactly when it's fixed."*

> 🗣️ "This will not be clean code, my first idea is to just make an if condition"
> 🇬🇧 En interview : *"I'll go with a simple if/else first — I can refactor once it's working."*

> 🗣️ "I think I finished. To summarize what I did..."
> 🇬🇧 En interview : *"To wrap up: I identified the bug by observing the output, wrote a failing test to confirm it, fixed the off-by-one in `slice`, then extended the parser to handle professor titles. All 8 tests pass."*

**3 termes à connaître en anglais :**


| Français                         | Anglais                                   |
| -------------------------------- | ----------------------------------------- |
| Ordonnance médicale              | Medical prescription                      |
| Acte médical                     | Healthcare act / medical act              |
| Enlever les espaces dans un code | Normalize the act code / strip whitespace |


---

## 🔁 1 chose à corriger demain

**Nettoie le code avant de déclarer victoire.**

T'as laissé `slice(0, actLines.length)` au lieu de `actLines.map(...)`, et potentiellement un `console.log` dans `parseAct`. Dans un vrai entretien, quand tu dis "j'ai fini", l'interviewer relit le code — du dead code ou des logs oubliés ça se voit immédiatement. Avant de dire "done", prends 2 minutes de relecture : supprime les logs, les variables inutilisées, et simplifie les expressions redondantes.