import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

const POINTS = [
  { icon: "🎯", title: "بساعدك تختار مش بس تشتري", text: "شغلي إني أفهم احتياجك الحقيقي، مش أبيعلك أغلى حاجة." },
  { icon: "📋", title: "معلومات واضحة عن كل بايك", text: "الحالة، الترخيص، الصيانة والتعديلات — كل حاجة موضحة قبل ما تقرر." },
  { icon: "🔍", title: "بساعد في ترتيب المعاينة", text: "بربطك بالبايك عشان تشوفه وتتأكد بنفسك قبل أي قرار." },
  { icon: "🤝", title: "شغلي وسيط، مش بائع بيدفعك", text: "هدفي إنك ترضى عن اختيارك بعد الشراء، مش بس تشتري بسرعة." },
];

export function TrustSection() {
  return (
    <section id="trust" className="border-y border-ink-800 bg-ink-950">
      <div className="container-app grid gap-12 py-16 md:grid-cols-[0.85fr_1.15fr] md:py-20">
        <div className="relative order-2 aspect-[4/5] w-full overflow-hidden rounded-xl3 border border-ink-700 shadow-card md:order-1">
          <Image
            src="/images/about/youssef-2.jpg"
            alt="يوسف جو"
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover"
          />
        </div>

        <div className="order-1 md:order-2">
          <SectionHeading
            align="start"
            eyebrow="ليه تتعامل معايا"
            title="أنا بساعدك تلاقي الموتوسيكل الأنسب ليك، مش مجرد الأغلى أو الأسرع"
            className="mx-0"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {POINTS.map((p) => (
              <div key={p.title} className="rounded-xl2 border border-ink-700 bg-ink-850 p-5">
                <div className="mb-3 text-2xl">{p.icon}</div>
                <h3 className="mb-1.5 font-extrabold">{p.title}</h3>
                <p className="text-sm leading-6 text-paper-muted">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
