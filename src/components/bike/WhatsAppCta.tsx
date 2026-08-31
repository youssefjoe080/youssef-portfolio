"use client";

import { buildInquiryMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

export function WhatsAppCta({
  bikeId,
  bikeCode,
  bikeName,
  label,
  from,
  variant = "secondary",
}: {
  bikeId: string;
  bikeCode: string;
  bikeName: string;
  label: string;
  from: string;
  variant?: "secondary" | "whatsapp";
}) {
  return (
    <a
      href={buildWhatsAppLink(buildInquiryMessage(bikeCode, bikeName))}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { bikeId, bikeCode, meta: { from } })}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-3.5 text-sm font-black transition",
        variant === "whatsapp" ? "bg-[#25D366] text-ink-950 hover:brightness-105" : "border border-ink-600 bg-ink-800/60 text-paper hover:bg-ink-700"
      )}
    >
      {label}
    </a>
  );
}
