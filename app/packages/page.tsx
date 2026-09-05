import type { Metadata } from "next";
import { PackageBrowser } from "@/components/package-browser";
import { getPublicPackages } from "@/lib/store";

export const metadata: Metadata = { title: "Nepal Tour Packages from Raxaul | India & Nepal Tours", description: "Explore Nepal tour packages from Raxaul, Raxaul to Kathmandu tours, Pokhara and India travel packages from Mitra Travels." };

export default async function PackagesPage() {
  const items = await getPublicPackages();
  return <main><section className="page-hero"><img className="page-hero-image" src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2200&q=85" alt="Scenic travel landscape" /><div className="page-hero-overlay" /><div className="container-shell page-hero-inner"><p className="eyebrow text-orange-300">Explore with confidence</p><h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">Private tour packages for India & Nepal</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">Use these popular routes as a starting point. We can customise the duration, pickup location, hotels and sightseeing for your group.</p></div></section><section className="section-space"><div className="container-shell"><p className="section-kicker">Choose a destination</p><h2 className="section-title">Where would you like to go?</h2><PackageBrowser items={items} /></div></section></main>;
}
