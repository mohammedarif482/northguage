/* =====================================================================
 * DATA: edit here.
 *
 * Everything the team fills in before launch lives in this file.
 * Any text still containing [square brackets] renders as a highlighted slot,
 * so it is easy to see what is missing. Never replace a slot with an invented
 * number, name or quote: only real figures with client approval.
 * ===================================================================== */

/** India / Global pair. Anything typed as `Dual` changes with the region switch. */
export type Dual = { india: string; global: string };

/* ---------- Booking (Cal.com) ---------- */
// Cal.com event links, e.g. "northgauge/pl-audit". Set in .env (see .env.example).
// Media buying and Hook OS fall back to the main link if they have no event of their own.
export const CAL = {
  main: process.env.NEXT_PUBLIC_CAL_LINK ?? "",
  mediaBuying: process.env.NEXT_PUBLIC_CAL_LINK_MEDIA_BUYING || process.env.NEXT_PUBLIC_CAL_LINK || "",
  hookOs: process.env.NEXT_PUBLIC_CAL_LINK_HOOK_OS || process.env.NEXT_PUBLIC_CAL_LINK || "",
};

/* ---------- Headline numbers (top bar, hero proof row, stats) ---------- */
export const STATS = {
  brandsGrown: "[X]",
  adSpend: { india: "₹[X] Cr", global: "$[X]M" } as Dual,
  creativesShipped: "[X]",
  agenciesReplaced: "[X]",
};

/* ---------- Hook OS proof ---------- */
export const HOOK_OS_PROOF = {
  adsShipped: "[X]",
  beatAveragePct: "[X]%",
  daysBriefToLive: "[X]",
};

/* ---------- Logo rows: 3 rows of 10 ----------
 * A name shows as text; a path ending .svg/.png shows the logo (put files in /public/logos);
 * "[Logo]" is an empty slot. Getto and Ecosys need written OK before launch. */
export const LOGOS: string[][] = [
  ["KM20", "Label Aaina", "Getto", "Kuhl Teen", "Zoci", "[Logo]", "[Logo]", "[Logo]", "[Logo]", "[Logo]"],
  ["Ecosys", "Teaquila", "Gut2Go", "[Logo]", "[Logo]", "[Logo]", "[Logo]", "[Logo]", "[Logo]", "[Logo]"],
  ["[Logo]", "[Logo]", "[Logo]", "[Logo]", "[Logo]", "[Logo]", "[Logo]", "[Logo]", "[Logo]", "[Logo]"],
];

/* ---------- Portfolio donuts: real current client counts only. null = not filled in ---------- */
export const INDUSTRY: { label: string; value: number | null }[] = [
  { label: "Beauty and personal care", value: null },
  { label: "Health and nutrition", value: null },
  { label: "Fashion and accessories", value: null },
  { label: "Food and beverage", value: null },
  { label: "Other D2C", value: null },
];
export const STAGE: { label: string; note: string; value: number | null; highlight?: boolean }[] = [
  { label: "Launch", note: "Making the ads profitable", value: null },
  { label: "Growth", note: "Scaling spend on margin. Our flagship", value: null, highlight: true },
  { label: "Scale", note: "Full growth team on one P&L", value: null },
];
/** Layout weights used ONLY while values are null, so the chart reads correctly in preview. */
export const STAGE_PREVIEW = [25, 50, 25];

/* ---------- Media: videos and ad creatives ----------
 * `src` is a path in /public (e.g. "/media/testimonial-1.mp4") or a full URL. Empty = placeholder tile. */
export type Creative = { label: string; aspect: "9/16" | "4/5" | "16/9"; src: string; poster?: string };

export const HERO_ADS: Creative[] = [
  { label: "UGC video", aspect: "9/16", src: "" },
  { label: "Static", aspect: "4/5", src: "" },
  { label: "Carousel", aspect: "4/5", src: "" },
  { label: "Reel", aspect: "9/16", src: "" },
];

export const HOOK_OS_WORK: Creative[] = [
  { label: "UGC video", aspect: "9/16", src: "" },
  { label: "Static", aspect: "4/5", src: "" },
  { label: "Static", aspect: "4/5", src: "" },
  { label: "Reel", aspect: "9/16", src: "" },
  { label: "Carousel", aspect: "4/5", src: "" },
  { label: "Static", aspect: "4/5", src: "" },
];

export const FOUNDER_VIDEO = { src: "", poster: "" };

export const TESTIMONIALS = Array.from({ length: 5 }, () => ({
  src: "",
  poster: "",
  result: "[+X% result in X months]",
  founder: "[Founder name]",
  brand: "[Brand]",
  category: "[Category]",
}));

