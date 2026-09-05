import { NextResponse } from "next/server";
import { createAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.redirect(new URL("/admin/login?error=config", request.url), 303);
  }
  if (typeof username !== "string" || username !== process.env.ADMIN_USERNAME || typeof password !== "string" || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url), 303);
  }

  await createAdminSession();

  return NextResponse.redirect(new URL("/admin", request.url), 303);
}