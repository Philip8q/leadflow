# CLAUDE.md — LeadFlow

Project-specific guidance for AI assistants (Claude Code / Cursor) working in this repo.

## Project

**LeadFlow** — an AI-driven lead generation & CRM automation system. It captures,
qualifies, scores, and nurtures business leads, combining a web dashboard with
n8n automation workflows. This is the FlyRank internship capstone.

## Stack

- **Language:** JavaScript (Node.js 20+); TypeScript may be adopted as the project grows.
- **Frontend:** React (bundler/framework TBD — likely Vite or Next.js).
- **Backend:** Node.js + Express — REST API.
- **Database:** PostgreSQL (via Supabase).
- **Automation:** n8n on Docker (`localhost:5678`) for lead capture, scoring, and follow-up.
- **Integrations:** Webhooks + REST APIs for lead sources and notifications.

## Conventions

### Git
- **Conventional Commits** for every commit: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`, `perf:`.
- Small, logical commits. Default branch: `main`.

### Code
- Prefer ES Modules, `async/await`, small focused functions, composition over inheritance.
- Readable naming; separation of concerns; avoid large files.
- No secrets in the repo — use `.env` (gitignored) and environment variables.
- Validate and sanitize all external input (form data, webhooks, API params).

### n8n
- Prefer built-in nodes over Code nodes; keep workflows modular (sub-workflows for reusable logic).
- Descriptive node names with functional prefixes: `[HTTP]`, `[DB]`, `[AI]`.
- Use credentials + environment variables; add error workflows and retry logic.

## AI Assistant Rules

- **Think first:** understand → explore → plan → then code. Never guess APIs or schemas — inspect the code.
- **Reuse** existing code before creating new. Production-ready only; no placeholder/TODO code.
- **Verify:** after changes, run lint/tests/build and fix errors before declaring done.
- **Ask** before destructive actions (deleting files, resetting git, dropping tables).
- **Report** at the end of each task: what was built, files changed, commands to run, and next steps.

## Lessons from FE-02 (Prompting Drill)

Rules learned by comparing a vague-prompt build vs. a precise-prompt build of
the same form (see `WORKFLOW.md`):

- Every required/format/range constraint on a form field must be enforced
  with an explicit JS validation function and inline error UI — never rely
  on HTML attributes (`required`, `min`, `max`) alone.
- If a checkbox/toggle implies a dependent field (e.g. "email notifications"
  implies a destination email), that field must exist and its required-ness
  must react to the toggle.
- Every form test suite must include at least one failing/edge-case test
  per validation rule, not just rendering + happy path — a passing suite is
  only meaningful if it actually asserts the constraints.

## Author

Philip — developer & automation engineer (Nairobi). Learning Python & JavaScript;
n8n is the core automation tool.
