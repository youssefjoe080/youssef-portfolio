import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-app flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-5xl">🏍️💨</p>
      <h1 className="mt-4 text-2xl font-black md:text-3xl">الصفحة دي مش موجودة</h1>
      <p className="mt-2 text-paper-muted">يمكن البايك اتباع أو الرابط غلط.</p>
      <Link
        href="/bikes"
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-l from-accent to-accent-soft px-6 py-3.5 text-sm font-black text-ink-950"
      >
        شوف كل الموتوسيكلات
      </Link>
    </div>
  );
}
