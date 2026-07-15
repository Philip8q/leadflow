# LeadFlow

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org)

> AI-driven lead generation & CRM automation — FlyRank internship capstone.

LeadFlow is a lead management system that captures, qualifies, scores, and nurtures
business leads using automated workflows. It pairs a web dashboard with
[n8n](https://n8n.io)-powered automation to turn raw inbound interest into an
organized, actionable sales pipeline.

## Status

🚧 **Early setup** — capstone scaffolding in progress.

## Planned Features

- Lead capture via web forms and webhooks
- Automated lead qualification and scoring
- CRM dashboard to track leads through the pipeline
- n8n workflows for follow-up automation (email / notifications)
- AI-assisted lead enrichment and summaries

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React (bundler TBD) |
| Backend | Node.js + Express (REST API) |
| Database | PostgreSQL / Supabase |
| Automation | n8n (Docker) |
| Tooling | Git, GitHub, Claude Code |

## Prerequisites

- [Node.js](https://nodejs.org) 20 or later (LTS recommended) and npm
- [Git](https://git-scm.com)
- [Docker](https://www.docker.com) — for running the local n8n instance

## Getting Started

```bash
# clone the repo
git clone <repo-url>
cd leadflow

# install dependencies (once package.json exists)
npm install

# run the dev server (once configured)
npm run dev
```

## Project Conventions

See [CLAUDE.md](./CLAUDE.md) for the full stack description, coding standards,
and AI-assistant working rules.

## License

[MIT](./LICENSE) © 2026 Philip
