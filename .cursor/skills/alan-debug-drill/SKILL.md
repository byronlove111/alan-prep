---
name: alan-debug-drill
description: Generates a TypeScript + SQLite debug exercise: the user writes the SQL from scratch, then debugs and improves a partially-broken TypeScript service. Use when the user says /alan-debug-drill or wants to practice SQL + debugging.
---

# Alan Debug Drill

Exercice en deux parties :
1. **SQL from scratch** — `model.ts` est vide, l'utilisateur écrit la requête de zéro
2. **Debug + amélioration** — `service.ts` tourne mais a des bugs et du code perfectible à corriger

## Context loading — lire avant chaque session

- `docs/alan-context.txt`
- `docs/blog-articles.txt`

## Préférences utilisateur

- Pas de `changePercent`, pas de pourcentages
- Pas de `strftime` ni de fonctions SQL cryptiques
- Pas d'alias SQL (pas de `c.`, `d.`)
- Pas de regex en TypeScript
- Boucles `for` plutôt que `reduce`
- Lisible junior
- SQLite uniquement, SQL brut

## Domaines à utiliser (tirés des docs Alan)

Exemples de sujets frais :

- **Blocked movements** : mouvements d'emploi bloqués, réconciliation d'identités
- **Document pipeline** : validation de statut de document, classement par catégorie
- **Fraud investigation** : filtrage de pièces justificatives par statut
- **Eligibility** : vérification de couverture par plan et date
- **Reimbursement routing** : tri de remboursements par pays / type d'acte
- **Operator queue** : file d'attente d'opérateurs avec priorités et assignation

NE PAS proposer des sujets déjà utilisés dans les sessions récentes du dossier `sessions/`.

## Step 0 — Proposer 3 sujets

Format :

```text
3 exercices debug-drill — choisis-en un :

**A — [domaine]**
[2 lignes : ce que fait la DB, ce qui est cassé dans le service]

**B — [domaine]**
[idem]

**C — [domaine]**
[idem]
```

Attendre le choix avant de générer.

## Step 1 — Structure de session

```text
sessions/YYYYMMDD-HHmm-debug-drill-[slug]/
  db/
    schema.sql      ✅ complet
    seed.sql        ✅ complet
  src/
    types.ts        ✅ complet
    testDb.ts       ✅ complet
    model.ts        ❌ VIDE — utilisateur écrit le SQL de zéro
    service.ts      ⚠️  présent mais buggé — utilisateur debug + améliore
    service.test.ts ✅ complet — ne pas modifier
  BRIEF.md
  transcript.md
  package.json
  tsconfig.json
```

## Step 2 — Règles de génération

**`model.ts`**
- Vide, juste les imports et la signature de fonction
- Aucun stub SQL, aucun commentaire d'aide
- L'utilisateur part de zéro

**`service.ts`**
- Implémentation complète mais avec exactement **3 bugs** : 1 logique, 1 typage / cast, 1 cas limite non géré
- Ajouter un commentaire `// TODO: améliore cette fonction` sur une fonction qui marche mais est perfectible (lisibilité, duplication, cas non couverts)
- Ne jamais mettre `// BUG` ou signaler où sont les bugs

**`service.test.ts`**
- Exactement **6 tests**
- Tests 1-4 : comportement nominal — doivent passer une fois model.ts + bugs corrigés
- Tests 5-6 : cas limites — échouent jusqu'à ce que les bugs soient résolus
- Utiliser `createTestDatabase()` de `testDb.ts`
- `afterEach(() => db.close())`

**DB**
- 2 tables max
- Seed minimal mais couvrant les 6 scénarios

**Types**
- Statuts en union string littérale : `"pending" | "resolved" | "blocked"` etc.
- Pas de `number` flottant calculé dans les types — juste des counts, ids, strings, dates

## Step 3 — BRIEF.md

Sections :
- Contexte métier (2-3 lignes)
- Schéma DB (tables + relation)
- Ce que tu dois faire :
  - Partie 1 : écrire le SQL dans `model.ts`
  - Partie 2 : trouver et corriger les bugs dans `service.ts` + améliorer le TODO
- Les 6 scénarios de tests (juste les titres, sans indice)
- Contraintes

**Ne jamais donner d'indice sur où sont les bugs ni comment structurer le SQL.**

## Step 4 — Après génération

```bash
cd sessions/YYYYMMDD-HHmm-debug-drill-[slug]
npm install
npm test
```

Baseline attendue : TypeScript compile, DB monte, tests échouent proprement.

Puis présenter :

```text
✅ Setup done.

📋 Brief dans BRIEF.md
🗄️  Lis db/schema.sql et db/seed.sql avant de coder
✏️  Partie 1 : écris le SQL dans src/model.ts (de zéro)
🐛  Partie 2 : trouve et corrige les bugs dans src/service.ts + améliore le TODO
🧪  6 tests dans src/service.test.ts — ne les modifie pas
🎙️  Parle à voix haute → transcript.md
🔚  Dis-moi quand tu as fini pour le debrief
```

## Step 5 — Coaching (si bloqué)

SQL bloqué : "Quelles tables tu dois lire ? Quel est le lien entre elles ?"
Bug bloqué : "Quel test échoue ? Qu'est-ce que le test attend vs ce que la fonction retourne ?"
Ne jamais donner la solution.

## Step 6 — Debrief

1. Lancer `npm test`
2. Lire `transcript.md`
3. Relire `service.ts` — les bugs ont-ils tous été trouvés ? Le TODO amélioré ?
4. Écrire `debrief.md` : qualité du SQL, bugs trouvés/manqués, lisibilité du service, axes à travailler
