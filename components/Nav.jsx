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
            <span className="inline-flex items-center gap-1.5 text-[11px] font-sans font-medium text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
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
          className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-[65px] flex-col gap-4 border-b border-black/10 bg-bg px-6 py-6 shadow-lg sm:static sm:flex sm:flex-row sm:items-center sm:gap-3 sm:border-none sm:bg-transparent sm:p-0 sm:shadow-none`}
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
          
          <a
            href="https://github.com/Philip8q/leadflow"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-black/15 bg-white px-3 py-1.5 text-xs font-semibold text-text hover:bg-black/5 hover:border-black/30 transition-all focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-2 sm:ml-2 shadow-2xs"
            onClick={() => setOpen(false)}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
