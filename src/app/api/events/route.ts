import { NextRequest, NextResponse } from "next/server";
import { logEvent, type EventType } from "@/lib/events";

const VALID_TYPES: EventType[] = [
  "bike_view", "search", "filter_use", "matcher_use", "whatsapp_click", "appointment_booked", "contact_click",
];

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || !VALID_TYPES.includes(body.type)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  await logEvent(body.type, { bikeId: body.bikeId, bikeCode: body.bikeCode, meta: body.meta });
  return NextResponse.json({ ok: true });
}
