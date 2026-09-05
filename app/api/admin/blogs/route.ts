import { z } from "zod";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { blogPostsTable } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin-auth";
import { getAllBlogPosts } from "@/lib/store";

const schema = z.object({ slug: z.string().trim().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), title: z.string().trim().min(2), excerpt: z.string().trim().min(2), content: z.string().trim().min(2), category: z.string().trim().min(2), publishedAt: z.string().trim().min(8), imageUrl: z.string().trim().max(500).default(""), active: z.boolean() });
export async function GET() { const admin = await requireAdminApi(); if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 }); return Response.json({ items: await getAllBlogPosts() }); }
export async function POST(request: Request) { const admin = await requireAdminApi(); if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 }); const parsed = schema.safeParse(await request.json()); if (!parsed.success) return Response.json({ error: "Please complete all required blog fields." }, { status: 400 }); const values = { ...parsed.data, updatedAt: new Date().toISOString() }; const [saved] = await getDb().insert(blogPostsTable).values(values).onConflictDoUpdate({ target: blogPostsTable.slug, set: values }).returning({ id: blogPostsTable.id }); return Response.json({ id: saved.id }); }
export async function DELETE(request: Request) { const admin = await requireAdminApi(); if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 }); const slug = new URL(request.url).searchParams.get("slug")?.trim(); if (!slug) return Response.json({ error: "Blog slug is required." }, { status: 400 }); const deleted = await getDb().delete(blogPostsTable).where(eq(blogPostsTable.slug, slug)).returning({ id: blogPostsTable.id }); return deleted.length ? Response.json({ ok: true }) : Response.json({ error: "Blog post not found." }, { status: 404 }); }
