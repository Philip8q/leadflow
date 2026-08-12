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
        <Link href="/" className="font-heading text-xl font-semibold text-main">
          LeadFlow
        </Link>

        <button
          type="button"
          className="text-text sm:hidden"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle menu</span>
          {open ? "Close" : "Menu"}
        </button>

        <nav
          id="primary-nav"
          className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-[65px] flex-col gap-4 border-b border-black/10 bg-bg px-6 py-4 sm:static sm:flex sm:flex-row sm:gap-8 sm:border-none sm:bg-transparent sm:p-0`}
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-text/80 hover:text-main"
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
