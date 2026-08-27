import { tool } from "ai";
import { z } from "zod";

// Server-side tool for FE-07 (Tool results and structured UI). The model's
// only job is to fill in this small, honest schema from the conversation --
// the actual score is computed deterministically below, never by the model,
// so there's nothing here for it to hallucinate a number for.
export const scoreLeadInputSchema = z.object({
  intent: z
    .enum(["buy", "sell", "rent"])
    .describe("What the visitor wants to do."),
  timeline: z
    .enum(["immediate", "weeks", "months", "browsing"])
    .describe(
      "immediate = ready now / within days, weeks = within a few weeks, " +
        "months = 1-6 months out, browsing = no real timeline mentioned yet.",
    ),
  budgetKnown: z
    .boolean()
    .describe("Whether the visitor has shared a concrete budget or price range."),
  contactMethod: z
    .enum(["phone", "email", "whatsapp", "none"])
    .describe(
      "Best way to follow up with them. Use 'none' if they haven't shared one yet.",
    ),
  propertyType: z
    .string()
    .describe(
      "Short description of the property type and area they mentioned, " +
        "e.g. '2-bedroom apartment in Kilimani'. Empty string if not yet known.",
    ),
});

const TIMELINE_POINTS = { immediate: 40, weeks: 30, months: 15, browsing: 5 };
const TIMELINE_LABEL = {
  immediate: "Ready now",
  weeks: "Within a few weeks",
  months: "1-6 months out",
  browsing: "Just browsing",
};

function scoreFromInput(input) {
  const timelinePoints = TIMELINE_POINTS[input.timeline] ?? 0;
  const budgetPoints = input.budgetKnown ? 25 : 0;
  const contactPoints = input.contactMethod !== "none" ? 20 : 0;
  const propertyPoints = input.propertyType.trim().length > 0 ? 15 : 0;

  const score = timelinePoints + budgetPoints + contactPoints + propertyPoints;
  const tier = score >= 70 ? "Hot" : score >= 40 ? "Warm" : "Cold";

  return {
    score,
    tier,
    breakdown: [
      {
        label: "Timeline",
        points: timelinePoints,
        max: 40,
        detail: TIMELINE_LABEL[input.timeline],
      },
      {
        label: "Budget shared",
        points: budgetPoints,
        max: 25,
        detail: input.budgetKnown ? "Yes" : "Not yet",
      },
      {
        label: "Contact method",
        points: contactPoints,
        max: 20,
        detail: input.contactMethod === "none" ? "Not shared" : input.contactMethod,
      },
      {
        label: "Property specifics",
        points: propertyPoints,
        max: 15,
        detail: input.propertyType.trim() || "Not yet described",
      },
    ],
    summary: `${input.intent} lead, ${TIMELINE_LABEL[input.timeline].toLowerCase()}.`,
  };
}

export const scoreLead = tool({
  description:
    "Score how sales-ready a lead is, once you've learned enough about their " +
    "intent, timeline, budget, contact method, and the property they're " +
    "interested in. Call this once per conversation, near the end of " +
    "qualification -- not on the first message.",
  inputSchema: scoreLeadInputSchema,
  execute: async (input) => {
    // Deliberately reject premature calls instead of scoring near-empty
    // input as "Cold" -- this is the tool's real, reachable error path
    // (the FE-07 brief's "designed error state, not a crash" criterion),
    // not a simulated failure.
    const gatheredSignals = [
      input.timeline !== "browsing",
      input.budgetKnown,
      input.contactMethod !== "none",
      input.propertyType.trim().length > 0,
    ].filter(Boolean).length;

    if (gatheredSignals === 0) {
      throw new Error(
        "Not enough information yet to score this lead -- keep the " +
          "conversation going before calling scoreLead.",
      );
    }

    return scoreFromInput(input);
  },
});
