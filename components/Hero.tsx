import Image from "next/image";

import Countdown from "./Countdown";
import RegistrationForm from "./RegistrationForm";

// Change this to the real session start (IST = UTC+5:30).
const SESSION_START = "2026-10-17T16:00:00+05:30";

/* Figma: Webinar 28:10509 */

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* backdrop */}
      <Image
        src="/hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/[0.62]" />

      <div className="mx-auto flex min-h-[745px] max-w-[1152px] flex-col items-center justify-center gap-12 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        {/* left — the pitch */}
        <div className="w-full lg:max-w-[533px]">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2 text-[11px] font-bold leading-[16.5px] tracking-[1.98px] text-white/75">
            <span className="size-1.5 rounded-full bg-brand" />
            FREE LIVE ONLINE WEBINAR
          </span>

          <h1 className="mt-7 font-display text-[40px] font-bold leading-[1.08] tracking-[-1.4px] text-white sm:text-[56px] sm:leading-[60.48px]">
            Become <span className="text-brand">AI-ready</span> in your first 2
            years of engineering.
          </h1>

          <p className="mt-6 max-w-[576px] text-base leading-[29.25px] text-white sm:text-[18px]">
            A 2-hour session that hands you a clear, step-by-step plan for what
            to learn, build and skip in Year 1 and Year 2 — to make you ready
            for{" "}
            <strong className="font-extrabold">top tech and AI companies</strong>
            .
          </p>

          <div className="mt-9">
            <Countdown target={SESSION_START} />
          </div>
        </div>

        {/* right — the form */}
        <div id="register" className="w-full scroll-mt-24 lg:w-[491px]">
          <RegistrationForm />
        </div>
      </div>
    </section>
  );
}
