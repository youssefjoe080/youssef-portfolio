import { prisma } from "@/lib/prisma";

export type EventType =
  | "bike_view"
  | "search"
  | "filter_use"
  | "matcher_use"
  | "whatsapp_click"
  | "appointment_booked"
  | "contact_click";

/** Server-side event logger — never throws (analytics must never break the app). */
export async function logEvent(
  type: EventType,
  data?: { bikeId?: string; bikeCode?: string; meta?: Record<string, unknown> }
) {
  try {
    await prisma.analyticsEvent.create({
      data: {
        type,
        bikeId: data?.bikeId,
        bikeCode: data?.bikeCode,
        meta: data?.meta ? JSON.stringify(data.meta) : undefined,
      },
    });
  } catch {
    // analytics failures should never break user-facing flows
  }
}
