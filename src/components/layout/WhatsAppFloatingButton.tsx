"use client";

import { usePathname } from "next/navigation";
import { buildGeneralInquiryMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { track } from "@/lib/track";

export function WhatsAppFloatingButton() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <a
      href={buildWhatsAppLink(buildGeneralInquiryMessage())}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("contact_click", { meta: { from: "floating_button" } })}
      aria-label="اسأل يوسف على واتساب"
      className="fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition hover:scale-105 active:scale-95 md:h-16 md:w-16"
    >
      💬
    </a>
  );
}
