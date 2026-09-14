import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SiteFooter, SiteNav } from "./chrome";
import FlowCanvas from "./FlowCanvas";
import Seo from "./Seo";
import { PROJECT_FILTERS, projectsData } from "./data/projects";
import { workJsonLd } from "./data/seo";
import { s } from "./styleInline";
import { SITE_URL, WORK_DESC, WORK_TITLE, waLink } from "./site";

const WORK_TICKS = [
  "Lead scored and pushed to the CRM",
  "n8n posted to Instagram on schedule",
  "AI agent replied on WhatsApp",
  "Incident summary drafted for ops",
];

function WorkCard({ project }) {
  return (
    <article className="work-card">
      <div className="work-frame">
        <div className="work-frame-bar">
          <div className="work-frame-live">
            <span />
            <span>automation running</span>
          </div>
          <span className="case-sig" aria-hidden="true">
            <svg viewBox="0 0 48 48" width="14" height="14">
              <g fill="#7ea7d8" transform="translate(24 24) rotate(-34)">
                <rect x="-7.2" y="-13.6" width="26.4" height="9.4" rx="4.7" />
                <rect x="-19.2" y="4.2" width="26.4" height="9.4" rx="4.7" />
              </g>
            </svg>
            aisolhub
          </span>
        </div>
        <div className="work-shot">
          <img src={project.imageUrl} alt={`${project.title} — client business. aisolhub built the automations, not the website.`} />
          <span className="work-shot-note">Their business · our automations</span>
        </div>
      </div>
      <div className="work-body">
        <div className="work-kicker">{project.sector}</div>
        <h2>{project.title}</h2>
        <p className="work-lead">{project.summary}</p>
        <p>{project.description}</p>
        <ul>
          {project.keyFeatures.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="work-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {project.liveUrl ? (
          <a className="work-out" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            Client site →
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function WorkPage() {
  const [filter, setFilter] = useState("all");
  const items = useMemo(
    () => (filter === "all" ? projectsData : projectsData.filter((p) => p.type === filter)),
    [filter]
  );

  return (
    <div data-m-page="1" className="work-page" style={s("background: #f3f4f6; overflow: hidden;")}>
      <Seo title={WORK_TITLE} description={WORK_DESC} canonical={`${SITE_URL}/work`} jsonLd={workJsonLd} />
      <div style={s("background: #08090b; position: relative;")}>
        <SiteNav variant="work" />
        <header id="main" className="work-hero" data-m-hero="1">
          <div className="work-hero-copy" data-m-htext="1">
            <nav className="crumbs" aria-label="Breadcrumb">
              <ol>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <span aria-current="page">Work</span>
                </li>
              </ol>
            </nav>
            <div className="work-hero-kicker">Client work</div>
            <h1>Automations we shipped. Not websites we designed.</h1>
            <p>
              Screenshots show the businesses we automated for. Behind each one: AI agents, n8n workflows, CRM sync, social posting and ops that run without a person in the loop.
            </p>
            <div className="work-hero-meta">13 engagements · AI · n8n · CRM · social · US UK Europe</div>
          </div>
          <FlowCanvas ticks={WORK_TICKS} />
        </header>
      </div>

      <section className="work-main">
        <div className="work-filters" role="tablist" aria-label="Filter work">
          {PROJECT_FILTERS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={filter === tab.id}
              className={filter === tab.id ? "is-on" : ""}
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="work-grid">
          {items.map((project) => (
            <WorkCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="work-cta">
        <div>
          <div className="work-hero-kicker">Get started</div>
          <h2>Want the same layer on your stack?</h2>
          <p>Twenty minute audit. We map the busywork, then quote a fixed build. Your site stays yours.</p>
        </div>
        <div className="work-cta-actions">
          <a className="hvr-3" href={waLink} target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp →
          </a>
          <Link className="work-ghost" to="/#contact">
            Back to home
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
