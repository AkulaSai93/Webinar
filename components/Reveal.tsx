"use client";

import { useEffect, useRef, useState } from "react";

const HIDDEN: Record<string, string> = {
  top: "-translate-y-12 opacity-0",
  bottom: "translate-y-10 opacity-0",
  left: "-translate-x-10 opacity-0",
  right: "translate-x-10 opacity-0",
};

export default function Reveal({
  children,
  delay = 0,
  from = "bottom",
  /** How far up the viewport an element must travel before it reveals.
   *  0.35 = reveals once its top passes 65% of the screen height. */
  trigger = 0.2,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  from?: "top" | "bottom" | "left" | "right";
  trigger?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const reveal = () => {
      setShown(true);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && reveal(),
      { threshold: 0, rootMargin: `0px 0px -${Math.round(trigger * 100)}% 0px` },
    );

    // The trigger line sits above the bottom of the screen, so an element near
    // the end of the page can never cross it. Reveal those once we bottom out.
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom && el.getBoundingClientRect().top < window.innerHeight) {
        reveal();
      }
    };

    observer.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [trigger]);

  return (
    <div
      ref={ref}
      style={{
        // the shorthand carries the delay — a separate transitionDelay would be
        // reset by it
        transition: `transform 760ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms, opacity 320ms ease-out ${delay}ms`,
      }}
      className={`${
        shown ? "translate-x-0 translate-y-0 opacity-100" : HIDDEN[from]
      } ${className}`}
    >
      {children}
    </div>
  );
}
