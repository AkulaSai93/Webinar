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
  size = "md",
  align = "left",
}: {
  target: string;
  /** "dark" sits on the hero photo, "light" on the page background,
   *  "contrast" on a dark section */
  tone?: "dark" | "light" | "contrast";
  label?: boolean;
  /** "sm" is the quiet version that sits inside the form card */
  size?: "sm" | "md" | "inline";
  align?: "left" | "center";
}) {
  const targetMs = new Date(target).getTime();
  const [time, setTime] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setTime(diff(targetMs));
    const id = setInterval(() => setTime(diff(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const live = Boolean(time && targetMs - Date.now() > 0);

  const inline = size === "inline";
  const sm = size === "sm";
  const mid = align === "center";
  const onDark = tone === "dark";
  const onInk = tone !== "light"; // light text alongside the tiles

  if (inline) {
    return (
      <p
        className={`flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs ${
          mid ? "justify-center" : ""
        } ${onInk ? "text-white/60" : "text-ink/50"}`}
      >
        <span className="font-bold tracking-[0.14em]">
          {live ? "STARTS IN" : "LIVE NOW"}
        </span>
        {live && (
          <span
            className={`font-bold tabular-nums ${
              onInk ? "text-white" : "text-brand"
            }`}
          >
            {UNITS.map(({ key, label }) => (
              <span key={key} className="ml-2.5 first:ml-0 text-[17px] leading-none">
                {time ? String(time[key]).padStart(2, "0") : "--"}
                <span className="ml-0.5 text-[11px] font-semibold opacity-60">
                  {label.charAt(0).toLowerCase()}
                </span>
              </span>
            ))}
          </span>
        )}
      </p>
    );
  }

  return (
    <div className={mid ? "text-center" : undefined}>
      {label && (
        <p
          className={`text-[10px] font-bold tracking-[0.18em] ${
            sm ? "mb-2.5" : "mb-3"
          } ${onInk ? "text-white/55" : "text-ink/45"}`}
        >
          {live ? "FIRST SESSION STARTS IN" : "THE SESSION IS LIVE"}
        </p>
      )}

      <div
        className={`flex items-center ${sm ? "gap-2" : "gap-2.5"} ${
          mid ? "justify-center" : ""
        }`}
      >
        {UNITS.map(({ key, label }, i) => (
          <div key={key} className={`flex items-center ${sm ? "gap-2" : "gap-2.5"}`}>
            <div className="text-center">
              <div
                className={`flex items-center justify-center font-bold tabular-nums text-white ${
                  sm ? "h-10 w-10 rounded-lg text-[15px]" : "h-14 w-14 rounded-xl text-xl"
                } ${
                  onDark
                    ? "border border-white/15 bg-white/10 backdrop-blur-sm"
                    : "bg-ink"
                }`}
              >
                {time ? String(time[key]).padStart(2, "0") : "--"}
              </div>
              <p
                className={`text-[9px] font-semibold tracking-[0.15em] ${
                  sm ? "mt-1" : "mt-1.5"
                } ${
                  onInk ? "text-white/45" : "text-ink/40"
                }`}
              >
                {label}
              </p>
            </div>
            {i < UNITS.length - 1 && (
              <span
                className={`text-lg font-light ${sm ? "-mt-4" : "-mt-5"} ${
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
