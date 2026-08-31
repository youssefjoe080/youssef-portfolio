import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { bikeInputSchema } from "@/lib/validation";
import { nextBikeCode, slugify } from "@/lib/bikeCode";
import { stringifyVideoUrls } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const status = req.nextUrl.searchParams.get("status");
  const bikes = await prisma.motorcycle.findMany({
    where: status ? { status: status as never } : undefined,
    include: { images: { orderBy: { order: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ bikes });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = bikeInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "بيانات غير صحيحة" }, { status: 400 });
  }
  const input = parsed.data;

  const code = await nextBikeCode();
  const slug = slugify(input.brand, input.model, input.year, code);

  const bike = await prisma.motorcycle.create({
    data: {
      code,
      slug,
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
      status: input.status ?? "AVAILABLE",
      videoUrls: input.videoUrls ? stringifyVideoUrls(input.videoUrls) : null,
      seoTitle: input.seoTitle || null,
      seoDescription: input.seoDescription || null,
    },
  });

  return NextResponse.json({ bike }, { status: 201 });
}
