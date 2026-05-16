# SQL Primary Keys & Foreign Keys

> **Durée estimée :** 20 minutes  
> **Format :** Lis d'un bout à l'autre. Ne saute pas les questions. C'est prévu pour ça.

---

## 0. Prérequis

Tu sais ce qu'est une table SQL (des lignes et des colonnes, comme un tableur). Tu as déjà vu du SQL basique (`SELECT`, `INSERT`). C'est tout ce qu'il faut.

---

## 1. The Hook

Imagine que tu travailles chez Alan. Tu gères des **membres** (les gens qui ont une assurance) et leurs **bénéficiaires** (leur conjoint, leurs enfants — ceux qui sont couverts par le contrat).

Un jour, ton collègue t'appelle, paniqué :

> *"Byron, on a un problème. Le bénéficiaire `id=42` dans notre base de données… il est rattaché à `member_id='abc123'`. Mais ce membre n'existe pas. On lui a remboursé des soins à quelqu'un qui n'est même pas notre client."*

Combien ça coûte, une fuite comme ça ? Combien ça coûte en réputation ? En légal ?

Ce bug — un bénéficiaire qui pointe vers un membre fantôme — c'est exactement ce que les clés primaires et clés étrangères sont conçues à rendre **impossible**. Physiquement impossible, au niveau de la base de données.

Voyons pourquoi ce problème existe, et comment l'écraser.

---

## 2. Life Without It — The Pain

Tu démarres simple. Deux tables dans ton tableur (ou ta BDD) :

**Table `members`**

| id | first_name | last_name |
|----|------------|-----------|
| abc123 | Sophie | Martin |
| def456 | Luc | Bernard |

**Table `beneficiaries`**

| id | member_id | first_name |
|----|-----------|------------|
| 1 | abc123 | Emma |
| 2 | def456 | Paul |
| 3 | xyz999 | Ghost ??? |

**Problème 1 — L'orphelin.** La ligne 3 pointe vers `xyz999`. Ce membre n'existe pas. C'est un bénéficiaire fantôme. La BDD ne dit rien. Aucune erreur. Juste une donnée corrompue en silence.

**Problème 2 — La suppression dangereuse.** Tu supprimes Sophie Martin de `members`. Ses bénéficiaires existent encore dans la table, ils pointent maintenant vers le vide. Boom, des orphelins de plus.

**Problème 3 — Les doublons.** Deux membres ont le même `id` ? La BDD dit merci, elle insère les deux. Maintenant lequel est le vrai ?

**Problème 4 — Trouver "le bon".** Ton collègue te dit "modifie le membre abc123". Il y en a trois avec cet ID. Lequel tu modifies ?

> Ces quatre problèmes ont un nom : **l'intégrité référentielle**. Et ils sont tous résolus par deux concepts simples.

---

## 3. The Invention Story

*On est en 1970. Edgar F. Codd, chercheur chez IBM, observe que les programmeurs passent 80% de leur temps à écrire du code défensif — vérifier que les données sont cohérentes, que les références sont valides, que les IDs sont uniques.*

Il se pose une question radicale : **et si la base de données elle-même garantissait ces règles ? Et si c'était impossible d'insérer des données invalides ?**

Son idée :

1. **Chaque table doit avoir une colonne qui identifie chaque ligne de façon unique.** Un "passeport" pour chaque ligne. Impossible d'avoir deux lignes avec le même passeport. Impossible d'avoir une ligne sans passeport. → **La clé primaire (PRIMARY KEY)**

2. **Quand une table référence une autre, la base doit vérifier que la référence existe.** Si tu dis "ce bénéficiaire appartient au membre abc123", la BDD doit refuser l'insertion si abc123 n'existe pas. → **La clé étrangère (FOREIGN KEY / REFERENCES)**

Ce n'est pas une innovation technique. C'est une **contrainte philosophique** : les règles métier vivent dans la base, pas dans le code applicatif.

Eurêka ? Le code applicatif n'a plus besoin de vérifier. La BDD le fait à ta place. **Toujours. Sans exception. Sans bug humain.**

---

## 4. The Core Idea — One Sentence

> Une **clé primaire** garantit que chaque ligne est unique et identifiable. Une **clé étrangère** garantit qu'une référence vers une autre table pointe vers quelque chose qui existe vraiment.

