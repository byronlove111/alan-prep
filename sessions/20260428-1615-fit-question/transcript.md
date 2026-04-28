# Transcript — Fit Question — 28/04/2026

---

**Q (Always Growing)**: Tell me about a time you received very direct, critical feedback — from a teacher, a teammate, anyone. How did you react, and what did you do with it?

**A**: At my last startup, Chatain.ai, I was asked to build a really complex onboarding for clients — a big feature where clients had to enter a lot of documents into the system. I was in charge of the project, it was my first experience building something from zero in a real startup. The problem was that I over-engineered the system a lot. I planned the feature for one week without coding at all, just to understand how to do it. I thought it was the right thing because the AI would help with execution, so I needed to deeply understand the system first. The critical feedback was that I had over-engineered it — it wasn't that complex. What I learned was to build step by step, start small, and extend when needed. Don't try to anticipate every use case and edge case — just build and extend if something crashes or is missing.

💡 **What you should have said** : "At Chatain.ai, I was in charge of building the client onboarding from scratch — a feature where users had to submit a lot of documents. It was my first time owning a full feature in a real startup. I spent an entire week planning before writing a single line of code, mapping every edge case, designing the whole architecture upfront. My co-founder told me I was over-engineering it — the problem was much simpler than I made it. My first instinct was to push back, but after thinking it through I realized he was right: I was optimizing for problems that didn't exist yet. I changed my approach entirely. The next feature I built, I forced myself to ship a working version in three days and extend from there. The onboarding shipped two weeks later — users responded well to the new flow, and we iterated from there."

---

**Follow-up**: You said you planned for a week before writing a single line of code. When your manager gave you that feedback — what did they say exactly? Was it in a one-on-one, in a meeting? And what was your first reaction internally?

**A**: At first I tried to defend my opinion — I was like, okay, maybe I'm right that it's complex. But I really started questioning myself about the system and realized I was missing something. So I asked my co-founder what I should do in his opinion, and he told me to try things smaller and grow with time. I listened to him, tried his approach, and corrected my thinking.

💡 **What you should have said** : "My first instinct was to push back — I thought the complexity was justified. But two days in, I paused and genuinely tried to see it from his perspective. I realized I had been planning to solve problems that might never actually exist. I asked him to walk me through how he would have approached it, not to just follow his advice, but to understand the reasoning. That conversation shifted something for me: I started shipping small, measurable pieces instead of building the perfect system upfront."

---

**Follow-up**: After you changed your approach — what actually happened with the onboarding feature? Did it ship? What was the result?

**A**: The onboarding feature was complex, we pushed it two weeks later and it was really great. Users liked the new interface and the new flow. There were some bugs after, but the startup philosophy at the time was pre-seed — push it and fix later. It shipped and everything was working fine except some minor bugs.

💡 **What you should have said** : "It shipped two weeks later. The new flow was much simpler than what I had originally planned, and clients actually completed the onboarding — which was the real metric. There were a few bugs we patched in the days after, but the core experience worked. More importantly, that feature changed how I approached every project after it: I now set a hard deadline to have something running before I'm allowed to add complexity."

---

**Q (Distributed Ownership)**: Tell me about a moment where you had to make an important decision on a project completely on your own — no one to validate it, no consensus. What did you decide, and how did you make that call?

**A**: When I was building Open Source Together, an open source project where I called a lot of friends to work with me. I had full leadership and ownership — I was the one thinking about the system, the tech stack, building the team, deciding who works with who. The important decision was about the tech stack. I initially chose stacks based on each developer's experience — if my backend developer knew Java, I'd choose Java. I thought it would fit everyone. But after many months of development, we figured the tech stack was way too complex for what we needed. My backend developer knew JavaScript, so I chose NestJS — a big framework for big projects — but our project didn't need that complexity. I chose it just to satisfy my developer, but in reality they knew JavaScript and TypeScript, so we could have used HonoJS or Elysia. The project became really hard to manage, and letting every developer own his feature without alignment caused a lot of over-engineering, like I had done before. My final decision was to ditch the tech stack entirely and rebuild with a new one. We moved to Next.js and chose a simpler backend — Express or something similar — because it was much simpler. That was my decision.

💡 **What you should have said** : "I was leading Open Source Together — I built the team, defined the architecture, and owned every major decision. After a few months, I realized the tech stack I had chosen was way too complex for what we actually needed. I had picked NestJS to make the backend developer comfortable, but it introduced complexity that slowed everyone down. I gave myself one week to evaluate the options, gathered everyone's input, and then I made the call: we were scrapping the stack and rebuilding with something simpler — a Next.js frontend and a lightweight Express backend. I knew some people would push back, and they did. But I owned the decision fully: if it was wrong, it was on me. Three weeks later, the team was moving twice as fast, and the project shipped."

---

**Follow-up**: When you announced that decision to the team — people who had been working in that stack for months — how did they react? And how did you handle the pushback?

**A**: A lot of developers were grateful because the codebase was really hard to work with. But there were two camps — one saying we need to switch because we'll never ship, and another saying we already did a lot, let's just simplify some things instead of rebuilding. Both opinions were valid, but for the health of the team I chose to rebuild entirely — it was like a new beginning, we could forget our mistakes and start fresh. Some developers were against it, but two or three weeks later they understood. The project is out, a lot of users use it. I think it was the right decision.

💡 **What you should have said** : "There were two camps. Half the team wanted to rebuild, the other half wanted to patch. I listened to both sides — I genuinely considered the incremental approach. But I decided a clean rebuild was the right call: the codebase was too tangled to fix incrementally without dragging the same problems forward. I told the team: 'I hear the concern, but this is the direction I'm choosing. Give it three weeks and tell me if I was wrong.' Two or three people were frustrated at first. Three weeks later, everyone was moving faster. The project shipped, and it's live today with real users."