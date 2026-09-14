import { useEffect, useRef, useState } from "react";
import { BrandMark } from "./chrome";

const STEPS = [
  "They send the job on WhatsApp.",
  "The agent replies in seconds, in the same chat.",
  "Photo filed. Visit booked. CRM updated. Your team isn't writing anything.",
];

const MESSAGES = [
  {
    side: "out",
    time: "15:47",
    from: "Customer",
    text: "Crew at the NorthStar yard Thursday. Photos have to hit the Apex Realty record.",
  },
  {
    side: "in",
    time: "15:47",
    from: "Agent",
    kind: "choice",
    text: "aisolhub here. I can book the visit and file the photos in this chat. Two slots:",
    options: ["Thu 15:30", "Fri 09:00"],
  },
  {
    side: "out",
    time: "15:48",
    from: "Customer",
    text: "Thursday 15:30",
  },
  {
    side: "out",
    time: "15:48",
    from: "Customer",
    kind: "shot",
    caption: "NorthStar yard — west gate",
  },
  {
    side: "in",
    time: "15:49",
    from: "Agent",
    kind: "card",
    title: "Visit locked",
    rows: [
      ["When", "Thu 15:30"],
      ["Where", "NorthStar yard"],
      ["Client", "Apex Realty"],
      ["CRM", "Salesforce · AH-4821"],
    ],
  },
];

function Ticks() {
  return (
    <svg className="wap-ticks" width="16" height="11" viewBox="0 0 16 11" aria-hidden="true">
      <path d="M11.1 1.2 5.4 7.4 3 4.9" fill="none" stroke="#53bdeb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.2 1.2 8.5 7.4 7.4 6.2" fill="none" stroke="#53bdeb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBack() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15.5 5 8 12l7.5 7" stroke="#8696a0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconVideo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="6.5" width="13" height="11" rx="2.2" stroke="#8696a0" strokeWidth="1.7" />
      <path d="M16 10.2 21.2 7.4v9.2L16 13.8V10.2Z" fill="#8696a0" />
    </svg>
  );
}

function IconCall() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7.2 3.8h2.6l1.2 3.1-1.7 1.1a12.4 12.4 0 0 0 6.7 6.7l1.1-1.7 3.1 1.2v2.6c0 .8-.6 1.5-1.4 1.6A16.4 16.4 0 0 1 3.6 5.2C3.7 4.4 4.4 3.8 5.2 3.8h2Z"
        stroke="#8696a0"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="5.5" r="1.5" fill="#8696a0" />
      <circle cx="12" cy="12" r="1.5" fill="#8696a0" />
      <circle cx="12" cy="18.5" r="1.5" fill="#8696a0" />
    </svg>
  );
}

function IconEmoji() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.2" stroke="#8696a0" strokeWidth="1.6" />
      <circle cx="9" cy="10.2" r="1.05" fill="#8696a0" />
      <circle cx="15" cy="10.2" r="1.05" fill="#8696a0" />
      <path d="M8.6 14.2c.9 1.4 2.1 2.1 3.4 2.1s2.5-.7 3.4-2.1" stroke="#8696a0" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconAttach() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 12V6.8a2.3 2.3 0 0 1 4.6 0v7.4a4.6 4.6 0 1 1-9.2 0V8.2"
        stroke="#8696a0"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconCamera() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4.5 8.2h3l1.2-1.8h6.6l1.2 1.8h3A1.5 1.5 0 0 1 21 9.7v8.3a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18V9.7a1.5 1.5 0 0 1 1.5-1.5Z"
        stroke="#8696a0"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="13.6" r="3.1" stroke="#8696a0" strokeWidth="1.6" />
    </svg>
  );
}

function IconMic() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="3.5" width="6" height="10" rx="3" fill="#111b21" />
      <path d="M6.5 11.5a5.5 5.5 0 0 0 11 0" stroke="#111b21" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 17v3.2" stroke="#111b21" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
      <rect x="2.2" y="5.2" width="7.6" height="5.2" rx="1.2" fill="#8696a0" />
      <path d="M4 5.2V3.8a2 2 0 0 1 4 0v1.4" fill="none" stroke="#8696a0" strokeWidth="1.2" />
    </svg>
  );
}

function HubMark() {
  return (
    <span className="wap-avatar" aria-hidden="true">
      <BrandMark size={18} />
      <i className="wap-avatar-dot" />
    </span>
  );
}

