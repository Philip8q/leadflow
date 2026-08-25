# Accessible component fundamentals — NOTES

Built from scratch, no component libraries: `Modal.tsx`, `Tabs.tsx`, `Disclosure.tsx`.
Each follows its W3C ARIA Authoring Practices Guide (APG) pattern. Verified with
automated keyboard-interaction tests (`*.test.tsx`, vitest + Testing Library) rather
than only manual clicking, since that gives a repeatable, reviewable proof instead of
a one-time claim.

## What each component implements

- **Modal** (`role="dialog"`, `aria-modal`) — focus moves into the dialog on open,
  Tab/Shift+Tab is trapped inside it, Escape closes it, and focus returns to the
  element that opened it.
- **Tabs** (`role="tablist"/"tab"/"tabpanel"`) — roving tabindex (only the active tab
  is in the Tab order), Left/Right arrows move focus and activate (automatic
  activation model), Home/End jump to the first/last tab.
- **Disclosure** (`aria-expanded` + `aria-controls`) — a single native `<button>`
  toggling a content region; Enter/Space activation comes free from using a real
  `<button>` instead of a `<div onClick>`.

## shadcn/ui comparison

Installed shadcn/ui in an isolated sandbox (not this repo — didn't want `shadcn init`
rewriting this project's `globals.css` and design tokens) and added `dialog` and
`tabs`. Read the generated source in `components/ui/dialog.tsx` and `components/ui/tabs.tsx`.

### Gap 1 — shadcn doesn't hand-write the ARIA behavior either

Both generated files contain **zero** focus-trap or roving-tabindex logic. Every
interactive piece (`DialogPrimitive`, `TabsPrimitive`) is imported from `@base-ui/react`
— a primitive library in `node_modules`, not copied source. shadcn's CLI only copies
the *styling and composition* layer on top of it. So "read the generated source" only
shows how the chrome is wired (classNames, `data-slot`, `cn()`); the actual keyboard
state machine — the part I wrote by hand in `Modal.tsx`'s `trapFocus` and `Tabs.tsx`'s
`onKeyDown` — is compiled into a package I can't casually inspect. That's the biggest
practical gap: shadcn gives you ownership of the presentation, not the interaction
engine.

### Gap 2 — compound component API vs. one monolithic component

My `Modal` is a single component (`<Modal open onClose title>`). shadcn's `Dialog` is
split into `Dialog`/`DialogTrigger`/`DialogPortal`/`DialogOverlay`/`DialogContent`/
`DialogHeader`/`DialogFooter`/`DialogTitle`/`DialogDescription`, composed by the
consumer. That buys real flexibility (arbitrary header/footer content, multiple
triggers) but pushes correctness onto the caller — e.g. `DialogTitle` auto-wires
`aria-labelledby` via context, whereas my version requires the caller to pass a
matching `titleId` by hand and get it right every time.

### Gap 3 — animation states I didn't build

shadcn's `Dialog`/`Tabs` expose `data-open`/`data-closed`/`data-active` attributes
tied to Tailwind enter/exit classes (`data-open:animate-in data-open:fade-in-0`,
etc.). My components show/hide instantly with `hidden`/conditional render — no
transition state at all.

### Gap 4 — Tabs variants and orientation

shadcn's `Tabs` supports `orientation="vertical"` and a `line` visual variant via
`cva`, both handled generically through `data-orientation`. Mine only supports a
single horizontal layout — adding vertical support would mean rewriting the
ArrowLeft/ArrowRight handling to ArrowUp/ArrowDown, which the APG pattern itself
calls out as orientation-dependent and I hard-coded for horizontal only.

## What I'd change if this became real UI

Keep my versions for the *learning* value (I now know what a modal's focus trap
actually has to do), but for anything shipping I'd reach for shadcn/Base UI directly
— the primitive-library approach means the trap/roving-tabindex edge cases (nested
dialogs, RTL, disabled items appearing mid-list) are handled by code with far more
review and usage behind it than a from-scratch implementation gets in one sitting.
