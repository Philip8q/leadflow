"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { LeadScoreTool } from "@/components/LeadScoreCard";

// How close to the bottom (in px) still counts as "at the bottom" for
// auto-scroll purposes. A user resting a few px above the exact bottom
// (common with fractional scroll positions) shouldn't lose their pin.
const BOTTOM_THRESHOLD = 48;

// Click-to-fill examples for the empty state -- an onboarding nudge, not
// just an apology for having nothing to show yet.
const EXAMPLE_PROMPTS = [
  "I'm looking to buy a 2-bedroom in the next few months",
  "I want to rent a 1-bedroom in Kilimani ASAP",
  "I'm thinking of selling my house in Karen",
];

function isNearBottom(el) {
  return el.scrollHeight - el.scrollTop - el.clientHeight < BOTTOM_THRESHOLD;
}

// Parts this UI knows how to render. Anything else (e.g. hidden
// reasoning-model "thinking" parts) is intentionally skipped, not shown.
// Whitespace-only text (this model sometimes emits a bare "\n\n\n" right
// before a tool call) must not pass either -- it renders as a blank,
// broken-looking bubble otherwise.
function isRenderablePart(part) {
  if (part.type === "text") return part.text.trim().length > 0;
  return part.type === "tool-scoreLead";
}

export default function LeadChatPage() {
  const { messages, sendMessage, status, error, stop, regenerate } =
    useChat();
  const [input, setInput] = useState("");
  const [pinnedToBottom, setPinnedToBottom] = useState(true);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const busy = status === "submitted" || status === "streaming";

  function fillExample(example) {
    setInput(example);
    inputRef.current?.focus();
  }

  // Auto-scroll that respects the user scrolling up: only follow new
  // content while already pinned to the bottom, and release the pin the
  // moment the user scrolls away from it.
  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    setPinnedToBottom(isNearBottom(el));
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !pinnedToBottom) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, pinnedToBottom]);

  function scrollToLatest() {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    setPinnedToBottom(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || busy) return;
    sendMessage({ text: trimmed });
    setInput("");
    setPinnedToBottom(true);
  }

  const lastMessage = messages[messages.length - 1];
  const lastMessageIsEmptyAssistant =
    lastMessage?.role === "assistant" &&
    !lastMessage.parts.some(isRenderablePart);

  return (
    <div className="flex h-[calc(100dvh-8rem)] flex-col gap-4">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-main">
          Lead Qualification Chat
        </h1>
        <p className="text-text/60">
          A live demo of LeadFlow&apos;s AI qualification widget &mdash; talk
          to it like you&apos;re a prospective buyer or seller.
        </p>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col rounded-lg border border-black/10 bg-white">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain p-4"
        >
          {messages.length === 0 && (
            <div className="m-auto flex max-w-xs flex-col items-center gap-3 text-center">
              <p className="text-sm text-text/50">
                No conversation yet &mdash; try one of these to see how it
                works:
              </p>
              <div className="flex flex-col gap-2">
                {EXAMPLE_PROMPTS.map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => fillExample(example)}
                    className="rounded-full border border-black/10 bg-bg px-3 py-1.5 text-xs text-text/70 hover:border-main/40 hover:text-main"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => {
            const isUser = message.role === "user";
            const renderableParts = message.parts.filter(isRenderablePart);
            const isEmptyAssistant = !isUser && renderableParts.length === 0;

            return (
              <div
                key={message.id}
                className={`flex flex-col gap-2 ${isUser ? "items-end" : "items-start"}`}
              >
                {isEmptyAssistant && (
                  <div className="max-w-[85%] rounded-lg border border-black/10 bg-bg px-3 py-2 text-sm text-text">
                    <ThinkingIndicator />
                  </div>
                )}

                {renderableParts.map((part, index) => {
                  if (part.type === "text") {
                    return (
                      <div
                        key={`${message.id}-text-${index}`}
                        className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                          isUser
                            ? "bg-main text-bg"
                            : "border border-black/10 bg-bg text-text"
                        }`}
                      >
                        {part.text}
                      </div>
                    );
                  }

                  if (part.type === "tool-scoreLead") {
                    return (
                      <LeadScoreTool key={part.toolCallId} part={part} />
                    );
                  }

                  return null;
                })}
              </div>
            );
          })}

          {status === "submitted" && !lastMessageIsEmptyAssistant && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-lg border border-black/10 bg-bg px-3 py-2 text-sm text-text">
                <ThinkingIndicator />
              </div>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-start gap-2 rounded-lg border border-main/30 bg-main/5 px-3 py-2 text-sm text-main">
              <span>
                {error.message ||
                  "Your last message failed to send. Nothing else was lost."}
              </span>
              <button
                type="button"
                onClick={() => regenerate()}
                disabled={busy}
                className="rounded-md border border-main/40 px-2 py-1 text-xs font-medium hover:bg-main/10 disabled:opacity-50"
              >
                Retry that message
              </button>
            </div>
          )}
        </div>

        {!pinnedToBottom && messages.length > 0 && (
          <button
            type="button"
            onClick={scrollToLatest}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 rounded-full bg-main px-3 py-1 text-xs font-medium text-bg shadow-md hover:opacity-90"
          >
            Jump to latest
          </button>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex items-end gap-2 border-t border-black/10 p-3"
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit(event);
              }
            }}
            placeholder="Type a message..."
            rows={1}
            disabled={busy}
            className="min-h-[2.5rem] flex-1 resize-none rounded-md border border-black/10 px-3 py-2 text-base text-text outline-none focus-visible:ring-2 focus-visible:ring-main disabled:opacity-60"
          />
          {busy ? (
            <button
              type="button"
              onClick={stop}
              className="rounded-md bg-text px-4 py-2 font-body text-sm font-medium text-bg hover:opacity-90"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="rounded-md bg-main px-4 py-2 font-body text-sm font-medium text-bg hover:opacity-90 disabled:opacity-40"
            >
              Send
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

function ThinkingIndicator() {
  return (
    <span className="inline-flex items-center gap-1" aria-label="Thinking">
      <span className="motion-safe:animate-bounce h-1.5 w-1.5 rounded-full bg-text/40 [animation-delay:-0.3s]" />
      <span className="motion-safe:animate-bounce h-1.5 w-1.5 rounded-full bg-text/40 [animation-delay:-0.15s]" />
      <span className="motion-safe:animate-bounce h-1.5 w-1.5 rounded-full bg-text/40" />
    </span>
  );
}
