"use client";

import { useState } from "react";
import { Icon } from "./icons";

const SPACE = [
  [4, "space-1", "Icon ↔ label, tag padding"],
  [8, "space-2", "Related controls, chip gap"],
  [12, "space-3", "Button row gap"],
  [16, "space-4", "Paragraph, card gap"],
  [24, "space-5", "Card interior (compact)"],
  [32, "space-6", "Subsection"],
  [48, "space-7", "Card interior (roomy)"],
  [64, "space-8", "Heading → content (desktop)"],
  [96, "space-9", "Section (tablet)"],
  [120, "space-10", "Section (desktop max)"],
] as const;

/** 12-column grid overlay over a real pattern. */
export function GridLab() {
  const [on, setOn] = useState(true);
  return (
    <div>
      <div className="row" style={{ marginBottom: 16 }}>
        <button className={`ms-seg${on ? " on" : ""}`} aria-pressed={on} onClick={() => setOn(!on)}>
          Column overlay
        </button>
        <span className="lab mute">12 columns · 24px gutter · 1240px max · clamp(20,4vw,48) margin</span>
      </div>
      <div className={`ms-gridlab${on ? " on" : ""}`}>
        <div className="ms-cols" aria-hidden>{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>
        <div className="ms-gridcontent">
          <div className="ms-demo-hero">
            <span className="lab mute">Spans 1–12</span>
            <p className="up h" style={{ margin: "6px 0 0" }}>Evidence over assumption.</p>
          </div>
          <div className="ms-demo-a"><span className="lab mute">1–7 · lead</span></div>
          <div className="ms-demo-b"><span className="lab mute">8–12 · meta</span></div>
          <div className="ms-demo-c"><span className="lab mute">1–2</span></div>
          <div className="ms-demo-d"><span className="lab mute">3–7 · text</span></div>
          <div className="ms-demo-e"><span className="lab mute">8–12 · image</span></div>
        </div>
      </div>
      <table className="ms-spec" style={{ marginTop: 24 }}>
        <thead><tr><th>Pattern</th><th>Desktop columns</th><th>Tablet</th><th>Mobile</th></tr></thead>
        <tbody>
          <tr><td>Hero statement</td><td>1–12</td><td>1–12</td><td>1–12</td></tr>
          <tr><td>Intro (two-up)</td><td>1–6 / 7–12</td><td>1–6 / 7–12</td><td>stack</td></tr>
          <tr><td>Work row</td><td>1 / 2–6 / 7–12</td><td>1 / 2–12 / image below</td><td>stack</td></tr>
          <tr><td>Values grid</td><td>2 × 2</td><td>2 × 2</td><td>1 × 4</td></tr>
          <tr><td>Timeline row</td><td>1–3 / 4–12</td><td>1–3 / 4–12</td><td>stack</td></tr>
          <tr><td>Stat tiles</td><td>3-up</td><td>3-up</td><td>1-up</td></tr>
          <tr><td>Swatch grid</td><td>5-up</td><td>2-up</td><td>2-up</td></tr>
        </tbody>
      </table>
    </div>
  );
}

export function SpacingLab() {
  return (
    <table className="ms-spec ms-spacetable">
      <thead><tr><th>px</th><th>Token</th><th>Scale</th><th>Used for</th></tr></thead>
      <tbody>
        {SPACE.map(([px, token, use]) => (
          <tr key={token}>
            <td><b>{px}</b></td>
            <td><code>--{token}</code></td>
            <td><i className="ms-spacebar" style={{ width: px }} /></td>
            <td className="mute">{use}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const WIDTHS = [320, 375, 768, 1024, 1440];

/**
 * Responsive lab — the frame resizes and the pattern inside reflows by
 * CONTAINER width (CSS container queries), so it behaves exactly as it would
 * at that viewport without resizing the browser.
 */
export function ResponsiveLab() {
  const [w, setW] = useState(1024);
  return (
    <div>
      <div className="row" style={{ marginBottom: 16 }}>
        {WIDTHS.map((x) => (
          <button key={x} className={`ms-seg${x === w ? " on" : ""}`} aria-pressed={x === w} onClick={() => setW(x)}>
            {x}px
          </button>
        ))}
        <label className="row" style={{ gap: 8 }}>
          <span className="lab mute">Drag</span>
          <input type="range" min={320} max={1440} step={4} value={w} onChange={(e) => setW(Number(e.target.value))} className="ms-range" />
          <span className="lab">{w}px</span>
        </label>
      </div>

      <div className="ms-viewport">
        <div className="ms-screen" style={{ width: w }}>
          <div className="ms-mini">
            <header className="ms-mininav">
              <b>Chinmay Sharma</b>
              <nav className="ms-mininav-links"><a href="#layout">Work</a><a href="#layout">About</a><a href="#layout">Contact</a></nav>
              <button className="ms-iconbtn ms-minimenu" aria-label="Menu"><Icon name="menu" size={20} /></button>
            </header>

            <h3 className="ms-minih up">Evidence over assumption.</h3>

            <div className="ms-miniintro">
              <p>Lead UX and AI product designer. Ten years in healthcare and ed-tech.</p>
              <p className="mute">Research first, polish after. AI is a material; judgement owns the outcome.</p>
            </div>

            <div className="ms-minirow">
              <span className="lab mute ms-mininum">01</span>
              <div>
                <span className="lab mute">Healthcare · EdTech</span>
                <h4 className="up">Case study one</h4>
                <p className="mute">A sentence that summarises the work.</p>
                <span className="lab ms-minilink">Discover <Icon name="arrow-right" size={16} /></span>
              </div>
              <div className="ms-miniimg" aria-hidden />
            </div>

            <div className="ms-ministats">
              <div><b>10</b><span className="lab mute">Years</span></div>
              <div><b>17</b><span className="lab mute">Participants</span></div>
              <div><b>6</b><span className="lab mute">Products</span></div>
            </div>

            <div className="ms-minicta">
              <h4 className="up">Got a hard problem?</h4>
              <div className="ms-minibtns">
                <span className="btn">Say hello</span>
                <span className="btn ghost">Résumé</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <table className="ms-spec" style={{ marginTop: 24 }}>
        <thead><tr><th>Width</th><th>Container</th><th>What changes</th></tr></thead>
        <tbody>
          <tr><td>320–424</td><td>gutter 20</td><td>Display XL floors at 52px; buttons full-width; stats 1-up; image above text</td></tr>
          <tr><td>425–599 ◆</td><td>gutter 20</td><td>Buttons inline again; tags wrap to 2 rows</td></tr>
          <tr><td>600–767 ◆</td><td>gutter 24</td><td>Stats 3-up; intro still stacked</td></tr>
          <tr><td>768–819 ◆</td><td>gutter 32</td><td>Nav links replace the Menu button; swatches 2 → 3-up</td></tr>
          <tr><td>820–1023</td><td>fluid</td><td>Multi-column patterns return: intro 2-up, work row 3-column</td></tr>
          <tr><td>1024–1439 ◆</td><td>fluid</td><td>Full layouts; pointer effects eligible</td></tr>
          <tr><td>≥ 1440</td><td>1240 fixed</td><td>Container locks; margins grow; type stops scaling</td></tr>
        </tbody>
      </table>
    </div>
  );
}
