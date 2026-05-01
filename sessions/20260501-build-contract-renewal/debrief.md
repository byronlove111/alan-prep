# Debrief — Build Feature — Contract Renewal Checker — 01/05/2026

## Session

- **Exercice** : Contract Renewal Checker (business-rules · contracts)
- **Tests** : 12/12 ✅ (6 existants + 5 fournis + 1 proactif boundary)

---

## 🎯 Signaux Alan


| Signal                          | Résultat | Preuve                                                                                                                                                                            |
| ------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Thinking out loud               | ✅        | [01:34] "I found out that in utils.ts there is a function named daysBetween who can be useful" — exploration narrée en temps réel                                                 |
| Tests unitaires proactifs       | ✅        | [27:37] Tests écrits spontanément. 1 test de boundary avec 3 contrats dédiés (CTR-006/007/008)                                                                                    |
| Edge cases trouvés              | ✅        | [28:33] "perfectly, minus 14, minus 14.8, minus 30" — boundary conditions ±14 et ±30 identifiées et testées                                                                       |
| Pragmatisme (brute force first) | ✅        | [06:10] "I'm just gonna erase everything because I don't need to make another function" — auto-correction vers la simplicité                                                      |
| IA challengée                   | ⚠️       | Questions ciblées (comparaison de dates, typage) → bon. Mais debug d'erreurs runtime délégué à l'IA au lieu d'investiguer seul (args inversés, `const` vs `let`, import manquant) |
| Objectif final atteint          | ✅        | 12/12 tests verts                                                                                                                                                                 |


Impression d'ensemble : session solide. Exploration de la codebase avant de coder, narration du raisonnement, tests proactifs sur les boundary cases. Les déblocages (imports manquants, args inversés) prennent du temps mais sont résolus seul.

---

## 💻 Code Review

### Points forts

- `findMember`, `parseDate`, `daysBetween`, `isActiveStatus` réutilisés depuis la codebase existante — zéro recodage d'utilitaires
- Logique de signe avec `diff` négatif correcte, `-diff` pour `daysUntilExpiry` juste
- `let urgency: UrgencyLevel` correctement typé

### Ce qu'un senior Alan dirait en PR review

1. `**let urgency: UrgencyLevel = ""`** — `""` n'est pas un `UrgencyLevel` valide. Initialise avec `"ok"` par défaut et supprime le dernier `else if` — inutile si la valeur par défaut est déjà `"ok"`.
2. `**as RenewalNotice` inutile** — l'objet respecte déjà l'interface. Retire le cast.
3. **Crash silencieux si membre introuvable** — `findMember` retourne `Member | null` mais tu assignes sans guard. Ajoute `if (!member) continue` avant le push.
4. **Nom du test vague** — `"check every limit cases of expiry date"` → préfère `"classifies urgency at exact boundary: 14 days → critical, 30 days → warning, 31 days → ok"`.

### ⏱️ Complexity Analysis


| Fonction        | Complexité temps | Complexité espace | Note                                                                                   |
| --------------- | ---------------- | ----------------- | -------------------------------------------------------------------------------------- |
| `checkRenewals` | O(n × m)         | O(n)              | n = contrats, m = membres. `findMember` fait une recherche linéaire à chaque itération |
| `findMember`    | O(m)             | O(1)              | Recherche linéaire dans la liste de membres                                            |


La complexité O(n × m) est acceptable ici. En entretien, tu aurais dû dire :

> *"Je vois que mon findMember fait une recherche linéaire dans la boucle — donc O(n × m) au total. Si on avait des milliers de membres, je pré-indexerais les membres par ID dans un Record pour avoir du O(1) par lookup. Pour l'instant je mets ça de côté."*

---

## 🇬🇧 English

> 🗣️ *"I really understood what was the data that I had in input of this function"*
> 🇬🇧 En interview : *"Before writing anything, I read through the types to understand exactly what data I'm working with as input and what shape I need to return."*

> 🗣️ *"I knew that I will need to create a function comparison between two dates — so I found out that in utils.ts there is a function named daysBetween"*
> 🇬🇧 En interview : *"I knew I'd need date comparison logic, so I checked utils.ts first — and found daysBetween already implemented. No need to reinvent it."*

> 🗣️ *"I'm just gonna erase everything because I don't need to make another function"*
> 🇬🇧 En interview : *"I was starting to over-complicate this — I pulled back and went with a simpler approach: a single loop, no helper function needed."*

> 🗣️ *"We're dealing with negative numbers, so we need to make sure the if statement is comparing superior and not less"*
> 🇬🇧 En interview : *"Since daysBetween returns a negative value when the end date is in the future, I need to flip my comparisons — checking for >= -14 instead of <= 14."*

> 🗣️ *"Perfectly, minus 14, minus 14.8, minus 30 — I'm just gonna create new tests"*
> 🇬🇧 En interview : *"I want to cover the exact boundary values — 14 days, 30 days — to make sure my urgency classification doesn't have off-by-one errors."*


| Français                  | Anglais                       |
| ------------------------- | ----------------------------- |
| Date d'expiration         | Expiry date / expiration date |
| Renouvellement de contrat | Contract renewal              |
| Cas limite                | Boundary case                 |


---

## 🔁 1 chose à corriger demain

**Nomme le trade-off de complexité à voix haute pendant la session.**

Tu as construit une solution O(n × m) sans jamais le mentionner. En entretien Alan, dès que tu fais une recherche dans une liste à l'intérieur d'une boucle, tu dois sortir la phrase : *"Je vois que c'est O(n × m) — dans un vrai système je pré-indexerais par ID. Pour l'instant je mets ça de côté."* Entraîne-toi à le dire systématiquement.