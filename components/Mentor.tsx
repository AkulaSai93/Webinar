import Image from "next/image";

import Reveal from "./Reveal";
import { ArrowRight } from "./icons";

/* Figma: Webinar 70:26221 */
const STATS = [
  { label: "Mentored", value: "1M+ Students" },
  { label: "Worked at", value: "Top 5 tech giants" },
  { label: "ex-Physics Wallah", value: "CIO" },
];

const CREDENTIALS = [
  {
    lead: "Cracked the companies you dream of.",
    rest: "Oracle, PayPal, Walmart, Amazon, LinkedIn.",
  },
  { lead: "Has led tech teams", rest: "as a CIO and a founder." },
  {
    lead: "Knows where students get stuck,",
    rest: "after mentoring over a million of them.",
  },
];

function Tick() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-1 size-4 shrink-0 text-brand" aria-hidden>
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" className="size-4" aria-hidden>
      <path d="m12 3 2.6 5.6 6.4.8-4.7 4.3 1.2 6.3L12 17l-5.5 3 1.2-6.3L3 9.4l6.4-.8L12 3z" />
    </svg>
  );
}

function CapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden>
      <path d="M22 9 12 4 2 9l10 5 10-5z" />
      <path d="M6 11.5V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5" />
    </svg>
  );
}

function Badge({
  icon,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-[8px] bg-ink/95 px-4 py-3 text-sm font-medium text-white shadow-xl shadow-ink/25 backdrop-blur ${className}`}
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-[8px] bg-white/10 text-amber-300">
        {icon}
      </span>
      {children}
    </span>
  );
}

export default function Mentor() {
  return (
    <section id="mentor" className="scroll-mt-24 bg-[#f3f4f6] px-6 py-14 sm:py-20">
      <div className="mx-auto grid max-w-[1152px] items-center gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
        {/* portrait */}
        <Reveal from="top">
          <div className="relative">
            <div className="overflow-hidden rounded-[8px] shadow-[0_40px_90px_-45px_rgba(10,7,8,0.7)]">
              <Image
                src="/mentor.png"
                alt="Vishwa Mohan, Founder and CEO of upGrad School of Technology"
                width={1250}
                height={1250}
                priority={false}
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>

            <Badge icon={<StarIcon />} className="absolute right-4 top-6 lg:-right-6">
              Top 40 CIOs, 2023
            </Badge>

            <Badge icon={<CapIcon />} className="absolute -left-2 bottom-10 lg:-left-6">
              IIT BHU alumnus
            </Badge>
          </div>
        </Reveal>

        {/* the case for him */}
        <div>
          <Reveal from="top">
            <span className="inline-flex items-center rounded-[8px] border border-brand/35 bg-brand/10 px-4 py-2 text-sm font-bold text-ink">
              Who&apos;s taking it
            </span>

            <h2 className="mt-5 font-display text-4xl font-medium tracking-[-1px] text-ink sm:text-5xl">
              Vishwa Mohan
            </h2>

            <p className="mt-2 text-base text-ink/55 sm:text-lg">
              Founder &amp; CEO, upGrad School of Technology
            </p>

            <blockquote className="mt-6 border-l-[3px] border-brand pl-5">
              <p className="font-display text-xl font-medium leading-snug tracking-[-0.4px] text-ink sm:text-2xl">
                &ldquo;I&apos;ve sat on both sides of the interview table.
                I&apos;ll tell you exactly what works.&rdquo;
              </p>
            </blockquote>
          </Reveal>

          {/* stats */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {STATS.map(({ value, label }, i) => (
              <Reveal key={label} from="top" delay={i * 110}>
                <div className="flex h-full flex-col justify-center rounded-[8px] bg-white p-5">
                  <p className="text-sm text-ink/55">{label}</p>
                  <p className="mt-1 font-display text-base font-bold tracking-tight text-ink">
                    {value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* credentials */}
          <Reveal from="top" delay={120}>
            <ul className="mt-8 space-y-3.5">
              {CREDENTIALS.map(({ lead, rest }) => (
                <li key={lead} className="flex items-start gap-3">
                  <Tick />
                  <p className="text-base leading-[26px] text-ink/55">
                    <span className="font-bold text-ink">{lead}</span> {rest}
                  </p>
                </li>
              ))}
            </ul>

            <a
              href="#register"
              className="group mt-9 inline-flex items-center gap-2.5 rounded-[8px] bg-brand px-7 py-4 text-base font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark"
            >
              Learn from Vishwa. Register now
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
