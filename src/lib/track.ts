"use client";

import type { EventType } from "@/lib/events";

/** Client-side fire-and-forget analytics beacon. Never blocks the UI. */
export function track(type: EventType, data?: { bikeId?: string; bikeCode?: string; meta?: Record<string, unknown> }) {
  try {
    const body = JSON.stringify({ type, ...data });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/events", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/events", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => {});
    }
  } catch {
    // ignore
  }
}
