import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteBreadcrumbBar } from "@/components/site-breadcrumb-bar";
import { FloatingActions } from "@/components/floating-actions";
import { getPublicSettings } from "@/lib/store";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mitratravels.com"),
  title: { default: "Mitra Travels | India & Nepal Tour Packages", template: "%s | Mitra Travels" },
  description: "Mitra Travels is a Raxaul travel agency offering Nepal tour packages, Raxaul to Kathmandu tours, Nepal taxi service, car rental and India to Nepal travel assistance.",
  keywords: ["Nepal tour package from Raxaul", "Raxaul to Kathmandu tour", "Raxaul travel agency", "Raxaul to Nepal taxi service", "car rental in Raxaul", "India to Nepal tour package", "Janakpur tour from Raxaul", "Pokhara tour package from Raxaul", "Nepal yatra from Raxaul", "Nepali car package from Raxaul"],
  icons: {
    icon: "/mitra-travels-logo.png",
    shortcut: "/mitra-travels-logo.png",
    apple: "/mitra-travels-logo.png",
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Mitra Travels",
    title: "Mitra Travels | India & Nepal Tour Packages",
    description: "Private India and Nepal tours from Raxaul with flexible itineraries, reliable transport and personal travel support.",
    url: "https://www.mitratravels.com/",
    images: [{ url: "/mitra-travels-hero.png", width: 1600, height: 900, alt: "Mitra Travels India and Nepal tour journey" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mitra Travels | India & Nepal Tour Packages",
    description: "Plan a thoughtful India or Nepal journey from Raxaul with Mitra Travels.",
    images: ["/mitra-travels-hero.png"],
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getPublicSettings();
  return (
    <html lang="en">
      <body className="antialiased"><SiteHeader settings={settings} /><SiteBreadcrumbBar />{children}<SiteFooter settings={settings} /><FloatingActions settings={settings} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "TravelAgency", name: "Mitra Travels", url: "https://www.mitratravels.com", logo: "https://www.mitratravels.com/mitra-travels-logo.png", telephone: settings.phone, email: settings.email, address: { "@type": "PostalAddress", streetAddress: settings.address, addressLocality: "Raxaul", addressRegion: "Bihar", postalCode: "845305", addressCountry: "IN" }, areaServed: ["India", "Nepal"], sameAs: [settings.footerFacebook, settings.footerInstagram, settings.footerYoutube, settings.footerTwitter].filter(Boolean) }) }} /></body>
    </html>
  );
}
