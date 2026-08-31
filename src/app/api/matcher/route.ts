import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { matcherInputSchema } from "@/lib/validation";
import { matchBikes } from "@/lib/matcher";
import { toPublicBike } from "@/lib/publicBike";
import { logEvent } from "@/lib/events";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = matcherInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "بيانات غير صحيحة" }, { status: 400 });
  }

  const bikes = await prisma.motorcycle.findMany({
    where: { status: "AVAILABLE" },
    include: { images: { orderBy: { order: "asc" } } },
  });

  const results = matchBikes(parsed.data, bikes).map((r) => ({
    bike: toPublicBike(r.bike),
    score: r.score,
    reasons: r.reasons,
  }));

  await logEvent("matcher_use", { meta: { answers: parsed.data, resultsCount: results.length } });

  return NextResponse.json({ results });
}
