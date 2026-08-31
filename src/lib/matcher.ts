import type { Motorcycle } from "@prisma/client";
import type { MatcherInput } from "@/lib/validation";

const RESALE_FRIENDLY_BRANDS = ["honda", "yamaha", "bajaj", "tvs", "royal enfield", "kawasaki"];

export type MatchResult<T extends Motorcycle = Motorcycle> = {
  bike: T;
  score: number;
  reasons: string[];
};

/**
 * Scores AVAILABLE bikes against the customer's answers. This is a simple,
 * transparent heuristic — not a scientific/certain recommendation — hence
 * the UI always frames results as "ترشيح مبدئي" with visible reasons.
 */
export function matchBikes<T extends Motorcycle>(input: MatcherInput, bikes: T[]): MatchResult<T>[] {
  const budgetCeiling = input.budgetMax * 1.2;

  const scored = bikes
    .map((bike) => {
      const reasons: string[] = [];
      let score = 0;

      // --- Budget ---
      if (bike.price > budgetCeiling) return null; // too far out of reach, don't suggest
      if (bike.price <= input.budgetMax && bike.price >= input.budgetMin) {
        score += 30;
        reasons.push("داخل ميزانيتك");
      } else if (bike.price <= budgetCeiling) {
        score += 12;
        reasons.push("قريب من ميزانيتك شوية وممكن تتفاوض على السعر");
      }

      // --- Category preference ---
      if (input.preferredCategory !== "ANY") {
        if (bike.category === input.preferredCategory) {
          score += 15;
        } else {
          score -= 6;
        }
      }

      // --- Experience level (uses engine size + category as proxy) ---
      const cc = bike.engineCC ?? null;
      if (input.experience === "BEGINNER") {
        if (cc !== null && cc <= 400) {
          score += 20;
          reasons.push("مناسب لمستوى خبرتك كمبتدئ");
        } else if (cc !== null && cc <= 650 && (bike.category === "NAKED" || bike.category === "ADVENTURE")) {
          score += 8;
        } else if (cc !== null && cc > 650) {
          score -= 15;
        }
      } else if (input.experience === "INTERMEDIATE") {
        if (cc !== null && cc >= 300 && cc <= 700) {
          score += 18;
          reasons.push("مناسب لمستوى خبرتك");
        } else {
          score += 6;
        }
      } else {
        // ADVANCED
        score += 10;
        if (cc !== null && cc > 600) {
          score += 10;
          reasons.push("مناسب لمستوى خبرتك المتقدم");
        }
      }

      // --- Usage ---
      const usageCategoryFit: Record<string, string[]> = {
        DAILY: ["NAKED", "ADVENTURE"],
        CITY: ["NAKED"],
        TOURING: ["ADVENTURE", "CRUISER"],
        WEEKEND_FUN: ["SPORT", "NAKED"],
        MIXED: ["NAKED", "ADVENTURE"],
      };
      if (usageCategoryFit[input.usage]?.includes(bike.category)) {
        score += 14;
        reasons.push("مناسب لطريقة استخدامك");
      }

      // --- Performance ---
      if (input.caresAboutPerformance) {
        if (bike.category === "SPORT" || (cc !== null && cc >= 600)) {
          score += 12;
          reasons.push("مناسب لو كنت مهتم بالأداء");
        }
      }

      // --- Comfort ---
      if (input.caresAboutComfort) {
        if (bike.category === "ADVENTURE" || bike.category === "CRUISER") {
          score += 10;
          reasons.push("مناسب لو كنت مهتم بالراحة في القيادة");
        }
        if (bike.condition === "EXCELLENT" || bike.condition === "VERY_GOOD") {
          score += 4;
        }
      }

      // --- Resale ---
      if (input.caresAboutResale) {
        const brandLower = bike.brand.toLowerCase();
        const isPopularBrand = RESALE_FRIENDLY_BRANDS.some((b) => brandLower.includes(b));
        const currentYear = new Date().getFullYear();
        const isRecent = currentYear - bike.year <= 6;
        if (isPopularBrand && isRecent && bike.mileage < 40000) {
          score += 14;
          reasons.push("إعادة بيعه أسهل لأنه ماركة مطلوبة وحالته كويسة");
        } else if (isPopularBrand) {
          score += 6;
        }
      }

      // --- Specific model in mind ---
      if (input.specificModel?.trim()) {
        const needle = input.specificModel.trim().toLowerCase();
        const haystack = `${bike.brand} ${bike.model}`.toLowerCase();
        if (haystack.includes(needle) || needle.includes(bike.model.toLowerCase())) {
          score += 25;
          reasons.push("قريب من الموديل اللي في بالك");
        }
      }

      // --- General quality signals ---
      if (bike.licenseStatus === "LICENSED") {
        score += 5;
      }
      if (bike.condition === "EXCELLENT") {
        score += 4;
        reasons.push("حالة البايك ممتازة");
      }

      if (reasons.length === 0) reasons.push("قريب من اللي بتدور عليه بناءً على إجاباتك");

      return { bike, score, reasons: Array.from(new Set(reasons)) };
    })
    .filter((x): x is MatchResult<T> => x !== null)
    .sort((a, b) => b.score - a.score || a.bike.price - b.bike.price);

  return scored.slice(0, 3);
}
