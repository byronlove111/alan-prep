# Debrief — Screening Alan · 08/05/2026 · 17h53

**Type :** Screening simulé MODE A — anglais  
**Interviewer :** Thomas, ingénieur chez Alan depuis 1.5 ans, domaine Claims Management  
**Verdict global :** ✅ Strong pass

---

## 🎯 Vue d'ensemble

Session nettement meilleure que celle du 07/05. Le contenu technique tient la route, la story Châtaigne est solide et originale, et les questions posées à Thomas ont été le vrai point fort de la session — la question sur l'IA était exceptionnelle. Le gap principal reste le même : les métriques n'arrivent pas spontanément. Sans coaching, la première réponse ne contenait aucun chiffre. C'est le seul point qui pourrait faire hésiter un interviewer en vrai screening.

---

## ✅ Points forts

**La question sur l'IA — meilleure question de la session**  
Tu t'es présenté comme Cursor ambassador qui enseigne les workflows IA à grande échelle, puis tu as référencé le blog post Alan sur les Ops AI Agents (blocage des mouvements d'assurance, 15 outils, human-in-the-loop). C'est exactement ce qu'on attend : recherche concrète, angle personnel unique, question connectée à du vrai travail Alan. Thomas n'a probablement pas entendu ça souvent.

**La question sur l'ownership — bien ancrée dans la culture Alan**  
"Would I have ownership? What's a typical feature an intern ships end to end?" — ça montre de l'ambition et une compréhension du principe de distributed ownership chez Alan. La relance sur le rôle de l'intern (est-ce qu'il parle aux clients/ops pour découvrir la feature ou il implémente seulement ?) montrait du product sense et une vraie curiosité.

**La story `@chataigne/client` — techniquement forte et originale**  
Le problème (types non propagés, désynchronisation frontend/backend), la solution (package TypeScript partagé dans le monorepo), le résultat (zéro désync depuis). C'est une décision d'architecture réelle, non triviale, bien expliquée.

**Progression nette depuis le 07/05**  
Sur les questions posées en particulier, le delta est énorme. La session précédente manquait de profondeur dans les échanges ; celle-ci avait une vraie dynamique.

---

## ⚠️ Points faibles

**Pas de chiffres dans la première réponse sans coaching**  
Tu as décrit le rebuild de Châtaigne avec "everything is scalable, everything is clean" — ça ne dit rien à un interviewer. Les métriques existent (20s → 3s de chargement, 3s → 50ms sur les conversations) mais elles n'ont pas été données spontanément. En vrai screening, l'interviewer ne va pas te demander de les ajouter. Il passe à la suite.

**"Vibe coded" — à éviter en contexte formel**  
L'expression est compréhensible dans une conversation décontractée, mais dans un screening elle sonne peu professionnel. Préfère : "The original codebase had no architecture — it was written quickly by the founder to validate the product. My job was to rebuild it properly."

**La question "hardest architectural decision" — tu n'as pas répondu à "hardest"**  
Tu as bien expliqué ce qu'était le package partagé, mais tu n'as pas expliqué pourquoi c'était difficile. L'effort de migration (chaque fichier existant à mettre à jour, rollout incrémental sur plusieurs semaines) est exactement ce qui rend la décision "hard". Sans ça, l'interviewer entend une bonne idée, pas un vrai challenge.

**La réponse sur le système complexe manquait de structure initiale**  
La story Châtaigne est bonne, mais elle a mis du temps à se construire. Un format STAR léger aurait aidé à poser le contexte plus vite : une phrase sur la situation, une sur le problème, puis le détail technique.

---

## 🇬🇧 English

Trois moments clés avec versions retravaillées.

**Moment 1 — Introduction du rebuild Châtaigne**

> Version dite : *"The codebase was vibe coded by the founder, everything was a mess, so I rebuilt everything from scratch."*

Version cible :
> *"The original codebase had been written quickly by the founder to validate the product — no architecture, no type safety. When I joined as the first engineer, I rebuilt it from scratch: feature-based structure, TanStack Query for server state, Zustand for local state. We went from 20-second load times to under 3 seconds. It's been in production for a year."*

---

**Moment 2 — Explication du package partagé**

> Version dite : *"We had a problem where the types were not propagated between the frontend and the backend, so we created a shared package."*

Version cible :
> *"The core issue was type desynchronization — the backend could change a response shape and the frontend wouldn't know until it broke in production. We solved this by extracting all shared types into a dedicated `@chataigne/client` package inside the monorepo. Every file that touched those types had to be migrated — we did it incrementally over a few weeks. Since then, we've had zero desync incidents."*

---

**Moment 3 — Question sur l'IA chez Alan**

> Version dite : *"I saw the blog post about the Ops AI Agents, with the 15 tools and the human-in-the-loop — it was interesting. I'm a Cursor ambassador so I teach AI workflows. I was wondering how you use AI internally."*

Version cible :
> *"I came across your blog post on the Ops AI Agents — the part about using 15 tools to unblock insurance movements while keeping a human in the loop was really interesting to me. I work as a Cursor ambassador teaching AI workflows at scale, so I'm always curious how engineering teams are actually integrating AI into their day-to-day. What does that look like on your team?"*

---

## 🔁 1 chose à travailler

**Les métriques d'abord, toujours.**

Chaque fois que tu décris une réalisation technique, la première phrase après le résultat doit contenir un chiffre. Pas à la fin si on te demande. Pas après coaching. Dès la deuxième phrase.

Exercice concret : prends tes trois stories principales (Châtaigne rebuild, @chataigne/client, et une troisième de ton choix) et écris pour chacune une version où la métrique apparaît dans les 30 premières mots. Lis-les à voix haute jusqu'à ce que ça vienne naturellement.

> "I rebuilt the frontend from scratch — load time dropped from 20 seconds to under 3. Here's how..."  
> "Since we shipped the shared package, we've had zero type desync incidents across 12 months."

Si le chiffre n'est pas là d'emblée, l'interviewer entend de la rhétorique, pas de la substance.
