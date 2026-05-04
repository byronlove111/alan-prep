# Transcript — Fit Question — 28/04/2026

---

**Q (Always Growing)**: Tell me about a time you received very direct, critical feedback — from a teacher, a teammate, anyone. How did you react, and what did you do with it?

**A**: At my last startup, Chatain.ai, I was asked to build a really complex onboarding for clients — a big feature where clients had to enter a lot of documents into the system. I was in charge of the project, it was my first experience building something from zero in a real startup. The problem was that I over-engineered the system a lot. I planned the feature for one week without coding at all, just to understand how to do it. I thought it was the right thing because the AI would help with execution, so I needed to deeply understand the system first. The critical feedback was that I had over-engineered it — it wasn't that complex. What I learned was to build step by step, start small, and extend when needed. Don't try to anticipate every use case and edge case — just build and extend if something crashes or is missing.

💡 **What you should have said** : "At Châtaigne.ai, I was in charge of building the client onboarding from scratch — a multi-step flow with branching logic based on client type and an admin monitoring dashboard. It was my first time owning a feature of that scope in a production system. I spent an entire week planning before writing a single line of code, mapping every edge case, designing the whole system upfront. My co-founder gave me direct feedback: I was over-engineering it — the problem was much simpler than I made it. My first instinct was to push back, but after sitting with it I realized I was optimizing for problems that didn't exist yet. I rebuilt my approach entirely, shipped the onboarding two weeks later, and clients completed the flow. That lesson stayed with me: months later, it's why I was able to ship Lucky Wheel v1 in three days — 3,500 users at a live event."

---

**Follow-up**: You said you planned for a week before writing a single line of code. When your manager gave you that feedback — what did they say exactly? Was it in a one-on-one, in a meeting? And what was your first reaction internally?

**A**: At first I tried to defend my opinion — I was like, okay, maybe I'm right that it's complex. But I really started questioning myself about the system and realized I was missing something. So I asked my co-founder what I should do in his opinion, and he told me to try things smaller and grow with time. I listened to him, tried his approach, and corrected my thinking.

💡 **What you should have said** : "My first instinct was to push back — I thought the complexity was justified. But I paused and genuinely tried to see it from his perspective: I was planning to solve problems that might never actually exist. I asked him to walk me through how he would have approached it — not to comply with his advice, but to understand his reasoning. That conversation shifted how I work: I started shipping small, working pieces before adding complexity. That shift is what made it possible, a few months later, to ship Lucky Wheel v1 in three days."

---

**Follow-up**: After you changed your approach — what actually happened with the onboarding feature? Did it ship? What was the result?

**A**: The onboarding feature was complex, we pushed it two weeks later and it was really great. Users liked the new interface and the new flow. There were some bugs after, but the startup philosophy at the time was pre-seed — push it and fix later. It shipped and everything was working fine except some minor bugs.

💡 **What you should have said** : "It shipped two weeks later. The flow had branching logic for different client types and an admin dashboard to monitor completion — simpler than what I had originally scoped, but it worked. Clients completed onboarding, which was the real metric. There were a few minor bugs we patched in the days after — that's the pre-seed startup reality. More importantly, that feature changed how I approach every project: I set a hard internal deadline to have something running end-to-end before I'm allowed to add complexity."

---

**Q (Distributed Ownership)**: Tell me about a moment where you had to make an important decision on a project completely on your own — no one to validate it, no consensus. What did you decide, and how did you make that call?

**A**: When I was building Open Source Together, an open source project where I called a lot of friends to work with me. I had full leadership and ownership — I was the one thinking about the system, the tech stack, building the team, deciding who works with who. The important decision was about the tech stack. I initially chose stacks based on each developer's experience — if my backend developer knew Java, I'd choose Java. I thought it would fit everyone. But after many months of development, we figured the tech stack was way too complex for what we needed. My backend developer knew JavaScript, so I chose NestJS — a big framework for big projects — but our project didn't need that complexity. I chose it just to satisfy my developer, but in reality they knew JavaScript and TypeScript, so we could have used HonoJS or Elysia. The project became really hard to manage, and letting every developer own his feature without alignment caused a lot of over-engineering, like I had done before. My final decision was to ditch the tech stack entirely and rebuild with a new one. We moved to Next.js and chose a simpler backend — Express or something similar — because it was much simpler. That was my decision.

💡 **What you should have said** : "I co-founded Open Source Together — I assembled a nine-person team from my Twitter network and owned every major decision: architecture, roles, roadmap. After a few months, I realized the architecture I had approved was unworkable: each developer had chosen their own framework based on personal preference, and whenever someone left, nobody new could onboard. I gave myself one week to evaluate options, gathered input from everyone, and then I made the call: we were scrapping the fragmented stack and rebuilding on a unified architecture — Next.js on the frontend, NestJS on the backend, PostgreSQL with Prisma, deployed on Cloudflare Workers. I knew people would push back, and they did. But I owned the decision fully: if it was wrong, it was on me. Three weeks later the team was moving faster, and the beta became one of the most-viewed products in the French dev community."

---

**Follow-up**: When you announced that decision to the team — people who had been working in that stack for months — how did they react? And how did you handle the pushback?

**A**: A lot of developers were grateful because the codebase was really hard to work with. But there were two camps — one saying we need to switch because we'll never ship, and another saying we already did a lot, let's just simplify some things instead of rebuilding. Both opinions were valid, but for the health of the team I chose to rebuild entirely — it was like a new beginning, we could forget our mistakes and start fresh. Some developers were against it, but two or three weeks later they understood. The project is out, a lot of users use it. I think it was the right decision.

💡 **What you should have said** : "There were two camps across the nine-person team. Half wanted a clean rebuild, the other half wanted to patch what was there. I genuinely considered the incremental approach — it was tempting. But I made the call: the architecture was too tangled to fix piece by piece without dragging the same problems forward. I called each person individually: 'This is the direction I'm choosing — give me three weeks and tell me if I was wrong.' Two or three were frustrated. I listened, held the decision. Three weeks later everyone was moving faster. We shipped. The beta became one of the most-viewed products in the French dev community that week."