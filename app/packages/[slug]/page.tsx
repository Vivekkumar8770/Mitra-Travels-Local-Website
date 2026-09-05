import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Clock3, MapPin, MessageCircle, X } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { packages } from "@/lib/content";
import { getPackageBySlug } from "@/lib/store";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return packages.map((item) => ({ slug: item.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const item = await getPackageBySlug(slug); return item ? { title: item.title, description: item.summary } : {}; }

export default async function PackageDetail({ params }: Props) {
  const { slug } = await params;
  const item = await getPackageBySlug(slug);
  if (!item) notFound();
  return (
    <main>
      <section className="relative min-h-[510px] overflow-hidden bg-[#06162b] text-white"><img src={item.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-[#041225]/95 via-[#041225]/72 to-[#041225]/15" /><div className="container-shell relative z-10 py-16"><Link href="/packages" className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white"><ArrowLeft className="size-4" />All packages</Link><div className="mt-20 max-w-3xl"><span className="country-chip static inline-block">{item.country}</span><h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl">{item.title}</h1><div className="mt-6 flex flex-wrap gap-5 text-white/75"><span className="inline-flex items-center gap-2"><Clock3 className="size-4 text-orange-300" />{item.duration}</span><span className="inline-flex items-center gap-2"><MapPin className="size-4 text-orange-300" />{item.route}</span></div></div></div></section>
      <section className="section-space"><div className="container-shell grid gap-10 lg:grid-cols-[1fr_360px]"><div><p className="text-lg leading-8 text-slate-600">{item.summary}</p><div className="mt-8 flex flex-wrap gap-2">{item.highlights.map((highlight) => <span key={highlight} className="rounded-full bg-[#edf5fb] px-4 py-2 text-sm font-bold text-[#0a2a50]">{highlight}</span>)}</div><h2 className="mt-12 text-3xl font-extrabold text-slate-950">Day-wise itinerary</h2><div className="mt-6 space-y-4">{item.itinerary.map((day) => <article key={`${day.day}-${day.title}`} className="surface p-6"><div className="flex flex-col gap-4 sm:flex-row"><span className="w-fit shrink-0 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-orange-700">{day.day}</span><div><h3 className="text-lg font-bold text-slate-950">{day.title}</h3><p className="mt-2 leading-7 text-slate-600">{day.details}</p></div></div></article>)}</div><div className="mt-12 grid gap-6 md:grid-cols-2"><div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6"><h2 className="text-xl font-extrabold text-slate-950">What can be included</h2><ul className="mt-4 space-y-3">{item.inclusions.map((line) => <li key={line} className="flex gap-3 text-sm text-slate-700"><Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />{line}</li>)}</ul></div><div className="rounded-2xl border border-orange-100 bg-orange-50 p-6"><h2 className="text-xl font-extrabold text-slate-950">Usually not included</h2><ul className="mt-4 space-y-3">{item.exclusions.map((line) => <li key={line} className="flex gap-3 text-sm text-slate-700"><X className="mt-0.5 size-4 shrink-0 text-orange-600" />{line}</li>)}</ul></div></div></div><aside><div className="surface sticky top-6 p-6"><p className="section-kicker">Custom quotation</p><h2 className="mt-2 text-2xl font-extrabold">Plan this journey</h2><p className="mt-3 text-sm leading-6 text-slate-500">No online payment. Share your details and receive a personalised price directly from our team.</p><Link href="#package-enquiry" className="btn btn-primary mt-6 w-full">Request a quote <MessageCircle className="size-4" /></Link></div></aside></div></section>
      <section id="package-enquiry" className="bg-[#edf5fb] section-space scroll-mt-6"><div className="container-shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="section-kicker">Enquire now</p><h2 className="section-title">Make this trip yours</h2><p className="section-copy">Tell us your dates, group size and preferences. We’ll contact you with a customised plan.</p></div><div className="surface p-6 sm:p-8"><EnquiryForm packageName={item.title} /></div></div></section>
    </main>
  );
}
