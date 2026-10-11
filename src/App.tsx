import { useEffect, type ReactNode } from "react";
import { AppStyles } from "./appStyles";
import { useScrollReveal } from "./useScrollReveal";

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
  featured?: boolean;
};

const metrics: Metric[] = [
  {
    value: "95",
    suffix: "%+",
    description: "Estimate accuracy rate across commercial glazing bids",
  },
  {
    value: "35",
    suffix: "%+",
    description:
      "Bid win rate on pursuits, nearly double the industry standard",
  },
  {
    value: "$3",
    suffix: "M+",
    description:
      "Saved across ~30 projects a year through value engineering and material negotiation",
  },
  {
    value: "15",
    suffix: "%+",
    description: "Cycle time reduction from optimizing operations",
  },
];

const capabilities = [
  {
    title: "Bid strategy & value engineering",
    description:
      "Review drawings and scope, develop detailed costs, align supplier quotations, and write competitive proposals, offering value-engineering options that help general contractors reduce project cost.",
  },
  {
    title: "Glazing constructability",
    description:
      "Connect field measurements, system requirements, submittals, and approvals to identify technical conflicts early and keep proposed work buildable.",
  },
  {
    title: "Award-to-operations handoff",
    description:
      "Carry bid intent into purchasing, fabrication, material schedules, delivery, installation, punch-list work, and warranty, negotiating 5–10% savings on materials across projects.",
  },
];

const projects: Project[] = [
  {
    category: "Education",
    label: "ProService Inc.",
    name: "Cherokee High School",
    description:
      "A public high school in Canton, Georgia. Saved $1.6M, including $100K on aluminum and 5–10% on other materials. When a third party's final measurements came in wrong, coordinated the frame rebuild and reorder.",
    value: "$4.3M",
    featured: true,
  },
  {
    category: "Commercial",
    label: "Glass Inc.",
    name: "Atlantic Station",
    description:
      "For the Atlantic Green remodel in Midtown Atlanta, scheduled purchasing, coordinated suppliers, deliveries, and installers, and followed through on pay applications, punch-list touch-ups, and warranty.",
    value: "$1M",
  },
  {
    category: "Education",
    label: "ProService Inc.",
    name: "Jackson Campus",
    description:
      "A multi-million-dollar school campus project. Priced the full glazing package with value-engineering options to help the general contractor control cost.",
    value: "$2.3M",
  },
  {
    category: "Education",
    label: "ProService Inc.",
    name: "Harlem School",
    description:
      "Glazing for a school building, estimated to meet the durability and safety needs of an education project, with 5–10% negotiated savings on materials.",
    value: "$1.7M",
  },
  {
    category: "Industrial",
    label: "ProService Inc.",
    name: "Kubota Loader Facility",
    description:
      "An industrial facility for Kubota's operations. Quantified the glazing around the plant's industrial requirements and proposed cost-saving options early, holding the budget without sacrificing performance.",
    value: "$1.3M",
  },
  {
    category: "Education",
    label: "ProService Inc.",
    name: "Jefferson High School",
    description:
      "A fast, disciplined takeoff from drawings, elevations, and specs. Scope gaps on alternates and addenda were closed before bid day, and a complete pricing package let the project team release materials without rework.",
    value: "$1M",
  },
  {
    category: "Education",
    label: "ProService Inc.",
    name: "East Hall High School",
    description:
      "Led the value-engineering review on the high school's glazing, identifying $50K in savings while maintaining the architect's design intent.",
    value: "$800K",
  },
  {
    category: "Public safety · Commercial glass",
    label: "Glass Inc.",
    name: "Air Force Base Fire Station",
    description:
      "Priced the commercial glass against federal specifications, building military submittal and compliance requirements into a clean, ready-to-award proposal.",
    value: "$250K",
  },
];

const improvements = [
  {
    marker: "A",
    kicker: "Company growth",
    title:
      "Stanley helped grow ProService Inc. from subcontractor to general contractor.",
    description:
      "By estimating, winning, and coordinating more and larger projects, Stanley helped the office grow from 2 to 7 people with a 5-person warehouse team, and annual revenue rise from $1M to $5M.",
    result: "5×",
    resultLabel: "annual revenue growth",
  },
  {
    marker: "B",
    kicker: "Digital workflow",
    title:
      "Stanley moved company operations from paper and phone calls to shared digital systems.",
    description:
      "Stanley proposed and led the setup of the operations system, so everyone can access project information directly instead of tracking down each person for answers, cutting cycle time by 15%.",
    result: "~75%",
    resultLabel: "efficiency gain",
  },
  {
    marker: "C",
    kicker: "In-house fabrication",
    title:
      "Stanley built an in-house team for storefront and window frame fabrication.",
    description:
      "Stanley proposed bringing frame fabrication in-house to save money, then organized the warehouse system to run it. Work that took a subcontractor 3–4 days now starts the same day and finishes in one, with quality controlled in-house.",
    result: "30–40%",
    resultLabel: "estimated project savings",
  },
  {
    marker: "D",
    kicker: "Supplier negotiation",
    title:
      "Stanley held the original price when a supplier raised it after the order.",
    description:
      "Two months after a $200K order, the supplier asked for $35K more. When the project manager couldn't resolve it, Stanley stepped in and kept the original $200K price.",
    result: "$35K",
    resultLabel: "cost avoided",
  },
];

