"use client";

import { useId, useState, type ReactNode } from "react";

interface DisclosureProps {
  summary: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

// APG Disclosure (Show/Hide) Pattern: a single button toggles aria-expanded
// and reveals/hides the controlled region. Native <button> already handles
// Enter/Space activation, so no key handler is needed here.
// https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
export default function Disclosure({
  summary,
  children,
  defaultOpen = false,
}: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div className="border-b border-black/10 py-2">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-2 py-2 text-left font-medium text-text outline-none focus-visible:ring-2 focus-visible:ring-main"
      >
        {summary}
        <span aria-hidden="true" className={open ? "rotate-180" : ""}>
          &#9662;
        </span>
      </button>
      <div id={contentId} hidden={!open} className="pb-2 text-sm text-text/80">
        {children}
      </div>
    </div>
  );
}
