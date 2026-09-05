import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import type { TourPackage } from "@/lib/content";

export function PackageCard({ item }: { item: TourPackage }) {
  return (
    <article className="package-card group">
      <div className="package-image"><img src={item.imageUrl} alt="" /><span className="country-chip">{item.country}</span></div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"><span className="inline-flex items-center gap-1.5"><Clock3 className="size-3.5 text-orange-500" />{item.duration}</span></div>
        <h3 className="mt-3 text-xl font-bold text-slate-950">{item.title}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{item.summary}</p>
        <p className="mt-4 flex items-start gap-2 text-sm text-slate-500"><MapPin className="mt-0.5 size-4 shrink-0 text-orange-500" />{item.route}</p>
        <div className="package-card-action mt-5 border-t border-slate-100 pt-4"><Link href={`/packages/${item.slug}`} className="inline-flex items-center gap-2 font-bold text-[#0a2a50]">View itinerary <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link></div>
      </div>
    </article>
  );
}
