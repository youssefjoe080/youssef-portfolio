"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-app flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-5xl">⚠️</p>
      <h1 className="mt-4 text-2xl font-black md:text-3xl">حصل خطأ غير متوقع</h1>
      <p className="mt-2 text-paper-muted">جرب تاني، ولو استمرت المشكلة كلمنا على واتساب.</p>
      <button
        onClick={reset}
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-l from-accent to-accent-soft px-6 py-3.5 text-sm font-black text-ink-950"
      >
        حاول تاني
      </button>
    </div>
  );
}
