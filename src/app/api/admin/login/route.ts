import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "اكتب اسم المستخدم وكلمة السر" }, { status: 400 });
  }

  const admin = await prisma.admin.findUnique({ where: { username: parsed.data.username } });
  const valid = admin ? await bcrypt.compare(parsed.data.password, admin.passwordHash) : false;

  if (!admin || !valid) {
    return NextResponse.json({ error: "اسم المستخدم أو كلمة السر غلط" }, { status: 401 });
  }

  const token = await createSessionToken({ adminId: admin.id, username: admin.username });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
