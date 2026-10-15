import Image from "next/image";
import { ArrowRight } from "./icons";

const DETAILS = [
  "Sat, 17 Oct, 2026",
  "4:00 PM IST",
  "Online Live on Zoom",
  "Free to attend",
];

export default function Footer() {
  return (
    <footer
      /* the sticky bar sits over the last line on mobile, so leave it room */
      className="relative overflow-hidden px-6 pb-[72px] pt-20 text-white sm:pt-32 lg:pb-0"
      style={{
        // one wide bloom rising from the bottom centre: the corners stay on
        // the page colour and the edge of the red is a soft arc, not a band
        backgroundColor: "#f3f4f6",
        backgroundImage:
          "radial-gradient(140% 63% at 50% 64%," +
          " #c10007 0%, #e7000b 30%, #ef5e63 50%, #f8b9bc 68%," +
          " #fce6e7 80%, rgba(243,244,246,0) 90%)",
      }}
    >
      <div className="mx-auto max-w-[1152px]">
        {/* the closing word */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/upgrad-logo.png"
            alt="upGrad School of Technology"
            width={182}
            height={64}
            className="h-14 w-auto"
          />
          <h2 className="mt-7 max-w-2xl font-display text-[28px] font-medium leading-[1.15] tracking-[-0.8px] sm:text-[38px]">
            Become AI-ready in your first 2 years.
          </h2>

          {/* the session, in one line */}
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/80">
            {DETAILS.map((item, i) => (
              <li key={item} className="flex items-center gap-5">
                {item}
                {i < DETAILS.length - 1 && (
                  <span aria-hidden className="size-1 rounded-full bg-white/45" />
                )}
              </li>
            ))}
          </ul>

          <a
            href="#register"
            className="group mt-9 inline-flex items-center gap-2.5 rounded-[8px] bg-white px-8 py-4 text-base font-bold text-brand shadow-[0_18px_40px_-18px_rgba(10,7,8,0.45)] transition hover:bg-white/90"
          >
            Register now
            <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </a>
        </div>

        {/* the wordmark */}
        <p
          aria-hidden
          className="mt-16 select-none text-center font-display text-[18vw] font-bold leading-[0.82] tracking-[-0.04em] text-white/95"
        >
          WEBINAR
        </p>

        <div className="flex flex-col gap-2 border-t border-white/20 py-6 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} upGrad School of Technology. All rights
            reserved.
          </p>
          <p>100% free · Limited seats · No spam</p>
        </div>
      </div>
    </footer>
  );
}
