"use client";

import { useEffect, useRef, useState } from "react";

import { BRANCHES, DREAMS, PHASES, YEARS } from "./dreamOptions";

function Caret({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden
      className={`size-[0.4em] shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <rect x="5" y="11" width="14" height="10" rx="2.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function HandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5 inline size-[18px] -translate-y-px text-brand" aria-hidden>
      <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10m0-1.5a1.5 1.5 0 0 1 3 0V11m0-1a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1-6 6h-.6a6 6 0 0 1-4.6-2.2L4.4 15.3a1.6 1.6 0 0 1 2.4-2.1L9 15" />
    </svg>
  );
}

/** one red, dashed-underlined word in the sentence that opens a list of picks */
function Slot({
  label,
  value,
  options,
  onPick,
  wide = false,
  trail,
}: {
  label: string;
  value: string;
  options: string[];
  onPick: (v: string) => void;
  wide?: boolean;
  /** punctuation that must never wrap away from the pick */
  trail?: string;
}) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <span ref={box} className="relative inline">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex max-w-full items-center gap-[0.28em] rounded-[0.32em] border px-[0.3em] py-0 align-baseline text-brand transition ${
          open
            ? "border-brand bg-brand/10 shadow-[0_6px_18px_-8px_rgba(231,0,11,0.5)]"
            : "border-brand/30 bg-brand/[0.07] hover:border-brand/60 hover:bg-brand/10"
        }`}
      >
        <span className="truncate">{value}</span>
        <Caret open={open} />
      </button>
      {trail}

      {open && (
        <span
          role="listbox"
          aria-label={label}
          className={`absolute left-1/2 top-[calc(100%+12px)] z-50 block -translate-x-1/2 rounded-[18px] border border-ink/10 bg-white p-2 text-left font-geist tracking-normal shadow-[0_24px_60px_-20px_rgba(18,18,24,0.35)] ${
            wide ? "w-[min(340px,calc(100vw-32px))]" : "w-[min(260px,calc(100vw-32px))]"
          }`}
        >
          <span className="block px-3 pb-1.5 pt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-ink/40">
            {label}
          </span>
          {options.map((o) => {
            const on = o === value;
            return (
              <button
                key={o}
                type="button"
                role="option"
                aria-selected={on}
                onClick={() => {
                  onPick(o);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-base leading-snug transition hover:bg-brand/10 ${
                  on ? "font-bold text-brand" : "font-medium text-ink"
                }`}
              >
                {o}
                {on && <span aria-hidden>✓</span>}
              </button>
            );
          })}
        </span>
      )}
    </span>
  );
}

/** one stop on the path: a node sitting on the rail, its copy hanging below */
function Step({
  n,
  phase,
  title,
  body,
}: {
  n: number;
  phase: string;
  title: string;
  body: string;
}) {
  return (
    <div className="relative pl-11 lg:pl-0">
      <span className="absolute left-0 top-0 grid size-7 place-items-center rounded-full bg-brand text-[12px] font-bold text-white ring-4 ring-white lg:relative lg:mb-3">
        {n}
      </span>

      <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
        {phase}
      </span>
      <h4 className="mt-1 font-display text-[15px] font-bold leading-[1.3] tracking-[-0.01em] text-ink">
        {title}
      </h4>
      <p className="mt-1 text-[13px] leading-[1.45] text-ink/50">{body}</p>
    </div>
  );
}

/** a stop the session unlocks: on the same path, deliberately unlit */
function LockedStep({ n, phase }: { n: number; phase: string }) {
  return (
    <div className="relative pl-11 lg:pl-0">
      <span className="absolute left-0 top-0 grid size-7 place-items-center rounded-full border border-dashed border-ink/25 bg-white text-[12px] font-bold text-ink/35 ring-4 ring-white lg:relative lg:mb-3">
        {n}
      </span>

      <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/30">
        {phase}
      </span>
      <span className="mt-1 flex items-center gap-1.5 text-ink/35">
        <LockIcon />
        <span className="font-display text-[15px] font-bold leading-[1.3] tracking-[-0.01em]">
          Unlocked live
        </span>
      </span>
      <span aria-hidden className="mt-2.5 block h-1.5 w-full rounded-full bg-ink/[0.06]" />
      <span aria-hidden className="mt-1.5 block h-1.5 w-3/5 rounded-full bg-ink/[0.06]" />
    </div>
  );
}

export default function DreamPicker() {
  const [year, setYear] = useState(YEARS[0]);
  const [branch, setBranch] = useState(BRANCHES[0]);
  const [dream, setDream] = useState(DREAMS[0]);

  return (
    <>
      <p className="text-base text-ink/55">
        <HandIcon />
        Tap the red words to make this sentence yours.
      </p>

      {/* the sentence the visitor builds */}
      <p className="mx-auto mt-4 max-w-[24ch] font-display text-[22px] font-semibold leading-[1.32] tracking-[-0.025em] text-ink sm:max-w-none sm:text-[26px] lg:whitespace-nowrap">
        I&apos;m in{" "}
        <Slot label="Your year" value={year} options={YEARS} onPick={setYear} />{" "}
        of{" "}
        <Slot label="Your branch" value={branch} options={BRANCHES} onPick={setBranch} />
        <span className="ml-[0.1em]">, and I want to</span>{" "}
        <Slot
          label="Your dream"
          value={dream.v}
          options={DREAMS.map((d) => d.v)}
          onPick={(v) => setDream(DREAMS.find((d) => d.v === v) ?? DREAMS[0])}
          wide
        />
      </p>

      {/* the roadmap that pick earns */}
      <div
        aria-live="polite"
        className="mx-auto mt-9 w-full max-w-[1000px] overflow-hidden rounded-[24px] border border-ink/[0.08] bg-white text-left shadow-[0_40px_90px_-60px_rgba(18,18,24,0.5)]"
      >
        {/* header */}
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-ink/[0.07] px-6 py-5 sm:px-8 sm:py-6">
          <div className="min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
              Your roadmap
            </span>
            <h3 className="mt-1 font-display text-[19px] font-bold leading-[1.2] tracking-[-0.02em] text-ink sm:text-[24px]">
              From {year} of {branch} to{" "}
              <em className="not-italic text-brand">{dream.to}</em>
            </h3>
          </div>

          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/10 bg-ink/[0.03] px-3.5 py-1.5 text-[12px] font-semibold text-ink/55">
            <span className="size-1.5 rounded-full bg-brand" />
            5 steps · 2 unlocked
          </span>
        </div>

        {/* the path */}
        <div className="relative px-6 py-6 sm:px-8">
          {/* the rail: lit as far as you have got, faint from there on */}
          <span
            aria-hidden
            className="absolute left-[37px] top-[38px] w-px bg-[linear-gradient(180deg,#e7000b_0_30%,rgba(18,18,24,0.14)_30%_100%)] lg:left-[46px] lg:right-[46px] lg:top-[38px] lg:h-px lg:w-auto lg:bg-[linear-gradient(90deg,#e7000b_0_30%,rgba(18,18,24,0.14)_30%_100%)]"
            style={{ bottom: "1.75rem" }}
          />

          <div className="relative grid gap-y-6 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-5 lg:gap-x-6">
            {dream.steps.slice(0, 2).map(([title, body], i) => (
              <Step key={title} n={i + 1} phase={PHASES[i]} title={title} body={body} />
            ))}
            {dream.steps.slice(2).map(([title], i) => (
              <LockedStep key={title} n={i + 3} phase={PHASES[i + 2]} />
            ))}
          </div>
        </div>

        {/* what the session adds */}
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-ink/[0.07] bg-ink/[0.015] px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
              <LockIcon />
            </span>
            <div className="min-w-0">
              <strong className="block font-display text-[16px] font-bold tracking-[-0.01em] text-ink">
                3 more steps, unlocked live
              </strong>
              <span className="text-[13px] leading-snug text-ink/50">
                Vishwa maps the complete path, step by step, in the session.
              </span>
            </div>
          </div>

          <a
            href="#register"
            className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full bg-brand px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-brand-dark"
          >
            Get my full roadmap <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </>
  );
}
