import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "دليل الموتوسيكلات",
  description: "مقالات ونصايح تساعدك تفهم أكتر قبل ما تشتري موتوسيكل — فحص، مقارنات، وأخطاء المبتدئين.",
};

export const revalidate = 300;

export default async function GuidePage() {
  const articles = await prisma.article
    .findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    })
    .catch(() => []);

  return (
    <div className="container-app py-10 md:py-14">
      <SectionHeading eyebrow="دليل الموتوسيكلات" title="اتعلم قبل ما تشتري" subtitle="مقالات وفيديوهات بتساعدك تاخد قرار صح." />

      {articles.length === 0 ? (
        <div className="rounded-xl3 border border-dashed border-ink-600 bg-ink-850 p-12 text-center">
          <p className="text-3xl">📘</p>
          <p className="mt-3 font-bold">المقالات جاية قريب</p>
          <p className="mt-1 text-sm text-paper-muted">تابعني على TikTok لحد ما تتنشر هنا.</p>
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
    </div>
  );
}
