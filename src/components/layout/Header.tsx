"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/bikes", label: "الموتوسيكلات" },
  { href: "/matcher", label: "اختارلي بايك" },
  { href: "/guide", label: "دليل الموتوسيكلات" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700/60 bg-ink-900/85 backdrop-blur-lg">
      <div className="container-app flex h-16 items-center justify-between md:h-20">
        <Link href="/" dir="ltr" className="flex items-center gap-2 text-xl font-black tracking-tight md:text-2xl">
          Youssef <span className="text-accent">Joe</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[0.95rem] font-semibold text-paper-muted transition hover:text-paper",
                pathname === link.href && "text-paper"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/bikes"
            className="inline-flex items-center rounded-xl bg-gradient-to-l from-accent to-accent-soft px-5 py-2.5 text-sm font-bold text-ink-950 shadow-glow transition hover:brightness-110"
          >
            شوف الموتوسيكلات
          </Link>
        </div>

        <button
          aria-label="فتح القائمة"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-600 text-paper md:hidden"
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-ink-700/60 bg-ink-900 px-5 pb-5 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-3 text-base font-semibold text-paper-muted",
                  pathname === link.href && "bg-ink-800 text-paper"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/bikes"
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-l from-accent to-accent-soft px-5 py-3 text-sm font-bold text-ink-950"
            >
              شوف الموتوسيكلات
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
