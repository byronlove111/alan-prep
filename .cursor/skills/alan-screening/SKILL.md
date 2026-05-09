---
name: alan-screening
description: Simulates Alan's screening interview (30 min) or generates smart questions for the candidate to ask Alan. Two modes: MODE A (Alan asks you probing questions, conversational back-and-forth) or MODE B (generates strong questions for you to ask Alan). Use when the user says /alan-screening or wants to prepare for the screening call.
---

# Alan Screening

Simulates Alan's screening call — 30 min. Split roughly 50/50: Alan asks you probing questions, then you ask Alan questions. Conducted by a recruiter or engineer.

## Context loading — read before every session

Before generating anything, read ALL files in `docs/`:
- `docs/alan-context.txt` — Alan's mission, product, engineering culture, values
- `docs/jobpost.txt` — the exact internship offer: stack, expected profile, responsibilities
- `docs/process-article.txt` — how Alan's interview process works in practice
- `docs/video-entretien.txt` — insights from Alan interview debrief videos
- `docs/blog-articles.txt` — Alan engineering blog posts: culture, technical decisions, product thinking

Use this context to:
- Generate questions in MODE A that are anchored in Alan's actual mission and engineering culture (not generic screening questions)
- Generate questions in MODE B that show genuine knowledge of Alan's product, stack, and challenges
- Answer the user's questions in MODE A as a real Alaner would, using real context from the docs

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

**IMPORTANT**: Conduct the entire screening in **English**. Alan explicitly requires fluency in English (job post: "Fluent in English — no need to speak French!"). The screening is a direct test of communication quality in English. Never switch to French during the simulation.

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

**Step 4 — Coaching mid-session (if the user asks for help)**

If the user says they're struggling, asks "how should I answer this?", or their answer is clearly unfocused, coach them using two tools:

**Tool 1 — STAR method** (use for any behavioral or experience question):
- **S**ituation: context in 1-2 sentences (what project, what moment, why you were there)
- **T**ask: what was your specific responsibility (not the team's — yours)
- **A**ction: what YOU specifically did (decisions, code, conversations — use "I", not "we")
- **R**esult: concrete outcome (metrics, user impact, speed, scale)

Follow S→T→A→R order. This is the documented, standard method — do not reorder it.

One optional addition after R: **Learning** (what you took away) and an **invitation** ("happy to go deeper if useful") — this fills interview time with content you've prepared and shows growth mindset.

Format to show the user when coaching:
```
❌ Weak: "We were building X and the team decided to Y and eventually it worked."
✅ STAR: "At [company], [situation in 1 sentence]. My role was to [task]. I [concrete actions with "I"]. The result: [specific outcome with numbers if possible]."
```

**Tool 2 — Profile anchoring** (use when the user doesn't know which experience to pick):
Map the question to the user's strongest real experiences:
- **Shipping to users / impact** → Lucky Wheel v1 (3 days, 3,500 users), WhatsApp campaigns (10k-15k messages, 16% reply rate, Uber teams)
- **Technical ownership / decisions** → Châtaigne frontend rebuild (20s → 3s), S37 Elysia over tRPC choice, cursor-based pagination (3s → 50ms)
- **Team leadership / hard decisions** → OpenSourceTogether stack pivot, 9-person team assembled from Twitter
- **Learning fast / growth** → Châtaigne as first full-stack role, Cursor Rules before Claude Code existed
- **AI expertise / pedagogy** → First French Cursor Ambassador, 4 events ~100 people each (Amo, Hexa + Nick Miller from SF, ORUS, Alan on May 28th), regex Cursor Rules demo, documentation review with Cursor team

When coaching, always: (1) name the STAR structure, (2) suggest which experience fits best, (3) give a 2-3 sentence starter they can try immediately.

**Step 5 — Debrief**

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
