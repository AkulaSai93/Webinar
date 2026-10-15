/* The when-and-where pills, shared by the hero and the closing CTA. */

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="size-4 text-brand" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-brand" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-brand" aria-hidden>
      <rect x="2" y="6" width="13" height="12" rx="2" />
      <path d="M15 11l6-3v8l-6-3z" />
    </svg>
  );
}

const CHIPS = [
  { Icon: CalendarIcon, label: "Sat, 17 Oct, 2026" },
  { Icon: ClockIcon, label: "4:00 PM IST" },
  { Icon: VideoIcon, label: "Online Live on Zoom" },
];

export default function SessionChips({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2.5 sm:gap-3 ${className}`}>
      {CHIPS.map(({ Icon, label }) => (
        <span
          key={label}
          className="inline-flex items-center gap-2 rounded-[8px] bg-white px-3.5 py-2 text-[13px] font-medium text-ink sm:px-4 sm:py-2.5 sm:text-sm"
        >
          <Icon />
          {label}
        </span>
      ))}
    </div>
  );
}
