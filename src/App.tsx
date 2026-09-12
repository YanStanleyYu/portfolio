import type { ReactNode } from "react";
import "./App.css";

type Metric = {
  value: string;
  suffix?: string;
  description: string;
};

type Project = {
  category: string;
  label: string;
  name: string;
  description: string;
  value: string;
  scope: string[];
  featured?: boolean;
};

const metrics: Metric[] = [
  { value: "360", suffix: "°", description: "Estimating-to-closeout visibility across awarded scopes" },
  { value: "$4.3", suffix: "M", description: "Commercial glazing project estimated and coordinated" },
  { value: "34", description: "Active projects coordinated across client relationships in 2025" },
  { value: "15", suffix: "+", description: "Supplier relationships strengthening pricing and procurement" },
];

const capabilities = [
  {
    title: "Bid strategy & scope control",
    description: "Review drawings and scope, develop detailed costs, align supplier quotations, and prepare clear, competitive proposals for commercial storefront, window, and glazing packages.",
  },
  {
    title: "Glazing constructability",
    description: "Connect field measurements, system requirements, submittals, and approvals to identify technical conflicts early and keep proposed work buildable.",
  },
  {
    title: "Award-to-operations handoff",
    description: "Carry bid intent into purchasing, fabrication, material schedules, delivery, installation support, punch-list resolution, warranty, and cost control.",
  },
];

const projects: Project[] = [
  {
    category: "Education · Commercial glazing",
    label: "Featured project",
    name: "Cherokee High School",
    description: "Owned estimating and proposal development, then coordinated submittals, purchasing, supplier communication, and technical resolution alongside project management.",
    value: "$4.3M",
    scope: ["Bid development", "Scope coordination", "Procurement", "Technical resolution"],
    featured: true,
  },
  {
    category: "Mixed-use · Atlanta",
    label: "Successful bid · full handoff",
    name: "Atlantic Station",
    description: "Built the successful bid and proposal, then carried scope and pricing intent into purchasing, supplier coordination, delivery, installation, punch-list work, and warranty follow-up.",
    value: "$1M",
    scope: ["Bid strategy", "Award handoff", "Installation support", "Closeout"],
  },
];

const improvements = [
  {
    marker: "A",
    kicker: "Digital workflow",
    title: "Made estimating and project data visible to the full team.",
    description: "Proposed and helped implement a digital operations system that replaced scattered paper files with shared access to project information—reducing repeated calls and decision bottlenecks.",
    result: "~75%",
    resultLabel: "reported efficiency gain",
  },
  {
    marker: "B",
    kicker: "In-house fabrication",
    title: "Brought storefront fabrication closer to cost control.",
    description: "Recommended an internal storefront-frame fabrication capability and helped organize the workflow—reducing external lead time while improving control over cost, quality, and execution.",
    result: "30–40%",
    resultLabel: "estimated project savings",
  },
  {
    marker: "C",
    kicker: "Supplier negotiation",
    title: "Defended the estimate when post-order pricing changed.",
    description: "Negotiated through an unexpected supplier increase, preserved the quoted cost position, and avoided $35K in added expense.",
    result: "$35K",
    resultLabel: "cost avoided",
  },
];

const experience = [
  {
    dates: "2022—Present",
    company: "Pro Surface · Atlanta, Georgia",
    title: "Chief Estimator & Chief Project Coordinator",
    description: "Leads commercial storefront, window, and glazing estimates from scope review and proposal development through supplier pricing and award handoff. Partners with project delivery on technical resolution, procurement, fabrication, installation, and warranty—supporting larger, more complex pursuits.",
  },
  {
    dates: "2013—2022",
    company: "Glass Inc. · Atlanta, Georgia",
    title: "Cost Engineer / Project Management",
    description: "Developed budgets, quotations, and proposals for commercial glass projects, then coordinated vendors, purchasing, schedules, installation support, closeout, and contractor relationships to protect the awarded scope.",
  },
];

