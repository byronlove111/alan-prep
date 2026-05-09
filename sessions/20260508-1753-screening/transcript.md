# Transcript — Screening — 08/05/2026

---

**Q: What's the most complex system you've shipped to real users — and what made it complex?**

**A**: The most complex thing I built was at my last startup named Châtaigne. When I arrived, I was the first founding engineer and the frontend was mainly built by the main founder without structure — no single responsibility, files doing too many things. I had to rebuild everything from scratch. I learned a lot about how to structure a frontend with Next.js, TanStack Query, feature-based architecture. The result is that the entire frontend was rebuilt and has been in production for about a year. Everything is scalable and clean now.

*(Note: no metrics mentioned spontaneously — 20s → under 3s load time and 3s → 50ms conversations were missing)*

---

**Q (follow-up): What was the hardest architectural decision you had to make during that rebuild?**

**A**: To prevent a lot of bugs — we had many when I joined — I decided to create a shared TypeScript package to sync types between the frontend and backend. The problem was that types weren't being propagated properly to the frontend when we added new features. Since we had a TypeScript monorepo, I created a separate package called `@chataigne/client` that contained every type for every entity in our codebase. After that, we had zero desynchronization between frontend and backend on types.

*(Note: didn't explain what made it hard — the migration effort of updating every file to import from the shared package was missing)*

---

**Q (from user): Would I have ownership as an intern? What's a typical feature an intern can ship end to end?**

**A (Thomas)**: Yes — from week one you're treated like any other Alaner. You'll have a road buddy. After 2-3 weeks you're on a real feature end to end — you define the approach, write the code, write the tests, ship it. A recent intern on Claims owned the full implementation of a document validation rule from business requirement to production. Scope is smaller but ownership is the same.

---

**Q (from user): That intern — did they talk to clients/ops to discover the feature, or did a senior hand them the spec?**

**A (Thomas)**: They drove the discovery. Read existing business requirements, talked to the ops team using the validation tool, defined the edge cases themselves. The senior was a sounding board, not a manager. That's distributed ownership in practice.

---

**Q (from user): I'm a Cursor ambassador and I teach AI workflows at scale. How does Alan use AI internally — do you have your own workflows, or is it still being figured out?**

**A (Thomas)**: We use AI tools including Cursor. We also build AI-native products — the Ops AI Agents team handles blocked employment movements end to end with 15 tools and human-in-the-loop validation. That's production AI. On the coding side: heavy use, but not vibe-coding — we review everything and keep architectural decisions ours. Your background as a Cursor ambassador who teaches this at scale is genuinely interesting to us.
