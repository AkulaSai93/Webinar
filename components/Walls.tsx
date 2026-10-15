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

/** The blank bricks carry code, one snippet each. */
const BRICK_CODE = [
  "<div>",
  "const",
  "{ }",
  "</>",
  "git",
  "return",
  "npm",
  "=>",
  "let",
  "()",
  "async",
  "push",
  "[ ]",
  "fn",
  "map",
  "===",
];

/** the moulded face every block in the wall shares: a squared-off brick with
 *  a lit top edge, a shaded underside and a dark mortar line all round */
const BRICK_FACE: React.CSSProperties = {
  borderRadius: "2px",
  border: "1px solid rgba(10,7,8,0.14)",
  boxShadow:
    "inset 0 1.5px 0 rgba(255,255,255,0.95)," +
    " inset 0 -4px 6px -3px rgba(10,7,8,0.22)",
};

function Brick({ art, className = "" }: { art: number; className?: string }) {
  const code = BRICK_CODE[art % BRICK_CODE.length];
  return (
    <div
      className={`flex h-full items-center justify-center overflow-hidden px-2 ${className}`}
      style={{
        ...BRICK_FACE,
        backgroundImage: "linear-gradient(180deg, #eae7e5 0%, #d8d4d1 100%)",
      }}
    >
      <span className="select-none truncate font-mono text-[11px] font-bold tracking-tight text-ink/25 sm:text-sm">
        {code}
      </span>
    </div>
  );
}

/** a course of small bricks, so the filler reads as masonry, not one slab */
function Course({
  seed,
  from,
  count,
  className = "",
}: {
  seed: number;
  from: number;
  count: number;
  className?: string;
}) {
  return (
    <div className={`grid h-[89px] gap-[3px] ${className}`} style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
      {Array.from({ length: count }, (_, i) => (
        <Shard key={i} seed={seed + i}>
          <Brick art={from + i} />
        </Shard>
      ))}
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
              Why most never make it
            </span>

            <h2 className="mt-4 text-[26px] font-bold leading-[1.15] tracking-[-0.9px] text-ink sm:text-[36px] sm:leading-[41.4px]">
              Between you and your{" "}
              <span className="text-brand">dream stands</span> a wall.
            </h2>

            <p className="mt-3 max-w-[512px] text-sm leading-[22.75px] text-ink/55">
              Almost every first-year hits these four walls, and most never
              get past them.
            </p>
          </div>
        }
        payoff={
          /* Figma: Webinar / Hero 21:1234 */
          <div className="flex w-full max-w-[760px] flex-col items-center gap-5">
            <p className="text-center font-display text-[22px] font-medium leading-normal text-black sm:text-[28px]">
              This session is how you{" "}
              <span className="text-brand">break those walls</span>.
              <br />
              Break Through
            </p>

            <a
              href="#register"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Register now
              <ArrowUpRight />
            </a>
          </div>
        }
      >
        {WALLS.map(({ n, title, body, Icon, tint, chip }, row) => (
          <div
            key={n}
            className={`grid gap-[3px] ${
              row % 2 === 0
                ? "sm:grid-cols-[0.3fr_1fr_0.42fr]"
                : "sm:grid-cols-[0.42fr_1fr_0.3fr]"
            }`}
          >
            <Course
              seed={row * 9 + 1}
              from={row * 4}
              count={row % 2 === 0 ? 2 : 3}
              className="hidden sm:grid"
            />

            <Shard seed={row * 9 + 4}>
              <article
                className="flex min-h-[89px] flex-col overflow-hidden sm:h-[89px]"
                style={{
                  backgroundColor: tint,
                  backgroundImage:
                    "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(10,7,8,0.05) 100%)",
                  ...BRICK_FACE,
                }}
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

            <Course
              seed={row * 9 + 5}
              from={row * 4 + 2}
              count={row % 2 === 0 ? 3 : 2}
              className="hidden sm:grid"
            />
          </div>
        ))}
      </WallStack>
    </section>
  );
}
