# Three Roads: Choosing My Stack — Philip Omondi

Brief: https://aifluency.flyrank.ai/week-04.html#three-roads

## My constraints

- **Free only.** GitHub + a free hosting tier, nothing paid.
- **Honest skill level.** I'm still at the basics with JavaScript and
  Python — React is something I'm learning on the job at FlyRank, not
  something I came in already knowing. n8n/automation is my actual strong
  suit.
- **What the portfolio needs to do.** Per my Week 3 content map: a home
  page (hero claim, case preview, proof strip, CTA), a long-form case
  study page with embedded screenshots, an about page, and a
  contact/booking section.
- **How the work has to be displayed.** Image galleries (real screenshots
  as proof), an actual embedded interactive demo (the real `SettingsForm`
  component I built and tested — not a screenshot pretending to be one), a
  linked code repo, and long-form reading for the case study.
- **Does anything need to be dynamic yet?** No. There's no backend, no
  CRM, no booking system wired up yet — "Book a call" is a CTA with no
  real calendar behind it yet. Honest answer: not yet.

## Three options

**1. Simplest — plain HTML/CSS/JS on GitHub Pages.** Fastest to ship, and
matches where my JS actually is right now. The problem: my strongest piece
of proof, the working `SettingsForm` component, is a real React component
with state and validation — I can't drop that into a static HTML page and
have it actually run. I'd either have to fake it with a screenshot (which
turns real proof into a claim) or hack together some awkward embed. That
defeats the point of a proof-of-work portfolio.

**2. Middle — a React SPA (Vite) on Netlify or GitHub Pages.** This one
actually runs the real demo, and it's honestly closer to my current skill
level than a full framework. The trade-off is SEO: a client-rendered SPA
is weaker for the long-form case-study content, and FlyRank's own
internship goal is literally "SEO-friendly web interfaces" — so picking
something that's weak exactly where my internship wants me strong felt
like the wrong trade to make.

**3. Most powerful — Next.js (App Router) on Vercel.** Server-rendered
(better SEO), file-based routing, free preview deploys on every push,
and room to bolt on a real backend later if LeadFlow ever needs one. The
honest cost: it's more to actually learn than option 2 — App Router
conventions, when something needs to be a server vs. client component —
and that's real weight on top of JS fundamentals I'm still building.

## What I chose, and why

I went with **Next.js on Vercel**.

**Can I maintain this?** Mostly yes, with an honest caveat. I'm learning
App Router conventions as I go rather than already knowing them, so
there's a real ongoing cost — but it's the same stack FlyRank actually
wants me building in, so the learning curve is time I'd be spending
anyway, not extra overhead just for this portfolio.

**Does it show my work the way it needs to be shown?** Yes, and this is
the deciding factor. The `SettingsForm` demo renders as real, working
React — not a screenshot standing in for it. The case study gets
server-rendered long-form content with real SEO instead of a client-only
SPA's weaker version of the same page. Screenshots and the GitHub repo
link both sit naturally alongside that. Option 1 would have forced me to
fake my best piece of proof, and option 2 would have undercut the exact
skill (SEO-friendly frontend work) my internship is actually about. Next.js
was the only one of the three that didn't make me trade away something
that mattered.
