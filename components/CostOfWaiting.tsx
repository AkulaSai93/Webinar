import InView from "./InView";
import Reveal from "./Reveal";
import { ArrowRight } from "./icons";

const POINTS = [
  { lead: "Most students waste Year 1 and 2", rest: "thinking there's plenty of time." },
  { lead: "They get serious in Year 3.", rest: "By then, it's too late to build real depth." },
  { lead: "Meanwhile, early starters", rest: "are building, interning and getting noticed." },
];

const YEARS = ["Year 1", "Year 2", "Year 3", "Year 4"];

function Cross() {
  return (
    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="size-3" aria-hidden>
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </span>
  );
}

/* the plot runs x 56 → 584, baseline at y 296, in a 640 × 360 frame */
const YEAR_AT = [56, 232, 408, 584];
const YEAR_PCT = ["8.75%", "36.25%", "63.75%", "91.25%"];
const GRID_Y = [110, 170, 230];

/** the early starter: slow start, then compounding */
const LEAD =
  "M56,288 C130,284 168,246 212,206 C268,156 318,118 392,100 C470,82 520,78 584,74";
/** the one who waits: flat for years, then a late climb */
const LATE =
  "M56,292 C180,291 280,286 368,278 C440,270 520,256 584,240";

/** milestones along the lead curve */
const BEATS = [
  { x: 232, y: 196 },
  { x: 408, y: 96 },
];

function Chart() {
  return (
    <div>
      {/* the labels are positioned against this box, so it wraps the plot only */}
      <div className="relative">
        <svg
          viewBox="0 0 640 360"
          className="h-auto w-full"
          role="img"
          aria-label="Skills and opportunities over four years: the student who starts in Year 1 compounds steadily, while the one who waits until Year 3 stays flat and never closes the gap."
        >
          <defs>
            <linearGradient id="leadArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e7000b" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#e7000b" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gapFill" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e7000b" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#e7000b" stopOpacity="0.22" />
            </linearGradient>
            <linearGradient id="leadStroke" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#c10007" />
              <stop offset="100%" stopColor="#ff3b43" />
            </linearGradient>
            <filter id="lineGlow" x="-15%" y="-40%" width="130%" height="180%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* the measure behind it all */}
          {GRID_Y.map((y) => (
            <line key={y} x1="56" y1={y} x2="584" y2={y} stroke="#fff" strokeOpacity="0.045" />
          ))}
          {YEAR_AT.map((x) => (
            <line key={x} x1={x} y1="70" x2={x} y2="296" stroke="#fff" strokeOpacity="0.05" />
          ))}
          <line x1="56" y1="296" x2="584" y2="296" stroke="#fff" strokeOpacity="0.14" />

          {/* everything the early starter banked */}
          <path className="chart-area" d={`${LEAD} L584,296 L56,296 Z`} fill="url(#leadArea)" />

          {/* and the distance between them by Year 4 */}
          <g className="chart-fade">
            <path
              d="M408,96 C470,84 525,78 584,74 L584,240 C520,256 440,270 408,272 Z"
              fill="url(#gapFill)"
            />
            <line x1="584" y1="74" x2="584" y2="240" stroke="#e7000b" strokeOpacity="0.5" strokeDasharray="3 4" />
          </g>

          <path
            className="chart-line chart-line-late"
            d={LATE}
            fill="none"
            stroke="#fff"
            strokeOpacity="0.32"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength={1400}
          />

          <path
            className="chart-line"
            d={LEAD}
            fill="none"
            stroke="url(#leadStroke)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#lineGlow)"
          />
          <path className="chart-spark" d={LEAD} fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />

          {/* beats along the way */}
          {BEATS.map(({ x, y }) => (
            <g key={x} className="chart-fade chart-fade-2">
              <circle cx={x} cy={y} r="7" fill="#e7000b" fillOpacity="0.18" />
              <circle cx={x} cy={y} r="3" fill="#ff3b43" />
            </g>
          ))}

          {/* where each of them ends up */}
          <circle className="chart-pulse" cx="584" cy="74" r="12" fill="#e7000b" opacity="0.25" />
          <circle className="chart-fade" cx="584" cy="74" r="5.5" fill="#ff3b43" />
          <circle className="chart-fade chart-fade-2" cx="584" cy="240" r="4.5" fill="#fff" fillOpacity="0.5" />
        </svg>

        {/* labels live in HTML, so they stay legible however the chart scales */}
        <span
          className="chart-fade chart-fade-2 pointer-events-none absolute whitespace-nowrap rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-sm sm:text-xs"
          style={{ right: "4%", top: "6%" }}
        >
          Started in Year 1
        </span>
        <span
          className="chart-fade chart-fade-3 pointer-events-none absolute whitespace-nowrap rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-white/60 backdrop-blur-sm sm:text-xs"
          style={{ right: "4%", top: "76%" }}
        >
          Waited till Year 3
        </span>

        <span
          className="chart-fade pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[9px] font-bold tracking-[0.22em] text-brand sm:text-[10px]"
          style={{ left: "77%", top: "44%" }}
        >
          THE GAP
        </span>

        {YEAR_PCT.map((left, i) => (
          <span
            key={left}
            className={`chart-fade pointer-events-none absolute -translate-x-1/2 text-[10px] text-white/35 sm:text-[11px] ${
              i > 1 ? "chart-fade-2" : ""
            }`}
            style={{ left, top: "85%" }}
          >
            {YEARS[i]}
          </span>
        ))}
      </div>

      {/* on a phone the end labels sit tight, so the legend carries them too */}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs sm:hidden">
        <span className="flex items-center gap-2 text-white">
          <span className="size-2 rounded-full bg-brand" />
          Started in Year 1
        </span>
        <span className="flex items-center gap-2 text-white/60">
          <span className="size-2 rounded-full bg-white/45" />
          Waited till Year 3
        </span>
      </div>
    </div>
  );
}

