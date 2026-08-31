"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Appointment, AppointmentStatus } from "@prisma/client";
import { APPOINTMENT_STATUS_DOTS, APPOINTMENT_STATUS_LABELS } from "@/lib/labels";
import { formatArabicDate, formatArabicTime } from "@/lib/format";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type AdminAppointment = Appointment & { bike: { slug: string; status: string } | null };

type Tab = "ALL" | "TODAY" | "UPCOMING" | "INSPECTED" | "SOLD" | "CANCELLED";

const TABS: { value: Tab; label: string }[] = [
  { value: "ALL", label: "الكل" },
  { value: "TODAY", label: "اليوم" },
  { value: "UPCOMING", label: "القادمة" },
  { value: "INSPECTED", label: "🟢 تمت المعاينة" },
  { value: "SOLD", label: "✅ تم البيع" },
  { value: "CANCELLED", label: "🔴 ملغي" },
];

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function AppointmentAdminList({ initialAppointments }: { initialAppointments: AdminAppointment[] }) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [tab, setTab] = useState<Tab>("ALL");
  const [busyId, setBusyId] = useState<string | null>(null);
  const today = todayIso();

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      if (tab === "TODAY") return a.preferredDate === today;
      if (tab === "UPCOMING") return a.preferredDate > today && a.status !== "CANCELLED" && a.status !== "SOLD";
      if (tab === "INSPECTED") return a.status === "INSPECTED";
      if (tab === "SOLD") return a.status === "SOLD";
      if (tab === "CANCELLED") return a.status === "CANCELLED";
      return true;
    });
  }, [appointments, tab, today]);

  async function changeStatus(id: string, status: AppointmentStatus) {
    setBusyId(id);
    const res = await fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    setBusyId(null);
  }

  async function remove(id: string) {
    if (!confirm("تمسح طلب المعاينة ده؟")) return;
    setBusyId(id);
    const res = await fetch(`/api/appointments/${id}`, { method: "DELETE" });
    if (res.ok) setAppointments((prev) => prev.filter((a) => a.id !== id));
    setBusyId(null);
  }

  return (
    <div>
      <div className="no-scrollbar mb-5 flex gap-1.5 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={cn(
              "whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-bold transition",
              tab === t.value ? "bg-accent text-ink-950" : "bg-ink-800 text-paper-muted hover:text-paper"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl3 border border-dashed border-ink-600 bg-ink-850 p-10 text-center text-paper-muted">
          مفيش حجوزات هنا دلوقتي
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((a) => (
            <div key={a.id} className="rounded-xl2 border border-ink-700 bg-ink-850 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold">{a.customerName}</span>
                    <a href={`tel:${a.customerPhone}`} dir="ltr" className="text-sm text-paper-muted hover:text-paper">
                      {a.customerPhone}
                    </a>
                  </div>
                  <div className="mt-1 text-sm text-paper-muted">
                    {a.bike ? (
                      <Link href={`/admin/bikes/${a.bikeId}/edit`} className="hover:text-accent-soft">
                        {a.bikeName} · {a.bikeCode}
                      </Link>
                    ) : (
                      <span>{a.bikeName} · {a.bikeCode}</span>
                    )}
                  </div>
                  <div className="mt-1 text-sm font-bold">
                    📅 {formatArabicDate(a.preferredDate)} — {formatArabicTime(a.preferredTime)}
                  </div>
                  {a.notes && <p className="mt-2 rounded-lg bg-ink-900 p-2.5 text-xs text-paper-muted">{a.notes}</p>}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <select
                    value={a.status}
                    disabled={busyId === a.id}
                    onChange={(e) => changeStatus(a.id, e.target.value as AppointmentStatus)}
                    className="rounded-lg border border-ink-600 bg-ink-900 px-2.5 py-2 text-xs font-bold"
                  >
                    {Object.entries(APPOINTMENT_STATUS_LABELS).map(([v, l]) => (
                      <option key={v} value={v}>
                        {APPOINTMENT_STATUS_DOTS[v as AppointmentStatus]} {l}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <a
                      href={buildWhatsAppLink(`السلام عليكم ${a.customerName}، بخصوص حجز معاينة البايك كود ${a.bikeCode}`, `20${a.customerPhone.replace(/^0/, "")}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-[#25D366]/15 px-2.5 py-1.5 text-[11px] font-bold text-emerald-400 hover:bg-[#25D366]/25"
                    >
                      واتساب
                    </a>
                    <button
                      onClick={() => remove(a.id)}
                      disabled={busyId === a.id}
                      className="rounded-lg bg-red-500/10 px-2.5 py-1.5 text-[11px] font-bold text-red-400 hover:bg-red-500/20"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
