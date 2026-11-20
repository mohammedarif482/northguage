"use client";

/** Carries what the visitor already told us (leak test, calculator) into the Cal.com booking notes. */
export type BookingPrefill = { notes?: string };

const KEY = "ng_prefill";
const EVENT = "ng:prefill";

export function prefillBooking(data: BookingPrefill) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
  window.dispatchEvent(new CustomEvent<BookingPrefill>(EVENT, { detail: data }));
}

export function readPrefill(): BookingPrefill | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as BookingPrefill) : null;
  } catch {
    return null;
  }
}

export function onPrefill(cb: (p: BookingPrefill) => void) {
  const h = (e: Event) => cb((e as CustomEvent<BookingPrefill>).detail);
  window.addEventListener(EVENT, h);
  return () => window.removeEventListener(EVENT, h);
}
