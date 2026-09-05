import { getChatGPTUser } from "@/app/chatgpt-auth";

export async function requireAdminApi() {
  if (isLocalAdminMode()) {
    return { displayName: "Local Admin", email: "local@mitratravels.test", fullName: "Local Admin" };
  }

  const user = await getChatGPTUser();
  if (!user) return null;

  const allowed = getAllowedAdminEmails();
  if (!allowed.length || !allowed.includes(user.email.trim().toLowerCase())) return null;

  return user;
}

export function getAllowedAdminEmails() {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isLocalAdminMode() {
  return process.env.NODE_ENV !== "production" && process.env.LOCAL_ADMIN_MODE === "true";
}
