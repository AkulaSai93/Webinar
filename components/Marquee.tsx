/* Figma: Webinar 68:25915 */

const ITEMS = [
  "Courses eligible for B.Tech, BE, BCA, B.Sc",
  "Any college, any tier",
  "No coding knowledge required",
  "Made for 1st & 2nd year students",
  "Any engineering branch",
];

// each half of the loop repeats the list, so the track stays full on a wide
// screen while it slides
const LOOP = Array.from({ length: 2 }, () => ITEMS).flat();

export default function Marquee() {
  return (
    <div className="marquee-track relative overflow-hidden border-y border-ink/10 bg-brand py-4">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {LOOP.map((item, i) => (
              <li
                key={`${item}-${i}`}
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
