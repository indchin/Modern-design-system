import Image from "next/image";
import { portfolio } from "@/content/portfolio";
import "./modern.css";
import { MotionLab } from "./motion-lab";
import { TypeLab } from "./type-lab";
import { SharedElementLab, OverlayLab, LoaderLab, ScrollDrivenLab, TransitionStyleLab, SpeedLab } from "./transition-lab";
import { IllustrationLab, IllustrationDonts, UnfoldLab } from "./illustration-lab";
import {
  CaseCard, AboutBlock, SkillMeters, ToolChips, AwardList, Testimonial, SiteFooter,
  CaseHero, SectionHeader, NextStudy, PullQuote, Figure, Callout, PersonaCard, FindingList,
  DecisionCard, ProcessSteps, ImpactBlock, RoadmapTable, ReflectionList, StatusPill, Breadcrumb, MetaStrip,
} from "./cs-static";
import { CsTabs, Accordion, BeforeAfter, TocRail, ContactForm } from "./cs-client";
import { IconGallery, IconAnatomy, IconInUse } from "./icon-gallery";
import { GridLab, SpacingLab, ResponsiveLab } from "./layout-lab";
import { Icon, ICON_NAMES } from "./icons";

const colours: [string, string, string, string][] = [
  ["paper", "#F2F2EA", "Page background", "◆"],
  ["sand", "#ECECE3", "Inset surface", "◆"],
  ["ink", "#333333", "Body text, 2px rules", "◆"],
  ["deep", "#101820", "Headlines, dark bands", "◆"],
  ["muted", "#6B6B63", "Secondary text", ""],
  ["yellow", "#FEBE1E", "Primary accent", "◆"],
  ["orange", "#FF640A", "Alt accent, error", "◆"],
  ["green", "#00BE5A", "Positive", "◆"],
  ["pink", "#FFA9F0", "Highlight", "◆"],
  ["stone", "#A2A2A2", "Disabled", "◆"],
];

// Ratios computed with the WCAG 2.x relative-luminance formula.
const pairs: [string, string, string, string, boolean][] = [
  ["deep on paper", "#101820", "#F2F2EA", "15.90", true],
  ["ink on paper", "#333333", "#F2F2EA", "11.23", true],
  ["muted on paper", "#6B6B63", "#F2F2EA", "4.78", true],
  ["muted on sand", "#6B6B63", "#ECECE3", "4.52", true],
  ["deep on yellow", "#101820", "#FEBE1E", "10.74", true],
  ["deep on pink", "#101820", "#FFA9F0", "10.38", true],
  ["deep on green", "#101820", "#00BE5A", "7.25", true],
  ["deep on orange", "#101820", "#FF640A", "6.03", true],
  ["paper on deep", "#F2F2EA", "#101820", "15.90", true],
  ["yellow on deep", "#FEBE1E", "#101820", "10.74", true],
  ["orange on deep", "#FF640A", "#101820", "6.03", true],
  ["stone on deep", "#A2A2A2", "#101820", "7.01", true],
  ["ink on orange", "#333333", "#FF640A", "4.26", false],
  ["orange on paper", "#FF640A", "#F2F2EA", "2.64", false],
  ["green on paper", "#00BE5A", "#F2F2EA", "2.19", false],
  ["yellow on paper", "#FEBE1E", "#F2F2EA", "1.48", false],
];

const nav: [string, string][] = [
  ["principles", "01"], ["colour", "02"], ["type", "03"], ["layout", "04"], ["shape", "05"],
  ["icons", "06"], ["illustration", "07"], ["motion", "08"], ["transitions", "09b"], ["components", "10"], ["portfolio", "10b"], ["casestudy", "10c"], ["patterns", "12"],
  ["responsive", "13"], ["accessibility", "14"], ["voice", "15"], ["data", "16"], ["tokens", "17"],
  ["governance", "18"],
];

