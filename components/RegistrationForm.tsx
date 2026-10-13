"use client";

import { useState } from "react";

type Errors = { fullName?: string; phone?: string };

const inputClass =
  "w-full rounded-xl border border-ink/12 bg-[#FAFAFA] px-4 py-3.5 text-sm text-ink placeholder:text-ink/30 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/15";

export default function RegistrationForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (fullName.trim().length < 3) next.fullName = "Please enter your full name.";
    if (phone.length !== 10) next.phone = "Enter a valid 10-digit number.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    // TODO: POST { fullName, phone } to your registration endpoint / CRM.
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-8 text-center shadow-[0_18px_50px_-18px_rgba(10,7,8,0.25)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-xl text-brand">
          ✓
        </div>
        <h3 className="mt-4 text-xl font-bold text-ink">Your seat is saved</h3>
        <p className="mt-2 text-sm text-ink/55">
          See you on 17 Oct at 4:00 PM IST, {fullName.split(" ")[0]}. The join
          link and reminders are on their way to your WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-[0_18px_50px_-18px_rgba(10,7,8,0.25)] sm:p-8">
      <h2 className="text-2xl font-bold tracking-tight text-ink">
        Save your seat
      </h2>
      <p className="mt-1 text-sm text-ink/50">
        Join link &amp; reminders come on WhatsApp.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-ink/8 py-3 text-xs font-semibold tracking-wide text-ink/70">
        <span>17 OCT</span>
        <span className="h-1 w-1 rounded-full bg-brand" />
        <span>4:00 PM IST</span>
        <span className="h-1 w-1 rounded-full bg-brand" />
        <span>ONLINE · ZOOM</span>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        <div>
          <label htmlFor="fullName" className="mb-2 block text-xs font-bold tracking-[0.08em] text-ink/70">
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

        <div>
          <label htmlFor="phone" className="mb-2 block text-xs font-bold tracking-[0.08em] text-ink/70">
            WHATSAPP NUMBER
          </label>
          <div className="flex gap-2">
            <span className="inline-flex shrink-0 items-center rounded-xl border border-ink/12 bg-[#F2F2F2] px-3.5 text-sm font-semibold text-ink/70">
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

        <button
          type="submit"
          disabled={submitting}
          className="group flex w-full items-center justify-center gap-3 rounded-xl bg-ink px-6 py-4 text-sm font-semibold text-white transition hover:bg-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Reserving your seat…" : "Reserve my free seat"}
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs text-ink transition group-hover:translate-x-0.5">
            ↗
          </span>
        </button>

        <p className="text-center text-xs text-ink/40">
          100% free · Limited seats · No spam
        </p>
      </form>
    </div>
  );
}
