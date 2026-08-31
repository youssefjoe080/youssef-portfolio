"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Motorcycle } from "@prisma/client";
import { Button } from "@/components/ui/Button";
import {
  BIKE_STATUS_LABELS,
  CATEGORY_LABELS,
  CONDITION_LABELS,
  LICENSE_LABELS,
} from "@/lib/labels";

type Props = {
  mode: "create" | "edit";
  bike?: Motorcycle;
};

type FormState = {
  brand: string;
  model: string;
  year: string;
  category: string;
  price: string;
  mileage: string;
  engineCC: string;
  condition: string;
  licenseStatus: string;
  licenseExpiry: string;
  registrationOffice: string;
  location: string;
  engineCondition: string;
  paintCondition: string;
  maintenanceCondition: string;
  modifications: string;
  description: string;
  inspectionNotes: string;
  ownerName: string;
  ownerPhone: string;
  status: string;
  seoTitle: string;
  seoDescription: string;
};

function toFormState(bike?: Motorcycle): FormState {
  return {
    brand: bike?.brand ?? "",
    model: bike?.model ?? "",
    year: bike ? String(bike.year) : String(new Date().getFullYear()),
    category: bike?.category ?? "NAKED",
    price: bike ? String(bike.price) : "",
    mileage: bike ? String(bike.mileage) : "",
    engineCC: bike?.engineCC ? String(bike.engineCC) : "",
    condition: bike?.condition ?? "GOOD",
    licenseStatus: bike?.licenseStatus ?? "LICENSED",
    licenseExpiry: bike?.licenseExpiry ? new Date(bike.licenseExpiry).toISOString().slice(0, 10) : "",
    registrationOffice: bike?.registrationOffice ?? "",
    location: bike?.location ?? "",
    engineCondition: bike?.engineCondition ?? "",
    paintCondition: bike?.paintCondition ?? "",
    maintenanceCondition: bike?.maintenanceCondition ?? "",
    modifications: bike?.modifications ?? "",
    description: bike?.description ?? "",
    inspectionNotes: bike?.inspectionNotes ?? "",
    ownerName: bike?.ownerName ?? "",
    ownerPhone: bike?.ownerPhone ?? "",
    status: bike?.status ?? "AVAILABLE",
    seoTitle: bike?.seoTitle ?? "",
    seoDescription: bike?.seoDescription ?? "",
  };
}

