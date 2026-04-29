# Transcript — Fit Question — 29/04/2026

---

**Q (Radical Transparency)**: Tell me about a mistake you made on a project — something that went wrong because of a decision you made. How did you handle it, and how did you communicate it?

**A**: At my last startup (AI for food), I was in charge of the client onboarding feature — a big, complex feature, project already in production. It was my first big feature. I stressed out and over-engineered everything. I planned for a week without coding a single line, trying to cover every edge case. After 7-10 days I had nothing built. My founder came to me and asked where I was. I admitted I only had a plan and felt the project was too big to handle alone. We discussed it, and he told me to build small, ship something minimal viable, and engineer further only if needed. I did that, built the whole thing in 4 days, shipped a week later, and clients loved it.

💡 **What you should have said**: "At Chatain.ai, I was responsible for the client onboarding feature — the most complex thing I'd built in a production system. After three days with no code written, I went to my founder and said: 'I need to flag something — I'm blocked and I think I've been over-planning.' I didn't wait for him to come to me. He helped me reframe: ship a minimal version first, extend if needed. I rebuilt my approach, shipped in four days, and clients completed onboarding without issues. Since then, my rule is simple: if I'm stuck for more than a day, I raise it — I don't sit on it."

---

**Follow-up**: You said you told your founder "I don't know how to handle this project by myself" — that's a vulnerable thing to admit. What made you decide to go to him instead of just trying to figure it out alone? And looking back, do you think you waited too long before raising it?

**A**: Yes, looking back I should have gone to him way earlier. My lesson: if you're stuck on a problem for more than an afternoon, just talk to someone. You might not get the answer, but expressing yourself makes everything clearer. After that experience, every time I owned a feature I talked to the team proactively — asking "if you had to build this, how would you approach it?" Communication became much more natural.

💡 **What you should have said**: "Yes, I waited too long — he came to me, not the other way around. The lesson I took from that is concrete: if I'm stuck for more than a day, I surface it. Not to ask for help necessarily, but to think out loud with someone. After that, on the backend optimization project, I didn't wait — I went to the most experienced person on the team before writing a single line. That 30-minute conversation saved me probably two days of going in the wrong direction."

---

**Follow-up**: Can you give me one specific example where you communicated early and it made a concrete difference?

**A**: After that, I had to optimize our completely unoptimized backend — first time doing database optimization. The first thing I did was go to the person on the team who was great at this and said "I have to build this this week, can we talk through how you'd approach it?" We talked for 30-60 minutes. Then I dug into articles on Prisma optimization, discovered indexing. At every step I went back to my co-founder: "I'm planning to do X — is this a mistake or a good call?" Usually he'd say "go with it, I trust you." But expressing my thinking out loud made my ideas clearer and helped me avoid over-engineering.

💡 **What you should have said**: "The next feature I owned was a full backend optimization — first time touching database indexing. Before writing anything, I booked 30 minutes with the most experienced backend person on the team. I walked him through what I was planning. He flagged two things I hadn't considered. That conversation alone probably saved me from shipping something broken. I also sent a short written update to my co-founder at each step: 'I'm doing X, here's why, let me know if you see a problem.' He never blocked anything, but the discipline of writing it down made my own thinking sharper."

---

**Q (Mission is the Boss)**: Tell me about a project you were genuinely passionate about — something where the mission actually mattered to you personally. What drove you?

**A**: Open Source Together. After my job, in my free time, I called friends and built a team around an idea: make open source accessible to junior developers. At the time open source felt scary and exclusive — reserved for seniors. We built a web app that recommends GitHub repositories based on your tech stack and interests. If you like video games and know C++, we'd recommend video game repos in C++. The goal: get people to discover a repo, find an issue, and make their first contribution. I was the founder and owner — I had the idea, recruited developers, designers, marketing people, defined the tech stack, assigned roles. We shipped it, got ~100 GitHub stars and ~1000 Twitter followers. The experience also taught me a lot: good PR practices, conventional commits, collaboration — things I didn't get working alone at my startup.

💡 **What you should have said**: "I saw junior developers around me — friends, people in my network — giving up on contributing to open source because they couldn't find an entry point. The ecosystem felt gatekept. I decided to fix that. I built Open Source Together: a web app that recommends GitHub repositories based on your tech stack and interests — if you love video games and know C++, we surface video game repos in C++. I recruited the team, defined the stack, owned every major decision. We shipped, got 127 GitHub stars and close to 1,000 Twitter followers. The mission drove me because I had personally felt that frustration — I wasn't building this for a resume, I was building it because I needed it myself a year earlier."

---

**Follow-up**: You said you called friends, built the team, defined the stack, assigned roles. At some point you must have had to make a call that others disagreed with. What was the hardest decision you made — and how did you land on it?

**A**: The hardest decision was ditching the entire tech stack mid-project. At the start, I let each developer choose their preferred stack — frontend chose Next.js, backend chose NestJS. I thought this made sense because everyone would work in what they knew. But I was choosing for the team, not for the project. When people left, replacements couldn't onboard — the architecture was too complex. I decided to simplify everything: easier stack, easier architecture. A lot of developers were against it. I called each one individually, explained the reasoning, asked them to think about the project rather than their personal preferences or ego. "This isn't about your stack — this is about what makes the project move faster." Most came around. We rebuilt and shipped.

💡 **What you should have said**: "Mid-project, I made the call to scrap the entire tech stack and rebuild. I had chosen NestJS to satisfy my backend developer — it was what he knew. But I had optimized for team comfort, not for project sustainability. When people left, nobody could onboard. The codebase was too complex. I gave myself a week to evaluate options, then I made the decision: we rebuild with something simpler. I called every team member individually — not to ask for permission, but to explain my reasoning and give them the chance to push back. Two people were frustrated. I listened, held the decision. Three weeks later the whole team was moving faster, and we shipped. That decision was mine — if it had been wrong, it would have been on me."