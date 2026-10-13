import Reveal from "./Reveal";

/* Figma: Webinar / Hero 21:2292 */

const COLLEGE = [
  "Physics, Chemistry, Drawing",
  "Theory you memorise for exams",
  "Studying the night before",
  "Marks, but nothing built",
];

const INDUSTRY = [
  "DSA and problem solving",
  "Building real AI-powered apps",
  "Cloud and system design",
  "Projects, hackathons, internships",
];

function CheckBox({ tone }: { tone: "brand" | "white" }) {
  return (
    <span
      className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md ${
        tone === "brand" ? "bg-brand text-white" : "bg-white text-brand"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-3"
        aria-hidden
      >
        <path d="m5 13 4 4L19 7" />
      </svg>
    </span>
  );
}

export default function Gap() {
  return (
    <section id="gap" className="scroll-mt-24 bg-[#f3f4f6] px-6 py-20">
      <div className="mx-auto max-w-[1152px] rounded-[32px] bg-white p-6 sm:p-10">
        {/* heading + supporting copy */}
        <Reveal from="top">
          <div className="grid gap-6 lg:grid-cols-[597fr_427fr] lg:gap-12">
            <h2 className="font-display text-[28px] font-medium leading-[1.15] tracking-[-1px] text-ink sm:text-[40px] sm:leading-[46px]">
              Your college teaches the syllabus. The{" "}
              <span className="text-brand">industry hires</span> for skills.
            </h2>

            <p className="text-base leading-[26px] text-ink/55 lg:pt-2">
              Most students only notice this gap in final year. This session
              shows you how to close it from day one.
            </p>
          </div>
        </Reveal>

        {/* the two sides */}
        <div className="mt-10 grid gap-7 lg:grid-cols-2">
          <Reveal from="top" className="h-full">
            <article className="flex h-full flex-col gap-5 rounded-[24px] border-2 border-black bg-white p-8">
              <span className="inline-flex w-fit items-center rounded-full bg-brand/10 px-3 py-1.5 text-xs font-semibold leading-4 text-brand">
                Year 1–2
              </span>

              <h3 className="font-display text-2xl font-medium leading-[33px] tracking-[-0.6px] text-ink">
                What college gives you
              </h3>

              <ul className="space-y-3">
                {COLLEGE.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-[22.75px] text-ink/55"
                  >
                    <CheckBox tone="brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal from="top" delay={140} className="h-full">
            <article
              className="flex h-full flex-col gap-5 rounded-[24px] border border-black p-8"
              style={{
                backgroundImage:
                  "linear-gradient(151deg, #e7000b 0%, #c10007 50%, #9f0712 100%)",
              }}
            >
              <span className="inline-flex w-fit items-center rounded-full bg-white/20 px-3 py-1.5 font-mono text-[10px] font-bold leading-[15px] tracking-[1px] text-white">
                DAY 1 OF A JOB
              </span>

              <h3 className="font-display text-2xl font-medium leading-8 tracking-[-0.6px] text-white">
                What companies hire for
              </h3>

              <ul className="space-y-3">
                {INDUSTRY.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-[22.75px] text-white"
                  >
                    <CheckBox tone="white" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>

        {/* big stat + closing copy + CTA */}
        <Reveal from="top" className="pt-12">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-10">
            <p className="flex shrink-0 items-end gap-2">
              <span className="pb-1.5 text-sm leading-5 text-ink/45">
                In just
              </span>
              <span className="font-display text-6xl font-medium leading-none tracking-[-1.8px] text-ink sm:text-[72px]">
                2 hrs
              </span>
            </p>

            <p className="max-w-[576px] text-base leading-[26px] text-ink/60">
              You get the{" "}
              <span className="font-semibold text-brand">
                exact plan to bridge it
              </span>
              : what to learn, in what order, and what to ignore.
            </p>

            <a
              href="#register"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold leading-5 text-white transition hover:bg-brand-dark lg:ml-auto"
            >
              Register now
              <span className="transition group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
