"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ChangePasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data?.error ?? "حصل خطأ");
        setStatus("error");
        return;
      }
      setCurrent("");
      setNext("");
      setMessage("تم تغيير كلمة السر بنجاح");
      setStatus("done");
    } catch {
      setMessage("حصل خطأ في الاتصال");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="flex flex-col gap-1.5 text-xs font-bold text-paper-muted">
        كلمة السر الحالية
        <input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} className={inputClass} required />
      </label>
      <label className="flex flex-col gap-1.5 text-xs font-bold text-paper-muted">
        كلمة السر الجديدة
        <input type="password" value={next} onChange={(e) => setNext(e.target.value)} minLength={8} className={inputClass} required />
      </label>

      {message && (
        <p className={`sm:col-span-2 text-sm font-bold ${status === "done" ? "text-emerald-400" : "text-red-400"}`}>{message}</p>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "بيتغير..." : "غيّر كلمة السر"}
        </Button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-ink-600 bg-ink-900 px-3.5 py-2.5 text-sm text-paper focus:border-accent focus:outline-none";
