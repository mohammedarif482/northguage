"use client";

import { useSyncExternalStore } from "react";
import { track } from "./track";
import { REGION_KEY } from "./region-script";

/** "gl" = Global $ (default), "in" = India ₹. The active region is a class on <html>: `global` or none. */
export type Region = "gl" | "in";

const EVENT = "ng-region";

function read(): Region {
  return document.documentElement.classList.contains("global") ? "gl" : "in";
}

export function setRegion(r: Region) {
  if (read() === r) return;
  document.documentElement.classList.toggle("global", r === "gl");
  try {
    localStorage.setItem(REGION_KEY, r);
  } catch {}
  window.dispatchEvent(new CustomEvent(EVENT, { detail: r }));
  track("region_switch", { region: r });
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

/** Current region for components that compute with it (calculator, leak test). Server snapshot is Global. */
export function useRegion(): Region {
  return useSyncExternalStore(subscribe, read, () => "gl");
}
