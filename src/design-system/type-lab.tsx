"use client";

import { useState } from "react";
import { Icon } from "./icons";
import { useMedia } from "./use-media";

type Split = "line" | "word" | "letter";

const STAGGER: Record<Split, number> = { line: 80, word: 40, letter: 25 };

/** Hover styles for display type — §9.8. */
const LETTER_STYLES: [string, string, string][] = [
  ["jump", "Jump", "4px lift — the default"],
  ["wave", "Wave", "continuous while hovered"],
  ["swirl", "Swirl", "rotate and scale, ≤ 12°"],
  ["flip", "Flip", "rotateX, one axis only"],
  ["weight", "Weight", "variable font axis, no layout shift"],
  ["stretch", "Stretch", "scaleY from the baseline"],
];

/**
 * Splits text for animation while keeping it readable to assistive tech:
 * the container carries the real string, every fragment is aria-hidden.
 * Under reduced motion nothing is split at all — see §9.8.
 */
function SplitText({
  text,
  split,
  className = "",
  run,
}: {
  text: string;
  split: Split;
  className?: string;
  run: number;
}) {
  const calm = useMedia("(prefers-reduced-motion: reduce)");
  if (calm) return <span className={className}>{text}</span>;

  const lines = text.split("\n");
  let i = 0;

  return (
    <span className={`ms-split ${className}`} aria-label={text} key={run} data-split={split}>
      {lines.map((line, li) => (
        <span className="ms-line" key={li} aria-hidden="true">
          {split === "line" ? (
            <span className="ms-frag" style={{ "--i": i++ } as React.CSSProperties}>{line}</span>
          ) : split === "word" ? (
            line.split(" ").map((w, wi) => (
              <span className="ms-frag" key={wi} style={{ "--i": i++ } as React.CSSProperties}>
                {w}
                {wi < line.split(" ").length - 1 ? " " : ""}
              </span>
            ))
          ) : (
            line.split("").map((ch, ci) => (
              <span className="ms-frag" key={ci} style={{ "--i": i++ } as React.CSSProperties}>
                {ch === " " ? " " : ch}
              </span>
            ))
          )}
        </span>
      ))}
    </span>
  );
}

export function TypeLab() {
  const [split, setSplit] = useState<Split>("line");
  const [run, setRun] = useState(0);
  const calm = useMedia("(prefers-reduced-motion: reduce)");

  return (
    <div>
      <div className="ms-icobar">
        <div>
          <span className="lab mute">Split level</span>
          <div className="row" style={{ marginTop: 6 }}>
            {(["line", "word", "letter"] as Split[]).map((s) => (
              <button key={s} className={`ms-seg${s === split ? " on" : ""}`} aria-pressed={s === split} onClick={() => { setSplit(s); setRun(run + 1); }}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <button className="btn ms-withico" onClick={() => setRun(run + 1)}>
          Replay <Icon name="loader" size={20} />
        </button>
        <p className="lab mute ms-cap" style={{ margin: 0, alignSelf: "end" }}>
          <span className="cap-calm">Reduced motion on — text renders whole, never split</span>
          <span className="cap-motion">{STAGGER[split]}ms stagger · mask rise · --dur-slow · --ease-out</span>
        </p>
      </div>

      <div className="ms-typestage" style={{ "--stg": `${STAGGER[split]}ms` } as React.CSSProperties}>
        <SplitText text={"Evidence over\nassumption."} split={split} className="up l" run={run} />
      </div>

      <div className="ms-grid c3" style={{ marginTop: 24 }}>
        <div className="ms-box">
          <span className="lab mute">Line — the default</span>
          <p className="mute" style={{ fontSize: 14, marginTop: 10 }}>
            Each line rises out of a clipping mask. Reads as one gesture. Use for every headline over three words,
            and for any text a person must actually read.
          </p>
        </div>
        <div className="ms-box">
          <span className="lab mute">Word — leads only</span>
          <p className="mute" style={{ fontSize: 14, marginTop: 10 }}>
            Acceptable for a lead paragraph of one or two sentences. Never for body copy: the eye cannot scan text
            that is still assembling.
          </p>
        </div>
        <div className="ms-box ms-dont">
          <span className="lab mute">Letter — three words maximum</span>
          <p className="mute" style={{ fontSize: 14, marginTop: 10 }}>
            Display only, and only where the word is the point — a hero name, a single CTA. At 25ms a ten-letter
            word already costs 250ms before the last letter lands.
          </p>
        </div>
      </div>

      <h4 className="ms-sub">Hover — per-letter styles, display links only</h4>
      <p className="mute" style={{ marginTop: 0 }}>
        All six stagger by 20ms and fire on focus as well as hover. None of them may carry information, and none
        belongs on body text, buttons or anything under 18px.
      </p>
      <div className="ms-letterstyles">
        {LETTER_STYLES.map(([k, label, note]) => (
          <div key={k}>
            <a className="ms-hoverletters" data-letter={k} href="#type" aria-label={label}>
              {label.split("").map((c, i) => (
                <span key={i} aria-hidden="true" style={{ "--i": i } as React.CSSProperties}>{c}</span>
              ))}
            </a>
            <span className="lab mute">{k} · {note}</span>
          </div>
        ))}
      </div>

      <h4 className="ms-sub">Counter — the real number is always in the DOM</h4>
      <div className="ms-grid c3">
        {[["10", "Years"], ["17", "Participants"], ["45", "Icons"]].map(([n, l]) => (
          <div className="ms-stat" key={l}>
            <b className="ms-count" key={`${n}-${run}`} data-calm={calm ? "1" : undefined}>{n}</b>
            <span className="lab mute">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
