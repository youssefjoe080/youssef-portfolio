import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";

export default async function AdminSettingsPage() {
  const session = await getSession();
  const bikesCount = await prisma.motorcycle.count();
  const whatsapp = process.env.WHATSAPP_NUMBER || "201065173490";
  const tiktok = process.env.NEXT_PUBLIC_TIKTOK_USERNAME || "YoussefJoe.rr";

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-black md:text-2xl">الإعدادات</h1>

      <div className="rounded-xl2 border border-ink-700 bg-ink-850 p-5">
        <h3 className="mb-4 font-extrabold">معلومات الحساب</h3>
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <InfoRow label="اسم المستخدم" value={session?.username ?? "-"} />
          <InfoRow label="إجمالي البايكات في القاعدة" value={String(bikesCount)} />
        </div>
      </div>

      <div className="rounded-xl2 border border-ink-700 bg-ink-850 p-5">
        <h3 className="mb-4 font-extrabold">بيانات التواصل المستخدمة في الموقع</h3>
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <InfoRow label="رقم واتساب الموقع" value={whatsapp} dir="ltr" />
          <InfoRow label="حساب TikTok" value={`@${tiktok}`} />
        </div>
        <p className="mt-4 text-xs leading-6 text-paper-muted">
          الرقم والحساب دول متحكم فيهم من متغيرات البيئة (Environment Variables) في الاستضافة —
          <code className="mx-1 rounded bg-ink-900 px-1.5 py-0.5">WHATSAPP_NUMBER</code>
          و
          <code className="mx-1 rounded bg-ink-900 px-1.5 py-0.5">NEXT_PUBLIC_TIKTOK_USERNAME</code>
          — عشان يفضلوا ثابتين وآمنين. لو عايز تغيّرهم كلم اللي بيستضيفلك الموقع أو راجع دليل النشر.
        </p>
      </div>

      <div className="rounded-xl2 border border-ink-700 bg-ink-850 p-5">
        <h3 className="mb-4 font-extrabold">تغيير كلمة السر</h3>
        <ChangePasswordForm />
      </div>
    </div>
  );
}

function InfoRow({ label, value, dir }: { label: string; value: string; dir?: "ltr" | "rtl" }) {
  return (
    <div className="rounded-lg bg-ink-900 px-3.5 py-3">
      <div className="text-[11px] text-paper-muted">{label}</div>
      <div dir={dir} className="mt-0.5 font-bold">{value}</div>
    </div>
  );
}
