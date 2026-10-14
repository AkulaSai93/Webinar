"use client";

import { useState } from "react";

import Countdown from "./Countdown";

/* Figma: Webinar 28:10548, 61:25678 */

// Change this to the real session start (IST = UTC+5:30).
const SESSION_START = "2026-10-17T16:00:00+05:30";

type Errors = { fullName?: string; phone?: string; email?: string };

const inputBase =
  "w-full rounded-xl border border-ink/12 bg-[#fafafa] px-4 text-sm text-ink placeholder:text-ink/30 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/15";

const labelClass = "sr-only";

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3" aria-hidden>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export default function RegistrationForm({
  cta = "Register now",
  /** the hero card carries the session details; the closing card does not */
  meta = true,
  /** a tighter card, for sections that need less height */
  compact = false,
}: {
  cta?: string;
  meta?: boolean;
  compact?: boolean;
} = {}) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (fullName.trim().length < 3) next.fullName = "Please enter your full name.";
    if (phone.length !== 10) next.phone = "Enter a valid 10-digit number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      next.email = "Enter a valid email address.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    // TODO: POST { fullName, phone, email } to your registration endpoint / CRM.
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-8 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand/10 text-xl text-brand">
          ✓
        </div>
        <h2 className="mt-4 text-2xl font-bold tracking-[-0.6px] text-ink">
          Your seat is saved
        </h2>
        <p className="mt-2 text-sm text-ink/50">
          See you on 17 Oct at 4:00 PM IST, {fullName.split(" ")[0]}. The join
          link and reminders are on their way to your WhatsApp and email.
        </p>
      </div>
    );
  }

  const inputClass = `${inputBase} ${compact ? "h-11" : "h-12"}`;
  const fieldGap = compact ? "pt-3" : "pt-3";

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-ink/10 bg-white p-6"
    >
      {/* the corner flag */}
      <span className="absolute right-0 top-0 rounded-bl-2xl rounded-tr-2xl bg-brand px-4 py-2.5 text-[13px] font-medium text-white sm:px-5 sm:py-3 sm:text-sm">
        Limited Seats Only
      </span>

      <h2
        className={`pr-32 font-bold tracking-[-0.6px] text-ink sm:pr-40 ${
          compact ? "text-xl leading-7" : "text-2xl leading-8"
        }`}
      >
        Save your seat
      </h2>

      <form onSubmit={handleSubmit} noValidate className="mt-4">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={inputClass}
          />
          {errors.fullName && (
            <p id="fullName-error" className="mt-1.5 text-xs font-medium text-brand">
              {errors.fullName}
            </p>
          )}
        </div>

        <div className={fieldGap}>
          <label htmlFor="phone" className={labelClass}>
            WhatsApp number
          </label>
          <div className="flex gap-2">
            <span className={`inline-flex shrink-0 items-center rounded-xl border border-ink/12 bg-[#f2f2f2] px-3.5 text-sm font-semibold text-ink/70 ${compact ? "h-11" : "h-12"}`}>
              +91
            </span>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              autoComplete="tel"
              placeholder="WhatsApp number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={inputClass}
            />
          </div>
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 text-xs font-medium text-brand">
              {errors.phone}
            </p>
          )}
        </div>

        <div className={fieldGap}>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs font-medium text-brand">
              {errors.email}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`group flex w-full items-center justify-center gap-3 rounded-xl bg-ink px-6 ${compact ? "mt-4 py-3.5" : "mt-4 py-3.5"} text-sm font-semibold leading-5 text-white transition hover:bg-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60`}
        >
          {submitting ? "Reserving your seat…" : cta}
          <span className="flex size-6 items-center justify-center rounded-full bg-white text-ink transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight />
          </span>
        </button>

        {/* the clock lives under the button now */}
        {meta && (
          <div className="mt-4 border-t border-ink/8 pt-4">
            <p className="mb-2.5 text-center text-[10px] font-bold tracking-[0.18em] text-ink/45">
              REGISTRATION CLOSES IN
            </p>
            <Countdown target={SESSION_START} tone="light" size="sm" align="center" label={false} />
          </div>
        )}

      </form>
    </div>
  );
}
