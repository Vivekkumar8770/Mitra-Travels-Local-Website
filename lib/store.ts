import { asc, desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { blogPostsTable, faqItems, siteSettings, tourPackages } from "@/db/schema";
import { blogPosts, contact, faqs, packages, type BlogPost, type TourPackage } from "@/lib/content";
import { getLocalSettings } from "@/lib/local-settings";
import { getDeletedLocalPackageSlugs, listLocalPackages } from "@/lib/local-packages";

type PackageRow = typeof tourPackages.$inferSelect;
type BlogRow = typeof blogPostsTable.$inferSelect;
function safeJson<T>(value: string, fallback: T): T { try { return JSON.parse(value) as T; } catch { return fallback; } }
export function rowToPackage(row: PackageRow): TourPackage { return { id: row.id, slug: row.slug, country: row.country === "India" ? "India" : "Nepal", title: row.title, duration: row.duration, summary: row.summary, route: row.route, highlights: safeJson(row.highlightsJson, []), itinerary: safeJson(row.itineraryJson, []), inclusions: safeJson(row.inclusionsJson, []), exclusions: safeJson(row.exclusionsJson, []), featured: row.featured, active: row.active, imageUrl: row.imageUrl }; }
export function rowToBlog(row: BlogRow): BlogPost { return { id: row.id, slug: row.slug, title: row.title, excerpt: row.excerpt, content: row.content, category: row.category, publishedAt: row.publishedAt, imageUrl: row.imageUrl, active: row.active }; }

export async function getAllPackages(): Promise<TourPackage[]> {
  const local = process.env.NODE_ENV !== "production" ? listLocalPackages() : [];
  const deletedLocalSlugs = process.env.NODE_ENV !== "production" ? getDeletedLocalPackageSlugs() : new Set<string>();
  try {
    const db = getDb();
    const rows = await db.select().from(tourPackages).orderBy(desc(tourPackages.updatedAt));
    const deletedRow = await db.select({ value: siteSettings.value }).from(siteSettings).where(eq(siteSettings.key, "deleted_package_slugs")).limit(1);
    const deletedRemoteSlugs = safeJson<string[]>(deletedRow[0]?.value || "[]", []);
    const deletedSlugs = new Set(deletedRemoteSlugs);
    const dynamic = [...local, ...rows.map(rowToPackage)];
    const dynamicSlugs = new Set(dynamic.map((item) => item.slug));
    return [...dynamic, ...packages.filter((item) => !dynamicSlugs.has(item.slug) && !deletedSlugs.has(item.slug) && !deletedLocalSlugs.has(item.slug))];
  } catch {
    const localSlugs = new Set(local.map((item) => item.slug));
    return [...local, ...packages.filter((item) => !localSlugs.has(item.slug) && !deletedLocalSlugs.has(item.slug))];
  }
}
export async function getPublicPackages() { return (await getAllPackages()).filter((item) => item.active); }
export async function getPackageBySlug(slug: string) { return (await getAllPackages()).find((item) => item.slug === slug && item.active) ?? null; }

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const db = getDb();
    const rows = await db.select().from(blogPostsTable).orderBy(desc(blogPostsTable.publishedAt));
    const deletedRow = await db.select({ value: siteSettings.value }).from(siteSettings).where(eq(siteSettings.key, "deleted_blog_slugs")).limit(1);
    const deletedSlugs = new Set(safeJson<string[]>(deletedRow[0]?.value || "[]", []));
    const dynamic = rows.map(rowToBlog);
    const dynamicSlugs = new Set(dynamic.map((item) => item.slug));
    return [...dynamic, ...blogPosts.filter((item) => !dynamicSlugs.has(item.slug) && !deletedSlugs.has(item.slug))].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  } catch { return blogPosts; }
}
export async function getPublicBlogPosts() { return (await getAllBlogPosts()).filter((post) => post.active); }
export async function getBlogPostBySlug(slug: string) { return (await getAllBlogPosts()).find((post) => post.slug === slug && post.active) ?? null; }

export async function getPublicFaqs() {
  try { const rows = await getDb().select().from(faqItems).where(eq(faqItems.active, true)).orderBy(asc(faqItems.sortOrder), asc(faqItems.id)); return rows.length ? rows.map((row) => ({ id: row.id, question: row.question, answer: row.answer, active: row.active, sortOrder: row.sortOrder })) : faqs; } catch { return faqs; }
}

export type PublicSettings = {
  phone: string; phoneRaw: string; email: string; address: string; heroTitle: string; heroSubtitle: string;
  heroImage?: string; heroImages?: string; heroEyebrow?: string; heroPrimaryText?: string; heroSecondaryText?: string;
  logoUrl?: string; brandName?: string; brandTagline?: string; topStripText?: string;
  headerCtaText?: string; headerCtaUrl?: string; whatsappLabel?: string;
  footerAbout?: string; footerCopyright?: string; footerTagline?: string; footerFacebook?: string; footerInstagram?: string; footerYoutube?: string; footerTwitter?: string;
  footerPackagesJson?: string;
  googlePlaceId?: string; testimonialsJson?: string;
};
const defaultSettings: PublicSettings = { phone: contact.phone, phoneRaw: contact.phoneRaw, email: contact.email, address: contact.address, heroTitle: "Nepal Tours from Raxaul, Planned Around You.", heroSubtitle: "Mitra Travels provides Nepal tour packages, Raxaul to Kathmandu trips, Nepal taxi service and private car rental for families, groups and pilgrimage journeys.",
  heroImage: "/mitra-travels-hero.png", heroEyebrow: "Private journeys, personally planned", heroPrimaryText: "Explore packages",
  heroSecondaryText: "Get a custom plan", logoUrl: "/mitra-travels-logo.png", brandName: "Mitra Travels",
  brandTagline: "Thoughtfully planned India & Nepal journeys from Raxaul", topStripText: "Thoughtfully planned India & Nepal journeys from Raxaul",
  headerCtaText: "Plan my trip", headerCtaUrl: "/contact#enquiry", whatsappLabel: "WhatsApp",
  footerAbout: "Mitra Travels is a trusted Raxaul, Bihar travel agency for India and Nepal tour packages, comfortable vehicles, car rental, hotel bookings, permits, Bhansar and personal travel assistance.",
  footerCopyright: "© 2026 Mitra Travels. All rights reserved.", footerTagline: "Travel & Tourism Agency · Raxaul, Bihar", footerFacebook: "", footerInstagram: "", footerYoutube: "", footerTwitter: "", footerPackagesJson: "", googlePlaceId: "", testimonialsJson: "[]"
};
export async function getPublicSettings(): Promise<PublicSettings> {
  if (process.env.NODE_ENV !== "production") return { ...defaultSettings, ...getLocalSettings() };
  try { const rows = await getDb().select().from(siteSettings); return { ...defaultSettings, ...Object.fromEntries(rows.map((row) => [row.key, row.value])) }; }
  catch { return defaultSettings; }
}
