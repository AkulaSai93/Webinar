"use client";

import { useEffect, useRef, useState } from "react";

/** How far the page scrolls while the wall builds and then bursts apart. */
const TRACK = "h-[340vh] sm:h-[440vh]";

/** One block of the wall — every block gets its own trajectory when it goes. */
export function Shard({
  children,
  className = "",
}: {
  /** kept for call sites; the throw is measured at play time now */
  seed?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div data-brick className={className}>
      {children}
    </div>
  );
}

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeBack = (t: number) => {
  const c = 1.4;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

type Brick = { el: HTMLElement; x: number; y: number; r: number; g: number };

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
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const punchRef = useRef<HTMLDivElement>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const rowsBox = rowsRef.current;
    const punch = punchRef.current;
    if (!root || !stage || !rowsBox || !punch) return;

    // the bottom row lands first, so the wall grows upward
    const rows = Array.from(
      rowsBox.querySelectorAll<HTMLElement>(":scope > div"),
    );
    let bricks: Brick[] = [];

    const layout = () => {
      // each brick is thrown outward from the middle of the wall
      const box = stage.getBoundingClientRect();
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height / 2;

      bricks = Array.from(stage.querySelectorAll<HTMLElement>("[data-brick]")).map(
        (el) => {
          el.style.transform = "";
          const r = el.getBoundingClientRect();
          return {
            el,
            x: (r.left + r.width / 2 - cx) * 1.5 + rnd(-90, 90),
            y: (r.top + r.height / 2 - cy) * 1.4 + rnd(-140, 40),
            r: rnd(-55, 55),
            g: rnd(260, 520), // the drop that pulls it down as it flies
          };
        },
      );
    };

    const render = (p: number) => {
      const lift = stage.offsetHeight + 160;

      rows.forEach((row, i) => {
        const t = clamp((p - (0.02 + i * 0.1)) / 0.13);
        row.style.opacity = String(Math.min(1, t * 2.5));
        row.style.transform = `translateY(${(-(1 - easeBack(t)) * lift).toFixed(1)}px)`;
      });

      // then it gives way
      const b = easeOut(clamp((p - 0.52) / 0.34));

      bricks.forEach((o) => {
        if (b <= 0) {
          o.el.style.transform = "";
          o.el.style.opacity = "";
          return;
        }
        o.el.style.transform =
          `translate(${(o.x * b).toFixed(1)}px, ${(o.y * b + o.g * b * b).toFixed(1)}px)` +
          ` rotate(${(o.r * b).toFixed(1)}deg) scale(${(1 - 0.35 * b).toFixed(3)})`;
        o.el.style.opacity = (1 - Math.pow(b, 1.3)).toFixed(3);
      });

      const q = easeOut(clamp((p - 0.74) / 0.18));
      punch.style.opacity = q.toFixed(3);
      punch.style.transform = `scale(${(0.9 + 0.1 * q).toFixed(3)})`;
      punch.style.pointerEvents = q > 0.6 ? "auto" : "none";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      layout();
      render(1);
      return;
    }

    // the sequence is driven by the scrollbar: how far the pinned track has
    // travelled is the only clock
    let frame = 0;

    const update = () => {
      frame = 0;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const { top, height } = wrap.getBoundingClientRect();
      const travel = height - window.innerHeight;
      render(travel <= 0 ? 0 : clamp(-top / travel));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    layout();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      layout();
      update();
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const inner = (
    <div
      ref={rootRef}
      className="mx-auto w-full max-w-4xl overflow-hidden px-6 py-14 sm:py-20"
    >
      {header}

      <div ref={stageRef} className="relative mt-8">
        {/* column-reverse: brick 01 settles at the bottom and the wall grows
            upward as each new one falls in from above */}
        <div ref={rowsRef} className="relative z-[1] flex flex-col-reverse gap-[9px]">
          {children.map((child, i) => (
            <div key={i} className="opacity-0 will-change-transform">
              {child}
            </div>
          ))}
        </div>

        {/* what's left standing once the wall is gone */}
        <div
          ref={punchRef}
          className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center px-6 opacity-0"
        >
          {payoff}
        </div>
      </div>
    </div>
  );

  // reduced motion: the finished state, in the normal flow, no pinning
  if (still) return inner;

  return (
    <div ref={wrapRef} className={`relative ${TRACK}`}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {inner}
      </div>
    </div>
  );
}
