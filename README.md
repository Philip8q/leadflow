# LeadFlow

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org)

> AI-driven lead generation & CRM automation — FlyRank internship capstone.

LeadFlow is a lead management system that captures, qualifies, scores, and nurtures
business leads using automated workflows. It pairs a web dashboard with
[n8n](https://n8n.io)-powered automation to turn raw inbound interest into an
organized, actionable sales pipeline.

## Status

🏗️ **In development** — first working feature shipped, rest of the pipeline in progress.

## Built So Far

- **App skeleton** — Next.js (App Router) with routed placeholder pages for every
  screen in the portfolio sitemap (Home, Case Study, About, Contact), a shared
  layout with responsive nav, Tailwind design tokens matching the
  [identity kit](./docs/ai-fluency/week-3/identity-kit.html) brand, and a
  `/health` page + `/api/health` route for deployment checks.
- **Lead Notification Preferences settings form** (`components/SettingsForm.jsx`) —
  validated display name, notification email (conditionally required), and lead
  alert threshold, built on a reusable `FormField` primitive. Fully tested
  (`components/SettingsForm.test.jsx`, 5 passing tests), live at `/demo`, and
  documented end-to-end in [`WORKFLOW.md`](./WORKFLOW.md) (a vague-prompt vs.
  precise-prompt build comparison) and
  [`docs/ai-fluency/week-2/PROMPT_ITERATION_LOG.md`](./docs/ai-fluency/week-2/PROMPT_ITERATION_LOG.md)
  (a 5-layer prompt-engineering refactor, cross-model verified).
- **Accessible component playground** (`playground/`) — a Modal, Tabs, and
  Disclosure built from scratch against their W3C ARIA Authoring Practices
  patterns, verified with keyboard-interaction tests, compared against
  shadcn/ui's equivalents in `playground/NOTES.md`.
- **Lead-qualification chat** (`app/api/chat/route.js`, `app/demo/lead-chat/`) —
  a streaming AI chat demoing LeadFlow's actual planned qualification feature,
  built on the AI SDK (`streamText` + `useChat`) via OpenRouter's free tier.
  Model + system prompt live in `lib/ai/lead-chat-config.js`. Live at
  `/demo/lead-chat`, written up in
  [`docs/ai-fluency/week-4/STREAMING_CHAT.md`](./docs/ai-fluency/week-4/STREAMING_CHAT.md)
  (including a real production bug — a free-tier model that timed out on
  Vercel despite working locally — caught and fixed).

## Planned Features

- Lead capture via web forms and webhooks
- Automated lead qualification and scoring
- CRM dashboard to track leads through the pipeline
- n8n workflows for follow-up automation (email / notifications)
- AI-assisted lead enrichment and summaries

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js (App Router) + Tailwind CSS v4 |
| Backend | Node.js + Express (REST API) |
| Database | PostgreSQL / Supabase |
| Automation | n8n (Docker) |
| Tooling | Git, GitHub, Claude Code |
| Deployment | Vercel — preview build on every push |

## Prerequisites

- [Node.js](https://nodejs.org) 20 or later (LTS recommended) and npm
- [Git](https://git-scm.com)
- [Docker](https://www.docker.com) — for running the local n8n instance

## Getting Started

```bash
# clone the repo
git clone https://github.com/Philip8q/leadflow.git
cd leadflow

# install dependencies
npm install

# run the dev server
npm run dev

# run the test suite
npm test
```

## Deployment

Deployed on [Vercel](https://vercel.com), zero-config for Next.js:

1. Import the GitHub repo in the Vercel dashboard (New Project → select `leadflow`).
2. Leave build settings on their Next.js defaults.
3. If you add a `NEXT_PUBLIC_SITE_URL` override, set it under Project Settings →
   Environment Variables (see [`.env.example`](./.env.example)) — not required in
   normal use, since Vercel sets `VERCEL_URL` automatically.
4. Every push gets its own preview deployment; merges to `main` deploy to production.

## Project Conventions

See [CLAUDE.md](./CLAUDE.md) for the full stack description, coding standards,
and AI-assistant working rules.

## License

[MIT](./LICENSE) © 2026 Philip
