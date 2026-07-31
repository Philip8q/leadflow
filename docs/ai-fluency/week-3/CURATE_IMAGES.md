# Curate Your Images — Philip Omondi (FlyRank AI Fluency, Week 10)

**Content map (from Week 1 sitemap):** Home, LeadFlow Case Study, About/Proof, Contact/CTA.

---

## Image inventory (mapped to the sitemap)

| Page | Image needed | Type | Status |
|---|---|---|---|
| Home | Hero background texture/shape (identity-kit mood) | AI-generated (connective tissue) | ✅ Keeper: `hero-background.png` |
| Home | Small preview thumbnail of LeadFlow in action | Real capture | ✅ Keeper: `settingsform-saved-state.png` |
| LeadFlow Case Study | Screenshot of the actual working settings form | Real capture | ✅ Keeper: `settingsform-saved-state.png` |
| LeadFlow Case Study | Screenshot of the real GitHub repo (proof of shipped work) | Real capture | ✅ Keeper: `github-repo-proof.png` |
| About/Proof | Photo of Philip | **Real photo required** | ✅ Keeper: `philip-portrait.jpg` (real photo, not AI) |
| About/Proof | Identity kit strip (fonts/palette, ties visual identity to the proof) | Real capture (screenshot of own work) | ✅ Keeper: `identity-kit-hero-crop.png` |
| Contact/CTA | One small accent icon/mark (arrow, dot, or similar) | AI-generated (connective tissue) | Pending — same prompt batch as hero, icon not generated yet |

---

## Real captures — keepers

All three are real screenshots of Philip's actual work, taken live (dev server running, browser console checked, no errors), not AI stand-ins:

1. **`images/keepers/settingsform-saved-state.png`** — the real `SettingsForm` running locally, filled with realistic sample data (a fictional Kenyan real-estate agent, "Sarah Kimani") and showing the genuine "Settings saved." success state after a real submit. This is the actual FE-02/FL-01 component, not a mockup.
2. **`images/keepers/github-repo-proof.png`** — the real, public `leadflow` GitHub repo (github.com/Philip8q/leadflow), showing real commit history, branches, and files. Proof the work exists and ships, not a claim.
3. **`images/keepers/identity-kit-hero-crop.png`** — a cropped capture of the real, working `identity-kit.html` page (Week 3's own deliverable), showing the Fraunces/Inter type pairing and terracotta palette actually rendering in a browser.

**Why real over AI here, explicitly:** all three exist to prove specific, already-built work (a working form, a real repo, a real rendered identity system). An AI-generated image of "a settings form" or "a GitHub page" would be a fabricated stand-in for something that already exists and can be shown directly — using AI here would be the "AI stand-in" the brief explicitly warns against.

---

## AI-generated connective tissue — curated

Philip ran the prompts on ChatGPT. Two hero candidates were generated and compared honestly:

**v1 — `images/rejected/hero-v1-rejected.png` (REJECTED).** Wavy terracotta/cream texture with a plaster-like grain.

**v2 — `images/keepers/hero-background.png` (KEPT).** A flat, smooth gradient from warm off-white to terracotta, no shapes or texture.

**Rejection note (Philip's judgment):**

> Rejected v1 (the wavy terracotta texture): it introduced a decorative branch/plant silhouette in the corner that wasn't requested and reads as a leftover from a stock-background template — it draws the eye rather than staying in the background. The wave shapes also have hard, defined edges that would compete with overlaid text instead of sitting quietly behind it. v2's flat gradient satisfies the actual requirement — a hero background calm enough that the portfolio's own content stays the loudest thing on the page.

**One honest limitation of the keeper, not smoothed over:** v2's right-side orange is more saturated/generic than the identity kit's specific terracotta `#B5502F` — the AI drifted slightly past the exact hex. Acceptable for a fading background edge, but worth naming rather than claiming a perfect palette match.

---

## Open items

- **Contact/CTA accent icon** — v3 prompt given to Philip, not generated yet. Optional/nice-to-have; the hero + real captures already form a coherent set on their own.
