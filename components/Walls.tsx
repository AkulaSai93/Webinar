import { BRICK_ART } from "./BrickArt";
import WallStack, { Shard } from "./WallStack";

/* Figma: Webinar 28:10237 */

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px] shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

function MentorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
      <path d="M18 7.5v.01M20.5 10v.01M17.5 11.5v.01" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 7 9 4z" />
      <path d="M9 4v13M15 7v12.5" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3z" />
      <path d="M3 12.5 12 17l9-4.5M3 17 12 21.5 21 17" />
    </svg>
  );
}

function DoubtIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-5">
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
    tint: "#dfeafd",
    chip: "#cfdefa",
  },
  {
    n: "02",
    title: "No roadmap",
    body: "You don't know where to start, or what to skip.",
    Icon: MapIcon,
    tint: "#fdf2df",
    chip: "#f6e2bb",
  },
  {
    n: "03",
    title: "Information overload",
    body: "A thousand YouTube roadmaps, all saying different things.",
    Icon: LayersIcon,
    tint: "#eaf4ec",
    chip: "#d3e8d8",
  },
  {
    n: "04",
    title: "Self-doubt",
    body: "A quiet voice asking: is it already too late for me?",
    Icon: DoubtIcon,
    tint: "#fdeded",
    chip: "#f7d2d2",
  },
];

/** A blank brick in the wall — carries a small coding sketch. */
function Brick({ art }: { art: number }) {
  const Art = BRICK_ART[art % BRICK_ART.length];
  return (
    <div className="flex h-full items-center justify-center rounded-xl border border-ink/8 bg-ink/[0.035] px-4">
      <Art className="h-[72%] w-auto max-w-full opacity-90" />
    </div>
  );
}

export default function Walls() {
  return (
    <section id="about" className="scroll-mt-24 bg-[#f3f4f6]">
      <WallStack
        header={
          <div className="mx-auto flex max-w-[768px] flex-col items-center text-center">
            <span className="inline-flex items-center rounded-full border border-brand/35 bg-brand/10 px-4 py-2 text-sm font-bold text-ink">
              WHY MOST NEVER MAKE IT
            </span>

            <h2 className="mt-4 text-[26px] font-bold leading-[1.15] tracking-[-0.9px] text-ink sm:text-[36px] sm:leading-[41.4px]">
              Between you and that{" "}
              <span className="text-brand">dream stands</span> a wall.
            </h2>

            <p className="mt-3 max-w-[512px] text-sm leading-[22.75px] text-ink/55">
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
        {WALLS.map(({ n, title, body, Icon, tint, chip }, row) => (
          <div
            key={n}
            className={`grid gap-3 ${
              row % 2 === 0
                ? "sm:grid-cols-[0.25fr_1fr_0.4fr]"
                : "sm:grid-cols-[0.4fr_1fr_0.25fr]"
            }`}
          >
            <Shard seed={row * 3 + 1} className="hidden h-[89px] sm:block">
              <Brick art={row * 2} />
            </Shard>

            <Shard seed={row * 3 + 2}>
              <article
                className="flex min-h-[89px] flex-col overflow-hidden rounded-xl sm:h-[89px]"
                style={{ backgroundColor: tint }}
              >
                <div className="h-1.5 shrink-0" />
                <div className="flex items-center gap-4 px-5 py-3.5">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-lg text-ink/70"
                    style={{ backgroundColor: chip }}
                  >
                    <Icon />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2.5">
                      <h3 className="text-lg font-bold leading-7 tracking-[-0.45px] text-ink">
                        {title}
                      </h3>
                      <span className="font-mono text-[10px] font-bold leading-[15px] tracking-[1px] text-ink/25">
                        {n}
                      </span>
                    </div>
                    <p className="pt-0.5 text-sm leading-[22.75px] text-ink/55 sm:truncate">
                      {body}
                    </p>
                  </div>
                </div>
              </article>
            </Shard>

            <Shard seed={row * 3 + 3} className="hidden h-[89px] sm:block">
              <Brick art={row * 2 + 1} />
            </Shard>
          </div>
        ))}
      </WallStack>
    </section>
  );
}
