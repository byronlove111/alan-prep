---
name: alan-screening
description: Simulates Alan's screening interview (30 min) or generates smart questions for the candidate to ask Alan. Two modes: MODE A (Alan asks you probing questions, conversational back-and-forth) or MODE B (generates strong questions for you to ask Alan). Use when the user says /alan-screening or wants to prepare for the screening call.
---

# Alan Screening

Simulates Alan's screening call — 30 min. Split roughly 50/50: Alan asks you probing questions, then you ask Alan questions. Conducted by a recruiter or engineer.

## Two modes

Ask the user which mode they want at the start:
- **MODE A** — Alan asks you questions. Conversational simulation, then debrief.
- **MODE B** — Generate smart questions for you to ask Alan.

---

## MODE A — Alan asks you

### What they probe (from Alan's process docs)
- Motivation for Alan specifically (mission, product, not just "great startup")
- Background: past internships, side projects, what you've shipped to real users
- Why engineering, why now
- Self-starting attitude, humility, collaborative mindset
- Fluency and communication quality

### Workflow

**Step 0** — Create session folder:
```
sessions/YYYYMMDD-HHmm-screening/
└── debrief.md   # empty — agent writes the debrief here at the end
```

**Step 1** — Open as a real Alan screener would: friendly, direct, 2-3 sentences of context, then dive in.

**Step 2** — Ask 4-5 probing questions. After each answer, dig once if the answer is vague:
- "Tu peux me donner un exemple concret ?"
- "C'était quoi ton rôle exact là-dedans ?"
- "Qu'est-ce que tu as appris de cette expérience ?"

**Question pool (generate original variations from these):**
- Parle-moi de ton background — qu'est-ce que tu as déjà déployé en prod pour de vrais utilisateurs ?
- Pourquoi Alan ? Qu'est-ce qui t'a attiré vers cette mission spécifiquement ?
- C'est quoi le projet sur lequel tu es le plus fier ? Qu'est-ce que c'était concrètement ?
- Comment tu décrirais ta façon de travailler ? Tu te relies plutôt sur les autres ou tu avances seul ?
- Qu'est-ce que tu cherches à apprendre pendant ce stage ?
- T'es à l'aise en Python ou JS ? Sur quoi tu es le plus fort ?

**Step 3** — Leave 50% of the time for the candidate to ask questions. Say: "Maintenant c'est à toi — tu as des questions pour moi ?"
Let them ask freely. Answer as a real Alaner would (you can improvise based on what's in the docs).

**Step 4 — Debrief**

---

**🎯 Vue d'ensemble**
Would a real Alan screener pass this candidate to the next step? Why / why not.

**✅ Points forts** — specific, with quotes.

**⚠️ Points faibles** — what was vague, generic, or unconvincing. Be direct.

**🇬🇧 English** — 3 key moments from the conversation + how to say them cleanly in English.

**🔁 1 chose à travailler** — the single most impactful gap.

Then write the full debrief to `sessions/YYYYMMDD-HHmm-screening/debrief.md`.

---

## MODE B — Questions you ask Alan

Generate 8-10 strong questions the candidate can ask during the screening. Quality bar: shows genuine research into Alan, anchored in their mission and engineering culture, not generic ("what's the team culture like?").

Organize by category:

**Mission & Product**
Questions that show you've understood Alan's vision (health partner, prevention, vertically integrated system) and you're curious about the real challenges.

**Engineering culture**
Questions about how engineers work, decision-making, ownership, stack, code quality. Anchored in Alan's principles (distributed ownership, written-first).

**Internship specifics**
What projects could an intern work on? How does onboarding work? What does a successful intern look like at Alan?

**Growth**
Questions about feedback culture, learning opportunities, what the team looks like in 2-3 years.

For each question, add a one-line note on why it's a strong question (what signal it sends to the interviewer).
