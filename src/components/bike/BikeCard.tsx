"use client";

import Image from "next/image";
import Link from "next/link";
import type { BikeImage, Motorcycle } from "@prisma/client";
import { Badge } from "@/components/ui/Badge";
import { BIKE_STATUS_DOTS, BIKE_STATUS_LABELS, CATEGORY_ICONS, CATEGORY_LABELS, CONDITION_LABELS } from "@/lib/labels";
import { formatEGP, formatKm } from "@/lib/format";
import { buildInquiryMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

type CardBike = Omit<Motorcycle, "ownerName" | "ownerPhone"> & { images: BikeImage[] };

export function BikeCard({ bike, className }: { bike: CardBike; className?: string }) {
  const cover = bike.images.find((i) => i.isCover) ?? bike.images[0];
  const href = `/bikes/${bike.slug}`;
  const isSoldOrReserved = bike.status !== "AVAILABLE";

  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl3 border border-ink-700 bg-ink-850 shadow-card transition hover:-translate-y-1 hover:border-accent/30",
        className
      )}
    >
      <Link href={href} className="relative block aspect-[4/3] w-full overflow-hidden bg-ink-800">
        {cover ? (
          <Image
            src={cover.url}
            alt={`${bike.brand} ${bike.model} ${bike.year}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl text-paper-muted">🏍️</div>
        )}

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <Badge tone="neutral" className="bg-ink-950/80 backdrop-blur">
            {CATEGORY_ICONS[bike.category]} {CATEGORY_LABELS[bike.category]}
          </Badge>
          <Badge tone={bike.status === "AVAILABLE" ? "success" : bike.status === "RESERVED" ? "warning" : "danger"} className="bg-ink-950/80 backdrop-blur">
            {BIKE_STATUS_DOTS[bike.status]} {BIKE_STATUS_LABELS[bike.status]}
          </Badge>
        </div>

        {isSoldOrReserved && (
          <div className="absolute inset-0 bg-ink-950/40" />
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={href} className="text-lg font-extrabold leading-tight hover:text-accent-soft md:text-xl">
              {bike.brand} {bike.model}
            </Link>
            <p className="mt-0.5 text-sm text-paper-muted">موديل {bike.year} · {CONDITION_LABELS[bike.condition]}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-paper-muted">
          <span>📍 {bike.location}</span>
          <span>🛣️ {formatKm(bike.mileage)}</span>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <span className="text-xl font-black text-accent-soft md:text-2xl">{formatEGP(bike.price)}</span>
          <span className="font-mono text-xs text-paper-muted">كود {bike.code}</span>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2">
          <Link
            href={href}
            className="col-span-1 inline-flex items-center justify-center rounded-lg bg-ink-800 px-2 py-2.5 text-xs font-bold text-paper transition hover:bg-ink-700 md:text-sm"
          >
            التفاصيل
          </Link>
          <Link
            href={`${href}#booking`}
            className={cn(
              "col-span-1 inline-flex items-center justify-center rounded-lg px-2 py-2.5 text-xs font-bold transition md:text-sm",
              bike.status === "AVAILABLE"
                ? "bg-gradient-to-l from-accent to-accent-soft text-ink-950 hover:brightness-110"
                : "pointer-events-none bg-ink-800 text-paper-muted"
            )}
          >
            احجز معاينة
          </Link>
          <a
            href={buildWhatsAppLink(buildInquiryMessage(bike.code, `${bike.brand} ${bike.model} ${bike.year}`))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { bikeId: bike.id, bikeCode: bike.code, meta: { from: "card" } })}
            className="col-span-1 inline-flex items-center justify-center rounded-lg bg-[#25D366] px-2 py-2.5 text-xs font-bold text-ink-950 transition hover:brightness-105 md:text-sm"
          >
            واتساب
          </a>
        </div>
      </div>
    </div>
  );
}
