import { ArrowRight } from "./icons";

/** A mobile-only bar that stays with the reader for the whole page. */
export default function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/90 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-3">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-bold leading-tight text-ink">
            Sat, 17 Oct · 4:00 PM IST
          </p>
          <p className="truncate text-[11px] leading-tight text-ink/55">
            Live on Zoom · Limited seats
          </p>
        </div>

        <a
          href="#register"
          className="ml-auto inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand/25 transition active:bg-brand-dark"
        >
          Register now
          <ArrowRight className="size-4" />
        </a>
      </div>
    </div>
  );
}
