import { z } from "zod";
import { getDb } from "@/db";
import { siteSettings } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin-auth";
import { contact } from "@/lib/content";
import { getLocalSettings, saveLocalSettings } from "@/lib/local-settings";

const defaults = { phone: contact.phone, phoneRaw: contact.phoneRaw, email: contact.email, address: contact.address, heroTitle: "Nepal Tours from Raxaul, Planned Around You.", heroSubtitle: "Mitra Travels provides Nepal tour packages, Raxaul to Kathmandu trips, Nepal taxi service and private car rental for families, groups and pilgrimage journeys.", heroImage: "/mitra-travels-hero.png", footerFacebook: "", footerInstagram: "", footerYoutube: "", footerTwitter: "" };
const localDevelopment = process.env.NODE_ENV !== "production";
export async function GET() { const admin = await requireAdminApi(); if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 }); if (localDevelopment) return Response.json({ item: { ...defaults, ...getLocalSettings() } }); try { const rows = await getDb().select().from(siteSettings); return Response.json({ item: { ...defaults, ...Object.fromEntries(rows.map((row) => [row.key, row.value])) } }); } catch { return Response.json({ item: defaults }); } }
export async function PUT(request: Request) { const admin = await requireAdminApi(); if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 }); const parsed = z.record(z.string(), z.string().max(1000)).safeParse(await request.json()); if (!parsed.success) return Response.json({ error: "Invalid settings" }, { status: 400 }); if (localDevelopment) { saveLocalSettings(parsed.data); return Response.json({ ok: true }); } const db = getDb(); for (const [key, value] of Object.entries(parsed.data)) await db.insert(siteSettings).values({ key, value, updatedAt: new Date().toISOString() }).onConflictDoUpdate({ target: siteSettings.key, set: { value, updatedAt: new Date().toISOString() } }); return Response.json({ ok: true }); }
