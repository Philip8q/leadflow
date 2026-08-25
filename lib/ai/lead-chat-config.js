import { gateway } from "ai";

// Model + system prompt for the LeadFlow lead-qualification chat (FE-06),
// kept in one place per the assignment brief so both get reviewed together
// whenever either changes.
//
// Routed through the Vercel AI Gateway rather than a direct provider SDK
// (e.g. @ai-sdk/google): on a Vercel deployment the Gateway authenticates
// automatically via Vercel's own OIDC token, so there's no separate
// provider account/API key to create just for this demo. Locally, set
// AI_GATEWAY_API_KEY in .env.local (see .env.example) instead.
//
// Model id fetched live from https://ai-gateway.vercel.sh/v1/models at
// build time of this file — always re-check that list before bumping this,
// model ids change often and a stale one fails at request time, not at
// build time.
export const CHAT_MODEL_ID = "google/gemini-3.7-flash";

export const chatModel = gateway(CHAT_MODEL_ID);

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
