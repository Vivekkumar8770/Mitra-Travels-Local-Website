import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/db";
import { enquiries } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin-auth";
import { addLocalEnquiry, deleteLocalEnquiry, listLocalEnquiries, updateLocalEnquiry } from "@/lib/local-enquiries";

const localDevelopment = process.env.NODE_ENV !== "production";

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(120), phone: z.string().trim().min(8).max(24), email: z.string().trim().email().or(z.literal("")).optional().default(""), destination: z.string().trim().min(2).max(160), packageName: z.string().trim().max(160).optional().default(""), pickupCity: z.string().trim().max(120).optional().default(""), travelDate: z.string().trim().max(24).optional().default(""), travellers: z.coerce.number().int().min(1).max(60), message: z.string().trim().max(2000).optional().default(""),
});

export async function POST(request: Request) {
  try {
    const parsed = enquirySchema.safeParse(await request.json());
    if (!parsed.success) return Response.json({ error: "Please check the required fields and try again." }, { status: 400 });
    if (localDevelopment) return Response.json({ id: addLocalEnquiry(parsed.data).id }, { status: 201 });
    const [saved] = await getDb().insert(enquiries).values(parsed.data).returning({ id: enquiries.id });
    return Response.json({ id: saved.id }, { status: 201 });
  } catch (error) {
    console.error("Enquiry submission failed", error);
    return Response.json({ error: "The enquiry service is temporarily unavailable. Please call or WhatsApp us." }, { status: 503 });
  }
}

export async function GET() {
  const admin = await requireAdminApi();
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (localDevelopment) return Response.json({ items: listLocalEnquiries() });
  try { return Response.json({ items: await getDb().select().from(enquiries).orderBy(desc(enquiries.createdAt)).limit(250) }); }
  catch (error) { console.error("Enquiry listing failed", error); return Response.json({ items: [], warning: "Database is not ready yet." }); }
}

export async function PATCH(request: Request) {
  const admin = await requireAdminApi();
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = z.object({ id: z.coerce.number().int().positive(), status: z.enum(["New", "Contacted", "Follow-up", "Quoted", "Converted", "Confirmed", "Closed"]), notes: z.string().max(2000).optional().default("") }).safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: "Invalid update" }, { status: 400 });
  if (localDevelopment) {
    if (!updateLocalEnquiry(parsed.data.id, parsed.data.status, parsed.data.notes)) return Response.json({ error: "Enquiry not found" }, { status: 404 });
    return Response.json({ ok: true });
  }
  await getDb().update(enquiries).set({ status: parsed.data.status, notes: parsed.data.notes, updatedAt: new Date().toISOString() }).where(eq(enquiries.id, parsed.data.id));
  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  const admin = await requireAdminApi();
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!Number.isInteger(id) || id < 1) return Response.json({ error: "Invalid enquiry" }, { status: 400 });
  if (localDevelopment) {
    if (!deleteLocalEnquiry(id)) return Response.json({ error: "Enquiry not found" }, { status: 404 });
    return Response.json({ ok: true });
  }
  await getDb().delete(enquiries).where(eq(enquiries.id, id));
  return Response.json({ ok: true });
}
