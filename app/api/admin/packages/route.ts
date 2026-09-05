import { z } from "zod";
import { getDb } from "@/db";
import { tourPackages } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin-auth";
import { getAllPackages } from "@/lib/store";

const daySchema = z.object({ day: z.string(), title: z.string(), details: z.string() });
const schema = z.object({ slug: z.string().trim().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), country: z.enum(["India", "Nepal"]), title: z.string().trim().min(2), duration: z.string().trim().min(2), summary: z.string().trim().min(2), route: z.string().trim().min(2), highlights: z.array(z.string()), itinerary: z.array(daySchema), inclusions: z.array(z.string()), exclusions: z.array(z.string()), imageUrl: z.string().trim().min(1), featured: z.boolean(), active: z.boolean() });

export async function GET() { const admin = await requireAdminApi(); if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 }); return Response.json({ items: await getAllPackages() }); }
export async function POST(request: Request) {
  const admin = await requireAdminApi(); if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await request.json()); if (!parsed.success) return Response.json({ error: "Please complete all required package fields." }, { status: 400 });
  const item = parsed.data; const values = { slug: item.slug, country: item.country, title: item.title, duration: item.duration, summary: item.summary, route: item.route, highlightsJson: JSON.stringify(item.highlights), itineraryJson: JSON.stringify(item.itinerary), inclusionsJson: JSON.stringify(item.inclusions), exclusionsJson: JSON.stringify(item.exclusions), imageUrl: item.imageUrl, featured: item.featured, active: item.active, updatedAt: new Date().toISOString() };
  const [saved] = await getDb().insert(tourPackages).values(values).onConflictDoUpdate({ target: tourPackages.slug, set: values }).returning({ id: tourPackages.id });
  return Response.json({ id: saved.id });
}
