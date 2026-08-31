"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORY_ICONS, CATEGORY_LABELS } from "@/lib/labels";
import { formatEGP } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { BikeImage, Motorcycle } from "@prisma/client";

type PublicBike = Omit<Motorcycle, "ownerName" | "ownerPhone"> & { images: BikeImage[] };
type MatchResult = { bike: PublicBike; score: number; reasons: string[] };

type Experience = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
type Usage = "DAILY" | "CITY" | "TOURING" | "WEEKEND_FUN" | "MIXED";
type PreferredCategory = "NAKED" | "SPORT" | "ADVENTURE" | "CRUISER" | "ANY";

type Answers = {
  budgetMax: string;
  experience: Experience | "";
  usage: Usage | "";
  preferredCategory: PreferredCategory | "";
  caresAboutPerformance: boolean | null;
  caresAboutComfort: boolean | null;
  caresAboutResale: boolean | null;
  specificModel: string;
};

const EXPERIENCE_OPTIONS: { value: Experience; label: string; hint: string }[] = [
  { value: "BEGINNER", label: "مبتدئ", hint: "أول بايك أو خبرة قليلة" },
  { value: "INTERMEDIATE", label: "متوسط", hint: "بقالي فترة بقود" },
  { value: "ADVANCED", label: "محترف", hint: "خبرة كبيرة في القيادة" },
];

const USAGE_OPTIONS: { value: Usage; label: string }[] = [
  { value: "DAILY", label: "استخدام يومي" },
  { value: "CITY", label: "مشاوير داخل المدينة" },
  { value: "TOURING", label: "رحلات وسفر" },
  { value: "WEEKEND_FUN", label: "نزهة في الويكند" },
  { value: "MIXED", label: "مختلط" },
];

const CATEGORY_OPTIONS: { value: PreferredCategory; label: string }[] = [
  { value: "ANY", label: "مش لازم نوع معين" },
  { value: "NAKED", label: `${CATEGORY_ICONS.NAKED} ${CATEGORY_LABELS.NAKED}` },
  { value: "SPORT", label: `${CATEGORY_ICONS.SPORT} ${CATEGORY_LABELS.SPORT}` },
  { value: "ADVENTURE", label: `${CATEGORY_ICONS.ADVENTURE} ${CATEGORY_LABELS.ADVENTURE}` },
  { value: "CRUISER", label: `${CATEGORY_ICONS.CRUISER} ${CATEGORY_LABELS.CRUISER}` },
];

const TOTAL_STEPS = 8;

