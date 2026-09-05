import { cookies } from "next/headers";
import { getChatGPTUser } from "@/app/chatgpt-auth";

export const ADMIN_SESSION_COOKIE = "mitra_admin_session";

export async function requireAdminApi() {
  if (isLocalAdminMode()) {
    return { displayName: "Local Admin", email: "local@mitratravels.test", fullName: "Local Admin" };
  }

  const user = await getChatGPTUser();
  if (user) {
    const allowed = getAllowedAdminEmails();
    if (allowed.length && allowed.includes(user.email.trim().toLowerCase())) return user;
  }

  if (await hasValidAdminSession()) {
    return { displayName: "Admin", email: "admin@mitratravels.local", fullName: "Admin" };
  }

  return null;
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

export async function createAdminSession() {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!password || !secret) return false;

  const signature = await signValue(password, secret);
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, signature, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return true;
}

export async function hasValidAdminSession() {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  const session = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!password || !secret || !session) return false;
  return session === (await signValue(password, secret));
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

async function signValue(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
