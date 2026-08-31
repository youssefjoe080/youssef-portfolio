import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { appointmentInputSchema } from "@/lib/validation";
import { logEvent } from "@/lib/events";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = appointmentInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "بيانات غير صحيحة" }, { status: 400 });
  }
  const input = parsed.data;

  const bike = await prisma.motorcycle.findUnique({ where: { id: input.bikeId } });
  if (!bike || bike.status === "HIDDEN" || bike.status === "SOLD") {
    return NextResponse.json({ error: "البايك ده مش متاح للحجز دلوقتي" }, { status: 400 });
  }
  if (bike.status === "RESERVED") {
    return NextResponse.json({ error: "البايك ده محجوز حاليًا، كلم يوسف على واتساب للتأكيد" }, { status: 400 });
  }

  const appointment = await prisma.appointment.create({
    data: {
      bikeId: bike.id,
      bikeCode: bike.code,
      bikeName: `${bike.brand} ${bike.model} ${bike.year}`,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      preferredDate: input.preferredDate,
      preferredTime: input.preferredTime,
      notes: input.notes || undefined,
    },
  });

  await logEvent("appointment_booked", { bikeId: bike.id, bikeCode: bike.code, meta: { date: input.preferredDate } });

  return NextResponse.json({ id: appointment.id }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const status = req.nextUrl.searchParams.get("status");

  const appointments = await prisma.appointment.findMany({
    where: status ? { status: status as never } : undefined,
    orderBy: { createdAt: "desc" },
    include: { bike: { select: { slug: true, status: true } } },
  });

  return NextResponse.json({ appointments });
}
