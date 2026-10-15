import Image from "next/image";

import RegistrationForm from "./RegistrationForm";
import SessionChips from "./SessionChips";

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

      <div className="mx-auto flex min-h-[560px] sm:min-h-[745px] max-w-[1152px] flex-col items-center justify-center gap-8 px-6 py-10 sm:gap-12 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        {/* left — the pitch */}
        <div className="w-full lg:max-w-[620px]">
          <span className="inline-flex items-center gap-2.5 rounded-[8px] border border-white/15 px-4 py-2 text-[11px] font-bold leading-[16.5px] tracking-[1.98px] text-white/75">
            <span className="size-1.5 rounded-full bg-brand" />
            FREE LIVE ONLINE WEBINAR
          </span>

          <h1 className="mt-5 font-display text-[30px] font-bold leading-[1.1] tracking-[-1px] text-white sm:mt-7 sm:text-[56px] sm:leading-[60.48px] sm:tracking-[-1.4px]">
            The Only <span className="text-brand">Tech Career</span>
            <br />
            <span className="text-brand">Road Map</span> You need
          </h1>

          <p className="mt-4 max-w-[576px] text-[15px] leading-[26px] text-white sm:mt-6 sm:text-[18px] sm:leading-[29.25px]">
            A 2-hour session that hands you a clear, step-by-step plan for what
            to learn, build and skip in Year 1 and Year 2 — to make you ready
            for{" "}
            <strong className="font-extrabold">top tech and AI companies</strong>
            .
          </p>

          {/* when and where */}
          <SessionChips className="mt-6 sm:mt-9" />

        </div>

        {/* right — the form */}
        <div id="register" className="w-full scroll-mt-24 lg:w-[491px]">
          <RegistrationForm />
        </div>
      </div>
    </section>
  );
}
