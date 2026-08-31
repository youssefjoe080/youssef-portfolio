import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink-800">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[110px]" />
        <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-accent/5 blur-[110px]" />
      </div>

      <div className="container-app grid items-center gap-10 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-24">
        <div className="animate-fadeUp">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-sm font-bold text-accent-soft">
            🏍️ وسيط موتوسيكلات في مصر
          </span>
          <h1 className="text-balance text-4xl font-black leading-[1.15] md:text-6xl">
            هركبك الأنسب، <span className="text-accent">مش الأحسن.</span>
          </h1>
          <p className="mt-5 max-w-xl text-balance text-base leading-8 text-paper-muted md:text-lg">
            اختار موتوسيكل يناسب ميزانيتك، خبرتك وطريقة استخدامك.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/bikes"
              className="inline-flex items-center justify-center rounded-xl2 bg-gradient-to-l from-accent to-accent-soft px-7 py-4 text-base font-black text-ink-950 shadow-glow transition hover:brightness-110"
            >
              شوف الموتوسيكلات
            </Link>
            <Link
              href="/matcher"
              className="inline-flex items-center justify-center rounded-xl2 border border-ink-600 bg-ink-800/60 px-7 py-4 text-base font-black text-paper transition hover:bg-ink-700"
            >
              اختارلي بايك
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-paper-muted">
            <div><span className="text-xl font-black text-paper">+35</span> موتوسيكل تم التعامل معاه</div>
            <div><span className="text-xl font-black text-paper">4</span> فئات مختلفة</div>
            <div><span className="text-xl font-black text-paper">معاينة</span> قبل أي قرار شراء</div>
          </div>
        </div>

        <div className="relative animate-fadeUp [animation-delay:150ms]">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl3 border border-ink-700 shadow-card">
            <Image
              src="/images/about/youssef-1.jpg"
              alt="يوسف جو"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/90 to-transparent p-5">
              <p className="font-bold">يوسف جو</p>
              <p className="text-sm text-paper-muted">بساعدك تختار صح، من الألف للياء</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