function SiteShot() {
  return (
    <svg className="wap-shot-art" viewBox="0 0 240 72" aria-hidden="true">
      <defs>
        <linearGradient id="wap-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a2740" />
          <stop offset="55%" stopColor="#101820" />
          <stop offset="100%" stopColor="#0b141a" />
        </linearGradient>
        <linearGradient id="wap-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a3340" />
          <stop offset="100%" stopColor="#161c24" />
        </linearGradient>
      </defs>
      <rect width="240" height="72" fill="url(#wap-sky)" />
      <g fill="#7ea7d8" opacity="0.18" transform="translate(198 16) rotate(-34) scale(0.85)">
        <rect x="-7.2" y="-13.6" width="26.4" height="9.4" rx="4.7" />
        <rect x="-19.2" y="4.2" width="26.4" height="9.4" rx="4.7" />
      </g>
      <rect x="0" y="48" width="240" height="24" fill="url(#wap-ground)" />
      <path d="M0 48h240" stroke="#3d4a5c" strokeWidth="1.2" />
      <rect x="28" y="28" width="48" height="20" fill="#243044" />
      <rect x="34" y="33" width="8" height="8" fill="#7ea7d8" opacity="0.45" />
      <rect x="46" y="33" width="8" height="8" fill="#4d8fd4" opacity="0.35" />
      <rect x="58" y="33" width="8" height="8" fill="#7ea7d8" opacity="0.2" />
      <rect x="90" y="18" width="14" height="30" fill="#2a3648" />
      <rect x="86" y="14" width="22" height="5" fill="#3a4a62" />
      <path d="M104 18h40" stroke="#8696a0" strokeWidth="2" />
      <path d="M144 18v12" stroke="#8696a0" strokeWidth="2" />
      <rect x="134" y="30" width="18" height="8" rx="1" fill="#2e5e9e" />
      <circle cx="176" cy="60" r="7" fill="#1c2430" />
      <circle cx="176" cy="60" r="3.6" fill="#3d4a5c" />
      <circle cx="200" cy="62" r="5.5" fill="#1c2430" />
      <circle cx="200" cy="62" r="2.8" fill="#3d4a5c" />
      <rect x="12" y="54" width="70" height="13" rx="3" fill="#08090b" opacity="0.72" />
      <text x="17" y="63" fill="#7ea7d8" fontSize="7.5" fontFamily="ui-monospace, monospace">53.48°N · SITE</text>
    </svg>
  );
}

function Bubble({ side, children, time, extra }) {
  return (
    <div className={`wap-row ${side}`}>
      <div className={`wap-bubble ${side}${extra ? ` ${extra}` : ""}`}>
        {children}
        <span className="wap-meta">
          <time>{time}</time>
          {side === "out" ? <Ticks /> : null}
        </span>
      </div>
    </div>
  );
}

