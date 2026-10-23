import { Link } from "react-router-dom";
import { s } from "./styleInline";
import { waLink, CV_URL } from "./site";

export function BrandMark({ size = 34 }) {
  return (
    <svg className="brand-mark" viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
      <g fill="#7ea7d8" transform="translate(24 24) rotate(-34)">
        <rect x="-7.2" y="-13.6" width="26.4" height="9.4" rx="4.7" />
        <rect x="-19.2" y="4.2" width="26.4" height="9.4" rx="4.7" />
      </g>
    </svg>
  );
}

export function SiteNav({ variant = "home" }) {
  const home = variant === "home";
  const link = (hash) => (home ? hash : `/${hash}`);
  return (
    <nav data-screen-label="Nav" style={s("position: relative; z-index: 5; max-width: 1200px; margin: 0 auto; padding: 22px 32px; display: flex; align-items: center; justify-content: space-between; gap: 24px;")}>
      <a className="brand-logo" href={home ? "#home" : "/"} aria-label="aisolhub">
        <BrandMark />
        <span className="brand-word">aisolhub</span>
      </a>
      <div data-m-nav="1" style={s("display: flex; gap: 28px; align-items: center; font-size: 15px;")}>
        <a className="hvr-1" href={link("#services")} style={s("color: #b6bac1;")}>Services</a>
        <a className="hvr-1" href={link("#process")} style={s("color: #b6bac1;")}>Process</a>
        <Link className="hvr-1" to="/work" style={s(home ? "color: #b6bac1;" : "color: #f5f6f7;")}>Work</Link>
        <a className="hvr-1" href={link("#faq")} style={s("color: #b6bac1;")}>FAQ</a>
        <a className="hvr-2" href={waLink} target="_blank" rel="noopener noreferrer" style={s("color: #ffffff; background: #2e5e9e; padding: 10px 20px; border-radius: 8px; font-weight: 600;")}>WhatsApp us</a>
      </div>
      {home ? (
        <Link className="nav-work-sm" to="/work">Work</Link>
      ) : (
        <a className="nav-work-sm" href="/">Home</a>
      )}
      <a className="nav-dp" href={waLink} target="_blank" rel="noopener noreferrer" aria-label="Message Elif on WhatsApp">
        <img src="/dp.png" alt="Elif" width="40" height="40" />
      </a>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="site-foot-inner">
        <a className="brand-logo brand-logo-sm" href="/" aria-label="aisolhub home">
          <BrandMark size={28} />
          <span className="brand-word">aisolhub</span>
        </a>
        <nav className="site-foot-nav" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/work">Work</Link>
          <a href="/#services">Services</a>
          <a href="/#faq">FAQ</a>
          <a href="/#contact">Contact</a>
        </nav>
        <div className="site-foot-copy">© 2026 aisolhub. All rights reserved.</div>
        <div className="site-foot-social">
          <a className="footer-icon" href="https://www.linkedin.com/in/aisolhub" target="_blank" rel="me noopener noreferrer" aria-label="aisolhub on LinkedIn">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z" /></svg>
          </a>
          <a className="footer-icon footer-cv" href={CV_URL} target="_blank" rel="noopener noreferrer" aria-label="Download CV">
            CV
          </a>
          <a className="footer-wa hvr-7" href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp →</a>
        </div>
      </div>
    </footer>
  );
}
