import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { nextBikeCode, slugify } from "@/lib/bikeCode";

// Duplicates a bike's specs (not its images or owner info) as a new HIDDEN
// draft — handy when entering several similar bikes back to back.
export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { id } = await params;
  const source = await prisma.motorcycle.findUnique({ where: { id } });
  if (!source) return NextResponse.json({ error: "البايك مش موجود" }, { status: 404 });

  const code = await nextBikeCode();
  const slug = slugify(source.brand, source.model, source.year, code);

  const bike = await prisma.motorcycle.create({
    data: {
      code,
      slug,
      brand: source.brand,
      model: source.model,
      year: source.year,
      category: source.category,
      price: source.price,
      mileage: source.mileage,
      engineCC: source.engineCC,
      condition: source.condition,
      licenseStatus: source.licenseStatus,
      registrationOffice: source.registrationOffice,
      location: source.location,
      engineCondition: source.engineCondition,
      paintCondition: source.paintCondition,
      maintenanceCondition: source.maintenanceCondition,
      modifications: source.modifications,
      description: source.description,
      status: "HIDDEN",
    },
  });

  return NextResponse.json({ bike }, { status: 201 });
}
