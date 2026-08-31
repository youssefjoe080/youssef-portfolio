import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MatcherForm } from "@/components/matcher/MatcherForm";

export const metadata: Metadata = {
  title: "اختارلي بايك",
  description: "جاوب على كام سؤال بسيط وهنرشحلك أنسب موتوسيكلات متاحة حسب ميزانيتك وخبرتك واستخدامك.",
};

export default function MatcherPage() {
  return (
    <div className="container-app py-10 md:py-14">
      <SectionHeading
        eyebrow="اختارلي بايك"
        title="خليني أرشحلك موتوسيكل يناسبك"
        subtitle="جاوب على 8 أسئلة بسيطة، وهنرشحلك أفضل 3 موتوسيكلات متاحة دلوقتي بناءً على إجاباتك."
      />
      <MatcherForm />
    </div>
  );
}