function SectionHeading({ number, title, description, light = false }: {
  number: string;
  title: ReactNode;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-intro${light ? " light" : ""}`}>
      <p className="section-number">{number}</p>
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Yan Yu home">
          <span className="brand-mark" aria-hidden="true">YY</span>
          <span>YAN YU</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#impact">Impact</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a className="nav-contact" href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="blueprint" aria-hidden="true">
            <span className="measure measure-a">24′–6″</span>
            <span className="measure measure-b">8′–0″</span>
          </div>

          <div className="hero-content">
            <p className="eyebrow"><span /> Chief Estimator · Commercial storefront · windows · glazing</p>
            <h1>Win the right work.<br />Build it with confidence.</h1>
            <p className="hero-copy">Chief Estimator translating drawings, scope, supplier pricing, constructability, and field conditions into complete, competitive glazing proposals—then carrying bid intent cleanly into operations.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">View selected work <span aria-hidden="true">↘</span></a>
              <a className="button button-secondary" href="mailto:stanleyu9898@gmail.com">Discuss an opportunity</a>
            </div>
          </div>

          <aside className="availability" aria-label="Current position focus">
            <span className="status-dot" aria-hidden="true" />
            <div>
              <strong>Open to Chief Estimator opportunities</strong>
              <span>Based in Georgia</span>
            </div>
          </aside>
        </section>

        <section className="impact-section" id="impact">
          <SectionHeading
            number="01 / IMPACT"
            title="A strong estimate protects the entire job."
            description="Yan connects bid strategy, scope coverage, supplier pricing, and constructability to purchasing, fabrication, installation, closeout, and warranty—protecting margin from pursuit through delivery."
          />

          <div className="metrics" aria-label="Career highlights">
            {metrics.map((metric) => (
              <article key={metric.description}>
                <strong>{metric.value}{metric.suffix ? <span>{metric.suffix}</span> : null}</strong>
                <p>{metric.description}</p>
              </article>
            ))}
          </div>

          <div className="capability-grid">
            {capabilities.map((capability, index) => (
              <article className={`capability${index === 0 ? " capability-featured" : ""}`} key={capability.title}>
                <span className="capability-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="projects-section" id="projects">
          <SectionHeading number="02 / SELECTED WORK" title={<>Competitive bids.<br />Accountable handoffs.</>} light />
          <div className="project-list">
            {projects.map((project) => (
              <article className={`project${project.featured ? " project-primary" : ""}`} key={project.name}>
                <div className="project-topline">
                  <span>{project.category}</span>
                  <span>{project.label}</span>
                </div>
                <div className="project-body">
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                  </div>
                  <strong className="project-value">{project.value}</strong>
                </div>
                <div className="project-scope">
                  {project.scope.map((item) => <span key={item}>{item}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="systems-section">
          <SectionHeading number="03 / SYSTEMS" title={<>Estimating improvements<br />that protect margin.</>} />
          <div className="systems-layout">
            {improvements.map((improvement) => (
              <article className="system-story" key={improvement.marker}>
                <span className="system-marker">{improvement.marker}</span>
                <div>
                  <p className="story-kicker">{improvement.kicker}</p>
                  <h3>{improvement.title}</h3>
                  {improvement.description ? <p>{improvement.description}</p> : null}
                </div>
                <strong>{improvement.result}<small>{improvement.resultLabel}</small></strong>
              </article>
            ))}
          </div>
        </section>

        <section className="experience-section" id="experience">
          <SectionHeading number="04 / EXPERIENCE" title="Preconstruction leadership with field accountability." />
          <div className="timeline">
            {experience.map((role) => (
              <article key={role.dates}>
                <div className="timeline-date">{role.dates}</div>
                <div className="timeline-role">
                  <p>{role.company}</p>
                  <h3>{role.title}</h3>
                </div>
                <p className="timeline-copy">{role.description}</p>
              </article>
            ))}
          </div>
          <div className="tools-languages">
            <div>
              <span className="mini-label">TOOLS &amp; TECHNOLOGY</span>
              <ul className="tool-list">
                <li>
                  <strong>Industry-specific software</strong>
                  <span>WinBid Pro — storefront and curtain wall estimating, material optimization, and CAD shop drawing generation</span>
                </li>
                <li>
                  <strong>Data analysis &amp; modeling</strong>
                  <span>Advanced Microsoft Excel — dynamic estimating templates, complex formula architecture, and material breakdowns</span>
                </li>
                <li>
                  <strong>Enterprise collaboration</strong>
                  <span>Microsoft 365 ecosystem — Word, PowerPoint, and cloud-based document management</span>
                </li>
                <li>
                  <strong>Operating environments</strong>
                  <span>Multi-platform proficiency across Windows and Apple macOS/iOS ecosystems</span>
                </li>
              </ul>
            </div>
            <div>
              <span className="mini-label">LANGUAGES</span>
              <p>English · Mandarin · Cantonese · Hakka</p>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <p className="section-number">05 / CONTACT</p>
          <div className="contact-main">
            <p>For Chief Estimator and senior commercial glazing estimating opportunities:</p>
            <a href="mailto:stanleyu9898@gmail.com">stanleyu9898@gmail.com <span aria-hidden="true">↗</span></a>
          </div>
          <div className="contact-meta">
            <span>Cumming, Georgia</span>
            <a href="tel:+17708869898">770-886-9898</a>
            <span>Remote opportunities</span>
          </div>
        </section>
      </main>

      <footer>
        <span>YAN YU · CHIEF ESTIMATOR</span>
        <span>Commercial storefront · windows · glazing</span>
      </footer>
    </>
  );
}

export default App;
