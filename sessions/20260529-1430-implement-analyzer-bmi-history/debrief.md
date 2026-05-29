# Debrief — Analyseur d'historique IMC

## Résultat tests

**9/9 tests passent** (7 fournis + 2 ajoutés par toi : IMC décroissant + catégorie Normal).

---

## Ce que le transcript montre

### Points forts

- **Tu lis avant de coder** — brief → types → tests → implémentation. C'est exactement le bon ordre en entretien.
- **Tu cherches le pourquoi** — tu insistes sur le contexte dashboard et l'usage patient avant d'écrire du code. Bien vu à [03:55–05:35].
- **Tu t'appuies sur les tests** — tu les lis pour comprendre la feature avant l'implémentation [08:33]. En entretien, c'est autorisé et même attendu.
- **Tu prends l'initiative** — tu ajoutes des tests manquants (changePercent négatif, catégorie Normal) [09:18–15:48]. Ça montre que tu réfléchis aux cas, pas seulement au vert/rouge.
- **Tu débloques par itération** — quand tu te sens bloqué sur `changePercent`, tu demandes de l'aide, tu corriges l'arrondi BMI, et ça passe. Bon réflexe d'apprentissage.

### Moments de friction (normaux)

| Moment transcript | Problème | Ce que ça révèle |
|---|---|---|
| [25:32] "I thought I needed only the last measure" | Confusion tableau → un résultat par mesure | Tu as corrigé vite — relire le type de retour `AnalysisResult[]` aide |
| [18:22] spread operator sur le tableau | `measurements` est un `[]`, pas un objet | Confusion array vs object — résolu avec `for...of` |
| [27:10] float 0.002 | taille en **cm** non convertie en **m** | Piège classique — relire les unités dans l'énoncé |
| [43:53] "too complex, one loop for two things" | BMI + changePercent dans la même boucle | Tu as bien choisi de **séparer en 2 boucles** — code plus lisible |
| [59:49] changePercent incorrect | `Math.round()` arrondissait à l'entier (21 au lieu de 20.76) | La logique changePercent était bonne ; le bug était en amont |

### Usage de l'AI

Tu l'utilises surtout pour **comprendre le métier** (changePercent, variation entre visites) — pas pour générer la solution. En entretien Doctolib/Alan, poser 1–2 questions ciblées à l'interviewer sur un point flou de l'énoncé est équivalent et même mieux perçu.

---

## Code

### Ce qui fonctionne

```typescript
// BMI : conversion cm → m + arrondi 2 décimales ✅
const heightInMeters = measurement.height / 100;
const bmi = Math.round(measurement.weight / (heightInMeters * heightInMeters) * 100) / 100;

// Catégories : bornes correctes (25 → Surpoids, 30 → Obèse) ✅
if (bmi < 25) { ... } else if (bmi >= 25 && bmi < 30) { ... }

// changePercent : compare à i-1, null pour i=0 ✅
analysisResults[i].changePercent = ((analysis.bmi - lastAnalysis.bmi) / lastAnalysis.bmi) * 100;
```

Structure claire : **boucle 1** = calculer et pousser, **boucle 2** = enrichir avec changePercent. Pragmatique et lisible.

### À nettoyer avant un vrai entretien

- Retirer le `console.log(bmi)` (ligne 11) — pollue Jest et fait junior en review.
- Retirer le bloc de test manuel en bas du fichier (lignes 46–51) — ne doit pas vivre dans le fichier de prod.
- Le `try/catch` mentionné dans le transcript n'est pas nécessaire ici (pas de crash possible avec les données des tests).

### Amélioration optionnelle (pas obligatoire)

Extraire 2 petites fonctions privées rendrait le code plus "review-ready" :

```typescript
function computeBmi(weight: number, heightCm: number): number { ... }
function getCategory(bmi: number): BmiCategory { ... }
```

Pas urgent — ton code actuel passe tous les tests et se lit bien.

---

## Écart transcript ↔ code

| Tu disais | Code final |
|---|---|
| "less or equal than 25 → Normal" [36:49] | `bmi < 25` → Normal ✅ (correct pour l'énoncé) |
| "try catch" [37:40] | pas implémenté — OK, pas utile ici |
| "two loops is cleaner" [43:53] | exactement ce que tu as fait ✅ |

Tu as bien suivi ton instinct de simplifier quand la première approche devenait trop complexe.

---

## Pour l'entretien

1. **Lis les tests 5, 6, 7 avant la première ligne de code** — bornes (`>= 25`, `>= 30`) et comparaison à `i-1`. Tu les as découverts en chemin ; en entretien, ça te ferait gagner 10–15 min.

2. **Vérifie les unités dès que tu vois une formule** — cm vs mètres, kg vs g. C'était ton plus gros piège technique. Note mentale : *height en cm → `/ 100` avant le carré*.

3. **Arrondi = lire l'énoncé** — "2 décimales" ≠ entier. Quand un test numérique échoue de peu (20.42 vs 19.05), regarde d'abord la précision des valeurs intermédiaires, pas la formule de pourcentage.

4. **Garde ton rituel** — brief → types → tests → POC → edge cases. C'est solide. En entretien, annonce-le à voix haute : *"Je vais d'abord lire les tests pour comprendre les cas attendus."*

5. **Nettoie avant de dire "j'ai fini"** — supprime les `console.log` et le code de debug. C'est le détail qui fait la différence en review finale.

---

## Verdict

Exercice **réussi**. Tu as livré une solution correcte, tu as ajouté des tests pertinents, et ton transcript montre un raisonnement structuré avec des blocages normaux que tu as surmontés. Pour le jour J : même process, mais attaque les pièges bornes/unités/arrondi **avant** de coder, et nettoie le fichier à la fin.
