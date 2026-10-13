"use client";

import { useEffect, useRef, useState } from "react";

export type Reason = { n: string; title: string; body: string };

/**
 * A pinned frame: a giant headline slides horizontally in the background
 * while the cards swap over it, one per scroll step.
 */
export default function WhyAttendStack({
  marquee,
  reasons,
}: {
  marquee: string;
  reasons: Reason[];
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      return;
    }

    const onScroll = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const { top, height } = wrap.getBoundingClientRect();
      const travel = height - window.innerHeight;
      setProgress(travel <= 0 ? 0 : Math.min(1, Math.max(0, -top / travel)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Reduced motion: plain stacked cards, no pin.
  if (still) {
    return (
      <div className="mx-auto grid max-w-[1152px] gap-5 px-6 py-16 md:grid-cols-3">
        {reasons.map((r) => (
          <article key={r.n} className="rounded-[28px] bg-[#f7f7f8] p-8">
            <p className="font-mono text-xs text-ink/40">{r.n}</p>
            <h3 className="mt-5 font-display text-2xl font-medium text-ink">
              {r.title}
            </h3>
            <p className="mt-3 text-base leading-[26px] text-ink/55">{r.body}</p>
          </article>
        ))}
      </div>
    );
  }

  const active = Math.min(
    reasons.length - 1,
    Math.floor(progress * reasons.length * 0.999),
  );

  return (
    <div ref={wrapRef} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* the giant headline, sliding as you scroll */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          }}
        >
          {/* runs on its own, and scroll nudges it along */}
          <div
            className="w-max will-change-transform"
            style={{ transform: `translateX(${-progress * 14}%)` }}
          >
            <div className="marquee-headline flex w-max">
              {[0, 1].map((copy) => (
                <p
                  key={copy}
                  className="whitespace-nowrap pr-[0.25em] font-display text-[15vw] font-bold leading-none tracking-[-0.03em] text-ink/90"
                >
                  {marquee}&nbsp;
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* the cards, swapping over it */}
        <div className="relative mx-auto h-full w-full max-w-[560px] px-6">
          {reasons.map((r, i) => {
            const state = i === active ? 0 : i < active ? -1 : 1;
            return (
              <article
                key={r.n}
                aria-hidden={state !== 0}
                className="absolute inset-x-6 top-1/2 flex min-h-[320px] -translate-y-1/2 flex-col rounded-[32px] p-9 shadow-[0_40px_90px_-40px_rgba(231,0,11,0.45)] sm:p-10"
                style={{
                  backgroundImage:
                    "linear-gradient(150deg, #fff 0%, #ffe9ea 38%, #e7000b 140%)",
                  transition:
                    "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 450ms ease-out",
                  transform: `translateY(calc(-50% + ${state * 56}px)) scale(${
                    state === 0 ? 1 : 0.93
                  }) rotate(${state === 0 ? -1.5 : state * 2.5}deg)`,
                  opacity: state === 0 ? 1 : 0,
                  zIndex: state === 0 ? 2 : 1,
                }}
              >
                <span className="self-end font-mono text-xs font-bold tracking-widest text-ink/40">
                  {r.n}
                </span>

                <h3 className="mt-6 font-display text-[32px] font-medium leading-[1.15] tracking-[-1px] text-ink sm:text-[40px]">
                  {r.title}
                </h3>

                <p className="mt-auto pt-8 text-base leading-[26px] text-ink/60">
                  {r.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
