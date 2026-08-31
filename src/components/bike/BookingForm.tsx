"use client";

import { useState } from "react";
import { buildAppointmentMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { formatArabicDate, formatArabicTime } from "@/lib/format";
import { track } from "@/lib/track";
import { Button } from "@/components/ui/Button";

const TIME_SLOTS = ["11:00", "12:00", "13:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function BookingForm({
  bikeId,
  bikeCode,
  bikeName,
  disabled,
  disabledReason,
}: {
  bikeId: string;
  bikeCode: string;
  bikeName: string;
  disabled?: boolean;
  disabledReason?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const waMessage = buildAppointmentMessage({
    bikeCode,
    bikeName,
    customerName: name,
    customerPhone: phone,
    preferredDate: date,
    preferredTime: time,
    notes,
  });

  function validate() {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "اكتب اسمك";
    if (!/^01[0125][0-9]{8}$/.test(phone.trim())) next.phone = "اكتب رقم واتساب مصري صحيح (01xxxxxxxxx)";
    if (!date) next.date = "اختار يوم المعاينة";
    if (!time) next.time = "اختار ميعاد المعاينة";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bikeId, customerName: name, customerPhone: phone, preferredDate: date, preferredTime: time, notes }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data?.error ?? "حصل خطأ، حاول تاني");
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setErrorMsg("حصل خطأ في الاتصال، حاول تاني");
      setStatus("error");
    }
  }

  if (disabled) {
    return (
      <div className="rounded-xl3 border border-ink-700 bg-ink-850 p-6 text-center">
        <p className="font-bold">{disabledReason ?? "الحجز مش متاح للبايك ده دلوقتي"}</p>
        <p className="mt-1 text-sm text-paper-muted">كلم يوسف على واتساب لو حابب تتأكد أو تدور على بديل.</p>
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="rounded-xl3 border border-accent/25 bg-accent/5 p-6 text-center md:p-8">
        <p className="text-3xl">❤️</p>
        <p className="mt-3 text-lg font-black">تم تسجيل طلب المعاينة بنجاح ❤️</p>
        <p className="mt-2 text-sm leading-6 text-paper-muted">
          دلوقتي أكد الحجز على واتساب عشان يوصلني على طول ونتفق على التفاصيل.
        </p>
        <a
          href={buildWhatsAppLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { bikeId, bikeCode, meta: { from: "booking_confirm" } })}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 text-base font-black text-ink-950 transition hover:brightness-105"
        >
          ✅ تأكيد الحجز عبر واتساب
        </a>
        <p className="mt-3 text-xs text-paper-muted">
          {formatArabicDate(date)} — {formatArabicTime(time)}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl3 border border-ink-700 bg-ink-850 p-5 md:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="الاسم" error={errors.name}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="اسمك بالكامل" className={inputClass} />
        </Field>
        <Field label="رقم الواتساب" error={errors.phone}>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="01xxxxxxxxx"
            inputMode="numeric"
            dir="ltr"
            className={inputClass}
          />
        </Field>
        <Field label="اليوم المفضل للمعاينة" error={errors.date}>
          <input type="date" min={todayIso()} value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
        </Field>
        <Field label="الميعاد المفضل" error={errors.time}>
          <select value={time} onChange={(e) => setTime(e.target.value)} className={inputClass}>
            <option value="">اختار ميعاد</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {formatArabicTime(t)}
              </option>
            ))}
          </select>
        </Field>
        <Field label="ملاحظات (اختياري)" className="sm:col-span-2">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="أي حاجة حابب تقولها قبل المعاينة"
            className={inputClass}
          />
        </Field>
      </div>

      {errorMsg && <p className="mt-4 text-sm font-bold text-red-400">{errorMsg}</p>}

      <Button type="submit" size="lg" fullWidth className="mt-5" disabled={status === "loading"}>
        {status === "loading" ? "بيتسجل..." : "📅 احجز معاينة"}
      </Button>
      <p className="mt-3 text-center text-xs text-paper-muted">هنبعتلك تأكيد الحجز على واتساب فورًا بعد الإرسال.</p>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-ink-600 bg-ink-900 px-3.5 py-3 text-sm text-paper placeholder:text-paper-muted focus:border-accent focus:outline-none";

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 text-xs font-bold text-paper-muted ${className ?? ""}`}>
      {label}
      {children}
      {error && <span className="text-[11px] font-bold text-red-400">{error}</span>}
    </label>
  );
}
