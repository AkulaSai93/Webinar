import DreamPicker from "./DreamPicker";
import Reveal from "./Reveal";

/* Figma: Webinar / Who it's for 28:10328 */

export default function DreamBig() {
  return (
    <section id="who" className="scroll-mt-24 overflow-x-clip bg-[#f3f4f6] px-6 pb-8 pt-14 sm:pb-10 sm:pt-20">
      <div className="mx-auto flex max-w-[1152px] flex-col items-center gap-5 sm:gap-7">
        {/* heading */}
        <Reveal from="top" className="flex flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center rounded-full border border-brand/35 bg-brand/10 px-4 py-2 text-sm font-bold text-ink">
            Who it&apos;s for
          </span>

          <h2 className="font-display text-[40px] font-medium leading-none tracking-tight text-[#0a0a0b] sm:text-[52px]">
            Dream <span className="text-brand">Big</span>
          </h2>
        </Reveal>

        {/* the ambition, in the visitor's own words */}
        <Reveal from="top" delay={120} className="w-full text-center">
          <DreamPicker />
        </Reveal>
      </div>
    </section>
  );
}
