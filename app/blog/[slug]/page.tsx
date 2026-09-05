import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { blogPosts } from "@/lib/content";
import { getBlogPostBySlug } from "@/lib/store";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return blogPosts.map((post) => ({ slug: post.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const post = await getBlogPostBySlug(slug); return post ? { title: post.title, description: post.excerpt } : {}; }
export default async function BlogDetail({ params }: Props) { const { slug } = await params; const post = await getBlogPostBySlug(slug); if (!post) notFound(); return <main><article><header className="page-hero"><div className="container-shell page-hero-inner"><Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white"><ArrowLeft className="size-4" />Back to blog</Link><span className="mt-12 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-200">{post.category}</span><h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">{post.title}</h1><p className="mt-5 inline-flex items-center gap-2 text-white/60"><CalendarDays className="size-4" />{new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p></div></header><div className="container-shell section-space"><div className="mx-auto max-w-3xl"><p className="text-xl font-semibold leading-9 text-slate-700">{post.excerpt}</p><p className="mt-8 text-lg leading-9 text-slate-600">{post.content}</p><div className="cta-panel mt-12"><div><p className="text-2xl font-extrabold text-white">Planning a similar journey?</p><p className="mt-2 text-sm leading-6 text-white/65">Tell us your dates and we’ll prepare a route for your group.</p></div><Link href="/contact#enquiry" className="btn btn-primary shrink-0">Request a plan</Link></div></div></div></article></main>; }
