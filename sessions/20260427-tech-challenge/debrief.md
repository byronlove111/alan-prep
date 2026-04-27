# Debrief — 27 avril 2026 — Tech Challenge

## 🎯 Signaux Alan


| Signal                          | Résultat | Preuve                                                                                 |
| ------------------------------- | -------- | -------------------------------------------------------------------------------------- |
| Thinking out loud               | ⚠️       | Narration fragmentée, phrases incomplètes — dur à suivre pour un interviewer           |
| Tests unitaires proactifs       | ❌        | Zéro nouveau test écrit. Fichier de tests identique à l'original.                      |
| Edge cases trouvés              | ✅        | Bug date identifié à [24:34] : "last claim date is not working"                        |
| Pragmatisme (brute force first) | ✅        | Replace le reduce par une for loop — bonne décision                                    |
| IA challengée                   | ⚠️       | [15:10] IA utilisée sans expliquer ce qui a été demandé ni si l'output a été challengé |
| Objectif final atteint          | ⚠️       | Bug identifié et corrigé ✅ mais syntax error ligne 65 empêche la compilation           |


## 💻 Code Review

**Bug critique ligne 65 :**

```typescript
// ❌
lastClaimDate.toLocaleDateString('us-US'),

// ✅
lastClaimDate: lastClaimDate.toLocaleDateString('fr-FR'),
```

**Ligne 52 :**

```typescript
// ⚠️
let lastClaimDate: Date = null;
// ✅
let lastClaimDate: Date | null = null;
```

**Ligne 59 :** console.log() vide à supprimer.

**Test manquant pour prouver le fix :**

```typescript
test('returns the most recent date, not the lexicographically largest', () => {
  const batch = `M-001,C23,15/03/2026,25.00
M-001,MK50,02/04/2026,35.00`;
  const result = analyzeBatch(batch);
  expect(result[0].lastClaimDate).toBe('02/04/2026');
});
```

## 🇬🇧 English

🗣️ "I'm just gonna copy it and paste it into the AI"
🇬🇧 "I'm not immediately familiar with this reduce syntax — let me use the AI to clarify it, and I'll verify what it gives me."

🗣️ "I'm gonna recode this function so I'm gonna throw videos and use just a for loop because I think it's more make sense here"
🇬🇧 "I'm going to replace this reduce with a simple for loop — it's easier to reason about and less likely to hide the bug."

🗣️ "I think I finished the exercise, I don't know how should I..."
🇬🇧 "I've fixed the date comparison bug by converting to Date objects before comparing. Let me run the tests to confirm everything holds."

**3 termes à connaître :**

- `lastClaimDate` → most recent claim date
- `dépasser le plafond` → exceed the cap
- `comparer des chaînes alphabétiquement` → lexicographic comparison

## 🔁 À corriger mercredi

**1. Bug-driven testing : écrire le test qui prouve le bug AVANT de fixer**
Dès que tu identifies un bug, l'ordre est :

1. Écrire un test qui montre que c'est faux (il doit **fail**)
2. Fixer
3. Relancer le test (il passe)

Pas d'abord fixer, puis espérer que ça marche. Le test = la preuve. Sans ça, un Alan interviewer ne peut pas valider ton fix.

**2. Structurer l'approche dès le départ**
T'as passé 20 min à lire le code. L'ordre idéal :

- **Run first** → lancer `main.ts` et les tests immédiatement, observer l'output avant de lire quoi que ce soit
- **Read tests second** → les tests sont la spec, ils te disent ce qui est censé marcher
- **Enumerate cases third** → lister à voix haute tous les cas que la fonction doit gérer avant de toucher au code (comme Emma demande "c'est quoi les 3 types de typos ?")
- **Code last** → seulement maintenant tu touches au code

Objectif : max 10 min de lecture/analyse, 35 min de code+tests.