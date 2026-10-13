/** lucide-style line icons, drawn inline so there's no icon dependency */

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** lucide/arrow-right */
export function ArrowRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

/** lucide/arrow-up-right */
export function ArrowUpRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}
