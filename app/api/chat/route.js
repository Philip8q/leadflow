import {
  APICallError,
  convertToModelMessages,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  toUIMessageStream,
} from "ai";
import { chatModel, CHAT_SYSTEM_PROMPT } from "@/lib/ai/lead-chat-config";
import { scoreLead, ToolUserError } from "@/lib/ai/lead-chat-tools";

// Streaming responses can run longer than the default serverless timeout.
export const maxDuration = 30;

// This single onError handles every error in the stream -- tool-execution
// failures included, not just top-level provider errors (confirmed by
// sabotage: a scoreLead throw and a broken model ID both land here).
// Never forward a raw provider error to the client -- could leak request or
// config details -- but a ToolUserError's message was written by us for
// exactly this purpose, so pass it through instead of genericizing it away.
function describeError(error) {
  if (error instanceof ToolUserError) {
    return error.message;
  }
  if (APICallError.isInstance(error) && error.statusCode === 429) {
    return "Our AI assistant is getting a lot of requests right now. Please try again in a few seconds.";
  }
  if (APICallError.isInstance(error) && error.statusCode >= 500) {
    return "Our AI provider is temporarily unavailable. Please try again shortly.";
  }
  return "Something went wrong on our end. Please try again.";
}

export async function POST(req) {
  let messages;
  try {
    ({ messages } = await req.json());
  } catch {
    return new Response(
      JSON.stringify({ error: "Malformed request body." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(
      JSON.stringify({ error: "At least one message is required." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const result = streamText({
    model: chatModel,
    instructions: CHAT_SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    tools: { scoreLead },
    // Allow one extra step after a tool call so the model can respond in
    // text once it has the tool's result, instead of stopping mid-turn.
    stopWhen: stepCountIs(3),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onError: (error) => {
        console.error("[lead-chat] stream error:", error);
        return describeError(error);
      },
    }),
  });
}
