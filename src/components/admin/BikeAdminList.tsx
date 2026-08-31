"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { BikeImage, BikeStatus, Motorcycle } from "@prisma/client";
import { BIKE_STATUS_DOTS, BIKE_STATUS_LABELS } from "@/lib/labels";
import { formatEGP } from "@/lib/format";
import { cn } from "@/lib/utils";

type AdminBike = Motorcycle & { images: BikeImage[] };

const TABS: { value: BikeStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "الكل" },
  { value: "AVAILABLE", label: "🟢 متاح" },
  { value: "RESERVED", label: "🟡 محجوز" },
  { value: "SOLD", label: "🔴 اتباع" },
  { value: "HIDDEN", label: "⚪ مخفي" },
];

export function BikeAdminList({ initialBikes }: { initialBikes: AdminBike[] }) {
  const router = useRouter();
  const [bikes, setBikes] = useState(initialBikes);
  const [tab, setTab] = useState<BikeStatus | "ALL">("ALL");
  const [q, setQ] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return bikes.filter((b) => {
      if (tab !== "ALL" && b.status !== tab) return false;
      if (q.trim()) {
        const needle = q.trim().toLowerCase();
        const haystack = `${b.brand} ${b.model} ${b.code}`.toLowerCase();
        if (!haystack.includes(needle)) return false;
      }
      return true;
    });
  }, [bikes, tab, q]);

  async function changeStatus(id: string, status: BikeStatus) {
    setBusyId(id);
    const res = await fetch(`/api/bikes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setBikes((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    }
    setBusyId(null);
  }

  async function duplicate(id: string) {
    setBusyId(id);
    const res = await fetch(`/api/bikes/${id}/duplicate`, { method: "POST" });
    setBusyId(null);
    if (res.ok) {
      const data = await res.json();
      router.push(`/admin/bikes/${data.bike.id}/edit`);
    }
  }

  async function remove(id: string) {
    if (!confirm("متأكد إنك عايز تمسح البايك ده نهائيًا؟ الإجراء ده مينفعش يتراجع فيه.")) return;
    setBusyId(id);
    const res = await fetch(`/api/bikes/${id}`, { method: "DELETE" });
    if (res.ok) {
      setBikes((prev) => prev.filter((b) => b.id !== id));
    }
    setBusyId(null);
  }

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
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
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="دور بالماركة، الموديل، أو الكود"
          className="w-full rounded-lg border border-ink-600 bg-ink-900 px-3.5 py-2.5 text-sm sm:w-64"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl3 border border-dashed border-ink-600 bg-ink-850 p-10 text-center text-paper-muted">
          مفيش بايكات مطابقة
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((bike) => {
            const cover = bike.images.find((i) => i.isCover) ?? bike.images[0];
            return (
              <div key={bike.id} className="flex flex-col gap-3 rounded-xl2 border border-ink-700 bg-ink-850 p-3 sm:flex-row sm:items-center">
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-ink-800">
                  {cover ? (
                    <Image src={cover.url} alt="" fill sizes="112px" className="object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xl">🏍️</div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold">{bike.brand} {bike.model}</span>
                    <span className="text-xs text-paper-muted">{bike.year}</span>
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-paper-muted">
                    <span className="font-mono">{bike.code}</span>
                    <span>{formatEGP(bike.price)}</span>
                    <span>{bike.images.length} صورة</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={bike.status}
                    disabled={busyId === bike.id}
                    onChange={(e) => changeStatus(bike.id, e.target.value as BikeStatus)}
                    className="rounded-lg border border-ink-600 bg-ink-900 px-2.5 py-2 text-xs font-bold"
                  >
                    {Object.entries(BIKE_STATUS_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {BIKE_STATUS_DOTS[value as BikeStatus]} {label}
                      </option>
                    ))}
                  </select>
                  <Link href={`/admin/bikes/${bike.id}/edit`} className="rounded-lg bg-ink-800 px-3 py-2 text-xs font-bold hover:bg-ink-700">
                    تعديل
                  </Link>
                  <button
                    onClick={() => duplicate(bike.id)}
                    disabled={busyId === bike.id}
                    className="rounded-lg bg-ink-800 px-3 py-2 text-xs font-bold hover:bg-ink-700"
                  >
                    نسخ
                  </button>
                  <button
                    onClick={() => remove(bike.id)}
                    disabled={busyId === bike.id}
                    className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-500/20"
                  >
                    حذف
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
