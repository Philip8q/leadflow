import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LeadChatPage from "./page";
import { useChat } from "@ai-sdk/react";

// Mock the AI SDK chat hook so we never call real network endpoints
vi.mock("@ai-sdk/react", () => ({
  useChat: vi.fn(),
}));

describe("Lead Qualification Chat Component", () => {
  const mockSendMessage = vi.fn();
  const mockStop = vi.fn();
  const mockRegenerate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders empty state with prompt suggestions and disabled send button", () => {
    useChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: null,
      stop: mockStop,
      regenerate: mockRegenerate,
    });

    render(<LeadChatPage />);

    expect(
      screen.getByRole("heading", { name: /Lead Qualification Chat/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/No conversation yet/i)).toBeInTheDocument();

    // Query prompts by button role
    const promptButton = screen.getByRole("button", {
      name: /I'm looking to buy a 2-bedroom in the next few months/i,
    });
    expect(promptButton).toBeInTheDocument();

    // Textarea and Send button state
    const textarea = screen.getByPlaceholderText(/Type a message/i);
    const sendButton = screen.getByRole("button", { name: /Send/i });
    expect(sendButton).toBeDisabled();

    // Clicking prompt fills the textarea and enables send
    fireEvent.click(promptButton);
    expect(textarea).toHaveValue(
      "I'm looking to buy a 2-bedroom in the next few months"
    );
    expect(sendButton).not.toBeDisabled();
  });

  it("sends message when user types text and submits form", () => {
    useChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: null,
      stop: mockStop,
      regenerate: mockRegenerate,
    });

    render(<LeadChatPage />);

    const textarea = screen.getByPlaceholderText(/Type a message/i);
    const sendButton = screen.getByRole("button", { name: /Send/i });

    fireEvent.change(textarea, { target: { value: "Looking for rental house in Westlands" } });
    expect(sendButton).not.toBeDisabled();

    fireEvent.click(sendButton);
    expect(mockSendMessage).toHaveBeenCalledWith({
      text: "Looking for rental house in Westlands",
    });
  });

  it("renders thinking indicator in pending submitted state", () => {
    useChat.mockReturnValue({
      messages: [
        {
          id: "msg-1",
          role: "user",
          parts: [{ type: "text", text: "What is available?" }],
        },
      ],
      sendMessage: mockSendMessage,
      status: "submitted",
      error: null,
      stop: mockStop,
      regenerate: mockRegenerate,
    });

    render(<LeadChatPage />);

    expect(screen.getByText("What is available?")).toBeInTheDocument();
    expect(screen.getByLabelText("Thinking")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Stop/i })).toBeInTheDocument();
  });

  it("renders streaming assistant text chunks and allows user to stop generation", () => {
    useChat.mockReturnValue({
      messages: [
        {
          id: "msg-1",
          role: "user",
          parts: [{ type: "text", text: "Tell me about prices" }],
        },
        {
          id: "msg-2",
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "Average prices in Kilimani start from KES 85,000 per month.",
            },
          ],
        },
      ],
      sendMessage: mockSendMessage,
      status: "streaming",
      error: null,
      stop: mockStop,
      regenerate: mockRegenerate,
    });

    render(<LeadChatPage />);

    expect(
      screen.getByText(
        "Average prices in Kilimani start from KES 85,000 per month."
      )
    ).toBeInTheDocument();

    const stopButton = screen.getByRole("button", { name: /Stop/i });
    fireEvent.click(stopButton);
    expect(mockStop).toHaveBeenCalledTimes(1);
  });

  it("renders tool result part inside message stream", () => {
    useChat.mockReturnValue({
      messages: [
        {
          id: "msg-1",
          role: "assistant",
          parts: [
            {
              type: "tool-scoreLead",
              toolCallId: "call-123",
              state: "output-available",
              output: {
                score: 92,
                tier: "Hot",
                summary: "Verified buyer with deposit ready",
                breakdown: [
                  { label: "Financing", points: 40, max: 40, detail: "Preapproved" },
                ],
              },
            },
          ],
        },
      ],
      sendMessage: mockSendMessage,
      status: "ready",
      error: null,
      stop: mockStop,
      regenerate: mockRegenerate,
    });

    render(<LeadChatPage />);

    expect(screen.getByText("Hot lead")).toBeInTheDocument();
    expect(screen.getByText("92")).toBeInTheDocument();
    expect(screen.getByText("Verified buyer with deposit ready")).toBeInTheDocument();
  });

  it("renders error banner with retry trigger when stream errors", () => {
    useChat.mockReturnValue({
      messages: [
        {
          id: "msg-1",
          role: "user",
          parts: [{ type: "text", text: "Help me find an apartment" }],
        },
      ],
      sendMessage: mockSendMessage,
      status: "ready",
      error: new Error("Network timeout while contacting AI gateway"),
      stop: mockStop,
      regenerate: mockRegenerate,
    });

    render(<LeadChatPage />);

    expect(
      screen.getByText("Network timeout while contacting AI gateway")
    ).toBeInTheDocument();

    const retryButton = screen.getByRole("button", {
      name: /Retry that message/i,
    });
    fireEvent.click(retryButton);
    expect(mockRegenerate).toHaveBeenCalledTimes(1);
  });
});
