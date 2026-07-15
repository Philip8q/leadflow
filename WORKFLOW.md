# WORKFLOW.md — Vague vs. Precise Prompting (FE-02)

**Feature:** Lead Notification Preferences settings form, built twice from the
same base scaffold — `round-1-vague` (one lazy sentence: "add a settings form")
vs. `round-2-precise` (file references, explicit validation rules, example
behavior, and a "write tests and run them" instruction, drafted in plan mode).

## Correctness
Round 1 looked complete — it rendered, and clicking Save showed "Settings
saved." But it silently accepted an empty display name: there's no `required`
attribute and no JS check, so the confirmation appears regardless. I initially
assumed the numeric threshold field had a similar bug (I thought
`event.preventDefault()` in the submit handler would bypass the browser's
native `min`/`max` validation) — that was wrong. Native constraint validation
runs *before* the submit event fires, so the browser blocked out-of-range
thresholds on its own. Only running the app in a browser caught the real gap
(empty name) and corrected my wrong assumption about the fake one. Round 2
validates every field explicitly in JS — required, length, format, range —
so behavior doesn't depend on which HTML attributes happen to be present.

## Accessibility
Round 1 has labels but no error UI. Round 2 links each field to its error
via `aria-describedby`, marks invalid fields with `aria-invalid`, announces
errors with `role="alert"`, and toggles `aria-required` on the email field
based on the notifications checkbox.

## Edge Cases
Round 1 also has an "Email notifications" checkbox with no field to actually
enter an email address — a missing feature, not just a validation gap. Round
2's prompt explicitly asked for that field and its conditional requirement.
Round 1's tests (2) only check rendering and the happy path, so they never
would have caught the empty-name bug. Round 2's tests (5) assert each
failure case directly.

## Review Effort
Round 1 took five seconds to prompt but hid its problems — I had to manually
poke at it in the browser to find what was actually broken, and even then
my own first read of the code got a detail wrong. Round 2 took longer to
write (a few minutes drafting constraints) but needed no follow-up
debugging — the tests it wrote and ran itself already proved the behavior.
The precise round didn't eliminate the thinking time, it just moved it
earlier, where it's cheaper.

## Mistake Caught
Round 1 allows saving with a blank required display name — confirmed by
testing it directly in the browser, not by reading the code.
