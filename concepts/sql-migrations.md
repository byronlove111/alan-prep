# SQL Migrations

---

## Before You Start

Pour comprendre ce concept, tu dois être à l'aise avec :

- **Les tables SQL** — tu sais ce qu'est une `CREATE TABLE`, une colonne, un type (`TEXT`, `INTEGER`, etc.)
- **La différence dev / prod** — tu comprends qu'il y a une base de données sur ton ordi, et une autre (la vraie) sur un serveur avec de vraies données
- **`ALTER TABLE`** — pas besoin de le maîtriser, juste de savoir que ça existe pour modifier une table existante

Si l'un de ces points te semble flou, commence par là — sinon ce qui suit ne fera pas cliquer.

---

## 1. The Hook

Imagine que tu travailles sur l'app d'Alan. Des milliers de membres ont des contrats, des bénéficiaires, des claims. Un mardi matin, tu réalises qu'il manque une colonne `verified_at` dans la table `claims`.

Facile : tu modifies le fichier `schema.sql`. Mais attends — la base de production existe *déjà*. Elle tourne *en ce moment*. Elle contient des milliers de lignes. Comment tu lui dis "rajoute cette colonne" sans tout casser, sans perdre une seule ligne, sans couper le service ?

---

## 2. Life Without It — The Pain

Lucas travaille seul sur un side project. Sa base de données, c'est un seul fichier `schema.sql`. Quand il veut changer quelque chose, il modifie le fichier, supprime la base, et la recrée de zéro. Propre, simple, efficace.

Six mois plus tard, Alan lui confie un projet réel. Cinquante mille membres. Des contrats qui courent depuis deux ans. Un jour, son chef lui dit : "Il faut ajouter la colonne `verified_at` à la table `claims`."

Lucas réfléchit. "Je vais modifier le `schema.sql` et... supprimer la base pour la recréer." Puis il réalise : *supprimer la base, ça efface cinquante mille membres et deux ans de données.* Il ne peut pas. Mais il ne sait pas non plus comment dire à une base de données existante "modifie-toi toi-même".

Il passe deux heures à chercher. Il se dit qu'il doit y avoir un meilleur moyen.

---

## 3. The Invention Story

Dans les années 2000, les équipes de développement se retrouvaient dans la même galère que Lucas, en boucle.

Le schéma initial est parfait. Puis le produit évolue. On doit ajouter une colonne ici, renommer une table là, créer un index ailleurs. La base de production a des données réelles qu'on ne peut pas perdre. Chaque changement de schéma devient un moment de stress.

Quelqu'un a réalisé une chose simple : *un fichier `schema.sql` décrit l'état final de la base, mais pas comment y arriver.* C'est comme avoir un plan d'appartement rénové, sans les instructions pour faire les travaux.

La solution : au lieu de modifier le schéma en place, on écrit la *transformation* — un petit script SQL qui dit exactement quoi changer. Et on numérote ces scripts dans l'ordre. Le script 001 crée les tables initiales. Le script 002 ajoute une colonne. Le script 003 crée un index. Pour passer de l'état actuel à l'état voulu, on joue les scripts manquants, dans l'ordre, un par un.

Ces scripts s'appellent des **migrations**.

---

## 4. The Core Idea — One Sentence

Une migration, c'est un script numéroté qui décrit *un seul changement* à apporter à la structure de ta base de données — pour qu'on puisse appliquer ce changement sur n'importe quelle base, sans toucher aux données existantes.

---

## 5. Think of It Like...

**Un historique Git pour ta base de données.**
→ Chaque migration = un commit. Le commit ne réécrit pas tout le projet — il enregistre *ce qui a changé*. Tu peux voir toute l'histoire : "le 3 janvier, on a ajouté `verified_at`. Le 10 mars, on a créé l'index sur `member_id`."
→ Où ça casse : avec Git tu peux `revert` facilement. Avec les migrations sur une prod avec des données réelles, "annuler" est souvent douloureux — surtout si tu as supprimé une colonne.

---

**Un chantier de rénovation avec des ordres de travaux numérotés.**
→ Le plan d'architecte (ton `schema.sql`) montre l'état final. Mais l'équipe sur place a besoin d'ordres de travaux : "Ordre 001 : casser le mur du salon. Ordre 002 : poser le parquet. Ordre 003 : peindre." Chaque ordre s'exécute dans l'ordre, une seule fois.
→ Où ça casse : au chantier, tu peux décider de refaire l'Ordre 002 si le parquet était mauvais. Avec les migrations, rejouer une migration déjà appliquée est une erreur — la base garde la mémoire de ce qui a déjà été fait.

---

