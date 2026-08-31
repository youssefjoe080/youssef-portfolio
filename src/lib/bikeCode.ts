import { prisma } from "@/lib/prisma";

const PREFIX = "YJ";
const COUNTER_ID = "bike-code";

/**
 * Atomically reserves the next sequential bike code (YJ-001, YJ-002, ...).
 * Uses an upsert+increment on a single counter row so codes never collide,
 * even if two admins add a bike at the same time.
 */
export async function nextBikeCode(): Promise<string> {
  const counter = await prisma.counter.upsert({
    where: { id: COUNTER_ID },
    update: { value: { increment: 1 } },
    create: { id: COUNTER_ID, value: 1 },
  });
  return `${PREFIX}-${String(counter.value).padStart(3, "0")}`;
}

export function slugify(brand: string, model: string, year: number, code: string): string {
  const base = `${brand}-${model}-${year}`
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9؀-ۿ]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base}-${code.toLowerCase()}`;
}
