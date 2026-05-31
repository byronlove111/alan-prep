# Analyseur de taux de remboursement — Test technique

**Durée :** 1h30
**Langage :** TypeScript
**Framework de test :** Jest (déjà configuré)

---

### Contexte

Chez Alan, les membres déposent des factures de soins et l'équipe ops suit l'évolution du **taux de remboursement** dans le temps. L'interface affiche déjà un graphique — votre rôle est de fournir les bonnes données à partir des factures historiques.

---

### Votre mission

Implémenter la fonction `analyzeReimbursementHistory` dans le fichier `src/analyzer.ts`.

---

### Types de données

Les types suivants vous sont fournis (ne pas les modifier) :

```
ClaimSnapshot
  - date: Date
  - reimbursedAmount: number  (montant remboursé en euros)
  - claimedAmount: number     (montant facturé en euros)

ReimbursementLevel
  - "Faible"   → taux strictement inférieur à 50
  - "Moyen"    → taux supérieur ou égal à 50 et strictement inférieur à 80
  - "Élevé"    → taux supérieur ou égal à 80

ReimbursementAnalysis
  - date: Date
  - reimbursementRate: number       (en pourcentage, arrondi à 2 décimales)
  - level: ReimbursementLevel
  - changePercent: number | null    (null pour le premier élément)
```

---

### Fonction à implémenter

```
analyzeReimbursementHistory(snapshots: ClaimSnapshot[]): ReimbursementAnalysis[]
```

Cette fonction prend un **tableau de factures**, triées chronologiquement, et retourne un tableau de résultats où chaque entrée correspond à une facture.

**Pour chaque facture, vous devez :**

1. Calculer le taux de remboursement : `(reimbursedAmount / claimedAmount) * 100`
2. Déterminer le niveau selon les seuils définis ci-dessus
3. Calculer la variation en pourcentage du **taux** par rapport à la **facture immédiatement précédente** : `((taux_B - taux_A) / taux_A) * 100`
4. Pour la **première facture**, `changePercent` doit être `null`

---

### Règles & contraintes

- Ne pas modifier les types fournis
- Ne pas modifier le fichier de tests
- Vous pouvez ajouter des fonctions utilitaires privées dans `src/analyzer.ts`
- La fonction doit gérer les cas limites sans lever d'exception non gérée
- Les montants des tests sont toujours strictement positifs

---

### Tests

Sept tests unitaires sont fournis dans `src/analyzer.test.ts`. L'objectif est de les faire tous passer.

Les tests couvrent les scénarios suivants — **lisez-les attentivement avant d'implémenter :**

1. Un tableau vide retourne un tableau vide
2. Une seule facture retourne un résultat avec `changePercent` égal à `null`
3. Deux factures avec un taux croissant produisent un `changePercent` positif
4. Deux factures avec un taux identique produisent un `changePercent` égal à `0`
5. Un taux exactement égal à `50.0` est catégorisé `"Moyen"`, et non `"Faible"`
6. Un taux exactement égal à `80.0` est catégorisé `"Élevé"`, et non `"Moyen"`
7. Un tableau de 3 factures ou plus calcule chaque `changePercent` par rapport à l'**entrée précédente**, et non par rapport à la première

> ⚠️ Portez une attention particulière aux tests 5, 6 et 7 — la gestion des bornes et des indices est une source d'erreur fréquente.

---

### Critères d'évaluation

- Les 7 tests passent
- Clarté et lisibilité du code
- Bonne gestion des cas limites
- Qualité des éventuelles fonctions utilitaires introduites

---

*Bonne chance — le dashboard ops attend ses données.*
