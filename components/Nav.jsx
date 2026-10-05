"use client";

import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/case-study", label: "Case Study" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-black/10 bg-bg">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-heading text-xl font-semibold text-main rounded focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-2"
        >
          LeadFlow
        </Link>

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
          className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-[65px] flex-col gap-4 border-b border-black/10 bg-bg px-6 py-4 sm:static sm:flex sm:flex-row sm:gap-8 sm:border-none sm:bg-transparent sm:p-0`}
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-text/80 hover:text-main rounded focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Nav;
