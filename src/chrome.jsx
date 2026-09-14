import { Link } from "react-router-dom";
import { s } from "./styleInline";
import { waLink } from "./site";

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
          <a className="footer-icon" href="https://github.com/aisolhub2026" target="_blank" rel="me noopener noreferrer" aria-label="aisolhub on GitHub">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
          </a>
          <a className="footer-wa hvr-7" href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp →</a>
        </div>
      </div>
    </footer>
  );
}
