# Analyseur d'historique IMC — Test technique

**Durée :** 1h30
**Langage :** TypeScript
**Framework de test :** Jest (déjà configuré)

---

### Contexte

Chez Doctolib, nous travaillons avec des données médicales qui évoluent dans le temps. Dans cet exercice, vous allez implémenter une fonction centrale utilisée par un tableau de bord de suivi patient. L'interface (déjà implémentée) affiche un graphique représentant l'évolution de l'IMC d'un patient au fil du temps — votre rôle est de lui fournir les bonnes données.

---

### Votre mission

Implémenter la fonction `analyzePatientHistory` dans le fichier `src/analyzer.ts`.

---

### Types de données

Les types suivants vous sont fournis (ne pas les modifier) :

```
PatientMeasurement
  - date: Date
  - weight: number  (en kg)
  - height: number  (en cm)

BmiCategory
  - "Normal"      → IMC strictement inférieur à 25
  - "Surpoids"    → IMC supérieur ou égal à 25 et strictement inférieur à 30
  - "Obèse"       → IMC supérieur ou égal à 30

AnalysisResult
  - date: Date
  - bmi: number                    (arrondi à 2 décimales)
  - category: BmiCategory
  - changePercent: number | null   (null pour le premier élément)
```

---

### Fonction à implémenter

```
analyzePatientHistory(measurements: PatientMeasurement[]): AnalysisResult[]
```

Cette fonction prend un **tableau de mesures patient**, triées chronologiquement, et retourne un tableau d'`AnalysisResult` où chaque entrée correspond à une mesure.

**Pour chaque mesure, vous devez :**

1. Calculer l'IMC selon la formule standard : `poids (kg) / (taille (m))²`
2. Déterminer la catégorie du patient selon les seuils définis ci-dessus
3. Calculer la variation en pourcentage de l'IMC par rapport à la **mesure immédiatement précédente**, selon la formule : `((imc_B - imc_A) / imc_A) * 100`
4. Pour la **première mesure**, `changePercent` doit être `null`

---

### Règles & contraintes

- Ne pas modifier les types fournis
- Ne pas modifier le fichier de tests
- Vous pouvez ajouter des fonctions utilitaires privées dans `src/analyzer.ts`
- La fonction doit gérer les cas limites sans lever d'exception non gérée

---

### Tests

Sept tests unitaires sont fournis dans `src/analyzer.test.ts`. L'objectif est de les faire tous passer.

Les tests couvrent les scénarios suivants — **lisez-les attentivement avant d'implémenter :**

1. Un tableau vide retourne un tableau vide
2. Une seule mesure retourne un résultat avec `changePercent` égal à `null`
3. Deux mesures avec un IMC croissant produisent un `changePercent` positif
4. Deux mesures avec un IMC identique produisent un `changePercent` égal à `0`
5. Un IMC exactement égal à `25.0` est catégorisé `"Surpoids"`, et non `"Normal"`
6. Un IMC exactement égal à `30.0` est catégorisé `"Obèse"`, et non `"Surpoids"`
7. Un tableau de 3 mesures ou plus calcule chaque `changePercent` par rapport à l'**entrée précédente**, et non par rapport à la première

> ⚠️ Portez une attention particulière aux tests 5, 6 et 7 — la gestion des bornes et des indices est une source d'erreur fréquente.

---

### Critères d'évaluation

- Les 7 tests passent
- Clarté et lisibilité du code
- Bonne gestion des cas limites
- Qualité des éventuelles fonctions utilitaires introduites

---

*Bonne chance — le tableau de bord attend ses données.*