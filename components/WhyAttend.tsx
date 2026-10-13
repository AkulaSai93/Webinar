import Reveal from "./Reveal";
import WhyAttendStack, { type Reason } from "./WhyAttendStack";

/* Figma: Webinar / Why attend 23:8728 */

const REASONS: Reason[] = [
  {
    n: "01",
    title: "A clear 2-year roadmap",
    body: "Know exactly what to do in Year 1, and what to do in Year 2.",
    from: "#f6e7e8",
    to: "#fcfbfb",
    tilt: -4,
  },
  {
    n: "02",
    title: "The right skills, in the right order",
    body: "No more random tutorials. Focus only on what companies test.",
    from: "#e6f2ed",
    to: "#f6fbf8",
    tilt: 3,
  },
  {
    n: "03",
    title: "Straight from the industry",
    body: "From someone who has cracked top tech companies himself.",
    from: "#cad9f7",
    to: "#f0f7fe",
    tilt: -5,
  },
];

export default function WhyAttend() {
  return (
    <section id="why" className="scroll-mt-24 bg-[#f3f4f6] pt-10">
      <WhyAttendStack
        marquee="STOP GUESSING. START WITH A PLAN."
        reasons={REASONS}
        badge={
          <span className="inline-flex h-[38px] items-center rounded-full border border-brand/25 bg-brand/8 px-4 text-sm text-ink/75">
            Why attend
          </span>
        }
      />

      <div className="mx-auto -mt-[14vh] max-w-[1152px] px-6 pb-20">
        <Reveal from="top">
          <div className="flex flex-col items-center justify-center gap-7 text-center sm:flex-row">
            <p className="text-lg leading-7 text-ink/60">
              Two hours now can save you two years of guessing.
            </p>

            <a
              href="#register"
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-brand px-7 py-4 text-base font-bold leading-6 text-white transition hover:bg-brand-dark"
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
