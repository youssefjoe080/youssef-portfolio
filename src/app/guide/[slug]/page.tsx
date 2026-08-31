import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const revalidate = 300;

async function getArticle(slug: string) {
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article || !article.published) return null;
  return article;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "المقال مش موجود" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, images: article.coverImage ? [{ url: article.coverImage }] : undefined },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <article className="container-app max-w-3xl py-10 md:py-14">
      <h1 className="text-3xl font-black leading-tight md:text-4xl">{article.title}</h1>
      <p className="mt-3 text-paper-muted">{article.excerpt}</p>

      {article.coverImage && (
        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl3 border border-ink-700">
          <Image src={article.coverImage} alt={article.title} fill className="object-cover" />
        </div>
      )}

      <div className="mt-8 whitespace-pre-line text-[1.05rem] leading-8 text-paper-muted">{article.content}</div>
    </article>
  );
}
