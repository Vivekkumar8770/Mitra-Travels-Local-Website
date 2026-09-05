import { NextResponse } from "next/server";
import { createAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = formData.get("password");
  if (typeof password !== "string" || !process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303);
  }

  if (!(await createAdminSession())) {
    return NextResponse.json({ error: "Admin authentication is not configured" }, { status: 503 });
  }

  return NextResponse.redirect(new URL("/admin", request.url), 303);
}