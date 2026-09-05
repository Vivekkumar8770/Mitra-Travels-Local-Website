"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function AdminLoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return <form action="/api/admin/login" method="post"><label className="mt-6 block text-left text-sm font-semibold text-slate-700" htmlFor="username">Username</label><input id="username" name="username" type="text" required autoComplete="username" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3" /><label className="mt-5 block text-left text-sm font-semibold text-slate-700" htmlFor="password">Password</label><div className="relative mt-2"><input id="password" name="password" type={showPassword ? "text" : "password"} required autoComplete="current-password" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute inset-y-0 right-0 grid w-12 place-items-center text-slate-500" aria-label={showPassword ? "Hide password" : "Show password"} title={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}</button></div><button type="submit" className="btn btn-primary mt-6 w-full">Sign in securely</button></form>;
}