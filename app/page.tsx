import Link from "next/link";
import { ArrowRight, BadgeCheck, Headphones, MapPinned, Route, ShieldCheck, Sparkles } from "lucide-react";
import { PackageCard } from "@/components/package-card";
import { getPublicPackages, getPublicSettings } from "@/lib/store";

export default async function Home() {
  const [items, settings] = await Promise.all([getPublicPackages(), getPublicSettings()]);
  const featured = items.filter((item) => item.featured).slice(0, 3);
  const heroImages = (settings.heroImages || [
    settings.heroImage || "/mitra-travels-hero.png",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2200&q=85",
    "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=2200&q=85",
  ].join("\n")).split(/\r?\n|,/).map((image) => image.trim()).filter(Boolean).slice(0, 6);
  return (
    <main>
      <section className="hero-section">
        {heroImages.map((image, index) => <img key={image} src={image} alt={index === 0 ? "A scenic Himalayan road journey" : "Nepal mountain landscape"} className={`hero-image hero-image-slide hero-image-slide-${index + 1}`} />)}
        <div className="hero-overlay" />
        <div className="container-shell relative z-10 flex min-h-[680px] items-center py-24">
          <div className="max-w-2xl text-white">
            <p className="eyebrow text-orange-300"><Sparkles className="size-4" />{settings.heroEyebrow || "Private journeys, personally planned"}</p>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">{settings.heroTitle}</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/78">{settings.heroSubtitle}</p>
            <div className="mt-9 flex flex-wrap gap-3"><Link href="/packages" className="btn btn-primary btn-lg">{settings.heroPrimaryText || "Explore packages"} <ArrowRight className="size-4" /></Link><Link href="/contact#enquiry" className="btn btn-glass btn-lg">{settings.heroSecondaryText || "Get a custom plan"}</Link></div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-white/75"><span className="inline-flex items-center gap-2"><BadgeCheck className="size-4 text-orange-300" />No online payment</span><span className="inline-flex items-center gap-2"><BadgeCheck className="size-4 text-orange-300" />Direct WhatsApp support</span><span className="inline-flex items-center gap-2"><BadgeCheck className="size-4 text-orange-300" />Custom quotations</span></div>
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-10">
        <div className="container-shell grid overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-950/10 md:grid-cols-3">
          {[
            [MapPinned, "Local route knowledge", "Raxaul-based planning for smooth India–Nepal border journeys."],
            [Route, "Flexible itineraries", "Every route can be adjusted for your group, pace and priorities."],
            [Headphones, "Personal assistance", "One dependable team from first enquiry to your final drop."],
          ].map(([Icon, title, copy], index) => { const IconComponent = Icon as typeof MapPinned; return <div key={String(title)} className={`flex gap-4 p-7 ${index < 2 ? "md:border-r md:border-slate-100" : ""}`}><span className="feature-icon"><IconComponent className="size-5" /></span><div><h2 className="font-bold text-slate-950">{String(title)}</h2><p className="mt-1 text-sm leading-6 text-slate-500">{String(copy)}</p></div></div>; })}
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <div className="section-heading-row"><div><p className="section-kicker">Popular journeys</p><h2 className="section-title">Trips travellers ask for most</h2><p className="section-copy">Start with a proven route, then customise the dates, hotel category and sightseeing around your group.</p></div><Link href="/packages" className="text-link">View all packages <ArrowRight className="size-4" /></Link></div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{featured.map((item) => <PackageCard key={item.slug} item={item} />)}</div>
        </div>
      </section>

      <section className="bg-[#edf5fb] section-space">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[480px] overflow-hidden rounded-[2rem] bg-[#0a2a50]"><img src="/mitra-travels-hero.png" alt="Himalayan landscape" className="absolute inset-0 h-full w-full object-cover object-right" /><div className="absolute inset-0 bg-gradient-to-t from-[#06162b]/95 via-[#06162b]/15 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-8 text-white"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">Based in Raxaul</p><p className="mt-2 text-3xl font-extrabold">Closer to the border.<br />Closer to your journey.</p></div></div>
          <div><p className="section-kicker">Why Mitra Travels</p><h2 className="section-title">Practical planning with a personal touch</h2><p className="section-copy">We focus on dependable transport, sensible day plans and clear communication. You always know what is included before your trip begins.</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">{[
              [ShieldCheck, "Transparent quotations", "Clear inclusions and exclusions, shared directly with you."],
              [MapPinned, "Door-to-border support", "Convenient pickup and drop planning from Raxaul and nearby points."],
              [Route, "Your trip, your pace", "Add or remove destinations and choose the right hotel category."],
              [Headphones, "One point of contact", "Quick support before and during your journey."],
            ].map(([Icon, title, copy]) => { const IconComponent = Icon as typeof ShieldCheck; return <div key={String(title)} className="rounded-2xl bg-white p-5 shadow-sm"><IconComponent className="size-6 text-orange-500" /><h3 className="mt-3 font-bold">{String(title)}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{String(copy)}</p></div>; })}</div>
          </div>
        </div>
      </section>

      <section className="section-space"><div className="container-shell cta-panel"><div><p className="eyebrow text-orange-300">Ready when you are</p><h2 className="mt-4 max-w-2xl text-3xl font-extrabold text-white sm:text-4xl">Tell us where you want to go. We’ll plan the route.</h2><p className="mt-4 max-w-xl text-white/65">Share your travel dates and group size to receive a personalised itinerary and quotation.</p></div><Link href="/contact#enquiry" className="btn btn-primary btn-lg shrink-0">Start an enquiry <ArrowRight className="size-4" /></Link></div></section>
    </main>
  );
}
