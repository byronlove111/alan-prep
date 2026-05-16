# ALTER TABLE en SQL

---

## Before You Start

Pour comprendre ce fichier, tu dois être à l'aise avec :

- **CREATE TABLE** — tu sais ce qu'est un schéma SQL et comment déclarer une table avec ses colonnes et types
- **Migrations SQL** — tu as une idée que les changements de schéma sont versionnés et joués dans l'ordre
- **Les types SQL** (`INTEGER`, `TEXT`, `TIMESTAMP`, etc.) — tu sais ce qu'une colonne typée signifie

Si l'un de ces points est flou, commence par là — cette explication construit directement dessus.

---

## 1. The Hook

Tu as une table `claims` en production, avec 50 000 lignes. Tu réalises qu'il manque une colonne `verified_at` pour savoir si une demande a été vérifiée par un médecin. Comment tu l'ajoutes — sans tout casser, sans perdre les données existantes, sans bloquer l'application pendant 10 minutes ?

---

## 2. Life Without It — The Pain

Sarah est développeuse junior. Elle vient de déployer son application en production depuis deux semaines. 50 000 claims dans la base.

Un jour, son product manager lui dit : *"On a besoin de savoir à quelle date une demande a été vérifiée par un médecin. Ajoute une colonne `verified_at` à la table `claims`."*

Sarah pense : *facile.* Elle ouvre `schema.sql`, ajoute `verified_at TIMESTAMP` dans le `CREATE TABLE`, et relance son script d'init.

Erreur. La table existe déjà. Le script refuse de la recréer.

Elle essaie de droper la table et la recréer. Ça marche en local. Elle déploie en production.

50 000 claims. Disparus. La prod est cassée. Son patron l'appelle.

*Il doit y avoir une autre façon.*

---

## 3. The Invention Story

Au début du SQL, dans les années 70, les bases de données avaient un problème cruel : une fois qu'une table était créée, elle était figée. Si tu voulais ajouter une colonne, tu devais vider la table, la supprimer, la recréer avec la nouvelle structure, et réimporter toutes les données. Un cauchemar.

Les ingénieurs de IBM ont alors réalisé quelque chose d'évident : une base de données doit pouvoir évoluer *pendant qu'elle vit*. Les données ne disparaissent pas quand le schéma change — elles s'adaptent.

Ils ont inventé une commande qui permet de *modifier* une table qui existe déjà en base, sans toucher aux données. Une commande qui dit au moteur SQL : *"Garde toutes les lignes, mais change la structure."*

Cette commande, c'est `ALTER TABLE`.

---

## 4. The Core Idea — One Sentence

`ALTER TABLE` modifie la structure d'une table existante (ajouter, renommer ou supprimer des colonnes) sans toucher aux données qu'elle contient.

---

## 5. Think of It Like...

**Une renovation d'appartement** : tu as un appartement avec des meubles et des affaires dedans. `ALTER TABLE ADD COLUMN`, c'est ajouter une nouvelle pièce à cet appartement — les affaires existantes restent exactement où elles sont, tu crées juste un nouvel espace vide. `DROP COLUMN`, c'est démolir une pièce — et tout ce qu'il y avait dedans disparaît avec elle.
→ Ce qui correspond : l'appartement = la table, les pièces = les colonnes, les affaires = les données.
→ Où ça casse : en vrai, ajouter une pièce à un appartement prend des mois. En SQL, ça prend quelques millisecondes... sauf en production avec beaucoup de données, où ça peut bloquer toute la maison pendant l'opération.

**Un tableau Excel partagé en live** : imagine un tableau Google Sheets avec 50 000 lignes, et 10 collègues qui y travaillent en temps réel. Tu veux ajouter une colonne. `ALTER TABLE`, c'est cliquer "Insérer une colonne" — le tableau se restructure, les données restent, tes collègues voient la nouvelle colonne apparaître.
→ Ce qui correspond : le tableau = la table, les colonnes = les colonnes, les collègues = les requêtes applicatives.
→ Où ça casse : dans Google Sheets, tes collègues continuent à bosser pendant que tu ajoutes la colonne. En SQL sur PostgreSQL, `ALTER TABLE` peut poser un **verrou exclusif** — il dit à tout le monde "stop, attendez" le temps de modifier la structure. Sur une table très active, ça peut durer des secondes... qui bloquent toutes les requêtes.

