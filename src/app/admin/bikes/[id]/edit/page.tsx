import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BikeForm } from "@/components/admin/BikeForm";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default async function EditBikePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
}) {
  const { id } = await params;
  const { created } = await searchParams;

  const bike = await prisma.motorcycle.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } },
  });
  if (!bike) notFound();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black md:text-2xl">{bike.brand} {bike.model} — {bike.code}</h1>
          {created && <p className="mt-1 text-sm font-bold text-accent-soft">تم إنشاء البايك ✅ دلوقتي ضيف الصور</p>}
        </div>
      </div>

      <div className="mb-8 rounded-xl2 border border-ink-700 bg-ink-850 p-5">
        <h3 className="mb-4 font-extrabold">📷 صور البايك</h3>
        <ImageUploader bikeId={bike.id} initialImages={bike.images} />
      </div>

      <BikeForm mode="edit" bike={bike} />
    </div>
  );
}
