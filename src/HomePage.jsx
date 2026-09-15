import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SiteFooter, SiteNav } from "./chrome";
import FlowCanvas from "./FlowCanvas";
import WhatsAppAgentPreview from "./WhatsAppAgentPreview";
import Seo from "./Seo";
import { FAQS, homeJsonLd } from "./data/seo";
import { s } from "./styleInline";
import { HOME_DESC, HOME_TITLE, SITE_URL, WHATSAPP_NUMBER } from "./site";
const WORDS = ["busywork.", "follow ups.", "spreadsheets.", "phone calls.", "lead hunting.", "data.", "emails."];

export default function HomePage() {
  const [wordIdx, setWordIdx] = useState(0);
  const [fName, setFName] = useState("");
  const [fBiz, setFBiz] = useState("");
  const [fNeed, setFNeed] = useState("");

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  const rotatingWordEl = (
    <span
      key={wordIdx}
      style={{ display: "inline-block", animation: "wordIn .55s cubic-bezier(.2,.8,.2,1)", color: "#7ea7d8" }}
    >
      {WORDS[wordIdx]}
    </span>
  );

  const onName = (e) => setFName(e.target.value);
  const onBiz = (e) => setFBiz(e.target.value);
  const onNeed = (e) => setFNeed(e.target.value);
  const previewMsg =
    "Hi Aisolhub! I am " +
    (fName || "...") +
    (fBiz ? " from " + fBiz : "") +
    ". I would like to automate: " +
    (fNeed || "...");
  const sendWhatsApp = (e) => {
    e.preventDefault();
    const msg =
      "Hi Aisolhub! I am " +
      (fName || "") +
      (fBiz ? " from " + fBiz : "") +
      ". I would like to automate: " +
      (fNeed || "");
    window.open(waLink + "?text=" + encodeURIComponent(msg), "_blank");
  };

  useEffect(() => {
    const wi = setInterval(() => setWordIdx((v) => (v + 1) % 6), 2600);
    const layoutHw = () => {
      const path = document.querySelector(".hw-path");
      if (!path) return;
      const track = path.querySelector(".hw-track");
      const nums = path.querySelectorAll(".hw-n");
      if (!track || nums.length < 2) return;
      const pr = path.getBoundingClientRect();
      const a = nums[0].getBoundingClientRect();
      const b = nums[nums.length - 1].getBoundingClientRect();
      const top = a.top - pr.top + a.height / 2;
      const bot = b.top - pr.top + b.height / 2;
      track.style.top = top + "px";
      track.style.height = Math.max(0, bot - top) + "px";
      track.style.left = a.left - pr.left + a.width / 2 + "px";
      const pivot = innerHeight * 0.42;
      const start = a.top + a.height / 2;
      const end = b.top + b.height / 2;
      let p = end === start ? 0 : (pivot - start) / (end - start);
      if (p < 0) p = 0;
      if (p > 1) p = 1;
      path.style.setProperty("--hw-p", String(p));
      const last = nums.length - 1;
      nums.forEach((el, idx) => {
        el.classList.toggle("is-on", p >= idx / last - 0.001);
      });
    };
    let hwR = 0;
    const onHw = () => {
      if (hwR) return;
      hwR = requestAnimationFrame(() => {
        hwR = 0;
        layoutHw();
      });
    };
    window.addEventListener("scroll", onHw, { passive: true });
    window.addEventListener("resize", onHw, { passive: true });
    layoutHw();
    const observers = [];
    const t = setTimeout(() => {
      const cardIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            en.target.classList.add("in");
            cardIo.unobserve(en.target);
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
      );
      observers.push(cardIo);
      document.querySelectorAll("[data-m-scard]").forEach((el, i) => {
        el.style.setProperty("--stagger", i * 0.07 + "s");
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight * 0.9) el.classList.add("in");
        else cardIo.observe(el);
      });
      document.querySelectorAll(".hw-leg").forEach((el, i) => {
        el.style.setProperty("--hw-stagger", i * 0.08 + "s");
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight * 0.88) el.classList.add("in");
        else cardIo.observe(el);
      });
      const nextEl = document.querySelector(".hw-next");
      const pathEl = document.querySelector(".hw-path");
      if (nextEl && pathEl) {
        const nextIo = new IntersectionObserver(
          (entries) => {
            entries.forEach((en) => {
              if (!en.isIntersecting) return;
              pathEl.classList.add("in-end");
              nextIo.unobserve(en.target);
            });
          },
          { threshold: 0.4 }
        );
        observers.push(nextIo);
        nextIo.observe(nextEl);
      }
      const targets = document.querySelectorAll("section h2, #faq details, form.wa-panel");
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.style.opacity = "1";
              en.target.style.transform = "translateY(0)";
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      observers.push(io);
      targets.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight) return;
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
        el.style.transition = `opacity .7s cubic-bezier(.16,1,.3,1) ${(i % 4) * 0.08}s, transform .7s cubic-bezier(.16,1,.3,1) ${(i % 4) * 0.08}s`;
        io.observe(el);
      });
      layoutHw();
    }, 400);
    return () => {
      clearInterval(wi);
      clearTimeout(t);
      window.removeEventListener("scroll", onHw);
      window.removeEventListener("resize", onHw);
      observers.forEach((o) => o.disconnect());
      if (hwR) cancelAnimationFrame(hwR);
    };
  }, []);

  return (
<div data-m-page="1" style={s("background: #f3f4f6; overflow: hidden;")}>
<Seo title={HOME_TITLE} description={HOME_DESC} canonical={`${SITE_URL}/`} jsonLd={homeJsonLd} />

{/* ======== NAV + DARK HERO ======== */}
<div id="home" style={s("background: #08090b; position: relative;")}>

  <SiteNav variant="home" />

  <section id="main" data-m-hero="1" data-screen-label="Hero" style={s("position: relative; z-index: 4; max-width: 1200px; margin: 0 auto; padding: 72px 32px 96px; display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 56px; align-items: center;")}>
    <div data-m-htext="1" style={s("display: flex; flex-direction: column; gap: 26px;")}>
      <div style={s("font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #7ea7d8; letter-spacing: 0.12em; text-transform: uppercase;")}>Automation studio for busy business owners</div>
      <h1 data-m-h1="1" style={s("margin: 0; font-size: 56px; line-height: 1.06; letter-spacing: -0.03em; color: #f5f6f7; font-weight: 700; text-wrap: balance; perspective: 600px;")}>Automate the {rotatingWordEl}<br /><span style={s("color: #7ea7d8;")}>Grow the business.</span></h1>
      <p style={s("margin: 0; font-size: 19px; line-height: 1.6; color: #9ba1a9; max-width: 52ch;")}>You did not start a business to sit in messages, spreadsheets and leads. We build AI agents, n8n workflows, CRM sync and WhatsApp systems for teams in the US, UK and Europe.</p>
      <div data-m-cta="1" style={s("display: flex; gap: 14px; align-items: center;")}>
        <a className="hvr-3" href={waLink} target="_blank" rel="noopener noreferrer" style={s("background: #2e5e9e; color: #ffffff; padding: 15px 28px; border-radius: 10px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 14px rgba(46,94,158,.4);")}>Chat on WhatsApp →</a>
        <a className="hvr-4" href="#services" style={s("color: #dcdee2; padding: 15px 24px; border-radius: 10px; border: 1px solid rgba(255,255,255,.2); font-weight: 600; font-size: 16px;")}>Explore services</a>
      </div>
      <div data-m-taglines="1" style={s("display: flex; gap: 28px; font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #7d838c;")}>
        <span>US UK Europe</span><span>Done for you setup</span><span>Support in plain English</span>
      </div>
    </div>
    <FlowCanvas />
  </section>

  <div data-screen-label="Tech stack" style={s("position: relative; z-index: 4; border-top: 1px solid rgba(255,255,255,.07); padding: 24px 0; overflow: hidden;")}>
    <div style={s("display: flex; width: max-content; gap: 64px; align-items: center; font-family: 'IBM Plex Mono', monospace; font-size: 13.5px; color: #8b9096; animation: marquee 32s linear infinite; padding-right: 64px;")}>
      <div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/1c17f114-1a48-4551-a251-1106e153dff4.svg" alt="n8n" style={s("width: 20px; height: 20px;")} /><span>n8n</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/1503103c-9ccd-4d45-ba6e-ec6f05329f06.svg" alt="Zapier" style={s("width: 20px; height: 20px;")} /><span>Zapier</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/39fc6751-b6b7-4724-984d-954cd09e32c4.svg" alt="Make" style={s("width: 20px; height: 20px;")} /><span>Make</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0c0f'/%3E%3Ctext x='32' y='42' text-anchor='middle' font-family='sans-serif' font-size='16' font-weight='700' fill='%237ea7d8'%3EGHL%3C/text%3E%3C/svg%3E" alt="GoHighLevel" style={s("width: 20px; height: 20px; filter: grayscale(1) brightness(1.4); border-radius: 4px;")} /><span>GoHighLevel</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/1bcef5e0-6103-40ec-8581-05269bd1d297.svg" alt="HubSpot" style={s("width: 20px; height: 20px;")} /><span>HubSpot</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/d2837e9c-f0d3-4c57-934b-cfb0c154a0ca.svg" alt="Zoho" style={s("width: 20px; height: 20px;")} /><span>Zoho</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/934f9ac2-0516-4278-b622-bfd6e8920989.svg" alt="LangChain" style={s("width: 20px; height: 20px;")} /><span>LangChain</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/bcd49eb0-93b7-4f41-a1ea-a97b008acffe.svg" alt="Claude" style={s("width: 20px; height: 20px;")} /><span>Claude</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/f55dfbb2-7e28-4c12-9d78-4136b48d599e.svg" alt="Gemini" style={s("width: 20px; height: 20px;")} /><span>Gemini</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/e02ea996-353f-4fc5-85b3-da941b57e288.svg" alt="Hugging Face" style={s("width: 20px; height: 20px;")} /><span>Hugging Face</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/50854f25-ecc7-4904-a03e-b41c72b506d5.svg" alt="WhatsApp" style={s("width: 20px; height: 20px;")} /><span>WhatsApp</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/835ca418-23e5-4525-b701-6b56bc9febb7.svg" alt="Ollama" style={s("width: 20px; height: 20px;")} /><span>Ollama</span></div>
      <div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/1c17f114-1a48-4551-a251-1106e153dff4.svg" alt="n8n" style={s("width: 20px; height: 20px;")} /><span>n8n</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/1503103c-9ccd-4d45-ba6e-ec6f05329f06.svg" alt="Zapier" style={s("width: 20px; height: 20px;")} /><span>Zapier</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/39fc6751-b6b7-4724-984d-954cd09e32c4.svg" alt="Make" style={s("width: 20px; height: 20px;")} /><span>Make</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0c0f'/%3E%3Ctext x='32' y='42' text-anchor='middle' font-family='sans-serif' font-size='16' font-weight='700' fill='%237ea7d8'%3EGHL%3C/text%3E%3C/svg%3E" alt="GoHighLevel" style={s("width: 20px; height: 20px; filter: grayscale(1) brightness(1.4); border-radius: 4px;")} /><span>GoHighLevel</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/1bcef5e0-6103-40ec-8581-05269bd1d297.svg" alt="HubSpot" style={s("width: 20px; height: 20px;")} /><span>HubSpot</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/d2837e9c-f0d3-4c57-934b-cfb0c154a0ca.svg" alt="Zoho" style={s("width: 20px; height: 20px;")} /><span>Zoho</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/934f9ac2-0516-4278-b622-bfd6e8920989.svg" alt="LangChain" style={s("width: 20px; height: 20px;")} /><span>LangChain</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/bcd49eb0-93b7-4f41-a1ea-a97b008acffe.svg" alt="Claude" style={s("width: 20px; height: 20px;")} /><span>Claude</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/f55dfbb2-7e28-4c12-9d78-4136b48d599e.svg" alt="Gemini" style={s("width: 20px; height: 20px;")} /><span>Gemini</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/e02ea996-353f-4fc5-85b3-da941b57e288.svg" alt="Hugging Face" style={s("width: 20px; height: 20px;")} /><span>Hugging Face</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/50854f25-ecc7-4904-a03e-b41c72b506d5.svg" alt="WhatsApp" style={s("width: 20px; height: 20px;")} /><span>WhatsApp</span></div><div style={s("display: flex; align-items: center; gap: 10px;")}><img src="/media/835ca418-23e5-4525-b701-6b56bc9febb7.svg" alt="Ollama" style={s("width: 20px; height: 20px;")} /><span>Ollama</span></div>
    </div>
    <div style={s("position: absolute; top: 0; left: 0; bottom: 0; width: 160px; background: linear-gradient(90deg, #08090b, transparent); pointer-events: none;")}></div>
    <div style={s("position: absolute; top: 0; right: 0; bottom: 0; width: 160px; background: linear-gradient(270deg, #08090b, transparent); pointer-events: none;")}></div>
  </div>
</div>

{/* ======== SERVICES ======== */}
<section id="services" data-screen-label="Services" style={s("max-width: 1200px; margin: 0 auto; padding: 96px 32px 40px;")}>
  <div data-m-shead="1" style={s("display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;")}>
    <div style={s("font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #2c4f7c; letter-spacing: 0.12em; text-transform: uppercase;")}>What we do</div>
    <h2 data-m-h2="1" style={s("margin: 0; font-size: 40px; letter-spacing: -0.02em; font-weight: 700;")}>What we automate</h2>
    <p style={s("margin: 0; font-size: 17px; color: #5a5f66; max-width: 60ch; line-height: 1.6;")}>Lead capture, CRM sync, AI receptionists, WhatsApp replies, n8n workflows, social posting and daily admin. Built for businesses in the US, UK and Europe.</p>
  </div>
  <div className="svc-stack">
  <figure className="svc-banner">
    <img src="/services-banner.jpg" width="1024" height="381" alt="aisolhub custom AI agents services: n8n, Vapi, Zapier, Make, GoHighLevel and Retell" decoding="async" />
  </figure>
  <div data-m-chips="1" style={s("display: none; flex-wrap: wrap; gap: 8px; margin-bottom: 28px;")}><span style={s("background: #ffffff; border: 1px solid #e9eaec; border-radius: 999px; padding: 8px 14px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #34383d;")}>24/7 call answering</span><span style={s("background: #ffffff; border: 1px solid #e9eaec; border-radius: 999px; padding: 8px 14px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #34383d;")}>Done for you setup</span><span style={s("background: #ffffff; border: 1px solid #e9eaec; border-radius: 999px; padding: 8px 14px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #34383d;")}>Support in plain English</span></div>
  <div data-m-grid="1" className="svc-grid">
    <div data-m-scard="1" className="svc-card"><div style={s("padding: 12px 12px 0;")}><div className="svc-well" aria-hidden="true"><svg className="s1-svg" viewBox="0 0 1200 650" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="s1-rg">
      <stop offset="0%" stopColor="#2e5e9e" stopOpacity=".42" />
      <stop offset="65%" stopColor="#2e5e9e" stopOpacity=".08" />
      <stop offset="100%" stopColor="#2e5e9e" stopOpacity="0" />
    </radialGradient>
    <linearGradient id="s1-sw">
      <stop offset="0%" stopColor="#7ea7d8" stopOpacity=".55" />
      <stop offset="100%" stopColor="#7ea7d8" stopOpacity="0" />
    </linearGradient>
    <linearGradient id="s1-pg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#141a22" />
      <stop offset="100%" stopColor="#10141b" />
    </linearGradient>
    
  </defs>
  <rect width="1200" height="650" rx="28" fill="#08090b" />
  <rect x="28" y="28" width="805" height="594" rx="24" fill="url(#s1-pg)" stroke="#2a313c" />
  <text x="60" y="68" fill="#f5f6f7" fontSize="22" fontWeight="700" fontFamily="ui-sans-serif, -apple-system, sans-serif">Global Lead Finder</text>
  <text x="60" y="92" fill="#9ba1a9" fontSize="12" fontFamily="ui-sans-serif, -apple-system, sans-serif">Scanning worldwide business data for your next customers</text>

  <g className="s1-grid">
    <path d="M70 180H780M70 240H780M70 300H780M70 360H780M70 420H780M70 480H780" />
    <path d="M160 150V510M250 150V510M340 150V510M430 150V510M520 150V510M610 150V510M700 150V510" />
  </g>
  <g transform="translate(80,135) scale(1.42)">
    <g className="s1-land"><path d="M250.3,219.9L245.0,202.8L244.0,186.9L243.2,178.9L239.2,165.9L227.9,160.8L215.4,160.9L207.5,149.7L207.0,139.5L213.2,126.2L219.5,115.7L233.2,112.2L241.7,115.9L252.7,121.2L265.2,121.2L272.4,114.0L266.2,113.0L262.5,114.2L261.8,110.8L259.7,108.8L259.9,106.4L256.9,107.8L259.4,110.6L257.4,111.9L252.1,105.5L245.7,99.0L246.2,103.2L250.0,107.2L247.7,111.3L247.9,109.5L241.0,102.1L232.6,103.4L224.4,112.2L218.3,111.9L217.1,101.2L223.9,92.4L230.2,88.7L234.3,84.7L239.5,83.4L240.9,80.4L246.8,82.8L255.4,76.5L257.9,75.0L264.7,71.1L254.8,68.5L255.4,62.2L251.4,71.0L250.9,74.0L246.0,79.6L241.6,72.7L235.2,70.7L240.0,64.5L242.7,59.9L246.3,56.4L249.3,53.5L250.8,51.7L253.3,50.0L254.4,49.6L257.8,49.2L256.2,48.2L260.7,48.2L265.3,49.3L270.7,51.5L278.3,58.7L271.9,61.0L275.8,61.2L281.9,58.5L285.6,56.4L291.5,54.3L297.8,54.1L302.4,53.8L311.7,52.9L311.7,50.2L318.2,44.3L318.6,56.2L321.9,53.0L324.2,53.2L319.5,48.7L322.2,46.1L323.3,45.8L324.8,45.0L325.9,44.7L331.5,49.6L329.9,45.9L331.3,41.9L333.9,42.5L344.5,37.9L354.0,36.8L358.2,32.8L361.1,35.5L368.8,36.2L369.2,39.4L369.8,42.3L376.5,43.2L384.9,42.4L389.0,47.2L396.4,47.4L401.6,47.5L403.3,42.6L405.3,44.2L408.1,44.7L411.9,45.7L417.2,48.2L433.1,51.6L440.7,50.2L459.6,57.5L461.8,62.2L457.3,61.0L453.0,60.1L449.0,62.4L449.6,67.2L436.8,70.4L432.2,71.9L432.3,73.1L430.5,73.8L431.1,77.1L428.9,81.4L424.4,86.6L421.5,82.0L429.0,70.5L427.5,68.8L415.9,72.7L402.2,76.1L401.4,82.2L405.4,81.7L408.3,90.9L407.2,94.9L403.9,87.5L393.6,102.2L388.6,110.9L384.3,111.1L379.0,109.4L375.0,109.5L378.6,117.8L379.4,122.4L377.6,128.8L367.7,135.8L363.8,137.1L362.5,143.5L361.7,153.6L357.2,152.6L353.5,149.8L353.4,156.5L352.1,159.4L350.1,148.8L345.9,144.9L342.2,136.4L336.3,137.0L325.5,155.5L320.6,148.4L318.1,141.4L314.7,136.4L311.5,132.4L297.4,128.5L288.5,123.6L291.8,130.7L294.7,132.2L298.9,130.9L302.5,135.8L300.3,139.3L284.8,149.1L276.8,135.6L272.2,126.3L269.2,125.2L274.0,135.0L276.8,142.9L281.6,149.6L291.9,150.7L286.8,163.7L277.3,180.5L278.6,190.7L272.4,201.8L268.8,208.8L253.0,221.1L250.3,219.9Z" />
    <path d="M142.1,256.4L139.4,254.2L137.6,252.3L134.5,246.0L133.6,241.0L135.4,238.3L134.3,236.5L135.1,232.1L136.5,221.8L139.4,196.0L130.1,184.7L127.2,172.7L128.1,156.2L122.8,154.7L117.5,149.1L103.0,143.5L91.4,130.1L85.3,122.2L88.9,129.4L91.6,134.3L84.8,126.5L81.1,118.7L75.5,111.6L72.5,104.5L75.1,93.8L71.8,92.8L68.3,88.0L67.2,86.5L66.7,84.2L65.0,84.1L65.5,80.5L64.5,80.2L62.9,78.0L59.7,78.0L60.1,77.3L56.1,73.4L43.7,69.8L44.6,71.9L40.0,72.4L39.0,70.3L32.3,77.9L28.1,80.8L28.0,78.5L26.6,72.6L24.2,65.3L20.9,62.0L21.1,58.9L27.3,58.4L20.6,53.9L25.7,50.9L30.3,48.4L34.2,47.7L39.0,49.0L46.6,49.8L54.8,51.6L60.4,56.1L60.6,51.8L66.0,51.9L79.6,52.0L84.7,54.1L92.4,57.9L90.9,53.1L83.4,51.5L84.8,49.1L79.1,46.7L72.9,46.5L74.3,42.4L84.0,43.2L86.9,44.4L90.9,44.5L94.9,43.7L97.2,43.8L101.3,50.8L97.4,52.1L96.9,53.6L98.0,53.1L102.5,55.0L103.7,53.1L106.7,51.0L108.4,48.5L112.3,41.4L112.0,45.1L113.3,50.6L115.9,52.6L120.3,55.8L119.9,53.6L121.3,51.6L127.1,57.0L126.7,62.9L123.3,65.4L120.5,62.1L118.3,61.0L114.7,65.3L111.3,74.0L117.1,78.5L124.6,83.3L130.3,80.8L129.9,73.2L130.6,68.1L140.1,69.1L143.9,73.9L150.1,76.6L152.0,79.6L154.6,83.0L158.4,86.0L141.1,93.5L146.7,94.0L149.0,95.9L153.0,95.8L150.1,99.0L146.2,99.1L140.3,103.4L134.8,109.2L133.2,111.9L132.3,114.9L126.6,121.6L124.7,127.2L117.3,124.8L106.8,128.5L112.2,140.5L119.7,136.1L118.2,143.1L124.6,145.5L128.1,154.0L132.9,154.2L138.8,149.8L140.0,150.4L145.1,152.1L146.6,151.1L149.0,152.1L154.5,157.3L164.4,164.8L164.8,167.1L166.4,168.3L167.1,170.2L180.0,173.5L182.3,183.2L177.2,199.2L170.3,204.0L165.5,212.3L152.6,227.1L146.3,231.3L145.9,235.7L144.7,241.2L142.4,247.1L139.8,251.4L144.6,256.0L142.1,256.4Z" />
    <path d="M170.9,71.0L170.0,69.8L163.1,62.6L162.0,61.7L162.1,59.5L163.0,57.9L161.5,57.4L163.1,54.8L161.4,50.7L162.0,47.0L159.4,46.3L157.6,42.4L154.6,38.0L149.7,38.1L141.6,37.6L139.6,36.5L144.4,34.5L137.9,33.1L143.1,30.9L147.9,27.8L144.0,27.7L148.3,24.9L150.5,24.6L157.2,21.4L161.8,21.1L164.2,19.7L171.8,19.8L169.5,18.6L170.3,16.5L174.8,16.9L181.8,16.0L186.5,17.7L190.7,17.6L197.0,18.7L202.1,19.2L186.1,24.7L196.8,22.0L202.1,22.9L203.9,21.0L204.5,22.0L213.2,22.7L208.7,25.5L203.7,26.9L205.8,28.2L203.3,30.9L203.6,32.6L203.5,33.5L204.2,35.3L202.4,36.0L201.2,37.7L204.1,38.8L203.3,41.1L202.8,42.0L200.6,42.5L198.6,43.0L200.3,44.2L200.0,45.9L200.2,49.7L197.5,47.7L196.0,49.6L199.0,52.1L191.4,53.9L185.6,55.6L180.8,59.8L175.5,65.3L174.1,70.0L170.9,71.0Z" />
    <path d="M409.0,227.4L402.4,225.3L400.4,221.4L398.9,219.9L398.4,219.4L395.6,219.6L388.4,216.7L383.1,218.5L376.4,221.1L371.4,219.0L368.2,206.7L369.9,207.0L368.4,203.5L376.2,197.9L379.7,193.3L381.5,192.9L383.8,189.8L388.3,190.7L389.6,188.7L390.3,187.0L390.1,185.2L391.0,185.8L392.1,185.2L395.3,184.8L397.5,185.4L397.2,189.6L402.3,194.8L406.3,184.7L408.6,189.5L412.6,198.4L414.5,201.1L418.6,204.8L415.1,224.4L411.4,227.2L409.0,227.4Z" />
    <path d="M144.8,68.0L139.7,66.2L137.9,64.9L130.3,62.7L135.0,60.0L137.0,56.1L135.3,54.5L131.4,52.1L118.3,50.8L121.3,43.4L125.3,42.6L127.2,45.8L130.0,46.1L135.3,46.5L139.7,47.5L139.6,49.2L145.4,54.3L149.3,56.2L152.2,58.5L150.2,59.4L146.9,60.0L145.5,61.7L146.7,67.6L144.8,68.0Z" />
    <path d="M126.5,37.3L117.0,34.8L118.3,32.9L117.1,32.0L112.1,32.2L111.3,30.2L112.2,29.4L109.1,26.6L111.2,25.3L114.9,24.8L118.7,27.0L120.2,29.6L125.2,30.1L122.9,26.2L124.0,25.6L119.2,24.8L116.1,23.3L114.6,21.4L119.1,20.7L122.4,19.6L126.2,16.7L129.6,16.3L133.4,16.2L144.1,17.7L149.4,18.3L146.1,22.3L147.4,23.5L139.0,28.3L134.8,28.4L131.9,30.0L134.5,30.4L129.9,34.0L129.3,36.8L126.5,37.3Z" /></g>
  </g>

  <circle cx="455" cy="326" r="150" fill="url(#s1-rg)" />
  <g fill="none" stroke="#2e5e9e" opacity=".28">
    <circle cx="455" cy="326" r="45" />
    <circle cx="455" cy="326" r="85" />
    <circle cx="455" cy="326" r="125" />
  </g>
  <g transform="translate(455,326)">
    <circle className="s1-rring" r="125" fill="none" stroke="#2e5e9e" strokeWidth="2" />
    <circle className="s1-rring s1-rr2" r="125" fill="none" stroke="#7ea7d8" strokeWidth="2" />
    <circle className="s1-rring s1-rr3" r="125" fill="none" stroke="#7ea7d8" strokeWidth="2" opacity=".7" />
    <g>
      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4.8s" repeatCount="indefinite" />
      <path d="M0 0 L0 -150 A150 150 0 0 1 135 -66 Z" fill="url(#s1-sw)" />
    </g>
    <circle r="6" fill="#7ea7d8" />
  </g>

  <path className="s1-route" d="M455 326 Q333.9 263.4 212.9 256.8" /><path className="s1-route" d="M455 326 Q301.6 269.9 148.2 269.9" /><path className="s1-route" d="M455 326 Q342.1 253.6 229.1 237.2" /><path className="s1-route" d="M455 326 Q444.2 252.6 433.4 235.1" /><path className="s1-route" d="M455 326 Q459.2 248.6 463.4 227.3" /><path className="s1-route" d="M455 326 Q491.1 305.4 527.3 340.9" /><path className="s1-route" d="M455 326 Q516.5 288.7 578.0 307.4" /><path className="s1-route" d="M455 326 Q533.8 330.3 612.5 390.6" /><path className="s1-route" d="M455 326 Q572.8 277.1 690.6 284.1" /><path className="s1-route" d="M455 326 Q564.5 350.2 674.1 430.4" /><path className="s1-route" d="M455 326 Q377.6 351.6 300.1 433.2" />
  <g transform="translate(212.9,256.8)"><circle className="s1-pring" r="9" fill="none" stroke="#7ea7d8" strokeWidth="2" /><circle className="s1-pcore" r="5.5" fill="#2e5e9e" /><circle r="2" fill="#f5f6f7" /></g><g transform="translate(148.2,269.9)"><circle className="s1-pring" r="9" fill="none" stroke="#7ea7d8" strokeWidth="2" /><circle className="s1-pcore" r="5.5" fill="#2e5e9e" /><circle r="2" fill="#f5f6f7" /></g><g transform="translate(229.1,237.2)"><circle className="s1-pring" r="9" fill="none" stroke="#7ea7d8" strokeWidth="2" /><circle className="s1-pcore" r="5.5" fill="#2e5e9e" /><circle r="2" fill="#f5f6f7" /></g><g transform="translate(433.4,235.1)"><circle className="s1-pring" r="9" fill="none" stroke="#7ea7d8" strokeWidth="2" /><circle className="s1-pcore" r="5.5" fill="#2e5e9e" /><circle r="2" fill="#f5f6f7" /></g><g transform="translate(463.4,227.3)"><circle className="s1-pring" r="9" fill="none" stroke="#7ea7d8" strokeWidth="2" /><circle className="s1-pcore" r="5.5" fill="#2e5e9e" /><circle r="2" fill="#f5f6f7" /></g><g transform="translate(527.3,340.9)"><circle className="s1-pring" r="9" fill="none" stroke="#7ea7d8" strokeWidth="2" /><circle className="s1-pcore" r="5.5" fill="#2e5e9e" /><circle r="2" fill="#f5f6f7" /></g><g transform="translate(578.0,307.4)"><circle className="s1-pring" r="9" fill="none" stroke="#7ea7d8" strokeWidth="2" /><circle className="s1-pcore" r="5.5" fill="#2e5e9e" /><circle r="2" fill="#f5f6f7" /></g><g transform="translate(612.5,390.6)"><circle className="s1-pring" r="9" fill="none" stroke="#7ea7d8" strokeWidth="2" /><circle className="s1-pcore" r="5.5" fill="#2e5e9e" /><circle r="2" fill="#f5f6f7" /></g><g transform="translate(690.6,284.1)"><circle className="s1-pring" r="9" fill="none" stroke="#7ea7d8" strokeWidth="2" /><circle className="s1-pcore" r="5.5" fill="#2e5e9e" /><circle r="2" fill="#f5f6f7" /></g><g transform="translate(674.1,430.4)"><circle className="s1-pring" r="9" fill="none" stroke="#7ea7d8" strokeWidth="2" /><circle className="s1-pcore" r="5.5" fill="#2e5e9e" /><circle r="2" fill="#f5f6f7" /></g><g transform="translate(300.1,433.2)"><circle className="s1-pring" r="9" fill="none" stroke="#7ea7d8" strokeWidth="2" /><circle className="s1-pcore" r="5.5" fill="#2e5e9e" /><circle r="2" fill="#f5f6f7" /></g>
  <circle r="4" fill="#7ea7d8"><animateMotion dur="2.7s" begin="0.0s" repeatCount="indefinite" path="M455 326 Q333.9 263.4 212.9 256.8" /></circle><circle r="4" fill="#2e5e9e"><animateMotion dur="3.05s" begin="0.28s" repeatCount="indefinite" path="M455 326 Q301.6 269.9 148.2 269.9" /></circle><circle r="4" fill="#7ea7d8"><animateMotion dur="3.4s" begin="0.56s" repeatCount="indefinite" path="M455 326 Q342.1 253.6 229.1 237.2" /></circle><circle r="4" fill="#2e5e9e"><animateMotion dur="3.75s" begin="0.84s" repeatCount="indefinite" path="M455 326 Q444.2 252.6 433.4 235.1" /></circle><circle r="4" fill="#7ea7d8"><animateMotion dur="2.7s" begin="1.12s" repeatCount="indefinite" path="M455 326 Q459.2 248.6 463.4 227.3" /></circle><circle r="4" fill="#2e5e9e"><animateMotion dur="3.05s" begin="1.4s" repeatCount="indefinite" path="M455 326 Q491.1 305.4 527.3 340.9" /></circle><circle r="4" fill="#7ea7d8"><animateMotion dur="3.4s" begin="1.68s" repeatCount="indefinite" path="M455 326 Q516.5 288.7 578.0 307.4" /></circle><circle r="4" fill="#2e5e9e"><animateMotion dur="3.75s" begin="1.96s" repeatCount="indefinite" path="M455 326 Q533.8 330.3 612.5 390.6" /></circle><circle r="4" fill="#7ea7d8"><animateMotion dur="2.7s" begin="2.24s" repeatCount="indefinite" path="M455 326 Q572.8 277.1 690.6 284.1" /></circle><circle r="4" fill="#2e5e9e"><animateMotion dur="3.05s" begin="2.52s" repeatCount="indefinite" path="M455 326 Q564.5 350.2 674.1 430.4" /></circle><circle r="4" fill="#7ea7d8"><animateMotion dur="3.4s" begin="2.8s" repeatCount="indefinite" path="M455 326 Q377.6 351.6 300.1 433.2" /></circle>

  <g>
    <rect x="55" y="118" width="195" height="96" rx="15" fill="#08090b" stroke="#2a313c" />
    <text x="75" y="144" fill="#9ba1a9" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">SCANNING THE WORLD</text>
    <text x="75" y="169" fill="#f5f6f7" fontSize="13" fontWeight="600" fontFamily="ui-sans-serif, -apple-system, sans-serif">Discovering prospects</text>
    <rect x="75" y="187" width="148" height="7" rx="3.5" fill="#141a22" />
    <rect x="75" y="187" height="7" rx="3.5" fill="#2e5e9e">
      <animate attributeName="width" values="20;148;20" dur="3s" repeatCount="indefinite" />
    </rect>
    <g>
      <animateTransform attributeName="transform" type="translate" values="0 0; 0 18; 0 0" dur="2.7s" repeatCount="indefinite" />
      <rect x="65" y="130" width="175" height="2" rx="1" fill="#7ea7d8" opacity=".7" />
    </g>
  </g>

  <g>
    <rect x="55" y="535" width="750" height="62" rx="16" fill="#08090b" stroke="#2a313c" />
    <g className="s1-count"><text x="90" y="560" fill="#f5f6f7" fontSize="18" fontWeight="700" fontFamily="ui-sans-serif, -apple-system, sans-serif">1248</text><text x="90" y="580" fill="#6b7380" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">Locations scanned</text></g>
    <g className="s1-count"><text x="250" y="560" fill="#f5f6f7" fontSize="18" fontWeight="700" fontFamily="ui-sans-serif, -apple-system, sans-serif">842</text><text x="250" y="580" fill="#6b7380" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">Leads found</text></g>
    <g className="s1-count"><text x="405" y="560" fill="#f5f6f7" fontSize="18" fontWeight="700" fontFamily="ui-sans-serif, -apple-system, sans-serif">312</text><text x="405" y="580" fill="#6b7380" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">Emails sent</text></g>
    <g className="s1-count"><text x="555" y="560" fill="#f5f6f7" fontSize="18" fontWeight="700" fontFamily="ui-sans-serif, -apple-system, sans-serif">98</text><text x="555" y="580" fill="#6b7380" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">Replies</text></g>
    <g className="s1-hot"><text x="690" y="560" fill="#7ea7d8" fontSize="18" fontWeight="700" fontFamily="ui-sans-serif, -apple-system, sans-serif">24</text><text x="690" y="580" fill="#6b7380" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">Interested</text></g>
  </g>

  <rect x="858" y="28" width="314" height="594" rx="24" fill="#10141b" stroke="#2a313c" />
  <text x="884" y="67" fill="#f5f6f7" fontSize="16" fontWeight="700" fontFamily="ui-sans-serif, -apple-system, sans-serif">Live Leads Found</text>
  <text x="1074" y="67" fill="#9ba1a9" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">Live</text>
  <circle className="s1-live" cx="1140" cy="63" r="5" fill="#7ea7d8" />

  <g className="s1-card">
    <rect x="880" y="94" width="270" height="84" rx="14" fill="#141a22" stroke="#2a313c" />
    <rect x="896" y="112" width="44" height="44" rx="10" fill="#2e5e9e" />
    <text x="918" y="140" textAnchor="middle" fill="#f5f6f7" fontSize="15" fontWeight="700" fontFamily="ui-sans-serif, -apple-system, sans-serif">AC</text>
    <text x="954" y="119" fill="#f5f6f7" fontSize="12" fontWeight="600" fontFamily="ui-sans-serif, -apple-system, sans-serif">Alpha Consulting</text>
    <text x="954" y="138" fill="#9ba1a9" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">New York USA</text>
    <text x="954" y="158" fill="#6b7380" fontSize="9" fontFamily="ui-sans-serif, -apple-system, sans-serif">hello@alphaconsulting.com</text>
    <rect x="1084" y="110" width="48" height="20" rx="7" fill="#162033" />
    <text x="1108" y="123" textAnchor="middle" fill="#7ea7d8" fontSize="8" fontFamily="ui-sans-serif, -apple-system, sans-serif">NEW</text>
  </g>
  <g className="s1-card s1-c2">
    <rect x="880" y="193" width="270" height="84" rx="14" fill="#141a22" stroke="#2a313c" />
    <rect x="896" y="211" width="44" height="44" rx="10" fill="#2e5e9e" />
    <text x="918" y="239" textAnchor="middle" fill="#f5f6f7" fontSize="15" fontWeight="700" fontFamily="ui-sans-serif, -apple-system, sans-serif">BD</text>
    <text x="954" y="218" fill="#f5f6f7" fontSize="12" fontWeight="600" fontFamily="ui-sans-serif, -apple-system, sans-serif">Bright Digital</text>
    <text x="954" y="237" fill="#9ba1a9" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">London UK</text>
    <text x="954" y="257" fill="#6b7380" fontSize="9" fontFamily="ui-sans-serif, -apple-system, sans-serif">hello@brightdigital.co.uk</text>
    <rect x="1065" y="209" width="67" height="20" rx="7" fill="#162033" />
    <text x="1098" y="222" textAnchor="middle" fill="#7ea7d8" fontSize="8" fontFamily="ui-sans-serif, -apple-system, sans-serif">CONTACTED</text>
  </g>
  <g className="s1-card s1-c3">
    <rect x="880" y="292" width="270" height="84" rx="14" fill="#141a22" stroke="#2a313c" />
    <rect x="896" y="310" width="44" height="44" rx="10" fill="#2e5e9e" />
    <text x="918" y="338" textAnchor="middle" fill="#f5f6f7" fontSize="15" fontWeight="700" fontFamily="ui-sans-serif, -apple-system, sans-serif">TS</text>
    <text x="954" y="317" fill="#f5f6f7" fontSize="12" fontWeight="600" fontFamily="ui-sans-serif, -apple-system, sans-serif">TechSolutions</text>
    <text x="954" y="336" fill="#9ba1a9" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">Berlin Germany</text>
    <text x="954" y="356" fill="#6b7380" fontSize="9" fontFamily="ui-sans-serif, -apple-system, sans-serif">sales@techsolutions.de</text>
    <rect x="1077" y="308" width="55" height="20" rx="7" fill="#162033" />
    <text x="1104" y="321" textAnchor="middle" fill="#7ea7d8" fontSize="8" fontFamily="ui-sans-serif, -apple-system, sans-serif">REPLIED</text>
  </g>

  <g className="s1-hot">
    <rect x="880" y="392" width="270" height="54" rx="13" fill="#141a22" stroke="#2a313c" />
    <circle className="s1-live" cx="903" cy="419" r="9" fill="#7ea7d8" />
    <text x="923" y="415" fill="#f5f6f7" fontSize="10" fontWeight="600" fontFamily="ui-sans-serif, -apple-system, sans-serif">New interested lead detected</text>
    <text x="923" y="431" fill="#7ea7d8" fontSize="9" fontFamily="ui-sans-serif, -apple-system, sans-serif">Reply classified automatically</text>
  </g>

  <g>
    <rect x="880" y="466" width="270" height="125" rx="16" fill="#08090b" stroke="#2a313c" />
    <text x="900" y="491" fill="#f5f6f7" fontSize="11" fontWeight="700" fontFamily="ui-sans-serif, -apple-system, sans-serif">Automated Outreach</text>
    <circle className="s1-node" cx="915" cy="530" r="10" fill="#2e5e9e" />
    <circle className="s1-node s1-n2" cx="980" cy="530" r="10" fill="#7ea7d8" />
    <circle className="s1-node s1-n3" cx="1045" cy="530" r="10" fill="#2e5e9e" />
    <circle className="s1-node s1-n4" cx="1110" cy="530" r="10" fill="#7ea7d8" />
    <line className="s1-pline" x1="927" y1="530" x2="968" y2="530" stroke="#3a5474" strokeWidth="2" />
    <line className="s1-pline" x1="992" y1="530" x2="1033" y2="530" stroke="#3a5474" strokeWidth="2" />
    <line className="s1-pline" x1="1057" y1="530" x2="1098" y2="530" stroke="#3a5474" strokeWidth="2" />
    <text x="895" y="561" fill="#6b7380" fontSize="8" fontFamily="ui-sans-serif, -apple-system, sans-serif">Find</text>
    <text x="959" y="561" fill="#6b7380" fontSize="8" fontFamily="ui-sans-serif, -apple-system, sans-serif">Enrich</text>
    <text x="1024" y="561" fill="#6b7380" fontSize="8" fontFamily="ui-sans-serif, -apple-system, sans-serif">Outreach</text>
    <text x="1091" y="561" fill="#6b7380" fontSize="8" fontFamily="ui-sans-serif, -apple-system, sans-serif">Reply</text>
    <circle r="5" fill="#7ea7d8">
      <animateMotion dur="3s" repeatCount="indefinite" path="M915 530 L1110 530" />
    </circle>
  </g>
  <circle r="5" fill="#7ea7d8">
    <animateMotion dur="4s" repeatCount="indefinite" path="M1100 360 C1080 410 1050 445 1010 466" />
  </circle>
</svg></div></div><div className="svc-body"><h3 style={s("margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.28; color: #101113;")}>Lead Generation &amp; Client Hunting</h3><p style={s("margin: 0; font-size: 14.5px; color: #5a5f66; line-height: 1.55;")}>We build systems that find your next customers for you. They scrape directories and maps, collect contact details, send personalised outreach emails and log every reply.</p><div className="svc-tags"><span className="svc-tag">Scraping</span><span className="svc-tag">Outreach</span><span className="svc-tag">Lead lists</span></div></div></div>
    <div data-m-scard="1" className="svc-card"><div style={s("padding: 12px 12px 0;")}><div className="svc-well" aria-hidden="true"><svg className="s2-svg" viewBox="0 0 1200 650" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  
  <rect width="1200" height="650" rx="28" fill="#08090b" />
  <path className="s2-line" d="M220 155 Q410.0 236.5 600 318" fill="none" stroke="#2e5e9e" strokeWidth="1.6" opacity=".55" /><path className="s2-line" d="M350 218 Q475.0 268.0 600 318" fill="none" stroke="#2e5e9e" strokeWidth="1.6" opacity=".55" /><path className="s2-line" d="M520 135 Q560.0 226.5 600 318" fill="none" stroke="#2e5e9e" strokeWidth="1.6" opacity=".55" /><path className="s2-line" d="M690 135 Q645.0 226.5 600 318" fill="none" stroke="#2e5e9e" strokeWidth="1.6" opacity=".55" /><path className="s2-line" d="M850 165 Q725.0 241.5 600 318" fill="none" stroke="#2e5e9e" strokeWidth="1.6" opacity=".55" /><path className="s2-line" d="M990 240 Q795.0 279.0 600 318" fill="none" stroke="#2e5e9e" strokeWidth="1.6" opacity=".55" /><path className="s2-line" d="M970 400 Q785.0 359.0 600 318" fill="none" stroke="#2e5e9e" strokeWidth="1.6" opacity=".55" /><path className="s2-line" d="M845 505 Q722.5 411.5 600 318" fill="none" stroke="#2e5e9e" strokeWidth="1.6" opacity=".55" /><path className="s2-line" d="M405 515 Q502.5 416.5 600 318" fill="none" stroke="#2e5e9e" strokeWidth="1.6" opacity=".55" />
  <g>
    <circle cx="600" cy="318" r="92" fill="#10141b" stroke="#2a313c" strokeWidth="2" />
    <circle cx="600" cy="318" r="70" fill="#141a22" stroke="#2e5e9e" strokeWidth="1.6" />
    <g transform="translate(600,318)">
      <circle className="s2-rring" r="70" fill="none" stroke="#7ea7d8" strokeWidth="2" opacity=".55" />
      <circle className="s2-rring s2-rr2" r="70" fill="none" stroke="#2e5e9e" strokeWidth="2" />
    </g>
    <circle className="s2-core" cx="600" cy="318" r="28" fill="#2e5e9e" />
    <circle cx="600" cy="318" r="10" fill="#f5f6f7" />
    <text x="600" y="372" textAnchor="middle" fill="#f5f6f7" fontSize="14" fontWeight="700" fontFamily="ui-sans-serif, -apple-system, sans-serif">AI</text>
    <text x="600" y="390" textAnchor="middle" fill="#9ba1a9" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">Auto replies</text>
  </g>
  <g className="s2-plat" style={s("animation-delay:.1s")}>
  <circle cx="220" cy="155" r="42" fill="#0e1f3d" stroke="#245dad" />
  <g transform="translate(196,131) scale(2)"><path fill="#1877F2" d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" /></g>
  <text x="220" y="210" textAnchor="middle" fill="#9ba1a9" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">Facebook</text>
</g><g className="s2-plat" style={s("animation-delay:.45s")}>
  <circle cx="350" cy="218" r="42" fill="#25121f" stroke="#713152" />
  <g transform="translate(326,194) scale(2)"><path fill="#E4405F" d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" /></g>
  <text x="350" y="273" textAnchor="middle" fill="#9ba1a9" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">Instagram</text>
</g><g className="s2-plat" style={s("animation-delay:.8s")}>
  <circle cx="520" cy="135" r="42" fill="#092540" stroke="#0A66C2" />
  <g transform="translate(496,111) scale(2)"><path fill="#0A66C2" d="M22.223 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.452C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.223 0z" /><path fill="#fff" d="M5.337 7.433a2.062 2.062 0 1 0-.001-4.124 2.062 2.062 0 0 0 0 4.124zM7.12 20.452H3.555V9.002H7.12v11.45zM20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9.002h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.284z" /></g>
  <text x="520" y="190" textAnchor="middle" fill="#9ba1a9" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">LinkedIn</text>
</g><g className="s2-plat" style={s("animation-delay:1.15s")}>
  <circle cx="690" cy="135" r="42" fill="#11151d" stroke="#384152" />
  <g transform="translate(666,111) scale(2)"><path fill="#f5f6f7" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></g>
  <text x="690" y="190" textAnchor="middle" fill="#9ba1a9" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">TikTok</text>
</g><g className="s2-plat" style={s("animation-delay:1.5s")}>
  <circle cx="850" cy="165" r="42" fill="#361119" stroke="#8f182b" />
  <g transform="translate(826,141) scale(2)"><path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></g>
  <text x="850" y="220" textAnchor="middle" fill="#9ba1a9" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">YouTube</text>
</g><g className="s2-plat" style={s("animation-delay:1.85s")}>
  <circle cx="990" cy="240" r="42" fill="#12151b" stroke="#3d4655" />
  <g transform="translate(966,216) scale(2)"><path fill="#f5f6f7" d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" /></g>
  <text x="990" y="295" textAnchor="middle" fill="#9ba1a9" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">X</text>
</g><g className="s2-plat" style={s("animation-delay:2.2s")}>
  <circle cx="970" cy="400" r="42" fill="#0e3122" stroke="#177546" />
  <g transform="translate(946,376) scale(2)"><path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></g>
  <text x="970" y="455" textAnchor="middle" fill="#9ba1a9" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">WhatsApp</text>
</g><g className="s2-plat" style={s("animation-delay:2.55s")}>
  <circle cx="845" cy="505" r="42" fill="#361016" stroke="#8a1622" />
  <g transform="translate(821,481) scale(2)"><path fill="#BD081C" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" /></g>
  <text x="845" y="560" textAnchor="middle" fill="#9ba1a9" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">Pinterest</text>
</g><g className="s2-plat" style={s("animation-delay:2.9s")}>
  <circle cx="405" cy="515" r="42" fill="#15171c" stroke="#3c4351" />
  <g transform="translate(381,491) scale(2)"><path fill="#f5f6f7" d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" /></g>
  <text x="405" y="570" textAnchor="middle" fill="#9ba1a9" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">Threads</text>
</g>
  <circle r="4" fill="#7ea7d8"><animateMotion dur="2.6s" begin="0.0s" repeatCount="indefinite" path="M220 155 Q410.0 236.5 600 318" /></circle><circle r="4" fill="#2e5e9e"><animateMotion dur="3.0s" begin="0.2s" repeatCount="indefinite" path="M350 218 Q475.0 268.0 600 318" /></circle><circle r="4" fill="#7ea7d8"><animateMotion dur="3.4s" begin="0.4s" repeatCount="indefinite" path="M520 135 Q560.0 226.5 600 318" /></circle><circle r="4" fill="#2e5e9e"><animateMotion dur="2.6s" begin="0.6s" repeatCount="indefinite" path="M690 135 Q645.0 226.5 600 318" /></circle><circle r="4" fill="#7ea7d8"><animateMotion dur="3.0s" begin="0.8s" repeatCount="indefinite" path="M850 165 Q725.0 241.5 600 318" /></circle><circle r="4" fill="#2e5e9e"><animateMotion dur="3.4s" begin="1.0s" repeatCount="indefinite" path="M990 240 Q795.0 279.0 600 318" /></circle><circle r="4" fill="#7ea7d8"><animateMotion dur="2.6s" begin="1.2s" repeatCount="indefinite" path="M970 400 Q785.0 359.0 600 318" /></circle><circle r="4" fill="#2e5e9e"><animateMotion dur="3.0s" begin="1.4s" repeatCount="indefinite" path="M845 505 Q722.5 411.5 600 318" /></circle><circle r="4" fill="#7ea7d8"><animateMotion dur="3.4s" begin="1.6s" repeatCount="indefinite" path="M405 515 Q502.5 416.5 600 318" /></circle>
</svg></div></div><div className="svc-body"><h3 style={s("margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.28; color: #101113;")}>Social Media on Autopilot</h3><p style={s("margin: 0; font-size: 14.5px; color: #5a5f66; line-height: 1.55;")}>We automate your pages so AI handles the talking. Posts go out weeks ahead, ad comments and business questions get a reply in minutes, and interested people are saved as leads in your CRM.</p><div className="svc-tags"><span className="svc-tag">Posts ahead</span><span className="svc-tag">Fast replies</span><span className="svc-tag">CRM leads</span></div></div></div>
    <div data-m-scard="1" className="svc-card"><div style={s("padding: 12px 12px 0;")}><div className="svc-well" aria-hidden="true"><svg className="s3-svg" viewBox="0 0 480 270" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  
  <rect width="480" height="270" fill="#08090b" />
  <rect x="40" y="14" width="400" height="242" rx="18" fill="#10141b" stroke="#2a313c" strokeWidth="1.3" />
  <rect x="40" y="14" width="400" height="44" rx="18" fill="#141a22" />
  <rect x="40" y="40" width="400" height="18" fill="#141a22" />
  <circle cx="68" cy="36" r="11" fill="#2e5e9e" />
  <circle className="s3-dot" cx="76" cy="46" r="3.2" fill="#7ea7d8" />
  <rect x="86" y="28" width="92" height="7" rx="3.5" fill="#f5f6f7" />
  <rect x="86" y="39" width="54" height="5" rx="2.5" fill="#7ea7d8" />
  <clipPath id="s3-clip"><rect x="40" y="58" width="400" height="198" rx="0" /></clipPath>
  <g clipPath="url(#s3-clip)">
    <g className="s3-feed">
      <g><circle cx="52" cy="24" r="7" fill="#7ea7d8" /><rect x="64" y="8" width="210" height="32" rx="14" fill="#1c222c" /><text x="78" y="29" fill="#d7dde6" fontSize="12" fontFamily="ui-sans-serif, -apple-system, Segoe UI, sans-serif">Hi, are you open Saturday?</text></g>
      <g><rect x="269" y="52" width="147" height="32" rx="14" fill="#2e5e9e" /><text x="283" y="73" fill="#f5f6f7" fontSize="12" fontFamily="ui-sans-serif, -apple-system, Segoe UI, sans-serif">Yes — 9am to 4pm.</text></g>
      <g><circle cx="52" cy="112" r="7" fill="#7ea7d8" /><rect x="64" y="96" width="140" height="32" rx="14" fill="#1c222c" /><text x="78" y="117" fill="#d7dde6" fontSize="12" fontFamily="ui-sans-serif, -apple-system, Segoe UI, sans-serif">Can I book 2:30?</text></g>
      <g><rect x="248" y="140" width="168" height="32" rx="14" fill="#2e5e9e" /><text x="262" y="161" fill="#f5f6f7" fontSize="12" fontFamily="ui-sans-serif, -apple-system, Segoe UI, sans-serif">Booked. Invite sent.</text></g>
      <g><circle cx="52" cy="200" r="7" fill="#7ea7d8" /><rect x="64" y="184" width="161" height="32" rx="14" fill="#1c222c" /><text x="78" y="205" fill="#d7dde6" fontSize="12" fontFamily="ui-sans-serif, -apple-system, Segoe UI, sans-serif">What do you charge?</text></g>
      <g><rect x="234" y="228" width="182" height="32" rx="14" fill="#2e5e9e" /><text x="248" y="249" fill="#f5f6f7" fontSize="12" fontFamily="ui-sans-serif, -apple-system, Segoe UI, sans-serif">I'll send a quote now.</text></g>
      <g><circle cx="52" cy="288" r="7" fill="#7ea7d8" /><rect x="64" y="272" width="210" height="32" rx="14" fill="#1c222c" /><text x="78" y="293" fill="#d7dde6" fontSize="12" fontFamily="ui-sans-serif, -apple-system, Segoe UI, sans-serif">Do you cover North London?</text></g>
      <g><rect x="220" y="316" width="196" height="32" rx="14" fill="#2e5e9e" /><text x="234" y="337" fill="#f5f6f7" fontSize="12" fontFamily="ui-sans-serif, -apple-system, Segoe UI, sans-serif">Yes, that's in our area.</text></g>
      <g><circle cx="52" cy="376" r="7" fill="#7ea7d8" /><rect x="64" y="360" width="182" height="32" rx="14" fill="#1c222c" /><text x="78" y="381" fill="#d7dde6" fontSize="12" fontFamily="ui-sans-serif, -apple-system, Segoe UI, sans-serif">Thanks — see you then.</text></g>
      <g><rect x="196" y="404" width="220" height="32" rx="14" fill="#2e5e9e" /><text x="210" y="425" fill="#f5f6f7" fontSize="12" fontFamily="ui-sans-serif, -apple-system, Segoe UI, sans-serif">You're set. We'll remind you.</text></g>
      <g><circle cx="52" cy="464" r="7" fill="#7ea7d8" /><rect x="64" y="448" width="210" height="32" rx="14" fill="#1c222c" /><text x="78" y="469" fill="#d7dde6" fontSize="12" fontFamily="ui-sans-serif, -apple-system, Segoe UI, sans-serif">Hi, are you open Saturday?</text></g>
      <g><rect x="269" y="492" width="147" height="32" rx="14" fill="#2e5e9e" /><text x="283" y="513" fill="#f5f6f7" fontSize="12" fontFamily="ui-sans-serif, -apple-system, Segoe UI, sans-serif">Yes — 9am to 4pm.</text></g>
      <g><circle cx="52" cy="552" r="7" fill="#7ea7d8" /><rect x="64" y="536" width="140" height="32" rx="14" fill="#1c222c" /><text x="78" y="557" fill="#d7dde6" fontSize="12" fontFamily="ui-sans-serif, -apple-system, Segoe UI, sans-serif">Can I book 2:30?</text></g>
      <g><rect x="248" y="580" width="168" height="32" rx="14" fill="#2e5e9e" /><text x="262" y="601" fill="#f5f6f7" fontSize="12" fontFamily="ui-sans-serif, -apple-system, Segoe UI, sans-serif">Booked. Invite sent.</text></g>
      <g><circle cx="52" cy="640" r="7" fill="#7ea7d8" /><rect x="64" y="624" width="161" height="32" rx="14" fill="#1c222c" /><text x="78" y="645" fill="#d7dde6" fontSize="12" fontFamily="ui-sans-serif, -apple-system, Segoe UI, sans-serif">What do you charge?</text></g>
      <g><rect x="234" y="668" width="182" height="32" rx="14" fill="#2e5e9e" /><text x="248" y="689" fill="#f5f6f7" fontSize="12" fontFamily="ui-sans-serif, -apple-system, Segoe UI, sans-serif">I'll send a quote now.</text></g>
      <g><circle cx="52" cy="728" r="7" fill="#7ea7d8" /><rect x="64" y="712" width="210" height="32" rx="14" fill="#1c222c" /><text x="78" y="733" fill="#d7dde6" fontSize="12" fontFamily="ui-sans-serif, -apple-system, Segoe UI, sans-serif">Do you cover North London?</text></g>
      <g><rect x="220" y="756" width="196" height="32" rx="14" fill="#2e5e9e" /><text x="234" y="777" fill="#f5f6f7" fontSize="12" fontFamily="ui-sans-serif, -apple-system, Segoe UI, sans-serif">Yes, that's in our area.</text></g>
      <g><circle cx="52" cy="816" r="7" fill="#7ea7d8" /><rect x="64" y="800" width="182" height="32" rx="14" fill="#1c222c" /><text x="78" y="821" fill="#d7dde6" fontSize="12" fontFamily="ui-sans-serif, -apple-system, Segoe UI, sans-serif">Thanks — see you then.</text></g>
      <g><rect x="196" y="844" width="220" height="32" rx="14" fill="#2e5e9e" /><text x="210" y="865" fill="#f5f6f7" fontSize="12" fontFamily="ui-sans-serif, -apple-system, Segoe UI, sans-serif">You're set. We'll remind you.</text></g>
    </g>
  </g>
</svg></div></div><div className="svc-body"><h3 style={s("margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.28; color: #101113;")}>AI Customer Replies</h3><p style={s("margin: 0; font-size: 14.5px; color: #5a5f66; line-height: 1.55;")}>Tired of answering the same questions all day? An AI agent replies on WhatsApp, Instagram and your website within seconds, using your real prices and policies, and passes the tricky ones to you.</p><div className="svc-tags"><span className="svc-tag">WhatsApp</span><span className="svc-tag">Instant replies</span><span className="svc-tag">24/7</span></div></div></div>
    <div data-m-scard="1" className="svc-card"><div style={s("padding: 12px 12px 0;")}><div className="svc-well" aria-hidden="true"><svg className="s4-svg" viewBox="0 0 480 270" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  
  <rect width="480" height="270" fill="#08090b" />

  {/* realistic phone body */}
  <rect x="22" y="8" width="132" height="254" rx="28" fill="#12151b" stroke="#3d4450" strokeWidth="2.4" />
  <rect x="26" y="12" width="124" height="246" rx="24" fill="#0b0c0f" />
  <rect x="68" y="18" width="40" height="8" rx="4" fill="#161a20" />
  <circle cx="114" cy="22" r="2.2" fill="#1c222c" />
  <rect x="70" y="246" width="36" height="3.5" rx="1.8" fill="#2a313c" />

  {/* INCOMING CALL */}
  <g className="s4-in">
    <circle className="s4-avatar-ring" cx="88" cy="92" r="28" fill="none" stroke="#2e5e9e" strokeWidth="1.4" />
    <circle className="s4-avatar-ring s4-r2" cx="88" cy="92" r="28" fill="none" stroke="#7ea7d8" strokeWidth="1.1" />
    <circle cx="88" cy="92" r="24" fill="#1c2430" />
    <circle cx="88" cy="86" r="9" fill="#7ea7d8" />
    <path d="M70 112 C72 100 104 100 106 112" fill="#2e5e9e" />
    <text x="88" y="136" textAnchor="middle" fill="#f5f6f7" fontSize="11" fontFamily="ui-sans-serif, -apple-system, sans-serif" fontWeight="600">New customer</text>
    <text x="88" y="150" textAnchor="middle" fill="#9ba1a9" fontSize="8.5" fontFamily="ui-sans-serif, -apple-system, sans-serif">Incoming call</text>
    <g className="s4-ans">
      <circle cx="88" cy="198" r="16" fill="#2e5e9e" />
      <path d="M81 198 C81 198 83 192 88 192 C93 192 95 198 95 198" fill="none" stroke="#f5f6f7" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="85" y="198" width="6" height="10" rx="2.2" fill="#f5f6f7" />
    </g>
    <circle cx="54" cy="198" r="11" fill="#242a33" />
    <circle cx="122" cy="198" r="11" fill="#242a33" />
  </g>

  {/* IN CALL */}
  <g className="s4-on">
    <circle cx="88" cy="78" r="18" fill="#1c2430" />
    <circle cx="88" cy="74" r="7" fill="#7ea7d8" />
    <path d="M76 92 C77 84 99 84 100 92" fill="#2e5e9e" />
    <text x="88" y="112" textAnchor="middle" fill="#f5f6f7" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif" fontWeight="600">New customer</text>
    <g>
      <circle className="s4-live" cx="70" cy="124" r="2.4" fill="#7ea7d8" />
      <text x="88" y="127" textAnchor="middle" fill="#9ba1a9" fontSize="8" fontFamily="IBM Plex Mono, ui-monospace, monospace">00:18</text>
    </g>
    <rect className="s4-bar" style={s("animation-delay:0.0s")} x="48.0" y="138" width="2.8" height="10" rx="1.4" fill="#7ea7d8" /><rect className="s4-bar" style={s("animation-delay:0.08s")} x="52.2" y="132" width="2.8" height="16" rx="1.4" fill="#7ea7d8" /><rect className="s4-bar" style={s("animation-delay:0.16s")} x="56.4" y="120" width="2.8" height="28" rx="1.4" fill="#7ea7d8" /><rect className="s4-bar" style={s("animation-delay:0.24s")} x="60.6" y="126" width="2.8" height="22" rx="1.4" fill="#7ea7d8" /><rect className="s4-bar" style={s("animation-delay:0.32s")} x="64.8" y="112" width="2.8" height="36" rx="1.4" fill="#7ea7d8" /><rect className="s4-bar" style={s("animation-delay:0.4s")} x="69.0" y="130" width="2.8" height="18" rx="1.4" fill="#7ea7d8" /><rect className="s4-bar" style={s("animation-delay:0.48s")} x="73.2" y="108" width="2.8" height="40" rx="1.4" fill="#7ea7d8" /><rect className="s4-bar" style={s("animation-delay:0.56s")} x="77.4" y="124" width="2.8" height="24" rx="1.4" fill="#7ea7d8" /><rect className="s4-bar" style={s("animation-delay:0.0s")} x="81.6" y="134" width="2.8" height="14" rx="1.4" fill="#7ea7d8" /><rect className="s4-bar" style={s("animation-delay:0.08s")} x="85.8" y="116" width="2.8" height="32" rx="1.4" fill="#7ea7d8" /><rect className="s4-bar" style={s("animation-delay:0.16s")} x="90.0" y="128" width="2.8" height="20" rx="1.4" fill="#7ea7d8" /><rect className="s4-bar" style={s("animation-delay:0.24s")} x="94.2" y="110" width="2.8" height="38" rx="1.4" fill="#7ea7d8" /><rect className="s4-bar" style={s("animation-delay:0.32s")} x="98.4" y="132" width="2.8" height="16" rx="1.4" fill="#7ea7d8" /><rect className="s4-bar" style={s("animation-delay:0.4s")} x="102.6" y="122" width="2.8" height="26" rx="1.4" fill="#7ea7d8" /><rect className="s4-bar" style={s("animation-delay:0.48s")} x="106.8" y="136" width="2.8" height="12" rx="1.4" fill="#7ea7d8" /><rect className="s4-bar" style={s("animation-delay:0.56s")} x="111.0" y="118" width="2.8" height="30" rx="1.4" fill="#7ea7d8" /><rect className="s4-bar" style={s("animation-delay:0.0s")} x="115.2" y="126" width="2.8" height="22" rx="1.4" fill="#7ea7d8" /><rect className="s4-bar" style={s("animation-delay:0.08s")} x="119.4" y="114" width="2.8" height="34" rx="1.4" fill="#7ea7d8" /><rect className="s4-bar" style={s("animation-delay:0.16s")} x="123.6" y="130" width="2.8" height="18" rx="1.4" fill="#7ea7d8" /><rect className="s4-bar" style={s("animation-delay:0.24s")} x="127.8" y="136" width="2.8" height="12" rx="1.4" fill="#7ea7d8" />
    <circle cx="58" cy="210" r="11" fill="#1c222c" />
    <circle cx="88" cy="210" r="12" fill="#2e5e9e" />
    <circle cx="118" cy="210" r="11" fill="#1c222c" />
    <rect x="83" y="205" width="10" height="10" rx="2" fill="#f5f6f7" />
  </g>

  {/* calendar app */}
  <g>
    <rect x="176" y="22" width="282" height="226" rx="16" fill="#10141b" stroke="#2a313c" strokeWidth="1.3" />
    <rect x="176" y="22" width="282" height="28" rx="16" fill="#141a22" />
    <rect x="176" y="38" width="282" height="12" fill="#141a22" />
    <circle cx="192" cy="36" r="4" fill="#3d4450" />
    <circle cx="204" cy="36" r="4" fill="#3d4450" />
    <circle cx="216" cy="36" r="4" fill="#3d4450" />
    <text x="317" y="40" textAnchor="middle" fill="#f5f6f7" fontSize="11" fontFamily="ui-sans-serif, -apple-system, sans-serif" fontWeight="600">March</text>
    <text x="212" y="74" textAnchor="middle" fill="#6b7380" fontSize="8" fontFamily="ui-sans-serif, -apple-system, sans-serif" letterSpacing="0.06em">S</text><text x="246" y="74" textAnchor="middle" fill="#9ba1a9" fontSize="8" fontFamily="ui-sans-serif, -apple-system, sans-serif" letterSpacing="0.06em">M</text><text x="280" y="74" textAnchor="middle" fill="#9ba1a9" fontSize="8" fontFamily="ui-sans-serif, -apple-system, sans-serif" letterSpacing="0.06em">T</text><text x="314" y="74" textAnchor="middle" fill="#9ba1a9" fontSize="8" fontFamily="ui-sans-serif, -apple-system, sans-serif" letterSpacing="0.06em">W</text><text x="348" y="74" textAnchor="middle" fill="#9ba1a9" fontSize="8" fontFamily="ui-sans-serif, -apple-system, sans-serif" letterSpacing="0.06em">T</text><text x="382" y="74" textAnchor="middle" fill="#9ba1a9" fontSize="8" fontFamily="ui-sans-serif, -apple-system, sans-serif" letterSpacing="0.06em">F</text><text x="416" y="74" textAnchor="middle" fill="#6b7380" fontSize="8" fontFamily="ui-sans-serif, -apple-system, sans-serif" letterSpacing="0.06em">S</text>
    <line x1="190" y1="80" x2="440" y2="80" stroke="#1c222c" strokeWidth="1" />
    <text x="212" y="95" textAnchor="middle" fill="#8b929c" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">1</text><text x="246" y="95" textAnchor="middle" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">2</text><text x="280" y="95" textAnchor="middle" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">3</text><text x="314" y="95" textAnchor="middle" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">4</text><text x="348" y="95" textAnchor="middle" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">5</text><text x="382" y="95" textAnchor="middle" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">6</text><text x="416" y="95" textAnchor="middle" fill="#8b929c" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">7</text><text x="212" y="121" textAnchor="middle" fill="#8b929c" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">8</text><text x="246" y="121" textAnchor="middle" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">9</text><text x="280" y="121" textAnchor="middle" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">10</text><text x="314" y="121" textAnchor="middle" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">11</text><text x="348" y="121" textAnchor="middle" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">12</text><text x="382" y="121" textAnchor="middle" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">13</text><text x="416" y="121" textAnchor="middle" fill="#8b929c" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">14</text><text x="212" y="147" textAnchor="middle" fill="#8b929c" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">15</text><text x="246" y="147" textAnchor="middle" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">16</text><text x="280" y="147" textAnchor="middle" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">17</text><rect className="s4-booked" x="300" y="132" width="28" height="22" rx="6" fill="#2e5e9e" /><text x="314" y="147" textAnchor="middle" fill="#f5f6f7" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif" fontWeight="600">18</text><text x="348" y="147" textAnchor="middle" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">19</text><text x="382" y="147" textAnchor="middle" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">20</text><text x="416" y="147" textAnchor="middle" fill="#8b929c" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">21</text><text x="212" y="173" textAnchor="middle" fill="#8b929c" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">22</text><text x="246" y="173" textAnchor="middle" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">23</text><text x="280" y="173" textAnchor="middle" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">24</text><text x="314" y="173" textAnchor="middle" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">25</text><text x="348" y="173" textAnchor="middle" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">26</text><text x="382" y="173" textAnchor="middle" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">27</text><text x="416" y="173" textAnchor="middle" fill="#8b929c" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">28</text><text x="212" y="199" textAnchor="middle" fill="#8b929c" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">29</text><text x="246" y="199" textAnchor="middle" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">30</text><text x="280" y="199" textAnchor="middle" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">31</text>
  </g>

  <g className="s4-event">
    <rect x="190" y="214" width="254" height="24" rx="8" fill="#2e5e9e" />
    <text x="204" y="230" fill="#f5f6f7" fontSize="10.5" fontFamily="ui-sans-serif, -apple-system, sans-serif" fontWeight="600">2:30 PM  ·  Appointment booked</text>
  </g>
</svg></div></div><div className="svc-body"><h3 style={s("margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.28; color: #101113;")}>AI Phone Receptionist</h3><p style={s("margin: 0; font-size: 14.5px; color: #5a5f66; line-height: 1.55;")}>Never miss another call. The receptionist picks up around the clock, books appointments straight into your calendar and puts urgent callers through to your phone.</p><div className="svc-tags"><span className="svc-tag">Call answering</span><span className="svc-tag">Booking</span><span className="svc-tag">Routing</span></div></div></div>
    <div data-m-scard="1" className="svc-card"><div style={s("padding: 12px 12px 0;")}><div className="svc-well" aria-hidden="true"><svg className="s5-svg" viewBox="0 0 480 270" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  
  <rect width="480" height="270" fill="#08090b" />
  <rect x="16" y="14" width="448" height="242" rx="16" fill="#10141b" stroke="#2a313c" strokeWidth="1.3" />
  <rect x="16" y="14" width="448" height="30" rx="16" fill="#141a22" />
  <rect x="16" y="32" width="448" height="12" fill="#141a22" />
  <circle cx="32" cy="29" r="4" fill="#3d4450" /><circle cx="44" cy="29" r="4" fill="#3d4450" /><circle cx="56" cy="29" r="4" fill="#3d4450" />
  <text x="240" y="34" textAnchor="middle" fill="#f5f6f7" fontSize="11" fontFamily="ui-sans-serif, -apple-system, sans-serif" fontWeight="600">Pipeline  ·  HubSpot</text>
  <circle className="s5-dot" cx="430" cy="29" r="3.5" fill="#7ea7d8" />

  <g>
    <rect x="28" y="52" width="132" height="148" rx="10" fill="#0b0c0f" stroke="#1c222c" />
    <text x="40" y="70" fill="#9ba1a9" fontSize="9" fontFamily="ui-sans-serif, -apple-system, sans-serif" letterSpacing=".08em">NEW</text>
    <g>
      <rect x="34" y="78" width="120" height="42" rx="8" fill="#141a22" stroke="#2a313c" />
      <circle cx="50" cy="99" r="7" fill="#2e5e9e" />
      <text x="62" y="96" fill="#f5f6f7" fontSize="9.5" fontFamily="ui-sans-serif, -apple-system, sans-serif" fontWeight="600">James Cole</text>
      <text x="62" y="109" fill="#9ba1a9" fontSize="8" fontFamily="ui-sans-serif, -apple-system, sans-serif">HVAC · £420</text>
    </g>
<g>
      <rect x="34" y="126" width="120" height="42" rx="8" fill="#141a22" stroke="#2a313c" />
      <circle cx="50" cy="147" r="7" fill="#2e5e9e" />
      <text x="62" y="144" fill="#f5f6f7" fontSize="9.5" fontFamily="ui-sans-serif, -apple-system, sans-serif" fontWeight="600">Amina Khan</text>
      <text x="62" y="157" fill="#9ba1a9" fontSize="8" fontFamily="ui-sans-serif, -apple-system, sans-serif">Clinic · £190</text>
    </g>
  </g>
  <g>
    <rect x="176" y="52" width="132" height="148" rx="10" fill="#0b0c0f" stroke="#2e5e9e" />
    <text x="188" y="70" fill="#7ea7d8" fontSize="9" fontFamily="ui-sans-serif, -apple-system, sans-serif" letterSpacing=".08em">FOLLOW UP</text>
    <g>
      <rect x="182" y="78" width="120" height="42" rx="8" fill="#141a22" stroke="#2a313c" />
      <circle cx="198" cy="99" r="7" fill="#2e5e9e" />
      <text x="210" y="96" fill="#f5f6f7" fontSize="9.5" fontFamily="ui-sans-serif, -apple-system, sans-serif" fontWeight="600">Priya Nair</text>
      <text x="210" y="109" fill="#9ba1a9" fontSize="8" fontFamily="ui-sans-serif, -apple-system, sans-serif">Salon · £85</text>
    </g>
    <g className="s5-ghost">
    <g>
      <rect x="182" y="126" width="120" height="42" rx="8" fill="#141a22" stroke="#2a313c" />
      <circle cx="198" cy="147" r="7" fill="#2e5e9e" />
      <text x="210" y="144" fill="#f5f6f7" fontSize="9.5" fontFamily="ui-sans-serif, -apple-system, sans-serif" fontWeight="600">Sarah Chen</text>
      <text x="210" y="157" fill="#9ba1a9" fontSize="8" fontFamily="ui-sans-serif, -apple-system, sans-serif">Dental · £240</text>
    </g>
  </g>
  </g>
  <g>
    <rect x="324" y="52" width="124" height="148" rx="10" fill="#0b0c0f" stroke="#1c222c" />
    <text x="336" y="70" fill="#9ba1a9" fontSize="9" fontFamily="ui-sans-serif, -apple-system, sans-serif" letterSpacing=".08em">BOOKED</text>
    <g>
      <rect x="330" y="78" width="120" height="42" rx="8" fill="#141a22" stroke="#2a313c" />
      <circle cx="346" cy="99" r="7" fill="#2e5e9e" />
      <text x="358" y="96" fill="#f5f6f7" fontSize="9.5" fontFamily="ui-sans-serif, -apple-system, sans-serif" fontWeight="600">Tom Reid</text>
      <text x="358" y="109" fill="#9ba1a9" fontSize="8" fontFamily="ui-sans-serif, -apple-system, sans-serif">Repair · £160</text>
    </g>
  </g>

  <g className="s5-move">
    <g transform="translate(34,174)">
      <rect width="120" height="42" rx="8" fill="#141a22" stroke="#2e5e9e" />
      <circle cx="16" cy="21" r="7" fill="#2e5e9e" />
      <text x="28" y="18" fill="#f5f6f7" fontSize="9.5" fontFamily="ui-sans-serif, -apple-system, sans-serif" fontWeight="600">Sarah Chen</text>
      <text x="28" y="31" fill="#9ba1a9" fontSize="8" fontFamily="ui-sans-serif, -apple-system, sans-serif">Dental · £240</text>
    </g>
  </g>

  <g className="s5-mail">
    <rect x="28" y="210" width="420" height="36" rx="10" fill="#141a22" stroke="#2e5e9e" />
    <text x="44" y="232" fill="#f5f6f7" fontSize="11" fontFamily="ui-sans-serif, -apple-system, sans-serif">Follow-up sent  ·  “Hi Sarah, still happy to book Thursday 2:30?”</text>
  </g>
</svg></div></div><div className="svc-body"><h3 style={s("margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.28; color: #101113;")}>CRM Data Sync &amp; Follow Ups</h3><p style={s("margin: 0; font-size: 14.5px; color: #5a5f66; line-height: 1.55;")}>Leads go cold because nobody has time to chase them. Your CRM follows up automatically in GoHighLevel, HubSpot or Zoho, so no enquiry is ever forgotten.</p><div className="svc-tags"><span className="svc-tag">GoHighLevel</span><span className="svc-tag">HubSpot</span><span className="svc-tag">Zoho</span></div></div></div>
    <div data-m-scard="1" className="svc-card"><div style={s("padding: 12px 12px 0;")}><div className="svc-well" aria-hidden="true"><svg className="s6-svg" viewBox="0 0 480 270" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  
  <rect width="480" height="270" fill="#08090b" />
  <rect x="16" y="16" width="248" height="238" rx="14" fill="#10141b" stroke="#2a313c" />
  <rect x="16" y="16" width="248" height="28" rx="14" fill="#141a22" />
  <rect x="16" y="32" width="248" height="12" fill="#141a22" />
  <text x="140" y="34" textAnchor="middle" fill="#f5f6f7" fontSize="11" fontFamily="ui-sans-serif, -apple-system, sans-serif" fontWeight="600">Invoices  ·  Sheets</text>
  <rect x="36" y="78" width="50" height="22" fill="#1c2430" /><text x="61" y="93" textAnchor="middle" fill="#9ba1a9" fontSize="8" fontFamily="IBM Plex Mono, ui-monospace, monospace">A</text><rect x="88" y="78" width="50" height="22" fill="#1c2430" /><text x="113" y="93" textAnchor="middle" fill="#9ba1a9" fontSize="8" fontFamily="IBM Plex Mono, ui-monospace, monospace">B</text><rect x="140" y="78" width="50" height="22" fill="#1c2430" /><text x="165" y="93" textAnchor="middle" fill="#9ba1a9" fontSize="8" fontFamily="IBM Plex Mono, ui-monospace, monospace">C</text><rect x="192" y="78" width="50" height="22" fill="#1c2430" /><text x="217" y="93" textAnchor="middle" fill="#9ba1a9" fontSize="8" fontFamily="IBM Plex Mono, ui-monospace, monospace">D</text><rect className="" x="36" y="102" width="50" height="22" fill="#12161d" stroke="#1c222c" /><rect className="" x="88" y="102" width="50" height="22" fill="#12161d" stroke="#1c222c" /><text x="113" y="117" textAnchor="middle" fill="#c5ccd6" fontSize="8" fontFamily="IBM Plex Mono, ui-monospace, monospace">INV-104</text><rect className="" x="140" y="102" width="50" height="22" fill="#12161d" stroke="#1c222c" /><text x="165" y="117" textAnchor="middle" fill="#c5ccd6" fontSize="8" fontFamily="IBM Plex Mono, ui-monospace, monospace">£240</text><rect className="" x="192" y="102" width="50" height="22" fill="#12161d" stroke="#1c222c" /><text x="217" y="117" textAnchor="middle" fill="#c5ccd6" fontSize="8" fontFamily="IBM Plex Mono, ui-monospace, monospace">Paid</text><rect className="" x="36" y="126" width="50" height="22" fill="#12161d" stroke="#1c222c" /><rect className="" x="88" y="126" width="50" height="22" fill="#12161d" stroke="#1c222c" /><text x="113" y="141" textAnchor="middle" fill="#c5ccd6" fontSize="8" fontFamily="IBM Plex Mono, ui-monospace, monospace">INV-105</text><rect className="" x="140" y="126" width="50" height="22" fill="#12161d" stroke="#1c222c" /><text x="165" y="141" textAnchor="middle" fill="#c5ccd6" fontSize="8" fontFamily="IBM Plex Mono, ui-monospace, monospace">£85</text><rect className="" x="192" y="126" width="50" height="22" fill="#12161d" stroke="#1c222c" /><text x="217" y="141" textAnchor="middle" fill="#c5ccd6" fontSize="8" fontFamily="IBM Plex Mono, ui-monospace, monospace">Sent</text><rect className="" x="36" y="150" width="50" height="22" fill="#12161d" stroke="#1c222c" /><rect className="s6-cell" x="88" y="150" width="50" height="22" fill="#2e5e9e" stroke="#1c222c" /><text x="113" y="165" textAnchor="middle" fill="#f5f6f7" fontSize="8" fontFamily="IBM Plex Mono, ui-monospace, monospace">INV-106</text><rect className="s6-cell" x="140" y="150" width="50" height="22" fill="#2e5e9e" stroke="#1c222c" /><text x="165" y="165" textAnchor="middle" fill="#f5f6f7" fontSize="8" fontFamily="IBM Plex Mono, ui-monospace, monospace">£160</text><rect className="s6-cell" x="192" y="150" width="50" height="22" fill="#2e5e9e" stroke="#1c222c" /><text x="217" y="165" textAnchor="middle" fill="#f5f6f7" fontSize="8" fontFamily="IBM Plex Mono, ui-monospace, monospace">Auto</text><rect className="" x="36" y="174" width="50" height="22" fill="#12161d" stroke="#1c222c" /><rect className="" x="88" y="174" width="50" height="22" fill="#12161d" stroke="#1c222c" /><rect className="" x="140" y="174" width="50" height="22" fill="#12161d" stroke="#1c222c" /><rect className="" x="192" y="174" width="50" height="22" fill="#12161d" stroke="#1c222c" />

  <path className="s6-line" d="M266 150 C 286 150, 286 70, 306 70" fill="none" stroke="#7ea7d8" strokeWidth="1.3" />
  <path className="s6-line" d="M266 170 C 286 170, 286 200, 306 200" fill="none" stroke="#7ea7d8" strokeWidth="1.3" />

  <g className="s6-inv">
    <rect x="306" y="24" width="158" height="118" rx="10" fill="#f5f6f7" />
    <rect x="306" y="24" width="158" height="22" rx="10" fill="#2e5e9e" />
    <rect x="306" y="36" width="158" height="10" fill="#2e5e9e" />
    <text x="385" y="40" textAnchor="middle" fill="#f5f6f7" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif" fontWeight="600">INVOICE</text>
    <text x="320" y="64" fill="#5a5f66" fontSize="9" fontFamily="IBM Plex Mono, ui-monospace, monospace">INV-106</text>
    <text x="320" y="82" fill="#101113" fontSize="12" fontFamily="ui-sans-serif, -apple-system, sans-serif" fontWeight="600">Tom Reid</text>
    <text x="320" y="100" fill="#5a5f66" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">Repair callout</text>
    <text x="320" y="124" fill="#2e5e9e" fontSize="16" fontFamily="ui-sans-serif, -apple-system, sans-serif" fontWeight="700">£160.00</text>
  </g>
  <g className="s6-mail">
    <rect x="306" y="156" width="158" height="98" rx="12" fill="#10141b" stroke="#2e5e9e" />
    <rect x="322" y="172" width="18" height="14" rx="3" fill="none" stroke="#7ea7d8" strokeWidth="1.4" />
    <path d="M322 172 L331 180 L340 172" fill="none" stroke="#7ea7d8" strokeWidth="1.4" />
    <text x="346" y="184" fill="#f5f6f7" fontSize="11" fontFamily="ui-sans-serif, -apple-system, sans-serif" fontWeight="600">Invoice emailed</text>
    <text x="322" y="206" fill="#9ba1a9" fontSize="9" fontFamily="ui-sans-serif, -apple-system, sans-serif">to tom@reidrepair.co</text>
    <text x="322" y="230" fill="#7ea7d8" fontSize="9" fontFamily="IBM Plex Mono, ui-monospace, monospace">auto · just now</text>
  </g>
</svg></div></div><div className="svc-body"><h3 style={s("margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.28; color: #101113;")}>Daily Admin Automation</h3><p style={s("margin: 0; font-size: 14.5px; color: #5a5f66; line-height: 1.55;")}>The invoices, the follow up emails, the copy pasting between apps and Google Sheets. We connect your tools so the admin does itself and your data is always up to date.</p><div className="svc-tags"><span className="svc-tag">Auto emails</span><span className="svc-tag">Sheets sync</span><span className="svc-tag">Invoicing</span></div></div></div>
    <div data-m-scard="1" className="svc-card"><div style={s("padding: 12px 12px 0;")}><div className="svc-well" aria-hidden="true"><svg className="s7-svg" viewBox="0 0 480 270" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  
  <rect width="480" height="270" fill="#08090b" />
  <g className="s7-doc1">
    <rect className="s7-use" x="22" y="28" width="132" height="76" rx="8" fill="#141a22" stroke="#2a313c" strokeWidth="1.6" />
    <rect x="34" y="42" width="70" height="6" rx="3" fill="#7ea7d8" />
    <rect x="34" y="56" width="96" height="4" rx="2" fill="#5a616c" />
    <rect x="34" y="66" width="84" height="4" rx="2" fill="#5a616c" />
    <rect x="34" y="76" width="60" height="4" rx="2" fill="#5a616c" />
    <text x="34" y="94" fill="#9ba1a9" fontSize="8" fontFamily="IBM Plex Mono, ui-monospace, monospace">price-list.pdf</text>
  </g>
  <g className="s7-doc2">
    <rect className="s7-use" x="22" y="114" width="132" height="70" rx="8" fill="#141a22" stroke="#2a313c" strokeWidth="1.6" />
    <rect x="34" y="128" width="58" height="6" rx="3" fill="#b6bac1" />
    <rect x="34" y="142" width="90" height="4" rx="2" fill="#5a616c" />
    <rect x="34" y="152" width="76" height="4" rx="2" fill="#5a616c" />
    <text x="34" y="174" fill="#9ba1a9" fontSize="8" fontFamily="IBM Plex Mono, ui-monospace, monospace">policies.docx</text>
  </g>
  <g className="s7-doc3">
    <rect x="22" y="196" width="132" height="52" rx="8" fill="#141a22" stroke="#2a313c" />
    <rect x="34" y="210" width="80" height="4" rx="2" fill="#5a616c" />
    <rect x="34" y="220" width="54" height="4" rx="2" fill="#5a616c" />
    <text x="34" y="238" fill="#9ba1a9" fontSize="8" fontFamily="IBM Plex Mono, ui-monospace, monospace">faqs.csv</text>
  </g>
  <path className="s7-line" d="M154 66 L 198 128" fill="none" stroke="#7ea7d8" strokeWidth="1.4" />
  <path className="s7-line" d="M154 150 L 198 138" fill="none" stroke="#7ea7d8" strokeWidth="1.4" />
  <g className="s7-node">
    <circle cx="214" cy="136" r="22" fill="#2e5e9e" />
    <circle cx="214" cy="136" r="7" fill="#f5f6f7" />
  </g>
  <path className="s7-line" d="M236 136 L 270 136" fill="none" stroke="#7ea7d8" strokeWidth="1.4" />
  <rect x="270" y="24" width="190" height="222" rx="16" fill="#10141b" stroke="#2a313c" />
  <rect x="270" y="24" width="190" height="38" rx="16" fill="#141a22" />
  <rect x="270" y="46" width="190" height="16" fill="#141a22" />
  <circle cx="290" cy="44" r="8" fill="#2e5e9e" />
  <text x="304" y="48" fill="#f5f6f7" fontSize="11" fontFamily="ui-sans-serif, -apple-system, sans-serif" fontWeight="600">Your AI</text>
  <g className="s7-q">
    <rect x="284" y="76" width="160" height="42" rx="10" fill="#1c222c" />
    <text x="294" y="94" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">What is the cancel policy</text>
    <text x="294" y="108" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">if I book today?</text>
  </g>
  <g className="s7-a">
    <rect x="284" y="130" width="160" height="96" rx="10" fill="#2e5e9e" />
    <text x="294" y="152" fill="#f5f6f7" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">Free cancel up to 24h</text>
    <text x="294" y="168" fill="#f5f6f7" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">before. After that it is</text>
    <text x="294" y="184" fill="#f5f6f7" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">50 percent of the fee.</text>
    <text x="294" y="208" fill="#d4e2f4" fontSize="8" fontFamily="IBM Plex Mono, ui-monospace, monospace">source: policies.docx</text>
  </g>
</svg></div></div><div className="svc-body"><h3 style={s("margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.28; color: #101113;")}>AI Trained on Your Business</h3><p style={s("margin: 0; font-size: 14.5px; color: #5a5f66; line-height: 1.55;")}>An assistant that actually knows your business. We train it on your documents, prices and policies so it answers like your best employee, built with LangChain and LangGraph.</p><div className="svc-tags"><span className="svc-tag">LangChain</span><span className="svc-tag">LangGraph</span><span className="svc-tag">Custom RAG</span></div></div></div>
    <div data-m-scard="1" className="svc-card"><div style={s("padding: 12px 12px 0;")}><div className="svc-well" aria-hidden="true"><svg className="s8-svg" viewBox="0 0 900 520" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="s8-panel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#141a22" />
      <stop offset="100%" stopColor="#10141b" />
    </linearGradient>
    <linearGradient id="s8-brand" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#7ea7d8" />
      <stop offset="100%" stopColor="#2e5e9e" />
    </linearGradient>
    
  </defs>
  <rect width="900" height="520" rx="28" fill="#08090b" />
  <g opacity=".12" stroke="#6b7380" strokeWidth=".5">
    <path d="M40 70H860" /><path d="M40 130H860" /><path d="M40 190H860" /><path d="M40 250H860" />
    <path d="M40 310H860" /><path d="M40 370H860" /><path d="M40 430H860" />
  </g>
  <path d="M245 205 C330 205 335 260 400 260" className="s8-flow" />
  <path d="M245 205 C330 205 335 260 400 260" className="s8-run" />
  <path d="M500 250 C575 245 585 175 655 175" className="s8-flow" />
  <path d="M500 250 C575 245 585 175 655 175" className="s8-run2" />
  <path d="M500 280 C570 290 590 360 655 360" className="s8-flow" />
  <path d="M500 280 C570 290 590 360 655 360" className="s8-run" />
  <path d="M750 235 C750 300 720 405 590 435" className="s8-flow" />
  <path d="M750 235 C750 300 720 405 590 435" className="s8-run2" />

  <g className="s8-float">
    <rect x="65" y="135" width="180" height="140" rx="22" className="s8-card" />
    <rect x="88" y="159" width="48" height="48" rx="14" fill="#162033" />
    <path d="M100 177h24l3 20h-30z" fill="none" stroke="#7ea7d8" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M105 178c0-8 14-8 14 0" fill="none" stroke="#7ea7d8" strokeWidth="2.5" strokeLinecap="round" />
    <text x="150" y="178" fontSize="18" className="s8-ttl">Online Store</text>
    <text x="150" y="199" fontSize="12" className="s8-lbl">New customer order</text>
    <rect x="88" y="224" width="134" height="29" rx="10" fill="#141a22" stroke="#2a313c" />
    <circle cx="103" cy="238.5" r="4" fill="#7ea7d8" className="s8-blink" />
    <text x="114" y="243" fontSize="11" className="s8-lbl">Order 4831 received</text>
  </g>

  <g>
    <circle cx="450" cy="265" r="66" fill="#10141b" stroke="#2a313c" strokeWidth="2" />
    <circle cx="450" cy="265" r="52" fill="#141a22" stroke="#2a313c" />
    <g className="s8-spin">
      <path d="M450 230 A35 35 0 0 1 480 247" fill="none" stroke="#2e5e9e" strokeWidth="4" strokeLinecap="round" />
      <path d="M479 238l3 12-12-2" fill="none" stroke="#2e5e9e" strokeWidth="3" strokeLinejoin="round" />
      <path d="M450 300 A35 35 0 0 1 420 283" fill="none" stroke="#7ea7d8" strokeWidth="4" strokeLinecap="round" />
      <path d="M421 292l-3-12 12 2" fill="none" stroke="#7ea7d8" strokeWidth="3" strokeLinejoin="round" />
    </g>
    <circle cx="450" cy="265" r="16" fill="#f5f6f7" />
    <circle cx="450" cy="265" r="7" fill="#08090b" />
    <text x="450" y="348" textAnchor="middle" fontSize="14" className="s8-ttl">Auto Sync</text>
    <text x="450" y="366" textAnchor="middle" fontSize="11" className="s8-dim">orders · stock · pricing</text>
  </g>

  <g className="s8-float2">
    <rect x="655" y="105" width="180" height="145" rx="22" className="s8-card" />
    <rect x="679" y="130" width="48" height="48" rx="14" fill="#162033" />
    <text x="703" y="161" textAnchor="middle" fontSize="25" fontWeight="700" fontFamily="Arial, sans-serif" fill="#7ea7d8">a</text>
    <text x="741" y="149" fontSize="18" className="s8-ttl">Amazon</text>
    <text x="741" y="170" fontSize="12" className="s8-lbl">Marketplace sync</text>
    <rect x="679" y="196" width="132" height="29" rx="10" fill="#141a22" stroke="#2a313c" />
    <circle cx="694" cy="210.5" r="4" fill="#7ea7d8" className="s8-pulse" />
    <text x="705" y="215" fontSize="11" fill="#7ea7d8" fontFamily="ui-sans-serif, -apple-system, sans-serif">Stock updated</text>
  </g>

  <g className="s8-float">
    <rect x="655" y="300" width="180" height="145" rx="22" className="s8-card" />
    <rect x="679" y="325" width="48" height="48" rx="14" fill="#162033" />
    <rect x="691" y="337" width="24" height="25" rx="3" fill="none" stroke="#7ea7d8" strokeWidth="2" />
    <path d="M691 345h24M699 337v25M707 337v25" stroke="#7ea7d8" strokeWidth="1.4" opacity=".8" />
    <text x="741" y="344" fontSize="18" className="s8-ttl">Stock Sheet</text>
    <text x="741" y="365" fontSize="12" className="s8-lbl">Inventory and pricing</text>
    <rect x="679" y="391" width="132" height="29" rx="10" fill="#141a22" stroke="#2a313c" />
    <circle cx="694" cy="405.5" r="4" fill="#7ea7d8" className="s8-pulse" />
    <text x="705" y="410" fontSize="11" fill="#7ea7d8" fontFamily="ui-sans-serif, -apple-system, sans-serif">148 units available</text>
  </g>

  <g>
    <rect x="285" y="405" width="305" height="72" rx="18" fill="#141a22" stroke="#2a313c" />
    <circle cx="320" cy="441" r="20" fill="#162033" />
    <path d="M313 444h14l-2-4v-5a5 5 0 0 0-10 0v5z" fill="none" stroke="#7ea7d8" strokeWidth="2" strokeLinejoin="round" />
    <path d="M318 448c1 2 3 2 4 0" fill="none" stroke="#7ea7d8" strokeWidth="2" strokeLinecap="round" />
    <text x="352" y="433" fontSize="13" className="s8-ttl">Customer tracking update sent</text>
    <text x="352" y="454" fontSize="11" className="s8-lbl">Your order has shipped · Track package</text>
    <circle cx="560" cy="441" r="5" fill="#7ea7d8" className="s8-blink" />
  </g>

  <circle r="6" fill="#7ea7d8">
    <animateMotion dur="2.7s" repeatCount="indefinite" path="M245 205 C330 205 335 260 400 260" />
  </circle>
  <circle r="6" fill="#2e5e9e">
    <animateMotion dur="3s" begin=".5s" repeatCount="indefinite" path="M500 250 C575 245 585 175 655 175" />
  </circle>
  <circle r="6" fill="#7ea7d8">
    <animateMotion dur="3.2s" begin="1s" repeatCount="indefinite" path="M500 280 C570 290 590 360 655 360" />
  </circle>
  <circle r="6" fill="#2e5e9e">
    <animateMotion dur="3.4s" begin="1.4s" repeatCount="indefinite" path="M750 235 C750 300 720 405 590 435" />
  </circle>

  <g>
    <rect x="285" y="177" width="77" height="25" rx="12" fill="#141a22" stroke="#2a313c" />
    <text x="323.5" y="193.5" textAnchor="middle" fontSize="10" fill="#7ea7d8" fontFamily="ui-sans-serif, -apple-system, sans-serif">New Order</text>
    <rect x="550" y="184" width="73" height="25" rx="12" fill="#141a22" stroke="#2a313c" />
    <text x="586.5" y="200.5" textAnchor="middle" fontSize="10" fill="#7ea7d8" fontFamily="ui-sans-serif, -apple-system, sans-serif">Price Sync</text>
    <rect x="550" y="337" width="76" height="25" rx="12" fill="#141a22" stroke="#2a313c" />
    <text x="588" y="353.5" textAnchor="middle" fontSize="10" fill="#7ea7d8" fontFamily="ui-sans-serif, -apple-system, sans-serif">Stock Sync</text>
  </g>
</svg></div></div><div className="svc-body"><h3 style={s("margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.28; color: #101113;")}>Store, Stock &amp; Amazon</h3><p style={s("margin: 0; font-size: 14.5px; color: #5a5f66; line-height: 1.55;")}>Orders, stock levels and prices stay synced across your store, Amazon and your spreadsheets. Customers get their tracking updates without you touching a thing.</p><div className="svc-tags"><span className="svc-tag">Amazon</span><span className="svc-tag">Stock sync</span><span className="svc-tag">Order updates</span></div></div></div>
    <div data-m-scard="1" className="svc-card"><div style={s("padding: 12px 12px 0;")}><div className="svc-well" aria-hidden="true"><svg className="s9-svg" viewBox="0 0 480 270" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  
  <rect width="480" height="270" fill="#08090b" />
  <rect x="16" y="16" width="250" height="238" rx="14" fill="#10141b" stroke="#2a313c" />
  <text x="32" y="42" fill="#9ba1a9" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">Today</text>
  <text className="s9-kpi" x="32" y="70" fill="#f5f6f7" fontSize="26" fontFamily="ui-sans-serif, -apple-system, sans-serif" fontWeight="700">£2,140</text>
  <text x="32" y="88" fill="#7ea7d8" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">sales  ·  14 bookings</text>
  <rect className="s9-bar" style={s("animation-delay:0.0s")} x="36" y="112" width="14" height="36" rx="3" fill="#2e5e9e" /><rect className="s9-bar" style={s("animation-delay:0.08s")} x="58" y="96" width="14" height="52" rx="3" fill="#2e5e9e" /><rect className="s9-bar" style={s("animation-delay:0.16s")} x="80" y="104" width="14" height="44" rx="3" fill="#2e5e9e" /><rect className="s9-bar" style={s("animation-delay:0.24s")} x="102" y="78" width="14" height="70" rx="3" fill="#2e5e9e" /><rect className="s9-bar" style={s("animation-delay:0.32s")} x="124" y="90" width="14" height="58" rx="3" fill="#2e5e9e" /><rect className="s9-bar" style={s("animation-delay:0.4s")} x="146" y="66" width="14" height="82" rx="3" fill="#2e5e9e" /><rect className="s9-bar" style={s("animation-delay:0.48s")} x="168" y="84" width="14" height="64" rx="3" fill="#2e5e9e" />
  <polyline className="s9-line" points="43,128 65,116 87,122 109,98 131,108 153,86 175,96" fill="none" stroke="#7ea7d8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  <text x="32" y="232" fill="#6b7380" fontSize="8" fontFamily="IBM Plex Mono, ui-monospace, monospace">Mon  Tue  Wed  Thu  Fri  Sat  Sun</text>

  <rect x="286" y="16" width="178" height="238" rx="28" fill="#12151b" stroke="#3d4450" strokeWidth="2.2" />
  <rect x="292" y="24" width="166" height="222" rx="22" fill="#0b0c0f" />
  <rect x="348" y="30" width="54" height="6" rx="3" fill="#161a20" />
  <image href="/media/436f2158-ddf9-4253-a4f0-fdf781e74912.svg" x="308" y="48" width="22" height="22" />
  <text x="336" y="64" fill="#f5f6f7" fontSize="11" fontFamily="ui-sans-serif, -apple-system, sans-serif" fontWeight="600">Aisolhub</text>
  <g className="s9-msg">
    <rect x="308" y="86" width="138" height="118" rx="12" fill="#1c2430" />
    <text x="320" y="108" fill="#7ea7d8" fontSize="9" fontFamily="IBM Plex Mono, ui-monospace, monospace">07:30  morning report</text>
    <text x="320" y="130" fill="#f5f6f7" fontSize="11" fontFamily="ui-sans-serif, -apple-system, sans-serif">£2,140 yesterday</text>
    <text x="320" y="148" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">14 bookings</text>
    <text x="320" y="166" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">3 new leads</text>
    <text x="320" y="184" fill="#d7dde6" fontSize="10" fontFamily="ui-sans-serif, -apple-system, sans-serif">Ads ROAS  3.2x</text>
  </g>
</svg></div></div><div className="svc-body"><h3 style={s("margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.28; color: #101113;")}>Reports Without Spreadsheets</h3><p style={s("margin: 0; font-size: 14.5px; color: #5a5f66; line-height: 1.55;")}>Your sales, bookings and ad numbers arrive as a short summary on WhatsApp or email every morning. No more digging through five dashboards to know how the business is doing.</p><div className="svc-tags"><span className="svc-tag">Daily summaries</span><span className="svc-tag">Sales reports</span><span className="svc-tag">KPIs</span></div></div></div>
  </div>
  </div>
  <div style={s("margin-top: 44px; display: flex; flex-direction: column; gap: 18px; align-items: center;")}>
    <div style={s("font-size: 17px; font-weight: 600; color: #101113;")}>If you do it every day, we can automate it.</div>
    <div style={s("display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; max-width: 860px;")}><span style={s("background: #ffffff; border: 1px solid #e9eaec; border-radius: 999px; padding: 9px 18px; font-size: 14px; color: #34383d;")}>Lead generation</span><span style={s("background: #ffffff; border: 1px solid #e9eaec; border-radius: 999px; padding: 9px 18px; font-size: 14px; color: #34383d;")}>AI message replies</span><span style={s("background: #ffffff; border: 1px solid #e9eaec; border-radius: 999px; padding: 9px 18px; font-size: 14px; color: #34383d;")}>Google Sheets syncing</span><span style={s("background: #ffffff; border: 1px solid #e9eaec; border-radius: 999px; padding: 9px 18px; font-size: 14px; color: #34383d;")}>Web scraping</span><span style={s("background: #ffffff; border: 1px solid #e9eaec; border-radius: 999px; padding: 9px 18px; font-size: 14px; color: #34383d;")}>Client hunting</span><span style={s("background: #ffffff; border: 1px solid #e9eaec; border-radius: 999px; padding: 9px 18px; font-size: 14px; color: #34383d;")}>Auto emails</span><span style={s("background: #ffffff; border: 1px solid #e9eaec; border-radius: 999px; padding: 9px 18px; font-size: 14px; color: #34383d;")}>Quotes and invoices</span><span style={s("background: #ffffff; border: 1px solid #e9eaec; border-radius: 999px; padding: 9px 18px; font-size: 14px; color: #34383d;")}>Stock updates</span><span style={s("background: #ffffff; border: 1px solid #e9eaec; border-radius: 999px; padding: 9px 18px; font-size: 14px; color: #34383d;")}>Amazon store tasks</span><span style={s("background: #ffffff; border: 1px solid #e9eaec; border-radius: 999px; padding: 9px 18px; font-size: 14px; color: #34383d;")}>Review requests</span><span style={s("background: #ffffff; border: 1px solid #e9eaec; border-radius: 999px; padding: 9px 18px; font-size: 14px; color: #34383d;")}>Appointment reminders</span><span style={s("background: #ffffff; border: 1px solid #e9eaec; border-radius: 999px; padding: 9px 18px; font-size: 14px; color: #34383d;")}>Daily reports</span></div>
  </div>
</section>

<section id="whatsapp-agent" data-screen-label="WhatsApp agent">
  <WhatsAppAgentPreview />
</section>

{/* ======== PROCESS ======== */}
<section id="process" data-screen-label="Process" style={s("max-width: 1200px; margin: 0 auto; padding: 80px 32px;")}>
  <div data-m-shead="1" style={s("display: flex; flex-direction: column; gap: 12px; margin-bottom: 40px;")}>
    <div style={s("font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #2c4f7c; letter-spacing: 0.12em; text-transform: uppercase;")}>How it works</div>
    <h2 data-m-h2="1" style={s("margin: 0; font-size: 40px; letter-spacing: -0.02em; font-weight: 700;")}>From audit to autopilot in weeks</h2>
    <p style={s("margin: 0; font-size: 17px; color: #5a5f66; max-width: 54ch; line-height: 1.6;")}>Your part is a call, a yes and a few check ins. We design, build and keep the system running.</p>
  </div>
  <div className="hw-path">
    <div className="hw-track" aria-hidden="true"><span className="hw-progress"></span></div>
    <article className="hw-leg">
      <div className="hw-rail" aria-hidden="true"><span className="hw-n">01</span></div>
      <div className="hw-panel">
        <div className="hw-head">
          <div className="hw-kicker"><span className="hw-step">01</span> Audit <b>·</b> 20 min call</div>
          <h3>Free automation audit</h3>
        </div>
        <div className="hw-viz" aria-hidden="true">
          <div className="hw-mock">
            <div className="hw-mock-bar"><span className="hw-dots"><i></i><i></i><i></i></span><span>Audit call</span></div>
            <div className="hw-mock-body">
              <div className="hw-avatars">
                <span className="hw-av">Y</span>
                <span className="hw-av on">S</span>
                <div className="hw-av-meta"><b>Finding time leaks</b>aisolhub · 20 min</div>
              </div>
              <ul className="hw-list">
                <li className="is-on"><i></i>Lead replies</li>
                <li className="is-on"><i></i>Missed calls</li>
                <li><i></i>Invoice chasing</li>
              </ul>
              <div className="hw-meter"><span></span></div>
            </div>
          </div>
        </div>
        <div className="hw-more">
          <p>We spend twenty minutes finding where your team loses hours and which fixes pay back fastest. No deck. No homework.</p>
          <div className="hw-roles">
            <div className="hw-role"><span>You</span><p>Join a short call. Bring whatever is already on your mind.</p></div>
            <div className="hw-role"><span>We</span><p>Map the leaks and rank the three highest payback automations.</p></div>
          </div>
          <div className="hw-out"><em>You leave with</em>A clear list of what to automate first, and what to leave alone.</div>
        </div>
      </div>
    </article>
    <article className="hw-leg">
      <div className="hw-rail" aria-hidden="true"><span className="hw-n">02</span></div>
      <div className="hw-panel">
        <div className="hw-head">
          <div className="hw-kicker"><span className="hw-step">02</span> Plan <b>·</b> same day</div>
          <h3>Blueprint and quote</h3>
        </div>
        <div className="hw-viz" aria-hidden="true">
          <div className="hw-mock">
            <div className="hw-mock-bar"><span>Blueprint</span><span>Same day</span></div>
            <div className="hw-mock-body">
              <div className="hw-rows">
                <div className="hw-row">WhatsApp agent <span className="hw-pill">included</span></div>
                <div className="hw-row">CRM sync <span className="hw-pill">included</span></div>
                <div className="hw-row">Voice receptionist <span className="hw-pill">optional</span></div>
              </div>
              <div className="hw-foot">
                <div>Hours back / week<b>12 to 18</b></div>
                <div style={s("text-align:right;")}>Quote<b>Fixed</b></div>
              </div>
            </div>
          </div>
        </div>
        <div className="hw-more">
          <p>You get a short plan in plain English. What we will build, what it costs and roughly how many hours it gives back.</p>
          <div className="hw-roles">
            <div className="hw-role"><span>You</span><p>Read it. Ask questions. Say yes, no or not yet.</p></div>
            <div className="hw-role"><span>We</span><p>Write the scope, the number and the hours you should get back.</p></div>
          </div>
          <div className="hw-out"><em>You leave with</em>A fixed quote and a build plan you can show a partner.</div>
        </div>
      </div>
    </article>
    <article className="hw-leg">
      <div className="hw-rail" aria-hidden="true"><span className="hw-n">03</span></div>
      <div className="hw-panel">
        <div className="hw-head">
          <div className="hw-kicker"><span className="hw-step">03</span> Build <b>·</b> 2 to 4 weeks</div>
          <h3>Build and launch</h3>
        </div>
        <div className="hw-viz" aria-hidden="true">
          <div className="hw-mock">
            <div className="hw-mock-bar"><span>Workflow</span><span className="hw-live"><i></i> Live</span></div>
            <div className="hw-mock-body">
              <div className="hw-flow">
                <div className="hw-node">Lead</div>
                <span className="hw-arr"></span>
                <div className="hw-node on">Agent</div>
                <span className="hw-arr"></span>
                <div className="hw-node">CRM</div>
              </div>
              <ul className="hw-list">
                <li className="is-on"><i></i>Tested on real calls</li>
                <li className="is-on"><i></i>Team trained</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="hw-more">
          <p>We build it, test it on your real calls and data, then train your team. Most projects go live within a month.</p>
          <div className="hw-roles">
            <div className="hw-role"><span>You</span><p>A few check ins. Share logins and say when something feels off.</p></div>
            <div className="hw-role"><span>We</span><p>Build, test, train and hand it over ready to run.</p></div>
          </div>
          <div className="hw-out"><em>You leave with</em>A live system and a team that knows how to use it.</div>
        </div>
      </div>
    </article>
    <article className="hw-leg">
      <div className="hw-rail" aria-hidden="true"><span className="hw-n">04</span></div>
      <div className="hw-panel">
        <div className="hw-head">
          <div className="hw-kicker"><span className="hw-step">04</span> Keep <b>·</b> ongoing</div>
          <h3>Monitor and improve</h3>
        </div>
        <div className="hw-viz" aria-hidden="true">
          <div className="hw-mock">
            <div className="hw-mock-bar"><span>Systems</span><span className="hw-run"><i></i> Running</span></div>
            <div className="hw-mock-body">
              <div className="hw-bars"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
              <div className="hw-foot">
                <div>Last check<b>2 min ago</b></div>
                <div style={s("text-align:right;")}>Incidents this week<b>0</b></div>
              </div>
            </div>
          </div>
        </div>
        <div className="hw-more">
          <p>We keep an eye on everything, fix whatever breaks and keep adding improvements as the business grows.</p>
          <div className="hw-roles">
            <div className="hw-role"><span>You</span><p>Run the business. Message us if something new starts eating time.</p></div>
            <div className="hw-role"><span>We</span><p>Watch the system, fix issues and keep tightening it.</p></div>
          </div>
          <div className="hw-out"><em>You leave with</em>Something that stays live and keeps getting better.</div>
        </div>
      </div>
    </article>
  </div>
  <div className="hw-next">
    <p>Start with the free audit. Twenty minutes. Nothing to prepare.</p>
    <a href="#contact">Book the call</a>
  </div>
</section>

{/* ======== RESULTS ======== */}
<section id="results" data-screen-label="Results" style={s("background: #0b0c0f; padding: 96px 0 72px; overflow: hidden;")}>
  <div style={s("max-width: 1200px; margin: 0 auto; padding: 0 32px;")}>
    <div data-m-rhead="1" style={s("display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: 56px;")}>
      <div style={s("display: flex; flex-direction: column; gap: 14px;")}>
        <div style={s("font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #7ea7d8; letter-spacing: 0.12em; text-transform: uppercase;")}>Client results</div>
        <h2 data-m-h2="1" style={s("margin: 0; font-size: 52px; letter-spacing: -0.03em; font-weight: 700; color: #f5f6f7; line-height: 1.05;")}>Proof, not promises.</h2>
      </div>
      <Link className="hvr-5" to="/work" style={s("flex-shrink: 0; font-family: 'IBM Plex Mono', monospace; font-size: 13.5px; color: #7ea7d8; border: 1px solid rgba(126,167,216,.35); border-radius: 8px; padding: 11px 18px;")}>View all work →</Link>
    </div>
      <div data-m-crow="1" style={s("display: grid; grid-template-columns: 1fr 1fr; gap: 72px; padding: 64px 0; border-top: 1px solid rgba(255,255,255,.07); align-items: center;")}>
        <div data-m-ctext="1" style={s("display: flex; flex-direction: column; gap: 18px; justify-content: center;")}>
          <div style={s("display: flex; align-items: baseline; gap: 14px;")}>
            <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #7ea7d8; display: none")}>/01</span>
            <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #6f757e; letter-spacing: 0.1em; text-transform: uppercase;")}>AI memory engine</span>
          </div>
          <div style={s("display: flex; align-items: baseline; gap: 16px;")}>
            <span data-m-metric="1" style={s("font-size: 96px; font-weight: 700; letter-spacing: -0.05em; line-height: .9; color: #f5f6f7;")}>24/7</span>
            <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #7ea7d8; max-width: 90px; line-height: 1.5;")}>ticket triage</span>
          </div>
          <div style={s("width: 56px; height: 2px; background: #7ea7d8;")}></div>
          <div style={s("font-size: 24px; font-weight: 600; color: #f5f6f7; letter-spacing: -0.01em; text-wrap: balance;")}>Tickets analysed before your team opens the inbox.</div>
          <p style={s("margin: 0; font-size: 15.5px; color: #9aa0a8; line-height: 1.7; max-width: 46ch;")}>Built an enterprise grade AI Support Ticket Intelligence system that monitors Zendesk tickets, analyses conversation history, prioritises urgency, prevents duplicate escalations and prepares responses while keeping sensitive customer data protected.</p>
        </div>
        <div data-m-cmedia="1" style={s("position: relative; padding: 0 20px 20px 0;")}>
          <div style={s("position: absolute; inset: 20px 0 0 20px; border: 1px solid rgba(126,167,216,.35); border-radius: 16px; pointer-events: none;")}></div>
          <div style={s("position: relative; border: 1px solid rgba(255,255,255,.12); border-radius: 16px; overflow: hidden; background: #111318;")}>
            <div style={s("display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid rgba(255,255,255,.07);")}>
              <div style={s("display: flex; align-items: center; gap: 8px;")}>
                <span style={s("width: 8px; height: 8px; border-radius: 50%; background: #3fbf7f;")}></span>
                <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #6f757e;")}>automation running</span>
              </div>
              <span className="case-sig" aria-hidden="true"><svg viewBox="0 0 48 48" width="14" height="14"><g fill="#7ea7d8" transform="translate(24 24) rotate(-34)"><rect x="-7.2" y="-13.6" width="26.4" height="9.4" rx="4.7" /><rect x="-19.2" y="4.2" width="26.4" height="9.4" rx="4.7" /></g></svg>aisolhub</span>
            </div>
            <div className="c1-slides"><img src="/media/1fe0d27a-a4c7-4344-a6e7-fed4308111a1.webp" alt="AI Support Ticket Intelligence workflow" /><img src="/media/028d7b8f-605b-4dea-b99f-47220e08c9be.webp" alt="AI Support Ticket Intelligence workflow" /><img src="/media/d862f2b0-1fdf-45f4-91a1-b8c3d2dc9866.webp" alt="AI Support Ticket Intelligence workflow" /><svg className="c-stamp" viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="rgba(8,9,11,.58)" />
      <g fill="#7ea7d8" transform="translate(24 24) rotate(-34)">
        <rect x="-7.2" y="-13.6" width="26.4" height="9.4" rx="4.7" />
        <rect x="-19.2" y="4.2" width="26.4" height="9.4" rx="4.7" />
      </g>
    </svg></div>
          </div>
          <div data-m-ghost="1" style={s("position: absolute; left: -14px; bottom: -34px; font-size: 110px; font-weight: 700; letter-spacing: -0.04em; line-height: 1; color: transparent; -webkit-text-stroke: 1px rgba(126,167,216,.25); pointer-events: none;")}>01</div>
        </div>
      </div>
      <div data-m-crow="1" style={s("display: grid; grid-template-columns: 1fr 1fr; gap: 72px; padding: 64px 0; border-top: 1px solid rgba(255,255,255,.07); align-items: center;")}>
        <div data-m-cmedia="1" style={s("position: relative; padding: 0 0 20px 20px;")}>
          <div style={s("position: absolute; inset: 20px 20px 0 0; border: 1px solid rgba(126,167,216,.35); border-radius: 16px; pointer-events: none;")}></div>
          <div style={s("position: relative; border: 1px solid rgba(255,255,255,.12); border-radius: 16px; overflow: hidden; background: #111318;")}>
            <div style={s("display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid rgba(255,255,255,.07);")}>
              <div style={s("display: flex; align-items: center; gap: 8px;")}>
                <span style={s("width: 8px; height: 8px; border-radius: 50%; background: #3fbf7f;")}></span>
                <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #6f757e;")}>automation running</span>
              </div>
              <span className="case-sig" aria-hidden="true"><svg viewBox="0 0 48 48" width="14" height="14"><g fill="#7ea7d8" transform="translate(24 24) rotate(-34)"><rect x="-7.2" y="-13.6" width="26.4" height="9.4" rx="4.7" /><rect x="-19.2" y="4.2" width="26.4" height="9.4" rx="4.7" /></g></svg>aisolhub</span>
            </div>
            <div className="c3-slides"><img src="/media/9d61d1bf-3fbf-4086-8b04-3c74f2db0b84.webp" alt="Lead qualification workflow" /><img src="/media/d2154f45-d95d-4a86-bc39-18bd77950bd9.webp" alt="AI lead qualification and CRM automation workflow" /><img src="/media/ce83fe35-3da0-4035-85fe-0374c09a39d8.webp" alt="AI lead qualification and CRM automation workflow" /><img src="/media/e33b79b4-9722-43c1-b45d-1f59cd635246.webp" alt="AI lead qualification and CRM automation workflow" /><svg className="c-stamp" viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="rgba(8,9,11,.58)" />
      <g fill="#7ea7d8" transform="translate(24 24) rotate(-34)">
        <rect x="-7.2" y="-13.6" width="26.4" height="9.4" rx="4.7" />
        <rect x="-19.2" y="4.2" width="26.4" height="9.4" rx="4.7" />
      </g>
    </svg></div>
          </div>
          <div data-m-ghost="1" style={s("position: absolute; right: -14px; bottom: -34px; font-size: 110px; font-weight: 700; letter-spacing: -0.04em; line-height: 1; color: transparent; -webkit-text-stroke: 1px rgba(126,167,216,.25); pointer-events: none;")}>02</div>
        </div>
        <div data-m-ctext="1" style={s("display: flex; flex-direction: column; gap: 18px; justify-content: center;")}>
          <div style={s("display: flex; align-items: baseline; gap: 14px;")}>
            <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #7ea7d8; display: none")}>/02</span>
            <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #6f757e; letter-spacing: 0.1em; text-transform: uppercase;")}>Lead operations</span>
          </div>
          <div style={s("display: flex; align-items: baseline; gap: 16px;")}>
            <span data-m-metric="1" style={s("font-size: 96px; font-weight: 700; letter-spacing: -0.05em; line-height: .9; color: #f5f6f7;")}>1m</span>
            <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #7ea7d8; max-width: 90px; line-height: 1.5;")}>to CRM</span>
          </div>
          <div style={s("width: 56px; height: 2px; background: #7ea7d8;")}></div>
          <div style={s("font-size: 24px; font-weight: 600; color: #f5f6f7; letter-spacing: -0.01em; text-wrap: balance;")}>New leads scored and routed without manual sorting.</div>
          <p style={s("margin: 0; font-size: 15.5px; color: #9aa0a8; line-height: 1.7; max-width: 46ch;")}>AI scores incoming leads, routes hot prospects into the right CRM pipeline and triggers follow up workflows automatically. Sales gets notified in Slack or email while records stay synced without copy paste.</p>
        </div>
      </div>
      <div data-m-crow="1" style={s("display: grid; grid-template-columns: 1fr 1fr; gap: 72px; padding: 64px 0; border-top: 1px solid rgba(255,255,255,.07); align-items: center;")}>
        <div data-m-ctext="1" style={s("display: flex; flex-direction: column; gap: 18px; justify-content: center;")}>
          <div style={s("display: flex; align-items: baseline; gap: 14px;")}>
            <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #7ea7d8; display: none")}>/03</span>
            <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #6f757e; letter-spacing: 0.1em; text-transform: uppercase;")}>Call data sync</span>
          </div>
          <div style={s("display: flex; align-items: baseline; gap: 16px;")}>
            <span data-m-metric="1" style={s("font-size: 96px; font-weight: 700; letter-spacing: -0.05em; line-height: .9; color: #f5f6f7;")}>0</span>
            <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #7ea7d8; max-width: 90px; line-height: 1.5;")}>manual logs</span>
          </div>
          <div style={s("width: 56px; height: 2px; background: #7ea7d8;")}></div>
          <div style={s("font-size: 24px; font-weight: 600; color: #f5f6f7; letter-spacing: -0.01em; text-wrap: balance;")}>Every call logged. CRM updated automatically.</div>
          <p style={s("margin: 0; font-size: 15.5px; color: #9aa0a8; line-height: 1.7; max-width: 46ch;")}>GoHighLevel and Zapier workflows sync call data, contact records and pipeline stages across tools in real time. No more manual logging after sales calls or chasing missing contact details.</p>
        </div>
        <div data-m-cmedia="1" style={s("position: relative; padding: 0 20px 20px 0;")}>
          <div style={s("position: absolute; inset: 20px 0 0 20px; border: 1px solid rgba(126,167,216,.35); border-radius: 16px; pointer-events: none;")}></div>
          <div style={s("position: relative; border: 1px solid rgba(255,255,255,.12); border-radius: 16px; overflow: hidden; background: #111318;")}>
            <div style={s("display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid rgba(255,255,255,.07);")}>
              <div style={s("display: flex; align-items: center; gap: 8px;")}>
                <span style={s("width: 8px; height: 8px; border-radius: 50%; background: #3fbf7f;")}></span>
                <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #6f757e;")}>automation running</span>
              </div>
              <span className="case-sig" aria-hidden="true"><svg viewBox="0 0 48 48" width="14" height="14"><g fill="#7ea7d8" transform="translate(24 24) rotate(-34)"><rect x="-7.2" y="-13.6" width="26.4" height="9.4" rx="4.7" /><rect x="-19.2" y="4.2" width="26.4" height="9.4" rx="4.7" /></g></svg>aisolhub</span>
            </div>
            <div className="c2-slides"><img src="/media/b163211a-f790-4a6f-937d-fbc22ff44e58.webp" alt="GHL and Zapier call data sync workflow" /><img src="/media/a1960ac3-4b8b-4eb1-8c06-85e2fa94e6e7.webp" alt="GHL and Zapier call data sync workflow" /><img src="/media/1ac894fc-7d81-4fa7-8708-764a7697e845.webp" alt="GHL and Zapier call data sync workflow" /><img src="/media/fbae17ca-3894-41d6-b5d0-01b63d776ff4.webp" alt="GHL and Zapier call data sync workflow" /><svg className="c-stamp" viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="rgba(8,9,11,.58)" />
      <g fill="#7ea7d8" transform="translate(24 24) rotate(-34)">
        <rect x="-7.2" y="-13.6" width="26.4" height="9.4" rx="4.7" />
        <rect x="-19.2" y="4.2" width="26.4" height="9.4" rx="4.7" />
      </g>
    </svg></div>
          </div>
          <div data-m-ghost="1" style={s("position: absolute; left: -14px; bottom: -34px; font-size: 110px; font-weight: 700; letter-spacing: -0.04em; line-height: 1; color: transparent; -webkit-text-stroke: 1px rgba(126,167,216,.25); pointer-events: none;")}>03</div>
        </div>
      </div>
  </div>
</section>

{/* ======== TESTIMONIALS ======== */}
<section id="reviews" data-screen-label="Testimonials" style={s("max-width: 1200px; margin: 0 auto; padding: 88px 32px; overflow-x: hidden;")}>
  <div data-m-shead="1" style={s("display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; margin-bottom: 44px;")}>
    <div style={s("display: flex; flex-direction: column; gap: 14px;")}>
      <div style={s("font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #2c4f7c; letter-spacing: 0.12em; text-transform: uppercase;")}>What clients say</div>
      <h2 data-m-h2="1" style={s("margin: 0; font-size: 40px; letter-spacing: -0.02em; font-weight: 700;")}>Business owners who stopped doing busywork</h2>
      <div className="rev-badge">
        <div className="rev-stars lg" aria-label="Five star rated"><i></i><i></i><i></i><i></i><i></i><b>5.0</b></div>
        <div>
          <div style={s("font-weight: 700; font-size: 15px; color: #101113;")}>Five star rated on Fiverr · 17 reviews</div>
          <div className="rev-pills" style={s("margin-top: 8px;")}>
            <span>Communication 5.0</span>
            <span>Quality 5.0</span>
            <span>Value 5.0</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="rev-track" aria-label="Client reviews">
    <div className="rev-row">
      <div className="rev-card">
        <div className="rev-stars" aria-label="Five star rating"><i></i><i></i><i></i><i></i><i></i><b>5.0</b></div>
        <p style={s("margin: 0; font-size: 16px; line-height: 1.65; color: #34383d;")}>"Outstanding work! The n8n workflow was implemented exactly as requested. Form submissions are now automatically saved to Google Sheets and email notifications are sent instantly without any issues. Communication was excellent, delivery was fast, and the automation was thoroughly tested before completion."</p>
        <div style={s("display: flex; align-items: center; gap: 12px; margin-top: auto;")}>
          <div style={s("width: 44px; height: 44px; border-radius: 50%; background: #2e5e9e; color: #f5f6f7; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0;")}>B</div>
          <div>
            <div style={s("font-weight: 600; font-size: 15px;")}>bertha_hallie</div>
            <div style={s("font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #8b9096;")}>United Kingdom · Fiverr</div>
          </div>
        </div>
      </div>
      <div className="rev-card">
        <div className="rev-stars" aria-label="Five star rating"><i></i><i></i><i></i><i></i><i></i><b>5.0</b></div>
        <p style={s("margin: 0; font-size: 16px; line-height: 1.65; color: #34383d;")}>"Excellent experience working together. The automation was built exactly to the requirements, creating Trello tasks from new leads and notifying our team in Slack automatically. Fast delivery, good communication, and solid technical skills. Highly recommended."</p>
        <div style={s("display: flex; align-items: center; gap: 12px; margin-top: auto;")}>
          <div style={s("width: 44px; height: 44px; border-radius: 50%; background: #1e3f6b; color: #f5f6f7; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0;")}>D</div>
          <div>
            <div style={s("font-weight: 600; font-size: 15px;")}>david_jon8</div>
            <div style={s("font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #8b9096;")}>United States · Fiverr</div>
          </div>
        </div>
      </div>
      <div className="rev-card">
        <div className="rev-stars" aria-label="Five star rating"><i></i><i></i><i></i><i></i><i></i><b>5.0</b></div>
        <p style={s("margin: 0; font-size: 16px; line-height: 1.65; color: #34383d;")}>"Great experience working with Ezel. Communication was smooth, delivery was on time, and everything worked as expected. Professional, responsive, and easy to work with. I would definitely recommend and hire again."</p>
        <div style={s("display: flex; align-items: center; gap: 12px; margin-top: auto;")}>
          <div style={s("width: 44px; height: 44px; border-radius: 50%; background: #3d6fb0; color: #f5f6f7; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0;")}>C</div>
          <div>
            <div style={s("font-weight: 600; font-size: 15px;")}>carolynmaya</div>
            <div style={s("font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #8b9096;")}>United States · Fiverr</div>
          </div>
        </div>
      </div>
      <div className="rev-card">
        <div className="rev-stars" aria-label="Five star rating"><i></i><i></i><i></i><i></i><i></i><b>5.0</b></div>
        <p style={s("margin: 0; font-size: 16px; line-height: 1.65; color: #34383d;")}>"Excellent experience from start to finish. They understood the requirements perfectly, completed the project efficiently, and paid great attention to detail. I look forward to working with them again."</p>
        <div style={s("display: flex; align-items: center; gap: 12px; margin-top: auto;")}>
          <div style={s("width: 44px; height: 44px; border-radius: 50%; background: #7ea7d8; color: #f5f6f7; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0;")}>S</div>
          <div>
            <div style={s("font-weight: 600; font-size: 15px;")}>samuel_3499</div>
            <div style={s("font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #8b9096;")}>United Arab Emirates · Fiverr</div>
          </div>
        </div>
      </div>
      <div className="rev-card">
        <div className="rev-stars" aria-label="Five star rating"><i></i><i></i><i></i><i></i><i></i><b>5.0</b></div>
        <p style={s("margin: 0; font-size: 16px; line-height: 1.65; color: #34383d;")}>"Very satisfied with the results. The automation was completed successfully, and everything is working well. Would definitely work together again."</p>
        <div style={s("display: flex; align-items: center; gap: 12px; margin-top: auto;")}>
          <div style={s("width: 44px; height: 44px; border-radius: 50%; background: #2c4f7c; color: #f5f6f7; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0;")}>C</div>
          <div>
            <div style={s("font-weight: 600; font-size: 15px;")}>carolynmaya</div>
            <div style={s("font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #8b9096;")}>United States · Fiverr</div>
          </div>
        </div>
      </div>
      <div className="rev-card">
        <div className="rev-stars" aria-label="Five star rating"><i></i><i></i><i></i><i></i><i></i><b>5.0</b></div>
        <p style={s("margin: 0; font-size: 16px; line-height: 1.65; color: #34383d;")}>"Outstanding work! The n8n workflow was implemented exactly as requested. Form submissions are now automatically saved to Google Sheets and email notifications are sent instantly without any issues. Communication was excellent, delivery was fast, and the automation was thoroughly tested before completion."</p>
        <div style={s("display: flex; align-items: center; gap: 12px; margin-top: auto;")}>
          <div style={s("width: 44px; height: 44px; border-radius: 50%; background: #2e5e9e; color: #f5f6f7; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0;")}>B</div>
          <div>
            <div style={s("font-weight: 600; font-size: 15px;")}>bertha_hallie</div>
            <div style={s("font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #8b9096;")}>United Kingdom · Fiverr</div>
          </div>
        </div>
      </div>
      <div className="rev-card">
        <div className="rev-stars" aria-label="Five star rating"><i></i><i></i><i></i><i></i><i></i><b>5.0</b></div>
        <p style={s("margin: 0; font-size: 16px; line-height: 1.65; color: #34383d;")}>"Excellent experience working together. The automation was built exactly to the requirements, creating Trello tasks from new leads and notifying our team in Slack automatically. Fast delivery, good communication, and solid technical skills. Highly recommended."</p>
        <div style={s("display: flex; align-items: center; gap: 12px; margin-top: auto;")}>
          <div style={s("width: 44px; height: 44px; border-radius: 50%; background: #1e3f6b; color: #f5f6f7; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0;")}>D</div>
          <div>
            <div style={s("font-weight: 600; font-size: 15px;")}>david_jon8</div>
            <div style={s("font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #8b9096;")}>United States · Fiverr</div>
          </div>
        </div>
      </div>
      <div className="rev-card">
        <div className="rev-stars" aria-label="Five star rating"><i></i><i></i><i></i><i></i><i></i><b>5.0</b></div>
        <p style={s("margin: 0; font-size: 16px; line-height: 1.65; color: #34383d;")}>"Great experience working with Ezel. Communication was smooth, delivery was on time, and everything worked as expected. Professional, responsive, and easy to work with. I would definitely recommend and hire again."</p>
        <div style={s("display: flex; align-items: center; gap: 12px; margin-top: auto;")}>
          <div style={s("width: 44px; height: 44px; border-radius: 50%; background: #3d6fb0; color: #f5f6f7; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0;")}>C</div>
          <div>
            <div style={s("font-weight: 600; font-size: 15px;")}>carolynmaya</div>
            <div style={s("font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #8b9096;")}>United States · Fiverr</div>
          </div>
        </div>
      </div>
      <div className="rev-card">
        <div className="rev-stars" aria-label="Five star rating"><i></i><i></i><i></i><i></i><i></i><b>5.0</b></div>
        <p style={s("margin: 0; font-size: 16px; line-height: 1.65; color: #34383d;")}>"Excellent experience from start to finish. They understood the requirements perfectly, completed the project efficiently, and paid great attention to detail. I look forward to working with them again."</p>
        <div style={s("display: flex; align-items: center; gap: 12px; margin-top: auto;")}>
          <div style={s("width: 44px; height: 44px; border-radius: 50%; background: #7ea7d8; color: #f5f6f7; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0;")}>S</div>
          <div>
            <div style={s("font-weight: 600; font-size: 15px;")}>samuel_3499</div>
            <div style={s("font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #8b9096;")}>United Arab Emirates · Fiverr</div>
          </div>
        </div>
      </div>
      <div className="rev-card">
        <div className="rev-stars" aria-label="Five star rating"><i></i><i></i><i></i><i></i><i></i><b>5.0</b></div>
        <p style={s("margin: 0; font-size: 16px; line-height: 1.65; color: #34383d;")}>"Very satisfied with the results. The automation was completed successfully, and everything is working well. Would definitely work together again."</p>
        <div style={s("display: flex; align-items: center; gap: 12px; margin-top: auto;")}>
          <div style={s("width: 44px; height: 44px; border-radius: 50%; background: #2c4f7c; color: #f5f6f7; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0;")}>C</div>
          <div>
            <div style={s("font-weight: 600; font-size: 15px;")}>carolynmaya</div>
            <div style={s("font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #8b9096;")}>United States · Fiverr</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p style={s("margin: 22px 0 0; font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #8b9096; line-height: 1.6;")}>Public Fiverr reviews.</p>
</section>

{/* ======== ABOUT ======== */}
<section id="about" data-m-grid="1" data-screen-label="About" style={s("max-width: 1200px; margin: 0 auto; padding: 0 32px 88px; display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 56px; align-items: center;")}>
  <figure className="about-portrait">
    <img src="/dp.png" alt="Elif, automation engineer at aisolhub" width="640" height="640" />
  </figure>
  <div style={s("display: flex; flex-direction: column; gap: 16px;")}>
    <div style={s("font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #2c4f7c; letter-spacing: 0.12em; text-transform: uppercase;")}>Who we are</div>
    <h2 data-m-h2="1" style={s("margin: 0; font-size: 36px; letter-spacing: -0.02em; font-weight: 700;")}>Builders first, consultants second</h2>
    <p style={s("margin: 0; font-size: 17px; color: #5a5f66; line-height: 1.7;")}>We are a small team of engineers who build automation systems for businesses that want results, not jargon. You will not get a fifty page strategy deck from us. You get working systems, proper training for your team and support that actually answers. Every project starts with a free audit and your accounts stay yours.</p>
    <a className="hvr-6" href={waLink} target="_blank" style={s("align-self: flex-start; background: #101113; color: #ffffff; padding: 13px 24px; border-radius: 10px; font-weight: 600; font-size: 15px;")}>Start with a free audit</a>
  </div>
</section>

{/* ======== FAQ ======== */}
<section id="faq" data-screen-label="FAQ" style={s("max-width: 820px; margin: 0 auto; padding: 0 32px 96px;")}>
  <div data-m-shead="1" style={s("display: flex; flex-direction: column; gap: 12px; margin-bottom: 36px;")}>
    <div style={s("font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #2c4f7c; letter-spacing: 0.12em; text-transform: uppercase;")}>Questions we get</div>
    <h2 data-m-h2="1" style={s("margin: 0; font-size: 40px; letter-spacing: -0.02em; font-weight: 700;")}>Common questions</h2>
  </div>
  <div style={s("display: flex; flex-direction: column; gap: 12px;")}>
    {FAQS.map((item) => (
      <details key={item.q} style={s("background: #ffffff; border: 1px solid #e9eaec; border-radius: 12px; padding: 18px 22px;")}>
        <summary style={s("cursor: pointer; font-weight: 600; font-size: 16.5px; list-style: none;")}>{item.q}</summary>
        <p style={s("margin: 12px 0 4px; font-size: 15px; color: #5a5f66; line-height: 1.65;")}>{item.a}</p>
      </details>
    ))}
  </div>
</section>

{/* ======== LEAD FORM / CTA ======== */}
<section id="contact" className="wa-wrap" data-screen-label="Contact" style={s("background: #08090b; padding: 96px 0 88px; position: relative;")}>
  <div className="contact-inner" data-m-grid="1">
    <div className="contact-copy" style={s("display: flex; flex-direction: column; gap: 18px;")}>
      <div style={s("font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #7ea7d8; letter-spacing: 0.12em; text-transform: uppercase;")}>Get started</div>
      <h2 data-m-h2="1" style={s("margin: 0; font-size: 40px; letter-spacing: -0.02em; font-weight: 700; color: #f5f6f7; text-wrap: balance;")}>Tell us what is eating your time</h2>
      <p style={s("margin: 0; font-size: 17px; color: #9ba1a9; line-height: 1.7;")}>Fill this in and it opens a WhatsApp chat with your message ready to send. We reply the same day with available audit slots.</p>
      <div style={s("font-family: 'IBM Plex Mono', monospace; font-size: 13.5px; color: #7d838c; line-height: 2;")}>Free 20 minute audit call<br />Fixed price quote, no hourly billing<br />No commitment required</div>
    </div>
    <form className="wa-panel" onSubmit={sendWhatsApp}>
      <div className="wa-stamp">/ SEND</div>
      <div style={s("display: flex; align-items: center; gap: 12px; padding: 22px 24px 8px;")}>
        <span style={s("width: 10px; height: 10px; border-radius: 50%; background: #7ea7d8;")}></span>
        <span style={s("font-weight: 600; font-size: 15px; color: #f5f6f7;")}>New audit brief</span>
        <span style={s("margin-left: auto; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #6f757e; letter-spacing: 0.08em; padding-right: 52px;")}>WHATSAPP</span>
      </div>
      <div style={s("padding: 12px 24px 24px; display: flex; flex-direction: column; gap: 18px;")}>
        <div style={s("display: grid; grid-template-columns: 1fr 1fr; gap: 20px;")}>
          <label style={s("display: block;")}>
            <span className="wa-label">Name</span>
            <input className="wa-field" value={fName} onChange={onName} placeholder="Your name" />
          </label>
          <label style={s("display: block;")}>
            <span className="wa-label">Business</span>
            <input className="wa-field" value={fBiz} onChange={onBiz} placeholder="Company or shop" />
          </label>
        </div>
        <label style={s("display: block;")}>
          <span className="wa-label">What to automate</span>
          <textarea className="wa-field" value={fNeed} onChange={onNeed} rows="3" placeholder="Calls, leads, follow ups, stock, reports..."></textarea>
        </label>
        <div className="wa-preview">
          <strong>Ready to send</strong>
          {previewMsg}
        </div>
        <button className="wa-send" type="submit"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.87 9.87 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01z" fill="#ffffff" /><path d="M16.63 14.43c-.22-.11-1.3-.64-1.5-.71-.2-.08-.35-.11-.5.11-.15.22-.57.71-.7.86-.13.15-.26.16-.48.05-.22-.11-.93-.34-1.77-1.09-.65-.58-1.09-1.3-1.22-1.52-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.2-.68-1.65-.18-.43-.36-.37-.5-.38h-.43c-.15 0-.39.06-.59.28-.2.22-.77.75-.77 1.82s.79 2.11.9 2.26c.11.15 1.55 2.37 3.76 3.32 1.4.6 1.95.65 2.65.55.4-.06 1.3-.53 1.48-1.04.18-.51.18-.95.13-1.04-.05-.1-.2-.15-.42-.26z" fill="#2e5e9e" /></svg> Send the brief</button>
        <div style={s("font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; color: #6f757e; text-align: center;")}>Opens WhatsApp with this message. Nothing is stored on this page.</div>
      </div>
    </form>
  </div>
</section>

<SiteFooter />
</div>
  );
}
