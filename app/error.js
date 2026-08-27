"use client";

import Link from "next/link";
import { useEffect } from "react";

// Root error boundary: catches any render crash Next.js can't otherwise
// recover from. Deliberately generic (no error.message shown) since this
// can catch errors from any route, not just ones we've reviewed for safe
// user-facing detail.
export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("[app] unhandled render error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-24 text-center">
      <h1 className="font-heading text-2xl font-semibold text-main">
        Something went wrong
      </h1>
      <p className="text-text/60">
        This page hit an unexpected error. It&apos;s been logged &mdash; try
        again, or head back home.
      </p>
      <div className="mt-2 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-main px-4 py-2 text-sm font-medium text-bg hover:opacity-90"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-md border border-black/10 px-4 py-2 text-sm font-medium text-text hover:bg-black/5"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
