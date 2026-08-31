import { prisma } from "@/lib/prisma";
import { toPublicBike } from "@/lib/publicBike";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedBikes } from "@/components/home/FeaturedBikes";
import { TrustSection } from "@/components/home/TrustSection";
import { GuidePreview } from "@/components/home/GuidePreview";
import { TikTokSection } from "@/components/home/TikTokSection";

export const revalidate = 60;

function fetchFeaturedBikes() {
  return prisma.motorcycle.findMany({
    where: { status: "AVAILABLE" },
    include: { images: { orderBy: { order: "asc" } } },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

function fetchArticles() {
  return prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
}

export default async function HomePage() {
  let bikes: Awaited<ReturnType<typeof fetchFeaturedBikes>> = [];
  let articles: Awaited<ReturnType<typeof fetchArticles>> = [];
  try {
    [bikes, articles] = await Promise.all([fetchFeaturedBikes(), fetchArticles()]);
  } catch {
    // Database not reachable yet (e.g. first deploy before DB is connected) —
    // render the page with empty sections instead of crashing.
  }

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
