"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { PublicSettings } from "@/lib/store";

const links = [["Home", "/"], ["Packages", "/packages"], ["About Us", "/about"], ["Blog", "/blog"], ["FAQs", "/faqs"], ["Contact", "/contact"]];
const professionalTopStripText = "Thoughtfully planned India & Nepal journeys from Raxaul";

function Logo({ settings }: { settings: PublicSettings }) {
  return <Link href="/" aria-label="Mitra Travels home" className="logo-window"><img src={settings.logoUrl || "/mitra-travels-logo.png"} alt={settings.brandName || "Mitra Travels"} className="logo-art" /></Link>;
}

export function SiteHeader({ settings }: { settings: PublicSettings }) {
  const topStripText = settings.topStripText === "Private India & Nepal tours from Raxaul" ? professionalTopStripText : settings.topStripText || settings.headerTagline || professionalTopStripText;
  const pathname = usePathname();
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  const socialLinks = [[FaFacebookF, "Facebook", settings.footerFacebook], [FaInstagram, "Instagram", settings.footerInstagram], [FaYoutube, "YouTube", settings.footerYoutube], [FaXTwitter, "X / Twitter", settings.footerTwitter]] as const;
  return (
    <header className="site-header">
      <div className="top-strip"><div className="container-shell flex items-center justify-between gap-4 py-2 text-xs sm:text-sm"><span>{topStripText}</span><a href={`tel:${settings.phoneRaw}`} className="inline-flex items-center gap-2 font-semibold"><Phone className="size-3.5" /> Call / WhatsApp: {settings.phone}</a></div></div>
      <div className="header-main container-shell flex h-20 items-center justify-between gap-5">
        <Logo settings={settings} />
        <nav className="nav-shell hidden items-center gap-7 lg:flex" aria-label="Main navigation">{links.map(([label, href]) => <Link key={href} href={href} className={`nav-link ${isActive(href) ? "is-active" : ""}`} aria-current={isActive(href) ? "page" : undefined}>{label}</Link>)}</nav>
      <div className="header-actions hidden items-center gap-3 sm:flex"><div className="header-socials">{socialLinks.filter(([, , url]) => Boolean(url)).map(([Icon, label, url]) => <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={`Follow Mitra Travels on ${label}`} title={label}><Icon aria-hidden="true" /></a>)}</div><a href={`https://wa.me/${settings.phoneRaw.replace("+", "")}`} className="btn btn-outline">WhatsApp</a><Link href="/contact#enquiry" className="btn btn-primary">Plan my trip</Link></div>
        <Sheet>
          <SheetTrigger className="grid size-11 place-items-center rounded-full border border-white/20 text-white lg:hidden" aria-label="Open navigation"><Menu className="size-5" /></SheetTrigger>
            <SheetContent className="mobile-menu-sheet border-l-white/10 bg-[#06162b] text-white">
            <SheetHeader className="mobile-menu-header"><span className="mobile-menu-eyebrow">Mitra Travels</span><SheetTitle className="text-white">Explore your next journey</SheetTitle><p>India & Nepal tours, planned around you.</p></SheetHeader>
            <nav className="mobile-menu-nav flex flex-col px-4" aria-label="Mobile navigation">{links.map(([label, href]) => <SheetClose key={href} asChild><Link href={href} className={`mobile-nav-link ${isActive(href) ? "is-active" : ""}`} aria-current={isActive(href) ? "page" : undefined}><span>{label}</span><b aria-hidden="true">→</b></Link></SheetClose>)}</nav>
            <div className="mobile-menu-actions mt-auto space-y-3 p-4"><div className="mobile-socials">{socialLinks.filter(([, , url]) => Boolean(url)).map(([Icon, label, url]) => <a key={label} href={url} target="_blank" rel="noreferrer"><Icon aria-hidden="true" /><span>{label}</span></a>)}</div><a href={`tel:${settings.phoneRaw}`} className="btn btn-outline w-full">Call {settings.phone}</a><SheetClose asChild><Link href="/contact#enquiry" className="btn btn-primary w-full">Plan my trip</Link></SheetClose></div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
