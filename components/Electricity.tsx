import Reveal from "./Reveal";
import { ArrowRight } from "./icons";

const SPLIT = [
  {
    stat: "98%",
    title: "AI users",
    body: "Use tools others build. Easy to replace. Slow to grow.",
    highlight: false,
  },
  {
    stat: "2%",
    title: "AI builders",
    body: "Build the models and systems. Hard to replace. Lead the industry.",
    highlight: true,
  },
];

export default function Electricity() {
  return (
    <section
      id="curriculum"
      className="scroll-mt-24 bg-[#f3f4f6] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* left — the claim */}
          <Reveal from="top">
            <span className="inline-flex items-center rounded-full border border-brand/25 bg-brand/8 px-4 py-2 text-sm text-ink/75">
              Why this can&apos;t wait
            </span>

            <h2 className="mt-5 font-display text-3xl font-medium leading-[1.1] tracking-tight text-ink sm:text-4xl">
              AI is the new <span className="text-brand">electricity.</span>{" "}
              Don&apos;t get left in the dark.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink/55 sm:text-base">
              Every company now runs on AI. It&apos;s no longer a bonus skill.
              It&apos;s the baseline. And the industry is splitting into two
              kinds of engineers.
            </p>
          </Reveal>

          {/* right — the split */}
          <div className="flex flex-col justify-center gap-4">
            {SPLIT.map(({ stat, title, body, highlight }, i) => (
              <Reveal key={title} from="top" delay={i * 140}>
                <article
                  className={`flex items-center gap-6 rounded-2xl border p-5 sm:p-6 ${
                    highlight
                      ? "border-brand bg-brand/5"
                      : "border-ink/10 bg-white"
                  }`}
                >
                  <span
                    className={`font-display text-4xl font-bold leading-none tracking-tight ${
                      highlight ? "text-brand" : "text-ink/25"
                    }`}
                  >
                    {stat}
                  </span>
                  <div>
                    <h3 className="text-base font-bold tracking-tight text-ink">
                      {title}
                    </h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink/55 lg:whitespace-nowrap">
                      {body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* closing line */}
        <Reveal from="top" className="mt-12 border-t border-ink/10 pt-8">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-xl font-display text-lg font-medium leading-snug tracking-tight text-ink sm:text-xl">
              Most engineers will use AI. Very few will build it. Find out how
              to be one of the few.
            </p>

            <a
              href="#register"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Be the 2%. Register now
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
