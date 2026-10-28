/**
 * Generic sample content for the design-system preview.
 * Replace this file to preview the components with your own copy.
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const portfolio = {
  owner: {
    name: "Chinmay Sharma",
    title: "Lead UX Designer · AI Product Designer",
    experience: "10 years",
    statement:
      "I design research-led, accessible, AI-powered products in healthcare and ed-tech — from early discovery and journey mapping to scalable design systems and validated solutions. My work sits at the intersection of UX, product strategy, and AI execution.",
    location: "City, Country",
    email: "hello@example.com",
    resumeUrl: "#",
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Email", href: "mailto:hello@example.com" }
    ]
  },
  principles: [
    { title: "Evidence over assumption", body: "Qualitative and quantitative research shape direction before interface polish — every design decision should be traceable to a participant, a metric, or a constraint." },
    { title: "Accessibility is product quality", body: "WCAG conformance, inclusive interaction patterns, and screen-reader-first thinking are treated as core requirements, not late-stage compliance." },
    { title: "Systems that scale teams", body: "Tokenised foundations, governance models, and contribution workflows let small teams ship consistent, accessible product surfaces at speed." },
    { title: "AI as a design material", body: "AI accelerates research synthesis, prototyping, and adaptive experiences — but human judgement owns the outcome and the user's trust." }
  ],
  timeline: [
    { year: "2014", company: "Company one", title: "Graphic Designer", body: "A sentence describing the scope of the role and what it built." },
    { year: "2015 – 2018", company: "Company two", title: "UI Designer", body: "A sentence describing the scope of the role and what it built." },
    { year: "2018 – 2020", company: "Company three", title: "Senior Interaction Designer", body: "A sentence describing the scope of the role and what it built." },
    { year: "2020 – Present", company: "Company four", title: "Lead Interaction Designer", body: "A sentence describing the scope of the role and what it built.", current: true }
  ],
  skills: [
    { label: "User Research", value: 94, group: "Research" },
    { label: "Usability Testing", value: 92, group: "Research" },
    { label: "Interaction Design", value: 95, group: "Craft" },
    { label: "Design Systems", value: 92, group: "Craft" },
    { label: "Accessibility", value: 93, group: "Quality" },
    { label: "AI Product Design", value: 88, group: "Emerging" }
  ],
  tools: [
    { name: "Figma", group: "Design" },
    { name: "Illustrator", group: "Design" },
    { name: "Photoshop", group: "Design" },
    { name: "Mural", group: "Research" },
    { name: "Dovetail", group: "Research" },
    { name: "Confluence", group: "Collaboration" },
    { name: "Jira", group: "Collaboration" },
    { name: "Claude", group: "AI" },
    { name: "Cursor", group: "AI" },
    { name: "VS Code", group: "AI" }
  ],
  caseStudies: [
    {
      id: "cs-one", title: "Case study one", slug: "case-study-one",
      excerpt: "Two sentences that state the problem and the outcome. The first names the tension; the second says what changed.",
      category: "Category one · Discipline", year: "2025", cover: `${base}/sample-1.svg`,
      tags: ["User Research", "UX Strategy", "Usability Testing"],
      metrics: [
        { label: "Participants", value: "17", detail: "Sample detail line" },
        { label: "Personas", value: "5", detail: "Sample detail line" },
        { label: "Decisions validated", value: "4", detail: "Sample detail line" }
      ]
    },
    {
      id: "cs-two", title: "Case study two", slug: "case-study-two",
      excerpt: "Two sentences that state the problem and the outcome. The first names the tension; the second says what changed.",
      category: "Category two · Discipline", year: "2020 – 2026", cover: `${base}/sample-2.svg`,
      tags: ["Design Systems", "Information Architecture", "Healthcare"],
      metrics: [
        { label: "Partner", value: "1", detail: "Sample detail line" },
        { label: "Role", value: "Lead", detail: "Sample detail line" },
        { label: "Span", value: "6 yrs", detail: "Sample detail line" }
      ]
    },
    {
      id: "cs-three", title: "Case study three", slug: "case-study-three",
      excerpt: "Two sentences that state the problem and the outcome. The first names the tension; the second says what changed.",
      category: "Category three · Discipline", year: "2018 – 2020", cover: `${base}/sample-3.svg`,
      tags: ["Ecommerce", "EdTech", "Interaction Design"],
      metrics: [
        { label: "Surface", value: "1", detail: "Sample detail line" },
        { label: "Flows", value: "4", detail: "Sample detail line" },
        { label: "Recognised", value: "2×", detail: "Sample detail line" }
      ]
    }
  ],
  awards: [
    { title: "Award title one", issuer: "Issuer", year: "2024" },
    { title: "Award title two", issuer: "Issuer", year: "2023" },
    { title: "Award title three", issuer: "Issuer", year: "2023" },
    { title: "Award title four", issuer: "Issuer", year: "2021" },
    { title: "Award title five", issuer: "Issuer", year: "2019" }
  ]
};
