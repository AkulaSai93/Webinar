"use client";

import { useState } from "react";

/* Figma: Webinar 28:10548 */

type Errors = { fullName?: string; phone?: string; email?: string };

const inputClass =
  "h-[50px] w-full rounded-xl border border-ink/12 bg-[#fafafa] px-4 text-sm text-ink placeholder:text-ink/30 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/15";

const labelClass =
  "mb-2 block text-xs font-bold leading-4 tracking-[0.96px] text-ink/70";

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3" aria-hidden>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export default function RegistrationForm() {
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

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-8">
      <h2 className="text-2xl font-bold leading-8 tracking-[-0.6px] text-ink">
        Save your seat
      </h2>
      <p className="mt-1 text-sm leading-5 text-ink/50">
        Join link &amp; reminders come on WhatsApp and email.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-4 border-y border-ink/8 py-3 text-xs font-semibold leading-4 tracking-[0.3px] text-ink/70">
        <span>17 OCT</span>
        <span className="size-1 rounded-full bg-brand" />
        <span>4:00 PM IST</span>
        <span className="size-1 rounded-full bg-brand" />
        <span>ONLINE · ZOOM</span>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-6">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            FULL NAME
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Arjun Sharma"
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

        <div className="pt-5">
          <label htmlFor="phone" className={labelClass}>
            WHATSAPP NUMBER
          </label>
          <div className="flex gap-2">
            <span className="inline-flex h-[50px] shrink-0 items-center rounded-xl border border-ink/12 bg-[#f2f2f2] px-3.5 text-sm font-semibold text-ink/70">
              +91
            </span>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              autoComplete="tel"
              placeholder="10-digit number"
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

        <div className="pt-5">
          <label htmlFor="email" className={labelClass}>
            EMAIL
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
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
          className="group mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-ink px-6 py-4 text-sm font-semibold leading-5 text-white transition hover:bg-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Reserving your seat…" : "Reserve my free seat"}
          <span className="flex size-6 items-center justify-center rounded-full bg-white text-ink transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight />
          </span>
        </button>

        <p className="mt-5 text-center text-xs leading-4 text-ink/40">
          100% free · Limited seats · No spam
        </p>
      </form>
    </div>
  );
}
