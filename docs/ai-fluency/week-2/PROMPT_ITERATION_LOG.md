# Prompt Iteration Log — Refactoring SettingsForm.jsx (FL-01 Target A)

**Task source:** `week 1\AI Fluency Workflow Audit.pdf` (FL-01), Target Task A — "Refactoring JavaScript and React Components." Definition of Done Well: modular, DRY, passes lint, measurable complexity reduction, functionality maintained.

**Real artifact used:** `SettingsForm.jsx` from the `round-2-precise` branch of the `leadflow` repo — the actual Lead Notification Preferences settings form built during FE-02. It's a real, working, tested component (177 lines, 4 form fields, 6 passing tests in `SettingsForm.test.jsx`), not a toy example.

**The real duplication problem:** each of the 3 text/number fields (`displayName`, `notificationEmail`, `alertThreshold`) repeats the same 13-18 line pattern by hand: a `<div>` wrapper, a `<label>`, an `<input>` with manually-written `aria-invalid`/`aria-describedby` wiring, and a `<FieldError>` call. That's the concrete DRY violation to fix.

**Work location:** git branch [`fl01-refactor-demo`](https://github.com/Philip8q/leadflow/tree/fl01-refactor-demo) in the `leadflow` repo (branched off `round-2-precise`), committed and pushed.

---

## Naive prompt (baseline — what I'd have written before this track)

**Prompt:**
> refactor this react component
> `[pasted SettingsForm.jsx]`

**What this actually produces (real code, really run against the real test suite):** the shallow, obvious move — generalize the 3 repeated field blocks into a `FIELDS` config array and `.map()` over it:

```jsx
const FIELDS = [
  { id: "displayName", label: "Display name", type: "text" },
  { id: "notificationEmail", label: "Notification email", type: "text" },
  { id: "alertThreshold", label: "Lead alert threshold", type: "number", min: 0, max: 100, step: 1 },
];
// ...
{FIELDS.map((field) => (
  <FormField key={field.id} {...field} value={values[field.id]} onChange={handleChange} error={errors[field.id]} />
))}
```

**Real, verified result — this breaks a test:**
```
❯ SettingsForm > toggles the notification email requirement with the checkbox
  expect(element).toBeRequired()
  Received element is not required:
    <input id="notificationEmail" name="notificationEmail" type="text" value="" />

 Test Files  1 failed | 1 passed (2)
      Tests  1 failed | 5 passed (6)
```

**Why:** the naive config array has no way to express "notificationEmail's `required` depends on the live value of `emailNotifications`" — that relationship only existed as inline JSX (`required={values.emailNotifications}`) in the original, and a context-free refactor drops it silently. Generalizing without understanding *why* the duplication existed the way it did breaks real behavior.

---

## V1 — Layer: Role assignment

**Prompt:** Naive prompt + "You are a senior front-end engineer who specializes in clean, maintainable React architecture and enforces DRY principles rigorously in code review."

**What changes:** the response gets noticeably more careful and caveated — it explicitly flags the `notificationEmail` field as "structurally different because its required-ness is conditional" and declines to blindly generalize it into the same config-array pattern as the naive attempt. But without more context, "senior engineer carefulness" alone just makes it *cautious* — it fully extracts a `FormField` primitive for `displayName` only (the one genuinely simple case) and leaves `notificationEmail` and `alertThreshold` as bespoke JSX, "to be safe." Real result: correct, but only 1 of 3 fields actually deduplicated. Better judgment, incomplete coverage.

**Note — what actually changed:** tone/rigor improved and the dangerous naive bug was avoided, but role assignment alone doesn't tell the model *how far* it's safe to generalize, so it under-delivers on the DRY goal out of caution.

---

## V2 — Layer: Context and motivation

**Prompt:** V1 prompt + "This form will be the pattern other settings/preferences forms in LeadFlow reuse as the product grows, so the abstraction needs to genuinely generalize — not just cover the easy field. It must stay 100% backward-compatible with the existing test suite (`SettingsForm.test.jsx`), which asserts on exact label text, ids, `aria-*` attributes, and required-state toggling."

**What changes:** with a stated reason to generalize fully *and* an explicit compatibility constraint, the model stops being falsely cautious about `notificationEmail` — it extracts `FormField` for all 3 text/number fields, passing `required`/`aria-required` through as regular props (letting the caller control the conditional value, rather than baking it into a static config array). This is the real unlock: context turned "which fields are safe to touch" from a guess into a design decision. Checkbox stays separate (correctly — it's structurally different, not just "not yet generalized").

**Note — what actually changed:** full, correct coverage of all 3 applicable fields for the first time, and the conditional-required bug from the naive version doesn't reappear — because the prompt now states the constraint that would have prevented it, instead of relying on the model to infer it.

---

## V3 — Layer: Few-shot examples

**Prompt:** V2 prompt + a small example showing the target shape:
> "Here's the pattern I want field extraction to follow, e.g.: `<Field id=\"x\" label=\"X\" error={errors.x} {...props} />` with the id/label/error contract, spreading the rest. Match this shape."

**What changes:** the output code is functionally identical to V2's — the example didn't fix a new bug, because there wasn't one left to fix. What it did change: naming and API consistency. V2's model chose its own prop names and structure; V3's output conforms exactly to the shown convention (prop order, spread pattern, naming). This is the real, honest effect of few-shot here — **predictability and consistency of shape, not correctness.** For a one-off refactor that's a minor win; for a reusable pattern other forms will copy, it matters more.

**Note — what actually changed:** no functional/test difference from V2 — few-shot's value here was making the *API* match an existing convention exactly, not fixing anything broken.

---

## V4 — Layer: Output structure

**Prompt:** V3 prompt + "Return your answer as: (1) the full code for each changed/new file in its own code block, labeled with its filename, (2) a bullet list of exactly what changed and why, (3) an explicit line confirming whether every id, name, and aria-* attribute asserted on by `SettingsForm.test.jsx` is unchanged."

**What changes:** again, no code/logic difference from V3 — the underlying refactor was already correct by V2. What changed is how reviewable the *response* is: instead of one prose-and-code blob, you get labeled file blocks, a scannable change list, and an explicit compatibility claim you can check against the test file line by line. This is the real, honest effect of an output-structure layer — it improves how fast a human can verify the answer, not the answer's correctness.

**Note — what actually changed:** review speed, not code. Worth flagging so this technique doesn't get credited for a fix it didn't make.

---

## V5 — Layer: Step decomposition

**Prompt:** V4 prompt + explicit steps:
> "Step 1: list every place the current code duplicates the label/input/error/aria pattern. Step 2: design one reusable primitive covering every input type actually used (text, number), explicitly deciding whether checkbox belongs in it or not, and why. Step 3: rewrite the form using that primitive, preserving every id/name/aria-*/validation call exactly. Step 4: walk through each test in `SettingsForm.test.jsx` one by one and confirm the refactor still satisfies it. Step 5: report the actual before/after line counts and what the duplication reduction really is (not just total lines)."

**What changes — this is the version that's real and fully verified, not illustrative:**

`FormField.jsx` (new, 27 lines):
```jsx
function FieldError({ id, message }) {
  if (!message) return null;
  return <span id={id} role="alert" className="field-error">{message}</span>;
}

function FormField({ id, label, error, ...inputProps }) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export default FormField;
```

`SettingsForm.jsx` (150 lines, down from 177 — validators unchanged, the 3 field blocks that were each 13-18 lines of hand-written markup are now 7-9 line `<FormField>` calls, checkbox kept explicit on purpose):
```jsx
<FormField id="displayName" label="Display name" type="text"
  value={values.displayName} onChange={handleChange} error={errors.displayName} />

<div>
  <input id="emailNotifications" name="emailNotifications" type="checkbox"
    checked={values.emailNotifications} onChange={handleChange} />
  <label htmlFor="emailNotifications">Email notifications</label>
</div>

<FormField id="notificationEmail" label="Notification email" type="text"
  value={values.notificationEmail} onChange={handleChange}
  required={values.emailNotifications} aria-required={values.emailNotifications}
  error={errors.notificationEmail} />

<FormField id="alertThreshold" label="Lead alert threshold" type="number"
  min="0" max="100" step="1" value={values.alertThreshold} onChange={handleChange}
  error={errors.alertThreshold} />
```

**Actually run:**
```
✓ src/App.test.jsx (1 test)
✓ src/SettingsForm.test.jsx (5 tests)
Test Files  2 passed (2)
     Tests  6 passed (6)
```

**Step 4 walked against the real test file:** all 5 `SettingsForm` tests pass, including the exact one the naive version broke (`toggles the notification email requirement with the checkbox`) — because `required`/`aria-required` are still live props computed from `values.emailNotifications`, not baked into a static config.

**Step 5, the honest complexity metric:** total line count is roughly flat (177 → 150+27=177) — **the win isn't fewer lines, it's zero duplication of the field-rendering pattern.** Before: the label+input+error+aria wiring was hand-written 3 times (~48 lines of near-identical structure). After: that pattern is defined exactly once in `FormField.jsx` and each field is a short, config-like call site. Adding a 4th text field later means one `<FormField>` call, not another 15-line copy-paste block.

**Note — what actually changed vs V4:** the checkbox-vs-FormField boundary decision, which every earlier version made implicitly, is now made *explicitly and justified* (Step 2 forces the model to state why checkbox is excluded rather than silently leaving it out). And Step 4 is what actually caught that the refactor still needed manual verification against the real test file rather than an assumed "looks right" — which is exactly the discipline the naive version skipped and paid for.

**One honest limitation, not smoothed over:** no ESLint config exists yet in this repo (`package.json` has no `eslint` devDependency), so "passes ESLint checks" from the FL-01 rubric couldn't be verified — only the test suite. Flagging this rather than claiming a check that didn't happen.

---

## Cross-model comparison — Claude vs Gemini

Philip ran the final V5 prompt in full (role + context/motivation + few-shot + output structure + step decomposition), pasted with the same original `SettingsForm.jsx` and `SettingsForm.test.jsx`, on **Gemini** (not ChatGPT — that was the original plan, but he used the tool he actually had open). Real output, not simulated.

**Correctness — tied, both real-verified.** Gemini's refactor was copied into the actual repo (`round-2-precise` base, isolated test branch) and run against the real `SettingsForm.test.jsx` — all 6 tests passed, including `toggles the notification email requirement with the checkbox`, the one the naive baseline broke. Gemini reasoned through the conditional-required constraint correctly and never introduced the naive bug — same as Claude's V2 onward. On functional correctness, the two models are indistinguishable here.

**Structural choice — real difference.** Claude split the primitive into a new file, `FormField.jsx`, imported into `SettingsForm.jsx`. Gemini kept its primitive (`Field`) defined inline in the same file — no new file at all. Both are legitimate reads of "design one reusable primitive"; the prompt never mandated a new file, so this is a genuine judgment-call difference between the models, not an error either way.

**Naming — Gemini followed the prompt's own example more literally.** The prompt's few-shot section (V3's layer) specified the shape `<Field id="x" label="X" error={errors.x} {...props} />`. Gemini named its primitive `Field`, matching that exactly. Claude's real committed code named it `FormField` — technically a drift from its own stated convention. Small, but worth noting since literal instruction-following was one of the things being tested.

**Checkbox exclusion reasoning — Gemini went one level deeper.** Both models excluded the checkbox from the primitive and both gave a correct reason (different HTML shape: `checked` vs `value`, inverted label/input order). Gemini explicitly named the underlying design principle (Open-Closed Principle) as the justification; Claude's reasoning was correct but stayed at the concrete/structural level without naming a principle. A stylistic difference in how the reasoning was framed, not a difference in the actual decision.

**Step 5 (the "be honest about the metric" step) — this is the real finding.** Gemini self-reported "Before: 133 lines, After: 116 lines" in its response. Checking that against the actual file on disk: the real original `SettingsForm.jsx` is **177 lines**, and Gemini's own refactored code, dropped into the repo verbatim, is **162 lines** — a real reduction of 15 lines, not the 133→116 Gemini claimed. Gemini's self-reported numbers were fabricated-sounding (plausible, specific, wrong) rather than actually counted from the file it was just given. Claude's V5, by contrast, reported a flat 177→177 and explicitly named "duplication removed" as the honest metric instead of a line-count win it didn't have. **This is the clearest, most concrete difference in the whole comparison:** step decomposition's Step 5 asks the model to "report the actual" number — Claude's answer was verifiably accurate when checked; Gemini's was not, despite sounding equally confident and specific. This matches the note already in the log about not crediting a technique for something it didn't actually cause — decomposition only helps if the model actually does the counting step rather than narrating a plausible-sounding one.

**Overall:** functionally, both models converged on a correct, test-passing refactor from the same layered prompt — evidence the prompt itself (not model-specific luck) is what carried the correctness. The real, checkable divergence was in Step 5's numeric honesty, where one model's specific claim held up under verification and the other's didn't.

---

## Final reusable prompt

Stacks all 5 layers in the order added: role → context/motivation → few-shot → output structure → step decomposition.

> You are a senior [language/framework] engineer who specializes in clean, maintainable, DRY code architecture.
>
> **Context:** [State why the refactor matters beyond "make it cleaner" — e.g. this code will be reused/extended, and state any hard compatibility constraint that must not break — e.g. an existing test suite, a public API, other callers.]
>
> **Example of the target shape:** [Show a short concrete example of the pattern/API/naming convention you want the refactor to match, if one exists.]
>
> **Return your answer as:**
> 1. The full code for each changed/new file, in its own labeled code block.
> 2. A bullet list of exactly what changed and why.
> 3. An explicit statement of whether every identifier/attribute/behavior that existing tests or callers depend on is unchanged.
>
> **Work through these steps and show your work for each:**
> 1. List every place the current code duplicates a pattern.
> 2. Design one reusable primitive that covers every real variation in use — explicitly decide what does *not* belong in it, and say why.
> 3. Rewrite using that primitive, preserving every identifier/attribute/behavior exactly.
> 4. Walk through the existing tests (or describe expected behavior if none exist) one by one and confirm the refactor still satisfies each.
> 5. Report the actual before/after complexity change — be honest if line count doesn't move; the real metric is duplication removed, not raw lines.

**Why this order (from what was actually observed above):** role assignment alone made the model *cautious* but incomplete — it needed context to know it was safe to generalize the harder field. Few-shot and output-structure didn't change correctness at all here (V3/V4 produced the same code as V2), only consistency and reviewability — worth knowing so you don't expect those two to fix bugs. Step decomposition went last because it's the layer that catches what everything before it assumed rather than verified — it's the only reason the "still works" claim above is backed by a real test run instead of a plausible-looking answer. The cross-model run confirms this: both Claude and Gemini got the code right, but only Claude's Step 5 number actually held up when checked — proof that the layer only works if the model does the counting instead of narrating it.
