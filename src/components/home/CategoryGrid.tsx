import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CATEGORY_ICONS, CATEGORY_LABELS } from "@/lib/labels";
import type { Category } from "@prisma/client";

const CATEGORIES: Category[] = ["NAKED", "SPORT", "ADVENTURE", "CRUISER"];

const DESCRIPTIONS: Record<Category, string> = {
  NAKED: "توازن بين الأداء والراحة، مناسب لأي مستوى",
  SPORT: "أداء وسرعة، للي بيدور على الإحساس الرياضي",
  ADVENTURE: "راحة وتحمل لمسافات طويلة وطرق مختلفة",
  CRUISER: "ستايل واستريح في القيادة على مهلك",
  OTHER: "",
};

export function CategoryGrid() {
  return (
    <section className="container-app py-16 md:py-20">
      <SectionHeading eyebrow="الفئات" title="دور على الفئة اللي تناسبك" />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/bikes?category=${cat}`}
            className="group flex flex-col items-center gap-3 rounded-xl3 border border-ink-700 bg-ink-850 p-6 text-center shadow-card transition hover:-translate-y-1 hover:border-accent/30 md:p-8"
          >
            <span className="text-4xl transition group-hover:scale-110 md:text-5xl">{CATEGORY_ICONS[cat]}</span>
            <span className="text-lg font-extrabold md:text-xl">{CATEGORY_LABELS[cat]}</span>
            <span className="text-xs leading-5 text-paper-muted md:text-sm">{DESCRIPTIONS[cat]}</span>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link href="/bikes" className="text-sm font-bold text-accent-soft hover:underline">
          كل الموتوسيكلات ←
        </Link>
      </div>
    </section>
  );
}
