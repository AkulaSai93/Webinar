"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "./icons";

/* Figma: Webinar 23:8783 */

type Topic = {
  n: string;
  title: string;
  /** the free sneak peek; the rest happens live */
  points: string[];
  /** teaser text, kept blurred behind the CTA */
  locked: string;
};

const TOPICS: Topic[] = [
  {
    n: "01",
    title: "The gap between college and industry",
    points: [
      "Why your syllabus and a company's hiring checklist barely overlap",
      "What recruiters look for that never shows up on a marksheet",
    ],
    locked:
      "The part of this gap no one talks about, and the four things most students only work out in their final year, when there is no time left to fix any of them.",
  },
  {
    n: "02",
    title: "Why Year 1 and 2 decide your career",
    points: [
      "What early starters do differently in their first 24 months",
      "How much ground you can realistically cover before internship season",
    ],
    locked:
      "The month-by-month split that makes the first two years count, and the single habit that separates students who get interviews from students who get ignored.",
  },
  {
    n: "03",
    title: "The 4 skills top companies hire for",
    points: [
      "The four skills, and why the order you learn them in matters",
      "What to go deep on, and what you can safely skip",
    ],
    locked:
      "The exact order Vishwa recommends, why reversing any two of them costs you a year, and the one skill almost everybody starts with that should come third.",
  },
  {
    n: "04",
    title: "How to learn DSA without giving up",
    points: [
      "Why most students drop DSA midway, and how not to be one of them",
      "A practice rhythm that fits around college, exams included",
    ],
    locked:
      "The weekly rhythm that survives exam season, how many problems actually move the needle, and what to do on the days nothing is clicking at all.",
  },
  {
    n: "05",
    title: "Going from AI user to AI builder",
    points: [
      "The difference between using ChatGPT and building with AI",
      "What to build first to prove you can actually build with AI",
    ],
    locked:
      "The first project to build, the stack to build it on, and how to talk about it in an interview so it reads as engineering rather than a weekend experiment.",
  },
  {
    n: "06",
    title: "Live Q&A with Vishwa",
    points: [
      "Bring your own question. He answers them live.",
      "No slides, no script, whatever you are stuck on",
    ],
    locked:
      "Every question from the room, answered on the spot by someone who has hired for these roles and mentored over a million students through them.",
  },
];

function Tick() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 size-4 shrink-0 text-emerald-400" aria-hidden>
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function Lock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function Agenda() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  // a click wins for a moment, so scrolling doesn't snatch the topic back
  const heldUntil = useRef(0);
  const topic = TOPICS[active];

  const pick = (i: number) => {
    heldUntil.current = Date.now() + 1200;
    setActive(i);
  };

  // walking down the list with the scroll moves through the topics too
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const sync = () => {
      frame = 0;
      const list = listRef.current;
      if (!list || Date.now() < heldUntil.current) return;

      const { top, height } = list.getBoundingClientRect();
      const line = window.innerHeight * 0.45;
      const progress = (line - top) / height;
      if (progress < 0 || progress > 1) return;

      const i = Math.min(TOPICS.length - 1, Math.floor(progress * TOPICS.length));
      setActive((cur) => (cur === i ? cur : i));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="agenda" className="scroll-mt-24 bg-[#f3f4f6] px-6 pb-14 pt-14 sm:pb-20 sm:pt-20">
      <div className="mx-auto max-w-[1152px]">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-brand/35 bg-brand/10 px-4 py-2 text-sm font-bold text-ink">
            What we&apos;ll discuss
          </span>

          <h2 className="mt-5 font-display text-[32px] font-medium leading-[1.1] tracking-[-1px] text-ink sm:text-[48px]">
            2 hours. <span className="text-brand">Zero fluff.</span>
          </h2>

          <p className="mt-3 text-sm text-ink/55 sm:text-base">
            Get everything answered live online.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          {/* the topics, strung along one running line */}
          <ol ref={listRef} className="relative">
            {/* the rail */}
            <span
              aria-hidden
              className="absolute bottom-6 left-[11px] top-6 w-px bg-gradient-to-b from-brand/30 via-ink/12 to-transparent"
            />

            {TOPICS.map(({ n, title }, i) => {
              const on = i === active;

              return (
                <li key={n} className="relative">
                  <button
                    type="button"
                    onClick={() => pick(i)}
                    aria-pressed={on}
                    className="group flex w-full items-start gap-4 py-3 text-left sm:gap-5"
                  >
                    {/* the stop on the rail */}
                    <span className="relative z-10 mt-1 flex size-[23px] shrink-0 items-center justify-center">
                      <span
                        className={`rounded-full transition-all duration-300 ${
                          on
                            ? "size-[23px] bg-brand ring-4 ring-brand/15"
                            : "size-2.5 bg-ink/20 group-hover:size-3.5 group-hover:bg-brand/50"
                        }`}
                      />
                      <span
                        className={`absolute font-mono text-[10px] font-bold text-white transition-opacity ${
                          on ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {n}
                      </span>
                    </span>

                    <span
                      className={`flex-1 rounded-2xl px-4 py-3 transition-all duration-300 sm:px-5 ${
                        on
                          ? "bg-white shadow-[0_18px_40px_-28px_rgba(10,7,8,0.55)]"
                          : "group-hover:bg-white/60"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`flex-1 font-display text-[17px] font-medium leading-snug tracking-tight transition-colors sm:text-lg ${
                            on ? "text-ink" : "text-ink/55 group-hover:text-ink/80"
                          }`}
                        >
                          {title}
                        </span>

                        <Chevron
                          className={`size-[18px] shrink-0 transition-all duration-300 ${
                            on
                              ? "translate-x-0 text-brand"
                              : "-translate-x-1.5 text-ink/20 group-hover:translate-x-0 group-hover:text-brand/60"
                          }`}
                        />
                      </span>

                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* the sneak peek, with the rest held back for the session */}
          <div className="rounded-[28px] bg-[#1b1b1f] p-6 sm:p-8 lg:sticky lg:top-28 lg:self-start">
            <span className="font-mono text-xs text-brand">{topic.n}</span>

            <h3 className="mt-2 font-display text-xl font-medium leading-snug tracking-tight text-white sm:text-2xl">
              {topic.title}
            </h3>

            <ul className="mt-6 space-y-3">
              {topic.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm leading-6 text-white/75 sm:text-base">
                  <Tick />
                  {p}
                </li>
              ))}
            </ul>

            {/* everything past this point happens live — the teaser is
                blurred with a text shadow rather than filter: blur, which
                would push it onto its own layer and cut the panel's corners */}
            <div className="relative mt-6 overflow-hidden rounded-2xl bg-white/[0.04] p-6">
              <p
                aria-hidden
                className="select-none text-sm leading-6 text-transparent"
                style={{ textShadow: "0 0 7px rgba(255,255,255,0.45)" }}
              >
                {topic.locked}
              </p>

              <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[#1b1b1f]/35 px-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70">
                  <Lock />
                </span>

                <a
                  href="#register"
                  className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-dark"
                >
                  Hear it live. Register now
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
