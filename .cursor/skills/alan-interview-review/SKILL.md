---
name: alan-interview-review
description: Reviews a technical interview session for Alan preparation. Takes a transcript and/or code, evaluates Alan-specific signals and English quality, gives concrete feedback. Use after /alan-tech-challenge or any Alan interview practice session, or when the user pastes a transcript or code to review.
---

# Alan Interview Review

Universal review skill. Used after every practice session — coding, feature design, fit questions, screening. Takes a transcript (oral session recorded and transcribed) and optionally the code written during the session.

## What Alan actually evaluates (source: Alan's process docs and live interview debrief)

**Positive signals — what they want to see:**
- Thinking out loud constantly: narrating reasoning, naming doubts, explaining decisions in real time
- Writing unit tests proactively at each step — not waiting to be asked
- Finding the bug via edge cases and targeted tests, not by luck
- Naming performance / architecture problems without fixing them immediately ("je vois que la complexité va exploser, je mets ça de côté pour l'instant")
- Using AI critically — prompting precisely, then challenging and verifying the output
- Listening to the interviewer and adjusting direction when nudged
- Reaching the expected endpoint within the time

**Eliminating factors — what gets you rejected:**
- Coding in silence: no communication at all
- Not reaching the expected endpoint of the exercise
- Not listening when the interviewer redirects you
- Using AI blindly without questioning its output
- Over-engineering: trying to implement Levenshtein, trees, or fancy algorithms instead of brute force

## Review structure

First, detect the session type from context: `tech` (coding exercise) | `feature-design` | `fit` | `screening` | `past-project`. Then produce exactly these 4 sections, adapting the signals table to the session type.

---

### 🎯 Signaux Alan

Assess each signal with a quote from the transcript (or code) as evidence. Be direct. Use N/A for signals that don't apply to this session type.

**If `tech` session:**

| Signal | Résultat | Preuve (citation) |
|--------|----------|-------------------|
| Thinking out loud | ✅ / ⚠️ / ❌ | cite a specific moment |
| Tests unitaires proactifs | ✅ / ⚠️ / ❌ | cite a specific moment |
| Edge cases trouvés | ✅ / ⚠️ / ❌ | cite a specific moment |
| Pragmatisme (brute force first) | ✅ / ⚠️ / ❌ | cite a specific moment |
| IA challengée (si utilisée) | ✅ / ⚠️ / N/A | cite a specific moment |
| Objectif final atteint | ✅ / ⚠️ / ❌ | state what was reached |

**If `feature-design` session:**

| Signal | Résultat | Preuve (citation) |
|--------|----------|-------------------|
| Questions clarifiantes avant de plonger | ✅ / ⚠️ / ❌ | cite a specific moment |
| Raisonnement structuré (haut niveau → détail) | ✅ / ⚠️ / ❌ | cite a specific moment |
| Trade-offs explicités et justifiés | ✅ / ⚠️ / ❌ | cite a specific moment |
| Failure scenarios et edge cases considérés | ✅ / ⚠️ / ❌ | cite a specific moment |
| Communication (collaborateur, pas juge) | ✅ / ⚠️ / ❌ | cite a specific moment |

**If `fit` or `screening` session:**

| Signal | Résultat | Preuve (citation) |
|--------|----------|-------------------|
| Exemples concrets (pas de généralités) | ✅ / ⚠️ / ❌ | cite a specific moment |
| Ownership personnelle ("j'ai décidé" vs "on a fait") | ✅ / ⚠️ / ❌ | cite a specific moment |
| Outcomes mentionnés (résultats, impact) | ✅ / ⚠️ / ❌ | cite a specific moment |
| Alignement avec les valeurs Alan | ✅ / ⚠️ / ❌ | cite a specific moment |
| Communication directe et claire | ✅ / ⚠️ / ❌ | cite a specific moment |

**If `past-project` session:**

| Signal | Résultat | Preuve (citation) |
|--------|----------|-------------------|
| Profondeur technique (décisions, trade-offs) | ✅ / ⚠️ / ❌ | cite a specific moment |
| Ownership des décisions | ✅ / ⚠️ / ❌ | cite a specific moment |
| Clarté de l'explication architecturale | ✅ / ⚠️ / ❌ | cite a specific moment |
| Recul et hindsight authentique | ✅ / ⚠️ / ❌ | cite a specific moment |
| Structure (contexte → rôle → tech → outcome) | ✅ / ⚠️ / ❌ | cite a specific moment |

Then 2-3 sentences of overall impression from an interviewer's perspective.

---

### 💻 Code Review

Only if code was provided. Assess:
- Did they write tests for each new case they implemented?
- Did they find and fix the intentional bug?
- Is the logic correct at boundary conditions (first/last element, empty input)?
- Did they reach the final goal (e.g. handling 2 simultaneous typos)?
- What would a senior Alan engineer say about this code in a PR review?

Be specific. Quote lines if needed.

#### ⏱️ Complexity Analysis

Only for `tech` and `build-feature` sessions. Analyse the time and space complexity of each non-trivial function the user wrote or modified. Format:

| Fonction | Complexité temps | Complexité espace | Note |
|----------|-----------------|-------------------|------|
| `functionName` | O(...) | O(...) | brief explanation |

Then add 1-2 sentences on whether the complexity is acceptable for the exercise context, and what the user should say out loud in a real interview to name the trade-off without fixing it (e.g. "Je vois que cette approche est O(n²) — dans un vrai système avec des milliers de claims, je passerais par un index. Pour l'instant je mets ça de côté.").

---

### 🇬🇧 English

The written essay is in English. Interviews can be in English. This section bridges the gap.

Pick 4-5 key moments from the transcript where the user explained their reasoning. Show:
1. What they said (in French if that's how they practiced)
2. How to say the same thing clearly in English for an interview context

Then flag 3 technical terms or concepts they used that they must know in English for the written essay.

Example format:
> 🗣️ Tu as dit : *"je vais mettre ça de côté pour l'instant et y revenir après"*
> 🇬🇧 En interview : *"I'll flag this as a potential performance concern and come back to it once the core logic is working."*

---

### 🔁 1 chose à corriger demain

One specific, actionable thing to work on in the next session. Not a list — just one. The most impactful gap from this session.

---

## Input format

The user will paste one or both of:
- **Transcript**: their oral session recorded and auto-transcribed (may be messy/informal)
- **Code**: their final code from the session

If only transcript → skip Code Review section.
If only code → skip English section, focus on Code Review and infer what you can about signals from the code structure (tests written, edge cases handled, etc.).

## Output

After producing the review, write the full debrief to `debrief.md` in the session folder (e.g. `sessions/YYYYMMDD-HHmm-tech-challenge/debrief.md`). If the session folder is not obvious from context, ask the user which session this review is for.
