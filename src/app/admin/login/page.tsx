"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "حصل خطأ");
        setLoading(false);
        return;
      }
      router.push("/admin/bikes");
      router.refresh();
    } catch {
      setError("حصل خطأ في الاتصال");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl3 border border-ink-700 bg-ink-850 p-7 shadow-card">
        <div className="mb-6 text-center">
          <div dir="ltr" className="text-2xl font-black">
            Youssef <span className="text-accent">Joe</span>
          </div>
          <p className="mt-1 text-sm text-paper-muted">تسجيل دخول لوحة التحكم</p>
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-xs font-bold text-paper-muted">
            اسم المستخدم
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="rounded-lg border border-ink-600 bg-ink-900 px-3.5 py-3 text-sm text-paper focus:border-accent focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-bold text-paper-muted">
            كلمة السر
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="rounded-lg border border-ink-600 bg-ink-900 px-3.5 py-3 text-sm text-paper focus:border-accent focus:outline-none"
            />
          </label>
        </div>

        {error && <p className="mt-4 text-sm font-bold text-red-400">{error}</p>}

        <Button type="submit" fullWidth size="lg" className="mt-6" disabled={loading}>
          {loading ? "جاري الدخول..." : "دخول"}
        </Button>
      </form>
    </div>
  );
}
