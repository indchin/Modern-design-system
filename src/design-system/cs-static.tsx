/**
 * Portfolio and case-study components — MODERN-DESIGN-SYSTEM.md §10b–§10c.
 * Presentational only; interactive ones live in cs-client.tsx.
 * Sample copy is illustrative unless it comes from portfolio.ts.
 */
import Image from "next/image";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./icons";

/* ---------------------------------------------------------------- shared */

export type Status = "Completed" | "In progress" | "Planned" | "Foundational";

const STATUS_CLASS: Record<Status, string> = {
  Completed: "ms-c-s-done",
  "In progress": "ms-c-s-prog",
  Planned: "ms-c-s-plan",
  Foundational: "ms-c-s-found",
};
const STATUS_ICON: Record<Status, IconName> = {
  Completed: "check",
  "In progress": "clock",
  Planned: "calendar",
  Foundational: "layers",
};

/** Status is never colour alone — every status carries a glyph and a word. */
export function StatusPill({ status }: { status: Status }) {
  return (
    <span className={`ms-c-status lab ${STATUS_CLASS[status]}`}>
      <Icon name={STATUS_ICON[status]} size={16} /> {status}
    </span>
  );
}

/** Flat pink placeholder in the standard media frame (§7.1). */
export function MediaPlaceholder({ ratio = "16/10", tone = "var(--pink)", label }: { ratio?: string; tone?: string; label?: string }) {
  return (
    <div className="ms-c-media" style={{ aspectRatio: ratio, background: tone }} role="img" aria-label={label ?? "Placeholder media"} />
  );
}

/* ------------------------------------------------------------- portfolio */

type CaseLike = { id: string; title: string; slug: string; excerpt: string; category: string; year: string; cover: string; tags: string[] };

export function CaseCard({ c, index, featured = false }: { c: CaseLike; index: number; featured?: boolean }) {
  return (
    <a className={`ms-c-card${featured ? " feat" : ""}`} href="#casestudy">
      <div className="ms-c-cardimg">
        <Image src={c.cover} alt="" fill sizes={featured ? "(max-width: 820px) 100vw, 640px" : "(max-width: 820px) 100vw, 400px"} />
      </div>
      <div className="ms-c-cardbody">
        <span className="lab mute">{String(index + 1).padStart(2, "0")} · {c.category} · {c.year}</span>
        <h4 className="up">{c.title}</h4>
        {featured && <p className="mute">{c.excerpt}</p>}
        <div className="ms-c-tags">{c.tags.slice(0, featured ? 3 : 2).map((t) => <span className="tag lab" key={t}>{t}</span>)}</div>
        <span className="lab ms-withico">Discover <Icon name="arrow-right" size={16} anim /></span>
      </div>
    </a>
  );
}

export function AboutBlock({ name, statement, location, facts }: { name: string; statement: string; location: string; facts: [string, string][] }) {
  return (
    <div className="ms-c-about">
      <MediaPlaceholder ratio="4/5" tone="var(--yellow)" label={`Portrait of ${name}`} />
      <div>
        <span className="lab mute">About · {location}</span>
        <p className="ms-c-lead">{statement}</p>
        <dl className="ms-c-facts">
          {facts.map(([k, v]) => (<div key={k}><dt className="lab mute">{k}</dt><dd>{v}</dd></div>))}
        </dl>
      </div>
    </div>
  );
}

export function SkillMeters({ skills }: { skills: { label: string; value: number; group: string }[] }) {
  return (
    <ul className="ms-c-skills">
      {skills.map((s) => (
        <li key={s.label}>
          <div className="ms-c-skillhead"><b>{s.label}</b><span className="lab mute">{s.group}</span></div>
          {/* the number is in the DOM and in the accessible name — the bar is decoration */}
          <div className="ms-c-meter" role="meter" aria-valuenow={s.value} aria-valuemin={0} aria-valuemax={100} aria-label={`${s.label}, ${s.value} out of 100`}>
            <i style={{ width: `${s.value}%` }} />
          </div>
          <span className="lab">{s.value}</span>
        </li>
      ))}
    </ul>
  );
}

export function ToolChips({ tools }: { tools: { name: string; group: string }[] }) {
  const groups = Array.from(new Set(tools.map((t) => t.group)));
  return (
    <div className="ms-c-tools">
      {groups.map((g) => (
        <div key={g}>
          <span className="lab mute">{g}</span>
          <div className="ms-c-tags">{tools.filter((t) => t.group === g).map((t) => <span className="tag lab" key={t.name}>{t.name}</span>)}</div>
        </div>
      ))}
    </div>
  );
}

