"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";
type RequiredField = "name" | "phone" | "destination" | "travellers";

export function EnquiryForm({ packageName = "" }: { packageName?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<RequiredField, string>>>({});

  async function submit(formData: FormData) {
    const values = Object.fromEntries(formData.entries());
    const nextErrors: Partial<Record<RequiredField, string>> = {};
    if (String(values.name || "").trim().length < 2) nextErrors.name = "Please enter your full name.";
    if (!/^[0-9+ -]{8,18}$/.test(String(values.phone || "").trim())) nextErrors.phone = "Enter a valid phone number.";
    if (String(values.destination || "").trim().length < 2) nextErrors.destination = "Please enter your destination.";
    if (!Number.isInteger(Number(values.travellers)) || Number(values.travellers) < 1) nextErrors.travellers = "Enter at least 1 traveller.";
    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors);
      setStatus("idle");
      return;
    }
    setStatus("submitting");
    setError("");
    setFieldErrors({});
    const payload = values;
    try {
      const response = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "Unable to submit your enquiry.");
      setStatus("success");
    } catch (caught) {
      setStatus("error");
      setError(caught instanceof Error ? caught.message : "Unable to submit your enquiry.");
    }
  }

  if (status === "success") {
    return <div className="enquiry-success rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"><CheckCircle2 className="mx-auto size-12 text-emerald-600" /><h3 className="mt-4 text-2xl font-extrabold text-slate-950">Your enquiry is received</h3><p className="mx-auto mt-3 max-w-md text-slate-600">Thank you. The Mitra Travels team will contact you by phone or WhatsApp with a customised plan.</p><button onClick={() => setStatus("idle")} className="mt-6 font-bold text-emerald-700">Submit another enquiry</button></div>;
  }

  return (
    <form action={submit} noValidate className="enquiry-form grid gap-5">
      <input type="hidden" name="packageName" value={packageName} />
      <div className="grid gap-5 sm:grid-cols-2">
        <label><span className="field-label">Full name <span className="required-mark" aria-hidden="true">*</span></span><input name="name" required minLength={2} aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "name-error" : undefined} className={`field-control ${fieldErrors.name ? "field-control-error" : ""}`} placeholder="Your name" />{fieldErrors.name && <span id="name-error" className="field-error">{fieldErrors.name}</span>}</label>
        <label><span className="field-label">Phone / WhatsApp <span className="required-mark" aria-hidden="true">*</span></span><input name="phone" required inputMode="tel" pattern="[0-9+ -]{8,18}" aria-invalid={Boolean(fieldErrors.phone)} aria-describedby={fieldErrors.phone ? "phone-error" : undefined} className={`field-control ${fieldErrors.phone ? "field-control-error" : ""}`} placeholder="Your phone number" />{fieldErrors.phone && <span id="phone-error" className="field-error">{fieldErrors.phone}</span>}</label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label><span className="field-label">Email</span><input name="email" type="email" className="field-control" placeholder="you@example.com" /></label>
        <label><span className="field-label">Travel destination <span className="required-mark" aria-hidden="true">*</span></span><input name="destination" required aria-invalid={Boolean(fieldErrors.destination)} aria-describedby={fieldErrors.destination ? "destination-error" : undefined} className={`field-control ${fieldErrors.destination ? "field-control-error" : ""}`} defaultValue={packageName} placeholder="e.g. Kathmandu & Pokhara" />{fieldErrors.destination && <span id="destination-error" className="field-error">{fieldErrors.destination}</span>}</label>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <label><span className="field-label">Pickup city</span><input name="pickupCity" className="field-control" placeholder="e.g. Raxaul" /></label>
        <label><span className="field-label">Travel date</span><input name="travelDate" type="date" className="field-control" /></label>
        <label><span className="field-label">Travellers <span className="required-mark" aria-hidden="true">*</span></span><input name="travellers" required type="number" min="1" max="60" aria-invalid={Boolean(fieldErrors.travellers)} aria-describedby={fieldErrors.travellers ? "travellers-error" : undefined} className={`field-control ${fieldErrors.travellers ? "field-control-error" : ""}`} placeholder="2" />{fieldErrors.travellers && <span id="travellers-error" className="field-error">{fieldErrors.travellers}</span>}</label>
      </div>
      <label><span className="field-label">Tell us about your trip</span><textarea name="message" className="field-control" placeholder="Number of rooms, preferred hotel category, places you want to visit, or any special requirement." /></label>
      {status === "error" && <p role="alert" className="enquiry-error rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
      <button disabled={status === "submitting"} className="btn btn-primary btn-lg justify-self-start disabled:cursor-not-allowed disabled:opacity-60">{status === "submitting" ? <><Loader2 className="size-4 animate-spin" />Sending enquiry…</> : <>Send enquiry <Send className="size-4" /></>}</button>
      <p className="text-xs leading-5 text-slate-500">By submitting, you agree that Mitra Travels may contact you regarding this enquiry. No payment is collected on this website.</p>
    </form>
  );
}
