const DAY_NAMES = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const MONTH_NAMES = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

/** "2026-08-29" -> "السبت 29 أغسطس" */
export function formatArabicDate(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return `${DAY_NAMES[d.getDay()]} ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`;
}

/** "18:00" -> "6:00 مساءً" */
export function formatArabicTime(time: string): string {
  const [hStr, mStr = "00"] = time.split(":");
  const h = parseInt(hStr, 10);
  if (Number.isNaN(h)) return time;
  const period = h >= 12 ? "مساءً" : "صباحًا";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${mStr.padStart(2, "0")} ${period}`;
}

export function formatEGP(price: number): string {
  return `${new Intl.NumberFormat("ar-EG").format(price)} جنيه`;
}

export function formatKm(km: number): string {
  return `${new Intl.NumberFormat("ar-EG").format(km)} كم`;
}

export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat("ar-EG", { day: "numeric", month: "short", year: "numeric" }).format(date);
}