---

## 5. Think of It Like... (3 Analogies)

### Analogie 1 — Le numéro de Sécurité Sociale (Domaine : administratif)

En France, chaque personne a un numéro de Sécu. 15 chiffres, unique au monde, attribué à la naissance, jamais réutilisé.

- **Unique** : deux personnes ne peuvent pas avoir le même numéro.
- **Non-nul** : tu ne peux pas exister dans le système sans numéro.
- **Identifiant** : si quelqu'un dit "je veux les infos du 1 84 05 75 123 456 78", tu sais exactement de qui il parle.

C'est exactement la `PRIMARY KEY`. C'est le numéro de Sécu de chaque ligne de ta table.

`AUTOINCREMENT` ? C'est comme si l'état attribuait automatiquement le prochain numéro disponible à chaque naissance. Tu n'as pas à y penser.

---

### Analogie 2 — La clé USB et le port (Domaine : physique / hardware)

Une clé USB ne rentre que dans un port USB. Tu ne peux pas brancher une clé USB dans une prise électrique. La forme physique *contraint* ce qui est possible.

Une `FOREIGN KEY`, c'est pareil : la colonne `member_id` dans `beneficiaries` ne peut contenir *que* des valeurs qui existent dans la colonne `id` de `members`. La "forme" est contrainte. Tu ne peux pas brancher un ID fantôme dedans.

Si tu essaies d'insérer `member_id = 'xyz999'` alors que `xyz999` n'existe pas dans `members` : **ERREUR**. La BDD refuse. Pas de données corrompues.

---

### Analogie 3 — Le bulletin de vote (Domaine : civique)

Dans une élection, tu ne peux voter que pour des candidats **officiellement enregistrés**. Si tu écris un nom qui n'est pas sur la liste, ton bulletin est nul.

La liste des candidats = la table `members` avec ses `PRIMARY KEY`.  
Ton bulletin = une ligne dans `beneficiaries` avec une `FOREIGN KEY` vers `member_id`.  

La règle : tu ne peux voter (référencer) que pour quelqu'un qui existe officiellement dans la liste (la table référencée). Sinon, bulletin nul (erreur SQL).

---

## 6. Example Cascade

### Exemple 1 — Le plus simple (le "passeport" de membre)

```sql
CREATE TABLE members (
  id TEXT PRIMARY KEY,  -- 'mem_abc123' est unique, obligatoire
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);
```

Que se passe-t-il si tu fais ça ?

```sql
INSERT INTO members (id, first_name, last_name) VALUES ('abc123', 'Sophie', 'Martin');
INSERT INTO members (id, first_name, last_name) VALUES ('abc123', 'Luc', 'Bernard'); -- ERREUR !
```

La deuxième ligne échoue : `UNIQUE constraint failed: members.id`. La BDD refuse. Aucun code applicatif nécessaire.

---

### Exemple 2 — AUTOINCREMENT (déléguer la génération d'ID)

```sql
CREATE TABLE beneficiaries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,  -- la BDD choisit l'ID : 1, 2, 3...
  first_name TEXT NOT NULL
);
```

```sql
INSERT INTO beneficiaries (first_name) VALUES ('Emma');   -- id = 1, automatiquement
INSERT INTO beneficiaries (first_name) VALUES ('Paul');   -- id = 2, automatiquement
INSERT INTO beneficiaries (first_name) VALUES ('Léa');    -- id = 3, automatiquement
```

Tu n'as jamais à gérer l'ID. La BDD compte pour toi. Et jamais deux lignes n'auront le même ID.

---

### Exemple 3 — REFERENCES (la clé étrangère en action)

```sql
CREATE TABLE beneficiaries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  member_id TEXT NOT NULL REFERENCES members(id),  -- doit exister dans members
  first_name TEXT NOT NULL
);
```

```sql
-- Sophie Martin existe (id='abc123')
INSERT INTO beneficiaries (member_id, first_name) VALUES ('abc123', 'Emma');  -- OK ✓

-- 'xyz999' n'existe pas dans members
INSERT INTO beneficiaries (member_id, first_name) VALUES ('xyz999', 'Ghost'); -- ERREUR ✗
```

