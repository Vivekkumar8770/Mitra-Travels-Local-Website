import { getChatGPTUser } from "@/app/chatgpt-auth";

export async function requireAdminApi() {
  if (process.env.NODE_ENV !== "production") return { displayName: "Local Admin", email: "local@mitratravels.test", fullName: "Local Admin" };
  const user = await getChatGPTUser();
  if (!user) return null;
  const allowed = (process.env.ADMIN_EMAILS || "").split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);
  if (allowed.length && !allowed.includes(user.email.toLowerCase())) return null;
  return user;
}
