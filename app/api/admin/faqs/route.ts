import { asc, eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/db";
import { faqItems } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin-auth";
import { getPublicFaqs } from "@/lib/store";

export async function GET() { const admin = await requireAdminApi(); if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 }); try { const rows = await getDb().select().from(faqItems).orderBy(asc(faqItems.sortOrder), asc(faqItems.id)); return Response.json({ items: rows.length ? rows : await getPublicFaqs() }); } catch { return Response.json({ items: await getPublicFaqs() }); } }
export async function POST(request: Request) { const admin = await requireAdminApi(); if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 }); const parsed = z.object({ id: z.number().int().positive().optional(), question: z.string().trim().min(3), answer: z.string().trim().min(3), sortOrder: z.coerce.number().int().min(0).default(0), active: z.boolean().default(true) }).safeParse(await request.json()); if (!parsed.success) return Response.json({ error: "Question and answer are required." }, { status: 400 }); const { id, ...values } = parsed.data; if (id) { await getDb().update(faqItems).set(values).where(eq(faqItems.id, id)); return Response.json({ id }); } const [saved] = await getDb().insert(faqItems).values(values).returning({ id: faqItems.id }); return Response.json({ id: saved.id }); }
export async function DELETE(request: Request) { const admin = await requireAdminApi(); if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 }); const id = Number(new URL(request.url).searchParams.get("id")); if (!Number.isInteger(id) || id < 1) return Response.json({ error: "Invalid FAQ" }, { status: 400 }); await getDb().delete(faqItems).where(eq(faqItems.id, id)); return Response.json({ ok: true }); }