export function MatcherForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    budgetMax: "",
    experience: "",
    usage: "",
    preferredCategory: "",
    caresAboutPerformance: null,
    caresAboutComfort: null,
    caresAboutResale: null,
    specificModel: "",
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<MatchResult[] | null>(null);
  const [error, setError] = useState("");

  const canProceed = [
    Number(answers.budgetMax) > 0,
    !!answers.experience,
    !!answers.usage,
    !!answers.preferredCategory,
    answers.caresAboutPerformance !== null,
    answers.caresAboutComfort !== null,
    answers.caresAboutResale !== null,
    true,
  ][step];

  async function submit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/matcher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budgetMax: Number(answers.budgetMax),
          experience: answers.experience,
          usage: answers.usage,
          preferredCategory: answers.preferredCategory,
          caresAboutPerformance: !!answers.caresAboutPerformance,
          caresAboutComfort: !!answers.caresAboutComfort,
          caresAboutResale: !!answers.caresAboutResale,
          specificModel: answers.specificModel || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "حصل خطأ، حاول تاني");
        return;
      }
      setResults(data.results);
    } catch {
      setError("حصل خطأ في الاتصال، حاول تاني");
    } finally {
      setLoading(false);
    }
  }

  function restart() {
    setResults(null);
    setStep(0);
  }

  if (results) {
    return (
      <div>
        <div className="mb-8 rounded-xl2 border border-accent/25 bg-accent/5 p-5 text-center">
          <p className="font-black">✨ ترشيح مبدئي بناءً على اختياراتك</p>
          <p className="mt-1 text-sm text-paper-muted">دي مش نتيجة علمية مؤكدة — لكنها بداية كويسة، والمعاينة هي اللي هتأكدلك.</p>
        </div>

        {results.length === 0 ? (
          <div className="rounded-xl3 border border-dashed border-ink-600 bg-ink-850 p-10 text-center">
            <p className="text-3xl">🤔</p>
            <p className="mt-3 font-bold">مفيش بايك متاح دلوقتي قريب من اختياراتك</p>
            <p className="mt-1 text-sm text-paper-muted">كلم يوسف على واتساب وهو هيدورلك بنفسه.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {results.map((r, i) => {
              const cover = r.bike.images.find((im) => im.isCover) ?? r.bike.images[0];
              return (
                <div key={r.bike.id} className="flex flex-col overflow-hidden rounded-xl3 border border-ink-700 bg-ink-850 shadow-card">
                  <div className="relative aspect-[4/3] w-full bg-ink-800">
                    {cover ? (
                      <Image src={cover.url} alt={`${r.bike.brand} ${r.bike.model}`} fill sizes="400px" className="object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-3xl">🏍️</div>
                    )}
                    <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-black text-ink-950">
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div>
                      <h3 className="font-extrabold">{r.bike.brand} {r.bike.model}</h3>
                      <p className="text-sm text-paper-muted">موديل {r.bike.year}</p>
                    </div>
                    <div className="text-xl font-black text-accent-soft">{formatEGP(r.bike.price)}</div>
                    <div>
                      <p className="mb-1.5 text-xs font-bold text-paper-muted">ليه رشحناهولك؟</p>
                      <ul className="flex flex-col gap-1">
                        {r.reasons.slice(0, 3).map((reason) => (
                          <li key={reason} className="flex items-start gap-1.5 text-xs leading-5 text-paper">
                            <span className="text-accent">✓</span> {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={`/bikes/${r.bike.slug}`}
                      className="mt-auto inline-flex items-center justify-center rounded-lg bg-ink-800 px-4 py-2.5 text-sm font-bold hover:bg-ink-700"
                    >
                      شوف التفاصيل
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8 text-center">
          <button onClick={restart} className="text-sm font-bold text-accent-soft hover:underline">
            ↻ جرب اختيارات تانية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6 flex gap-1.5">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className={cn("h-1.5 flex-1 rounded-full", i <= step ? "bg-accent" : "bg-ink-700")} />
        ))}
      </div>

      <div className="rounded-xl3 border border-ink-700 bg-ink-850 p-6 md:p-8">
        {step === 0 && (
          <Step title="1. إيه الميزانية المتاحة عندك؟">
            <input
              type="number"
              inputMode="numeric"
              value={answers.budgetMax}
              onChange={(e) => setAnswers((a) => ({ ...a, budgetMax: e.target.value }))}
              placeholder="مثلاً 120000"
              className={inputClass}
            />
            <p className="mt-2 text-xs text-paper-muted">اكتب أعلى سعر ممكن تدفعه بالجنيه المصري.</p>
          </Step>
        )}

        {step === 1 && (
          <Step title="2. إيه مستوى خبرتك في قيادة الموتوسيكلات؟">
            <div className="grid gap-2.5">
              {EXPERIENCE_OPTIONS.map((o) => (
                <OptionButton key={o.value} selected={answers.experience === o.value} onClick={() => setAnswers((a) => ({ ...a, experience: o.value }))}>
                  <div className="font-bold">{o.label}</div>
                  <div className="text-xs text-paper-muted">{o.hint}</div>
                </OptionButton>
              ))}
            </div>
          </Step>
        )}

        {step === 2 && (
          <Step title="3. هتستخدم البايك في إيه غالبًا؟">
            <div className="grid gap-2.5">
              {USAGE_OPTIONS.map((o) => (
                <OptionButton key={o.value} selected={answers.usage === o.value} onClick={() => setAnswers((a) => ({ ...a, usage: o.value }))}>
                  {o.label}
                </OptionButton>
              ))}
            </div>
          </Step>
        )}

        {step === 3 && (
          <Step title="4. إيه النوع اللي بتفضله؟">
            <div className="grid grid-cols-2 gap-2.5">
              {CATEGORY_OPTIONS.map((o) => (
                <OptionButton key={o.value} selected={answers.preferredCategory === o.value} onClick={() => setAnswers((a) => ({ ...a, preferredCategory: o.value }))}>
                  {o.label}
                </OptionButton>
              ))}
            </div>
          </Step>
        )}

        {step === 4 && (
          <Step title="5. مهتم بالأداء (السرعة والقوة)؟">
            <YesNo value={answers.caresAboutPerformance} onChange={(v) => setAnswers((a) => ({ ...a, caresAboutPerformance: v }))} />
          </Step>
        )}

        {step === 5 && (
          <Step title="6. مهتم بالراحة في القيادة؟">
            <YesNo value={answers.caresAboutComfort} onChange={(v) => setAnswers((a) => ({ ...a, caresAboutComfort: v }))} />
          </Step>
        )}

        {step === 6 && (
          <Step title="7. مهتم بسهولة إعادة البيع بعدين؟">
            <YesNo value={answers.caresAboutResale} onChange={(v) => setAnswers((a) => ({ ...a, caresAboutResale: v }))} />
          </Step>
        )}

        {step === 7 && (
          <Step title="8. في بالك موديل معين؟ (اختياري)">
            <input
              value={answers.specificModel}
              onChange={(e) => setAnswers((a) => ({ ...a, specificModel: e.target.value }))}
              placeholder="مثلاً Hornet أو MT-07"
              className={inputClass}
            />
          </Step>
        )}

        {error && <p className="mt-4 text-sm font-bold text-red-400">{error}</p>}

        <div className="mt-7 flex gap-3">
          {step > 0 && (
            <Button variant="secondary" onClick={() => setStep((s) => s - 1)}>
              السابق
            </Button>
          )}
          {step < TOTAL_STEPS - 1 ? (
            <Button fullWidth disabled={!canProceed} onClick={() => setStep((s) => s + 1)}>
              التالي
            </Button>
          ) : (
            <Button fullWidth disabled={loading} onClick={submit}>
              {loading ? "بنرشحلك..." : "✨ شوف الترشيحات"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-5 text-lg font-extrabold leading-snug md:text-xl">{title}</h2>
      {children}
    </div>
  );
}

function OptionButton({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl border px-4 py-3.5 text-right text-sm transition",
        selected ? "border-accent bg-accent/10 text-paper" : "border-ink-600 bg-ink-900 text-paper-muted hover:border-ink-500"
      )}
    >
      {children}
    </button>
  );
}

function YesNo({ value, onChange }: { value: boolean | null; onChange: (v: boolean) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <OptionButton selected={value === true} onClick={() => onChange(true)}>
        <div className="text-center font-bold">أيوه 👍</div>
      </OptionButton>
      <OptionButton selected={value === false} onClick={() => onChange(false)}>
        <div className="text-center font-bold">مش أساسي 🤷</div>
      </OptionButton>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-ink-600 bg-ink-900 px-4 py-3.5 text-base text-paper placeholder:text-paper-muted focus:border-accent focus:outline-none";
