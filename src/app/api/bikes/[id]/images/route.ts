import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { saveImage, UploadError } from "@/lib/storage";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { id } = await params;
  const bike = await prisma.motorcycle.findUnique({ where: { id }, include: { images: true } });
  if (!bike) return NextResponse.json({ error: "البايك مش موجود" }, { status: 404 });

  const formData = await req.formData();
  const files = formData.getAll("files").filter((f): f is File => f instanceof File);
  if (files.length === 0) return NextResponse.json({ error: "اختار صورة واحدة على الأقل" }, { status: 400 });

  const startOrder = bike.images.length;
  const created = [];
  try {
    for (let i = 0; i < files.length; i++) {
      const url = await saveImage(files[i]);
      const image = await prisma.bikeImage.create({
        data: {
          bikeId: id,
          url,
          order: startOrder + i,
          isCover: bike.images.length === 0 && i === 0,
        },
      });
      created.push(image);
    }
  } catch (err) {
    if (err instanceof UploadError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: "حصل خطأ في رفع الصور" }, { status: 500 });
  }

  return NextResponse.json({ images: created }, { status: 201 });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const items: { id: string; order: number; isCover?: boolean }[] = body?.images ?? [];
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "بيانات غير صحيحة" }, { status: 400 });
  }

  await prisma.$transaction([
    ...items.map((item) =>
      prisma.bikeImage.update({
        where: { id: item.id },
        data: { order: item.order, isCover: item.isCover ?? false },
      })
    ),
  ]);

  const images = await prisma.bikeImage.findMany({ where: { bikeId: id }, orderBy: { order: "asc" } });
  return NextResponse.json({ images });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { id } = await params;
  const imageId = req.nextUrl.searchParams.get("imageId");
  if (!imageId) return NextResponse.json({ error: "لازم تحدد الصورة" }, { status: 400 });

  const image = await prisma.bikeImage.findUnique({ where: { id: imageId } });
  if (!image || image.bikeId !== id) return NextResponse.json({ error: "الصورة مش موجودة" }, { status: 404 });

  await prisma.bikeImage.delete({ where: { id: imageId } });

  if (image.isCover) {
    const next = await prisma.bikeImage.findFirst({ where: { bikeId: id }, orderBy: { order: "asc" } });
    if (next) await prisma.bikeImage.update({ where: { id: next.id }, data: { isCover: true } });
  }

  return NextResponse.json({ ok: true });
}
