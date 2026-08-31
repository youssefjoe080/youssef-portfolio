"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { CATEGORY_ICONS, CATEGORY_LABELS, CONDITION_LABELS } from "@/lib/labels";
import { track } from "@/lib/track";
import type { Category } from "@prisma/client";

const CATEGORIES: Category[] = ["NAKED", "SPORT", "ADVENTURE", "CRUISER"];

export function BikeFilters({ brands, locations }: { brands: string[]; locations: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    track("filter_use", { meta: { key, value } });
  }

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) params.set("q", query);
      else params.delete("q");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      if (query) track("search", { meta: { q: query } });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const activeCount = [
    "category", "brand", "year", "minPrice", "maxPrice", "condition", "location", "availability",
  ].filter((k) => searchParams.get(k)).length;

  function clearAll() {
    setQuery("");
    router.push(pathname, { scroll: false });
  }

  return (
    <div className="sticky top-16 z-20 -mx-5 mb-6 border-b border-ink-800 bg-ink-900/95 px-5 py-4 backdrop-blur md:static md:mx-0 md:rounded-xl3 md:border md:border-ink-700 md:bg-ink-850 md:px-5 md:py-5">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="دور بالماركة، الموديل، أو كود البايك (YJ-001)"
            className="w-full rounded-xl border border-ink-600 bg-ink-900 px-4 py-3 text-sm text-paper placeholder:text-paper-muted focus:border-accent focus:outline-none"
          />
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="relative flex shrink-0 items-center gap-1.5 rounded-xl border border-ink-600 bg-ink-900 px-4 py-3 text-sm font-bold"
        >
          فلاتر
          {activeCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-black text-ink-950">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {open && (
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
          <Select
            label="الفئة"
            value={searchParams.get("category") ?? ""}
            onChange={(v) => updateParam("category", v)}
            options={[{ value: "", label: "كل الفئات" }, ...CATEGORIES.map((c) => ({ value: c, label: `${CATEGORY_ICONS[c]} ${CATEGORY_LABELS[c]}` }))]}
          />
          <Select
            label="الماركة"
            value={searchParams.get("brand") ?? ""}
            onChange={(v) => updateParam("brand", v)}
            options={[{ value: "", label: "كل الماركات" }, ...brands.map((b) => ({ value: b, label: b }))]}
          />
          <Select
            label="الموقع"
            value={searchParams.get("location") ?? ""}
            onChange={(v) => updateParam("location", v)}
            options={[{ value: "", label: "كل المناطق" }, ...locations.map((l) => ({ value: l, label: l }))]}
          />
          <Select
            label="الحالة"
            value={searchParams.get("condition") ?? ""}
            onChange={(v) => updateParam("condition", v)}
            options={[{ value: "", label: "أي حالة" }, ...Object.entries(CONDITION_LABELS).map(([value, label]) => ({ value, label }))]}
          />
          <NumberField label="أقل سعر" value={searchParams.get("minPrice") ?? ""} onChange={(v) => updateParam("minPrice", v)} />
          <NumberField label="أعلى سعر" value={searchParams.get("maxPrice") ?? ""} onChange={(v) => updateParam("maxPrice", v)} />
          <NumberField label="سنة الصنع" value={searchParams.get("year") ?? ""} onChange={(v) => updateParam("year", v)} />
          <NumberField label="أقصى عداد (كم)" value={searchParams.get("maxMileage") ?? ""} onChange={(v) => updateParam("maxMileage", v)} />
          <Select
            label="التوفر"
            value={searchParams.get("availability") ?? "AVAILABLE"}
            onChange={(v) => updateParam("availability", v)}
            options={[{ value: "AVAILABLE", label: "متاح بس" }, { value: "ALL", label: "متاح ومحجوز" }]}
          />

          <div className="col-span-2 flex items-end md:col-span-1">
            <button onClick={clearAll} className="w-full rounded-lg border border-ink-600 px-3 py-2.5 text-sm font-bold text-paper-muted hover:bg-ink-800">
              مسح الفلاتر
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-bold text-paper-muted">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-ink-600 bg-ink-900 px-2.5 py-2.5 text-sm text-paper focus:border-accent focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-bold text-paper-muted">
      {label}
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-ink-600 bg-ink-900 px-2.5 py-2.5 text-sm text-paper focus:border-accent focus:outline-none"
      />
    </label>
  );
}
