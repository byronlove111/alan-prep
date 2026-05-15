# Cheat Sheet — Alan Screening

---

## Stories to tell

### Lucky Wheel
- **Context:** Châtaigne restaurant client, music festival, food truck
- **Constraint:** 3 days before the event
- **What I built:** web app with a spinning wheel, integrated into the WhatsApp chatbot via QR code
- **Tech decision:** Cloudflare Workers — no infra to manage, zero downtime risk during a live event
- **Anti-cheat:** hashed phone number → unique URL per player
- **Result:** 3,500 people in one live event, 0 bugs, 0 downtime
- **Signal line:** "I didn't over-engineer it — controllers calling the DB, one HTTP call to the chatbot, that's it."

### Cursor Rules by architectural layer
- **Context:** Châtaigne, before Claude Code existed — LLMs couldn't follow our codebase patterns
- **What I did:** built Cursor Rules scoped by regex to each architectural layer (domain, application, presentation) — each layer had its own rule file that loaded automatically into context
- **Result:** the AI followed our patterns without repetition, the whole team adopted it
- **Follow-up:** gave a talk about it at a Cursor meetup at Amo's office — 100 people
- **Signal line:** "I solved a context problem before most people had even framed it that way — before Claude Code existed."

### OpenSourceTogether pivot
- **Context:** team of 9, over-engineered backend, nearly impossible to maintain, 3 months blocked
- **Decision:** proposed rebuilding everything — rejected by almost everyone
- **How I handled it:** called each person who pushed back individually to understand their objection
- **What I discovered:** the backend dev wasn't lazy — he was insecure, he wanted to shine
- **Result:** rewrote only the blocking parts (not everything), shipped, 100 users at launch, 0 bugs
- **Signal line:** "Seeking information before deciding — not consensus."

### Châtaigne frontend overhaul
- **Context:** vibe-coded frontend, 20-second load times, bugs everywhere, no architecture
- **What I did:** full ownership — feature-based architecture, TanStack Query, Zustand, Cursor Rules per layer
- **Result:** 20s → 3s page load, 3s → 50ms conversations, 80% fewer bugs, still in production today
- **Signal line:** "Still running in production, one year later, with my architecture."

---

## Questions to ask Alan

### ✅ #1 — MUST ASK — On Hooper / trust problem
> "You're building Hooper to let non-engineers ship production code. The hardest problem I kept running into when teaching Cursor is that people understand the output but not the reasoning — they can't catch when the AI is wrong. How does Hooper handle that trust problem?"

*Why:* most personal, most connected to your expertise. Opens the conversation on your Cursor Ambassador experience naturally.

### ✅ #2 — MUST ASK — On written culture as retrieval infrastructure
> "Alan's written-first culture is everywhere in your docs — every decision, every idea, written down by default. I'm curious how that maps to your AI stack. Is Dust essentially your retrieval layer on top of that written context? And given how much Alan values owning its technical stack, how do you think about the long-term — building more of that in-house, or staying on external providers like Anthropic?"

*Why:* most intellectually sophisticated question. No other intern asks this. Shows you connect culture to engineering decisions.

### ✅ #3 — MUST ASK — On interns as AI experts
> "I read that interns at Alan often become the AI experts who end up teaching the rest of the team. That's literally what I've been doing as Cursor Ambassador for the past year — teaching senior developers new workflows. How does that dynamic actually work inside Alan? Do interns get space to experiment and share, or does it happen more organically?"

*Why:* closes on your profile. You're not just asking to learn — you're signaling you come with something to contribute.

### ⚠️ #4 — USE ONLY IF TIME — On Ops AI Agents
> "I read your blog post on the Ops AI Agents — 15 tools, 94% accuracy, 70% of blocked movements handled autonomously. You mentioned the Git-based workflow was slowing down iterations. Are you solving that with a UI layer on top, or exploring something more meta — like an agent that helps write the other agents' prompts?"

*Why only if time:* very strong technically but cold for a screening. Better suited for Alan Day with an engineer.

### ❌ SKIP — On intern ownership
> "I read about an intern who owned a full document validation rule end to end — from business requirement to production. How does that ramp-up work in practice?"

*Why skip:* #3 covers the same ground better and is more personal.

