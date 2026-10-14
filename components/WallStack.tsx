"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

/** Where each phase sits along the pinned scroll, 0 → 1. */
const START = 0.04; // nothing on screen before this
const BUILT = 0.58; // all bricks have landed by here
const BREAK = 0.78; // the wall shatters
const PAYOFF = 0.83; // the message pushes out from the middle

const BreakContext = createContext(false);

/**
 * One block of the wall. Every block — filler bricks included — gets its own
 * trajectory so the whole thing comes apart, rather than sliding off in rows.
 */
export function Shard({
  seed,
  children,
  className = "",
}: {
  seed: number;
  children: React.ReactNode;
  className?: string;
}) {
  const broken = useContext(BreakContext);

  // Deterministic pseudo-random so server and client agree.
  const r = (n: number) => {
    const x = Math.sin(seed * 12.9898 + n * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };

  const dirX = r(1) < 0.5 ? -1 : 1;
  const x = dirX * (150 + r(2) * 260);
  const y = 120 + r(3) * 280;
  const rot = dirX * (16 + r(4) * 34);

  return (
    <div
      className={className}
      style={{
        transition: broken
          ? `transform ${1100 + r(5) * 450}ms cubic-bezier(0.45, 0, 0.75, 0.6) ${Math.round(r(6) * 240)}ms, opacity 1000ms ease-in ${Math.round(260 + r(6) * 240)}ms`
          : "none",
        transform: broken
          ? `translate(${x}px, ${y}px) rotate(${rot}deg) scale(0.88)`
          : "none",
        opacity: broken ? 0 : 1,
      }}
    >
      {children}
    </div>
  );
}

export default function WallStack({
  header,
  payoff,
  children,
}: {
  header: React.ReactNode;
  payoff: React.ReactNode;
  children: React.ReactNode[];
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [still, setStill] = useState(false); // reduced motion
  const count = children.length;

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
      setProgress(travel <= 0 ? 1 : Math.min(1, Math.max(0, -top / travel)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const revealed = still
    ? count
    : progress < START
      ? 0
      : Math.min(
          count,
          Math.floor(((progress - START) / (BUILT - START)) * count) + 1,
        );

  const broken = !still && progress >= BREAK;
  const showPayoff = !still && progress >= PAYOFF;

  // Reduced motion: no pin, no shatter — just the wall then the message.
  if (still) {
    return (
      <BreakContext.Provider value={false}>
        <div className="mx-auto w-full max-w-4xl px-6 py-14 sm:py-24">
          {header}
          <div className="mt-8 flex flex-col-reverse gap-[9px]">
            {children.map((child, i) => (
              <div key={i}>{child}</div>
            ))}
          </div>
          <div className="mt-16">{payoff}</div>
        </div>
      </BreakContext.Provider>
    );
  }

  return (
    <BreakContext.Provider value={broken}>
      <div ref={wrapRef} className="relative h-[150vh] sm:h-[190vh]">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-10">
          {/* the wall */}
          <div className="mx-auto w-full max-w-4xl px-6">
            <div
              className="transition-all duration-500 ease-in"
              style={{
                opacity: broken ? 0 : 1,
                transform: broken ? "translateY(-40px)" : "none",
              }}
            >
              {header}
            </div>

            {/* column-reverse: brick 01 settles at the bottom and the wall
                grows upward as each new one falls in from above. */}
            <div className="mt-8 flex flex-col-reverse gap-[9px]">
              {children.map((child, i) => (
                <div
                  key={i}
                  style={{
                    // the row only handles the fall-in; breaking apart is each
                    // block's own business (see Shard)
                    transition: broken
                      ? "none"
                      : "transform 900ms cubic-bezier(0.34, 1.5, 0.64, 1), opacity 220ms ease-out",
                    transform: broken
                      ? "none"
                      : i < revealed
                        ? "translateY(0) scale(1)"
                        : "translateY(-60vh) scale(0.94)",
                    opacity: broken ? 1 : i < revealed ? 1 : 0,
                  }}
                >
                  {child}
                </div>
              ))}
            </div>
          </div>

          {/* what's left standing once the wall is gone */}
          <div
            aria-hidden={!showPayoff}
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
            style={{
              transition:
                "transform 900ms cubic-bezier(0.34, 1.5, 0.64, 1), opacity 400ms ease-out",
              transform: showPayoff ? "scale(1)" : "scale(0.55)",
              opacity: showPayoff ? 1 : 0,
            }}
          >
            <div className="pointer-events-auto">{payoff}</div>
          </div>
        </div>
      </div>
    </BreakContext.Provider>
  );
}