const experience = [
  {
    dates: "2022 — PRESENT",
    company: "ProService Inc. · Atlanta, Georgia",
    title: "Chief Estimator",
    description: (
      <>
        Leads estimating and project coordination for commercial storefront,
        window, and glazing work, providing technical support to two project
        managers and serving as the client contact when issues arise. Before
        2024, covered every role except accounting and installation.
        <ul>
          <li>
            Coordinates 15+ suppliers, 10+ contractors, and 7+ recurring clients
          </li>
          <li>
            Coordinates an in-house team of 1 assistant, 3–4 fabricators, and
            5–6 installers
          </li>
          <li>
            Delivered 28 projects in 2023, 34 in 2025, and 30+ in 2026 to date
          </li>
          <li>Contacts suppliers directly to resolve warranty issues</li>
        </ul>
      </>
    ),
  },
  {
    dates: "2014 — 2022",
    company: "Glass Inc. · Atlanta, Georgia",
    promotions: [
      { title: "Senior Estimator", dates: "2017 — 2022" },
      { title: "Estimator", dates: "2015 — 2017" },
      { title: "Assistant Estimator", dates: "2014 — 2015" },
    ],
    description: (
      <>
        Owned commercial glass projects from $10K to $1M end to end as estimator
        and project manager, bids, proposals, purchasing, supplier and delivery
        scheduling, installer coordination, punch list, and warranty.
        <ul>
          <li>
            Worked with 20+ suppliers, 20+ general contractors, and 15+
            installers
          </li>
          <li>
            Supported by an estimating assistant and a scheduling receptionist
          </li>
        </ul>
      </>
    ),
  },
];

