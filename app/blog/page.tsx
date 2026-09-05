import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { getPublicBlogPosts } from "@/lib/store";

export const metadata: Metadata = { title: "Travel Blog", description: "Helpful India and Nepal travel guides, seasonal tips and road-trip planning advice from Mitra Travels." };

export default async function BlogPage() {
  const posts = await getPublicBlogPosts();
  return <main><section className="page-hero"><div className="container-shell page-hero-inner"><p className="eyebrow text-orange-300">Travel notes</p><h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">Useful guides for better journeys</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">Practical advice for India and Nepal travel—from border preparation to seasonal planning.</p></div></section><section className="section-space"><div className="container-shell grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map((post, index) => <article key={post.slug} className="surface overflow-hidden"><div className={`h-3 ${index === 0 ? "bg-orange-500" : index === 1 ? "bg-blue-600" : "bg-purple-600"}`} /><div className="p-7"><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-600">{post.category}</span><h2 className="mt-5 text-2xl font-extrabold leading-tight text-slate-950">{post.title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{post.excerpt}</p><div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5"><span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500"><CalendarDays className="size-4" />{new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span><Link href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`} className="grid size-10 place-items-center rounded-full bg-[#edf5fb] text-[#0a2a50]"><ArrowUpRight className="size-4" /></Link></div></div></article>)}</div></section></main>;
}
