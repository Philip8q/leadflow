# Streaming AI Chat Interface — Philip Omondi

Brief: https://internship.flyrank.ai/intern/assignments/FE-06
Date: 2026-08-26

## Overview

A live, streaming chat widget demoing LeadFlow's own planned "automated
lead qualification" feature (listed under Planned Features in the
[repo README](../../../README.md)) — a real estate brokerage's site visitor
talks to it like a prospective buyer or seller, and it holds a natural
qualifying conversation instead of presenting a form.

**Try it live:** https://leadflow-ten-sage.vercel.app/demo/lead-chat

## What was built

| Piece | File |
| --- | --- |
| Chat UI (message list, input, streaming render) | [`app/demo/lead-chat/page.jsx`](../../../app/demo/lead-chat/page.jsx) |
| Streaming API route | [`app/api/chat/route.js`](../../../app/api/chat/route.js) |
| Model + system prompt config | [`lib/ai/lead-chat-config.js`](../../../lib/ai/lead-chat-config.js) |

Built on the [Vercel AI SDK](https://ai-sdk.dev/) — `streamText()` server-side
in the route handler, `useChat()` client-side in the page component — which
handles turning a model's token stream into incremental UI updates without
hand-rolled SSE parsing.

Eval-criteria features, all implemented in `page.jsx`:

- Distinct user/assistant message bubbles
- A thinking indicator that hands off into streamed text inside the same
  bubble, with no flicker between the two states
- Auto-scroll that pins to the bottom only while the visitor hasn't
  scrolled away, plus a "Jump to latest" button once they have
- A working **Stop** button that aborts an in-flight stream
- Mobile-safe input styling (16px font floor, no fixed pixel widths, so iOS
  Safari doesn't auto-zoom on focus)
- A generic, non-leaking client error message with a **Retry** button — the
  real provider error is logged server-side only (see `onError` in
  `route.js`)

## Why OpenRouter, not the Vercel AI Gateway or a direct Anthropic key

The Vercel AI Gateway requires a credit card on file before serving *any*
request on a Hobby team, even against free-tier models — a hard blocker
with no free path. The Anthropic API has no free tier at all. FlyRank's own
Q&A to other interns explicitly allows "any other free tier model," so this
demo calls [OpenRouter](https://openrouter.ai/)'s free tier directly via
[`@openrouter/ai-sdk-provider`](https://www.npmjs.com/package/@openrouter/ai-sdk-provider) —
no card required to generate a key.

## A real bug this caught: free-tier model latency vs. serverless timeouts

The first model wired up, `nvidia/nemotron-3.5-lightning:free`, passed
every local test — full conversations streamed correctly on `localhost`.
**It failed completely once deployed to Vercel**, though: every request to
`/api/chat` came back with

```
Vercel Runtime Timeout Error: Task timed out after 30 seconds
```

Diagnosis, in order:

1. Confirmed via [Vercel's runtime logs](https://vercel.com/docs/functions/runtime-logs)
   that the function itself was being killed at the 30s `maxDuration`
   ceiling, not erroring inside the app.
2. Called OpenRouter's raw completions endpoint directly with `curl`,
   bypassing the app entirely, and timed it: **18-30+ seconds for a
   trivial "say hello" prompt**, confirming the delay was upstream, not a
   bug in the route handler.
3. Ruled out hidden reasoning tokens as the cause — this model does a
   verbose internal "thinking" pass before answering, but passing
   OpenRouter's `reasoning: { enabled: false }` parameter dropped
   `reasoning_tokens` to 0 while wall-clock time barely changed. The real
   delay was queueing on the model's shared free-tier inference pool, not
   token generation.
4. Benchmarked several other free models directly against OpenRouter to
   find one with acceptable, consistent latency — a couple of well-known
   ones (`google/gemma-4-26b-a4b-it:free`, `google/gemma-4-31b-it:free`)
   were rate-limited (`429`) on their own shared pool at the time of
   testing, illustrating just how variable free-tier availability is.
5. Landed on `dots-studio/dots-3-note-preview:free`, which answered
   consistently in ~3.5-5.5 seconds across repeated real calls, comfortably
   inside the function's timeout.

**Takeaway:** a model that behaves fine in casual local testing can still
be an unreliable choice for a production streaming feature. Free-tier LLM
latency is not just "slower" than paid tiers — it can be so inconsistent
that a feature which works in dev fails 100% of the time in production
until the model choice itself is fixed. This is the actual model now
wired up in `lib/ai/lead-chat-config.js`, with the reasoning captured
in a code comment there for future reference.

## Verification

- `npx vitest run` — 15/15 tests pass (repo-wide suite; unaffected by this
  feature, confirms nothing else broke)
- `npm run build` — clean production build, both before and after the
  model swap
- Live conversation held against the **production** URL (not just
  localhost) after the fix, confirmed via both a real browser session and
  a raw `curl` against `/api/chat` showing genuine token-by-token
  `reasoning-delta` / `text-delta` stream events completing in ~5.5s

## Links

- **Live preview:** https://leadflow-ten-sage.vercel.app/demo/lead-chat
- **Route handler:** https://github.com/Philip8q/leadflow/blob/main/app/api/chat/route.js
- **Chat component:** https://github.com/Philip8q/leadflow/blob/main/app/demo/lead-chat/page.jsx
- **Model config:** https://github.com/Philip8q/leadflow/blob/main/lib/ai/lead-chat-config.js
