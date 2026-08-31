import type { AppointmentStatus, BikeCondition, BikeStatus, Category, LicenseStatus } from "@prisma/client";

export const CATEGORY_LABELS: Record<Category, string> = {
  NAKED: "نيكد",
  SPORT: "سبورت",
  ADVENTURE: "أدفنشر",
  CRUISER: "كروزر",
  OTHER: "أخرى",
};

export const CATEGORY_ICONS: Record<Category, string> = {
  NAKED: "🏍️",
  SPORT: "🏁",
  ADVENTURE: "🌄",
  CRUISER: "🔥",
  OTHER: "⚙️",
};

export const CONDITION_LABELS: Record<BikeCondition, string> = {
  EXCELLENT: "ممتاز",
  VERY_GOOD: "جيد جدًا",
  GOOD: "جيد",
  FAIR: "مقبول",
};

export const LICENSE_LABELS: Record<LicenseStatus, string> = {
  LICENSED: "مرخص وساري",
  EXPIRED: "الرخصة منتهية",
  NOT_LICENSED: "مش مرخص",
  IN_PROGRESS: "جاري الترخيص",
};

export const BIKE_STATUS_LABELS: Record<BikeStatus, string> = {
  AVAILABLE: "متاح",
  RESERVED: "محجوز",
  SOLD: "اتباع",
  HIDDEN: "مخفي",
};

export const BIKE_STATUS_DOTS: Record<BikeStatus, string> = {
  AVAILABLE: "🟢",
  RESERVED: "🟡",
  SOLD: "🔴",
  HIDDEN: "⚪",
};

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> = {
  NEW: "جديد",
  CONTACTED: "تم التواصل",
  INSPECTED: "تمت المعاينة",
  CANCELLED: "ملغي",
  SOLD: "تم البيع",
};

export const APPOINTMENT_STATUS_DOTS: Record<AppointmentStatus, string> = {
  NEW: "🟡",
  CONTACTED: "🔵",
  INSPECTED: "🟢",
  CANCELLED: "🔴",
  SOLD: "✅",
};