export function BikeForm({ mode, bike }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(toFormState(bike));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      year: Number(form.year),
      price: Number(form.price),
      mileage: Number(form.mileage),
      engineCC: form.engineCC ? Number(form.engineCC) : null,
      licenseExpiry: form.licenseExpiry || null,
    };

    try {
      const res = await fetch(mode === "create" ? "/api/bikes" : `/api/bikes/${bike!.id}`, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "حصل خطأ، تأكد من البيانات");
        setSaving(false);
        return;
      }
      if (mode === "create") {
        router.push(`/admin/bikes/${data.bike.id}/edit?created=1`);
      } else {
        router.push("/admin/bikes");
      }
      router.refresh();
    } catch {
      setError("حصل خطأ في الاتصال");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Section title="المعلومات الأساسية">
        <Grid>
          <Field label="الماركة"><input value={form.brand} onChange={(e) => set("brand", e.target.value)} className={inputClass} required /></Field>
          <Field label="الموديل"><input value={form.model} onChange={(e) => set("model", e.target.value)} className={inputClass} required /></Field>
          <Field label="سنة الصنع"><input type="number" value={form.year} onChange={(e) => set("year", e.target.value)} className={inputClass} required /></Field>
          <Field label="الفئة">
            <select value={form.category} onChange={(e) => set("category", e.target.value)} className={inputClass}>
              {Object.entries(CATEGORY_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </Field>
          <Field label="السعر (جنيه)"><input type="number" value={form.price} onChange={(e) => set("price", e.target.value)} className={inputClass} required /></Field>
          <Field label="العداد (كم)"><input type="number" value={form.mileage} onChange={(e) => set("mileage", e.target.value)} className={inputClass} required /></Field>
          <Field label="سعة الموتور (سي سي)"><input type="number" value={form.engineCC} onChange={(e) => set("engineCC", e.target.value)} className={inputClass} /></Field>
          <Field label="الموقع"><input value={form.location} onChange={(e) => set("location", e.target.value)} className={inputClass} required /></Field>
        </Grid>
      </Section>

      <Section title="الحالة والترخيص">
        <Grid>
          <Field label="الحالة العامة">
            <select value={form.condition} onChange={(e) => set("condition", e.target.value)} className={inputClass}>
              {Object.entries(CONDITION_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </Field>
          <Field label="حالة الترخيص">
            <select value={form.licenseStatus} onChange={(e) => set("licenseStatus", e.target.value)} className={inputClass}>
              {Object.entries(LICENSE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </Field>
          <Field label="تاريخ نهاية الترخيص"><input type="date" value={form.licenseExpiry} onChange={(e) => set("licenseExpiry", e.target.value)} className={inputClass} /></Field>
          <Field label="جهة التسجيل / المرور"><input value={form.registrationOffice} onChange={(e) => set("registrationOffice", e.target.value)} className={inputClass} /></Field>
        </Grid>
      </Section>

      <Section title="تفاصيل الحالة الفنية">
        <Grid>
          <Field label="حالة الموتور"><input value={form.engineCondition} onChange={(e) => set("engineCondition", e.target.value)} className={inputClass} required /></Field>
          <Field label="حالة الدهان"><input value={form.paintCondition} onChange={(e) => set("paintCondition", e.target.value)} className={inputClass} required /></Field>
          <Field label="حالة الصيانة"><input value={form.maintenanceCondition} onChange={(e) => set("maintenanceCondition", e.target.value)} className={inputClass} required /></Field>
          <Field label="تعديلات (لو فيه)"><input value={form.modifications} onChange={(e) => set("modifications", e.target.value)} className={inputClass} /></Field>
        </Grid>
      </Section>

      <Section title="الوصف">
        <Field label="وصف البايك (هيظهر للعميل)">
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={5} className={inputClass} required />
        </Field>
        <Field label="ملاحظات الفحص (هتظهر للعميل)" className="mt-4">
          <textarea value={form.inspectionNotes} onChange={(e) => set("inspectionNotes", e.target.value)} rows={3} className={inputClass} />
        </Field>
      </Section>

      <Section title="بيانات المالك — خاص ومش هيظهر للعملاء أبدًا">
        <Grid>
          <Field label="اسم المالك"><input value={form.ownerName} onChange={(e) => set("ownerName", e.target.value)} className={inputClass} /></Field>
          <Field label="رقم تليفون المالك"><input value={form.ownerPhone} onChange={(e) => set("ownerPhone", e.target.value)} className={inputClass} dir="ltr" /></Field>
        </Grid>
      </Section>

      <Section title="الحالة والتوفر">
        <Field label="حالة الإعلان">
          <select value={form.status} onChange={(e) => set("status", e.target.value)} className={inputClass}>
            {Object.entries(BIKE_STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </Field>
      </Section>

      <details className="rounded-xl2 border border-ink-700 bg-ink-850 p-5">
        <summary className="cursor-pointer text-sm font-bold text-paper-muted">SEO (اختياري)</summary>
        <div className="mt-4 flex flex-col gap-4">
          <Field label="عنوان SEO مخصص"><input value={form.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} className={inputClass} /></Field>
          <Field label="وصف SEO مخصص"><textarea value={form.seoDescription} onChange={(e) => set("seoDescription", e.target.value)} rows={2} className={inputClass} /></Field>
        </div>
      </details>

      {error && <p className="text-sm font-bold text-red-400">{error}</p>}

      <div className="sticky bottom-4 flex justify-end">
        <Button type="submit" size="lg" disabled={saving} className="shadow-card">
          {saving ? "بيتحفظ..." : mode === "create" ? "حفظ ومتابعة لإضافة الصور" : "حفظ التعديلات"}
        </Button>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl2 border border-ink-700 bg-ink-850 p-5">
      <h3 className="mb-4 font-extrabold">{title}</h3>
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{children}</div>;
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 text-xs font-bold text-paper-muted ${className ?? ""}`}>
      {label}
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-ink-600 bg-ink-900 px-3.5 py-2.5 text-sm text-paper placeholder:text-paper-muted focus:border-accent focus:outline-none";
