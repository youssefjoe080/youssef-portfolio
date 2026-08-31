import { prisma } from "@/lib/prisma";
import { APPOINTMENT_STATUS_LABELS } from "@/lib/labels";
import type { AppointmentStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

const EVENT_LABELS: Record<string, string> = {
  bike_view: "مشاهدات البايكات",
  search: "عمليات بحث",
  filter_use: "استخدام فلاتر",
  matcher_use: "استخدام اختارلي بايك",
  whatsapp_click: "ضغطات واتساب",
  appointment_booked: "حجوزات معاينة",
  contact_click: "ضغطات تواصل",
};

export default async function AdminStatsPage() {
  const [bikeCounts, appointmentCounts, eventCounts, topViewed] = await Promise.all([
    prisma.motorcycle.groupBy({ by: ["status"], _count: true }),
    prisma.appointment.groupBy({ by: ["status"], _count: true }),
    prisma.analyticsEvent.groupBy({ by: ["type"], _count: true }),
    prisma.analyticsEvent.groupBy({
      by: ["bikeCode"],
      where: { type: "bike_view", bikeCode: { not: null } },
      _count: true,
      orderBy: { _count: { bikeCode: "desc" } },
      take: 5,
    }),
  ]);

  const bikeMap = Object.fromEntries(bikeCounts.map((b) => [b.status, b._count]));
  const totalBikes = bikeCounts.reduce((sum, b) => sum + b._count, 0);
  const totalAppointments = appointmentCounts.reduce((sum, a) => sum + a._count, 0);

  const topViewedBikes = await prisma.motorcycle.findMany({
    where: { code: { in: topViewed.map((t) => t.bikeCode).filter((c): c is string => !!c) } },
    select: { code: true, brand: true, model: true, year: true },
  });
  const bikeByCode = Object.fromEntries(topViewedBikes.map((b) => [b.code, b]));

  return (
    <div>
      <h1 className="mb-6 text-xl font-black md:text-2xl">الإحصائيات</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="إجمالي البايكات" value={totalBikes} />
        <StatCard label="متاح دلوقتي" value={bikeMap["AVAILABLE"] ?? 0} tone="success" />
        <StatCard label="محجوز" value={bikeMap["RESERVED"] ?? 0} tone="warning" />
        <StatCard label="اتباع" value={bikeMap["SOLD"] ?? 0} tone="danger" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl2 border border-ink-700 bg-ink-850 p-5">
          <h3 className="mb-4 font-extrabold">الحجوزات ({totalAppointments})</h3>
          <div className="flex flex-col gap-2.5">
            {appointmentCounts.map((a) => (
              <Row key={a.status} label={APPOINTMENT_STATUS_LABELS[a.status as AppointmentStatus]} value={a._count} />
            ))}
            {appointmentCounts.length === 0 && <p className="text-sm text-paper-muted">لسه مفيش حجوزات</p>}
          </div>
        </div>

        <div className="rounded-xl2 border border-ink-700 bg-ink-850 p-5">
          <h3 className="mb-4 font-extrabold">تفاعل الموقع</h3>
          <div className="flex flex-col gap-2.5">
            {eventCounts.map((e) => (
              <Row key={e.type} label={EVENT_LABELS[e.type] ?? e.type} value={e._count} />
            ))}
            {eventCounts.length === 0 && <p className="text-sm text-paper-muted">لسه مفيش بيانات تفاعل</p>}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl2 border border-ink-700 bg-ink-850 p-5">
        <h3 className="mb-4 font-extrabold">أكتر البايكات مشاهدة</h3>
        {topViewed.length === 0 ? (
          <p className="text-sm text-paper-muted">لسه مفيش مشاهدات كفاية</p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {topViewed.map((t) => {
              const bike = t.bikeCode ? bikeByCode[t.bikeCode] : null;
              return (
                <Row
                  key={t.bikeCode}
                  label={bike ? `${bike.brand} ${bike.model} ${bike.year} (${bike.code})` : t.bikeCode ?? ""}
                  value={t._count}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, tone }: { label: string; value: number; tone?: "success" | "warning" | "danger" }) {
  const color = tone === "success" ? "text-emerald-400" : tone === "warning" ? "text-amber-400" : tone === "danger" ? "text-red-400" : "text-paper";
  return (
    <div className="rounded-xl2 border border-ink-700 bg-ink-850 p-5">
      <div className={`text-3xl font-black ${color}`}>{value}</div>
      <div className="mt-1 text-sm text-paper-muted">{label}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between border-b border-ink-800 pb-2.5 text-sm last:border-0 last:pb-0">
      <span className="text-paper-muted">{label}</span>
      <span className="font-black">{value}</span>
    </div>
  );
}
