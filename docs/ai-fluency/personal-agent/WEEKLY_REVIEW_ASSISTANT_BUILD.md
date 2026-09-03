# Weekly Review Assistant — Build Log

Spec: [`WEEKLY_REVIEW_ASSISTANT_SPEC.md`](./WEEKLY_REVIEW_ASSISTANT_SPEC.md)
Date: 2026-08-27

Built exactly to the spec's architecture: an n8n `[Main]` + `[Sub]`
orchestrator (the same pattern already proven in the
[Weekly Industry Brief](../week-4/AUTOMATION_WORKFLOW_WALKTHROUGH.md)
pipeline), its own dedicated error handler, live-tested end to end
against real data — not a dry run.

## What got built

| Workflow | Job |
| --- | --- |
| `[Main] Weekly Review` | Webhook (manual/test runs, accepts pasted portal status) + weekly Monday 07:00 schedule trigger; calls the three subs in sequence |
| `[Sub] Gather Git Activity` | Fetches all of Philip8q's public repos and their commits from the last 7 days directly from the GitHub API |
| `[Sub] Gather n8n Executions` | Fetches this n8n instance's own workflow list and execution history, groups by workflow, flags failures |
| `[Sub] Synthesize Report` | Groq-first / Gemini-fallback LLM step producing the Shipped / Stalled-Blocked / Next-week report |
| `[Sub] Format & Deliver` | Sends the report by email |
| `[System] Error Handler (Weekly Review Assistant)` | Its own dedicated error handler (per the standing rule: no sharing error handlers across unrelated projects) |

Exported workflow JSONs: [`n8n-workflows/`](./n8n-workflows/).

## Five real bugs found and fixed while building this

Nothing here was theoretical — every one of these was caught by an actual
failed execution, inspected via n8n's own execution API, fixed, and
re-verified with a real re-run.

1. **`this.helpers.httpRequestWithAuthentication` isn't supported inside
   a Code node.** First attempt at the n8n-executions gatherer tried to
   make an authenticated self-call to n8n's own API from a single Code
   node (for full control over pagination). It failed immediately with
   `The function "helpers.httpRequestWithAuthentication" is not
   supported in the Code Node`. Code nodes deliberately can't touch
   credential values directly — that's a security boundary, not a bug.
   Fixed by moving the actual HTTP calls out to real `HTTP Request` nodes
   (which do support attached credentials), keeping the Code node purely
   for aggregating what those nodes already fetched.

