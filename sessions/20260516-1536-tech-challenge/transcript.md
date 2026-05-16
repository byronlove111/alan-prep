# Session — 2026-05-16 · POST /members/:id/beneficiaries

## Brief

Implémenter `POST /members/:id/beneficiaries` — ajout d'un bénéficiaire au contrat d'un membre.

**Règles métier :**
- Max 5 bénéficiaires par membre
- Max 1 bénéficiaire de type `spouse`
- Le membre doit avoir un contrat en statut `active`
- Auth : `req.memberId === req.params.id` (403 sinon)

**Body :** `{ type, first_name, last_name, birth_date }`

**Codes de retour :** 201 (succès), 400 (body invalide), 403 (auth), 404 (membre inexistant), 422 (règle métier violée)

## Transcript

_(colle ici ce que tu as dit pendant la session)_
