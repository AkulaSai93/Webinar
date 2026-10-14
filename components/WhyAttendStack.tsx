"use client";

import { useEffect, useRef, useState } from "react";

/* Figma: Webinar / Why attend 23:8728 */

export type Reason = {
  n: string;
  title: string;
  body: string;
  /** card face: gradient runs to the left, from → to */
  from: string;
  to: string;
  tilt: number;
};

const BLOB_IN = 0.06; // the gradient container settles
const FIRST_CARD = 0.2; // the first card climbs out of it
const PER_CARD = 0.23;
/* the stack step lives in CSS (--stack-step) */

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

    let frame = 0;
    const update = () => {
      frame = 0;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const { top, height } = wrap.getBoundingClientRect();
      const travel = height - window.innerHeight;
      setProgress(travel <= 0 ? 0 : Math.min(1, Math.max(0, -top / travel)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const Card = ({ r, style }: { r: Reason; style?: React.CSSProperties }) => (
    <article
      className="flex h-[340px] w-full flex-col overflow-hidden rounded-[36px] border-[3px] border-white px-7 py-6 font-geist shadow-[0px_4px_8px_0px_rgba(8,7,49,0.06),0px_14px_14px_0px_rgba(8,7,49,0.05)] sm:h-[280px] sm:rounded-[48px] sm:border-4 sm:px-9 sm:py-7"
      style={{
        backgroundImage: `linear-gradient(to left, ${r.from}, ${r.to})`,
        ...style,
      }}
    >
      <p className="text-right text-sm leading-[21px] tracking-[-0.14px] text-[#525252]">
        {r.n}
      </p>

      <h3 className="mt-3 text-[28px] font-normal leading-[1.15] tracking-[-0.8px] text-[#121214] sm:text-[42px] sm:leading-[48px] sm:tracking-[-1.2px]">
        {r.title}
      </h3>

      <p className="mt-auto text-base leading-6 tracking-[-0.32px] text-[#525252]">
        {r.body}
      </p>
    </article>
  );

  // Reduced motion: the three cards, no pin.
  if (still) {
    return (
      <div className="mx-auto flex max-w-[720px] flex-col items-center gap-6 px-6 py-12 sm:gap-8 sm:py-16">
        {reasons.map((r) => (
          <Card key={r.n} r={r} />
        ))}
      </div>
    );
  }

  const blobIn = progress >= BLOB_IN;
  const emerged = Math.min(
    reasons.length,
    Math.max(0, Math.floor((progress - FIRST_CARD) / PER_CARD) + 1),
  );

  return (
    <div ref={wrapRef} className="relative h-[220vh] sm:h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative flex h-full -translate-y-[7vh] items-center px-5 sm:px-0">
        {/* the giant headline, always running */}
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

        {/* the gradient container — it clips, so cards rise out of it */}
        <div
          className="card-stack relative mx-auto h-[520px] w-full max-w-[720px] overflow-hidden rounded-[48px] sm:h-[560px] sm:rounded-[80px]"
          style={{
            transition:
              "transform 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease-out",
            transform: `translateY(${blobIn ? 0 : 70}px)`,
            opacity: blobIn ? 1 : 0,
          }}
        >
          {/* transparent until 60%, then down to solid brand red */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[80px]"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(231,0,11,0) 59.91%, #e7000b 100%)",
            }}
          />
          {/* the glassy highlight rising off the bottom edge */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[80px] shadow-[inset_0px_-0.784px_0.784px_-0.607px_rgba(255,255,255,0.42),inset_0px_-1.92px_1.92px_-1.214px_rgba(255,255,255,0.41),inset_0px_-3.637px_3.637px_-1.821px_rgba(255,255,255,0.39),inset_0px_-6.35px_6.35px_-2.429px_rgba(255,255,255,0.37),inset_0px_-11.052px_11.052px_-3.036px_rgba(255,255,255,0.33),inset_0px_-20.243px_20.243px_-3.643px_rgba(255,255,255,0.25),inset_0px_-40px_40px_-4.25px_rgba(255,255,255,0.08)]"
          />

          {reasons.map((r, i) => {
            const out = i < emerged;
            const back = emerged - 1 - i; // how far up the pile this card sits
            return (
              <div
                key={r.n}
                aria-hidden={!out}
                // no translate utilities here: Tailwind v4 emits the standalone
                // `translate` property, which would compose with this transform
                className="absolute left-1/2 top-1/2 flex w-[calc(100%-2.5rem)] max-w-[468px] justify-center sm:w-[468px]"
                style={{
                  transition:
                    "transform 850ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms ease-out",
                  transform: out
                    ? `translate(-50%, calc(-50% - ${back} * var(--stack-step))) rotate(${r.tilt}deg)`
                    : `translate(-50%, calc(-50% + 300px)) rotate(${r.tilt}deg)`,
                  opacity: out ? 1 : 0,
                  zIndex: i + 1,
                }}
              >
                <Card r={r} />
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
}
