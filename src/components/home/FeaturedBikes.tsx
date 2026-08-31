import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BikeCard } from "@/components/bike/BikeCard";
import type { BikeImage, Motorcycle } from "@prisma/client";

type CardBike = Omit<Motorcycle, "ownerName" | "ownerPhone"> & { images: BikeImage[] };

export function FeaturedBikes({ bikes }: { bikes: CardBike[] }) {
  if (bikes.length === 0) return null;

  return (
    <section className="container-app py-16 md:py-20">
      <SectionHeading eyebrow="متاح دلوقتي" title="أحدث الموتوسيكلات المتاحة" subtitle="بايكات متاحة للمعاينة والشراء دلوقتي." />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {bikes.map((bike) => (
          <BikeCard key={bike.id} bike={bike} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/bikes"
          className="inline-flex items-center justify-center rounded-xl2 border border-ink-600 bg-ink-800/60 px-7 py-3.5 text-sm font-bold text-paper transition hover:bg-ink-700"
        >
          شوف كل الموتوسيكلات
        </Link>
      </div>
    </section>
  );
}
