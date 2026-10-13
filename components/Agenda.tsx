"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "./icons";

/* Figma: Webinar 23:8783 */

type Topic = {
  n: string;
  title: string;
  /** the free sneak peek; the rest happens live */
  points?: string[];
  note?: string;
};

const TOPICS: Topic[] = [
  {
    n: "01",
    title: "The gap between college and industry",
    points: [
      "Why your syllabus and a company's hiring checklist barely overlap",
      "What recruiters look for that never shows up on a marksheet",
    ],
  },
  {
    n: "02",
    title: "Why Year 1 and 2 decide your career",
    points: [
      "What early starters do differently in their first 24 months",
      "How much ground you can realistically cover before internship season",
    ],
  },
  {
    n: "03",
    title: "The 4 skills top companies hire for",
    points: [
      "The four skills, and why the order you learn them in matters",
      "What to go deep on, and what you can safely skip",
    ],
  },
  {
    n: "04",
    title: "How to learn DSA without giving up",
    points: [
      "Why most students drop DSA midway, and how not to be one of them",
      "A practice rhythm that fits around college, exams included",
    ],
  },
  {
    n: "05",
    title: "Going from AI user to AI builder",
    points: [
      "The difference between using ChatGPT and building with AI",
      "What to build first to prove you can actually build with AI",
    ],
  },
  {
    n: "06",
    title: "Live Q&A with Vishwa",
    note: "Bring your own question. He answers them live.",
  },
];

const LIVE_ONLY = "Walked through end to end, live in the session.";

function Tick() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-1 size-4 shrink-0 text-brand" aria-hidden>
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

export default function Agenda() {
  const [open, setOpen] = useState("01");
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

  // each card opens itself as it reaches the reading line
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rows = rowRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!rows.length) return;

    // work out which row currently owns the line, from every row's position —
    // the observer is only the trigger, so a fast scroll past the band can't
    // leave the wrong card open
    const sync = () => {
      const line = window.innerHeight * 0.42;
      let active = 0;
      rows.forEach((row, i) => {
        if (row.getBoundingClientRect().top <= line) active = i;
      });
      setOpen(TOPICS[active].n);
    };

    const observer = new IntersectionObserver(sync, {
      rootMargin: "-42% 0px -45% 0px",
      threshold: [0, 1],
    });
    rows.forEach((row) => observer.observe(row));

    sync();
    window.addEventListener("resize", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <section id="agenda" className="scroll-mt-24 bg-[#f3f4f6] px-6 pb-20 pt-20">
      <div className="mx-auto max-w-[1152px]">
        <div className="grid items-start lg:grid-cols-[300px_1fr]">
          {/* the pitch — pinned while the agenda scrolls past it */}
          <div className="lg:self-stretch">
          <div className="relative rounded-[28px] bg-brand/[0.06] p-6 lg:sticky lg:top-28 lg:mb-16 lg:mt-10 lg:rounded-r-none">
            {/* the strip's tint curves in around this block */}
            <span aria-hidden className="concave-tr" />
            <span aria-hidden className="concave-br" />
            <span className="inline-flex items-center rounded-full border border-brand/25 bg-brand/8 px-3.5 py-1.5 text-xs text-ink/75">
              What we&apos;ll discuss
            </span>

            <h2 className="mt-4 font-display text-[26px] font-medium leading-[1.15] tracking-[-0.8px] text-ink">
              2 hours. <span className="text-brand">Zero fluff.</span>
            </h2>

            <p className="mt-3 text-sm leading-[21px] text-ink/55">
              Tap any topic for a sneak peek.
              <br />
              The full answers are live.
            </p>

            <a
              href="#register"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-dark"
            >
              Register now
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </a>
          </div>
          </div>

          {/* the agenda — a white panel inside a thin tinted frame */}
          <div className="rounded-[28px] bg-brand/[0.06] p-2.5">
          <ul className="space-y-2.5">
            {TOPICS.map(({ n, title, points, note }, i) => {
              const isOpen = open === n;

              return (
                <li
                  key={n}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  className="overflow-hidden rounded-[20px] bg-white"
                >
                  <div className="flex items-baseline gap-4 px-7 pt-10">
                    <span className="font-mono text-xs text-brand">{n}</span>
                    <h3 className="text-lg font-medium tracking-tight text-ink sm:text-xl">
                      {title}
                    </h3>
                  </div>

                  <div
                    className="grid transition-all duration-700 ease-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                    <div className="px-7 pt-4 pl-[60px]">
                      {note ? (
                        <p className="text-base leading-[26px] text-ink/60">
                          {note}
                        </p>
                      ) : points ? (
                        <ul className="space-y-3">
                          {points.map((p) => (
                            <li
                              key={p}
                              className="flex items-start gap-3 text-base leading-[26px] text-ink/60"
                            >
                              <Tick />
                              {p}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-base leading-[26px] text-ink/60">
                          {LIVE_ONLY}
                        </p>
                      )}
                    </div>
                    </div>
                  </div>

                  <div className="h-10" />
                </li>
              );
            })}
          </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
