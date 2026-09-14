import { useEffect } from "react";
import { OG_IMAGE, SITE_URL } from "./site";

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.head.querySelector("link[rel='canonical']");
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

function setHreflang(href) {
  const alts = document.head.querySelectorAll("link[rel='alternate'][hreflang]");
  if (!href) {
    alts.forEach((node) => node.remove());
    return;
  }
  if (!alts.length) {
    ["en", "en-US", "en-GB", "x-default"].forEach((code) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = code;
      link.href = href;
      document.head.appendChild(link);
    });
    return;
  }
  alts.forEach((node) => node.setAttribute("href", href));
}

function setJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export default function Seo({
  title,
  description,
  canonical,
  robots = "index, follow",
  jsonLd,
}) {
  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:image", OG_IMAGE);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", OG_IMAGE);
    if (canonical) {
      setCanonical(canonical);
      setHreflang(canonical);
      upsertMeta("property", "og:url", canonical);
    } else {
      setCanonical(null);
      setHreflang(null);
      upsertMeta("property", "og:url", SITE_URL + "/");
    }
    setJsonLd("page-jsonld", jsonLd || null);
  }, [title, description, canonical, robots, jsonLd]);

  return null;
}