export default function CostOfWaiting() {
  return (
    <section id="cost" className="scroll-mt-24 bg-[#f3f4f6] px-6 py-20">
      <div className="mx-auto max-w-[1152px]">
        <Reveal from="top">
          <span className="inline-flex items-center rounded-full border border-brand/25 bg-brand/8 px-4 py-2 text-sm text-ink/75">
            The cost of waiting
          </span>

          <h2 className="mt-5 max-w-2xl font-display text-[28px] font-medium leading-[1.12] tracking-[-1px] text-ink sm:text-[40px] sm:leading-[46px]">
            Same college. Same degree. Two years apart.
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-[26px] text-ink/55">
            Two students start Year 1 together. One starts building now. The
            other waits for &ldquo;later&rdquo;. By Year 4, they&apos;re not
            even in the same race.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          {/* chart */}
          <Reveal from="top">
            <InView
              activeClass="chart-in"
              className="relative overflow-hidden rounded-[28px] px-6 py-7 shadow-[0_30px_80px_-40px_rgba(10,7,8,0.6)] ring-1 ring-inset ring-white/8 sm:px-8"
              style={{
                backgroundImage:
                  "radial-gradient(120% 90% at 85% 10%, rgba(231,0,11,0.16) 0%, rgba(231,0,11,0) 55%)," +
                  "linear-gradient(160deg, #141013 0%, #0a0708 60%)",
              }}
            >
              <p className="mb-2 font-mono text-[11px] font-bold tracking-[0.18em] text-white/40">
                SKILLS &amp; OPPORTUNITIES (ILLUSTRATIVE)
              </p>
              <Chart />
            </InView>
          </Reveal>

          {/* the reasons */}
          <div className="flex flex-col justify-center">
            <ul className="space-y-6">
              {POINTS.map(({ lead, rest }, i) => (
                <Reveal key={lead} from="top" delay={i * 120}>
                  <li className="flex items-start gap-4">
                    <Cross />
                    <p className="text-base leading-[26px] text-ink/55">
                      <span className="font-bold text-ink">{lead}</span> {rest}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal from="top" delay={360}>
              <p className="mt-9 font-display text-2xl font-medium leading-snug tracking-[-0.6px] text-ink">
                The only real difference? When they started.
              </p>

              <a
                href="#register"
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark"
              >
                Get ahead. Register now
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
