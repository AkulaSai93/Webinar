"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { ArrowUpRight } from "./icons";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "What you'll learn", href: "#curriculum" },
  { label: "Mentor", href: "#mentor" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled
          ? "border-b border-ink/10 bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        {/* brand */}
        <a href="#" className="flex shrink-0 items-center gap-3">
          <Image
            src="/upgrad-logo.png"
            alt="upGrad School of Technology"
            width={182}
            height={64}
            priority
            className="h-9 w-auto"
          />
        </a>

        {/* desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-ink/65 transition hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* desktop cta */}
        <a
          href="#register"
          className="hidden shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand lg:inline-flex"
        >
          Register now
          <ArrowUpRight className="size-3.5" />
        </a>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink/12 text-ink lg:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-full bg-ink transition ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-full bg-ink transition ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-full bg-ink transition ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-ink/10 bg-white px-6 py-5 lg:hidden"
        >
          <ul className="space-y-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-2.5 text-sm font-medium text-ink/75 transition hover:bg-ink/5 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#register"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand"
          >
            Register now
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      )}
    </header>
  );
}