**Le passeport** : ton passeport a un format fixe — nom, prénom, nationalité. Le gouvernement décide d'ajouter un champ biométrique. Ils ne te demandent pas de te renouveler entièrement (perdre tes tampons, ton identité). Ils ajoutent la nouvelle donnée à la prochaine version du document tout en maintenant la continuité.
→ Ce qui correspond : le format du passeport = le schéma, les tampons = les données existantes, le renouvellement = migration sans perte.
→ Où ça casse : un passeport, ça se renouvelle passivement sur des années. Une migration SQL, elle doit s'exécuter en quelques secondes sur une base vivante — la contrainte de temps est radicalement différente.

---

## 6. Example Cascade

### Exemple 1 — Ajouter une colonne simple (le cas le plus basique)

Tu as une table `members` et tu réalises qu'il manque un champ `phone_number`.

**Avant :**
```sql
CREATE TABLE members (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL
);
```

**La commande :**
```sql
ALTER TABLE members ADD COLUMN phone_number TEXT;
```

**Résultat :** toutes les lignes existantes ont maintenant une colonne `phone_number`, avec la valeur `NULL` pour chacune (puisqu'elle n'existait pas avant). Aucune donnée perdue.

---

### Exemple 2 — Ajouter `verified_at` à la table `claims` (domaine Alan)

Le product manager veut savoir quand une demande a été vérifiée par un médecin.

```sql
ALTER TABLE claims ADD COLUMN verified_at TIMESTAMP;
```