**Un carnet médical.**
→ Le médecin ne réécrit pas le dossier à chaque consultation — il *ajoute* une entrée datée. "15 mai 2026 : ajout d'un traitement." Le carnet reflète toute l'histoire du patient.
→ Où ça casse : dans un carnet médical, tu peux corriger une erreur passée. Dans les migrations, modifier une migration déjà jouée en production ne change rien — la base l'a déjà exécutée.

---

## 6. Example Cascade

### Exemple 1 — L'ajout le plus simple
**Problème :** tu veux ajouter une colonne `phone` à la table `members`.

**Sans migration :** tu modifies `schema.sql`... mais la base de prod ne le sait pas.

**Avec une migration :**
```sql
-- migrations/002_add_phone_to_members.sql
ALTER TABLE members ADD COLUMN phone TEXT;
```
Tu joues ce script une fois sur la prod. La colonne apparaît. Les données existantes restent intactes, avec `NULL` dans la nouvelle colonne.

---

### Exemple 2 — Créer une nouvelle table
**Problème :** tu veux tracker les emails envoyés aux membres.

```sql
-- migrations/003_create_emails_table.sql
CREATE TABLE emails (
  id INTEGER PRIMARY KEY,
  member_id INTEGER NOT NULL,
  sent_at TEXT NOT NULL,
  subject TEXT NOT NULL,
  FOREIGN KEY (member_id) REFERENCES members(id)
);
```
La table n'existait pas. La migration la crée. Les autres tables ne bougent pas.

---

### Exemple 3 — Le scénario réel Alan
**Problème :** en production, la table `claims` n'a pas de colonne `verified_at`. L'équipe veut savoir quand un claim a été vérifié.

```sql
-- migrations/007_add_verified_at_to_claims.sql
ALTER TABLE claims ADD COLUMN verified_at TEXT;
```
Résultat : 80 000 claims existants ont maintenant `verified_at = NULL`. Les nouveaux claims pourront être remplis. Aucune donnée perdue.

---

### Exemple 4 — L'edge case qui pique : renommer une colonne
**Problème :** tu veux renommer `birth_date` en `date_of_birth` dans `members`. SQLite (contrairement à PostgreSQL) ne supporte pas `ALTER TABLE RENAME COLUMN` avant la version 3.25.

La migration "safe" pour SQLite devient :
```sql
-- migrations/008_rename_birth_date.sql
ALTER TABLE members ADD COLUMN date_of_birth TEXT;
UPDATE members SET date_of_birth = birth_date;
-- On ne peut pas supprimer l'ancienne colonne facilement en SQLite ancien.
-- On la laisse et on l'ignore dans le code.
```
Leçon : une migration n'est pas toujours une ligne. Parfois c'est une stratégie en plusieurs étapes.

---

### Exemple 5 — La stratégie zero-downtime : additive-first
**Problème :** tu veux changer le type de `contract_status` de `TEXT` à `INTEGER` (enum). Si tu fais ça directement, l'app qui lit `TEXT` plante pendant le déploiement.

**Stratégie additive en 3 migrations :**

Migration A (deploy 1) :
```sql
ALTER TABLE contracts ADD COLUMN status_v2 INTEGER;
UPDATE contracts SET status_v2 = CASE status WHEN 'active' THEN 1 WHEN 'terminated' THEN 0 ELSE NULL END;
```

