"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowRight } from "./icons";

const QUESTIONS = [
  "Which programming language should I start with?",
  "What exactly should I do in Year 1, and in Year 2?",
  "How do I learn DSA without giving up?",
  "How do I go from using AI to building it?",
  "Does my college or CGPA decide my future?",
  "How do I get noticed by top companies before I graduate?",
];

const HOLD = 1700;

export default function Questions() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // how far the thumb has dragged the stack, in px, while a swipe is in flight
  const [drag, setDrag] = useState(0);
  const swipe = useRef<{ x: number; y: number; on: boolean } | null>(null);

  const step = (dir: number) =>
    setActive((i) => (i + dir + QUESTIONS.length) % QUESTIONS.length);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    swipe.current = { x: t.clientX, y: t.clientY, on: false };
    setPaused(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const s = swipe.current;
    if (!s) return;
    const t = e.touches[0];
    const dx = t.clientX - s.x;

    // let a vertical gesture scroll the page; only take over sideways ones
    if (!s.on && Math.abs(dx) < Math.abs(t.clientY - s.y)) return;
    s.on = true;
    setDrag(dx);
  };

  const onTouchEnd = () => {
    const s = swipe.current;
    swipe.current = null;
    setPaused(false);

    if (s?.on && Math.abs(drag) > 45) step(drag < 0 ? 1 : -1);
    setDrag(0);
  };

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(
      () => setActive((i) => (i + 1) % QUESTIONS.length),
      HOLD,
    );
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section id="questions" className="scroll-mt-24 overflow-hidden bg-[#f3f4f6] px-6 py-14 sm:py-20">
      <div className="mx-auto max-w-[1152px]">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-brand/35 bg-brand/10 px-4 py-2 text-sm font-bold text-ink">
            What you&apos;ll walk away with
          </span>

          <h2 className="mx-auto mt-5 max-w-3xl font-display text-[28px] font-medium leading-[1.12] tracking-[-1px] text-ink sm:text-[40px]">
            <span className="text-brand">Clear answers</span> to the questions
            keeping you stuck.
          </h2>
        </div>

        {/* the questions come through the middle, one at a time */}
        <div
          className="question-stage relative mt-10 h-[240px] touch-pan-y select-none sm:mt-14 sm:h-[280px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
        >
          {QUESTIONS.map((q, i) => {
            // how far this card sits from the middle, wrapping both ways
            let rel = i - active;
            if (rel > QUESTIONS.length / 2) rel -= QUESTIONS.length;
            if (rel < -QUESTIONS.length / 2) rel += QUESTIONS.length;

            const front = rel === 0;
            const near = Math.abs(rel) === 1;

            return (
              <article
                key={q}
                onClick={() => !front && setActive(i)}
                aria-hidden={!front}
                className={`absolute left-1/2 top-1/2 flex h-[220px] w-[280px] flex-col rounded-[28px] p-7 sm:h-[240px] sm:w-[320px] ${
                  front ? "" : "cursor-pointer"
                } ${
                  front ? "bg-brand text-white" : "bg-white text-ink"
                }`}
                style={{
                  // eased in and out, so it leaves and lands without a jolt;
                  // a finger on the stack moves it directly instead
                  transition: drag
                    ? "none"
                    : "transform 420ms cubic-bezier(0.65, 0, 0.35, 1), opacity 420ms cubic-bezier(0.65, 0, 0.35, 1), background-color 420ms ease, color 420ms ease",
                  willChange: "transform, opacity",
                  transform: `translate(-50%, -50%) translateX(calc(${rel} * var(--q-step) + ${drag}px)) scale(${
                    front ? 1 : near ? 0.86 : 0.74
                  }) rotate(${front ? 0 : rel * 1.5}deg)`,
                  opacity: front ? 1 : near ? 0.5 : 0,
                  // the hidden cards sit behind the stage, so ignore clicks
                  pointerEvents: front || near ? "auto" : "none",
                  zIndex: front ? 3 : near ? 2 : 1,
                }}
              >
                <span
                  className={`font-display text-3xl font-bold leading-none ${
                    front ? "text-white/70" : "text-brand"
                  }`}
                >
                  ?
                </span>

                <p className="mt-auto text-lg font-bold leading-snug tracking-tight sm:text-xl">
                  {q}
                </p>

                <span
                  className={`mt-4 flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.18em] ${
                    front ? "text-white/70" : "text-ink/40"
                  }`}
                >
                  <span className="relative flex size-1.5">
                    <span
                      className={`absolute inline-flex h-full w-full rounded-full ${
                        front ? "animate-ping bg-white" : "bg-emerald-500"
                      } opacity-75`}
                    />
                    <span
                      className={`relative inline-flex size-1.5 rounded-full ${
                        front ? "bg-white" : "bg-emerald-500"
                      }`}
                    />
                  </span>
                  ANSWERED LIVE
                </span>
              </article>
            );
          })}
        </div>

        {/* which one you're on */}
        <div className="mt-8 flex items-center justify-center gap-2 sm:mt-10">
          {QUESTIONS.map((q, i) => (
            <button
              key={q}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show question ${i + 1}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-7 bg-brand" : "w-1.5 bg-ink/15 hover:bg-ink/30"
              }`}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-5 text-center sm:mt-10 sm:flex-row sm:gap-7">
          <p className="text-base text-ink/60">
            Got your own question? Bring it. Vishwa takes them live.
          </p>

          <a
            href="#register"
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark"
          >
            Get my answers
            <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