Toutes les 50 000 claims existantes ont maintenant `verified_at = NULL`. Les nouvelles claims peuvent être vérifiées et recevoir une date. Les anciennes restent `NULL` — ce qui est exact : on ne sait pas quand elles ont été vérifiées (ou si elles l'ont été).

---

### Exemple 3 — Renommer une colonne (refactoring de domaine)

L'équipe decide que `user_id` est trop générique dans la table `contracts`. Le bon terme dans le domaine Alan, c'est `member_id`.

```sql
-- PostgreSQL
ALTER TABLE contracts RENAME COLUMN user_id TO member_id;
```

Toutes les données restent identiques — seul le nom de la colonne change. Attention : **tout le code applicatif qui référençait `user_id` dans ses requêtes SQL doit être mis à jour en même temps**, sinon les requêtes planteront avec "column user_id does not exist".

---

### Exemple 4 — La différence SQLite vs PostgreSQL (le piège des débutants)

En **SQLite** (la base de données légère qu'on utilise souvent en local), `ALTER TABLE` est très limité :

```sql
-- ✅ Fonctionne en SQLite
ALTER TABLE claims ADD COLUMN verified_at TIMESTAMP;
ALTER TABLE claims RENAME COLUMN user_id TO member_id;

-- ❌ Ne fonctionne PAS en SQLite avant la version 3.35 (2021)
ALTER TABLE claims DROP COLUMN old_field;

-- ❌ N'existe tout simplement pas en SQLite
ALTER TABLE claims MODIFY COLUMN amount INTEGER NOT NULL;
```

En **PostgreSQL** (la base utilisée en production chez la plupart des vraies apps), tu as accès à tout : `ADD COLUMN`, `DROP COLUMN`, `RENAME COLUMN`, `ALTER COLUMN TYPE`, `SET NOT NULL`, etc.

Ce n'est pas un bug. SQLite est conçu pour être léger et embarqué — il sacrifie des fonctionnalités avancées pour la simplicité. PostgreSQL est fait pour la production à grande échelle.

---

### Exemple 5 — Ajouter une contrainte NOT NULL sur une colonne existante (le cas dangereux)

Tu veux rendre `verified_at` obligatoire sur `claims`. En réflexe, tu écris :

```sql
ALTER TABLE claims ALTER COLUMN verified_at SET NOT NULL;
```

**Boom.** PostgreSQL refuse — il y a 50 000 lignes avec `verified_at = NULL`. Tu ne peux pas rendre `NOT NULL` une colonne qui contient déjà des `NULL`.

La bonne stratégie en 3 étapes :

```sql
-- Étape 1 : ajouter la colonne nullable (zéro risque)
ALTER TABLE claims ADD COLUMN verified_at TIMESTAMP;

-- Étape 2 : backfill — remplir les NULL avec une valeur par défaut
UPDATE claims SET verified_at = created_at WHERE verified_at IS NULL;

-- Étape 3 : seulement maintenant, appliquer la contrainte NOT NULL
ALTER TABLE claims ALTER COLUMN verified_at SET NOT NULL;
```

C'est ce qu'on appelle une **migration zero-downtime** : on n'essaie jamais de faire un changement brutal sur des données existantes.

---

### Exemple 6 — Pourquoi modifier un fichier `schema.sql` déjà joué est une catastrophe

Imagine que tu as cette migration déjà jouée en production depuis 6 mois :

```sql
-- migration_001.sql (déjà jouée)
CREATE TABLE contracts (
  id INTEGER PRIMARY KEY,
  member_id INTEGER NOT NULL
);
```

Tu te dis : *"Je vais juste ajouter une colonne directement dans ce fichier."* Tu modifies `migration_001.sql` :

```sql
-- migration_001.sql (modifiée — NE JAMAIS FAIRE ÇA)
CREATE TABLE contracts (
  id INTEGER PRIMARY KEY,
  member_id INTEGER NOT NULL,
  verified_at TIMESTAMP   -- ajouté à la main
);
```

Le problème : ta base de production a **déjà joué** ce fichier. Elle ne le rejouera jamais. La colonne `verified_at` n'existe toujours pas en prod. Ton code plantera en prod mais pas en local. Tes collègues qui recréent leur base locale verront une base différente de la prod.

La règle d'or : **une migration déjà jouée est immuable**. Pour changer le schéma, tu crées toujours une *nouvelle* migration avec `ALTER TABLE`.

---

## 7. Test Your Intuition

> **Question 1** : Tu travailles sur l'app Alan en local avec SQLite. Tu veux supprimer la colonne `old_notes` de la table `claims`. Tu écris `ALTER TABLE claims DROP COLUMN old_notes;` et tu obtiens une erreur. Pourquoi, et que fais-tu ?

<details>
<summary>Réponse</summary>

SQLite ne supporte pas `DROP COLUMN` avant la version 3.35 (sortie en 2021). Si ta version de SQLite est plus ancienne, cette commande n'existe tout simplement pas.

Solutions :
1. **Mettre à jour SQLite** si possible (vérifie avec `sqlite3 --version`).
2. **Stratégie de contournement** pour les vieilles versions : créer une nouvelle table sans la colonne, copier les données, supprimer l'ancienne, renommer la nouvelle. C'est verbeux mais c'est la seule façon.

En PostgreSQL (production), `ALTER TABLE claims DROP COLUMN old_notes;` fonctionne sans problème.

La leçon : toujours tester tes migrations sur le *même moteur SQL* que la production. SQLite en local + PostgreSQL en prod = piège garanti.

</details>

---

> **Question 2** : Un développeur senior te dit : "N'ajoute jamais une colonne `NOT NULL` sans valeur par défaut sur une table de production qui a des données." Pourquoi cette règle existe-t-elle ?

<details>
<summary>Réponse</summary>

Parce que les lignes existantes ne peuvent pas satisfaire une contrainte `NOT NULL` si la colonne n'avait pas de valeur avant.

Exemple : tu as 100 000 lignes dans `claims`, et tu fais :
```sql
ALTER TABLE claims ADD COLUMN risk_score INTEGER NOT NULL;
```

PostgreSQL va immédiatement demander : *"Quelle valeur je mets pour les 100 000 lignes existantes ?"* Il n'en a aucune idée — et il refuse d'exécuter la commande.

Il y a deux solutions propres :
1. Ajouter une valeur `DEFAULT` : `ADD COLUMN risk_score INTEGER NOT NULL DEFAULT 0` — PostgreSQL remplit les lignes existantes avec `0`.
2. Stratégie en 3 étapes : ajouter nullable → backfill → appliquer NOT NULL (voir exemple 5).

En production à grande échelle, la stratégie 3 étapes est préférable car elle permet un déploiement progressif sans bloquer.

</details>

---

> **Question 3** : Ton app déploie une migration `ALTER TABLE contracts ADD COLUMN premium_start_date TIMESTAMP;` en production sur PostgreSQL. Pendant 3 secondes, toutes les requêtes de l'app sont en timeout. Qu'est-ce qui s'est passé ?

<details>
<summary>Réponse</summary>

`ALTER TABLE` sur PostgreSQL pose un **verrou exclusif (AccessExclusiveLock)** sur la table pendant toute la durée de l'opération. Ce verrou bloque toutes les autres opérations sur la table — lectures ET écritures — jusqu'à ce qu'`ALTER TABLE` se termine.

Sur une table avec beaucoup de données ou beaucoup de trafic concurrent, ce verrou peut durer plusieurs secondes. Pendant ce temps, toutes les requêtes de l'app qui touchent `contracts` attendent en file. Si l'attente dépasse le timeout configuré, elles tombent en erreur.

C'est pourquoi les équipes expérimentées utilisent des stratégies spécifiques pour les migrations à fort trafic :
- `ADD COLUMN` avec une valeur nullable (plus rapide, le verrou est court)
- `ALTER TABLE ... ADD COLUMN ... DEFAULT ...` peut être plus long si PostgreSQL doit backfiller
- Extensions PostgreSQL comme `pg_repack` pour des migrations sans downtime
- Des outils comme `strong_migrations` (Ruby) qui détectent ces patterns dangereux automatiquement

La leçon : une migration simple en local peut avoir un impact sévère en production sur une table active. Toujours réfléchir au timing et au volume.

</details>

---

## 8. What It's NOT — Misconceptions

**"Je peux modifier `schema.sql` et relancer pour changer la structure."**
Faux. `schema.sql` est un fichier qui décrit *comment créer* la base de zéro. Si la table existe déjà, `CREATE TABLE` plantera. Et si tu drops et recrées la table, tu perds toutes les données. En production, tu n'as qu'un seul outil : `ALTER TABLE` dans une nouvelle migration.

---

**"`ALTER TABLE` est instantané, peu importe la taille de la table."**
Faux en production. Sur PostgreSQL, certaines opérations (ajouter une colonne avec une valeur `DEFAULT`, changer un type de colonne, ajouter une contrainte `NOT NULL`) peuvent être très longues sur des tables volumineuses — et bloquent toutes les requêtes en attendant. Sur une table à 10 millions de lignes, une migration "simple" peut prendre plusieurs minutes.

---

**"SQLite et PostgreSQL supportent les mêmes commandes `ALTER TABLE`."**
Faux. SQLite implémente un sous-ensemble très limité de SQL — `ALTER TABLE` en SQLite ne supporte que `ADD COLUMN` et `RENAME` (et `DROP COLUMN` seulement depuis la version 3.35). Ce qui fonctionne sur ta machine locale (SQLite) peut planter sur la production (PostgreSQL)... ou inversement. Toujours vérifier la compatibilité.

---

**"`ALTER TABLE DROP COLUMN` est réversible."**
Faux. Quand tu drop une colonne, les données qu'elle contenait sont **définitivement supprimées**. Il n'y a pas de "undo". En production, avant de dropper une colonne, la bonne pratique est de d'abord déployer le code qui n'utilise plus cette colonne, de laisser tourner quelques jours pour s'assurer que tout va bien, *puis* de dropper. Sinon, si quelque chose plantait, tu n'aurais aucun moyen de récupérer les données sans un backup.

---

**"Renommer une colonne est une opération anodine."**
Piège courant. Renommer une colonne avec `RENAME COLUMN` change le nom au niveau SQL — mais tout le code applicatif qui utilise l'ancien nom dans ses requêtes (`SELECT user_id FROM contracts`) plantera immédiatement. Un rename de colonne nécessite toujours un déploiement synchronisé du code et de la migration. Certaines équipes évitent même les renames directs en prod et préfèrent : ajouter la nouvelle colonne → copier les données → migrer le code → dropper l'ancienne.

---

## 9. The Big Picture — Where Does This Live?

**La catégorie du problème :** `ALTER TABLE` appartient au domaine des **migrations de schéma** — la discipline de faire évoluer la structure d'une base de données en production, sans perdre de données et sans casser l'application qui tourne en parallèle.

**Ce dont il dépend :**
- `CREATE TABLE` — tu dois comprendre la structure que tu modifies
- Les types SQL — chaque colonne que tu ajoutes a un type
- Les contraintes SQL (`NOT NULL`, `UNIQUE`, `FOREIGN KEY`) — `ALTER TABLE` peut les ajouter ou les supprimer
- Le concept de transaction SQL — les migrations sérieuses s'exécutent dans une transaction pour pouvoir rollback en cas d'erreur

**Ce qui dépend de lui :**
- Les **outils de migration** comme Flyway, Liquibase, Knex, Prisma Migrate — ils génèrent et jouent des fichiers de migration qui contiennent des `ALTER TABLE`
- Les **stratégies de déploiement zero-downtime** — toute la discipline des "expand/contract migrations" est construite autour de `ALTER TABLE`
- Le **versioning de schéma** — chaque modification de structure devient un fichier numéroté et immuable dans le projet

**Quand l'utiliser :**
- À chaque fois que tu dois modifier une table qui existe déjà et qui contient des données
- Pour ajouter, renommer ou (avec précaution) supprimer des colonnes en production

**Quand ne pas l'utiliser :**
- En local, si tu reconstruis la base de zéro à chaque fois : tu peux juste modifier `schema.sql` et relancer (pas de données à préserver)
- Pour des changements qui touchent des millions de lignes en production sans avoir pensé à la stratégie de locking — dans ce cas, il faut d'abord concevoir la migration en plusieurs étapes avant d'écrire quoi que ce soit
