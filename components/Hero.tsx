import Countdown from "./Countdown";
import RegistrationForm from "./RegistrationForm";

// Change this to the real session start (IST = UTC+5:30).
const SESSION_START = "2026-10-17T16:00:00+05:30";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0a0708 1px, transparent 1px), linear-gradient(to bottom, #0a0708 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            opacity: 0.045,
          }}
        />
        <div className="absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-brand/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-10">
        {/* LEFT — content */}
        <div>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-ink/15 px-4 py-2 text-[11px] font-bold tracking-[0.18em] text-ink/75">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
            </span>
            FREE LIVE ONLINE WEBINAR
          </span>

          <h1 className="mt-7 text-[2.5rem] font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
            Become <span className="text-brand">AI-ready</span> in your first 2
            years of engineering.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">
            A 2-hour session that hands you a clear, step-by-step plan for what
            to learn, build and skip in Year 1 and Year 2 — to make you ready
            for{" "}
            <span className="font-semibold text-ink">
              top tech and AI companies
            </span>
            .
          </p>

          {/* roadmap strip */}
          <div className="mt-10 flex items-center gap-3 text-[11px] font-bold tracking-[0.2em] text-ink/35 sm:gap-4">
            <span>YEAR 1</span>
            <span className="h-px w-6 bg-ink/15 sm:w-10" />
            <span className="inline-flex items-center gap-2.5 rounded-full border border-brand/30 bg-brand/5 px-3.5 py-1.5 font-mono text-xs font-medium tracking-normal text-ink">
              <span className="h-2 w-2 rounded-full bg-brand" />
              DSA + AI apps
            </span>
            <span className="h-px w-6 bg-ink/15 sm:w-10" />
            <span>YEAR 2</span>
          </div>

          <div className="mt-10 border-t border-ink/10 pt-7">
            <p className="mb-3 text-[11px] font-bold tracking-[0.2em] text-ink/40">
              FIRST SESSION STARTS IN
            </p>
            <Countdown target={SESSION_START} />
          </div>
        </div>

        {/* RIGHT — form */}
        <div id="register" className="scroll-mt-24 lg:pl-4">
          <RegistrationForm />
        </div>
      </div>
    </section>
  );
}
