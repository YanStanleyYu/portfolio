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
  { value: "360", suffix: "°", description: "Scope ownership from estimating through closeout and warranty" },
  { value: "$4.3", suffix: "M", description: "Scale of a major commercial glazing project coordinated" },
  { value: "34", description: "Projects handled in 2025 across active client relationships" },
  { value: "15", suffix: "+", description: "Supplier relationships supporting pricing and procurement" },
];

const capabilities = [
  {
    title: "Estimating & proposals",
    description: "Scope review, cost detail, quotations, bid proposals, general provisions, and pricing strategy for commercial storefront and glazing packages.",
  },
  {
    title: "Technical coordination",
    description: "Submittals, approvals, field measurements, constructability questions, corrective solutions, and project-manager support.",
  },
  {
    title: "Procurement & delivery",
    description: "Supplier negotiations, purchasing, material schedules, delivery coordination, warranty follow-up, and cost control.",
  },
];

const projects: Project[] = [
  {
    category: "Education · Commercial glazing",
    label: "Featured project",
    name: "Cherokee High School",
    description: "Coordinated estimating, proposal development, submittals, purchasing, supplier communication, and technical problem-solving alongside project management.",
    value: "$4.3M",
    scope: ["Estimating", "Submittals", "Procurement", "Technical support"],
    featured: true,
  },
  {
    category: "Mixed-use · Atlanta",
    label: "End-to-end delivery",
    name: "Atlantic Station",
    description: "Prepared the successful bid and proposal, then coordinated purchasing, materials, suppliers, delivery, installers, applications, punch-list work, and warranty follow-up.",
    value: "$1M",
    scope: ["Bid award", "Scheduling", "Installation support", "Closeout"],
  },
];

const improvements = [
  {
    marker: "A",
    kicker: "Digital workflow",
    title: "From scattered paperwork to shared visibility.",
    description: "Proposed and helped implement a digital operations system so project information could be accessed across the team without relying on paper files, repeated calls, or individual gatekeepers.",
    result: "~75%",
    resultLabel: "reported efficiency gain",
  },
  {
    marker: "B",
    kicker: "In-house fabrication",
    title: "Faster response. Better cost and quality control.",
    description: "Recommended building an internal storefront-frame fabrication capability and helped organize the workflow—reducing external lead time and increasing control over execution.",
    result: "30–40%",
    resultLabel: "estimated project savings",
  },
  {
    marker: "C",
    kicker: "Supplier negotiation",
    title: "Protected $35K when post-order pricing changed.",
    description: "",
    result: "$35K",
    resultLabel: "cost avoided",
  },
];

const experience = [
  {
    dates: "CURRENT ROLE",
    company: "Pro Surface · Atlanta area",
    title: "Chief Estimator & Chief Project Coordinator",
    description: "Leads estimating and supports project delivery across client coordination, proposals, technical resolution, supplier relationships, procurement, fabrication, installation, and warranty. Helped the business expand its operational capacity and pursue larger projects.",
  },
  {
    dates: "PRIOR ROLE",
    company: "Glass Inc. · Atlanta, Georgia",
    title: "Cost Engineer / Project Management",
    description: "Managed project budgeting, quotations, proposals, scheduling, vendor coordination, purchasing, installation support, closeout, and contractor relationships for commercial glass projects.",
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
            <span className="blueprint-label label-a">FRAME / A-01</span>
            <span className="blueprint-label label-b">GLAZING LINE</span>
            <span className="measure measure-a">24′–6″</span>
            <span className="measure measure-b">8′–0″</span>
          </div>

          <div className="hero-content">
            <p className="eyebrow"><span /> Commercial storefront · windows · glazing</p>
            <h1>Building certainty<br />into every estimate.</h1>
            <p className="hero-copy">Chief Estimator and project coordination leader turning drawings, scope, supplier pricing, and field realities into buildable commercial projects.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">View selected work <span aria-hidden="true">↘</span></a>
              <a className="button button-secondary" href="mailto:stanleyu9898@gmail.com">Discuss an opportunity</a>
            </div>
          </div>

          <aside className="availability" aria-label="Current position focus">
            <span className="status-dot" aria-hidden="true" />
            <div>
              <strong>Open to remote leadership roles</strong>
              <span>Based in Georgia</span>
            </div>
          </aside>
        </section>

        <section className="impact-section" id="impact">
          <SectionHeading
            number="01 / IMPACT"
            title="Estimate beyond the bid."
            description="Yan connects preconstruction decisions to purchasing, fabrication, installation, closeout, and warranty—helping teams protect margin long after award."
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
          <SectionHeading number="02 / SELECTED WORK" title={<>Complex projects.<br />Clear ownership.</>} light />
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
          <SectionHeading number="03 / SYSTEMS" title={<>Operational improvements<br />that compound.</>} />
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
          <SectionHeading number="04 / EXPERIENCE" title="Field-informed leadership." />
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
              <span className="mini-label">TOOLS</span>
              <p>Wing Bid Pro · Microsoft Excel · Word · PowerPoint · Apple Pages · Numbers</p>
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
            <p>For Chief Estimator, Senior Estimator, or preconstruction leadership opportunities:</p>
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
