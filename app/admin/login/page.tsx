import { LockKeyhole } from "lucide-react";
import { AdminLoginForm } from "@/components/admin-login-form";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const error = (await searchParams).error;
  const message = error === "config"
    ? "Admin secrets are not configured in the hosting environment."
    : error === "invalid"
      ? "The password is incorrect."
      : error === "1"
        ? "Login failed. Please verify the admin password and redeploy after updating hosting secrets."
      : null;

  return <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-20"><div className="surface w-full max-w-md p-8"><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-orange-50 text-orange-600"><LockKeyhole className="size-6" /></span><h1 className="mt-5 text-center text-2xl font-extrabold text-slate-950">Admin login</h1>{message && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{message}</p>}<AdminLoginForm /></div></main>;
}