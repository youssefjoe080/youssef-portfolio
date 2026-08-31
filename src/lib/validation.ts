import { z } from "zod";

export const categoryEnum = z.enum(["NAKED", "SPORT", "ADVENTURE", "CRUISER", "OTHER"]);
export const conditionEnum = z.enum(["EXCELLENT", "VERY_GOOD", "GOOD", "FAIR"]);
export const licenseStatusEnum = z.enum(["LICENSED", "EXPIRED", "NOT_LICENSED", "IN_PROGRESS"]);
export const bikeStatusEnum = z.enum(["AVAILABLE", "RESERVED", "SOLD", "HIDDEN"]);
export const appointmentStatusEnum = z.enum(["NEW", "CONTACTED", "INSPECTED", "CANCELLED", "SOLD"]);

export const bikeInputSchema = z.object({
  brand: z.string().trim().min(1, "لازم تكتب الماركة"),
  model: z.string().trim().min(1, "لازم تكتب الموديل"),
  year: z.coerce.number().int().min(1980).max(new Date().getFullYear() + 1),
  category: categoryEnum,
  price: z.coerce.number().int().min(0, "السعر لازم يكون رقم موجب"),
  mileage: z.coerce.number().int().min(0),
  engineCC: z.coerce.number().int().min(0).optional().nullable(),
  condition: conditionEnum,
  licenseStatus: licenseStatusEnum,
  licenseExpiry: z.string().trim().optional().nullable(),
  registrationOffice: z.string().trim().optional().nullable(),
  location: z.string().trim().min(1, "لازم تكتب الموقع"),
  engineCondition: z.string().trim().min(1),
  paintCondition: z.string().trim().min(1),
  maintenanceCondition: z.string().trim().min(1),
  modifications: z.string().trim().optional().nullable(),
  description: z.string().trim().min(1, "لازم تكتب وصف للبايك"),
  inspectionNotes: z.string().trim().optional().nullable(),
  ownerName: z.string().trim().optional().nullable(),
  ownerPhone: z.string().trim().optional().nullable(),
  status: bikeStatusEnum.optional(),
  videoUrls: z.array(z.string().url()).optional(),
  seoTitle: z.string().trim().optional().nullable(),
  seoDescription: z.string().trim().optional().nullable(),
});

export type BikeInput = z.infer<typeof bikeInputSchema>;

export const appointmentInputSchema = z.object({
  bikeId: z.string().min(1),
  customerName: z.string().trim().min(2, "اكتب اسمك"),
  customerPhone: z
    .string()
    .trim()
    .regex(/^01[0125][0-9]{8}$/, "اكتب رقم واتساب مصري صحيح (01xxxxxxxxx)"),
  preferredDate: z.string().trim().min(1, "اختار يوم المعاينة"),
  preferredTime: z.string().trim().min(1, "اختار ميعاد المعاينة"),
  notes: z.string().trim().optional().nullable(),
});

export type AppointmentInput = z.infer<typeof appointmentInputSchema>;

export const matcherInputSchema = z.object({
  budgetMax: z.coerce.number().int().min(0),
  budgetMin: z.coerce.number().int().min(0).optional().default(0),
  experience: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  usage: z.enum(["DAILY", "CITY", "TOURING", "WEEKEND_FUN", "MIXED"]),
  preferredCategory: z.enum(["NAKED", "SPORT", "ADVENTURE", "CRUISER", "ANY"]),
  caresAboutPerformance: z.boolean(),
  caresAboutComfort: z.boolean(),
  caresAboutResale: z.boolean(),
  specificModel: z.string().trim().optional().nullable(),
});

export type MatcherInput = z.infer<typeof matcherInputSchema>;