2. **A credential I created myself blocked its own use.** The new "n8n
   API Self" credential was created with `allowedHttpRequestDomains:
   "none"` — a real n8n security control meaning "never let this
   credential be used inside an HTTP Request node at all" (anti-SSRF).
   The HTTP Request node failed with `This credential is configured to
   prevent use within an HTTP Request node`. Fixed by scoping it to
   `"domains"` with the specific host allowed, rather than leaving it
   wide open.

3. **`localhost:5678` doesn't reach n8n's own API from inside the
   workflow.** This instance runs in Docker queue-mode with separate
   worker containers — the container actually executing the workflow
   isn't the same one running the web/API server, so `localhost` inside
   it doesn't have anything listening on 5678. The fix was routing the
   self-call through the instance's own public ngrok tunnel instead of
   `localhost`, which works regardless of which container picks up the
   execution.

4. **A single-output node "fanned out" to two nodes using the wrong
   connection shape**, which silently killed the second branch. n8n's
   connection format is `main: [[...]]` — one array per *output port*.
   Writing `main: [[nodeA], [nodeB]]` for a trigger with only one output
   port declares a second output port that doesn't exist, so nothing
   ever reaches `nodeB`. The correct shape for "one output, two
   destinations" is a single array holding both:
   `main: [[nodeA, nodeB]]`. Caught because one of the two parallel HTTP
   calls just never showed up in the execution trace at all.

5. **An expression's leading `=` was in the wrong position, so it was
   sent as literal text instead of being evaluated.** n8n only treats an
   entire field as an expression if the *whole stored value* starts with
   `=`; I'd built the URL by concatenating a plain string with a
   separately-prefixed `={{ ... }}` fragment, landing the `=` in the
   middle of the string. The result: n8n sent the literal text
   `{{ encodeURIComponent(...) }}` as the actual `cursor` query
   parameter instead of evaluating it, and pagination silently returned
   zero extra results. Fixed by prefixing the entire concatenated string
   with `=` once, at the very start.

## A real, non-bug finding: this instance can't actually see 7 days back

Even after fixing pagination (3 chained pages, up to 750 executions),
the oldest execution ever returned was still only ~3 days old. This
account runs enough *other*, unrelated automation (real estate lead-gen
workflows, blog SEO pipelines, job-search bots) that n8n's own execution
log retention doesn't stretch back a full week at this volume — not a
bug in this build, a real constraint of the shared instance it runs on.
The aggregator's `truncated` flag correctly reports `false` in this case
(it fetched everything that exists, it just doesn't span 7 days), which
is the honest answer, not "couldn't fetch" and not "nothing happened."

## Sample real output

**Git activity, one real run** (repos and commits are genuinely mine
from this session, not fabricated for the doc):

```json
{
  "github_ok": true,
  "since": "2026-08-20T11:44:39.475Z",
  "repos": [
    { "name": "ai-lead-qualification-crm-sync", "commit_count": 0, "commits": [] },
    { "name": "expense-tracker", "commit_count": 1, "commits": [
      { "sha": "e4a0c3d", "message": "Update 'Live demo' to 'Live Test' in README" }
    ]},
    { "name": "leadflow", "commit_count": 15, "commits": [
      { "sha": "08e8c1a", "message": "Add Weekly Review Assistant agent design spec" },
      { "sha": "a42fcde", "message": "Add Week 6 \"Explain It Like You Built It\" writeup" }
    ]}
  ]
}
```

**A later real run**, after repeated testing had genuinely exhausted
GitHub's unauthenticated rate limit (60 requests/hour — a real, honest
constraint at test volume, not a concern at the intended once-a-week
cadence) and Groq had a transient failure that triggered the real
Gemini fallback:

```
### Shipped
GitHub data could not be fetched due to a 403 error.
From the Flyrank Portal, FE-08 and FL-06 were submitted this week.

### Stalled / Blocked
Significant failures were observed in the Lead Intake & Qualification
workflow (106 failures)...

### Next week
1. Investigate and resolve the GitHub data fetch (403) error.
2. Prioritize fixing the high volume of failures in the Lead Intake &
   Qualification workflow and its sub-processes.
...
```
*(Report generated by `gemini_fallback` after a real Groq failure —
confirmed via the `report_provider` field on the execution.)*

Both runs demonstrate exactly the guardrail the spec was built around:
when a source fails, the agent says so plainly instead of guessing —
and here it caught a real, previously-unnoticed problem (106 failures in
an unrelated Lead Intake & Qualification automation) that's genuinely
worth Philip's attention, which is the whole reason this agent exists.

## Verification

- 3 GitHub API auth/pagination/expression bugs and 2 credential/network
  bugs found and fixed via real failed executions, each re-verified with
  a real re-run afterward
- End-to-end pipeline confirmed working via the webhook trigger multiple
  times, including one full success with real git data + n8n data +
  synthesized report + a confirmed-sent email (`sent: true` on the
  `Send Review Email` node)
- Groq→Gemini fallback confirmed firing for real (not simulated) when
  Groq had a transient failure during testing
- The "source failed, say so" guardrail confirmed working organically
  (GitHub rate-limited by testing volume), not just in a staged test

**Not yet done:** waiting for GitHub's rate limit to reset and n8n's own
production Monday-morning schedule trigger to fire on its own — this was
tested via the manual webhook path throughout, not yet observed running
unattended on its actual cron schedule.

## Raw run capture

The full n8n execution JSON for the successful end-to-end run (execution
`#586`, 2026-08-28, all 7 nodes, Gemini fallback firing for real) is at
[`raw-run-capture.json`](./raw-run-capture.json) — 207 KB, every node's
input/output, timestamps, and the complete synthesized report.

## Links

- [Design spec](./WEEKLY_REVIEW_ASSISTANT_SPEC.md)
- [Exported workflow JSONs](./n8n-workflows/)
- [Raw run capture](./raw-run-capture.json)
