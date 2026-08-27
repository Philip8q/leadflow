"use client";

import { useEffect } from "react";

// Segment-scoped boundary: if the chat page itself crashes while rendering
// (not a chat-message error -- that's handled inline via useChat's own
// error state in page.jsx), this replaces just the chat area, not the
// whole app shell (nav/footer keep rendering from the root layout).
export default function LeadChatError({ error, reset }) {
  useEffect(() => {
    console.error("[lead-chat] page render error:", error);
  }, [error]);

  return (
    <div className="flex h-[calc(100dvh-8rem)] flex-col items-center justify-center gap-3 rounded-lg border border-main/20 bg-main/5 p-6 text-center">
      <h1 className="font-heading text-xl font-semibold text-main">
        The chat couldn&apos;t load
      </h1>
      <p className="max-w-sm text-sm text-text/60">
        Something broke rendering this page. Your conversation, if any, is
        gone — retrying starts fresh.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md bg-main px-4 py-2 text-sm font-medium text-bg hover:opacity-90"
      >
        Reload chat
      </button>
    </div>
  );
}
