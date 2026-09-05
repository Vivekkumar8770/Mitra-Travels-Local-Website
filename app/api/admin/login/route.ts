import { NextResponse } from "next/server";
import { createAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = formData.get("password");
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.redirect(new URL("/admin/login?error=config", request.url), 303);
  }
  if (typeof password !== "string" || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url), 303);
  }

  await createAdminSession();

  return NextResponse.redirect(new URL("/admin", request.url), 303);
}