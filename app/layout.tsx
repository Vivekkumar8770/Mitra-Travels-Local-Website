import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteBreadcrumbBar } from "@/components/site-breadcrumb-bar";
import { FloatingActions } from "@/components/floating-actions";
import { getPublicSettings } from "@/lib/store";

export const metadata: Metadata = {
  title: { default: "Mitra Travels | India & Nepal Tour Packages", template: "%s | Mitra Travels" },
  description: "Mitra Travels is a Raxaul travel agency offering Nepal tour packages, Raxaul to Kathmandu tours, Nepal taxi service, car rental and India to Nepal travel assistance.",
  keywords: ["Nepal tour package from Raxaul", "Raxaul to Kathmandu tour", "Raxaul travel agency", "Raxaul to Nepal taxi service", "car rental in Raxaul", "India to Nepal tour package", "Janakpur tour from Raxaul", "Pokhara tour package from Raxaul", "Nepal yatra from Raxaul", "Nepali car package from Raxaul"],
  icons: {
    icon: "/mitra-travels-logo.png",
    shortcut: "/mitra-travels-logo.png",
    apple: "/mitra-travels-logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getPublicSettings();
  return (
    <html lang="en">
      <body className="antialiased"><SiteHeader settings={settings} /><SiteBreadcrumbBar />{children}<SiteFooter settings={settings} /><FloatingActions settings={settings} /></body>
    </html>
  );
}
