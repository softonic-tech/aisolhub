export function s(str) {
  const out = {};
  for (const part of String(str).split(";")) {
    const i = part.indexOf(":");
    if (i < 0) continue;
    let k = part.slice(0, i).trim();
    const v = part.slice(i + 1).trim();
    if (!k || !v) continue;
    if (k.startsWith("--")) {
      out[k] = v;
      continue;
    }
    k = k.replace(/^-ms-/, "ms-").replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    if (k.startsWith("webkit")) k = "W" + k.slice(1);
    out[k] = v;
  }
  return out;
}
