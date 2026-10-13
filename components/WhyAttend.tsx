import Reveal from "./Reveal";
import WhyAttendStack, { type Reason } from "./WhyAttendStack";

const REASONS: Reason[] = [
  {
    n: "01",
    title: "A clear 2-year roadmap",
    body: "Know exactly what to do in Year 1, and what to do in Year 2.",
  },
  {
    n: "02",
    title: "The right skills, in the right order",
    body: "No more random tutorials. Focus only on what companies test.",
  },
  {
    n: "03",
    title: "Straight from the industry",
    body: "From someone who has cracked top tech companies himself.",
  },
];

export default function WhyAttend() {
  return (
    <section id="why" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-[1152px] px-6 pt-20">
        <Reveal from="top">
          <span className="inline-flex items-center rounded-full border border-brand/25 bg-brand/8 px-4 py-2 text-sm text-ink/75">
            Why attend
          </span>
        </Reveal>
      </div>

      <WhyAttendStack
        marquee="STOP GUESSING. START WITH A PLAN."
        reasons={REASONS}
      />

      <div className="mx-auto max-w-[1152px] px-6 pb-20">
        <Reveal from="top">
          <div className="flex flex-col items-center justify-center gap-5 text-center sm:flex-row sm:gap-7">
            <p className="text-base text-ink/60 sm:text-lg">
              Two hours now can save you two years of guessing.
            </p>

            <a
              href="#register"
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-brand px-7 py-4 text-base font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark"
            >
              Get my plan. Register now
              <span className="transition group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
