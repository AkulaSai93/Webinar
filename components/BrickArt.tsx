/**
 * Small 3-D sketches of coding things, for the blank bricks in the wall.
 * Everything is isometric: each solid is a top face plus its two lit sides,
 * so the shapes read with depth at brick size.
 */

import Image from "next/image";

type Props = { className?: string };

const edge = {
  stroke: "#1e1b4b",
  strokeWidth: 1.8,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

/** the three faces of an isometric box */
function faces(cx: number, cy: number, w: number, d: number, h: number) {
  return {
    top: `M${cx},${cy - d} L${cx + w},${cy} L${cx},${cy + d} L${cx - w},${cy} Z`,
    left: `M${cx - w},${cy} L${cx},${cy + d} L${cx},${cy + d + h} L${cx - w},${cy + h} Z`,
    right: `M${cx},${cy + d} L${cx + w},${cy} L${cx + w},${cy + h} L${cx},${cy + d + h} Z`,
  };
}

function Box({
  cx, cy, w, d, h, top, left, right,
}: {
  cx: number; cy: number; w: number; d: number; h: number;
  top: string; left: string; right: string;
}) {
  const f = faces(cx, cy, w, d, h);
  return (
    <>
      <path d={f.left} fill={left} {...edge} />
      <path d={f.right} fill={right} {...edge} />
      <path d={f.top} fill={top} {...edge} />
    </>
  );
}

function Shadow({ cx, cy, rx }: { cx: number; cy: number; rx: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={rx * 0.3} fill="rgba(30,27,75,0.12)" />;
}

function Frame({ children, className }: Props & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 120 92" className={className} aria-hidden>
      {children}
    </svg>
  );
}

const SLATE = { top: "#b5bee3", left: "#7d8ac9", right: "#5a67a8" };
const GREEN = { top: "#34d399", left: "#0f9b72", right: "#0a6e52" };
const BLUE = { top: "#60a5fa", left: "#2563eb", right: "#1744a8" };

/** an editor on a stand, code on the screen */
export function Monitor({ className }: Props) {
  return (
    <Frame className={className}>
      <Shadow cx={60} cy={80} rx={24} />
      <Box cx={60} cy={70} w={16} d={9} h={4} {...SLATE} />
      <path d="M57,56 h6 v12 h-6 z" fill="#7d8ac9" {...edge} />
      <path d="M96,20 l6,4 v34 l-6,-4 z" fill="#5a67a8" {...edge} />
      <path d="M24,54 h72 l6,4 h-72 z" fill="#7d8ac9" {...edge} />
      <path d="M24,20 h72 v34 h-72 z" fill="#b5bee3" {...edge} />
      <line x1="32" y1="30" x2="56" y2="30" stroke="#1d4ed8" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="38" y1="38" x2="70" y2="38" stroke="#0a7a5a" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="38" y1="46" x2="52" y2="46" stroke="#b45309" strokeWidth="3.5" strokeLinecap="round" />
    </Frame>
  );
}

/** a terminal window with thickness and a live prompt */
export function TerminalBox({ className }: Props) {
  return (
    <Frame className={className}>
      <Shadow cx={60} cy={78} rx={30} />
      <path d="M96,22 l6,4 v38 l-6,-4 z" fill="#5a67a8" {...edge} />
      <path d="M24,60 h72 l6,4 h-72 z" fill="#7d8ac9" {...edge} />
      <path d="M24,22 h72 v38 h-72 z" fill="#14111c" {...edge} />
      <line x1="24" y1="33" x2="96" y2="33" {...edge} strokeWidth="1.2" />
      <circle cx="31" cy="27.5" r="2" fill="#f87171" />
      <circle cx="38" cy="27.5" r="2" fill="#fbbf24" />
      <circle cx="45" cy="27.5" r="2" fill="#34d399" />
      <path d="M32,42 l5,4 l-5,4" fill="none" stroke="#34d399" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="43" y="44.5" width="22" height="3" rx="1.5" fill="#dbe1f5" fillOpacity="0.65" />
      <rect x="32" y="53" width="16" height="3" rx="1.5" fill="#dbe1f5" fillOpacity="0.3" />
      <rect x="51" y="52" width="5" height="5" fill="#34d399" />
    </Frame>
  );
}

/** the angle-bracket glyph, extruded */
export function CodeGlyph({ className }: Props) {
  const glyph = "M44,30 L26,46 L44,62 M76,30 L94,46 L76,62 M68,26 L52,66";
  return (
    <Frame className={className}>
      <Shadow cx={60} cy={78} rx={30} />
      <path d={glyph} transform="translate(5,5)" fill="none" stroke="#5a67a8" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d={glyph} fill="none" stroke="#3b82f6" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d={glyph} fill="none" {...edge} strokeWidth="1.2" strokeOpacity="0.45" />
    </Frame>
  );
}

/** the keycap pad, from the supplied artwork */
export function Keycaps({ className }: Props) {
  return (
    <Image
      src="/brick-keycaps.png"
      alt=""
      width={160}
      height={134}
      className={className}
    />
  );
}

/** three commits, one branching away */
export function GitNodes({ className }: Props) {
  return (
    <Frame className={className}>
      <Shadow cx={60} cy={80} rx={28} />
      <path d="M36,58 L60,46" fill="none" {...edge} strokeWidth="2" />
      <path d="M60,46 L84,34" fill="none" {...edge} strokeWidth="2" />
      <path d="M60,46 q10,-14 22,-8" fill="none" {...edge} strokeWidth="2" strokeDasharray="3 3" />
      <Box cx={36} cy={58} w={10} d={6} h={6} {...SLATE} />
      <Box cx={60} cy={46} w={10} d={6} h={6} {...BLUE} />
      <Box cx={84} cy={34} w={10} d={6} h={6} {...GREEN} />
    </Frame>
  );
}

/** a database, the way every dev diagram draws one */
export function Database({ className }: Props) {
  const ring = (cy: number, fill: string) => (
    <>
      <path d={`M32,${cy} v12 a28,10 0 0 0 56,0 v-12 z`} fill={fill} {...edge} />
      <ellipse cx="60" cy={cy} rx="28" ry="10" fill="#b5bee3" {...edge} />
    </>
  );
  return (
    <Frame className={className}>
      <Shadow cx={60} cy={84} rx={28} />
      {ring(56, "#5a67a8")}
      {ring(40, "#7d8ac9")}
      {ring(24, "#2563eb")}
    </Frame>
  );
}

export const BRICK_ART = [
  Monitor,
  GitNodes,
  TerminalBox,
  CodeGlyph,
  Keycaps,
  Database,
  Monitor,
  TerminalBox,
];
