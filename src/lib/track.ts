"use client";

type Props = Record<string, string | number | boolean | undefined>;

type AnalyticsWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  posthog?: { capture?: (event: string, props?: Props) => void };
  plausible?: (event: string, opts?: { props?: Props }) => void;
};

/**
 * Analytics events from the build spec: fit_check_submit, leak_test_complete, calculator_used,
 * region_switch, video_play, cta_click. Forwards to whichever tool is loaded (GA4 dataLayer,
 * PostHog or Plausible); a no-op until one is added.
 */
export function track(event: string, props?: Props) {
  if (typeof window === "undefined") return;
  const w = window as AnalyticsWindow;
  try {
    w.dataLayer?.push({ event, ...props });
    w.posthog?.capture?.(event, props);
    w.plausible?.(event, props ? { props } : undefined);
  } catch {}
}
