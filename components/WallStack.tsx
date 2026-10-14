"use client";

import { useEffect, useRef } from "react";

/** The whole build → crack → break sequence, in ms. */
const DURATION = 4200;

/** The fracture, in percentages of the stage, so it scales with the wall. */
const CRACKS: { d: string; thin?: boolean }[] = [
  { d: "M50,-2 L47,11 L53,21 L48,34 L55,46 L49,58 L56,70 L51,84 L54,102" },
  { d: "M47,11 L37,7 L27,13 L16,9", thin: true },
  { d: "M53,21 L63,17 L73,24 L86,19", thin: true },
  { d: "M48,34 L38,40 L29,37 L18,46 L6,43" },
  { d: "M55,46 L66,43 L75,52 L89,49 L98,55" },
  { d: "M49,58 L40,66 L28,70 L17,79", thin: true },
  { d: "M56,70 L68,78 L80,75 L92,84", thin: true },
  { d: "M51,84 L42,90 L33,88", thin: true },
];

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
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const crackRef = useRef<SVGSVGElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const punchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const rowsBox = rowsRef.current;
    const crack = crackRef.current;
    const flash = flashRef.current;
    const punch = punchRef.current;
    if (!root || !stage || !rowsBox || !crack || !flash || !punch) return;

    // the bottom row lands first, so the wall grows upward
    const rows = Array.from(
      rowsBox.querySelectorAll<HTMLElement>(":scope > div"),
    );
    const paths = Array.from(crack.querySelectorAll("path"));
    const shapes = paths.map((p) => p.getAttribute("d") ?? "");
    const lengths: number[] = [];
    let bricks: Brick[] = [];

    const layout = () => {
      const w = stage.offsetWidth;
      const h = rowsBox.offsetHeight;
      crack.setAttribute("viewBox", `0 0 ${w} ${h}`);

      paths.forEach((p, k) => {
        p.setAttribute(
          "d",
          shapes[k].replace(
            /(-?[\d.]+),(-?[\d.]+)/g,
            (_m, x: string, y: string) =>
              `${((Number(x) * w) / 100).toFixed(1)},${((Number(y) * h) / 100).toFixed(1)}`,
          ),
        );
        lengths[k] = p.getTotalLength();
        p.style.strokeDasharray = String(lengths[k]);
      });

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
        const t = clamp((p - (0.03 + i * 0.12)) / 0.15);
        row.style.opacity = String(Math.min(1, t * 2.5));
        row.style.transform = `translateY(${(-(1 - easeBack(t)) * lift).toFixed(1)}px)`;
      });

      // the fracture runs out from the centre
      const c = clamp((p - 0.58) / 0.2);
      paths.forEach((path, k) => {
        const lead = k === 0 ? 0 : 0.15 + k * 0.06;
        path.style.strokeDashoffset = (
          (1 - clamp((c - lead) / (1 - lead))) * lengths[k]
        ).toFixed(1);
      });

      // the wall shudders while it splits
      const shake = p > 0.62 && p < 0.82 ? Math.sin(p * 900) * 3 * c : 0;
      stage.style.transform = shake ? `translateX(${shake.toFixed(1)}px)` : "";

      const b = easeOut(clamp((p - 0.8) / 0.14));
      crack.style.opacity = String(1 - b);

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

      flash.style.opacity = Math.max(0, 1 - Math.abs(p - 0.84) / 0.07).toFixed(3);

      const q = easeOut(clamp((p - 0.83) / 0.12));
      punch.style.opacity = q.toFixed(3);
      punch.style.transform = `scale(${(0.9 + 0.1 * q).toFixed(3)})`;
      punch.style.pointerEvents = q > 0.6 ? "auto" : "none";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      layout();
      render(1);
      return;
    }

    let running = false;
    let frame = 0;

    const play = () => {
      if (running) return;
      layout();
      running = true;
      let start: number | null = null;

      const step = (ts: number) => {
        if (start === null) start = ts;
        const p = clamp((ts - start) / DURATION);
        render(p);
        if (p < 1) frame = requestAnimationFrame(step);
        else running = false;
      };

      frame = requestAnimationFrame(step);
    };

    layout();
    render(0);

    // it replays every time the wall comes back into view
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.45) play();
          else if (!e.isIntersecting && !running) {
            layout();
            render(0);
          }
        });
      },
      { threshold: [0, 0.45] },
    );
    io.observe(root);

    const onResize = () => {
      if (!running) layout();
    };
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="mx-auto w-full max-w-4xl overflow-hidden px-6 py-14 sm:py-20"
    >
      {header}

      <div ref={stageRef} className="relative mt-8">
        {/* the blast behind the wall as it gives way */}
        <div
          ref={flashRef}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-[1.6] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-0"
          style={{
            background:
              "radial-gradient(closest-side, rgba(231,0,11,0.35), rgba(231,0,11,0.12) 45%, transparent 70%)",
          }}
        />

        {/* column-reverse: brick 01 settles at the bottom and the wall grows
            upward as each new one falls in from above */}
        <div ref={rowsRef} className="relative z-[1] flex flex-col-reverse gap-[9px]">
          {children.map((child, i) => (
            <div key={i} className="opacity-0 will-change-transform">
              {child}
            </div>
          ))}
        </div>

        <svg
          ref={crackRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-visible"
        >
          {CRACKS.map(({ d, thin }) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="#e7000b"
              strokeWidth={thin ? 1.6 : 2.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>

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
}
