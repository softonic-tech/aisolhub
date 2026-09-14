import { Link } from "react-router-dom";
import { SiteFooter, SiteNav } from "./chrome";
import Seo from "./Seo";
import { NOT_FOUND_DESC, NOT_FOUND_TITLE, waLink } from "./site";

export default function NotFoundPage() {
  return (
    <div className="nf-page">
      <Seo title={NOT_FOUND_TITLE} description={NOT_FOUND_DESC} robots="noindex, follow" />
      <div className="nf-top">
        <SiteNav variant="work" />
        <main id="main" className="nf-main">
          <p className="nf-kicker">404 · not indexed</p>
          <h1>This page is not here.</h1>
          <p className="nf-lead">
            The link is old, broken, or typed wrong. aisolhub is still on home and work. Google will not keep this URL.
          </p>
          <div className="nf-actions">
            <Link className="hvr-3 nf-btn" to="/">
              Back to home
            </Link>
            <Link className="hvr-4 nf-ghost" to="/work">
              See the work
            </Link>
            <a className="hvr-4 nf-ghost" href={waLink} target="_blank" rel="noopener noreferrer">
              WhatsApp us
            </a>
          </div>
          <ul className="nf-links">
            <li>
              <Link to="/">
                <strong>Home</strong>
                <span>Automations, agents, the studio.</span>
              </Link>
            </li>
            <li>
              <Link to="/work">
                <strong>Work</strong>
                <span>Thirteen builds. Not websites.</span>
              </Link>
            </li>
            <li>
              <a href="/#services">
                <strong>Services</strong>
                <span>n8n, CRM, WhatsApp, voice.</span>
              </a>
            </li>
          </ul>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
