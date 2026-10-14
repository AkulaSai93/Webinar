"use client";

import { useState } from "react";

/* Figma: Webinar 25:9680 */

const FAQS = [
  {
    q: "Is it really free?",
    a: "Yes. Register and you'll get the Zoom link. No payment, no catch.",
  },
  {
    q: "I'm not in CSE. Can I join?",
    a: "Yes. Any engineering branch, any college, any tier.",
  },
  {
    // TODO: confirm whether a recording goes out, and to whom
    q: "Can I just watch it later?",
    a: "It's a live session, and the Q&A is the part you can't get from a recording.",
  },
  {
    q: "Do I need to know coding?",
    a: "No. Zero coding experience is fine — it's built for 1st and 2nd year students.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-[#f3f4f6] px-6 py-14 sm:py-20">
      <div className="mx-auto grid max-w-[1152px] gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        {/* the heading */}
        <div>
          <span className="inline-flex items-center rounded-full border border-brand/35 bg-brand/10 px-4 py-2 text-xs font-bold tracking-[0.08em] text-ink">
            QUICK ANSWERS
          </span>

          <h2 className="mt-6 font-display text-[32px] font-normal leading-[1.1] tracking-[-1px] text-ink sm:text-[40px]">
            Before you <span className="text-brand">register</span>
          </h2>
        </div>

        {/* the answers */}
        <ul className="border-t border-ink/10">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = open === i;

            return (
              <li key={q} className="border-b border-ink/10">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-[15px] font-semibold tracking-tight text-ink">
                    {q}
                  </span>
                  <span className="shrink-0 text-sm leading-none text-brand">
                    {isOpen ? "✕" : "+"}
                  </span>
                </button>

                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-10 text-sm leading-[22px] text-ink/55">
                      {a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
