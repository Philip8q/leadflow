"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/demo/lead-chat", label: "AI Lead Chat" },
  { href: "/demo", label: "Alert Settings" },
  { href: "/case-study", label: "Case Study" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="border-b border-black/10 bg-bg sticky top-0 z-40 backdrop-blur-sm bg-bg/95">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-heading text-xl font-semibold text-main rounded focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-2 flex items-center gap-2.5"
          >
            <span>LeadFlow</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-sans font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              Operational
            </span>
          </Link>
        </div>

        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded text-text sm:hidden focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-2"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">{open ? "Close navigation menu" : "Open navigation menu"}</span>
          <span aria-hidden="true" className="text-sm font-medium">{open ? "Close" : "Menu"}</span>
        </button>

        <nav
          id="primary-nav"
          aria-label="Primary navigation"
          className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-[65px] flex-col gap-4 border-b border-black/10 bg-bg px-6 py-6 shadow-lg sm:static sm:flex sm:flex-row sm:items-center sm:gap-4 sm:border-none sm:bg-transparent sm:p-0 sm:shadow-none`}
        >
          {LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-sm rounded-md px-2.5 py-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-2 ${
                  isActive
                    ? "font-semibold text-main bg-main/5"
                    : "text-text/75 hover:text-main hover:bg-black/5"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          
          <Link
            href="/demo/lead-chat"
            className="inline-flex items-center justify-center rounded-lg bg-main px-4 py-2 text-sm font-medium text-bg hover:opacity-90 active:scale-98 transition-all focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-2 sm:ml-2"
            onClick={() => setOpen(false)}
          >
            Launch Chat
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
