"use client";

import Image from "next/image";
import { useState } from "react";
import type { BikeImage } from "@prisma/client";
import { cn } from "@/lib/utils";

export function ImageGallery({ images, alt }: { images: BikeImage[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-xl3 border border-ink-700 bg-ink-850 text-5xl">
        🏍️
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setFullscreen(true)}
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl3 border border-ink-700 bg-ink-850"
      >
        <Image
          src={images[active].url}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 700px"
          className="object-cover"
        />
        <span className="absolute bottom-3 left-3 rounded-lg bg-ink-950/70 px-3 py-1.5 text-xs font-bold backdrop-blur">
          🔍 اضغط للتكبير
        </span>
      </button>

      {images.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              className={cn(
                "relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition",
                i === active ? "border-accent" : "border-transparent opacity-70"
              )}
            >
              <Image src={img.url} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {fullscreen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-ink-950/97 backdrop-blur">
          <div className="flex items-center justify-between p-4">
            <span className="text-sm text-paper-muted">{active + 1} / {images.length}</span>
            <button onClick={() => setFullscreen(false)} className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-800 text-xl">
              ✕
            </button>
          </div>
          <div className="relative flex-1">
            <Image src={images[active].url} alt={alt} fill sizes="100vw" className="object-contain" />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActive((a) => (a - 1 + images.length) % images.length)}
                  className="absolute inset-y-0 right-0 flex w-16 items-center justify-center text-3xl text-paper-muted hover:text-paper"
                  aria-label="السابق"
                >
                  ›
                </button>
                <button
                  onClick={() => setActive((a) => (a + 1) % images.length)}
                  className="absolute inset-y-0 left-0 flex w-16 items-center justify-center text-3xl text-paper-muted hover:text-paper"
                  aria-label="التالي"
                >
                  ‹
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
