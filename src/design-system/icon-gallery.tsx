"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, ICONS, ICON_NAMES, Icon, STROKE, type IconName, type IconSize } from "./icons";

const SIZES: IconSize[] = [16, 20, 24, 32, 48];

export function IconGallery() {
  const [q, setQ] = useState("");
  const [size, setSize] = useState<IconSize>(24);
  const [grid, setGrid] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const groups = useMemo(
    () =>
      CATEGORIES.map((cat) => ({
        cat,
        names: ICON_NAMES.filter(
          (n) => ICONS[n].cat === cat && n.toLowerCase().includes(q.trim().toLowerCase())
        ),
      })).filter((g) => g.names.length > 0),
    [q]
  );

  const copy = (n: IconName) => {
    navigator.clipboard?.writeText(`<Icon name="${n}" size={${size}} />`);
    setCopied(n);
    setTimeout(() => setCopied(null), 1400);
  };

  return (
    <div>
      <div className="ms-icobar">
        <label className="field" style={{ maxWidth: 260 }}>
          <span className="lab">Search {ICON_NAMES.length} icons</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="arrow, mail, chart…" />
        </label>
        <div>
          <span className="lab mute">Size</span>
          <div className="row" style={{ marginTop: 6 }}>
            {SIZES.map((s) => (
              <button key={s} className={`ms-seg${s === size ? " on" : ""}`} aria-pressed={s === size} onClick={() => setSize(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="lab mute">Geometry</span>
          <div className="row" style={{ marginTop: 6 }}>
            <button className={`ms-seg${grid ? " on" : ""}`} aria-pressed={grid} onClick={() => setGrid(!grid)}>
              24px grid
            </button>
          </div>
        </div>
        <p className="lab mute" style={{ margin: 0, alignSelf: "end" }}>
          Stroke {STROKE[size]} in viewBox · ~{(STROKE[size] * (size / 24)).toFixed(2)}px rendered · hover an icon for its motion
        </p>
      </div>

      {groups.map((g) => (
        <div key={g.cat}>
          <h4 className="ms-sub">{g.cat}</h4>
          <div className="ms-icogrid">
            {g.names.map((n) => (
              <button key={n} className={`ms-icocell${grid ? " grid" : ""}`} onClick={() => copy(n)} title={`Copy <Icon name="${n}" />`}>
                <span className="ms-icobox" style={{ width: size, height: size }}>
                  <Icon name={n} size={size} anim />
                </span>
                <span className="lab">{copied === n ? "copied ✓" : n}</span>
                <span className="lab mute ms-icoanim">{ICONS[n].anim}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      {groups.length === 0 && <p className="mute">No icon matches “{q}”.</p>}
    </div>
  );
}

/** Construction sheet — shows the rules an icon must satisfy. */
export function IconAnatomy() {
  const [name, setName] = useState<IconName>("mail");
  return (
    <div className="ms-grid c2">
      <div className="ms-anat">
        <svg viewBox="0 0 24 24" className="ms-anatsvg" aria-hidden>
          <defs>
            <pattern id="msg" width="1" height="1" patternUnits="userSpaceOnUse">
              <path d="M1 0V1M0 1H1" stroke="#A2A2A2" strokeWidth="0.06" fill="none" />
            </pattern>
          </defs>
          <rect width="24" height="24" fill="url(#msg)" />
          <rect x="2" y="2" width="20" height="20" fill="none" stroke="#FF640A" strokeWidth="0.25" strokeDasharray="1 .6" />
          <circle cx="12" cy="12" r="10" fill="none" stroke="#FF640A" strokeWidth="0.25" strokeDasharray="1 .6" />
          <g stroke="#101820" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {ICONS[name].d}
          </g>
        </svg>
        <div className="row" style={{ marginTop: 12 }}>
          {(["mail", "sparkle", "play", "chart", "shield", "accessibility"] as IconName[]).map((n) => (
            <button key={n} className={`ms-seg${n === name ? " on" : ""}`} aria-pressed={n === name} onClick={() => setName(n)}>
              {n}
            </button>
          ))}
        </div>
      </div>
      <table className="ms-spec">
        <thead><tr><th>Construction rule</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Canvas</td><td>24 × 24</td></tr>
          <tr><td>Live area (dashed)</td><td>20 × 20, 2px padding</td></tr>
          <tr><td>Key circle</td><td>ø 20</td></tr>
          <tr><td>Stroke</td><td>2 at 24px, optically scaled</td></tr>
          <tr><td>Caps / joins</td><td>round / round — no sharp edge anywhere</td></tr>
          <tr><td>Corner radius</td><td>≥ ⅓ of shorter side, min 2</td></tr>
          <tr><td>Tightest angle</td><td>60° — points become arcs</td></tr>
          <tr><td>Terminals</td><td>End on a whole or half unit</td></tr>
          <tr><td>Colour</td><td><code>currentColor</code> only</td></tr>
          <tr><td>Fill</td><td>None, except state chips</td></tr>
        </tbody>
      </table>
    </div>
  );
}

/** Icons in their real jobs. */
export function IconInUse() {
  return (
    <div className="ms-grid c3">
      <div className="ms-box">
        <span className="lab mute">In buttons — 20px, 8px gap</span>
        <div className="row" style={{ marginTop: 12 }}>
          <button className="btn ms-withico">Download <Icon name="download" size={20} anim /></button>
          <button className="btn ghost ms-withico"><Icon name="mail" size={20} anim /> Say hello</button>
        </div>
      </div>
      <div className="ms-box">
        <span className="lab mute">Icon-only — 44px target, aria-label</span>
        <div className="row" style={{ marginTop: 12 }}>
          {(["search", "share", "bookmark", "close"] as IconName[]).map((n) => (
            <button key={n} className="ms-iconbtn" aria-label={n}><Icon name={n} size={20} anim /></button>
          ))}
        </div>
      </div>
      <div className="ms-box">
        <span className="lab mute">Beside text — 16px, baseline aligned</span>
        <ul className="ms-icolist">
          <li><Icon name="check-circle" size={16} anim /> WCAG 2.2 AA verified</li>
          <li><Icon name="users" size={16} anim /> 17 research participants</li>
          <li><Icon name="clock" size={16} anim /> 2020 – 2026</li>
        </ul>
      </div>
    </div>
  );
}
