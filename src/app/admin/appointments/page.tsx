import { prisma } from "@/lib/prisma";
import { AppointmentAdminList } from "@/components/admin/AppointmentAdminList";

export const dynamic = "force-dynamic";

export default async function AdminAppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: "desc" },
    include: { bike: { select: { slug: true, status: true } } },
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-black md:text-2xl">العملاء / الحجوزات</h1>
        <p className="mt-1 text-sm text-paper-muted">{appointments.length} طلب معاينة</p>
      </div>
      <AppointmentAdminList initialAppointments={appointments} />
    </div>
  );
}