export function AwardList({ awards }: { awards: { title: string; issuer: string; year: string }[] }) {
  return (
    <ul className="ms-c-awards">
      {awards.map((a, i) => (
        <li key={i}>
          <Icon name="bookmark" size={20} />
          <b>{a.title}</b>
          <span className="lab mute">{a.issuer}</span>
          <span className="lab">{a.year}</span>
        </li>
      ))}
    </ul>
  );
}

export function Testimonial({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <figure className="ms-c-testi">
      <blockquote><p>{quote}</p></blockquote>
      <figcaption><b>{name}</b><span className="lab mute">{role}</span></figcaption>
    </figure>
  );
}

export function SiteFooter({ name, email, resume, socials }: { name: string; email: string; resume: string; socials: { label: string; href: string }[] }) {
  return (
    <footer className="ms-c-footer">
      <div>
        <span className="lab mute">Contact</span>
        <a className="ms-c-mail up" href={`mailto:${email}`}>Say hello <Icon name="arrow-up-right" size={32} /></a>
      </div>
      <div className="ms-c-footrow lab">
        <span>© {new Date().getFullYear()} {name}</span>
        <a className="ms-draw" href={resume}>Résumé</a>
        {socials.map((s) => <a className="ms-draw" key={s.label} href={s.href}>{s.label}</a>)}
      </div>
    </footer>
  );
}

/* ------------------------------------------------- case-study: structure */

export function Breadcrumb({ trail }: { trail: string[] }) {
  return (
    <nav aria-label="Breadcrumb" className="ms-c-crumb lab">
      <ol>
        {trail.map((t, i) => (
          <li key={t}>{i < trail.length - 1 ? <a className="ms-draw" href="#casestudy">{t}</a> : <span aria-current="page">{t}</span>}
            {i < trail.length - 1 && <Icon name="chevron-right" size={16} />}</li>
        ))}
      </ol>
    </nav>
  );
}

export function MetaStrip({ items }: { items: [string, string][] }) {
  return (
    <dl className="ms-c-meta">
      {items.map(([k, v]) => (<div key={k}><dt className="lab mute">{k}</dt><dd>{v}</dd></div>))}
    </dl>
  );
}

export function CaseHero({ c, role, client, duration }: { c: CaseLike & { role?: string }; role: string; client: string; duration: string }) {
  return (
    <header className="ms-c-hero">
      <Breadcrumb trail={["Work", c.category.split(" · ")[0], c.title.split(" — ")[0]]} />
      <span className="lab mute">{c.category}</span>
      <h3 className="up">{c.title}</h3>
      <p className="ms-c-lead">{c.excerpt}</p>
      <MetaStrip items={[["Role", role], ["Client", client], ["Year", c.year], ["Duration", duration]]} />
      <div className="ms-c-cardimg wide"><Image src={c.cover} alt="" fill sizes="(max-width: 820px) 100vw, 900px" /></div>
    </header>
  );
}

export function SectionHeader({ n, eyebrow, title, intro }: { n: string; eyebrow: string; title: string; intro?: string }) {
  return (
    <header className="ms-c-sechead">
      <span className="lab mute">{n} · {eyebrow}</span>
      <h4 className="up">{title}</h4>
      {intro && <p className="ms-c-lead">{intro}</p>}
    </header>
  );
}

export function NextStudy({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <a className="ms-c-next" href={href}>
      <span className="lab">Next case study</span>
      <b className="up">{title}</b>
      <p>{description}</p>
      <span className="lab ms-withico">Read it <Icon name="arrow-right" size={20} anim /></span>
    </a>
  );
}

/* -------------------------------------------------- case-study: content */

export function PullQuote({ children, attribution }: { children: ReactNode; attribution?: string }) {
  return (
    <figure className="ms-c-pull">
      <blockquote className="up">{children}</blockquote>
      {attribution && <figcaption className="lab mute">— {attribution}</figcaption>}
    </figure>
  );
}

export function Figure({ caption, tone, ratio }: { caption: string; tone?: string; ratio?: string }) {
  return (
    <figure className="ms-c-fig">
      <MediaPlaceholder tone={tone} ratio={ratio} label={caption} />
      <figcaption className="lab mute">{caption}</figcaption>
    </figure>
  );
}

