import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";

const TIKTOK_USERNAME = process.env.NEXT_PUBLIC_TIKTOK_USERNAME || "YoussefJoe.rr";

export function TikTokSection() {
  return (
    <section className="container-app py-16 md:py-20">
      <div className="relative overflow-hidden rounded-xl3 border border-ink-700 bg-gradient-to-l from-ink-850 to-ink-800 p-8 text-center shadow-card md:p-14">
        <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/10 blur-[100px]" />
        <SectionHeading
          eyebrow="على تيك توك"
          title="تابعني على TikTok"
          subtitle="محتوى تعليمي عن الموتوسيكلات — فحص، مقارنات، ونصايح قبل الشراء."
          className="mb-8"
        />
        <LinkButton href={`https://www.tiktok.com/@${TIKTOK_USERNAME}`} target="_blank" size="lg">
          🎵 @{TIKTOK_USERNAME}
        </LinkButton>
      </div>
    </section>
  );
}