/* ---------- Main page proof cards (#work) ---------- */
export const MAIN_CASES = [
  {
    category: "Beauty",
    client: "[Client name]",
    rows: [
      ["Ad spend, 12 months", "[X]"],
      ["Website revenue", "[X]"],
      ["New customers", "[X]"],
      ["Cost per new customer", "[X]"],
    ],
    wrong: "[the dip]",
    changed: "[the fix]",
  },
  {
    category: "Health & nutrition",
    client: "[Client name]",
    rows: [
      ["Ad spend, 12 months", "[X]"],
      ["Website revenue", "[X]"],
      ["Repeat rate, 90 days", "[X]"],
      ["Cost per new customer", "[X]"],
    ],
    wrong: "[the dip]",
    changed: "[the fix]",
  },
  {
    category: "Fashion",
    client: "[Client name]",
    rows: [
      ["Ad spend, 12 months", "[X]"],
      ["Website revenue, net of returns", "[X]"],
      ["Return rate", "[X]"],
      ["Cost per kept order", "[X]"],
    ],
    wrong: "[the dip]",
    changed: "[the fix]",
  },
];

/* ---------- Media buying page ---------- */
export const MB_FEATURED = {
  client: "[Client]",
  category: "[Category]",
  spend: { india: "₹[X] L", global: "$[X]k" } as Dual,
  roas: "[X]x",
  margin: "[+X%]",
  months: "[X]",
};

export const MB_AUDIT_CASES = {
  doubleCounts: "Seen at [Client]: [X]% of platform-claimed purchases had no matching order",
  placedOrders: {
    india: "Seen at [Client]: [X]% of orders returned or RTO'd",
    global: "Seen at [Client]: [X]% of orders returned",
  } as Dual,
  fatigue: "Seen at [Client]: cost per purchase up [X]% in [X] weeks on one ad",
};

export const MB_PHASE_CASES = {
  foundation: "[Client]: [attribution gap cut from X% to X%]",
  prove: "[Client]: [X winning ads found in X weeks]",
  scale: "[Client]: [spend +X% with margin held at X%]",
  expand: "[Client]: [Google added X% to blended revenue]",
};

export const MB_RETENTION_CASE = "Seen at [Client]: repeat rate at 90 days [X]% → [X]% after flows went live";

/** Channel case lines. Set `live: true` once a real case exists; cards without one are hidden when SHOW_EMPTY_SLOTS is false. */
export const MB_CHANNEL_CASES = {
  meta: { live: false, line: { india: "[Client]: [X]x blended ROAS at ₹[X] L monthly spend", global: "[Client]: [X]x blended ROAS at $[X]k monthly spend" } as Dual },
  google: { live: false, line: "[Client]: [result]" },
  quickCommerce: { live: false, line: "[Client]: [result]" },
  tiktok: { live: false, line: "[Client]: [result]" },
  dsp: { live: false, line: "[Client]: [result]" },
};

/** Before launch, flip to false: channel cards with no real case are then hidden, as the spec asks. */
export const SHOW_EMPTY_SLOTS = true;

export const MB_CASES = [
  {
    id: "beauty",
    tab: "Beauty",
    client: "[Client name]",
    rows: [
      ["Monthly ad spend", "[X]", "[X]"],
      ["Blended ROAS", "[X]", "[X]"],
      ["Kept-order revenue", "[X]", "[X]"],
      ["Contribution margin", "[X]", "[X]"],
      ["Cost per new customer", "[X]", "[X]"],
    ],
    phases: { Foundation: "[what changed]", Prove: "[what changed]", Scale: "[what changed]", Expand: "[what changed]" },
    quote: "[quote]",
    by: "[Name], [Role]",
    chart: "",
  },
  {
    id: "health",
    tab: "Health and nutrition",
    client: "[Client name]",
    rows: [
      ["Monthly ad spend", "[X]", "[X]"],
      ["Blended ROAS", "[X]", "[X]"],
      ["Repeat rate, 90 days", "[X]", "[X]"],
      ["Contribution margin", "[X]", "[X]"],
      ["Cost per new customer", "[X]", "[X]"],
    ],
    phases: { Foundation: "[what changed]", Prove: "[what changed]", Scale: "[what changed]", Expand: "[what changed]" },
    quote: "[quote]",
    by: "[Name], [Role]",
    chart: "",
  },
  {
    id: "fashion",
    tab: "Fashion",
    client: "[Client name]",
    rows: [
      ["Monthly ad spend", "[X]", "[X]"],
      ["Blended ROAS", "[X]", "[X]"],
      ["Return rate", "[X]", "[X]"],
      ["Contribution margin", "[X]", "[X]"],
      ["Cost per kept order", "[X]", "[X]"],
    ],
    phases: { Foundation: "[what changed]", Prove: "[what changed]", Scale: "[what changed]", Expand: "[what changed]" },
    quote: "[quote]",
    by: "[Name], [Role]",
    chart: "",
  },
];

/* ---------- Hook OS page ---------- */
export const HOOK_OS_LOOP_CENTRE = { week: "[X]", variantsLive: "[X]", winnersScaled: "[X]" };
export const CREATIVE_COUNT = { hookOs: "[X]", full: "[X]" };
/** Scorecard starting lines: confirm or replace before launch. */
export const SCORECARD_LINES = { hook: "[25]%", hold: "[40]%", ctr: "[1.2]%", spend: "[2]x target CPA" };

/* ---------- Footer ---------- */
export const SOCIAL = {
  instagram: "",
  linkedin: "",
};