Résultat : `FOREIGN KEY constraint failed`. Impossible d'insérer un bénéficiaire orphelin.

---

### Exemple 4 — La suppression en cascade (cas moins évident)

Que se passe-t-il si tu supprimes un membre qui a des bénéficiaires ?

```sql
DELETE FROM members WHERE id = 'abc123';
```

Par défaut dans SQLite : **ERREUR** si des bénéficiaires référencent ce membre. La BDD te protège contre les suppressions accidentelles qui créeraient des orphelins.

Tu peux configurer le comportement :
- `ON DELETE CASCADE` → supprime aussi les bénéficiaires automatiquement
- `ON DELETE SET NULL` → met `member_id` à NULL dans les bénéficiaires
- `ON DELETE RESTRICT` (défaut) → refuse la suppression

Chez Alan, `ON DELETE CASCADE` a du sens : si un membre quitte, ses bénéficiaires n'ont plus de raison d'exister.

---

### Exemple 5 — La chaîne de références (non-évident)

Dans le domaine Alan, les clés étrangères forment une chaîne :

```
members (id)
    ↑ références
beneficiaries (member_id → members.id)
    ↑ références (indirecte, via contrat)
contracts (member_id → members.id)
    ↑ références
claims (contract_id → contracts.id)
```

Chaque lien est une `FOREIGN KEY`. C'est un graphe de contraintes. La BDD garantit qu'aucun claim ne peut exister sans contrat, qu'aucun contrat ne peut exister sans membre.

Tu n'écris pas de code pour ça. Tu déclares les contraintes une fois. La BDD fait le reste, pour toujours.

---

## 7. Test Your Intuition

Réponds dans ta tête avant de déplier la réponse.

---

**Question 1** — Tu insères un bénéficiaire avec `member_id = NULL`. Que se passe-t-il ?

<details>
<summary>Réponse</summary>

**Erreur.** La colonne est déclarée `NOT NULL`. SQLite refuse l'insertion avec : `NOT NULL constraint failed: beneficiaries.member_id`.

Si la colonne était `member_id TEXT REFERENCES members(id)` (sans `NOT NULL`), alors `NULL` serait autorisé — en SQL, `NULL` signifie "pas de référence" et n'est pas vérifié par la contrainte FOREIGN KEY. Mais dans notre cas, `NOT NULL` l'interdit explicitement.

</details>

---

**Question 2** — Tu as `id INTEGER PRIMARY KEY AUTOINCREMENT`. Tu insères 3 bénéficiaires (ids 1, 2, 3), puis tu supprimes le bénéficiaire 3, puis tu insères un nouveau. Quel ID reçoit-il ?

<details>
<summary>Réponse</summary>

**4**, pas 3. `AUTOINCREMENT` dans SQLite garantit que l'ID ne sera **jamais réutilisé**. Une fois que l'ID 3 a existé, il est brûlé. Le prochain sera toujours supérieur au max historique.

Sans `AUTOINCREMENT` (juste `PRIMARY KEY`), SQLite réutiliserait 3. C'est une différence importante quand des systèmes externes ont des références vers d'anciens IDs (logs, API, etc.).

</details>

---

**Question 3** — Deux développeurs débattent :

> **Dev A :** "Les FOREIGN KEY, c'est bien, mais on peut faire la même vérification dans le code TypeScript avant l'INSERT. C'est plus flexible."
>
> **Dev B :** "Non, c'est dangereux."

Qui a raison, et pourquoi ?

<details>
<summary>Réponse</summary>

**Dev B a raison.** Voici pourquoi :

1. **Le code TypeScript peut avoir des bugs.** Tu oublies un `if`, tu fais une refacto, un collègue ne sait pas que la vérification existe. La contrainte en BDD, elle, ne peut pas être oubliée.

2. **Plusieurs sources d'écriture.** L'API Node.js vérifie, mais qu'en est-il du script de migration ? Du seed de test ? De l'accès direct via un admin SQL ? La BDD contrôle *tous* les accès.

3. **Race condition.** Entre le moment où tu vérifies "le membre existe" et le moment où tu fais l'INSERT, le membre peut être supprimé (concurrent access). La FOREIGN KEY est vérifiée de façon atomique lors de l'INSERT. Ton code TypeScript, non.

