import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { bikeInputSchema } from "@/lib/validation";
import { stringifyVideoUrls } from "@/lib/utils";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { id } = await params;
  const bike = await prisma.motorcycle.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } },
  });
  if (!bike) return NextResponse.json({ error: "البايك مش موجود" }, { status: 404 });
  return NextResponse.json({ bike });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { id } = await params;
  const body = await req.json().catch(() => null);

  // Support quick partial updates (e.g. status-only change) as well as full edits.
  if (body && Object.keys(body).length === 1 && "status" in body) {
    const bike = await prisma.motorcycle.update({ where: { id }, data: { status: body.status } });
    return NextResponse.json({ bike });
  }

  const parsed = bikeInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "بيانات غير صحيحة" }, { status: 400 });
  }
  const input = parsed.data;

  const bike = await prisma.motorcycle.update({
    where: { id },
    data: {
      brand: input.brand,
      model: input.model,
      year: input.year,
      category: input.category,
      price: input.price,
      mileage: input.mileage,
      engineCC: input.engineCC ?? null,
      condition: input.condition,
      licenseStatus: input.licenseStatus,
      licenseExpiry: input.licenseExpiry ? new Date(input.licenseExpiry) : null,
      registrationOffice: input.registrationOffice || null,
      location: input.location,
      engineCondition: input.engineCondition,
      paintCondition: input.paintCondition,
      maintenanceCondition: input.maintenanceCondition,
      modifications: input.modifications || null,
      description: input.description,
      inspectionNotes: input.inspectionNotes || null,
      ownerName: input.ownerName || null,
      ownerPhone: input.ownerPhone || null,
      status: input.status,
      videoUrls: input.videoUrls ? stringifyVideoUrls(input.videoUrls) : null,
      seoTitle: input.seoTitle || null,
      seoDescription: input.seoDescription || null,
    },
  });

  return NextResponse.json({ bike });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { id } = await params;
  await prisma.motorcycle.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
