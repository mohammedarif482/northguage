import { CONTACT_EMAIL } from "@/lib/site";

type AuditPayload = {
  name: string;
  email: string;
  website: string;
  country: string;
  budget: string;
  need: string;
  note?: string;
  company?: string; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_COUNTRIES = ["UK", "US", "UAE", "Australia", "Other"];
const ALLOWED_BUDGETS = ["under 10k", "10–50k", "50k+ USD"];
const ALLOWED_NEEDS = ["Hook", "Reel", "Keep", "Not sure"];

// Best-effort per-instance rate limit: 5 submissions / 10 min / IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function clean(value: unknown, max = 300) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let body: Partial<AuditPayload>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success.
  if (clean(body.company)) {
    return Response.json({ ok: true });
  }

  const data: AuditPayload = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    website: clean(body.website, 300),
    country: clean(body.country, 40),
    budget: clean(body.budget, 40),
    need: clean(body.need, 40),
    note: clean(body.note, 200),
  };

  const errors: string[] = [];
  if (!data.name) errors.push("name");
  if (!EMAIL_RE.test(data.email)) errors.push("email");
  try {
    const url = new URL(data.website);
    if (!/^https?:$/.test(url.protocol)) errors.push("website");
  } catch {
    errors.push("website");
  }
  if (!ALLOWED_COUNTRIES.includes(data.country)) errors.push("country");
  if (!ALLOWED_BUDGETS.includes(data.budget)) errors.push("budget");
  if (!ALLOWED_NEEDS.includes(data.need)) errors.push("need");

  if (errors.length) {
    return Response.json({ error: "Please check the highlighted fields.", fields: errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.AUDIT_INBOX_EMAIL ?? CONTACT_EMAIL;
  const from = process.env.AUDIT_FROM_EMAIL ?? "Northgauge Audits <audits@northgauge.com>";

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[audit] RESEND_API_KEY not set — lead logged only:", data);
      return Response.json({ ok: true, dev: true });
    }
    console.error("[audit] RESEND_API_KEY missing in production; lead not delivered:", data);
    return Response.json(
      { error: `We couldn't send that right now. Please email ${CONTACT_EMAIL} instead.` },
      { status: 503 }
    );
  }

  const rows = Object.entries({
    Name: data.name,
    Email: data.email,
    Website: data.website,
    Country: data.country,
    "Monthly budget": data.budget,
    Need: data.need,
    "Leak Finder": data.note || "—",
  })
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td><strong>${escapeHtml(v ?? "")}</strong></td></tr>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `New growth audit request — ${data.name} (${data.country}, ${data.budget})`,
      html: `<h2 style="font-family:sans-serif">New growth audit request</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
      text: Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n"),
    }),
  });

  if (!res.ok) {
    console.error("[audit] Resend error", res.status, await res.text().catch(() => ""));
    return Response.json(
      { error: `We couldn't send that right now. Please email ${CONTACT_EMAIL} instead.` },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
