"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";

// How close to the bottom (in px) still counts as "at the bottom" for
// auto-scroll purposes. A user resting a few px above the exact bottom
// (common with fractional scroll positions) shouldn't lose their pin.
const BOTTOM_THRESHOLD = 48;

function isNearBottom(el) {
  return el.scrollHeight - el.scrollTop - el.clientHeight < BOTTOM_THRESHOLD;
}

function messageText(message) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export default function LeadChatPage() {
  const { messages, sendMessage, status, error, stop, regenerate } =
    useChat();
  const [input, setInput] = useState("");
  const [pinnedToBottom, setPinnedToBottom] = useState(true);
  const scrollRef = useRef(null);

  const busy = status === "submitted" || status === "streaming";

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
    lastMessage?.role === "assistant" && messageText(lastMessage) === "";

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
          className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4"
        >
          {messages.length === 0 && (
            <p className="m-auto max-w-xs text-center text-sm text-text/50">
              Say hello to start. Try something like &ldquo;I&apos;m looking
              to buy a 2-bedroom in the next few months.&rdquo;
            </p>
          )}

          {messages.map((message) => {
            const text = messageText(message);
            const isUser = message.role === "user";
            const isEmptyAssistant = !isUser && text === "";

            return (
              <div
                key={message.id}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                    isUser
                      ? "bg-main text-bg"
                      : "border border-black/10 bg-bg text-text"
                  }`}
                >
                  {isEmptyAssistant ? <ThinkingIndicator /> : text}
                </div>
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
              <span>Something went wrong. Please try again.</span>
              <button
                type="button"
                onClick={() => regenerate()}
                className="rounded-md border border-main/40 px-2 py-1 text-xs font-medium hover:bg-main/10"
              >
                Retry
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
