# Youssef Joe — سوق الموتوسيكلات

موقع وسيط موتوسيكلات في مصر، مبني بـ Next.js 15 (App Router) + TypeScript + Tailwind CSS + Prisma/PostgreSQL.

## التشغيل محليًا

1. **قاعدة البيانات** — تحتاج PostgreSQL (محلي أو استضافة زي Neon/Supabase/Vercel Postgres).
2. انسخ `.env.example` إلى `.env` واملأ القيم:
   - `DATABASE_URL` — رابط قاعدة بيانات Postgres
   - `ADMIN_USERNAME` / `ADMIN_PASSWORD` — بيانات دخول الأدمن الأولى (يُستخدموا في السيد)
   - `SESSION_SECRET` — نص عشوائي طويل (32+ حرف)
   - `WHATSAPP_NUMBER` — رقم واتساب بصيغة دولية بدون `+` (مثال: `201065173490`)
   - `NEXT_PUBLIC_TIKTOK_USERNAME` — حساب TikTok
3. ثبّت الباكدجات وجهّز القاعدة:
   ```bash
   npm install
   npm run db:push     # ينشئ الجداول في القاعدة
   npm run db:seed      # ينشئ حساب الأدمن الأول (بدون بيانات وهمية)
   npm run dev
   ```
4. افتح `http://localhost:3000` للموقع، و `http://localhost:3000/admin/login` للوحة التحكم.

## الصور (Image Storage)

- محليًا وعلى أي استضافة فيها تخزين دائم (VPS / Railway / Render): الصور بتتحفظ في `public/uploads` تلقائيًا.
- على استضافة serverless زي Vercel (تخزين مؤقت وبيتمسح): لازم تفعّل [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) وتحط التوكن في `BLOB_READ_WRITE_TOKEN` — الكود بيكتشفه تلقائيًا ويستخدمه بدل التخزين المحلي.

## النشر (Deployment)

**الأسهل: Vercel**
1. اربط الريبو بمشروع Vercel جديد.
2. جهّز قاعدة Postgres (Vercel Postgres أو Neon أو Supabase) وحط رابطها في `DATABASE_URL`.
3. فعّل Vercel Blob وحط التوكن في `BLOB_READ_WRITE_TOKEN` (عشان رفع الصور يشتغل صح على السيرفرلس).
4. حط باقي متغيرات البيئة من `.env.example`.
5. بعد أول ديبلوي، شغّل مرة واحدة: `npx prisma db push && npm run db:seed` (تقدر تعمل ده من جهازك موجّه على قاعدة البيانات بتاعة الإنتاج).

**بديل: VPS / Railway / Render** (فيهم تخزين ملفات دائم، مفيش احتياج لـ Vercel Blob)
1. `npm install && npm run build && npm start`
2. تأكد إن `public/uploads` على قرص دائم (persistent volume).

## البنية

- `prisma/schema.prisma` — الموديلات: Motorcycle، BikeImage، Appointment، Article، AnalyticsEvent، Admin
- `src/app` — الصفحات (Next.js App Router) + API routes
- `src/components` — مكونات عامة (public) وأدمن (admin) منفصلة
- `src/lib` — منطق مشترك: توليد كود البايك، رسائل واتساب، خوارزمية "اختارلي بايك"، الصلاحيات، إلخ.

كود كل بايك (`YJ-001`, `YJ-002`, ...) بيتولّد تلقائيًا وبشكل تسلسلي آمن من `Counter` في القاعدة — مفيش تكرار حتى لو حد ضاف بايكين في نفس اللحظة.
