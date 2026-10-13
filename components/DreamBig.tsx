import Image from "next/image";

import Reveal from "./Reveal";

/* Figma: Webinar / Who it's for 28:10328 */

const LOGOS = [
  { src: "/logos/google.png", alt: "Google", width: 83 },
  { src: "/logos/microsoft.png", alt: "Microsoft", width: 141 },
  { src: "/logos/openai.png", alt: "OpenAI", width: 110 },
  { src: "/logos/meta.png", alt: "Meta", width: 120 },
  { src: "/logos/nvidia.png", alt: "NVIDIA", width: 164 },
];

function RocketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-[18px] shrink-0" aria-hidden>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

export default function DreamBig() {
  return (
    <section id="who" className="scroll-mt-24 bg-[#f3f4f6] px-6 py-20">
      <div className="mx-auto flex max-w-[921px] flex-col items-center gap-[60px]">
        {/* heading */}
        <Reveal from="top" className="flex flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center rounded-full border border-brand/25 bg-brand/8 px-3.5 py-1.5 text-[10px] font-bold leading-[15px] tracking-[1.6px] text-ink/70">
            Who it&apos;s for
          </span>

          <h2 className="font-display text-[40px] font-medium leading-none tracking-tight text-[#0a0a0b] sm:text-[52px]">
            Dream <span className="text-brand">Big</span>
          </h2>

          <p className="text-base text-[#444]">
            From a college no one&apos;s betting on.
          </p>
        </Reveal>

        {/* the ambition */}
        <div className="flex w-full flex-col items-center gap-8">
          <Reveal from="top" className="flex flex-col items-center gap-5">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-5">
              {LOGOS.map(({ src, alt, width }, i) => (
                <Image
                  key={alt}
                  src={src}
                  alt={alt}
                  width={width * 4}
                  height={120}
                  priority={i < 2}
                  className="h-[30px] w-auto object-contain"
                  style={{ maxWidth: width }}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex h-[39px] items-center justify-center gap-2.5 bg-white px-5 font-display text-[15px] font-semibold text-brand">
                <RocketIcon />
                Your Own Startup
              </span>
              <span className="font-display text-[15px] font-semibold text-brand">
                …but how?
              </span>
            </div>
          </Reveal>

          <Reveal from="top" delay={120}>
            <p className="text-center font-display text-xl font-medium leading-snug text-[#0a0a0b] sm:text-2xl">
              If that ambition is bigger than your campus you&apos;re exactly
              who this session is for.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