const CALLOUT: Record<"insight" | "note" | "risk", { icon: IconName; label: string; cls: string }> = {
  insight: { icon: "lightbulb", label: "Insight", cls: "ms-c-co-insight" },
  note: { icon: "info", label: "Note", cls: "ms-c-co-note" },
  risk: { icon: "alert", label: "Risk", cls: "ms-c-co-risk" },
};

/** Callout kind is carried by an icon and a word, never colour alone. */
export function Callout({ kind, children }: { kind: keyof typeof CALLOUT; children: ReactNode }) {
  const k = CALLOUT[kind];
  return (
    <aside className={`ms-c-callout ${k.cls}`}>
      <span className="lab ms-withico"><Icon name={k.icon} size={20} /> {k.label}</span>
      <p>{children}</p>
    </aside>
  );
}

export function PersonaCard({ name, role, goal, pain, tone }: { name: string; role: string; goal: string; pain: string; tone: string }) {
  return (
    <article className="ms-c-persona">
      <div className="ms-c-avatar" style={{ background: tone }} aria-hidden="true"><Icon name="users" size={32} /></div>
      <div>
        <h5 className="up">{name}</h5>
        <span className="lab mute">{role}</span>
      </div>
      <dl>
        <div><dt className="lab mute">Goal</dt><dd>{goal}</dd></div>
        <div><dt className="lab mute">Pain</dt><dd>{pain}</dd></div>
      </dl>
    </article>
  );
}

export function FindingList({ items }: { items: { title: string; body: string; evidence: string }[] }) {
  return (
    <ol className="ms-c-findings">
      {items.map((f, i) => (
        <li key={f.title}>
          <span className="ms-c-fnum">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <b>{f.title}</b>
            <p className="mute">{f.body}</p>
            <span className="lab ms-withico"><Icon name="users" size={16} /> {f.evidence}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function DecisionCard({ n, decision, why, tradeoff, status }: { n: string; decision: string; why: string; tradeoff: string; status: Status }) {
  return (
    <article className="ms-c-decision">
      <header><span className="lab mute">Decision {n}</span><StatusPill status={status} /></header>
      <h5 className="up">{decision}</h5>
      <dl>
        <div><dt className="lab mute">Why</dt><dd>{why}</dd></div>
        <div><dt className="lab mute">Trade-off</dt><dd>{tradeoff}</dd></div>
      </dl>
    </article>
  );
}

export function ProcessSteps({ steps }: { steps: { phase: string; title: string; body: string; icon: IconName }[] }) {
  return (
    <ol className="ms-c-steps">
      {steps.map((s, i) => (
        <li key={s.phase}>
          <span className="ms-c-stepico"><Icon name={s.icon} size={24} /></span>
          <span className="lab mute">{String(i + 1).padStart(2, "0")} · {s.phase}</span>
          <b>{s.title}</b>
          <p className="mute">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function ImpactBlock({ metrics }: { metrics: { value: string; label: string; detail: string; delta?: string }[] }) {
  return (
    <div className="ms-c-impact">
      {metrics.map((m) => (
        <div key={m.label}>
          <b>{m.value}</b>
          <span className="lab">{m.label}</span>
          <p className="mute">{m.detail}</p>
          {m.delta && <span className="tag lab ms-c-delta"><Icon name="arrow-up-right" size={16} /> {m.delta}</span>}
        </div>
      ))}
    </div>
  );
}

export function RoadmapTable({ rows }: { rows: { item: string; why: string; status: Status; horizon: string }[] }) {
  return (
    <div className="ms-c-tablewrap" tabIndex={0} role="region" aria-label="Roadmap table, scrollable">
      <table className="ms-spec ms-c-roadmap">
        <thead><tr><th>Item</th><th>Why</th><th>Horizon</th><th>Status</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.item}><td><b>{r.item}</b></td><td className="mute">{r.why}</td><td className="lab">{r.horizon}</td><td><StatusPill status={r.status} /></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ReflectionList({ items }: { items: { kept: string; change: string }[] }) {
  return (
    <div className="ms-c-reflect">
      <div>
        <span className="lab ms-withico"><Icon name="check-circle" size={20} /> What held up</span>
        <ul>{items.map((i) => <li key={i.kept}>{i.kept}</li>)}</ul>
      </div>
      <div>
        <span className="lab ms-withico"><Icon name="corner-down-right" size={20} /> What I would change</span>
        <ul>{items.map((i) => <li key={i.change}>{i.change}</li>)}</ul>
      </div>
    </div>
  );
}
