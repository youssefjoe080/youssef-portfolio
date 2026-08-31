import { BikeForm } from "@/components/admin/BikeForm";

export default function NewBikePage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-black md:text-2xl">+ إضافة موتوسيكل جديد</h1>
      <BikeForm mode="create" />
    </div>
  );
}
