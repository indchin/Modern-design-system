/**
 * Modern illustration set — see MODERN-DESIGN-SYSTEM.md §7.
 *
 * Shared grammar with the icon set (§6): round caps and joins, no sharp
 * corners, outline always `deep`, fills always flat accents.
 *
 *  - `pathLength="1"` on every drawn path so the draw-on animation runs at the
 *    same rate whatever a path's real length is.
 *  - data-draw  → outline, drawn in order by --i
 *  - data-fill  → flat fill, fades in after the outline
 *  - A shape crossing another carries a thick `paper` stroke underneath, which
 *    knocks a 4px gap out of what it overlaps (§7.2, contour gap).
 */
export type IllMode = "filled" | "outline";

const tone = (mode: IllMode, c: string) => (mode === "filled" ? c : "var(--paper)");

/** Tier 1 — spot, 96px. One idea, one accent. */
export function SpotResearch({ mode = "filled" }: { mode?: IllMode }) {
  return (
    <svg viewBox="0 0 96 96" className="ms-ill" role="img" aria-label="Research: a document under a magnifier">
      <path className="ms-guide" pathLength="1" fill="none"
        d="M6 86C6 48 10 12 39 10c26-2 23 30 23 48 0 14 8 20 22 28" />
      <g strokeLinecap="round" strokeLinejoin="round" stroke="var(--deep)" strokeWidth="3" fill="none">
        <rect data-fill style={{ "--i": 0 } as React.CSSProperties} x="16" y="12" width="46" height="62" rx="12" fill={tone(mode, "var(--yellow)")} />
        <rect data-draw pathLength="1" style={{ "--i": 0 } as React.CSSProperties} x="16" y="12" width="46" height="62" rx="12" />
        <path data-draw pathLength="1" style={{ "--i": 1 } as React.CSSProperties} d="M27 29h24" />
        <path data-draw pathLength="1" style={{ "--i": 2 } as React.CSSProperties} d="M27 39h24" />
        <path data-draw pathLength="1" style={{ "--i": 3 } as React.CSSProperties} d="M27 49h13" />
        {/* contour gap: paper stroke under the lens knocks a hole in the document */}
        <circle cx="62" cy="58" r="19" stroke="var(--paper)" strokeWidth="11" />
        <circle data-fill style={{ "--i": 1 } as React.CSSProperties} cx="62" cy="58" r="19" fill={tone(mode, "var(--pink)")} />
        <circle data-draw pathLength="1" style={{ "--i": 4 } as React.CSSProperties} cx="62" cy="58" r="19" />
        <path data-draw pathLength="1" style={{ "--i": 5 } as React.CSSProperties} d="M76 72l8 8" strokeWidth="5" />
      </g>
    </svg>
  );
}

/** Tier 2 — feature, 240px. Two to four elements, two accents. */
export function FeatureVoice({ mode = "filled" }: { mode?: IllMode }) {
  return (
    <svg viewBox="0 0 240 180" className="ms-ill" role="img" aria-label="A voice platform: layered surfaces with a waveform">
      <path className="ms-guide" pathLength="1" fill="none"
        d="M10 160C40 150 30 60 90 44c56-15 120 2 128 40 7 33-18 60-42 62" />
      <g strokeLinecap="round" strokeLinejoin="round" stroke="var(--deep)" strokeWidth="3" fill="none">
        <rect data-fill style={{ "--i": 0 } as React.CSSProperties} x="58" y="22" width="150" height="92" rx="20" fill={tone(mode, "var(--pink)")} />
        <rect data-draw pathLength="1" style={{ "--i": 0 } as React.CSSProperties} x="58" y="22" width="150" height="92" rx="20" />
        <rect x="32" y="52" width="150" height="92" rx="20" stroke="var(--paper)" strokeWidth="11" />
        <rect data-fill style={{ "--i": 1 } as React.CSSProperties} x="32" y="52" width="150" height="92" rx="20" fill={tone(mode, "var(--yellow)")} />
        <rect data-draw pathLength="1" style={{ "--i": 1 } as React.CSSProperties} x="32" y="52" width="150" height="92" rx="20" />
        {[["58", "86", "24"], ["78", "74", "48"], ["98", "66", "64"], ["118", "78", "40"], ["138", "88", "20"]].map(([x, y, h], i) => (
          <path key={x} data-draw pathLength="1" className="ms-wave" style={{ "--i": 2 + i } as React.CSSProperties}
            d={`M${x} ${y}v${h}`} strokeWidth="9" />
        ))}
        <circle cx="196" cy="128" r="22" stroke="var(--paper)" strokeWidth="11" />
        <circle data-fill style={{ "--i": 2 } as React.CSSProperties} cx="196" cy="128" r="22" fill={tone(mode, "var(--green)")} />
        <circle data-draw pathLength="1" style={{ "--i": 7 } as React.CSSProperties} cx="196" cy="128" r="22" />
        <path data-draw pathLength="1" style={{ "--i": 8 } as React.CSSProperties} d="M187 128l6 6 12-13" />
      </g>
    </svg>
  );
}

/** Tier 3 — scene, full width. Max five elements, three accents, once per page. */
export function SceneJourney({ mode = "filled" }: { mode?: IllMode }) {
  const nodes: [number, string, string][] = [
    [60, "var(--paper)", "M-9 4a9 9 0 0118 0M0-5a5 5 0 110 10 5 5 0 010-10"],
    [170, "var(--yellow)", "M-7-8h10l4 4v12h-14z"],
    [280, "var(--pink)", "M-4-7l10 7-10 7z"],
    [390, "var(--green)", "M-8 1l6 6 11-13"],
  ];
  return (
    <svg viewBox="0 0 450 110" className="ms-ill" role="img" aria-label="A learning journey from sign-up to certification">
      <g strokeLinecap="round" strokeLinejoin="round" stroke="var(--deep)" strokeWidth="3" fill="none">
        <path data-draw className="ms-lead" pathLength="1" style={{ "--i": 0 } as React.CSSProperties} d="M60 55h330" strokeWidth="4" />
        {nodes.map(([cx, fill, glyph], i) => (
          <g key={cx}>
            <circle cx={cx} cy="55" r="26" stroke="var(--paper)" strokeWidth="12" />
            <circle data-fill style={{ "--i": i } as React.CSSProperties} cx={cx} cy="55" r="26" fill={mode === "filled" ? fill : "var(--paper)"} />
            <circle data-draw pathLength="1" style={{ "--i": 1 + i } as React.CSSProperties} cx={cx} cy="55" r="26" />
            <g transform={`translate(${cx} 55)`}>
              <path data-draw pathLength="1" style={{ "--i": 2 + i } as React.CSSProperties} d={glyph} strokeWidth="2.6" />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}
