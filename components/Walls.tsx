import Reveal from "./Reveal";

function MentorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
      <path d="M18 7.5v.01M20.5 10v.01M17.5 11.5v.01" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 7 9 4z" />
      <path d="M9 4v13M15 7v12.5" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3z" />
      <path d="M3 12.5 12 17l9-4.5M3 17 12 21.5 21 17" />
    </svg>
  );
}

function DoubtIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.3 2.4c-.5.2-.8.7-.8 1.2v.4" />
      <path d="M12 16.5v.01" />
    </svg>
  );
}

const WALLS = [
  {
    n: "01",
    title: "No mentor",
    body: "No one around you has cracked it. So who do you even ask?",
    Icon: MentorIcon,
    align: "left" as const,
  },
  {
    n: "02",
    title: "No roadmap",
    body: "You don't know where to start, or what to skip.",
    Icon: MapIcon,
    align: "right" as const,
  },
  {
    n: "03",
    title: "Information overload",
    body: "A thousand YouTube roadmaps, all saying different things.",
    Icon: LayersIcon,
    align: "left" as const,
  },
  {
    n: "04",
    title: "Self-doubt",
    body: "A quiet voice asking: is it already too late for me?",
    Icon: DoubtIcon,
    align: "right" as const,
  },
];

/** A blank brick in the wall. */
function Brick({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`hidden h-full rounded-xl border border-ink/8 bg-ink/[0.035] sm:block ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(10,7,8,0.07) 1px, transparent 0)",
        backgroundSize: "14px 14px",
      }}
    />
  );
}

export default function Walls() {
  return (
    <section id="about" className="scroll-mt-24 bg-[#F2F2F3] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-brand/25 bg-brand/8 px-4 py-1.5 text-[11px] font-bold tracking-[0.16em] text-ink/70">
            WHY MOST NEVER MAKE IT
          </span>

          <h2 className="mt-7 text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
            Between you and that
            <br className="hidden sm:block" />{" "}
            <span className="text-brand">dream stands</span> a wall.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink/55">
            Talent was never the problem. Almost every first-year hits these
            four walls, and most never get past them.
          </p>
        </Reveal>

        {/* the wall — one course of bricks per scroll */}
        <div className="mt-16 space-y-4">
          {WALLS.map(({ n, title, body, Icon, align }, i) => (
            <Reveal key={n} delay={60}>
              <div
                className={`grid min-h-[9rem] gap-4 ${
                  align === "left"
                    ? "sm:grid-cols-[0.6fr_2.4fr_1fr]"
                    : "sm:grid-cols-[1fr_2.4fr_0.6fr]"
                }`}
              >
                {/* filler brick */}
                <Brick className={align === "left" ? "" : "sm:order-none"} />

                {/* the real brick */}
                <article className="group relative overflow-hidden rounded-xl border border-ink/10 bg-white transition duration-300 hover:border-brand/35 hover:shadow-[0_20px_45px_-22px_rgba(10,7,8,0.35)]">
                  {/* hazard stripe */}
                  <div
                    aria-hidden
                    className="h-2 w-full"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(115deg, #e6161f 0 14px, #0a0708 14px 28px)",
                    }}
                  />
                  <div className="flex items-start gap-5 p-6 sm:p-7">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition group-hover:bg-brand/15">
                      <Icon />
                    </span>
                    <div>
                      <div className="flex items-baseline gap-3">
                        <h3 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                          {title}
                        </h3>
                        <span className="font-mono text-[11px] font-bold tracking-widest text-ink/25">
                          {n}
                        </span>
                      </div>
                      <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-ink/55 sm:text-base">
                        {body}
                      </p>
                    </div>
                  </div>
                </article>

                {/* filler brick */}
                <Brick />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
