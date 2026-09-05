import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { getDb } from "@/db";
import { mediaAssets, siteSettings, tourPackages } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin-auth";
import { rowToPackage } from "@/lib/store";
import { deleteLocalPackage, listLocalPackages, saveLocalPackage } from "@/lib/local-packages";

const daySchema = z.object({ day: z.string(), title: z.string(), details: z.string() });
const schema = z.object({ slug: z.string().trim().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), country: z.enum(["India", "Nepal"]), title: z.string().trim().min(2), duration: z.string().trim().min(2), summary: z.string().trim().min(2), route: z.string().trim().min(2), highlights: z.array(z.string()), itinerary: z.array(daySchema), inclusions: z.array(z.string()), exclusions: z.array(z.string()), imageUrl: z.string().trim().min(1), featured: z.boolean(), active: z.boolean() });
const localDevelopment = process.env.NODE_ENV !== "production";
type Bucket = { delete(key: string): Promise<void> };

export async function GET() {
  const admin = await requireAdminApi(); if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (localDevelopment) return Response.json({ items: listLocalPackages() });
  try {
    const rows = await getDb().select().from(tourPackages).orderBy(desc(tourPackages.updatedAt));
    return Response.json({ items: rows.map(rowToPackage) });
  } catch {
    return Response.json({ items: [] });
  }
}
export async function POST(request: Request) {
  const admin = await requireAdminApi(); if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await request.json()); if (!parsed.success) return Response.json({ error: "Please complete all required package fields." }, { status: 400 });
  const item = parsed.data;
  if (localDevelopment) return Response.json({ id: saveLocalPackage(item).id }, { status: 200 });
  const values = { slug: item.slug, country: item.country, title: item.title, duration: item.duration, summary: item.summary, route: item.route, highlightsJson: JSON.stringify(item.highlights), itineraryJson: JSON.stringify(item.itinerary), inclusionsJson: JSON.stringify(item.inclusions), exclusionsJson: JSON.stringify(item.exclusions), imageUrl: item.imageUrl, featured: item.featured, active: item.active, updatedAt: new Date().toISOString() };
  const [saved] = await getDb().insert(tourPackages).values(values).onConflictDoUpdate({ target: tourPackages.slug, set: values }).returning({ id: tourPackages.id });
  return Response.json({ id: saved.id });
}

export async function DELETE(request: Request) {
  const admin = await requireAdminApi(); if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const slug = new URL(request.url).searchParams.get("slug")?.trim();
  if (!slug) return Response.json({ error: "Package slug is required." }, { status: 400 });
  if (localDevelopment) return deleteLocalPackage(slug) ? Response.json({ ok: true }) : Response.json({ error: "Package not found." }, { status: 404 });
  const db = getDb();
  const [item] = await db.select({ id: tourPackages.id, imageUrl: tourPackages.imageUrl }).from(tourPackages).where(eq(tourPackages.slug, slug)).limit(1);
  if (!item) return Response.json({ error: "Package not found." }, { status: 404 });
  await db.delete(tourPackages).where(eq(tourPackages.id, item.id));
  const mediaMatch = item.imageUrl.match(/^\/api\/media\/(\d+)$/);
  if (mediaMatch) {
    const mediaId = Number(mediaMatch[1]);
    const [otherPackage] = await db.select({ id: tourPackages.id }).from(tourPackages).where(eq(tourPackages.imageUrl, item.imageUrl)).limit(1);
    const settings = await db.select({ key: siteSettings.key, value: siteSettings.value }).from(siteSettings).where(eq(siteSettings.key, "heroImage"));
    const heroImages = settings[0]?.value || "";
    if (!otherPackage && !heroImages.includes(item.imageUrl)) {
      const [asset] = await db.select({ storageKey: mediaAssets.storageKey }).from(mediaAssets).where(eq(mediaAssets.id, mediaId)).limit(1);
      const bucket = (env as unknown as { BUCKET?: Bucket }).BUCKET;
      if (asset && bucket) {
        await bucket.delete(asset.storageKey);
        await db.delete(mediaAssets).where(eq(mediaAssets.id, mediaId));
      }
    }
  }
  return Response.json({ ok: true });
}
