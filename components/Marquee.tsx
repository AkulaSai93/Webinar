/* Figma: Webinar 28:10587 */

const ITEMS = [
  "Zero coding experience is fine",
  "Made for 1st & 2nd year students",
  "Any engineering branch",
  "Any college, any tier",
];

export default function Marquee() {
  return (
    <div className="marquee-track relative overflow-hidden border-y border-ink/10 bg-brand py-4">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-6 whitespace-nowrap px-6 text-base font-semibold leading-6 tracking-[0.4px] text-white"
              >
                {item}
                <span className="size-1.5 shrink-0 rounded-full bg-white" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
