"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
    <div className="flex min-h-[600px] h-[calc(100vh-12rem)] flex-col gap-4">
      {/* Breadcrumb Navigation & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text/60">
          <Link href="/" className="hover:text-main">Home</Link>
          <span>/</span>
          <span className="text-text font-medium">AI Qualification Chat</span>
        </nav>
        <Link
          href="/demo"
          className="text-xs text-main hover:underline flex items-center gap-1 font-medium"
        >
          Configure Alert Thresholds →
        </Link>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-main">
            Lead Qualification Chat
          </h1>
          <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full font-medium border border-emerald-200/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            Active Stream
          </span>
        </div>
        <p className="text-sm text-text/80 mt-1">
          Autonomous discovery and triage engine. Talk to the assistant as a prospective buyer, seller, or tenant to test real-time scoring.
        </p>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col rounded-xl border border-black/10 bg-white shadow-xs">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          role="log"
          aria-live="polite"
          aria-relevant="additions text"
          aria-label="Conversation messages"
          className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain p-4"
        >
          {messages.length === 0 && (
            <div className="m-auto flex w-full max-w-lg flex-col items-center gap-4 text-center p-4">
              <div className="h-12 w-12 rounded-2xl bg-main/10 flex items-center justify-center text-main shadow-2xs">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v8.018z" />
                </svg>
              </div>

              <div>
                <h2 className="font-heading text-lg font-semibold text-text">
                  LeadFlow Inbound Intake Advisor
                </h2>
                <p className="text-xs text-text/70 mt-1 max-w-md">
                  No conversation yet &mdash; try one of these to see how it works:
                </p>
              </div>

              <div className="flex w-full flex-col gap-2.5 text-left">
                {EXAMPLE_PROMPTS.map((example, idx) => {
                  const tag = idx === 0 ? "BUYER" : idx === 1 ? "TENANT" : "SELLER";
                  return (
                    <button
                      key={example}
                      type="button"
                      onClick={() => fillExample(example)}
                      aria-label={`Prompt starter: ${example}`}
                      className="group flex w-full items-center justify-between gap-3 rounded-xl border border-black/10 bg-bg/50 px-4 py-3 text-left hover:border-main/50 hover:bg-white hover:shadow-xs transition-all duration-150 focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-2"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="shrink-0 rounded-md bg-main/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-main font-mono">
                          {tag}
                        </span>
                        <span className="text-xs font-medium text-text/85 truncate group-hover:text-main transition-colors">
                          {example}
                        </span>
                      </div>
                      <span className="text-text/30 group-hover:text-main group-hover:translate-x-0.5 transition-all text-xs font-bold shrink-0">
                        →
                      </span>
                    </button>
                  );
                })}
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
                        aria-live={isUser ? "off" : "polite"}
                        aria-atomic="false"
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
            <div
              role="alert"
              aria-live="assertive"
              className="flex flex-col items-start gap-2 rounded-lg border border-main/30 bg-main/5 px-3 py-2 text-sm text-main"
            >
              <span>
                {error.message ||
                  "Your last message failed to send. Nothing else was lost."}
              </span>
              <button
                type="button"
                onClick={() => regenerate()}
                disabled={busy}
                className="rounded-md border border-main/40 px-2 py-1 text-xs font-medium hover:bg-main/10 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-2"
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
            aria-label="Jump to latest messages"
            className="absolute bottom-20 left-1/2 -translate-x-1/2 rounded-full bg-main px-3 py-1.5 text-xs font-medium text-bg shadow-md hover:opacity-90 focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-2"
          >
            Jump to latest
          </button>
        )}

        <form
          onSubmit={handleSubmit}
          aria-label="Send a message"
          className="flex items-end gap-2 border-t border-black/10 p-3"
        >
          <label htmlFor="chat-message-input" className="sr-only">
            Type a message
          </label>
          <textarea
            id="chat-message-input"
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
            aria-label="Type a message..."
            rows={1}
            disabled={busy}
            className="min-h-[2.5rem] flex-1 resize-none rounded-md border border-black/10 px-3 py-2 text-base text-text outline-none focus-visible:ring-2 focus-visible:ring-main disabled:opacity-60"
          />
          {busy ? (
            <button
              type="button"
              onClick={stop}
              aria-label="Stop generating response"
              className="rounded-md bg-text px-4 py-2 font-body text-sm font-medium text-bg hover:opacity-90 focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-2"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className="rounded-md bg-main px-4 py-2 font-body text-sm font-medium text-bg hover:opacity-90 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-2"
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
    <span
      role="status"
      aria-live="polite"
      aria-label="Thinking"
      className="inline-flex items-center gap-1.5"
    >
      <span className="sr-only">Thinking...</span>
      <span aria-hidden="true" className="motion-safe:animate-bounce h-1.5 w-1.5 rounded-full bg-text/60 [animation-delay:-0.3s]" />
      <span aria-hidden="true" className="motion-safe:animate-bounce h-1.5 w-1.5 rounded-full bg-text/60 [animation-delay:-0.15s]" />
      <span aria-hidden="true" className="motion-safe:animate-bounce h-1.5 w-1.5 rounded-full bg-text/60" />
    </span>
  );
}
