import Countdown from "./Countdown";
import RegistrationForm from "./RegistrationForm";
import SessionChips from "./SessionChips";
import Reveal from "./Reveal";

/* Figma: Webinar 35:12518 */

// Change this to the real session start (IST = UTC+5:30).
const SESSION_START = "2026-10-17T16:00:00+05:30";

export default function FinalCta() {
  return (
    <section
      id="final"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[#1b1b1f] px-6 py-12 sm:py-14"
    >
      {/* backdrop: a diagonal red sweep off the top-right, on near-black */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(212deg," +
              " rgba(190,64,70,0.55) 0%," +
              " rgba(150,44,52,0.42) 14%," +
              " rgba(110,34,44,0.26) 28%," +
              " rgba(27,26,31,0) 52%)",
          }}
        />
        {/* a softer second pass, so the edge of the beam isn't a hard line */}
        <div
          className="absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full blur-[120px]"
          style={{ backgroundColor: "rgba(190,64,70,0.28)" }}
        />
        {/* the faint warmth the base picks up along the bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            backgroundImage:
              "radial-gradient(70% 100% at 25% 100%, rgba(120,40,42,0.3) 0%, rgba(27,26,31,0) 70%)",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-[1152px] items-center gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
        {/* the last word */}
        <Reveal from="top">
          <span className="inline-flex items-center rounded-full border border-brand/35 bg-brand/10 px-4 py-2 text-sm font-bold text-white">
            YOUR MOVE
          </span>

          <h2 className="mt-5 font-display text-[32px] font-medium leading-[1.1] tracking-[-1px] text-white sm:text-[40px]">
            Your Year 1 starts <span className="text-brand">now.</span>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-[26px] text-white/60">
            Don&apos;t wait for 3rd year to get serious. Spend 2 hours and leave
            with a plan.
          </p>

          <SessionChips className="mt-7" />

          <div className="mt-8">
            <Countdown target={SESSION_START} tone="contrast" label={false} />
          </div>
        </Reveal>

        {/* the form, one last time */}
        <Reveal from="top" delay={120}>
          <RegistrationForm cta="Register now" meta={false} compact />
        </Reveal>
      </div>
    </section>
  );
}
