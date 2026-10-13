import InView from "./InView";
import Reveal from "./Reveal";

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

const X = { y1: 70, y2: 230, y3: 390, y4: 540 };

/* the two trajectories, drawn across the same plot */
const LEAD = "M70,272 C150,258 200,190 260,150 C340,98 450,74 540,64";
const LATE = "M70,278 C180,276 300,272 390,262 C450,254 500,238 540,222";

function Chart() {
  return (
    <svg
      viewBox="0 0 720 330"
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label="Skills and opportunities over four years: the student who starts in Year 1 pulls far ahead of the one who waits until Year 3."
    >
      <defs>
        <linearGradient id="leadArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e7000b" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#e7000b" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gapFill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e7000b" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#e7000b" stopOpacity="0.3" />
        </linearGradient>
        <filter id="lineGlow" x="-15%" y="-40%" width="130%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* baseline + year ticks */}
      <line x1="70" y1="288" x2="560" y2="288" stroke="#fff" strokeOpacity="0.08" />
      {Object.values(X).map((x) => (
        <line key={x} x1={x} y1="56" x2={x} y2="288" stroke="#fff" strokeOpacity="0.05" />
      ))}

      {/* soft area under the lead curve */}
      <path className="chart-area" d={`${LEAD} L540,288 L70,288 Z`} fill="url(#leadArea)" />

      {/* the gap between the two paths, opening toward Year 4 */}
      <g className="chart-fade">
        <path
          d="M390,86 C450,74 500,68 540,64 L540,222 C500,238 450,254 390,262 Z"
          fill="url(#gapFill)"
        />
        <text
          x="468"
          y="168"
          textAnchor="middle"
          fill="#e7000b"
          fontSize="11"
          fontWeight="700"
          letterSpacing="3"
          fontFamily="ui-monospace, monospace"
        >
          THE GAP
        </text>
      </g>

      {/* waited till year 3 */}
      <path
        className="chart-line chart-line-late"
        d={LATE}
        fill="none"
        stroke="#fff"
        strokeOpacity="0.3"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 9"
        pathLength={1400}
      />

      {/* started in year 1 */}
      <path
        className="chart-line"
        d={LEAD}
        fill="none"
        stroke="#e7000b"
        strokeWidth="3.5"
        strokeLinecap="round"
        filter="url(#lineGlow)"
      />
      {/* travelling highlight */}
      <path
        className="chart-spark"
        d={LEAD}
        fill="none"
        stroke="#fff"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* endpoints */}
      <circle className="chart-pulse" cx="540" cy="64" r="12" fill="#e7000b" opacity="0.25" />
      <circle className="chart-fade" cx="540" cy="64" r="6" fill="#e7000b" />
      <text className="chart-fade chart-fade-2" x="558" y="69" fill="#fff" fontSize="14" fontWeight="700">
        Started in Year 1
      </text>

      <circle className="chart-fade chart-fade-2" cx="540" cy="222" r="5" fill="#fff" fillOpacity="0.45" />
      <text className="chart-fade chart-fade-3" x="558" y="227" fill="#fff" fillOpacity="0.7" fontSize="14" fontWeight="600">
        Waited till Year 3
      </text>

      {/* axis */}
      {YEARS.map((label, i) => (
        <text
          key={label}
          className={`chart-fade ${i > 1 ? "chart-fade-2" : ""}`}
          x={Object.values(X)[i]}
          y="312"
          textAnchor="middle"
          fill="#fff"
          fillOpacity="0.4"
          fontSize="12"
        >
          {label}
        </text>
      ))}
    </svg>
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
              className="rounded-[28px] bg-ink px-6 py-7 shadow-[0_30px_80px_-40px_rgba(10,7,8,0.6)] sm:px-8"
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
                <span className="transition group-hover:translate-x-1">→</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