Migration B (deploy 2, après que l'app lit `status_v2`) :
```sql
-- L'app est maintenant sur status_v2. On peut archiver l'ancienne.
ALTER TABLE contracts ADD COLUMN status_old TEXT;
UPDATE contracts SET status_old = status;
```

Migration C (deploy 3, nettoyage) :
```sql
-- On ne peut pas DROP COLUMN facilement en SQLite, mais sur PostgreSQL :
ALTER TABLE contracts DROP COLUMN status;
ALTER TABLE contracts DROP COLUMN status_old;
```

Le principe : **d'abord ajouter, jamais supprimer tant que l'ancienne version tourne encore.**

---

## 7. Test Your Intuition

> **Question 1 :** Tu travailles seul sur un projet perso. Tu as `schema.sql`. Tu veux ajouter une colonne. Est-ce que tu as vraiment besoin de migrations ?

<details>
<summary>Réponse</summary>

Non, pas forcément. Si tu es seul, que tu n'as pas de données importantes, et que tu peux te permettre de supprimer et recréer la base, `schema.sql` suffit. Les migrations deviennent *nécessaires* dès qu'il y a des données que tu ne peux pas perdre, ou plusieurs environnements (local + staging + prod) à garder en sync.

Le point clé : les migrations ne sont pas une religion. C'est une solution à un problème précis. Si tu n'as pas le problème, tu n't'as pas besoin de la solution.

</details>

---

> **Question 2 :** Un collègue te propose de modifier directement la migration `003_create_emails_table.sql` qui est déjà jouée en production pour corriger une typo dans un nom de colonne. Bonne idée ?

<details>
<summary>Réponse</summary>

Très mauvaise idée. La base de données garde la trace des migrations déjà jouées (souvent dans une table `migrations` ou `schema_migrations`). Si tu modifies un fichier déjà exécuté, rien ne se passe sur la prod — elle pense l'avoir déjà jouée. Et si quelqu'un recrée une base from scratch, il obtiendra un schéma différent de la prod. L'incohérence devient un bug silencieux.

La bonne pratique : créer une *nouvelle* migration `009_rename_column_in_emails.sql` qui corrige la typo. Les migrations déjà jouées sont immuables.

</details>

---

> **Question 3 :** Tu dois supprimer la colonne `legacy_code` de la table `beneficiaries` en production. Ton app tourne en permanence (zéro downtime requis). Dans quel ordre tu fais les choses ?

<details>
<summary>Réponse</summary>

Tu **ne supprimes pas la colonne immédiatement**. La stratégie correcte :

1. **D'abord** : modifier le code de l'app pour qu'elle n'utilise plus `legacy_code` (ni en lecture ni en écriture). Déployer.
2. **Ensuite** : vérifier pendant quelques heures/jours que tout va bien, qu'aucun rollback n'est nécessaire.
3. **Enfin** : jouer la migration `DROP COLUMN legacy_code`.

Si tu fais DROP COLUMN en premier, l'ancienne version de l'app qui tourne encore pendant le déploiement va planter en cherchant cette colonne. L'ordre compte toujours : code avant suppression, jamais l'inverse.

</details>

---

## 8. What It's NOT — Misconceptions

**"Modifier `schema.sql` *est* une migration."**
Non. `schema.sql` décrit l'état final — comme un plan d'architecte. Une migration décrit *la transformation* pour y arriver. Ce n'est pas la même chose. Modifier `schema.sql` ne touche pas une base déjà existante.

---

**"Une migration, c'est automatique — elle se joue toute seule."**
Non. Une migration est un fichier SQL inerte jusqu'à ce qu'un outil (ou toi, manuellement) le joue. Des outils comme `Flyway`, `Liquibase`, ou la convention maison dans ton projet s'occupent de détecter quelles migrations n'ont pas encore été jouées et de les exécuter. Mais quelqu'un doit déclencher ça.

---

**"`ALTER TABLE` en prod, c'est instantané."**
Pas toujours. Sur une grande table (des millions de lignes), un `ALTER TABLE ADD COLUMN NOT NULL DEFAULT 'x'` peut verrouiller toute la table pendant plusieurs minutes — personne ne peut lire ni écrire pendant ce temps. En production avec du trafic réel, c'est un incident. C'est pourquoi les colonnes ajoutées en prod sont presque toujours `nullable` au début (sans contrainte `NOT NULL`).

---

**"Je peux rejouer une migration si elle a planté à moitié."**
C'est dangereux sans précautions. Si une migration a partiellement échoué, la base peut être dans un état incohérent. Les bons outils de migration jouent chaque migration dans une transaction SQL — soit tout passe, soit rien ne change. Avec SQLite et `better-sqlite3`, tu peux envelopper tes migrations dans `db.transaction(...)` pour ce comportement.

---

**"Les migrations, c'est compliqué — c'est pour les grands projets."**
Les migrations sont la chose la plus simple du monde : c'est juste des fichiers SQL numérotés dans un dossier. Même sur un projet perso, dès que tu as des données que tu tiens à garder, une migration vaut mieux qu'un `DROP TABLE`.

---

## 9. The Big Picture

Les migrations appartiennent à la catégorie des **outils de gestion du changement**. Le problème qu'elles résolvent : *comment faire évoluer une structure sans perdre ce qu'elle contient.*

**Ce dont les migrations dépendent :**
- Le SQL de base (`ALTER TABLE`, `CREATE TABLE`, `CREATE INDEX`)
- La notion d'environnements séparés (local, staging, prod)
- Les transactions SQL (pour la sécurité des migrations partielles)

**Ce qui dépend des migrations :**
- Les déploiements sans interruption (zero-downtime deploys)
- La stratégie additive-first (ajouter avant de supprimer)
- Les outils comme Flyway, Liquibase, Prisma Migrate, Knex, Drizzle Kit

**Quand les utiliser :**
- Dès que ta base contient des données que tu ne peux pas perdre
- Dès que tu as plusieurs environnements à garder en sync
- Dès que tu travailles à plusieurs

**Quand s'en passer :**
- Projet jetable, base vide, développement solo exploratoire — recréer la base from scratch est plus simple

Le vrai insight : les migrations transforment le schéma d'une base en quelque chose de *versionnable*, exactement comme le code. C'est la même philosophie que Git, appliquée aux données.
