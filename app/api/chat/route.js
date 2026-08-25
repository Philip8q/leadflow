import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from "ai";
import { chatModel, CHAT_SYSTEM_PROMPT } from "@/lib/ai/lead-chat-config";

// Streaming responses can run longer than the default serverless timeout.
export const maxDuration = 30;

export async function POST(req) {
  const { messages } = await req.json();

  const result = streamText({
    model: chatModel,
    instructions: CHAT_SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onError: (error) => {
        // Never forward raw provider errors to the client — could leak
        // request/config details. Log server-side for debugging instead.
        console.error("[lead-chat] stream error:", error);
        return "Something went wrong on our end. Please try again.";
      },
    }),
  });
}
