import Link from "next/link";
import { ArrowRight, BadgeCheck, Headphones, MapPinned, Phone, Route, ShieldCheck, Sparkles } from "lucide-react";
import { PopularJourneysCarousel } from "@/components/popular-journeys-carousel";
import { getPublicPackages, getPublicSettings } from "@/lib/store";
import { getGoogleReviews } from "@/lib/google-reviews";

function JourneyCollectionCard({ Icon, title, copy, href, crossBorder }: { Icon: typeof ShieldCheck; title: string; copy: string; href: string; crossBorder?: boolean }) {
  const card = <Link href={href} className="journey-collection-card"><span className="journey-collection-icon"><Icon /></span><span><h3>{title}</h3><p>{copy}</p><span className="journey-collection-link">Explore journey <ArrowRight className="size-4" /></span></span></Link>;
  if (!crossBorder) return card;
  return <div className="journey-cross-border-wrap"><a href="tel:+917545859616" className="journey-card-call"><Phone className="size-4" />Call our travel team</a>{card}</div>;
}

export default async function Home() {
  const [items, settings] = await Promise.all([getPublicPackages(), getPublicSettings()]);
  const reviews = await getGoogleReviews(settings);
  let videoTestimonials: Array<{ name?: string; quote?: string; videoUrl?: string }> = [];
  try { videoTestimonials = JSON.parse(settings.testimonialsJson || "[]") as Array<{ name?: string; quote?: string; videoUrl?: string }>; } catch { videoTestimonials = []; }
  const featured = items.filter((item) => item.featured).slice(0, 3);
  const heroImages = (settings.heroImages || [
    settings.heroImage || "/mitra-travels-hero.png",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2200&q=85",
    "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=2200&q=85",
  ].join("\n")).split(/\r?\n|,/).map((image) => image.trim()).filter(Boolean).slice(0, 6);
  return (
    <main className="home-page">
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
        <div className="feature-strip container-shell grid overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-950/10 md:grid-cols-3">
          {[
            [MapPinned, "01", "Local route knowledge", "Raxaul-based planning for smooth India–Nepal border journeys."],
            [Route, "02", "Flexible itineraries", "Every route can be adjusted for your group, pace and priorities."],
            [Headphones, "03", "Personal assistance", "One dependable team from first enquiry to your final drop."],
          ].map(([Icon, number, title, copy], index) => { const IconComponent = Icon as typeof MapPinned; return <div key={String(title)} className={`feature-item ${index < 2 ? "md:border-r md:border-slate-100" : ""}`}><div className="feature-item-top"><span className="feature-icon"><IconComponent className="size-5" /></span><span className="feature-number">{String(number)}</span></div><h2>{String(title)}</h2><p>{String(copy)}</p></div>; })}
        </div>
      </section>

      <section className="section-space home-benefits"><div className="container-shell"><div className="benefits-heading"><p className="section-kicker">Travel with confidence</p><h2 className="section-title">Why choose Mitra Travels?</h2><p className="section-copy">From your first enquiry to the final drop, our Raxaul-based team keeps every India and Nepal journey comfortable, clear and well supported.</p></div><div className="benefits-grid">{[[ShieldCheck,"Clear quotations","Know what is included before your journey begins, with no confusing surprises."],[MapPinned,"Raxaul border expertise","Practical pickup, border, route and permit support for smooth cross-border travel."],[Headphones,"Personal assistance","One dependable team for families, groups, couples and pilgrimage travellers."],[Route,"Flexible travel plans","Adjust destinations, dates, hotels and sightseeing around your group’s pace."],[BadgeCheck,"Reliable private vehicles","Comfortable transport with fuel, driver coordination and road support."],[Sparkles,"Thoughtful local planning","Nepal temples, Himalayan routes, culture and nature combined with care."]] .map(([Icon,title,copy], index) => { const IconComponent = Icon as typeof ShieldCheck; return <article className="benefit-card" key={String(title)}><span className="benefit-number">{String(index + 1).padStart(2,"0")}</span><span className="benefit-icon"><IconComponent /></span><h3>{String(title)}</h3><p>{String(copy)}</p></article>})}</div></div></section>

      <section className="section-space">
        <div className="container-shell">
          <div className="section-heading-row"><div><p className="section-kicker">Popular journeys</p><h2 className="section-title">Trips travellers ask for most</h2><p className="section-copy">Start with a proven route, then customise the dates, hotel category and sightseeing around your group.</p></div></div>
          <PopularJourneysCarousel items={featured} />
        </div>
      </section>

      <section className="journey-collections section-space"><div className="container-shell"><div className="section-heading-row"><div><p className="section-kicker">Find your kind of journey</p><h2 className="section-title">Travel with a purpose</h2><p className="section-copy">Whether you are seeking darshan, Himalayan views or an easy family road trip, we shape the route around you.</p></div></div><div className="journey-collection-grid">{[[ShieldCheck,"Pilgrimage journeys","Muktinath, Pashupatinath, Janakpur and sacred routes planned with care.","/packages/muktinath-pilgrimage-journey"],[MapPinned,"Heritage & culture","Kathmandu temples, Lumbini, local streets and meaningful experiences.","/packages/kathmandu-pokhara-discovery"],[Sparkles,"Mountains & lakes","Pokhara, Himalayan landscapes and scenic Nepal road journeys.","/packages/kathmandu-pokhara-discovery"],[Route,"Cross-border road trips","Comfortable private travel from Raxaul with practical border support.","/packages"]].map(([Icon,title,copy,href]) => <JourneyCollectionCard key={String(title)} Icon={Icon as typeof ShieldCheck} title={String(title)} copy={String(copy)} href={String(href)} crossBorder={title === "Cross-border road trips"} />)}</div></div></section>

      <section className="bg-[#edf5fb] section-space">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[480px] overflow-hidden rounded-[2rem] bg-[#0a2a50]"><img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85" alt="Himalayan landscape near Nepal travel routes" className="absolute inset-0 h-full w-full object-cover object-center" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-[#06162b]/95 via-[#06162b]/15 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-8 text-white"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">Based in Raxaul</p><p className="mt-2 text-3xl font-extrabold">Closer to the border.<br />Closer to your journey.</p></div></div>
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

      {(reviews.length > 0 || videoTestimonials.length > 0) && <section className="section-space testimonials-section"><div className="container-shell"><div className="section-heading-row"><div><p className="section-kicker">Traveller stories</p><h2 className="section-title">Real journeys. Real experiences.</h2><p className="section-copy">See why travellers choose Mitra Travels for thoughtful Nepal journeys from Raxaul.</p></div></div><div className="testimonials-grid">{reviews.map((review) => <article className="testimonial-card" key={`${review.authorName}-${review.relativeTime}`}><div className="testimonial-stars">{"★".repeat(Math.min(5, review.rating))}</div><p>“{review.text}”</p><strong>{review.authorName}</strong><small>{review.relativeTime}</small></article>)}{videoTestimonials.filter((item) => item.videoUrl).map((item, index) => <article className="testimonial-card testimonial-video" key={item.videoUrl}><video controls preload="metadata" src={item.videoUrl} /><p>{item.quote || "A journey planned with Mitra Travels."}</p><strong>{item.name || `Traveller story ${index + 1}`}</strong></article>)}</div></div></section>}

      <section className="section-space"><div className="container-shell cta-panel"><div><p className="eyebrow text-orange-300">Ready when you are</p><h2 className="mt-4 max-w-2xl text-3xl font-extrabold text-white sm:text-4xl">Tell us where you want to go. We’ll plan the route.</h2><p className="mt-4 max-w-xl text-white/65">Share your travel dates and group size to receive a personalised itinerary and quotation.</p></div><Link href="/contact#enquiry" className="btn btn-primary btn-lg shrink-0">Start an enquiry <ArrowRight className="size-4" /></Link></div></section>
    </main>
  );
}
