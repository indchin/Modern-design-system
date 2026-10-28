"use client";

import { useState } from "react";
import { Icon } from "./icons";
import { FeatureVoice, SceneJourney, SpotResearch, type IllMode } from "./illustrations";

const STYLES: [string, string][] = [
  ["draw", "Outline draws, then fills"],
  ["line", "One line travels; the form appears in its wake"],
  ["assemble", "Parts arrive from their own side and settle"],
  ["sweep", "Outline holds; fills wipe in"],
  ["trace", "A highlight segment runs the outline, continuously"],
];

export function IllustrationLab() {
  const [mode, setMode] = useState<IllMode>("filled");
  const [style, setStyle] = useState("line");
  const [run, setRun] = useState(0);
  const [loop, setLoop] = useState(true);

  return (
    <div>
      <div className="ms-icobar">
        <div>
          <span className="lab mute">Fill treatment</span>
          <div className="row" style={{ marginTop: 6 }}>
            {(["filled", "outline"] as IllMode[]).map((m) => (
              <button key={m} className={`ms-seg${m === mode ? " on" : ""}`} aria-pressed={m === mode} onClick={() => setMode(m)}>
                {m}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="lab mute">Animation style</span>
          <div className="row" style={{ marginTop: 6 }}>
            {STYLES.map(([k]) => (
              <button key={k} className={`ms-seg${k === style ? " on" : ""}`} aria-pressed={k === style}
                onClick={() => { setStyle(k); setRun(run + 1); }}>
                {k}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="lab mute">Ambient loop</span>
          <div className="row" style={{ marginTop: 6 }}>
            <button className={`ms-seg${loop ? " on" : ""}`} aria-pressed={loop} onClick={() => setLoop(!loop)}>
              waveform
            </button>
          </div>
        </div>
        <button className="btn ms-withico" onClick={() => setRun(run + 1)}>
          Replay <Icon name="loader" size={20} />
        </button>
        <p className="lab mute" style={{ margin: 0, alignSelf: "end" }}>
          {STYLES.find(([k]) => k === style)?.[1]}
        </p>
      </div>

      <div className="ms-illgrid" key={`${style}-${run}`} data-anim={style} data-loop={loop ? "" : undefined}>
        <figure className="ms-illcard">
          <div className="ms-illbox" style={{ maxWidth: 96 }}><SpotResearch mode={mode} /></div>
          <figcaption>
            <b>Spot · 48–96px</b>
            <span className="lab mute">One idea · one accent · icon grammar scaled up</span>
          </figcaption>
        </figure>
        <figure className="ms-illcard">
          <div className="ms-illbox" style={{ maxWidth: 240 }}><FeatureVoice mode={mode} /></div>
          <figcaption>
            <b>Feature · 160–320px</b>
            <span className="lab mute">Two to four elements · two accents · empty states, value blocks</span>
          </figcaption>
        </figure>
        <figure className="ms-illcard ms-illwide">
          <div className="ms-illbox"><SceneJourney mode={mode} /></div>
          <figcaption>
            <b>Scene · full width</b>
            <span className="lab mute">Five elements maximum · three accents · once per page</span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

/**
 * Line unfolds into form: one flat baseline interpolates into the shape.
 * The two `d` values carry identical command counts, which is the only way
 * path interpolation stays stable — see §7.4.
 */
export function UnfoldLab() {
  const [run, setRun] = useState(0);
  const flat = "M20 60C20 60 60 60 100 60C140 60 180 60 180 60C180 60 180 60 180 60C180 60 20 60 20 60Z";
  const form = "M20 86C20 46 36 20 70 20C118 20 132 52 160 52C176 52 180 44 180 36C180 70 150 92 108 92C64 92 52 86 20 86Z";
  return (
    <div>
      <div className="row" style={{ marginBottom: 12 }}>
        <button className="btn ms-withico" onClick={() => setRun(run + 1)}>Replay unfold <Icon name="loader" size={20} /></button>
        <span className="lab mute">Line → form · identical command counts · 900ms</span>
      </div>
      <div className="ms-box" style={{ display: "grid", placeItems: "center" }}>
        <svg viewBox="0 0 200 110" className="ms-unfold" key={run} role="img" aria-label="A line unfolding into a shape">
          <path d={flat} fill="var(--yellow)" stroke="var(--deep)" strokeWidth="3" strokeLinejoin="round">
            <animate attributeName="d" values={`${flat};${form}`} dur="0.9s" fill="freeze" calcMode="spline" keySplines="0.2 0.7 0.2 1" />
          </path>
        </svg>
      </div>
    </div>
  );
}

/** The banned treatments, drawn rather than described. */
export function IllustrationDonts() {
  const items: [string, string, string][] = [
    ["bad-grad", "Gradient fill", "Flat accents only — a gradient has no token"],
    ["bad-shadow", "Drop shadow", "Depth comes from overlap and the contour gap"],
    ["bad-stroke", "Coloured outline", "The deep outline is what holds the family together"],
    ["bad-sharp", "Sharp corners", "Same round rule as the icons — no exceptions"],
  ];
  return (
    <div className="ms-grid c4">
      {items.map(([cls, title, why]) => (
        <div className="ms-box ms-dont" key={cls}>
          <div className={`ms-illbox ms-badill ${cls}`} style={{ maxWidth: 96 }}>
            <svg viewBox="0 0 96 96" className="ms-ill" aria-hidden="true">
              <defs>
                <linearGradient id="msbad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FEBE1E" />
                  <stop offset="100%" stopColor="#FF640A" />
                </linearGradient>
              </defs>
              <g strokeLinecap="round" strokeLinejoin="round" stroke="var(--deep)" strokeWidth="3">
                <rect className="bad-shape" x="16" y="12" width="46" height="62" rx="12" fill="var(--yellow)" />
                <circle cx="62" cy="58" r="19" stroke="var(--paper)" strokeWidth="11" fill="none" />
                <circle className="bad-shape" cx="62" cy="58" r="19" fill="var(--pink)" />
                <path d="M76 72l8 8" strokeWidth="5" fill="none" />
              </g>
            </svg>
          </div>
          <b style={{ display: "block", marginTop: 10 }}>✘ {title}</b>
          <span className="mute" style={{ fontSize: 13 }}>{why}</span>
        </div>
      ))}
    </div>
  );
}
