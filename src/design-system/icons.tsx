/**
 * Modern icon library — see MODERN-DESIGN-SYSTEM.md §6.
 *
 * Geometry rules (enforced by review, not by code):
 *  - 24×24 viewBox, 20×20 live area (2px padding on every side).
 *  - Stroke only. No fills except the two state chips (alert, check-circle filled variants).
 *  - round linecap + round linejoin everywhere: no sharp edges, no sharp corners.
 *  - Every rectangular form has rx >= 1/3 of its shorter side (min 2).
 *  - No angle tighter than 60 degrees; points are arcs or curves, never cusps.
 *  - Optical sizing: stroke width in viewBox units is set per rendered size so the
 *    rendered stroke stays 1.75–2px CSS (see STROKE below).
 */
import type { SVGProps } from "react";

export type IconSize = 16 | 20 | 24 | 32 | 48;

/** viewBox stroke width per rendered size, so optical weight stays constant. */
export const STROKE: Record<IconSize, number> = { 16: 2.6, 20: 2.2, 24: 2, 32: 1.6, 48: 1.1 };

export const CATEGORIES = ["Direction", "Action", "Feedback", "Content", "Domain"] as const;
export type Category = (typeof CATEGORIES)[number];

type Def = { cat: Category; anim: string; d: React.ReactNode };

const p = (d: string, key?: string) => <path key={key} d={d} />;