function Sec({ id, n, title, intro, children }: { id: string; n: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section className="ms-sec" id={id}>
      <div className="w">
        <header>
          <span className="lab mute">{n}</span>
          <div>
            <h2 className="up l">{title}</h2>
            {intro && <p className="lead mute" style={{ marginTop: 16 }}>{intro}</p>}
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}

const Do = ({ children }: { children: React.ReactNode }) => (
  <div className="ms-box ms-do"><span className="lab"><Icon name="check-circle" size={16} /> Do</span>{children}</div>
);
const Dont = ({ children }: { children: React.ReactNode }) => (
  <div className="ms-box ms-dont"><span className="lab"><Icon name="alert" size={16} /> Don&apos;t</span>{children}</div>
);

export default function ModernDS() {
  const { owner, caseStudies, principles, timeline } = portfolio;
  const cs = caseStudies[0];

  return (
    <div className="ms">
      <a className="ms-skip" href="#principles">Skip to content</a>

      <div className="ms-top">
        <div className="w">
          <b>Modern</b>
          <nav aria-label="Design system sections">
            {nav.map(([s, n]) => <a key={s} href={`#${s}`}><span className="mute">{n}</span> {s}</a>)}
          </nav>
          <span className="lab mute">v1.0</span>
        </div>
      </div>

      {/* ---------- cover ---------- */}
      <section className="ms-sec ms-cover">
        <div className="w">
          <p className="lab mute">Design system · {owner.name} · {new Date().getFullYear()}</p>
          <h1 className="up xl" style={{ margin: "18px 0 28px" }}>Modern<span style={{ color: "var(--orange)" }}>.</span></h1>
          <div className="ms-grid c2">
            <p className="lead">
              Loud type, warm paper, colour as blocks, and soft-cornered icons. The structure follows the existing
              Paper &amp; Ink system; the visual language is rebuilt from thebranchmedia.org.
            </p>
            <div>
              <p className="mute" style={{ marginTop: 0 }}>
                Values marked ◆ were read from that site&apos;s theme stylesheet. Everything else — scales, rules,
                components, icons, motion — is designed here.
              </p>
              <div className="row">
                <span className="tag lab">21 topics</span>
                <span className="tag lab">{ICON_NAMES.length} icons</span>
                <span className="tag lab">24 measured pairs</span>
                <span className="tag lab fill">WCAG 2.2 AA</span>
              </div>
            </div>
          </div>
          <div className="ms-grid c4" style={{ marginTop: 48 }}>
            {[
              ["pulse", "Research-led", "Healthcare and ed-tech products"],
              ["sparkle", "AI as material", "Human judgement owns the outcome"],
              ["accessibility", "AA or it ships broken", "Contrast measured, not assumed"],
              ["layers", "Systems that scale", "Tokens, states, governance"],
            ].map(([ico, t, b]) => (
              <div className="ms-box" key={t}>
                <Icon name={ico as never} size={32} />
                <b style={{ display: "block", margin: "12px 0 6px" }}>{t}</b>
                <span className="mute" style={{ fontSize: 14 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 01 ---------- */}
      <Sec id="principles" n="01" title="Principles" intro="Six rules that settle arguments. When two options conflict, prefer the one that keeps text readable, works without motion or hover, and uses fewer colours.">
        <div className="ms-val">
          {[
            ["Say it loud", "One statement per screen, set in heavy uppercase. A headline that needs a second clause becomes a second headline."],
            ["Paper first, colour as event", "Paper is the canvas. Colour arrives as full blocks — a band, a hover fill, a CTA — never as sprinkles."],
            ["Hard edges, soft ends", "2px ink rules and bordered blocks. Buttons, tags and icon terminals are round. Nothing in this system has a sharp corner you can cut yourself on."],
            ["Evidence in plain language", "Declarative first person. Every claim traces to portfolio content."],
            ["Motion explains, never decorates", "Each animation answers one question: where did that come from, what can I press, or what just changed."],
            ["Contrast is a rule, not a taste", "Every pair is measured before it ships. Section 02 is binding."],
          ].map(([t, b], i) => (
            <div key={t}><span className="lab mute">0{i + 1}</span><h3 className="up h">{t}</h3><p>{b}</p></div>
          ))}
        </div>
      </Sec>

      {/* ---------- 02 ---------- */}
      <Sec id="colour" n="02" title="Colour" intro="Ten tokens. Accents are fills, never text on paper. Text on any accent fill is always deep.">
        <div className="ms-grid c5">
          {colours.map(([n, hex, role, ref]) => (
            <div className="ms-sw" key={n}>
              <i style={{ background: hex }} />
              <div>
                <b>{n} <span className="mute">{ref}</span></b>
                <span className="lab mute">{hex}</span><br />
                <span className="mute" style={{ fontSize: 13 }}>{role}</span>
              </div>
            </div>
          ))}
        </div>

        <h3 className="ms-sub">Measured contrast — every pair, no exceptions</h3>
        <p className="mute">Text needs 4.5:1, large text (≥ 24px, or ≥ 19px bold) needs 3:1, and non-text boundaries need 3:1. Dashed cells are banned combinations, shown so nobody rediscovers them.</p>
        <div className="ms-grid c2">
          {pairs.map(([label, fg, bg, ratio, ok]) => (
            <div key={label} className={`ms-pair${ok ? "" : " bad"}`} style={{ color: fg, background: bg }}>
              {label}<span>{ratio}:1 {ok ? "✔ use" : "✘ never"}</span>
            </div>
          ))}
        </div>

        <h3 className="ms-sub">Non-text contrast</h3>
        <p className="mute">A yellow fill is 1.48:1 against paper — invisible as a boundary. It is allowed only because its edge is a 2px ink border at 11.23:1. Never let an accent fill be the only thing defining an edge.</p>
        <div className="ms-grid c2" style={{ marginTop: 16 }}>
          <Do><ul><li>Put <code>deep</code> text on every accent fill.</li><li>One accent per section.</li><li>Pair colour with a glyph for state.</li></ul></Do>
          <Dont><ul><li>Orange, green, yellow or pink as text on paper.</li><li>Paper text on orange (2.64:1).</li><li>Colour as the only signal of an error.</li></ul></Dont>
        </div>
      </Sec>

      {/* ---------- 03 ---------- */}
      <Sec id="type" n="03" title="Typography" intro="Display: Inter 800 uppercase (stand-in for Manuka). Serif accent: Cormorant italic (for Financier Display). Text: Inter. Label: JetBrains Mono.">
        <div className="ms-typerow"><span className="lab mute">Display XL · clamp(52,12.5vw,190) · 800 · −0.03em · 0.92</span><p className="up xl">Say it loud</p></div>
        <div className="ms-typerow"><span className="lab mute">Display L · clamp(36,6.5vw,96)</span><p className="up l">Evidence over <span className="serif">assumption</span></p></div>
        <div className="ms-typerow"><span className="lab mute">Heading · clamp(26,3.2vw,46)</span><p className="up h">{cs.title}</p></div>
        <div className="ms-typerow"><span className="lab mute">Subheading · 20 · 800</span><p className="ms-sub" style={{ margin: 0 }}>How I work</p></div>
        <div className="ms-typerow"><span className="lab mute">Lead · clamp(18,1.7vw,24) · 1.45 · ≤ 34em</span><p className="lead">{owner.statement}</p></div>
        <div className="ms-typerow"><span className="lab mute">Body · 16–18 · 1.5 · 34–44em</span><p style={{ maxWidth: "40em" }}>Every design decision should be traceable to a participant, a metric, or a constraint. That rule is what makes the rest of this system worth maintaining.</p></div>
        <div className="ms-typerow"><span className="lab mute">Label · 12 · +0.08em · UPPER</span><p className="lab">Healthcare · EdTech · 2026</p></div>
        <div className="ms-grid c2" style={{ marginTop: 32 }}>
          <Do><ul><li>Max three type sizes per viewport.</li><li>Tabular figures in stats.</li><li>One serif accent word per headline.</li></ul></Do>
          <Dont><ul><li>Centre body copy.</li><li>Display headlines over three lines.</li><li>Uppercase in the source — set it in CSS.</li></ul></Dont>
        </div>

        <h3 className="ms-sub">Type colour</h3>
        <p className="mute">
          Type carries colour in exactly three ways: the text colour itself, a fill behind it, or a serif accent that
          changes style rather than hue. Accent colours are never text on paper — §02 measures why.
        </p>
        <div className="ms-grid c2">
          <div className="ms-box">
            <span className="lab mute">On paper · allowed</span>
            <p className="up h" style={{ color: "var(--deep)", margin: "12px 0 4px" }}>Deep — headlines</p>
            <p style={{ color: "var(--ink)", margin: "0 0 4px" }}>Ink — body copy, 11.23:1</p>
            <p style={{ color: "var(--muted)", margin: 0 }}>Muted — secondary, 4.78:1</p>
            <p style={{ margin: "12px 0 0" }}>Emphasis is a <span className="ms-hl">yellow fill</span>, not yellow text.</p>
          </div>
          <div className="ms-box" style={{ background: "var(--deep)", borderColor: "var(--deep)" }}>
            <span className="lab" style={{ color: "var(--stone)" }}>On deep · allowed</span>
            <p className="up h" style={{ color: "var(--paper)", margin: "12px 0 4px" }}>Paper — headlines</p>
            <p style={{ color: "var(--paper)", margin: "0 0 4px" }}>Paper — body, 15.90:1</p>
            <p style={{ color: "var(--stone)", margin: "0 0 4px" }}>Stone — secondary, 7.01:1</p>
            <p style={{ color: "var(--paper)", margin: 0 }}>
              One <span style={{ color: "var(--orange)" }}>orange</span> or{" "}
              <span style={{ color: "var(--yellow)" }}>yellow</span> emphasis word — the only place accents become text.
            </p>
          </div>
        </div>
        <table className="ms-spec" style={{ marginTop: 16 }}>
          <thead><tr><th>Role</th><th>On paper / sand</th><th>On deep</th><th>On an accent fill</th></tr></thead>
          <tbody>
            <tr><td>Display</td><td><code>deep</code></td><td><code>paper</code></td><td><code>deep</code></td></tr>
            <tr><td>Body</td><td><code>ink</code></td><td><code>paper</code></td><td><code>deep</code></td></tr>
            <tr><td>Secondary</td><td><code>muted</code></td><td><code>stone</code></td><td><code>deep</code></td></tr>
            <tr><td>Emphasis word</td><td>A fill behind it — never coloured text</td><td><code>orange</code> or <code>yellow</code></td><td>Weight or italic, not colour</td></tr>
            <tr><td>Link</td><td><code>ink</code> + underline</td><td><code>paper</code> + underline</td><td><code>deep</code> + underline</td></tr>
            <tr><td>Error text</td><td><code>deep</code> beside an orange chip</td><td><code>paper</code> beside an orange chip</td><td>—</td></tr>
            <tr><td>Disabled</td><td><code>muted</code></td><td><code>stone</code></td><td><code>deep</code> on stone</td></tr>
          </tbody>
        </table>
        <div className="ms-grid c2" style={{ marginTop: 16 }}>
          <Do><ul>
            <li>Two text colours per block, three per page.</li>
            <li>Highlight with a fill behind the words, text staying <code>deep</code>.</li>
            <li>Let the serif accent differ by style — italic — not by hue.</li>
            <li>Pair every colour signal with weight, a glyph or a fill.</li>
          </ul></Do>
          <Dont><ul>
            <li><span style={{ color: "var(--orange)" }}>Orange text on paper</span> — 2.64:1, and it fails here too.</li>
            <li>Gradient or clipped-image text.</li>
            <li>Text over a photograph; use a band.</li>
            <li>Colour as the only difference between two headings.</li>
          </ul></Dont>
        </div>

        <h3 className="ms-sub">Type in motion — letter animation</h3>
        <p className="mute">
          Type animates at one of three levels: line, word or letter. The level is chosen by how much there is to
          read, never by how it looks. Switch the split below and watch the same headline at each level.
        </p>
        <TypeLab />
        <table className="ms-spec" style={{ marginTop: 24 }}>
          <thead><tr><th>Level</th><th>Stagger</th><th>Allowed on</th><th>Banned on</th></tr></thead>
          <tbody>
            <tr><td>Line</td><td><code>--stagger-line</code> 80ms</td><td>Any headline, lead, pull quote — the default</td><td>—</td></tr>
            <tr><td>Word</td><td><code>--stagger-word</code> 40ms</td><td>Leads of one or two sentences</td><td>Body copy, lists, tables</td></tr>
            <tr><td>Letter</td><td><code>--stagger-letter</code> 25ms</td><td>Display of ≤ 3 words, hover on display links</td><td>Anything read rather than glanced at</td></tr>
          </tbody>
        </table>
        <div className="ms-grid c2" style={{ marginTop: 16 }}>
          <Do><ul>
            <li>Keep the whole string on the container with <code>aria-label</code>; mark every fragment <code>aria-hidden</code>.</li>
            <li>Cap total run at 600ms, however many fragments.</li>
            <li>Split only after <code>document.fonts.ready</code>, or the line breaks jump.</li>
            <li>Render whole, unsplit text under reduced motion.</li>
          </ul></Do>
          <Dont><ul>
            <li>Letter-animate body copy, or any text over three words.</li>
            <li>Typewriter effects on content someone needs now.</li>
            <li>Leave split spans exposed — a screen reader spells them out.</li>
            <li>Animate more than ~60 fragments at once.</li>
          </ul></Dont>
        </div>
      </Sec>

      {/* ---------- 04 ---------- */}
      <Sec id="layout" n="04" title="Layout &amp; spacing" intro="12 columns, 24px gutter, 1240px container. Every pattern below is a named column span, so layouts are decided once and reused.">
        <GridLab />
        <h3 className="ms-sub">Spacing scale — these ten values only</h3>
        <p className="mute">An in-between value is a defect, not a judgement call.</p>
        <SpacingLab />
        <h3 className="ms-sub">Vertical rhythm</h3>
        <table className="ms-spec">
          <thead><tr><th>Between</th><th>Space</th><th>Note</th></tr></thead>
          <tbody>
            <tr><td>Sections</td><td>clamp(56, 8vw, 120)</td><td>Separated by a 2px ink rule</td></tr>
            <tr><td>Section heading → content</td><td>clamp(28, 4vw, 56)</td><td></td></tr>
            <tr><td>Subheading → content</td><td>16</td><td></td></tr>
            <tr><td>Paragraphs</td><td>16</td><td></td></tr>
            <tr><td>Related controls</td><td>12</td><td>Buttons in a row</td></tr>
            <tr><td>Icon → label</td><td>8</td><td>4 at 16px icons</td></tr>
          </tbody>
        </table>
        <h3 className="ms-sub">Page rhythm</h3>
        <div className="ms-rhythm">
          {[["Paper", "Hero"], ["Deep", "Statement band"], ["Paper", "Work index"], ["Paper", "Values"], ["Paper", "Path"], ["Yellow", "CTA"], ["Paper", "Footer"]].map(([tone, name]) => (
            <div key={name} className={`ms-rh ms-rh-${tone.toLowerCase()}`}><span className="lab">{name}</span></div>
          ))}
        </div>
        <p className="mute">Never place two coloured blocks next to each other — paper always separates them.</p>
      </Sec>

      {/* ---------- 05 ---------- */}
      <Sec id="shape" n="05" title="Shape" intro="Depth comes from borders and colour blocks. There are no shadows in this system.">
        <div className="ms-grid c4">
          {[["Pill", "999px", "Buttons, tags, chips", 999], ["Card", "16px", "Cards, bands, CTA", 16], ["Image", "14px", "Images, inputs", 14], ["Rule", "2px ink", "Borders, dividers", 0]].map(([n, v, u, r]) => (
            <div key={n as string} style={{ border: "var(--rule)", borderRadius: r as number, padding: 24, textAlign: "center", background: "var(--sand)" }}>
              <b>{n}</b><br /><span className="lab mute">{v}</span>
              <p className="mute" style={{ fontSize: 13, margin: "8px 0 0" }}>{u}</p>
            </div>
          ))}
        </div>
        <div className="ms-grid c2" style={{ marginTop: 16 }}>
          <Do><ul><li>Radius ≥ ⅓ of the shorter side on small shapes.</li><li>Nest radii: inner = outer − padding.</li></ul></Do>
          <Dont><ul><li>Shadows, blurs or glows.</li><li>A 4px radius on a 200px card — it reads as a mistake.</li></ul></Dont>
        </div>
      </Sec>

      {/* ---------- 06 ---------- */}
      <Sec id="icons" n="06" title="Icon library" intro={`${ICON_NAMES.length} icons on a 24px grid. Round caps, round joins, arcs instead of points — nothing in this set has a sharp edge or a sharp corner. Click any icon to copy its code.`}>
        <h3 className="ms-sub" style={{ marginTop: 0 }}>Construction</h3>
        <IconAnatomy />
        <h3 className="ms-sub">The set</h3>
        <IconGallery />
        <h3 className="ms-sub">Optical sizing</h3>
        <p className="mute">Stroke width is set in viewBox units per rendered size, so the rendered weight stays near 2px at every size instead of thinning as the icon grows.</p>
        <div className="ms-grid c5">
          {([16, 20, 24, 32, 48] as const).map((s) => (
            <div className="ms-box" key={s} style={{ display: "grid", placeItems: "center", gap: 10 }}>
              <Icon name="target" size={s} />
              <span className="lab mute">{s}px · stroke {({ 16: 2.6, 20: 2.2, 24: 2, 32: 1.6, 48: 1.1 } as const)[s]}</span>
            </div>
          ))}
        </div>
        <h3 className="ms-sub">In use</h3>
        <IconInUse />
        <div className="ms-grid c2" style={{ marginTop: 24 }}>
          <Do><ul><li>Pair every icon with text, or give it an <code>aria-label</code>.</li><li>Keep the hit area ≥ 44px however small the glyph.</li><li>Use <code>currentColor</code> so icons inherit state.</li></ul></Do>
          <Dont><ul><li>Icon-only controls with no accessible name.</li><li>Mixing a filled icon set into this stroked one.</li><li>Brand marks restyled to these rules — ship them as given.</li></ul></Dont>
        </div>
      </Sec>

      {/* ---------- 07 ---------- */}
      <Sec id="illustration" n="07" title="Imagery &amp; illustration" intro="Photography gets one frame treatment. Illustration is drawn in the icon set's grammar, scaled up — same round geometry, same deep outline, flat accent fills.">
        <h3 className="ms-sub" style={{ marginTop: 0 }}>Photography</h3>
        <div className="ms-grid c2">
          <figure className="ms-fig"><div className="im"><Image src={cs.cover} alt="" fill sizes="(max-width: 820px) 100vw, 400px" /></div><figcaption className="lab mute">16:10 · 2px ink border · 14px radius · hover to zoom 1.05</figcaption></figure>
          <div className="ms-box"><b>Rules</b><ul>
            <li>Container clips; radius matches the frame.</li>
            <li>No overlays, no filters, no shadows.</li>
            <li>Meaningful images get real alt text; decorative get <code>alt=&quot;&quot;</code>.</li>
            <li>Hero ≤ 200KB, thumbnails ≤ 80KB, AVIF or WebP.</li>
            <li>Explicit dimensions — no layout shift.</li>
          </ul></div>
        </div>

        <h3 className="ms-sub">Illustration — three tiers</h3>
        <p className="mute">
          Tier is chosen by how much the illustration has to say, and it caps both the element count and the number
          of accents. Switch between filled and outline to see the fill rule, and replay the draw-on.
        </p>
        <IllustrationLab />

        <h3 className="ms-sub">Style rules</h3>
        <table className="ms-spec">
          <thead><tr><th>Property</th><th>Rule</th><th>Why</th></tr></thead>
          <tbody>
            <tr><td>Line</td><td>Round caps and joins, no corner under 60°, minimum 2px at any render size</td><td>Shared grammar with the icon set</td></tr>
            <tr><td>Outline colour</td><td>Always <code>deep</code>. Never an accent, never a tint</td><td>The single outline colour is what holds the family together</td></tr>
            <tr><td>Stroke weight</td><td>Spot 3 · Feature 3 · Scene 3–4, connectors 4</td><td>Optically constant against the 2px rules</td></tr>
            <tr><td>Fill</td><td>Flat accent only. No gradients, tints or opacity</td><td>Every fill must map to a token</td></tr>
            <tr><td>Fill coverage</td><td>≤ 40% of the bounding box</td><td>Paper has to breathe or it stops reading as an illustration</td></tr>
            <tr><td>Accents per piece</td><td>Spot 1 · Feature 2 · Scene 3</td><td>Keeps it inside the one-accent-per-section rule</td></tr>
            <tr><td>Depth</td><td>Overlap plus a 4px paper contour gap. No shadows</td><td>Same no-elevation rule as §05</td></tr>
            <tr><td>Border</td><td>Bare on paper, or inside the standard media frame</td><td>An illustration is not a photograph</td></tr>
            <tr><td>Corner radius</td><td>≥ ⅓ of the shorter side</td><td>No sharp corners anywhere in the system</td></tr>
            <tr><td>People</td><td>Abstract, no faces, no skin tones</td><td>Avoids both the stock-illustration look and representation problems</td></tr>
          </tbody>
        </table>

        <h3 className="ms-sub">Filled or outline</h3>
        <div className="ms-grid c2">
          <Do><ul>
            <li><strong>Fill the subject, outline the context.</strong> Fill carries mass; outline carries structure.</li>
            <li>Use outline-only at small sizes, in dense layouts, and inside prose.</li>
            <li>Use filled for empty states, feature blocks and anywhere the illustration is the focal point.</li>
          </ul></Do>
          <Dont><ul>
            <li>Fill everything — it becomes a blob with no hierarchy.</li>
            <li>Mix filled and outline pieces in the same view.</li>
            <li>Use fill to indicate state; that is the component&apos;s job.</li>
          </ul></Dont>
        </div>

        <h3 className="ms-sub">Line unfolds into form</h3>
        <p className="mute">
          The second way a drawing can arrive: a flat baseline interpolates into the shape. Both <code>d</code>
          values carry identical command counts — the only way path interpolation stays stable.
        </p>
        <UnfoldLab />

        <h3 className="ms-sub">Banned treatments</h3>
        <p className="mute">Drawn rather than described, so there is no argument about what they look like.</p>
        <IllustrationDonts />

        <h3 className="ms-sub">Illustration motion</h3>
        <table className="ms-spec">
          <thead><tr><th>Stage</th><th>Motion</th><th>Timing</th></tr></thead>
          <tbody>
            <tr><td>1 · Outline draws</td><td><code>stroke-dashoffset</code> 1 → 0, with <code>pathLength=&quot;1&quot;</code> so every path draws at the same rate</td><td><code>--dur-slow</code> <code>--ease-out</code>, 80ms stagger</td></tr>
            <tr><td>2 · Fills arrive</td><td>Opacity 0 → 1, <code>scale(.94 → 1)</code></td><td><code>--dur</code>, delayed 400ms</td></tr>
            <tr><td>3 · Ambient loop</td><td>One element only, amplitude ≤ 4px or <code>scaleY</code> ≥ .7</td><td>≤ 3s, never beside text being read</td></tr>
            <tr><td>Hover</td><td>Whole illustration <code>scale(1.02)</code>, or one element reacts — never both</td><td><code>--dur</code></td></tr>
            <tr><td>Reduced motion</td><td>Final state. No draw, no loop, no hover scale</td><td>—</td></tr>
          </tbody>
        </table>
        <div className="ms-grid c2" style={{ marginTop: 16 }}>
          <Do><ul>
            <li>Draw in reading order: structure, then subject, then accent.</li>
            <li>Normalise with <code>pathLength=&quot;1&quot;</code>, or long paths crawl while short ones snap.</li>
            <li>Mark decorative illustration <code>aria-hidden</code>; give meaningful ones <code>role=&quot;img&quot;</code> and a label.</li>
            <li>Cap at ~12 animated elements.</li>
          </ul></Do>
          <Dont><ul>
            <li>Animate more than one element on a loop.</li>
            <li>Loop anything next to body copy.</li>
            <li>Draw on every scroll into view — once per page load.</li>
            <li>Morph one illustration into another; it reads as a glitch.</li>
          </ul></Dont>
        </div>
      </Sec>

      {/* ---------- 08–09 ---------- */}
      <Sec id="motion" n="08–09" title="Motion &amp; animation" intro="Five durations, four easings, one stagger. Everything here is live — hover, click and drag the examples.">
        <table className="ms-spec">
          <thead><tr><th>Token</th><th>Value</th><th>Use</th></tr></thead>
          <tbody>
            <tr><td><code>--dur-instant</code></td><td>100ms</td><td>Press feedback (scale .98)</td></tr>
            <tr><td><code>--dur-fast</code></td><td>250ms</td><td>Icon motion, small shifts</td></tr>
            <tr><td><code>--dur</code></td><td>300ms ◆</td><td>Colour swaps, underline draw</td></tr>
            <tr><td><code>--dur-slow</code></td><td>600ms</td><td>Image zoom, scroll reveal</td></tr>
            <tr><td><code>--dur-page</code></td><td>700ms</td><td>Overlay menu, loader exit</td></tr>
            <tr><td><code>--ease</code></td><td>ease ◆</td><td>Colour only</td></tr>
            <tr><td><code>--ease-out</code></td><td>cubic-bezier(.2,.7,.2,1)</td><td>Entrances, hover movement</td></tr>
            <tr><td><code>--ease-in-out</code></td><td>cubic-bezier(.76,0,.24,1)</td><td>Overlays, wipes</td></tr>
            <tr><td><code>--ease-spring</code></td><td>cubic-bezier(.34,1.56,.64,1)</td><td>Icon pop only, ≤ 250ms</td></tr>
            <tr><td><code>--stagger</code></td><td>60ms</td><td>Between siblings, max 6</td></tr>
          </tbody>
        </table>
        <h3 className="ms-sub">Icon, pointer and feedback motion</h3>
        <MotionLab />
        <div className="ms-grid c2" style={{ marginTop: 24 }}>
          <Do><ul><li>Animate <code>transform</code> and <code>opacity</code> only.</li><li>Trigger icon motion from the control&apos;s hover <em>and</em> focus.</li><li>Gate pointer effects on <code>(hover:hover) and (pointer:fine)</code>.</li></ul></Do>
          <Dont><ul><li>Animate width, height, top or left.</li><li>Loop decorative motion.</li><li>Put information in a hover-only state.</li></ul></Dont>
        </div>
      </Sec>

      {/* ---------- 9.6 / 9.10 ---------- */}
      <Sec id="transitions" n="09b" title="Page transitions &amp; special animation" intro="Navigation is the one place a portfolio can afford a signature moment. Everything here is live — open a card, open the menu, replay the loader, scroll the frame.">
        <h3 className="ms-sub" style={{ marginTop: 0 }}>Shared element — the cover becomes the hero</h3>
        <p className="mute">
          Built on the View Transitions API. The same element carries a <code>view-transition-name</code> in both
          states, so the browser animates one object moving instead of two screens swapping. Unsupported browsers
          get a cross-fade; reduced motion gets neither.
        </p>
        <SharedElementLab />

        <h3 className="ms-sub">Transition styles</h3>
        <p className="mute">
          Five ways a view can arrive. Pick by what the navigation means, not by what looks richest — the circle
          reveal opens from the thing you clicked, so its origin is information.
        </p>
        <TransitionStyleLab />
        <table className="ms-spec" style={{ marginTop: 24 }}>
          <thead><tr><th>Style</th><th>Motion</th><th>Use when</th><th>Never when</th></tr></thead>
          <tbody>
            <tr><td>Cross-fade</td><td>Opacity, 200–320ms</td><td>The default for any route change</td><td>—</td></tr>
            <tr><td>Shared element</td><td>Cover morphs to hero, 450ms</td><td>A cover exists in both views</td><td>No common element — it becomes a flicker</td></tr>
            <tr><td>Circle reveal</td><td><code>clip-path: circle()</code> from the click point, 620ms</td><td>One clear origin — a card, a toggle, a FAB</td><td>Keyboard activation with no coordinates — fall back to fade</td></tr>
            <tr><td>Cover</td><td>New view slides up over the old, 520ms</td><td>Going deeper: index → detail</td><td>Going back — it implies forward</td></tr>
            <tr><td>Push</td><td>Directional slide, 480ms</td><td>Sibling-to-sibling, next / previous case study</td><td>Unrelated destinations</td></tr>
            <tr><td>Page turn</td><td><code>rotateY</code> with perspective, 700ms</td><td>Genuinely paginated content only</td><td>Everywhere else — see below</td></tr>
          </tbody>
        </table>
        <div className="ms-box ms-dont" style={{ marginTop: 16 }}>
          <b>The page-turn caveat</b>
          <p className="mute" style={{ margin: "8px 0 0" }}>
            It is included so the argument only happens once. A 3D turn is skeuomorphic: it claims the content is
            paper, and at 700ms it is the slowest transition here. It is allowed only where the metaphor is true —
            a slide deck, a multi-page PDF reader. It is banned on routes. If you want weight on a route change,
            use Cover.
          </p>
        </div>

        <h3 className="ms-sub">Transition speed</h3>
        <p className="mute">
          Speed is part of the design, not a setting applied afterwards. Drag the duration and replay: the same
          motion is expressive at 450ms and an obstacle at 900ms. Then use the calculator — it is the same function
          the spec uses.
        </p>
        <SpeedLab />

        <h3 className="ms-sub">Speed tiers</h3>
        <table className="ms-spec">
          <thead><tr><th>Tier</th><th>Token</th><th>Duration</th><th>Use for</th></tr></thead>
          <tbody>
            <tr><td>Instant</td><td><code>--dur-instant</code></td><td>100ms</td><td>Press feedback. Never a route change — too fast to read as a relationship</td></tr>
            <tr><td>Quick</td><td><code>--dur-t-quick</code></td><td>200ms</td><td>Cross-fade, small changes, anything with no distance to travel</td></tr>
            <tr><td>Standard</td><td><code>--dur-t-standard</code></td><td>320ms</td><td>Cross-fade on a full page; dialogs; the upper end of Quick</td></tr>
            <tr><td>Shared element</td><td><code>--dur-vt</code></td><td>450ms</td><td>Cover morphs to hero — sits between Standard and Expressive on purpose</td></tr>
            <tr><td>Expressive</td><td><code>--dur-t-expressive</code></td><td>520ms</td><td>Cover, overlay wipes, large moves</td></tr>
            <tr><td>Ceiling</td><td><code>--dur-t-max</code></td><td>700ms</td><td>Nothing on a route may exceed this. Page turn is the only thing that reaches it</td></tr>
          </tbody>
        </table>

        <h3 className="ms-sub">Speed per style</h3>
        <table className="ms-spec">
          <thead><tr><th>Style</th><th>Default</th><th>Range</th><th>Scales with</th></tr></thead>
          <tbody>
            <tr><td>Cross-fade</td><td>200ms</td><td>150–320ms</td><td>Nothing — it has no distance. Longer only for a full-page swap</td></tr>
            <tr><td>Shared element</td><td>450ms</td><td>350–620ms</td><td>Distance the element travels</td></tr>
            <tr><td>Circle reveal</td><td>620ms</td><td>450–700ms</td><td>The radius — distance to the furthest corner</td></tr>
            <tr><td>Cover</td><td>520ms</td><td>400–600ms</td><td>Viewport height</td></tr>
            <tr><td>Push</td><td>480ms</td><td>360–560ms</td><td>Viewport width. Outgoing page runs at 70% of this</td></tr>
            <tr><td>Page turn</td><td>700ms</td><td>—</td><td>Fixed at the ceiling</td></tr>
          </tbody>
        </table>

        <h3 className="ms-sub">Speed rules</h3>
        <div className="ms-grid c2">
          <Do><ul>
            <li><strong>Speed follows distance and area, never importance.</strong> An important page does not deserve a slower transition.</li>
            <li>Exits run about 30% faster than entrances, with an ease-in curve, so the old view gets out of the way.</li>
            <li>Shorten on repeat visits (× .75) and on phones (× .85).</li>
            <li>A new navigation interrupts the one in flight, from where it currently is.</li>
            <li>If the destination is not ready in 100ms, cross-fade at 200ms and let content arrive.</li>
          </ul></Do>
          <Dont><ul>
            <li>Exceed 700ms on a route, or 1s anywhere without a progress indicator.</li>
            <li>Use the distance formula below about 25% — the clamp makes every small move 350ms. Use the 200ms cross-fade.</li>
            <li>Slow a transition to make it feel premium; people read that as lag.</li>
            <li>Let the transition wait on the network. Time is the cost, not the garnish.</li>
          </ul></Dont>
        </div>

        <h3 className="ms-sub">Transition ledger</h3>
        <table className="ms-spec ms-ledger">
          <thead><tr><th>Transition</th><th>Motion</th><th>Duration</th><th>Rule</th></tr></thead>
          <tbody>
            <tr><td>Route — default</td><td>Opacity cross-fade</td><td>200ms</td><td>Never moves content; the page must be readable immediately</td></tr>
            <tr><td>Route — work → case study</td><td>Shared-element morph</td><td><code>--dur-vt</code> 450ms</td><td>Only when a cover exists in both views</td></tr>
            <tr><td>Back / forward</td><td>Reverse of the forward motion</td><td>Same</td><td>Scroll position restored before the transition paints</td></tr>
            <tr><td>Overlay menu</td><td><code>clip-path</code> wipe down, links stagger</td><td><code>--dur-page</code> 700ms</td><td>Focus moves in, is trapped, returns on close</td></tr>
            <tr><td>Loader</td><td>Panel slides up</td><td><code>--dur-page</code></td><td>First visit only, ≤ 1.2s, skipped when cached</td></tr>
            <tr><td>Modal / dialog</td><td>Fade and 12px rise</td><td><code>--dur-fast</code></td><td><code>@starting-style</code> + <code>allow-discrete</code>, never a bounce</td></tr>
            <tr><td>Scroll reveal</td><td>Fade and 24px rise</td><td><code>--dur-slow</code></td><td>Once, never on re-entry</td></tr>
          </tbody>
        </table>

        <h3 className="ms-sub">Overlay menu</h3>
        <OverlayLab />

        <h3 className="ms-sub">First-visit loader</h3>
        <LoaderLab />

        <h3 className="ms-sub">Scroll-driven, in CSS</h3>
        <p className="mute">
          <code>animation-timeline: view()</code> replaces the observer for simple reveals. It runs off the main
          thread, needs no JavaScript, and degrades to the final state where it is unsupported.
        </p>
        <ScrollDrivenLab />

        <h3 className="ms-sub">Special animation — the signature budget</h3>
        <p className="mute">
          A signature moment is an animation a visitor will remember. They work because they are rare. The budget is
          <strong> three per page and one per navigation</strong>; a fourth does not make the site feel richer, it
          makes the first three feel cheap.
        </p>
        <table className="ms-spec ms-ledger">
          <thead><tr><th>Moment</th><th>Spent on</th><th>Repeats</th></tr></thead>
          <tbody>
            <tr><td>Loader</td><td>First impression</td><td>First visit only, per session</td></tr>
            <tr><td>Hero line reveal</td><td>The statement</td><td>Once per page load</td></tr>
            <tr><td>Shared-element open</td><td>Work → case study</td><td>Every navigation — it is wayfinding, not decoration</td></tr>
            <tr><td>Cursor label</td><td>Work index only</td><td>Continuous, fine pointers only</td></tr>
            <tr><td>Magnetic CTA</td><td>The one primary action</td><td>Continuous, fine pointers only</td></tr>
            <tr><td>Stat counters</td><td>Evidence</td><td>Once, on first view</td></tr>
            <tr><td>Marquee</td><td>Tools strip</td><td>Continuous, pauses on hover</td></tr>
          </tbody>
        </table>
        <div className="ms-grid c2" style={{ marginTop: 16 }}>
          <Do><ul>
            <li>Make the signature moment carry information — where you came from, what you just opened.</li>
            <li>Let every one of them be interruptible: a click during the loader skips it.</li>
            <li>Ship the page working with all seven removed, then add them back.</li>
          </ul></Do>
          <Dont><ul>
            <li>Spend a signature moment on something a person does often.</li>
            <li>Replay the loader on every route change.</li>
            <li>Add an eighth. Retire one first.</li>
          </ul></Dont>
        </div>
      </Sec>

      {/* ---------- 10 ---------- */}
      <Sec id="components" n="10" title="Components" intro="Every interactive component defines rest, hover, focus-visible, active and disabled. If a state is missing, the component is not done.">
        <h3 className="ms-sub" style={{ marginTop: 0 }}>Buttons</h3>
        <div className="row">
          <a className="btn ms-withico" href="#components">Primary <Icon name="arrow-right" size={20} anim /></a>
          <a className="btn ghost ms-withico" href="#components"><Icon name="download" size={20} anim /> Ghost</a>
          <button className="btn" disabled>Disabled</button>
          <button className="btn ms-withico" aria-busy><Icon name="loader" size={20} className="ms-ico run" data-anim="spin" /> Sending…</button>
        </div>
        <table className="ms-spec" style={{ marginTop: 20 }}>
          <thead><tr><th>State</th><th>Primary</th><th>Ghost</th></tr></thead>
          <tbody>
            <tr><td>Rest</td><td>deep fill, paper text</td><td>transparent, deep text, 2px ink border</td></tr>
            <tr><td>Hover</td><td>yellow fill, deep text</td><td>deep fill, paper text</td></tr>
            <tr><td>Focus</td><td colSpan={2}>3px deep outline, 2px offset (yellow on dark)</td></tr>
            <tr><td>Active</td><td colSpan={2}>scale .98 over 100ms</td></tr>
            <tr><td>Disabled</td><td colSpan={2}>stone fill, deep text, no hover change</td></tr>
            <tr><td>Loading</td><td colSpan={2}>label → “Sending…”, spinner, <code>aria-busy</code></td></tr>
          </tbody>
        </table>

        <h3 className="ms-sub">Tags &amp; chips</h3>
        <div className="row">
          <span className="tag lab">Outline</span>
          <span className="tag lab fill">Highlight</span>
          <span className="tag lab" style={{ background: "var(--yellow)", borderColor: "var(--deep)" }}>Status</span>
          <span className="tag lab ms-withico"><Icon name="check" size={16} /> Validated</span>
        </div>

        <h3 className="ms-sub">Form fields</h3>
        <div className="ms-grid c3">
          <label className="field"><span className="lab">Email</span><input placeholder="you@company.com" /><small className="mute">We reply within two days.</small></label>
          <label className="field err"><span className="lab">Email</span><input defaultValue="not-an-email" aria-invalid /><small><i aria-hidden>!</i>Enter a valid email address.</small></label>
          <label className="field"><span className="lab">Message</span><textarea rows={3} placeholder="What are you working on?" /></label>
        </div>

        <h3 className="ms-sub">Value block — hover fills yellow</h3>
        <div className="ms-val">
          {principles.slice(0, 4).map((p, i) => (
            <div key={p.title}><span className="lab mute">0{i + 1}</span><h3 className="up h">{p.title}</h3><p>{p.body}</p></div>
          ))}
        </div>

        <h3 className="ms-sub">Work row</h3>
        <a className="ms-work" href="#casestudy" style={{ textDecoration: "none" }}>
          <span style={{ fontWeight: 800, fontSize: 20 }}>01</span>
          <div>
            <span className="lab mute">{cs.category} · {cs.year}</span>
            <h3 className="up h">{cs.title}</h3>
            <p>{cs.excerpt}</p>
            <div className="row">{cs.tags.slice(0, 3).map((t) => <span className="tag lab" key={t}>{t}</span>)}</div>
            <span className="lab ms-withico" style={{ marginTop: 12, display: "inline-flex" }}>Discover <Icon name="arrow-right" size={16} anim /></span>
          </div>
          <div className="im"><Image src={cs.cover} alt="" fill sizes="(max-width: 820px) 100vw, 400px" /></div>
        </a>

        <h3 className="ms-sub">Timeline row</h3>
        <div className="ms-tl">
          <span className="lab mute">{timeline[3].year}</span>
          <div>
            <h4>{timeline[3].company} <span className="tag lab" style={{ background: "var(--yellow)", borderColor: "var(--deep)" }}>Now</span></h4>
            <span className="lab mute">{timeline[3].title}</span>
            <p style={{ margin: "8px 0 0", color: "var(--muted)" }}>{timeline[3].body}</p>
          </div>
        </div>

        <h3 className="ms-sub">Stat tiles</h3>
        <div className="ms-grid c3">
          {[["10", "Years in UX &amp; interaction design"], ["17", "Research participants"], ["6", "Products on one platform"]].map(([n, l]) => (
            <div className="ms-stat" key={l}><b>{n}</b><span className="lab mute" dangerouslySetInnerHTML={{ __html: l }} /></div>
          ))}
        </div>

        <h3 className="ms-sub">Navigation</h3>
        <div className="ms-box" style={{ padding: 0, overflow: "hidden" }}>
          <div className="ms-navdemo">
            <b>Chinmay Sharma</b>
            <nav><a href="#components" className="on">Work</a><a href="#components">About</a><a href="#components">Contact</a></nav>
            <a className="btn ms-withico" href="#components">Résumé <Icon name="download" size={20} anim /></a>
          </div>
        </div>
      </Sec>

      {/* ---------- 10b ---------- */}
      <Sec id="portfolio" n="10b" title="Portfolio components" intro="The pieces a portfolio page is built from. Content is your real portfolio data where it exists; everything else is labelled sample copy.">
        <h3 className="ms-sub" style={{ marginTop: 0 }}>Case card — standard and featured</h3>
        <div className="ms-grid c3">
          {caseStudies.slice(0, 3).map((c, i) => <CaseCard key={c.id} c={c} index={i} />)}
        </div>
        <div style={{ marginTop: 16 }}><CaseCard c={caseStudies[1]} index={1} featured /></div>

        <h3 className="ms-sub">About block</h3>
        <AboutBlock name={owner.name} statement={owner.statement} location={owner.location}
          facts={[["Role", "Lead UX Designer"], ["Experience", owner.experience], ["Focus", "Healthcare · EdTech · AI"], ["Based in", owner.location]]} />

        <h3 className="ms-sub">Skill meters &amp; tool chips</h3>
        <div className="ms-grid c2">
          <SkillMeters skills={portfolio.skills} />
          <ToolChips tools={portfolio.tools} />
        </div>

        <h3 className="ms-sub">Awards list</h3>
        <AwardList awards={portfolio.awards.slice(0, 5)} />

        <h3 className="ms-sub">Testimonial <span className="lab mute">· sample copy</span></h3>
        <Testimonial quote="Sample quote: a single sentence about the outcome, not the person — what changed because of the work." name="Name Surname" role="Role · Organisation" />

        <h3 className="ms-sub">Contact form — try submitting it empty</h3>
        <ContactForm />

        <h3 className="ms-sub">Site footer</h3>
        <SiteFooter name={owner.name} email={owner.email} resume={owner.resumeUrl} socials={owner.socials} />

        <div className="ms-grid c2" style={{ marginTop: 24 }}>
          <Do><ul><li>One featured card per index; the rest standard.</li><li>Pair every status colour with a glyph and a word.</li><li>Show the number in the DOM; the meter is decoration.</li></ul></Do>
          <Dont><ul><li>Skill meters as a self-rating without a source — say what the number measures or drop it.</li><li>A testimonial with no name and role.</li><li>More than one footer-scale email link per page.</li></ul></Dont>
        </div>
      </Sec>

      {/* ---------- 10c ---------- */}
      <Sec id="casestudy" n="10c" title="Case-study components" intro="Twenty blocks that assemble a case study. Structure first — hero, rail, tabs, sections — then the content blocks that carry the argument.">
        <h3 className="ms-sub" style={{ marginTop: 0 }}>Case hero, breadcrumb &amp; meta strip</h3>
        <CaseHero c={caseStudies[0]} role="Lead UX Designer" client="Client name" duration="Six months" />

        <h3 className="ms-sub">Section header</h3>
        <SectionHeader n="03" eyebrow="Research" title="What we learned" intro="One sentence that states the finding before the evidence arrives." />

        <h3 className="ms-sub">Sticky table of contents with scroll-spy &amp; reading progress</h3>
        <p className="mute">Scroll the frame. The rail tracks the section in view; the bar tracks how far through you are.</p>
        <TocRail sections={[
          { id: "context", label: "Context", body: "The problem, who has it, and why it matters now. Sample copy for the rail demo." },
          { id: "research", label: "Research", body: "Method, participants and what the evidence showed. Sample copy for the rail demo." },
          { id: "decisions", label: "Decisions", body: "The calls that were made, with the trade-off stated. Sample copy for the rail demo." },
          { id: "outcome", label: "Outcome", body: "What changed, measured where it can be. Sample copy for the rail demo." },
        ]} />

        <h3 className="ms-sub">Tabs</h3>
        <CsTabs tabs={[
          { id: "overview", label: "Overview", body: <p className="ms-c-lead" style={{ marginTop: 0 }}>{caseStudies[1].excerpt}</p> },
          { id: "research", label: "Research", body: <FindingList items={[{ title: "Sample finding one", body: "A plain-language statement of what was observed.", evidence: "n participants" }]} /> },
          { id: "decisions", label: "Decisions", body: <p className="mute" style={{ margin: 0 }}>Decision cards go here. Use the arrow keys to move between tabs, Home and End to jump.</p> },
          { id: "outcomes", label: "Outcomes", body: <ImpactBlock metrics={[{ value: "3", label: "Teams", detail: "Sample detail line" }]} /> },
        ]} />

        <h3 className="ms-sub">Pull quote</h3>
        <PullQuote attribution="Sample attribution · Participant 4">Sample pull quote: the single line a skimmer should remember.</PullQuote>

        <h3 className="ms-sub">Figure, callouts</h3>
        <div className="ms-grid c2">
          <Figure caption="Fig. 1 — Sample caption: say what the image shows and why it is here." />
          <div className="ms-grid">
            <Callout kind="insight">Sample insight: the thing that changed the direction of the work.</Callout>
            <Callout kind="note">Sample note: context a reader needs but the argument does not.</Callout>
            <Callout kind="risk">Sample risk: what could go wrong and what was done about it.</Callout>
          </div>
        </div>

        <h3 className="ms-sub">Persona cards <span className="lab mute">· sample copy</span></h3>
        <div className="ms-grid c3">
          <PersonaCard name="Persona one" role="Role label" goal="What they are trying to get done." pain="What currently gets in the way." tone="var(--yellow)" />
          <PersonaCard name="Persona two" role="Role label" goal="What they are trying to get done." pain="What currently gets in the way." tone="var(--pink)" />
          <PersonaCard name="Persona three" role="Role label" goal="What they are trying to get done." pain="What currently gets in the way." tone="var(--green)" />
        </div>

        <h3 className="ms-sub">Finding list <span className="lab mute">· sample copy</span></h3>
        <FindingList items={[
          { title: "Sample finding: state it as an observation", body: "One or two sentences of evidence, written so it could be checked.", evidence: "7 of 9 participants" },
          { title: "Sample finding: the second observation", body: "Findings trace to participants, never to opinion.", evidence: "4 of 8 sessions" },
        ]} />

        <h3 className="ms-sub">Decision cards <span className="lab mute">· sample copy</span></h3>
        <div className="ms-grid c2">
          <DecisionCard n="01" decision="Sample decision stated as an action" why="The evidence or constraint that forced it." tradeoff="What was given up, said plainly." status="Completed" />
          <DecisionCard n="02" decision="A decision still in flight" why="The evidence or constraint that forced it." tradeoff="What is being given up." status="In progress" />
        </div>

        <h3 className="ms-sub">Before / after</h3>
        <BeforeAfter before="Sample: the old experience in one line" after="Sample: the new experience in one line" />

        <h3 className="ms-sub">Process steps</h3>
        <ProcessSteps steps={[
          { phase: "Discover", title: "Understand", body: "Interviews and context.", icon: "search" },
          { phase: "Define", title: "Synthesise", body: "Personas and journeys.", icon: "layers" },
          { phase: "Design", title: "Decide", body: "Options and trade-offs.", icon: "lightbulb" },
          { phase: "Validate", title: "Test", body: "Usability and iteration.", icon: "check-circle" },
        ]} />

        <h3 className="ms-sub">Impact metrics</h3>
        <ImpactBlock metrics={caseStudies[0].metrics.map((m, i) => ({ value: m.value, label: m.label, detail: m.detail, delta: i === 0 ? "from your portfolio data" : undefined }))} />

        <h3 className="ms-sub">Roadmap with status <span className="lab mute">· sample copy</span></h3>
        <div className="ms-grid c2" style={{ marginBottom: 12 }}>
          <div className="row"><StatusPill status="Completed" /><StatusPill status="In progress" /><StatusPill status="Planned" /><StatusPill status="Foundational" /></div>
        </div>
        <RoadmapTable rows={[
          { item: "Sample roadmap item", why: "The evidence that put it here.", status: "Completed", horizon: "Now" },
          { item: "Second sample item", why: "The evidence that put it here.", status: "In progress", horizon: "Next" },
          { item: "Third sample item", why: "The evidence that put it here.", status: "Planned", horizon: "Later" },
          { item: "Fourth sample item", why: "The evidence that put it here.", status: "Foundational", horizon: "Always" },
        ]} />

        <h3 className="ms-sub">Accordion — for FAQs and appendices, never the argument</h3>
        <Accordion items={[
          { q: "Sample question one?", a: "Sample answer. Panels stay in the DOM so find-in-page and screen readers reach them." },
          { q: "Sample question two?", a: "Only one panel is open at a time, and the first starts open." },
          { q: "Sample question three?", a: "Height animates through grid rows — never by animating height itself." },
        ]} />

        <h3 className="ms-sub">Reflection <span className="lab mute">· sample copy</span></h3>
        <ReflectionList items={[{ kept: "Sample: a decision that held up", change: "Sample: what I would do differently" }, { kept: "Sample: a second thing that worked", change: "Sample: a second thing to change" }]} />

        <h3 className="ms-sub">Next case study</h3>
        <NextStudy title={caseStudies[2].title} description={caseStudies[2].excerpt} href="#casestudy" />

        <div className="ms-grid c2" style={{ marginTop: 24 }}>
          <Do><ul><li>Order: hero → rail → context → research → decisions → outcome → reflection → next.</li><li>Every claim block carries its evidence (&ldquo;7 of 9 participants&rdquo;).</li><li>Keep panels in the DOM so find-in-page works.</li></ul></Do>
          <Dont><ul><li>Hide the argument inside an accordion or a tab.</li><li>A decision card without its trade-off.</li><li>An outcome with no number and no source.</li></ul></Dont>
        </div>
      </Sec>

      {/* ---------- 12 ---------- */}
      <Sec id="patterns" n="11–12" title="Patterns" intro="Seven page-level compositions. Case-study blocks reuse these: headings at Display L, callouts as value blocks, media in the standard frame.">
        <div className="ms-band">
          <h3 className="up l">Not a pixel without a <em>reason.</em></h3>
          <p style={{ maxWidth: "34em", color: "#cbd0d6" }}>Dark statement band — one headline with one orange emphasis word, one paragraph, optional stats.</p>
          <div className="ms-bandstats">
            {[["10 yrs", "Experience"], ["6", "Products"], ["3", "AI providers"]].map(([n, l]) => (
              <div key={l}><b>{n}</b><span className="lab">{l}</span></div>
            ))}
          </div>
        </div>
        <div className="ms-cta" style={{ marginTop: 16 }}>
          <h3 className="up l" style={{ marginBottom: 24 }}>Got a hard problem?</h3>
          <div className="row">
            <a className="btn ms-withico" href={`mailto:${owner.email}`}><Icon name="mail" size={20} anim /> Say hello</a>
            <a className="btn ghost ms-withico" href={owner.resumeUrl}>Download résumé <Icon name="download" size={20} anim /></a>
          </div>
        </div>
      </Sec>

      {/* ---------- 13 ---------- */}
      <Sec id="responsive" n="13" title="Responsive" intro="Resize the frame below. The pattern inside reflows by container width, so it behaves exactly as it would at that viewport — no browser resizing needed.">
        <ResponsiveLab />
      </Sec>

      {/* ---------- 14 ---------- */}
      <Sec id="accessibility" n="14" title="Accessibility" intro="WCAG 2.2 AA is the floor, and this system is stricter in two places: 44px targets and measured non-text contrast.">
        <div className="ms-grid c2">
          <div className="ms-box"><b>Binding rules</b><ul>
            <li>Contrast table in 02 — text 4.5:1, large 3:1, non-text 3:1.</li>
            <li>Focus: 3px deep outline, 2px offset; yellow on dark. Never removed.</li>
            <li>Targets ≥ 44px (WCAG 2.5.8 asks 24px).</li>
            <li>One h1, ordered headings, landmarks, skip link first.</li>
            <li>No colour-only state; every state pairs with a glyph or text.</li>
            <li>Reduced motion removes transforms and pointer effects.</li>
          </ul></div>
          <div className="ms-box"><b>Verification pass</b><ul>
            <li>axe clean on every template.</li>
            <li>Keyboard-only walk of each flow, including the overlay menu.</li>
            <li>VoiceOver pass on hero, work index and contact form.</li>
            <li>Reduced-motion on and off.</li>
            <li>200% zoom with no horizontal scroll at 320px.</li>
          </ul></div>
        </div>
        <h3 className="ms-sub">Focus is visible on every surface</h3>
        <div className="row">
          <button className="btn">Tab to me</button>
          <button className="ms-iconbtn" aria-label="Search"><Icon name="search" size={20} anim /></button>
          <span className="ms-focusdark"><button className="btn ms-ondark">On a dark band</button></span>
        </div>
      </Sec>

      {/* ---------- 15 ---------- */}
      <Sec id="voice" n="15" title="Voice" intro="First person, declarative, under 20 words a sentence. Headlines take a position; buttons use verbs.">
        <div className="ms-grid c2">
          <Do><p className="up h" style={{ marginTop: 10 }}>Evidence over assumption.</p><ul><li>“17 participants across 3 geographies.”</li><li>“Say hello” · “Download résumé”</li><li>Errors: what happened, then what to do.</li></ul></Do>
          <Dont><p className="mute" style={{ marginTop: 10 }}>“Passionate designer leveraging synergies to craft delightful experiences.”</p><ul><li>“Various stakeholders” — name them.</li><li>“Learn more” — say what is being learned.</li><li>Numbers without a unit or a source.</li></ul></Dont>
        </div>
      </Sec>

      {/* ---------- 16 ---------- */}
      <Sec id="data" n="16" title="Data &amp; charts" intro="Flat fills from the accent set, maximum four series, labelled directly instead of with a legend.">
        <div className="ms-grid c2">
          <div className="ms-box">
            <span className="lab mute">Bars grow from zero on first view, 600ms</span>
            <div className="ms-chart">
              {[["Research", 94, "yellow"], ["Interaction", 95, "pink"], ["Systems", 92, "green"], ["AI", 88, "orange"]].map(([l, v, c]) => (
                <div key={l as string}>
                  <span className="lab">{l}</span>
                  <i style={{ width: `${v as number}%`, background: `var(--${c})` }} />
                  <span className="lab mute">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="ms-box"><b>Rules</b><ul><li>Always ship the data table or a text summary.</li><li>Gridlines 1px ink at 20%; nothing heavier.</li><li>Never encode meaning in colour alone — label it.</li><li>Reduced motion renders the final state.</li></ul></div>
        </div>
      </Sec>

      {/* ---------- 17 ---------- */}
      <Sec id="tokens" n="17" title="Tokens" intro="No raw hex or millisecond value belongs in a component. Everything resolves to one of these.">
        <pre className="ms-code">{`:root {
  /* colour */
  --paper:#F2F2EA; --sand:#ECECE3; --ink:#333333; --deep:#101820; --muted:#6B6B63;
  --yellow:#FEBE1E; --orange:#FF640A; --green:#00BE5A; --pink:#FFA9F0; --stone:#A2A2A2;

  /* shape */
  --rule:2px solid var(--ink);
  --r-pill:999px; --r-card:16px; --r-img:14px;

  /* motion */
  --dur-instant:100ms; --dur-fast:250ms; --dur:300ms; --dur-slow:600ms; --dur-page:700ms;
  --ease:ease;
  --ease-out:cubic-bezier(.2,.7,.2,1);
  --ease-in-out:cubic-bezier(.76,0,.24,1);
  --ease-spring:cubic-bezier(.34,1.56,.64,1);
  --stagger:60ms; --stagger-line:80ms; --stagger-word:40ms; --stagger-letter:25ms;
  --dur-vt:450ms;
  --dur-t-quick:200ms; --dur-t-standard:320ms; --dur-t-expressive:520ms; --dur-t-max:700ms;

  /* layout */
  --container:1240px; --gutter:clamp(20px,4vw,48px); --columns:12; --col-gap:24px;
  --space-1:4px;  --space-2:8px;   --space-3:12px; --space-4:16px;  --space-5:24px;
  --space-6:32px; --space-7:48px;  --space-8:64px; --space-9:96px;  --space-10:120px;

  /* icons */
  --icon-grid:24; --icon-stroke:2; --icon-cap:round; --icon-join:round;
}`}</pre>
        <p className="mute">Naming is <code>--category-name</code>. Full specification in <code>MODERN-DESIGN-SYSTEM.md</code>.</p>
      </Sec>

      {/* ---------- 18–21 ---------- */}
      <Sec id="governance" n="18–21" title="Governance &amp; delivery" intro="How the system changes, what done means, and what is still outstanding.">
        <div className="ms-grid c2">
          <div className="ms-box"><b>Definition of done</b><ul>
            <li>Matches its state table.</li><li>Uses tokens only.</li><li>Passes the section 14 checks.</li>
            <li>Tested with reduced motion.</li><li>Verified at 320, 768 and 1440.</li><li>Documented in the markdown file.</li>
          </ul></div>
          <div className="ms-box"><b>Change rules</b><ul>
            <li>A new colour needs a measured contrast row.</li>
            <li>A new motion needs a purpose, tokens and a reduced-motion behaviour.</li>
            <li>A new icon needs the construction sheet in section 06.</li>
            <li>Deviations are documented, never coded silently.</li>
          </ul></div>
        </div>
        <h3 className="ms-sub">Outstanding</h3>
        <div className="ms-box ms-dont">
          <ul>
            <li>Licensed reference fonts (Manuka, Financier Display, Basis Grotesque Pro) are not bundled — Inter and Cormorant stand in.</li>
            <li>Dark mode is out of scope for v1.0.</li>
          </ul>
        </div>
        <p className="lab mute" style={{ marginTop: 32 }}>Modern v1.0 · {ICON_NAMES.length} icons · preview route is noindex</p>
      </Sec>
    </div>
  );
}
