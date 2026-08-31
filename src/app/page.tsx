import { prisma } from "@/lib/prisma";
import { toPublicBike } from "@/lib/publicBike";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedBikes } from "@/components/home/FeaturedBikes";
import { TrustSection } from "@/components/home/TrustSection";
import { GuidePreview } from "@/components/home/GuidePreview";
import { TikTokSection } from "@/components/home/TikTokSection";

export const revalidate = 60;

export default async function HomePage() {
  const [bikes, articles] = await Promise.all([
    prisma.motorcycle.findMany({
      where: { status: "AVAILABLE" },
      include: { images: { orderBy: { order: "asc" } } },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);

  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedBikes bikes={bikes.map(toPublicBike)} />
      <TrustSection />
      <GuidePreview articles={articles} />
      <TikTokSection />
    </>
  );
}
