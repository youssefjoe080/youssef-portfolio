import { formatArabicDate, formatArabicTime } from "@/lib/format";

export function getWhatsAppNumber(): string {
  return process.env.WHATSAPP_NUMBER || "201065173490";
}

export function buildWhatsAppLink(message: string, number = getWhatsAppNumber()): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildAppointmentMessage(input: {
  bikeCode: string;
  bikeName: string;
  customerName: string;
  customerPhone: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}): string {
  const lines = [
    `السلام عليكم، عايز احجز معاينة للبايك كود ${input.bikeCode}`,
    "",
    `البايك: ${input.bikeName}`,
    `الاسم: ${input.customerName}`,
    `رقم العميل: ${input.customerPhone}`,
    `اليوم: ${formatArabicDate(input.preferredDate)}`,
    `الساعة: ${formatArabicTime(input.preferredTime)}`,
  ];
  if (input.notes?.trim()) {
    lines.push("", "ملاحظات:", input.notes.trim());
  }
  return lines.join("\n");
}

export function buildInquiryMessage(bikeCode: string, bikeName: string): string {
  return `السلام عليكم، عايز أسأل عن البايك كود ${bikeCode} (${bikeName})`;
}

export function buildGeneralInquiryMessage(): string {
  return "السلام عليكم يوسف، عايز أسألك عن حاجة بخصوص شراء موتوسيكل.";
}
