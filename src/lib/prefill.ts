"use client";

export type AuditPrefill = {
  need?: "Hook" | "Reel" | "Keep" | "Not sure";
  budget?: "under 10k" | "10–50k" | "50k+ USD";
  note?: string;
};

const KEY = "ng_prefill";

/** Hooked "investment": carry what the visitor already told us into the audit form. */
export function prefillAudit(data: AuditPrefill) {
  try {
    const prev = readPrefill() ?? {};
    sessionStorage.setItem(KEY, JSON.stringify({ ...prev, ...data }));
  } catch {}
  window.dispatchEvent(new CustomEvent<AuditPrefill>("ng:prefill", { detail: data }));
}

export function readPrefill(): AuditPrefill | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuditPrefill) : null;
  } catch {
    return null;
  }
}
