import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const tourPackages = sqliteTable("tour_packages", {
  id: integer("id").primaryKey({ autoIncrement: true }), slug: text("slug").notNull(), country: text("country").notNull(), title: text("title").notNull(), duration: text("duration").notNull(), summary: text("summary").notNull().default(""), route: text("route").notNull().default(""), highlightsJson: text("highlights_json").notNull().default("[]"), itineraryJson: text("itinerary_json").notNull().default("[]"), inclusionsJson: text("inclusions_json").notNull().default("[]"), exclusionsJson: text("exclusions_json").notNull().default("[]"), imageUrl: text("image_url").notNull().default("/mitra-travels-hero.png"), featured: integer("featured", { mode: "boolean" }).notNull().default(false), active: integer("active", { mode: "boolean" }).notNull().default(true), createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`), updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [uniqueIndex("uq_tour_packages_slug").on(table.slug), index("idx_tour_packages_country_active").on(table.country, table.active)]);

export const blogPostsTable = sqliteTable("blog_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }), slug: text("slug").notNull(), title: text("title").notNull(), excerpt: text("excerpt").notNull().default(""), content: text("content").notNull().default(""), category: text("category").notNull().default("Travel Guide"), publishedAt: text("published_at").notNull(), imageUrl: text("image_url").notNull().default(""), active: integer("active", { mode: "boolean" }).notNull().default(true), createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`), updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [uniqueIndex("uq_blog_posts_slug").on(table.slug), index("idx_blog_posts_active_date").on(table.active, table.publishedAt)]);

export const faqItems = sqliteTable("faq_items", {
  id: integer("id").primaryKey({ autoIncrement: true }), question: text("question").notNull(), answer: text("answer").notNull(), sortOrder: integer("sort_order").notNull().default(0), active: integer("active", { mode: "boolean" }).notNull().default(true), createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("idx_faq_items_active_sort").on(table.active, table.sortOrder)]);

export const enquiries = sqliteTable("enquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }), name: text("name").notNull(), phone: text("phone").notNull(), email: text("email").notNull().default(""), destination: text("destination").notNull(), packageName: text("package_name").notNull().default(""), pickupCity: text("pickup_city").notNull().default(""), travelDate: text("travel_date").notNull().default(""), travellers: integer("travellers").notNull().default(1), message: text("message").notNull().default(""), status: text("status").notNull().default("New"), notes: text("notes").notNull().default(""), createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`), updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("idx_enquiries_status_created").on(table.status, table.createdAt)]);

export const siteSettings = sqliteTable("site_settings", { key: text("key").primaryKey(), value: text("value").notNull().default(""), updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`) });

export const mediaAssets = sqliteTable("media_assets", {
  id: integer("id").primaryKey({ autoIncrement: true }), storageKey: text("storage_key").notNull(), filename: text("filename").notNull(), contentType: text("content_type").notNull(), size: integer("size").notNull(), createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [uniqueIndex("uq_media_assets_storage_key").on(table.storageKey), index("idx_media_assets_created").on(table.createdAt)]);
