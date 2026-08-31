import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { toPublicBike } from "@/lib/publicBike";
import { ImageGallery } from "@/components/bike/ImageGallery";
import { BookingForm } from "@/components/bike/BookingForm";
import { BikeViewTracker } from "@/components/bike/BikeViewTracker";
import { WhatsAppCta } from "@/components/bike/WhatsAppCta";
import { Badge } from "@/components/ui/Badge";
import {
  BIKE_STATUS_DOTS,
  BIKE_STATUS_LABELS,
  CATEGORY_ICONS,
  CATEGORY_LABELS,
  CONDITION_LABELS,
  LICENSE_LABELS,
} from "@/lib/labels";
import { formatEGP, formatKm, formatDateShort } from "@/lib/format";
import { parseVideoUrls } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function getBike(slug: string) {
  const bike = await prisma.motorcycle.findUnique({
    where: { slug },
    include: { images: { orderBy: { order: "asc" } } },
  });
  if (!bike || bike.status === "HIDDEN") return null;
  return bike;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const bike = await getBike(slug);
  if (!bike) return { title: "البايك مش موجود" };

  const title = bike.seoTitle || `${bike.brand} ${bike.model} ${bike.year} للبيع في مصر`;
  const description =
    bike.seoDescription || `${bike.brand} ${bike.model} موديل ${bike.year} - ${formatEGP(bike.price)} - كود ${bike.code}. ${bike.description.slice(0, 120)}`;
  const cover = bike.images[0]?.url;

  return {
    title,
    description,
    alternates: { canonical: `/bikes/${bike.slug}` },
    openGraph: {
      title,
      description,
      images: cover ? [{ url: cover }] : undefined,
    },
  };
}

export default async function BikeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bike = await getBike(slug);
  if (!bike) notFound();

  const publicBike = toPublicBike(bike);
  const videos = parseVideoUrls(bike.videoUrls);
  const bikeName = `${bike.brand} ${bike.model} ${bike.year}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: bikeName,
    description: bike.description,
    sku: bike.code,
    image: bike.images.map((i) => i.url),
    offers: {
      "@type": "Offer",
      price: bike.price,
      priceCurrency: "EGP",
      availability:
        bike.status === "AVAILABLE" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="container-app py-8 md:py-12">
      <BikeViewTracker bikeId={bike.id} bikeCode={bike.code} />
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-paper-muted">
        <span>الموتوسيكلات</span> <span>/</span> <span className="text-paper">{bikeName}</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <ImageGallery images={bike.images} alt={bikeName} />

          {videos.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {videos.map((v) => (
                <video key={v} src={v} controls className="w-full rounded-xl2 border border-ink-700" />
              ))}
            </div>
          )}

          <div className="mt-8">
            <h2 className="mb-3 text-lg font-extrabold">الوصف</h2>
            <p className="whitespace-pre-line leading-8 text-paper-muted">{bike.description}</p>
          </div>

          {bike.inspectionNotes && (
            <div className="mt-6 rounded-xl2 border border-ink-700 bg-ink-850 p-5">
              <h3 className="mb-2 font-extrabold">📋 ملاحظات الفحص</h3>
              <p className="whitespace-pre-line text-sm leading-7 text-paper-muted">{bike.inspectionNotes}</p>
            </div>
          )}

          <div className="mt-6 rounded-xl2 border border-amber-500/25 bg-amber-500/5 p-5">
            <p className="text-sm leading-7 text-amber-300">
              ⚠️ المعلومات المعروضة مبنية على البيانات المتاحة عن البايك. ننصح دائمًا بالمعاينة والفحص قبل الشراء.
            </p>
          </div>
        </div>

        <div>
          <div className="rounded-xl3 border border-ink-700 bg-ink-850 p-5 md:p-6">
            <div className="mb-3 flex items-center justify-between">
              <Badge tone="accent">{CATEGORY_ICONS[bike.category]} {CATEGORY_LABELS[bike.category]}</Badge>
              <Badge tone={bike.status === "AVAILABLE" ? "success" : bike.status === "RESERVED" ? "warning" : "danger"}>
                {BIKE_STATUS_DOTS[bike.status]} {BIKE_STATUS_LABELS[bike.status]}
              </Badge>
            </div>

            <h1 className="text-2xl font-black leading-tight md:text-3xl">{bike.brand} {bike.model}</h1>
            <p className="mt-1 text-sm text-paper-muted">موديل {bike.year} · كود البايك: <span className="font-mono font-bold text-paper">{bike.code}</span></p>

            <div className="mt-4 text-3xl font-black text-accent-soft md:text-4xl">{formatEGP(bike.price)}</div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <Spec label="العداد" value={formatKm(bike.mileage)} />
              <Spec label="الحالة" value={CONDITION_LABELS[bike.condition]} />
              {bike.engineCC && <Spec label="سعة الموتور" value={`${bike.engineCC} سي سي`} />}
              <Spec label="الموقع" value={bike.location} />
              <Spec label="الترخيص" value={LICENSE_LABELS[bike.licenseStatus]} />
              {bike.licenseExpiry && <Spec label="نهاية الترخيص" value={formatDateShort(bike.licenseExpiry)} />}
              {bike.registrationOffice && <Spec label="جهة التسجيل" value={bike.registrationOffice} />}
              <Spec label="تاريخ الإضافة" value={formatDateShort(bike.createdAt)} />
            </div>

            <div className="mt-5 grid gap-2.5 border-t border-ink-700 pt-5 text-sm">
              <ConditionRow label="حالة الموتور" value={bike.engineCondition} />
              <ConditionRow label="حالة الدهان" value={bike.paintCondition} />
              <ConditionRow label="حالة الصيانة" value={bike.maintenanceCondition} />
              {bike.modifications && <ConditionRow label="تعديلات" value={bike.modifications} />}
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={`#booking`}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-l from-accent to-accent-soft px-5 py-3.5 text-sm font-black text-ink-950 shadow-glow transition hover:brightness-110"
              >
                🔥 احجز معاينة
              </a>
              <WhatsAppCta bikeId={publicBike.id} bikeCode={publicBike.code} bikeName={bikeName} label="💬 اسأل عن البايك" from="ask_detail" />
              <WhatsAppCta bikeId={publicBike.id} bikeCode={publicBike.code} bikeName={bikeName} label="📱 تواصل على واتساب" from="contact_detail" variant="whatsapp" />
            </div>
          </div>
        </div>
      </div>

      <div id="booking" className="mt-14 scroll-mt-20">
        <h2 className="mb-5 text-xl font-black md:text-2xl">📅 احجز معاينة للبايك</h2>
        <div className="max-w-2xl">
          <BookingForm
            bikeId={bike.id}
            bikeCode={bike.code}
            bikeName={bikeName}
            disabled={bike.status !== "AVAILABLE"}
            disabledReason={bike.status === "RESERVED" ? "البايك ده محجوز حاليًا" : bike.status === "SOLD" ? "البايك ده اتباع" : undefined}
          />
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-ink-900 px-3 py-2.5">
      <div className="text-[11px] text-paper-muted">{label}</div>
      <div className="mt-0.5 font-bold">{value}</div>
    </div>
  );
}

function ConditionRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="shrink-0 text-paper-muted">{label}</span>
      <span className="text-left font-semibold">{value}</span>
    </div>
  );
}
