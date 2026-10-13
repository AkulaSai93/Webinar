import WallStack, { Shard } from "./WallStack";

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[18px] shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      aria-hidden
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

function MentorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
      <path d="M18 7.5v.01M20.5 10v.01M17.5 11.5v.01" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 7 9 4z" />
      <path d="M9 4v13M15 7v12.5" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3z" />
      <path d="M3 12.5 12 17l9-4.5M3 17 12 21.5 21 17" />
    </svg>
  );
}

function DoubtIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
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
function Brick() {
  return (
    <div
      aria-hidden
      className="hidden h-full rounded-xl border border-ink/8 bg-ink/[0.035] sm:block"
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
    <section id="about" className="scroll-mt-24 bg-[#f3f4f6]">
      <WallStack
        header={
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-brand/25 bg-brand/8 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.16em] text-ink/70">
              WHY MOST NEVER MAKE IT
            </span>

            <h2 className="mt-4 text-2xl font-bold leading-[1.15] tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Between you and that{" "}
              <span className="text-brand">dream stands</span> a wall.
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink/55">
              Talent was never the problem. Almost every first-year hits these
              four walls, and most never get past them.
            </p>
          </div>
        }
        payoff={
          /* Figma: Webinar / Hero 21:1234 */
          <div className="flex w-full max-w-[483px] flex-col items-center gap-5">
            <p className="text-center font-display text-[28px] font-medium leading-normal text-black">
              This session is how you{" "}
              <span className="text-brand">break those walls</span> in a single
              evening.
            </p>

            <a
              href="#register"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Break through. Register now
              <ArrowUpRight />
            </a>
          </div>
        }
      >
        {WALLS.map(({ n, title, body, Icon, align }, row) => (
          <div
            key={n}
            className={`grid gap-3 ${
              align === "left"
                ? "sm:grid-cols-[0.5fr_2fr_0.8fr]"
                : "sm:grid-cols-[0.8fr_2fr_0.5fr]"
            }`}
          >
            <Shard seed={row * 3 + 1} className="h-full">
              <Brick />
            </Shard>

            <Shard seed={row * 3 + 2}>
            <article className="group relative overflow-hidden rounded-xl border border-ink/10 bg-white transition duration-300 hover:border-brand/35 hover:shadow-[0_18px_40px_-22px_rgba(10,7,8,0.35)]">
              <div
                aria-hidden
                className="h-1.5 w-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(115deg, #e6161f 0 12px, #0a0708 12px 24px)",
                }}
              />
              <div className="flex items-center gap-4 px-4 py-3.5 sm:px-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand transition group-hover:bg-brand/15">
                  <Icon />
                </span>
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <h3 className="text-base font-bold tracking-tight text-ink sm:text-lg">
                      {title}
                    </h3>
                    <span className="font-mono text-[10px] font-bold tracking-widest text-ink/25">
                      {n}
                    </span>
                  </div>
                  <p className="mt-0.5 max-w-lg text-xs leading-relaxed text-ink/55 sm:text-sm">
                    {body}
                  </p>
                </div>
              </div>
            </article>
            </Shard>

            <Shard seed={row * 3 + 3} className="h-full">
              <Brick />
            </Shard>
          </div>
        ))}
      </WallStack>
    </section>
  );
}
