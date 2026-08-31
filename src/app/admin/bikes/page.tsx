import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BikeAdminList } from "@/components/admin/BikeAdminList";

export const dynamic = "force-dynamic";

export default async function AdminBikesPage() {
  const bikes = await prisma.motorcycle.findMany({
    include: { images: { orderBy: { order: "asc" } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black md:text-2xl">الموتوسيكلات</h1>
          <p className="mt-1 text-sm text-paper-muted">{bikes.length} بايك في القاعدة</p>
        </div>
        <Link
          href="/admin/bikes/new"
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-l from-accent to-accent-soft px-4 py-2.5 text-sm font-black text-ink-950 shadow-glow md:px-5 md:py-3"
        >
          + إضافة موتوسيكل
        </Link>
      </div>

      <BikeAdminList initialBikes={bikes} />
    </div>
  );
}
