"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { BikeImage } from "@prisma/client";
import { cn } from "@/lib/utils";

export function ImageUploader({ bikeId, initialImages }: { bikeId: string; initialImages: BikeImage[] }) {
  const [images, setImages] = useState(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFiles(files: FileList | File[]) {
    const arr = Array.from(files);
    if (arr.length === 0) return;
    setUploading(true);
    setError("");
    const formData = new FormData();
    arr.forEach((f) => formData.append("files", f));
    try {
      const res = await fetch(`/api/bikes/${bikeId}/images`, { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "حصل خطأ في رفع الصور");
        return;
      }
      setImages((prev) => [...prev, ...data.images]);
    } catch {
      setError("حصل خطأ في الاتصال");
    } finally {
      setUploading(false);
    }
  }

  async function persistOrder(next: BikeImage[]) {
    setImages(next);
    await fetch(`/api/bikes/${bikeId}/images`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        images: next.map((img, i) => ({ id: img.id, order: i, isCover: img.isCover })),
      }),
    });
  }

  function setCover(id: string) {
    const next = images.map((img) => ({ ...img, isCover: img.id === id }));
    persistOrder(next);
  }

  async function removeImage(id: string) {
    if (!confirm("تمسح الصورة دي؟")) return;
    const next = images.filter((img) => img.id !== id);
    setImages(next);
    await fetch(`/api/bikes/${bikeId}/images?imageId=${id}`, { method: "DELETE" });
  }

  function onDrop(targetIndex: number) {
    if (dragIndex === null || dragIndex === targetIndex) return;
    const next = [...images];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(targetIndex, 0, moved);
    setDragIndex(null);
    persistOrder(next);
  }

  return (
    <div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-xl2 border-2 border-dashed border-ink-600 bg-ink-900 p-8 text-center transition hover:border-accent/40"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          hidden
          onChange={(e) => e.target.files && uploadFiles(e.target.files)}
        />
        <p className="text-3xl">📷</p>
        <p className="mt-2 font-bold">{uploading ? "بيترفع..." : "اسحب الصور هنا أو دوس للاختيار"}</p>
        <p className="mt-1 text-xs text-paper-muted">JPG أو PNG أو WEBP — تقدر تختار أكتر من صورة مرة واحدة</p>
      </div>

      {error && <p className="mt-3 text-sm font-bold text-red-400">{error}</p>}

      {images.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((img, i) => (
            <div
              key={img.id}
              draggable
              onDragStart={() => setDragIndex(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(i)}
              className={cn(
                "group relative aspect-square cursor-move overflow-hidden rounded-xl border-2 bg-ink-800",
                img.isCover ? "border-accent" : "border-ink-700"
              )}
            >
              <Image src={img.url} alt="" fill sizes="200px" className="object-cover" />
              {img.isCover && (
                <span className="absolute right-1.5 top-1.5 rounded bg-accent px-1.5 py-0.5 text-[10px] font-black text-ink-950">
                  الغلاف
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex gap-1 bg-ink-950/80 p-1.5 opacity-0 transition group-hover:opacity-100">
                {!img.isCover && (
                  <button
                    type="button"
                    onClick={() => setCover(img.id)}
                    className="flex-1 rounded bg-ink-800 px-1.5 py-1 text-[10px] font-bold hover:bg-ink-700"
                  >
                    ⭐ غلاف
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(img.id)}
                  className="flex-1 rounded bg-red-500/20 px-1.5 py-1 text-[10px] font-bold text-red-400 hover:bg-red-500/30"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
