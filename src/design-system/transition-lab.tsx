"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Icon } from "./icons";
import { useMedia } from "./use-media";

/** startViewTransition is not in lib.dom yet — narrow it rather than reaching for any. */
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> };
};

/** Runs an update inside a view transition where supported, plainly where not. */
function withViewTransition(update: () => void, enabled: boolean) {
  const doc = document as ViewTransitionDocument;
  if (!enabled || typeof doc.startViewTransition !== "function") {
    update();
    return;
  }
  doc.startViewTransition(() => flushSync(update));
}

const CARDS = [
  { id: "one", title: "Case study one", cat: "Category one", tone: "var(--pink)" },
  { id: "two", title: "Case study two", cat: "Category two", tone: "var(--yellow)" },
  { id: "three", title: "Case study three", cat: "Category three", tone: "var(--green)" },
];

/** Shared-element transition: a card morphs into a detail hero. */
export function SharedElementLab() {
  const calm = useMedia("(prefers-reduced-motion: reduce)");
  const [open, setOpen] = useState<string | null>(null);

  const go = (id: string | null) => withViewTransition(() => setOpen(id), !calm);
  const active = CARDS.find((c) => c.id === open);

  return (
    <div>
      <p className="lab mute ms-cap" style={{ marginBottom: 12 }}>
        <span className="cap-calm">Reduced motion on — the state changes instantly, no morph</span>
        <span className="cap-vt">View Transitions API supported — the cover morphs into the hero</span>
        <span className="cap-novt">No View Transitions API here — falling back to a cross-fade</span>
      </p>

      <div className="ms-vtstage">
        {!active ? (
          <div className="ms-vtgrid">
            {CARDS.map((c) => (
              <button key={c.id} className="ms-vtcard" onClick={() => go(c.id)}>
                <span
                  className="ms-vtcover"
                  style={{ background: c.tone, viewTransitionName: calm ? undefined : `cover-${c.id}` }}
                />
                <span className="lab mute">{c.cat}</span>
                <b>{c.title}</b>
                <span className="lab ms-withico">Open <Icon name="arrow-right" size={16} /></span>
              </button>
            ))}
          </div>
        ) : (
          <div className="ms-vtdetail">
            <span
              className="ms-vthero"
              style={{ background: active.tone, viewTransitionName: calm ? undefined : `cover-${active.id}` }}
            />
            <span className="lab mute">{active.cat}</span>
            <h4 className="up">{active.title}</h4>
            <p className="mute">
              The cover is the same element across both states. Only its size and position change, so the
              transition reads as one object moving rather than two screens swapping.
            </p>
            <button className="btn ghost ms-withico" onClick={() => go(null)}>
              <Icon name="arrow-left" size={20} anim /> Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/** Overlay menu: clip-path wipe, focus moved in and restored, Esc to close. */
export function OverlayLab() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const first = useRef<HTMLAnchorElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggle.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <div className="ms-ovframe">
      <div className="ms-ovbar">
        <b>Chinmay Sharma</b>
        <button ref={toggle} className="ms-seg" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {/* inert keeps the hidden links out of the tab order while the overlay is closed */}
      <div className={`ms-ov${open ? " open" : ""}`} inert={!open}>
        {["Work", "About", "Contact"].map((t, i) => (
          <a
            key={t}
            ref={i === 0 ? first : undefined}
            href="#transitions"
            onClick={(e) => { e.preventDefault(); close(); }}
            style={{ "--i": i } as React.CSSProperties}
          >
            <span className="lab mute">0{i + 1}</span> {t}
          </a>
        ))}
      </div>
    </div>
  );
}

/** First-visit loader — the one blocking animation the system allows. */
export function LoaderLab() {
  const calm = useMedia("(prefers-reduced-motion: reduce)");
  const [run, setRun] = useState(0);
  const [n, setN] = useState(100);
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (run === 0 || calm) return;
    let v = 0;
    const id = setInterval(() => {
      v = Math.min(100, v + Math.ceil(Math.random() * 12));
      setN(v);
      if (v >= 100) {
        clearInterval(id);
        setTimeout(() => setDone(true), 200);
      }
    }, 70);
    return () => clearInterval(id);
  }, [run, calm]);

  const replay = () => {
    setN(0);
    setDone(false);
    setRun(run + 1);
  };

  return (
    <div>
      <div className="row" style={{ marginBottom: 12 }}>
        <button className="btn" onClick={replay} disabled={!done}>Replay loader</button>
        <span className="lab mute ms-cap">
          <span className="cap-calm">Reduced motion on — the loader never runs</span>
          <span className="cap-motion">First visit only · ≤ 1.2s · skipped when cached</span>
        </span>
      </div>
      <div className="ms-loaderframe">
        <div className="ms-loadercontent">
          <span className="lab mute">Page content</span>
          <p className="up h" style={{ margin: "8px 0 0" }}>Evidence over assumption.</p>
        </div>
        <div className={`ms-loader${done ? " done" : ""}`} aria-hidden={done}>
          <span className="lab">Loading</span>
          <b>{n}%</b>
        </div>
      </div>
    </div>
  );
}

