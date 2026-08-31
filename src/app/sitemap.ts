import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const [bikes, articles] = await Promise.all([
    prisma.motorcycle
      .findMany({ where: { status: { in: ["AVAILABLE", "RESERVED"] } }, select: { slug: true, updatedAt: true } })
      .catch(() => []),
    prisma.article.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }).catch(() => []),
  ]);

  return [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/bikes`, changeFrequency: "hourly", priority: 0.9 },
    { url: `${siteUrl}/matcher`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/guide`, changeFrequency: "weekly", priority: 0.6 },
    ...bikes.map((b) => ({
      url: `${siteUrl}/bikes/${b.slug}`,
      lastModified: b.updatedAt,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...articles.map((a) => ({
      url: `${siteUrl}/guide/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
