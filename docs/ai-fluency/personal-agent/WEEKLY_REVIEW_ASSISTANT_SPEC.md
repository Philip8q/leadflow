# Weekly Review Assistant — Agent Design Spec

Brief: Design Your Personal Agent
Author: Philip
Date: 2026-08-27

## Job to be done

Every week, pull together what actually happened across my active work —
git activity, my n8n automation runs, and my FlyRank internship progress
— into one short report: **what shipped, what's stalled, what to
prioritize next week.**

This isn't a hypothetical need. Mid-internship I lost track of what had
actually landed across several parallel tracks (aifluency coursework,
n8n automation, the FE-0N builds) and asked point-blank whether any of it
was real. It took someone else pulling up `git log` and live commit
hashes to answer that. A weekly agent that does that pull automatically,
before I have to ask, is the whole point.

## The user and usage frequency

Just me. Runs once a week, unattended (n8n schedule trigger, similar to
the existing [Weekly Industry Brief](../week-4/AUTOMATION_WORKFLOW_WALKTHROUGH.md)
pipeline) — Sunday evening, so the report is waiting Monday morning.
Reading it should take under 5 minutes.

## Tools, data, and access plan

| Source | What it provides | Access plan |
| --- | --- | --- |
| GitHub REST API | Commits per repo since last run (`leadflow`, `expense-tracker`, others as they appear) | `GET /repos/{owner}/{repo}/commits?since=...` — public repos need no auth; a fine-grained PAT with read-only `contents` scope if any repo goes private. Stored as an n8n credential, never in workflow JSON. |
| n8n REST API | Execution history for the Weekly Industry Brief (and any future) workflows — success/fail, timing | `GET /api/v1/executions` with an n8n API key. **Known constraint**: this key has expired silently before (see FL-04 notes) — the agent must treat an auth failure here as "couldn't check n8n," not "no activity." |
| FlyRank internship portal | Assignment status (submitted / not started) | **No public API exists.** Realistic plan: Philip pastes the portal's own status snapshot into the trigger input once a week (a 30-second copy-paste), rather than building a fragile scraper or storing portal login credentials in an automation. This is a deliberate scope cut, not an oversight — the "access plan" for this source is manual by design. |

## Draft instructions (system prompt sketch)

> You are Philip's Weekly Review Assistant. You will be given: (1) a list
> of git commits per repo since the last run, (2) a summary of n8n
> executions since the last run, (3) a pasted snapshot of FlyRank portal
> assignment status (may be absent). Produce a report with three
> sections: **Shipped** (real commits/features, grouped by repo — skip
> purely cosmetic commits like formatting unless asked), **Stalled /
> Blocked** (anything that errored, or was started but not finished),
> **Next week** (a short prioritized list, inferred only from what's
> visibly incomplete, never invented). If a data source is missing or
> failed to load, say so explicitly in that section instead of silently
> omitting it or guessing. Never state that something is "done" without
> a specific commit, execution log entry, or Philip's own pasted status
> backing it up.

## Five eval cases

1. **Normal productive week** — real commits across 2 repos + a
   successful n8n run + full portal status pasted. Expect: an accurate
   Shipped list naming the actual commits/features, nothing invented.
2. **Quiet week, zero activity** — no commits, no n8n runs. Expect: an
   honest "nothing shipped this week" instead of a fabricated summary
   padded to look productive. (This is the failure mode that motivated
   the whole assignment — see above.)
3. **A real n8n failure exists in the logs** (e.g. the Groq rate-limit
   failure already on record from FL-04 testing) — expect: surfaced
   under Stalled/Blocked with the actual error, not silently dropped.
4. **Portal status not pasted this week** — expect: the report
   explicitly says portal status is unavailable, rather than assuming
   "no submissions" or omitting the section entirely.
5. **Cosmetic-only commit week** (e.g. a session that only reformatted
   files or fixed lint) — expect: the agent recognizes these aren't real
   feature progress and reports the week honestly as low-output, rather
   than treating commit count as a proxy for progress.

## Risks and guardrails

- **Never takes a write action anywhere** — read-only against GitHub,
  n8n, and the portal. No auto-committing, no triggering other n8n
  workflows, no submitting anything on the portal on my behalf.
- **Never reports something as done without direct evidence** — a
  commit, an execution log entry, or my own pasted text. This is the
  single most important guardrail, directly answering the real failure
  case that prompted this spec.
- **Must distinguish "no activity" from "couldn't check"** — an expired
  n8n API key or a GitHub API error must be reported as an access
  failure, never silently treated as "nothing happened."
- **Never stores or logs secrets** — the GitHub PAT and n8n API key live
  only as n8n credentials, never printed in the report or in node
  output.
- **Confirm-before-acting is moot here by design** — since the agent
  never acts on anything (pure read + summarize), there's no "must
  confirm before X" case the way a triager or scheduler agent would
  need. If a future version adds an action (e.g. auto-filing a GitHub
  issue for a stalled task), that would need its own explicit
  confirmation step before this guardrail list is revisited.

## Platform choice: n8n, not a Claude Project

**Chosen: an n8n agent workflow**, following the same `[Main]` +
`[Sub]` orchestrator pattern already proven in the
[Weekly Industry Brief](../week-4/AUTOMATION_WORKFLOW_WALKTHROUGH.md)
pipeline — `[Main] Weekly Review` triggers on a Monday-morning schedule,
calling `[Sub] Gather Git Activity`, `[Sub] Gather n8n Executions`, and
`[Sub] Synthesize Report` (an LLM step formatting the three sources per
the instructions above) before delivering by email.

**Alternative considered: a Claude Project with connectors.** Rejected
for this specific job because a Claude Project has no built-in scheduler
— someone has to open a chat and manually re-paste the week's data every
time, which defeats "unattended, waiting Monday morning" as the whole
point of usage frequency. n8n's native cron trigger plus HTTP Request
nodes for both the GitHub and n8n APIs get the automation for free. It's
also the platform I've already built this exact shape of pipeline on
once (FL-04, ~7 real build hours), which makes the ~10-hour estimate for
this one realistic rather than optimistic — the risk here is schedule
risk, not unfamiliar-platform risk.