export const ICONS: Record<string, Def> = {
  /* ---------------- Direction ---------------- */
  "arrow-right": { cat: "Direction", anim: "nudge-x", d: <>{p("M3.5 12h17", "a")}{p("M13.5 5l6.5 7-6.5 7", "b")}</> },
  "arrow-left": { cat: "Direction", anim: "nudge-x-back", d: <>{p("M20.5 12h-17", "a")}{p("M10.5 5L4 12l6.5 7", "b")}</> },
  "arrow-up-right": { cat: "Direction", anim: "nudge-ne", d: <>{p("M6 18L17.5 6.5", "a")}{p("M8.5 6.5h9v9", "b")}</> },
  "arrow-down": { cat: "Direction", anim: "bob", d: <>{p("M12 3.5v17", "a")}{p("M5 13.5l7 7 7-7", "b")}</> },
  "chevron-right": { cat: "Direction", anim: "nudge-x", d: p("M9.5 5l7 7-7 7") },
  "chevron-down": { cat: "Direction", anim: "rotate-180", d: p("M5 9.5l7 7 7-7") },
  "chevron-up-down": { cat: "Direction", anim: "stretch-y", d: <>{p("M8 9.5l4-4 4 4", "a")}{p("M16 14.5l-4 4-4-4", "b")}</> },
  "menu": { cat: "Direction", anim: "burger", d: <>{p("M4 7h16", "a")}{p("M4 12h16", "b")}{p("M4 17h16", "c")}</> },
  "close": { cat: "Direction", anim: "spin-90", d: <>{p("M6.5 6.5l11 11", "a")}{p("M17.5 6.5l-11 11", "b")}</> },
  "corner-down-right": { cat: "Direction", anim: "nudge-x", d: <>{p("M5 5v7a4 4 0 004 4h10", "a")}{p("M15 12l4 4-4 4", "b")}</> },

  /* ---------------- Action ---------------- */
  "plus": { cat: "Action", anim: "rotate-45", d: <>{p("M12 4.5v15", "a")}{p("M4.5 12h15", "b")}</> },
  "minus": { cat: "Action", anim: "stretch-x", d: p("M4.5 12h15") },
  "search": { cat: "Action", anim: "sweep", d: <><circle key="a" cx="10.5" cy="10.5" r="6.5" />{p("M15.4 15.4l5 5", "b")}</> },
  "filter": { cat: "Action", anim: "stack", d: <>{p("M4 7h16", "a")}{p("M7 12h10", "b")}{p("M10 17h4", "c")}</> },
  "copy": { cat: "Action", anim: "pop", d: <><rect key="a" x="3.5" y="8.5" width="12" height="12" rx="4" />{p("M8.5 8.5V7a3.5 3.5 0 013.5-3.5h5A3.5 3.5 0 0120.5 7v5a3.5 3.5 0 01-3.5 3.5h-1.5", "b")}</> },
  "check": { cat: "Action", anim: "draw", d: p("M4.5 12.5l5 5 10-11") },
  "download": { cat: "Action", anim: "bob", d: <>{p("M12 3.5v11.5", "a")}{p("M7 10.5l5 5 5-5", "b")}{p("M4.5 20.5h15", "c")}</> },
  "upload": { cat: "Action", anim: "bob-up", d: <>{p("M12 15V3.5", "a")}{p("M7 8.5l5-5 5 5", "b")}{p("M4.5 20.5h15", "c")}</> },
  "mail": { cat: "Action", anim: "pop", d: <><rect key="a" x="2.5" y="5" width="19" height="14" rx="4.5" />{p("M4.5 8.5l6.4 4.6a2 2 0 002.2 0l6.4-4.6", "b")}</> },
  "link": { cat: "Action", anim: "join", d: <>{p("M10 14.5a4.5 4.5 0 006.4 0l2.6-2.6a4.5 4.5 0 00-6.4-6.4l-1.3 1.3", "a")}{p("M14 9.5a4.5 4.5 0 00-6.4 0L5 12.1a4.5 4.5 0 006.4 6.4l1.3-1.3", "b")}</> },
  "share": { cat: "Action", anim: "pop", d: <><circle key="a" cx="18" cy="5.5" r="2.8" /><circle key="b" cx="6" cy="12" r="2.8" /><circle key="c" cx="18" cy="18.5" r="2.8" />{p("M8.5 10.7l7-3.6", "d")}{p("M8.5 13.3l7 3.6", "e")}</> },
  "play": { cat: "Action", anim: "pop", d: p("M9.5 7.6a1.6 1.6 0 012.4-1.4l6.3 4.4a1.6 1.6 0 010 2.8l-6.3 4.4a1.6 1.6 0 01-2.4-1.4z") },
  "pause": { cat: "Action", anim: "stretch-x", d: <><rect key="a" x="7.5" y="5" width="3.6" height="14" rx="1.8" /><rect key="b" x="12.9" y="5" width="3.6" height="14" rx="1.8" /></> },

  /* ---------------- Feedback ---------------- */
  "alert": { cat: "Feedback", anim: "shake", d: <><circle key="a" cx="12" cy="12" r="9" />{p("M12 7.5v5", "b")}{p("M12 16.2h.01", "c")}</> },
  "info": { cat: "Feedback", anim: "pop", d: <><circle key="a" cx="12" cy="12" r="9" />{p("M12 11.5v5", "b")}{p("M12 7.8h.01", "c")}</> },
  "check-circle": { cat: "Feedback", anim: "draw", d: <><circle key="a" cx="12" cy="12" r="9" />{p("M8 12.2l2.8 2.8L16.2 9.3", "b")}</> },
  "loader": { cat: "Feedback", anim: "spin", d: p("M12 3a9 9 0 019 9") },
  "help": { cat: "Feedback", anim: "pop", d: <><circle key="a" cx="12" cy="12" r="9" />{p("M9.4 9.6a2.7 2.7 0 015.2.9c0 1.8-2.6 2.2-2.6 4", "b")}{p("M12 17.2h.01", "c")}</> },

  /* ---------------- Content ---------------- */
  "document": { cat: "Content", anim: "pop", d: <>{p("M13.5 3.2H8A3.5 3.5 0 004.5 6.7v10.6A3.5 3.5 0 008 20.8h8a3.5 3.5 0 003.5-3.5V9.2z", "a")}{p("M13.2 3.4v3.9A2.5 2.5 0 0015.7 9.8h3.6", "b")}</> },
  "image": { cat: "Content", anim: "pop", d: <><rect key="a" x="3.5" y="4.5" width="17" height="15" rx="4.5" /><circle key="b" cx="9" cy="10" r="1.8" />{p("M4.2 17.4l4.1-4a2.5 2.5 0 013.4 0l5.6 5.4", "c")}</> },
  "grid": { cat: "Content", anim: "stack", d: <><rect key="a" x="3.5" y="3.5" width="7.5" height="7.5" rx="2.6" /><rect key="b" x="13" y="3.5" width="7.5" height="7.5" rx="2.6" /><rect key="c" x="3.5" y="13" width="7.5" height="7.5" rx="2.6" /><rect key="d" x="13" y="13" width="7.5" height="7.5" rx="2.6" /></> },
  "list": { cat: "Content", anim: "stack", d: <>{p("M9.5 6.5h11", "a")}{p("M9.5 12h11", "b")}{p("M9.5 17.5h11", "c")}{p("M4.5 6.5h.01", "d")}{p("M4.5 12h.01", "e")}{p("M4.5 17.5h.01", "f")}</> },
  "calendar": { cat: "Content", anim: "pop", d: <><rect key="a" x="3.5" y="5.5" width="17" height="15" rx="4.5" />{p("M8 3.5v4", "b")}{p("M16 3.5v4", "c")}{p("M3.8 10.5h16.4", "d")}</> },
  "clock": { cat: "Content", anim: "tick", d: <><circle key="a" cx="12" cy="12" r="9" />{p("M12 7.2V12l3.2 2", "b")}</> },
  "bookmark": { cat: "Content", anim: "bob", d: p("M8 3.5h8A3.5 3.5 0 0119.5 7v12.4a1.6 1.6 0 01-2.5 1.3L13 18a1.8 1.8 0 00-2 0l-4 2.7a1.6 1.6 0 01-2.5-1.3V7A3.5 3.5 0 018 3.5z") },
  "chart": { cat: "Content", anim: "grow", d: <>{p("M4.5 20h15", "a")}<rect key="b" x="5.5" y="12" width="3.8" height="5" rx="1.9" /><rect key="c" x="10.6" y="8" width="3.8" height="9" rx="1.9" /><rect key="d" x="15.7" y="4.5" width="3.8" height="12.5" rx="1.9" /></> },

  /* ---------------- Domain ---------------- */
  "pulse": { cat: "Domain", anim: "draw", d: p("M3 12h3.5l2.6-6.2a1 1 0 011.9.1l3.4 11.9a1 1 0 001.9.1L18.5 12H21") },
  "sparkle": { cat: "Domain", anim: "twinkle", d: <>{p("M12 3.5c.8 4.1 2.4 5.7 6.5 6.5-4.1.8-5.7 2.4-6.5 6.5-.8-4.1-2.4-5.7-6.5-6.5 4.1-.8 5.7-2.4 6.5-6.5z", "a")}{p("M18 16.5c.4 1.9 1.1 2.6 3 3-1.9.4-2.6 1.1-3 3-.4-1.9-1.1-2.6-3-3 1.9-.4 2.6-1.1 3-3z", "b")}</> },
  "users": { cat: "Domain", anim: "pop", d: <><circle key="a" cx="9.5" cy="8.5" r="3.8" />{p("M3.5 20a6 6 0 0112 0", "b")}{p("M16 5.2a3.8 3.8 0 010 6.6", "c")}{p("M17.5 14.6a6 6 0 013 5.4", "d")}</> },
  "lightbulb": { cat: "Domain", anim: "twinkle", d: <>{p("M12 3.2a6.2 6.2 0 00-3.7 11.2 2.6 2.6 0 011 2V17h5.4v-.6c0-.8.4-1.6 1-2A6.2 6.2 0 0012 3.2z", "a")}{p("M10 20.3h4", "b")}</> },
  "layers": { cat: "Domain", anim: "stack", d: <>{p("M11.3 3.4l-7 3.7a1.3 1.3 0 000 2.3l7 3.7a1.6 1.6 0 001.4 0l7-3.7a1.3 1.3 0 000-2.3l-7-3.7a1.6 1.6 0 00-1.4 0z", "a")}{p("M3.8 14.3l7.5 4a1.6 1.6 0 001.4 0l7.5-4", "b")}</> },
  "target": { cat: "Domain", anim: "zoom", d: <><circle key="a" cx="12" cy="12" r="8.8" /><circle key="b" cx="12" cy="12" r="5" /><circle key="c" cx="12" cy="12" r="1.4" /></> },
  "shield": { cat: "Domain", anim: "pop", d: <>{p("M11.4 3.3L5.6 5.6A1.6 1.6 0 004.6 7.1v4.3c0 4.3 2.9 7.8 7 9.4a1.6 1.6 0 001 0c4.1-1.6 7-5.1 7-9.4V7.1a1.6 1.6 0 00-1-1.5l-5.8-2.3a1.6 1.6 0 00-1.2 0z", "a")}{p("M9.3 12.1l1.9 1.9 3.6-3.9", "b")}</> },
  "book": { cat: "Domain", anim: "pop", d: <>{p("M4.5 5.6A2.6 2.6 0 017.1 3h3.1A1.8 1.8 0 0112 4.8v14.4a1.8 1.8 0 00-1.8-1.8H7.1a2.6 2.6 0 01-2.6-2.6z", "a")}{p("M19.5 5.6A2.6 2.6 0 0016.9 3h-3.1A1.8 1.8 0 0012 4.8v14.4a1.8 1.8 0 011.8-1.8h3.1a2.6 2.6 0 002.6-2.6z", "b")}</> },
  "accessibility": { cat: "Domain", anim: "pop", d: <><circle key="a" cx="12" cy="5.2" r="2.2" />{p("M4.8 9.2c4.7 1.4 9.7 1.4 14.4 0", "b")}{p("M12 8.6v5.2", "c")}{p("M12 13.8l-2.6 6.6", "d")}{p("M12 13.8l2.6 6.6", "e")}</> },
};

export type IconName = keyof typeof ICONS;
export const ICON_NAMES = Object.keys(ICONS) as IconName[];

export function Icon({
  name,
  size = 24,
  anim,
  ...rest
}: { name: IconName; size?: IconSize; anim?: boolean } & Omit<SVGProps<SVGSVGElement>, "name">) {
  const def = ICONS[name];
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE[size]}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="ms-ico"
      data-anim={anim ? def.anim : undefined}
      {...rest}
    >
      {def.d}
    </svg>
  );
}