La règle d'or : **les contraintes d'intégrité vivent dans la base, pas dans l'application.**

</details>

---

## 8. What It's NOT — Misconceptions

### ❌ "PRIMARY KEY = la première colonne"

Faux. La `PRIMARY KEY` peut être n'importe quelle colonne (ou groupe de colonnes). Elle n'a rien à voir avec sa position. C'est une **contrainte**, pas un emplacement.

---

### ❌ "AUTOINCREMENT est obligatoire avec PRIMARY KEY"

Faux. `PRIMARY KEY` seul suffit à garantir l'unicité. `AUTOINCREMENT` dit juste *comment* générer l'ID automatiquement. Tu peux très bien avoir :

```sql
id TEXT PRIMARY KEY  -- tu fournis toi-même l'ID : 'mem_abc123', 'usr_xyz'
```

C'est même souvent préférable pour des IDs métier (UUID, identifiants externes).

---

### ❌ "FOREIGN KEY ralentit la BDD"

Légèrement vrai en théorie, pas en pratique à notre échelle. Le surcoût est négligeable. Et le coût d'un bug de données corrompues est infiniment plus élevé.

---

### ❌ "Si j'ai une FOREIGN KEY, les données sont automatiquement jointes"

Faux. La `FOREIGN KEY` est une **contrainte d'intégrité**, pas une jointure automatique. Pour récupérer les données liées, tu dois toujours faire un `JOIN` explicitement :

```sql
SELECT b.first_name, m.last_name
FROM beneficiaries b
JOIN members m ON b.member_id = m.id;
```

La FOREIGN KEY dit "cette référence est valide". Le JOIN dit "donne-moi les données des deux côtés".

---

### ❌ "SQLite vérifie les FOREIGN KEY par défaut"

Faux, et c'est un piège classique. SQLite **désactive les FOREIGN KEY par défaut** pour des raisons historiques de compatibilité. Tu dois les activer explicitement à chaque connexion :

```typescript
db.pragma('foreign_keys = ON');
```

Sans ça, tu peux insérer des bénéficiaires avec des `member_id` fantômes et SQLite ne dira rien. C'est pourquoi cette ligne doit être la première chose que tu fais après avoir ouvert la connexion avec `better-sqlite3`.

---

## 9. The Big Picture

Voici ce que tu viens de comprendre, reformulé en une image :

**Ta base de données est un contrat.**

Sans clés primaires ni étrangères, c'est un tableur Excel partagé où n'importe qui peut écrire n'importe quoi. Quelqu'un écrit "membre fantôme", quelqu'un d'autre duplique un ID, un bug supprime un membre sans toucher ses bénéficiaires. Le chaos s'installe en silence.

Avec les clés :
- Chaque ligne a un **identifiant garanti unique** (PRIMARY KEY) → plus d'ambiguïté.
- Chaque référence **pointe vers quelque chose qui existe** (FOREIGN KEY) → plus d'orphelins.
- Ces règles s'appliquent à **toutes les écritures, de toutes les sources, à tout moment** → plus de bugs silencieux.

C'est pourquoi ce code que tu as vu :

```sql
CREATE TABLE beneficiaries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,          -- chaque bénéficiaire a un ID unique, auto-géré
  member_id TEXT NOT NULL REFERENCES members(id), -- doit pointer vers un vrai membre
  ...
);
```

…n'est pas du boilerplate. C'est la **colonne vertébrale de l'intégrité de ton système**. C'est ce qui fait que chez Alan, un bénéficiaire ne peut pas exister sans membre. Un claim ne peut pas exister sans contrat. La réalité métier est encodée dans la structure de données elle-même.

Et toi, tu n'as qu'une seule chose à ne pas oublier :

```typescript
// La première ligne après db = new Database(...)
db.pragma('foreign_keys = ON');
```

Sans ça, toutes tes FOREIGN KEY SQLite sont silencieuses. Avec ça, ta BDD devient ton meilleur collègue — celui qui ne laisse jamais passer une donnée invalide.

---

*Concept maîtrisé ? Lance `/alan-tech-challenge` pour le mettre en pratique dans le contexte Alan.*
