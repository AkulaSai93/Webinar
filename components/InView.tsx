"use client";

import { useEffect, useRef, useState } from "react";

/** Adds a class once the element scrolls into view, so CSS can run an
 *  entrance animation. Fires once. */
export default function InView({
  children,
  className = "",
  style,
  activeClass,
  threshold = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  activeClass: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLive(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`${className} ${live ? activeClass : ""}`} style={style}>
      {children}
    </div>
  );
}
