"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildGeneralInquiryMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { track } from "@/lib/track";

const TIKTOK_USERNAME = process.env.NEXT_PUBLIC_TIKTOK_USERNAME || "YoussefJoe.rr";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-ink-700/60 bg-ink-950">
      <div className="container-app grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div dir="ltr" className="text-2xl font-black">
            Youssef <span className="text-accent">Joe</span>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-7 text-paper-muted">
            وسيط موتوسيكلات في مصر. بساعدك تلاقي الموتوسيكل الأنسب ليك — مش بس الأغلى أو الأسرع.
          </p>
          <a
            href={`https://www.tiktok.com/@${TIKTOK_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-paper hover:text-accent-soft"
          >
            🎵 تابعني على TikTok — @{TIKTOK_USERNAME}
          </a>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold text-paper-muted">روابط سريعة</h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link href="/bikes" className="hover:text-accent-soft">كل الموتوسيكلات</Link></li>
            <li><Link href="/matcher" className="hover:text-accent-soft">اختارلي بايك</Link></li>
            <li><Link href="/guide" className="hover:text-accent-soft">دليل الموتوسيكلات</Link></li>
            <li><Link href="/#trust" className="hover:text-accent-soft">إزاي بشتغل</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold text-paper-muted">تواصل معايا</h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a
                onClick={() => track("contact_click", { meta: { from: "footer" } })}
                href={buildWhatsAppLink(buildGeneralInquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-soft"
              >
                واتساب: 01065173490
              </a>
            </li>
            <li className="text-paper-muted">مصر — القاهرة الكبرى</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-800 py-5 text-center text-xs text-paper-muted">
        © {new Date().getFullYear()} Youssef Joe — هركبك الأنسب، مش الأحسن.
      </div>
    </footer>
  );
}
