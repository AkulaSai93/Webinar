const ITEMS = [
  "Zero coding experience is fine",
  "Made for 1st & 2nd year students",
  "Any engineering branch",
  "Any college, any tier",
];

export default function Marquee() {
  return (
    <div className="marquee-track relative overflow-hidden border-y border-ink/10 bg-ink py-4">
      {/* edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent"
      />

      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-6 whitespace-nowrap px-6 text-sm font-semibold tracking-wide text-white sm:text-base"
              >
                {item}
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