/** Scroll-driven reveal — CSS animation-timeline, no observer, off the main thread. */
export function ScrollDrivenLab() {
  return (
    <div>
      <p className="lab mute" style={{ marginBottom: 12 }}>
        Scroll inside the frame. Where <code>animation-timeline: view()</code> is unsupported, the blocks simply
        render in their final state.
      </p>
      <div className="ms-scroller">
        {["Discovery", "Research", "Journeys", "Decisions", "Rebrand", "Outcomes"].map((t, i) => (
          <div className="ms-sd" key={t}>
            <span className="lab mute">0{i + 1}</span>
            <b>{t}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

const PAGES = [
  { eyebrow: "Index", title: "Selected work", body: "Four case studies, newest first.", tone: "var(--paper)" },
  { eyebrow: "Case study", title: "Case study one", body: "A sentence that summarises the work.", tone: "var(--yellow)" },
];

const T_STYLES: [string, string, string][] = [
  ["fade", "Cross-fade", "The default. Never moves content"],
  ["circle", "Circle reveal", "Opens from the click point — origin carries meaning"],
  ["cover", "Cover", "New view slides over the old. Forward only"],
  ["push", "Push", "Directional. Reverses on back"],
  ["turn", "Page turn", "Paginated content only — see the caveat"],
];

/** Transition styles, run between two stand-in pages. */
export function TransitionStyleLab() {
  const calm = useMedia("(prefers-reduced-motion: reduce)");
  const [style, setStyle] = useState("circle");
  const [page, setPage] = useState(0);
  const [run, setRun] = useState(0);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const navigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const stage = e.currentTarget.closest(".ms-tframe")?.querySelector(".ms-tstage");
    if (stage) {
      const r = stage.getBoundingClientRect();
      setOrigin({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    }
    setPage((p) => 1 - p);
    setRun((r) => r + 1);
  };

  const prev = PAGES[1 - page];
  const current = PAGES[page];

  return (
    <div className="ms-tframe">
      <div className="ms-icobar">
        <div>
          <span className="lab mute">Style</span>
          <div className="row" style={{ marginTop: 6 }}>
            {T_STYLES.map(([k, label]) => (
              <button key={k} className={`ms-seg${k === style ? " on" : ""}`} aria-pressed={k === style} onClick={() => setStyle(k)}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <button className="btn ms-withico" onClick={navigate}>
          Navigate <Icon name="arrow-right" size={20} anim />
        </button>
        <p className="lab mute" style={{ margin: 0, alignSelf: "end" }}>
          {calm ? "Reduced motion on — the view swaps instantly" : T_STYLES.find(([k]) => k === style)?.[2]}
        </p>
      </div>

      <div
        className="ms-tstage"
        data-style={calm ? "none" : style}
        style={{ "--ox": `${origin.x}%`, "--oy": `${origin.y}%` } as React.CSSProperties}
      >
        <div className="ms-tpage ms-tprev" style={{ background: prev.tone }} aria-hidden="true">
          <span className="lab mute">{prev.eyebrow}</span>
          <h4 className="up">{prev.title}</h4>
          <p className="mute">{prev.body}</p>
        </div>
        <div className="ms-tpage ms-tnew" key={run} style={{ background: current.tone }}>
          <span className="lab mute">{current.eyebrow}</span>
          <h4 className="up">{current.title}</h4>
          <p className="mute">{current.body}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ speed */

/**
 * The house duration formula — MODERN-DESIGN-SYSTEM.md §9.6.
 *
 *   base     280ms + 340ms × (distance ÷ viewport diagonal)
 *   clamp    350–700ms
 *   small    × .85 below 600px (the distance is shorter, so the time is too)
 *   repeat   × .75 once the visitor has navigated before
 *
 * Reachable range: 223ms (phone, repeat, short move) to 620ms. Below ~25% of
 * the diagonal the 350ms clamp dominates, so a small move should not use this
 * formula at all — use the 200ms cross-fade instead. *
 * `distance` is how far the moving thing travels: the shared element's centre
 * to its destination, or the circle's radius. A full-diagonal reveal lands at
 * 620ms, which is where the spec's circle default comes from.
 */
export function transitionMs({ distance, diagonal, width, repeat }: { distance: number; diagonal: number; width: number; repeat: boolean }) {
  let ms = 280 + 340 * Math.min(1, Math.max(0, distance / diagonal));
  ms = Math.min(700, Math.max(350, ms));
  if (width < 600) ms *= 0.85;
  if (repeat) ms *= 0.75;
  return Math.round(ms);
}

type Zone = { label: string; note: string; icon: "check-circle" | "info" | "alert"; cls: string };

/** Perception bands, after Nielsen's 0.1s / 1s limits. Glyph + word, never colour alone. */
function zoneOf(ms: number): Zone {
  if (ms <= 100) return { label: "Instant", note: "Reads as no transition — fine for a press, useless for a route change", icon: "info", cls: "ms-c-s-plan" };
  if (ms <= 300) return { label: "Responsive", note: "Feels immediate. The default band for route changes", icon: "check-circle", cls: "ms-c-s-done" };
  if (ms <= 700) return { label: "Expressive", note: "Earns its time only if the motion carries meaning", icon: "info", cls: "ms-c-s-prog" };
  return { label: ms > 1000 ? "Blocking" : "Too slow", note: ms > 1000 ? "Over a second — this needs a progress indicator, not an animation" : "Past the 700ms ceiling — people start waiting for it", icon: "alert", cls: "ms-c-s-found" };
}

const SPEED_STYLES: [string, string][] = [["fade", "Cross-fade"], ["circle", "Circle"], ["cover", "Cover"], ["push", "Push"]];

export function SpeedLab() {
  const calm = useMedia("(prefers-reduced-motion: reduce)");
  const [style, setStyle] = useState("cover");
  const [ms, setMs] = useState(520);
  const [page, setPage] = useState(0);
  const [run, setRun] = useState(0);
  const [dist, setDist] = useState(45);
  const [repeat, setRepeat] = useState(false);
  const [narrow, setNarrow] = useState(false);

  const zone = zoneOf(ms);
  const computed = transitionMs({ distance: dist, diagonal: 100, width: narrow ? 480 : 1280, repeat });
  const replay = () => { setPage((p) => 1 - p); setRun((r) => r + 1); };
  const cur = PAGES[page];
  const prev = PAGES[1 - page];

  return (
    <div className="ms-spd">
      <div className="ms-icobar">
        <div>
          <span className="lab mute">Style</span>
          <div className="row" style={{ marginTop: 6 }}>
            {SPEED_STYLES.map(([k, label]) => (
              <button key={k} className={`ms-seg${k === style ? " on" : ""}`} aria-pressed={k === style} onClick={() => setStyle(k)}>{label}</button>
            ))}
          </div>
        </div>
        <label style={{ display: "grid", gap: 6 }}>
          <span className="lab mute">Duration</span>
          <input type="range" min={50} max={1200} step={10} value={ms} onChange={(e) => setMs(Number(e.target.value))} className="ms-range" style={{ width: 220 }} aria-valuetext={`${ms} milliseconds, ${zone.label}`} />
        </label>
        <button className="btn ms-withico" onClick={replay}>Replay <Icon name="arrow-right" size={20} anim /></button>
      </div>

      <div className="ms-spdread">
        <b>{ms}ms</b>
        <span className={`ms-c-status lab ${zone.cls}`}><Icon name={zone.icon} size={16} /> {zone.label}</span>
        <span className="mute" style={{ fontSize: 14, maxWidth: "40em" }}>{zone.note}</span>
      </div>

      <div>
        <div className="ms-spdtrack" role="img" aria-label={`Duration ${ms} milliseconds, in the ${zone.label} band`}>
          <span className="ms-spdzone ms-spdz-1">Instant</span>
          <span className="ms-spdzone ms-spdz-2">Responsive</span>
          <span className="ms-spdzone ms-spdz-3">Expressive</span>
          <span className="ms-spdzone ms-spdz-4">Too slow</span>
          <span className="ms-spdmark" style={{ left: `${Math.min(100, (ms / 1000) * 100)}%` }} />
        </div>
        <div className="ms-spdscale lab mute" style={{ marginTop: 6 }}><span>0</span><span>100</span><span>300</span><span>700</span><span>1000ms+</span></div>
      </div>

      <div
        className="ms-tstage"
        data-style={calm ? "none" : style}
        style={{ "--tdur": `${ms}ms`, "--ox": "50%", "--oy": "50%" } as React.CSSProperties}
      >
        <div className="ms-tpage ms-tprev" style={{ background: prev.tone }} aria-hidden="true">
          <span className="lab mute">{prev.eyebrow}</span><h4 className="up">{prev.title}</h4><p className="mute">{prev.body}</p>
        </div>
        <div className="ms-tpage ms-tnew" key={run} style={{ background: cur.tone }}>
          <span className="lab mute">{cur.eyebrow}</span><h4 className="up">{cur.title}</h4><p className="mute">{cur.body}</p>
        </div>
      </div>

      <div className="ms-box">
        <span className="lab mute">Duration calculator — the house formula</span>
        <div className="ms-spdcalc" style={{ marginTop: 12 }}>
          <label style={{ display: "grid", gap: 6 }}>
            <span className="lab">Distance travelled: {dist}% of the viewport diagonal</span>
            <input type="range" min={5} max={100} value={dist} onChange={(e) => setDist(Number(e.target.value))} className="ms-range" style={{ width: "100%" }} />
          </label>
          <b style={{ fontSize: 32, letterSpacing: "-.04em", fontVariantNumeric: "tabular-nums" }}>{computed}ms</b>
        </div>
        <div className="row" style={{ marginTop: 12 }}>
          <button className={`ms-seg${narrow ? " on" : ""}`} aria-pressed={narrow} onClick={() => setNarrow(!narrow)}>Phone width (× .85)</button>
          <button className={`ms-seg${repeat ? " on" : ""}`} aria-pressed={repeat} onClick={() => setRepeat(!repeat)}>Repeat visit (× .75)</button>
          <button className="ms-seg" onClick={() => setMs(computed)}>Use {computed}ms above</button>
        </div>
      </div>
    </div>
  );
}
