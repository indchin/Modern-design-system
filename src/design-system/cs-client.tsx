"use client";

/** Interactive portfolio and case-study components — §10b–§10c. */
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "./icons";

/* ------------------------------------------------------------------ tabs */

/**
 * Roving-tabindex tabs (WAI-ARIA tabs pattern): one tab stop, arrows move,
 * Home/End jump. Panels stay in the DOM so deep links and find-in-page work.
 */
export function CsTabs({ tabs }: { tabs: { id: string; label: string; body: React.ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  const go = (i: number) => {
    const next = (i + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
    else if (e.key === "Home") { e.preventDefault(); go(0); }
    else if (e.key === "End") { e.preventDefault(); go(tabs.length - 1); }
  };

  return (
    <div className="ms-c-tabs">
      <div role="tablist" aria-label="Case study sections" className="ms-c-tablist">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { refs.current[i] = el; }}
            role="tab"
            id={`${uid}-t-${t.id}`}
            aria-selected={i === active}
            aria-controls={`${uid}-p-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className="lab">{String(i + 1).padStart(2, "0")}</span> {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.id} role="tabpanel" id={`${uid}-p-${t.id}`} aria-labelledby={`${uid}-t-${t.id}`} hidden={i !== active} className="ms-c-tabpanel" tabIndex={0}>
          {t.body}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- accordion */

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  return (
    <div className="ms-c-acc">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className="ms-c-accitem" data-open={isOpen}>
            <h5>
              <button aria-expanded={isOpen} aria-controls={`${uid}-${i}`} id={`${uid}-h-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                <span>{it.q}</span>
                <span className="ms-c-plus" aria-hidden="true"><Icon name="plus" size={20} /></span>
              </button>
            </h5>
            {/* grid-rows 0fr → 1fr animates height without animating height (§8.1.5) */}
            <div className="ms-c-accpanel" id={`${uid}-${i}`} role="region" aria-labelledby={`${uid}-h-${i}`} inert={!isOpen}>
              <div><p className="mute">{it.a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------- before/after */

export function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [p, setP] = useState(50);
  const id = useId();
  return (
    <div className="ms-c-ba" style={{ "--p": `${p}%` } as React.CSSProperties}>
      <div className="ms-c-bastage">
        <div className="ms-c-baside after" aria-hidden={p < 5}>
          <span className="lab">After</span>
          <b className="up">{after}</b>
        </div>
        <div className="ms-c-baside before" aria-hidden={p > 95}>
          <span className="lab">Before</span>
          <b className="up">{before}</b>
        </div>
        <span className="ms-c-bahandle" aria-hidden="true"><Icon name="chevron-up-down" size={20} className="ms-ico rot" /></span>
      </div>
      <label htmlFor={id} className="lab mute">Drag to compare — or use the arrow keys</label>
      <input id={id} type="range" min={0} max={100} value={p} onChange={(e) => setP(Number(e.target.value))} aria-valuetext={`${p}% before, ${100 - p}% after`} className="ms-range ms-c-barange" />
    </div>
  );
}

/* ----------------------------------------------------------- sticky TOC */

/** Scroll-spy rail: observer rooted on the demo scroller, active state in aria-current. */
export function TocRail({ sections }: { sections: { id: string; label: string; body: string }[] }) {
  const [active, setActive] = useState(sections[0].id);
  const root = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id.replace("toc-", ""));
      },
      { root: el, rootMargin: "0px 0px -60% 0px", threshold: 0 }
    );
    el.querySelectorAll("section").forEach((s) => io.observe(s));
    const onScroll = () => setProgress(el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); el.removeEventListener("scroll", onScroll); };
  }, []);

  const jump = (id: string) => {
    const el = root.current?.querySelector(`#toc-${id}`);
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el?.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="ms-c-tocwrap">
      <div className="ms-c-progress" role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
        <i style={{ transform: `scaleX(${progress})` }} />
      </div>
      <div className="ms-c-tocgrid">
        <nav aria-label="On this page" className="ms-c-toc">
          <span className="lab mute">On this page</span>
          <ul>
            {sections.map((s, i) => (
              <li key={s.id}>
                <button onClick={() => jump(s.id)} aria-current={active === s.id ? "true" : undefined}>
                  <span className="lab">{String(i + 1).padStart(2, "0")}</span> {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ms-c-tocscroll" ref={root} tabIndex={0} role="region" aria-label="Case study content, scrollable">
          {sections.map((s) => (
            <section key={s.id} id={`toc-${s.id}`}>
              <h5 className="up">{s.label}</h5>
              <p className="mute">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- contact form */

type FormState = "idle" | "error" | "sending" | "success";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});
  const status = useRef<HTMLParagraphElement>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    const message = String(f.get("message") ?? "").trim();
    const next: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter an address like name@company.com.";
    if (message.length < 10) next.message = "Say a little more — at least ten characters.";
    setErrors(next);
    if (Object.keys(next).length) {
      setState("error");
      // focus moves to the first invalid field once aria-invalid has rendered (§9.7)
      const form = e.currentTarget;
      requestAnimationFrame(() => (form.querySelector("[aria-invalid=true]") as HTMLElement | null)?.focus());
      return;
    }
    setState("sending");
    setTimeout(() => { setState("success"); requestAnimationFrame(() => status.current?.focus()); }, 900);
  };

  if (state === "success") {
    return (
      <div className="ms-c-formdone" role="status">
        <p tabIndex={-1} ref={status} className="ms-withico"><Icon name="check-circle" size={32} anim /> <b className="up">Message sent.</b></p>
        <p className="mute">I reply within two days. This is a demo — nothing was sent.</p>
        <button className="btn ghost" onClick={() => { setState("idle"); setErrors({}); }}>Send another</button>
      </div>
    );
  }

  return (
    <form className="ms-c-form" onSubmit={submit} noValidate>
      <label className="field"><span className="lab">Name</span><input name="name" autoComplete="name" placeholder="Your name" /></label>
      <label className={`field${errors.email ? " err" : ""}`}>
        <span className="lab">Email</span>
        <input name="email" type="email" autoComplete="email" placeholder="you@company.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "ms-e-email" : undefined} />
        {errors.email && <small id="ms-e-email"><i aria-hidden="true">!</i>{errors.email}</small>}
      </label>
      <label className={`field wide${errors.message ? " err" : ""}`}>
        <span className="lab">Message</span>
        <textarea name="message" rows={4} placeholder="What are you working on?" aria-invalid={!!errors.message} aria-describedby={errors.message ? "ms-e-msg" : undefined} />
        {errors.message && <small id="ms-e-msg"><i aria-hidden="true">!</i>{errors.message}</small>}
      </label>
      <div className="row">
        <button className="btn ms-withico" type="submit" aria-busy={state === "sending"} disabled={state === "sending"}>
          {state === "sending" ? <><Icon name="loader" size={20} className="ms-ico run" data-anim="spin" /> Sending…</> : <>Send message <Icon name="arrow-right" size={20} anim /></>}
        </button>
        <span className="lab mute">Demo — nothing is sent</span>
      </div>
    </form>
  );
}
