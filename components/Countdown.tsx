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

export default function Countdown({ target }: { target: string }) {
  const targetMs = new Date(target).getTime();
  const [time, setTime] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setTime(diff(targetMs));
    const id = setInterval(() => setTime(diff(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  return (
    <div className="flex items-center gap-2">
      {UNITS.map(({ key, label }, i) => (
        <div key={key} className="flex items-center gap-2">
          <div className="text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-ink text-lg font-bold tabular-nums text-white sm:h-13 sm:w-13">
              {time ? String(time[key]).padStart(2, "0") : "--"}
            </div>
            <p className="mt-1.5 text-[10px] font-semibold tracking-[0.18em] text-ink/40">
              {label}
            </p>
          </div>
          {i < UNITS.length - 1 && (
            <span className="-mt-5 text-lg font-light text-ink/20">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
