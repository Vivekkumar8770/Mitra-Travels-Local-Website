import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CarFront, CheckCircle2, Hotel, MapPinned, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Mitra Travels | Raxaul Travel Agency for India & Nepal",
  description: "Learn about Mitra Travels, a trusted Raxaul, Bihar travel agency offering Nepal tour packages, taxi service, car rental and complete India-Nepal travel assistance.",
  keywords: ["Raxaul travel agency", "Mitra Travels Raxaul", "Nepal tour package from Raxaul", "Raxaul to Nepal taxi service", "car rental in Raxaul"],
};

const services = [
  [CarFront, "Reliable transport", "Comfortable private vehicles for Raxaul, Nepal and India travel."],
  [Hotel, "Hotels and stays", "Hotel bookings matched to your route, dates and preferred category."],
  [MapPinned, "Complete route support", "Permits, Bhansar, fuel, border assistance and practical trip coordination."],
  [ShieldCheck, "Personal assistance", "Clear quotations and dependable support for families, groups and pilgrims."],
] as const;

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <img className="page-hero-image" src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2200&q=85" alt="Mountain landscape for a Nepal journey" />
        <div className="page-hero-overlay" />
        <div className="container-shell page-hero-inner">
          <p className="eyebrow text-orange-300">About Mitra Travels</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">Your trusted Raxaul travel agency for India and Nepal</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">Mitra Travels, based in Raxaul, Bihar, plans comfortable Nepal tours, India to Nepal journeys and reliable transport for families, groups, couples, corporate travellers and pilgrimage trips.</p>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[500px] overflow-hidden rounded-[2rem]"><img src="https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=1600&q=85" alt="Scenic Nepal road journey planned from Raxaul" className="absolute inset-0 h-full w-full object-cover object-center" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-[#06162b]/85 to-transparent" /><p className="absolute bottom-8 left-8 max-w-sm text-2xl font-extrabold text-white">One dependable partner from Raxaul to your destination.</p></div>
          <div>
            <p className="section-kicker">Travel made straightforward</p>
            <h2 className="section-title">Everything you need for a smooth journey</h2>
            <p className="section-copy">We provide complete end-to-end travel solutions across India and Nepal. From vehicle arrangements and hotel bookings to permits, Bhansar, fuel and guided trips, our team takes care of the details so you can travel with confidence.</p>
            <p className="mt-5 text-base leading-8 text-slate-600">Choose a Nepal tour package from Raxaul, a Raxaul to Kathmandu tour, a Janakpur or Pokhara trip, or a customised Nepal yatra. We also arrange Raxaul to Nepal taxi service and car rental in Raxaul for flexible travel plans.</p>
            <Link href="/contact#enquiry" className="btn btn-primary btn-lg mt-8">Plan your journey <ArrowRight className="size-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-[#edf5fb] section-space">
        <div className="container-shell">
          <p className="section-kicker">What we arrange</p>
          <h2 className="section-title">Practical support at every step</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{services.map(([Icon, title, copy]) => <article key={title} className="rounded-2xl bg-white p-6 shadow-sm"><Icon className="size-6 text-orange-500" /><h3 className="mt-4 text-lg font-bold text-slate-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p></article>)}</div>
        </div>
      </section>

      <section className="section-space"><div className="container-shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr]"><div><p className="section-kicker">Destinations</p><h2 className="section-title">Explore Nepal from the Raxaul border</h2><p className="section-copy">Our routes cover Kathmandu, Pokhara, Lumbini, Chitwan, Manakamana, Mustang, Janakpur and more. We build the itinerary around your dates, group size, hotel preference and travel pace.</p><ul className="mt-7 grid gap-3 sm:grid-cols-2">{["Kathmandu and Pashupatinath", "Pokhara and the Himalayas", "Lumbini and Chitwan", "Janakpur pilgrimage", "Manakamana and Mustang", "India to Nepal tour packages"].map((item) => <li key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-700"><CheckCircle2 className="size-5 shrink-0 text-emerald-600" />{item}</li>)}</ul></div><div className="surface p-8"><p className="section-kicker">Why choose us</p><h2 className="mt-3 text-3xl font-extrabold text-slate-950">Comfort, clarity and local knowledge</h2><p className="mt-4 leading-7 text-slate-600">We share clear inclusions and exclusions before booking. No online payment is collected on this website; our team speaks with you directly and prepares a quotation for your trip.</p><Link href="/contact#enquiry" className="text-link mt-6">Talk to Mitra Travels <ArrowRight className="size-4" /></Link></div></div></section>
    </main>
  );
}
