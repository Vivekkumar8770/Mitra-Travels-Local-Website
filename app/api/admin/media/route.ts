import { desc } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { getDb } from "@/db";
import { mediaAssets } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin-auth";
import { addLocalMedia, listLocalMedia } from "@/lib/local-media";

type Bucket = { put(key: string, value: ArrayBuffer, options?: { httpMetadata?: { contentType?: string } }): Promise<unknown> };
const localDevelopment = process.env.NODE_ENV !== "production";
export async function GET() { const admin = await requireAdminApi(); if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 }); if (localDevelopment) return Response.json({ items: listLocalMedia() }); try { return Response.json({ items: await getDb().select().from(mediaAssets).orderBy(desc(mediaAssets.createdAt)).limit(100) }); } catch { return Response.json({ items: [] }); } }
export async function POST(request: Request) {
  try {
    const admin = await requireAdminApi(); if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });
    const data = await request.formData(); const file = data.get("file"); if (!(file instanceof File)) return Response.json({ error: "Select an image to upload." }, { status: 400 });
    if (!file.type.startsWith("image/")) return Response.json({ error: "Only image files are supported." }, { status: 400 });
    if (file.size > 8 * 1024 * 1024) return Response.json({ error: "Image must be smaller than 8 MB." }, { status: 400 });
    if (localDevelopment) {
      const saved = addLocalMedia({ name: file.name, type: file.type, size: file.size, data: await file.arrayBuffer() });
      return Response.json({ item: { ...saved, url: `/api/media/${saved.id}` } }, { status: 201 });
    }
    const bucket = (env as unknown as { BUCKET?: Bucket }).BUCKET; if (!bucket) return Response.json({ error: "Media storage is not available. Check the BUCKET R2 binding." }, { status: 503 });
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-|-$/g, ""); const key = `uploads/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
    await bucket.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
    const [saved] = await getDb().insert(mediaAssets).values({ storageKey: key, filename: file.name, contentType: file.type, size: file.size }).returning();
    return Response.json({ item: { ...saved, url: `/api/media/${saved.id}` } }, { status: 201 });
  } catch (error) {
    console.error("Admin media upload failed", error);
    return Response.json({ error: "Media upload failed. Check the BUCKET R2 binding and media_assets database migration." }, { status: 500 });
  }
}
