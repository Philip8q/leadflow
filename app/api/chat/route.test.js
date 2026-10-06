import { describe, it, expect, vi } from "vitest";
import { POST } from "./route";

// Mock AI module to prevent actual model initialization or external API calls during route validation tests
vi.mock("ai", () => ({
  APICallError: {
    isInstance: vi.fn(),
  },
  convertToModelMessages: vi.fn().mockImplementation((m) => Promise.resolve(m)),
  createUIMessageStreamResponse: vi.fn().mockReturnValue(new Response("mock stream", { status: 200 })),
  stepCountIs: vi.fn(),
  streamText: vi.fn().mockReturnValue({ stream: {} }),
  toUIMessageStream: vi.fn().mockReturnValue({}),
}));

vi.mock("@/lib/ai/lead-chat-config", () => ({
  chatModel: "mock-model",
  CHAT_SYSTEM_PROMPT: "mock system prompt",
}));

vi.mock("@/lib/ai/lead-chat-tools", () => ({
  scoreLead: {},
  ToolUserError: class ToolUserError extends Error {},
}));

describe("POST /api/chat - Production Hygiene and Abuse Prevention", () => {
  it("rejects malformed JSON with 400 status", async () => {
    const req = new Request("http://localhost:3000/api/chat", {
      method: "POST",
      body: "invalid-json{",
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Malformed request body.");
  });

  it("rejects empty messages array with 400 status", async () => {
    const req = new Request("http://localhost:3000/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: [] }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("At least one message is required.");
  });

  it("enforces conversation turn limit (> 25 messages)", async () => {
    const messages = Array.from({ length: 26 }, (_, i) => ({
      role: i % 2 === 0 ? "user" : "assistant",
      content: `Message ${i}`,
    }));
    const req = new Request("http://localhost:3000/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain("Conversation turn limit reached");
  });

  it("enforces maximum character length cap on user messages (> 1500 chars)", async () => {
    const oversizedMessage = "A".repeat(1501);
    const req = new Request("http://localhost:3000/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [{ role: "user", content: oversizedMessage }],
      }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain("Message exceeds maximum allowed length of 1500 characters");
  });

  it("enforces maximum total conversation character cap (> 15000 chars)", async () => {
    const messages = Array.from({ length: 15 }, (_, i) => ({
      role: i % 2 === 0 ? "user" : "assistant",
      content: "B".repeat(1100),
    }));
    const req = new Request("http://localhost:3000/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain("Total conversation exceeds allowed character limit");
  });

  it("accepts valid messages and initiates stream response", async () => {
    const req = new Request("http://localhost:3000/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [{ role: "user", content: "Hi, I am looking for a 3-bedroom house in Kilimani." }],
      }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
  });
});
