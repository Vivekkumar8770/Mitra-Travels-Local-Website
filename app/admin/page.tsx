import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { chatGPTSignInPath, getChatGPTUser } from "@/app/chatgpt-auth";
import { AdminDashboard } from "@/components/admin-dashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const localMode = process.env.NODE_ENV !== "production";
  const user = await getChatGPTUser();
  const allowed = (process.env.ADMIN_EMAILS || "").split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);
  const authorised = localMode || Boolean(user && (!allowed.length || allowed.includes(user.email.toLowerCase())));
  if (authorised) return <div className="admin-route"><main><div className="admin-preview-notice">{localMode ? "Local preview mode — sign-in protection will activate when hosted." : `Signed in as ${user?.email}`}</div><AdminDashboard /></main></div>;
  return <div className="admin-route"><main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-20"><div className="surface max-w-md p-8 text-center"><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-orange-50 text-orange-600"><LockKeyhole className="size-6" /></span><h1 className="mt-5 text-2xl font-extrabold text-slate-950">Admin sign-in required</h1><p className="mt-3 text-sm leading-6 text-slate-600">Sign in with your authorised ChatGPT account to manage Mitra Travels content and enquiries.</p><Link href={chatGPTSignInPath("/admin")} target="_top" className="btn btn-primary mt-6 w-full">Sign in securely</Link></div></main></div>;
}