function SectionHeading({
  number,
  title,
  description,
  light = false,
}: {
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
  useScrollReveal();

  useEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1));

    if (!target) return;

    requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
  }, []);

  return (
    <>
      <AppStyles />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Stanley Yu home">
          <span className="brand-mark" aria-hidden="true">
            SY
          </span>
          <span>STANLEY YU</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#impact">Impact</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a
            className="nav-contact button-secondary"
            href="/portfolio/assets/YanStanleyYu2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top" data-scroll-reveal="scale">
          <div className="blueprint" aria-hidden="true">
            <span className="measure measure-a">24′–6″</span>
            <span className="measure measure-b">8′–0″</span>
          </div>

          <div className="hero-content">
            <p className="eyebrow">
              <span /> Commercial storefront · windows · glazing
            </p>
            <h1>Certainty in every estimate. Confidence in every build.</h1>
            <p className="hero-copy">
              <strong>Yan Stanley Yu</strong> is a multilingual estimator and
              preconstruction leader bridging complex engineering with executive
              execution. Expert at turning drawings, scopes, and pricing into
              buildable commercial projects, building the high-efficiency
              workflows and vendor networks that protect margins, eliminate
              risk, and accelerate delivery.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#impact">
                View career impact <span aria-hidden="true">↘</span>
              </a>
              <a className="button button-secondary" href="#contact">
                Discuss an opportunity
              </a>
            </div>
          </div>

          <aside className="availability" aria-label="Current position focus">
            <span className="status-dot" aria-hidden="true" />
            <div>
              <strong>Open to remote opportunities</strong>
              <span>Based in Georgia</span>
            </div>
          </aside>
        </section>

        <section
          className="impact-section"
          id="impact"
          data-scroll-reveal="rise"
        >
          <SectionHeading
            number="01 / IMPACT"
            title="A strong estimate protects the entire job."
            description="From the $4.3M Cherokee High School glazing project to growing ProService Inc. from $1M to $5M in annual revenue, Stanley pairs field-informed technical problem-solving with disciplined estimating, procurement, and execution, supporting an efficiency gain of about 75% and estimated project savings of 30–40%."
          />

          <div className="metrics" aria-label="Career highlights">
            {metrics.map((metric) => (
              <article key={metric.description}>
                <strong>
                  {metric.value}
                  {metric.suffix ? <span>{metric.suffix}</span> : null}
                </strong>
                <p>{metric.description}</p>
              </article>
            ))}
          </div>

          <div className="capability-grid">
            {capabilities.map((capability, index) => (
              <article
                className={`capability${index === 0 ? " capability-featured" : ""}`}
                key={capability.title}
              >
                <span className="capability-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="projects-section"
          id="projects"
          data-scroll-reveal="slide-left"
        >
          <SectionHeading
            number="02 / SELECTED WORK"
            title={
              <>
                Competitive bids.
                <br />
                Clear ownership.
              </>
            }
            description="On every project, Stanley owned the estimate and wrote the winning proposal, then efficiently managed submittals, approvals, purchasing, and suppliers alongside project management."
            light
          />
          <div className="project-list">
            {projects.map((project) => (
              <article
                className={`project${project.featured ? " project-primary" : ""}`}
                key={project.name}
              >
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
              </article>
            ))}
          </div>
        </section>

        <section
          className="systems-section"
          id="systems"
          data-scroll-reveal="slide-right"
        >
          <SectionHeading
            number="03 / SYSTEMS"
            title={
              <>
                Operational improvements
                <br />
                that compound.
              </>
            }
          />
          <div className="systems-layout">
            {improvements.map((improvement) => (
              <article className="system-story" key={improvement.marker}>
                <span className="system-marker">{improvement.marker}</span>
                <div>
                  <p className="story-kicker">{improvement.kicker}</p>
                  <h3>{improvement.title}</h3>
                  {improvement.description ? (
                    <p>{improvement.description}</p>
                  ) : null}
                </div>
                <strong>
                  {improvement.result}
                  <small>{improvement.resultLabel}</small>
                </strong>
              </article>
            ))}
          </div>
        </section>

        <section
          className="experience-section"
          id="experience"
          data-scroll-reveal="scale"
        >
          <SectionHeading
            number="04 / EXPERIENCE"
            title="Field-informed leadership."
          />
          <div className="timeline">
            {experience.map((role) => (
              <article key={role.dates}>
                <div className="timeline-date">{role.dates}</div>
                <div className="timeline-role">
                  <p>{role.company}</p>
                  {role.promotions ? (
                    <ol className="promotions">
                      {role.promotions.map((promotion) => (
                        <li key={promotion.title}>
                          <h3>{promotion.title}</h3>
                          <span>{promotion.dates}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <h3>{role.title}</h3>
                  )}
                </div>
                <div className="timeline-copy">{role.description}</div>
              </article>
            ))}
          </div>
          <div className="tools-languages">
            <div>
              <span className="mini-label">TOOLS &amp; TECHNOLOGY</span>
              <ul className="tool-list">
                <li>
                  <strong>Industry-specific software</strong>
                  <span>
                    WinBid Pro and Orgadata LogiKal — storefront and curtain
                    wall estimating, material optimization, and CAD shop drawing
                    generation
                  </span>
                </li>
                <li>
                  <strong>Construction project management</strong>
                  <span>
                    Procore — project coordination and document sharing with
                    general contractors
                  </span>
                </li>
                <li>
                  <strong>Data analysis &amp; modeling</strong>
                  <span>
                    Advanced Microsoft Excel — dynamic estimating templates,
                    complex formula architecture, and material breakdowns
                  </span>
                </li>
                <li>
                  <strong>Enterprise collaboration</strong>
                  <span>
                    Microsoft 365 and Apple iWork — Word, PowerPoint, Pages,
                    Numbers, and cloud-based document management
                  </span>
                </li>
                <li>
                  <strong>Operating environments</strong>
                  <span>
                    Multi-platform proficiency across Windows and Apple
                    macOS/iOS ecosystems
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <span className="mini-label">LANGUAGES</span>
              <dl className="language-proficiency">
                <div>
                  <dt>English</dt>
                  <dd>Proficient</dd>
                </div>
                <div>
                  <dt>Mandarin</dt>
                  <dd>Native</dd>
                </div>
                <div>
                  <dt>Cantonese</dt>
                  <dd>Native</dd>
                </div>
                <div>
                  <dt>Hakka</dt>
                  <dd>Native</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-content" data-scroll-reveal="rise">
            <p className="section-number">05 / CONTACT</p>
            <div className="contact-main">
              <p>For remote opportunities around estimating:</p>
              <a href="mailto:stanleyu9898@gmail.com">
                stanleyu9898@gmail.com <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="target-roles" aria-label="Target leadership roles">
              <span>Chief Estimator</span>
              <span>Senior Estimator</span>
              <span>Principal Estimator</span>
            </div>
            <div className="contact-meta">
              <span>Remote opportunities</span>
              <span>Based in Georgia</span>
              <a
                href="https://www.linkedin.com/in/yan-stanley-yu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>YAN STANLEY YU · CHIEF ESTIMATOR</span>
        <span>Commercial storefront · windows · glazing</span>
      </footer>
    </>
  );
}

export default App;
