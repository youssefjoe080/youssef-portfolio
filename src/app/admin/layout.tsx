import type { Metadata } from "next";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: "لوحة التحكم",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink-950 text-paper">
      <AdminNav />
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">{children}</main>
    </div>
  );
}
