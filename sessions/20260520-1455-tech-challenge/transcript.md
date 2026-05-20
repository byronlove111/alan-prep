# Session — 2026-05-20 · ProcessReimbursementsJob

## Brief
Job nightly qui génère les remboursements pour tous les claims `approved` sans remboursement existant.

## Règles de calcul
- Taux de base selon le plan : basic 70%, comfort 85%, premium 100%
- Bonus par catégorie d'acte : dental +10%, optical +5%, consultation/specialist +0%
- Montant = Math.floor(amount_cents * (base_rate + category_bonus))
- Toujours en INTEGER cents

## Complexité couverte
- Business calculation (taux plan + bonus catégorie)
- Idempotency (UNIQUE sur claim_id dans reimbursements)
- Distributed lock (job_locks)

## Transcript
_(colle ici ce que tu as dit pendant la session)_
