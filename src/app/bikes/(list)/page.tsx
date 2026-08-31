import type { Metadata } from "next";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { toPublicBike } from "@/lib/publicBike";
import { BikeFilters } from "@/components/bike/BikeFilters";
import { BikeCard } from "@/components/bike/BikeCard";
import { CATEGORY_LABELS } from "@/lib/labels";

export const metadata: Metadata = {
  title: "كل الموتوسيكلات",
  description: "شوف كل الموتوسيكلات المتاحة للبيع في مصر مع فلاتر للفئة، السعر، الماركة والموقع.",
};

export const revalidate = 30;

type SearchParams = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export default async function BikesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;

  const category = first(sp.category);
  const brand = first(sp.brand);
  const location = first(sp.location);
  const condition = first(sp.condition);
  const year = first(sp.year);
  const minPrice = first(sp.minPrice);
  const maxPrice = first(sp.maxPrice);
  const maxMileage = first(sp.maxMileage);
  const availability = first(sp.availability) ?? "AVAILABLE";
  const q = first(sp.q)?.trim();

  const where: Prisma.MotorcycleWhereInput = {
    status: availability === "ALL" ? { in: ["AVAILABLE", "RESERVED"] } : "AVAILABLE",
  };

  if (category) where.category = category as Prisma.EnumCategoryFilter["equals"];
  if (brand) where.brand = brand;
  if (location) where.location = location;
  if (condition) where.condition = condition as Prisma.EnumBikeConditionFilter["equals"];
  if (year) where.year = Number(year);
  if (maxMileage) where.mileage = { lte: Number(maxMileage) };
  if (minPrice || maxPrice) {
    where.price = {
      ...(minPrice ? { gte: Number(minPrice) } : {}),
      ...(maxPrice ? { lte: Number(maxPrice) } : {}),
    };
  }
  if (q) {
    where.OR = [
      { brand: { contains: q } },
      { model: { contains: q } },
      { code: { contains: q } },
    ];
  }

  const [bikes, brandRows, locationRows] = await Promise.all([
    prisma.motorcycle.findMany({
      where,
      include: { images: { orderBy: { order: "asc" } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.motorcycle.findMany({ where: { status: { not: "HIDDEN" } }, select: { brand: true }, distinct: ["brand"] }),
    prisma.motorcycle.findMany({ where: { status: { not: "HIDDEN" } }, select: { location: true }, distinct: ["location"] }),
  ]);

  const brands = brandRows.map((b) => b.brand).sort((a, b) => a.localeCompare(b));
  const locations = locationRows.map((l) => l.location).sort((a, b) => a.localeCompare(b));

  const heading = category ? `موتوسيكلات ${CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] ?? ""}` : "كل الموتوسيكلات";

  return (
    <div className="container-app py-8 md:py-12">
      <div className="mb-6">
        <h1 className="text-2xl font-black md:text-3xl">{heading}</h1>
        <p className="mt-1 text-sm text-paper-muted">{bikes.length} موتوسيكل متاح للمعاينة</p>
      </div>

      <BikeFilters brands={brands} locations={locations} />

      {bikes.length === 0 ? (
        <div className="mt-8 rounded-xl3 border border-dashed border-ink-600 bg-ink-850 p-12 text-center">
          <p className="text-3xl">🔍</p>
          <p className="mt-3 font-bold">مفيش موتوسيكلات مطابقة للفلاتر دي دلوقتي</p>
          <p className="mt-1 text-sm text-paper-muted">جرب تغيّر الفلاتر أو كلم يوسف يبحتلك عن بايك يناسبك.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bikes.map((bike) => (
            <BikeCard key={bike.id} bike={toPublicBike(bike)} />
          ))}
        </div>
      )}
    </div>
  );
}
