export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://northgauge.com";

export const SITE_NAME = "Northgauge";
export const SITE_TITLE = "Northgauge | Creative-Led Growth Agency";
export const SITE_DESCRIPTION =
  "We build brands people notice, ads that pay back, and customers who come back. One team, three moves: Hook. Reel. Keep.";

export const CONTACT_EMAIL = "hello@northgauge.com";

/** Optional direct booking link (Cal.com / Calendly). Shown after the audit form is submitted. */
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";
