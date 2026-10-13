"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Slides its content up from below as it enters the viewport, so the panel
 * reads as rising over the section above it.
 *
 * The outer element stays untransformed and is what we measure — measuring
 * the moving element itself feeds its own transform back into the next
 * reading, which makes the travel lurch.
 */
export default function RiseIn({
  children,
  className = "",
  /** how far down it starts, in px */
  distance = 320,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(distance);

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOffset(0);
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const { top } = anchor.getBoundingClientRect();
      const vh = window.innerHeight;

      // 1 while the panel is still a full screen below, 0 once it has
      // travelled up to a quarter of the way into the viewport.
      const start = vh * 1.05;
      const end = vh * 0.25;
      const t = Math.min(1, Math.max(0, (top - end) / (start - end)));

      // smoothstep: eases in and out, so there is no sudden rush at either end
      setOffset(t * t * (3 - 2 * t) * distance);
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
  }, [distance]);

  return (
    <div ref={anchorRef} className={className}>
      <div style={{ transform: `translate3d(0, ${offset}px, 0)` }}>
        {children}
      </div>
    </div>
  );
}
