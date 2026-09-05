import { eq } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { getDb } from "@/db";
import { mediaAssets } from "@/db/schema";
import { getLocalMedia } from "@/lib/local-media";

const localDevelopment = process.env.NODE_ENV !== "production";

type R2Object = { body: BodyInit; httpMetadata?: { contentType?: string }; httpEtag?: string };
type Bucket = { get(key: string): Promise<R2Object | null> };
export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) { const { id } = await context.params; const numericId = Number(id); if (!Number.isInteger(numericId)) return new Response("Not found", { status: 404 }); if (localDevelopment) { const local = getLocalMedia(numericId); if (!local?.data) return new Response("Not found", { status: 404 }); return new Response(local.data, { headers: { "Content-Type": local.asset.contentType, "Cache-Control": "no-store" } }); } const [asset] = await getDb().select().from(mediaAssets).where(eq(mediaAssets.id, numericId)).limit(1); if (!asset) return new Response("Not found", { status: 404 }); const bucket = (env as unknown as { BUCKET?: Bucket }).BUCKET; const object = await bucket?.get(asset.storageKey); if (!object) return new Response("Not found", { status: 404 }); return new Response(object.body, { headers: { "Content-Type": object.httpMetadata?.contentType || asset.contentType, "Cache-Control": "public, max-age=31536000, immutable", ...(object.httpEtag ? { ETag: object.httpEtag } : {}) } }); }
