"use client";

import { useEffect, useState } from "react";

const UNITS = [
  { key: "days", label: "DAYS" },
  { key: "hrs", label: "HRS" },
  { key: "min", label: "MIN" },
  { key: "sec", label: "SEC" },
] as const;

function diff(target: number) {
  const s = Math.max(0, Math.floor((target - Date.now()) / 1000));
  return {
    days: Math.floor(s / 86400),
    hrs: Math.floor((s % 86400) / 3600),
    min: Math.floor((s % 3600) / 60),
    sec: s % 60,
  };
}

export default function Countdown({
  target,
  tone = "dark",
  label = true,
}: {
  target: string;
  /** "dark" sits on the hero photo, "light" on the page background,
   *  "contrast" on a dark section */
  tone?: "dark" | "light" | "contrast";
  label?: boolean;
}) {
  const targetMs = new Date(target).getTime();
  const [time, setTime] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setTime(diff(targetMs));
    const id = setInterval(() => setTime(diff(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const live = Boolean(time && targetMs - Date.now() > 0);

  const onDark = tone === "dark";
  const onInk = tone !== "light"; // light text alongside the tiles

  return (
    <div>
      {label && (
        <p
          className={`mb-3 text-[11px] font-bold tracking-[1.98px] ${
            onInk ? "text-white/55" : "text-ink/45"
          }`}
        >
          {live ? "FIRST SESSION STARTS IN" : "THE SESSION IS LIVE"}
        </p>
      )}

      <div className="flex items-center gap-2.5">
        {UNITS.map(({ key, label }, i) => (
          <div key={key} className="flex items-center gap-2.5">
            <div className="text-center">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl text-xl font-bold tabular-nums text-white ${
                  onDark
                    ? "border border-white/15 bg-white/10 backdrop-blur-sm"
                    : "bg-ink"
                }`}
              >
                {time ? String(time[key]).padStart(2, "0") : "--"}
              </div>
              <p
                className={`mt-1.5 text-[10px] font-semibold tracking-[0.15em] ${
                  onInk ? "text-white/45" : "text-ink/40"
                }`}
              >
                {label}
              </p>
            </div>
            {i < UNITS.length - 1 && (
              <span
                className={`-mt-5 text-lg font-light ${
                  onInk ? "text-white/25" : "text-ink/25"
                }`}
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
