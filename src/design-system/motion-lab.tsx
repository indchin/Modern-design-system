"use client";

import { useEffect, useRef, useState } from "react";
import { usePointerEffects } from "./use-media";

export function MotionLab() {
  const [menu, setMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(0);
  const fine = usePointerEffects();
  const area = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const mag = useRef<HTMLAnchorElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!fine || !area.current || !dot.current) return;
    const a = area.current, d = dot.current;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0, on = false;
    const loop = () => { x += (tx - x) * 0.15; y += (ty - y) * 0.15; d.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`; raf = requestAnimationFrame(loop); };
    const move = (e: PointerEvent) => { const r = a.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; if (!on) { x = tx; y = ty; on = true; raf = requestAnimationFrame(loop); } d.dataset.on = "1"; };
    const leave = () => { on = false; cancelAnimationFrame(raf); d.dataset.on = ""; };
    a.addEventListener("pointermove", move); a.addEventListener("pointerleave", leave);
    return () => { a.removeEventListener("pointermove", move); a.removeEventListener("pointerleave", leave); cancelAnimationFrame(raf); };
  }, [fine]);

  const magMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (!fine || !mag.current) return;
    const r = mag.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.25, dy = (e.clientY - (r.top + r.height / 2)) * 0.25;
    mag.current.style.transform = `translate(${Math.max(-8, Math.min(8, dx))}px,${Math.max(-8, Math.min(8, dy))}px)`;
  };
  const magLeave = () => { if (mag.current) mag.current.style.transform = ""; };

  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 1600); };

  return (
    <div className="ms-lab">
      <div className="ms-grid c3">
        <div className="ms-box"><span className="lab mute">Arrow nudge</span>
          <p><a className="ms-link" href="#motion">Discover <span className="arrow">→</span></a></p>
          <p><a className="ms-link" href="#motion">External <span className="arrow ne">↗</span></a></p></div>
        <div className="ms-box"><span className="lab mute">Underline draw</span>
          <p><a className="ms-draw" href="#motion">Read the case study</a></p></div>
        <div className="ms-box"><span className="lab mute">Menu ⇄ close</span>
          <p><button className="ms-burger" aria-pressed={menu} aria-label="Toggle menu" onClick={() => setMenu(!menu)}><i /><i /></button></p></div>
        <div className="ms-box"><span className="lab mute">Copy → check (spring)</span>
          <p><button className="btn ghost" onClick={copy}>{copied ? <span className="pop">✓ Copied</span> : "Copy email"}</button></p></div>
        <div className="ms-box"><span className="lab mute">Accordion plus</span>
          <p><button className="btn ghost" aria-expanded={open} onClick={() => setOpen(!open)}><span className="plus" data-open={open}>+</span> Details</button></p></div>
        <div className="ms-box"><span className="lab mute">Error shake (×2)</span>
          <p><button className="btn ghost" onClick={() => setErr(err + 1)}>Trigger</button></p>
          <div key={err} className={err ? "shake" : ""} style={{ display: "inline-flex", gap: 8, alignItems: "center" }}><span className="ms-chip">!</span><span>Enter a valid email.</span></div></div>
      </div>

      <h3 className="ms-sub">Pointer animation {fine ? "" : "(needs a mouse; shown static on touch / reduced-motion)"}</h3>
      <div className="ms-grid c2">
        <div ref={area} className="ms-area">
          <div ref={dot} className="ms-dot" data-label={label}><span>{label}</span></div>
          <p className="lab mute" style={{ margin: 0 }}>Cursor dot + label</p>
          <div className="row" style={{ marginTop: 16 }}>
            <button className="btn ghost" onPointerEnter={() => setLabel("Open")} onPointerLeave={() => setLabel("")}>Hover me</button>
            <a className="ms-draw" href="#motion" onPointerEnter={() => setLabel("View →")} onPointerLeave={() => setLabel("")}>Work row</a>
          </div>
        </div>
        <div className="ms-area" style={{ display: "grid", placeItems: "center" }}>
          <p className="lab mute" style={{ margin: "0 0 12px" }}>Magnetic primary CTA (≤ 8px)</p>
          <a ref={mag} className="btn ms-mag" href="#motion" onPointerMove={magMove} onPointerLeave={magLeave}>Say hello</a>
        </div>
      </div>
      {open && <div className="ms-box" style={{ marginTop: 16 }}>Accordion body: the plus rotates 45° into a ×, content fades in over --dur-fast.</div>}
    </div>
  );
}