function Message({ msg }) {
  if (msg.kind === "shot") {
    return (
      <Bubble side={msg.side} time={msg.time} extra="photo">
        <SiteShot />
        <p>{msg.caption}</p>
      </Bubble>
    );
  }

  if (msg.kind === "choice") {
    return (
      <Bubble side={msg.side} time={msg.time}>
        <p>{msg.text}</p>
        <div className="wap-choices">
          {msg.options.map((option) => (
            <span key={option}>{option}</span>
          ))}
        </div>
      </Bubble>
    );
  }

  if (msg.kind === "card") {
    return (
      <Bubble side={msg.side} time={msg.time} extra="card">
        <div className="wap-card">
          <header>
            <BrandMark size={14} />
            <em>aisolhub</em>
          </header>
          <strong>{msg.title}</strong>
          <dl>
            {msg.rows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="wap-card-ok">Invite sent · nobody on your team typed this</p>
        </div>
      </Bubble>
    );
  }

  return (
    <Bubble side={msg.side} time={msg.time}>
      <p>{msg.text}</p>
    </Bubble>
  );
}

function Typing() {
  return (
    <div className="wap-row in">
      <div className="wap-bubble in wap-typing" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function srLine(msg) {
  if (msg.kind === "shot") return `${msg.from}: photo. ${msg.caption}`;
  if (msg.kind === "card") {
    return `${msg.from}: ${msg.title}. ${msg.rows.map(([k, v]) => `${k} ${v}`).join(". ")}`;
  }
  if (msg.kind === "choice") return `${msg.from}: ${msg.text} ${msg.options.join(", ")}`;
  return `${msg.from}: ${msg.text}`;
}

export default function WhatsAppAgentPreview() {
  const threadRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(1);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisibleCount(MESSAGES.length);
      setTyping(false);
      return;
    }

    let cancelled = false;
    let timers = [];
    const wait = (ms) =>
      new Promise((resolve) => {
        const id = window.setTimeout(resolve, ms);
        timers.push(id);
      });

    const play = async () => {
      while (!cancelled) {
        setTyping(false);
        setVisibleCount(1);
        await wait(900);
        for (let i = 1; i < MESSAGES.length; i += 1) {
          if (cancelled) return;
          if (MESSAGES[i].side === "in") {
            setTyping(true);
            await wait(MESSAGES[i].kind === "card" ? 920 : 780);
            if (cancelled) return;
            setTyping(false);
          } else {
            await wait(520);
          }
          setVisibleCount(i + 1);
          await wait(i === MESSAGES.length - 1 ? 3400 : 680);
        }
        if (cancelled) return;
        setVisibleCount(0);
        await wait(400);
      }
    };

    play();

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    const el = threadRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [visibleCount, typing]);

  return (
    <div className="wap-frame">
      <div className="wap-copy">
        <p className="wap-kicker">What the customer sees</p>
        <h2 data-m-h2="1">
          The WhatsApp agent, as it
          <br />
          appears.
        </h2>
        <p className="wap-lead">
          No new app. They write as usual. The agent takes the job, files the photo, books the slot, and writes the CRM. Photos, calendar, Salesforce — nobody on your team typing.
        </p>
        <ol className="wap-steps">
          {STEPS.map((step, i) => (
            <li key={step}>
              <span>{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
        <p className="wap-note">The conversation plays itself and then repeats.</p>
      </div>

      <div
        className="wap-phone"
        role="img"
        aria-label="WhatsApp conversation with aisolhub. The customer needs a crew at the NorthStar yard on Thursday and site photos on the Apex Realty record. The agent offers Thursday 15:30 or Friday 09:00. The customer picks Thursday and sends a site photo. The agent locks the visit in Salesforce and sends a calendar invite."
      >
        <div className="wap-status">
          <span>15:49</span>
          <span className="wap-status-icons" aria-hidden="true">
            <svg width="16" height="12" viewBox="0 0 16 12">
              <rect x="0" y="8" width="2.2" height="4" rx=".4" fill="#e9edef" />
              <rect x="3.4" y="5.5" width="2.2" height="6.5" rx=".4" fill="#e9edef" />
              <rect x="6.8" y="3" width="2.2" height="9" rx=".4" fill="#e9edef" />
              <rect x="10.2" y="0.5" width="2.2" height="11.5" rx=".4" fill="#e9edef" />
            </svg>
            <svg width="15" height="12" viewBox="0 0 15 12">
              <path d="M1.2 8.4a8.2 8.2 0 0 1 12.6 0" fill="none" stroke="#e9edef" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M3.6 6.2a4.8 4.8 0 0 1 7.8 0" fill="none" stroke="#e9edef" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="7.5" cy="9.4" r="1.2" fill="#e9edef" />
            </svg>
            <span className="wap-battery">
              84%
              <span className="wap-battery-body">
                <i />
              </span>
            </span>
          </span>
        </div>

        <header className="wap-header">
          <IconBack />
          <HubMark />
          <div className="wap-who">
            <strong>aisolhub</strong>
            <em>online · agent</em>
          </div>
          <div className="wap-actions">
            <IconVideo />
            <IconCall />
            <IconMenu />
          </div>
        </header>

        <div className="wap-thread" ref={threadRef}>
          <p className="wap-day">Today</p>
          <p className="wap-encrypt">
            <IconLock /> The messages are end-to-end encrypted.
          </p>
          {MESSAGES.slice(0, visibleCount).map((msg, i) => (
            <Message key={`${msg.time}-${i}`} msg={msg} />
          ))}
          {typing ? <Typing /> : null}
        </div>

        <div className="wap-composer">
          <span className="wap-input">
            <IconEmoji />
            Message
            <IconAttach />
            <IconCamera />
          </span>
          <span className="wap-mic">
            <IconMic />
          </span>
        </div>
      </div>

      <div className="wap-sr">
        {MESSAGES.map((line) => (
          <p key={srLine(line)}>{srLine(line)}</p>
        ))}
      </div>
    </div>
  );
}
