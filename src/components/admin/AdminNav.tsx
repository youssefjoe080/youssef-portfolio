"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin/bikes", label: "🏍️ الموتوسيكلات" },
  { href: "/admin/appointments", label: "👥 العملاء / الحجوزات" },
  { href: "/admin/stats", label: "📊 الإحصائيات" },
  { href: "/admin/settings", label: "⚙️ الإعدادات" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return null;

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-ink-800 bg-ink-900/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/admin/bikes" className="flex items-center gap-2 text-lg font-black">
          <span dir="ltr">Youssef <span className="text-accent">Joe</span></span>
          <span className="text-sm font-normal text-paper-muted">/ لوحة التحكم</span>
        </Link>
        <button onClick={logout} className="rounded-lg border border-ink-600 px-3 py-2 text-xs font-bold text-paper-muted hover:bg-ink-800">
          خروج
        </button>
      </div>
      <nav className="no-scrollbar flex gap-1 overflow-x-auto border-t border-ink-800 px-4 md:px-8">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "whitespace-nowrap border-b-2 px-3 py-3 text-sm font-bold text-paper-muted transition",
              pathname?.startsWith(l.href) ? "border-accent text-paper" : "border-transparent hover:text-paper"
            )}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
