import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Article } from "@prisma/client";

export function GuidePreview({ articles }: { articles: Article[] }) {
  return (
    <section className="container-app py-16 md:py-20">
      <SectionHeading eyebrow="دليل الموتوسيكلات" title="اتعلم قبل ما تشتري" subtitle="مقالات وفيديوهات بتساعدك تاخد قرار صح." />

      {articles.length === 0 ? (
        <div className="rounded-xl3 border border-dashed border-ink-600 bg-ink-850 p-10 text-center text-paper-muted">
          المقالات جاية قريب — تابعني على TikTok لحد ما تتنشر هنا.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-3">
          {articles.map((a) => (
            <Link
              key={a.id}
              href={`/guide/${a.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl3 border border-ink-700 bg-ink-850 shadow-card transition hover:-translate-y-1 hover:border-accent/30"
            >
              <div className="relative aspect-[16/10] w-full bg-ink-800">
                {a.coverImage ? (
                  <Image src={a.coverImage} alt={a.title} fill className="object-cover transition group-hover:scale-105" />
                ) : (
                  <div className="flex h-full items-center justify-center text-3xl">📘</div>
                )}
              </div>
              <div className="p-5">
                <h3 className="mb-1.5 font-extrabold leading-snug">{a.title}</h3>
                <p className="line-clamp-2 text-sm text-paper-muted">{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <Link href="/guide" className="text-sm font-bold text-accent-soft hover:underline">
          كل المقالات ←
        </Link>
      </div>
    </section>
  );
}
