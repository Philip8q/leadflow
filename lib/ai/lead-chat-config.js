import { createOpenRouter } from "@openrouter/ai-sdk-provider";

// Model + system prompt for the LeadFlow lead-qualification chat (FE-06),
// kept in one place per the assignment brief so both get reviewed together
// whenever either changes.
//
// Routed through OpenRouter's free tier rather than a paid provider: the
// FE-06 brief allows "any other free tier model" (per FlyRank's own Q&A
// guidance to other interns), and both the Vercel AI Gateway (needs a card
// on file) and the direct Anthropic SDK (no free tier at all) were blocked
// on billing. Set OPENROUTER_API_KEY in .env.local (see .env.example) and
// in the Vercel project's env vars — no card required to create one.
//
// Free-tier model availability rotates on OpenRouter; re-check
// https://openrouter.ai/models?max_price=0 if this id stops resolving.
//
// nvidia/nemotron-3.5-lightning:free was tried first but is a heavy
// reasoning model -- even "Say hello" took 18-30s+ on OpenRouter's shared
// free pool (confirmed via direct API timing, with and without the
// `reasoning: {enabled: false}` param, which didn't help: the delay is
// upstream queueing, not reasoning-token generation). That's beyond
// Vercel's serverless function timeout, so the live deployment's chat
// silently hung forever with no response. Switched to
// dots-studio/dots-3-note-preview:free, confirmed via direct API calls to
// respond in ~3.5-4s consistently with good, on-persona output.
export const CHAT_MODEL_ID = "dots-studio/dots-3-note-preview:free";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const chatModel = openrouter.chat(CHAT_MODEL_ID);

// The assistant plays LeadFlow's own product: a lead-qualification widget
// embedded on a real estate brokerage's site. This is the actual feature
// LeadFlow's README lists under "Planned Features" (automated lead
// qualification and scoring), demoed live instead of described.
export const CHAT_SYSTEM_PROMPT = `You are LeadFlow's lead-qualification assistant, embedded as a chat widget on a real estate brokerage's website. A visitor just opened the chat because they're interested in buying, selling, or renting property.

Your job: hold a natural, friendly conversation that qualifies them as a lead. Over the course of the conversation, try to surface:
- What they're looking to do (buy, sell, rent)
- Property type and general location of interest
- Rough timeline (browsing vs. ready to move soon)
- Budget range, asked tactfully
- Best way to follow up with them (phone, email, WhatsApp)

Rules:
- Ask one question at a time. Never dump the whole list at once — it reads like a form, not a conversation.
- Keep responses short: 2-4 sentences, conversational tone, no corporate phrasing.
- If they go off-topic, answer briefly and steer back toward qualifying them.
- If asked whether you're a real person or agent, be honest: you're a demo of LeadFlow's qualification assistant, built for a FlyRank internship capstone project.
- Never invent property listings, prices, or availability — you don't have access to real inventory. If asked for specifics, say a real agent will follow up with exact details.`;
