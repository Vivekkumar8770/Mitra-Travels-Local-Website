import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { getPublicPackages, type PublicSettings } from "@/lib/store";

export async function SiteFooter({ settings }: { settings: PublicSettings }) {
  const packages = (await getPublicPackages()).filter((item) => item.featured).slice(0, 4);
  const socialLinks = [[FaFacebookF, "Facebook", settings.footerFacebook], [FaInstagram, "Instagram", settings.footerInstagram], [FaYoutube, "YouTube", settings.footerYoutube], [FaXTwitter, "X / Twitter", settings.footerTwitter]] as const;
  return (
    <footer className="site-footer bg-[#06162b] text-white">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.3fr_0.8fr_1fr_0.9fr]">
        <div><div className="logo-window mb-5"><img src={settings.logoUrl || "/mitra-travels-logo.png"} alt={settings.brandName || "Mitra Travels"} className="logo-art" /></div><p className="max-w-md text-sm leading-7 text-white/65">{settings.footerAbout || "Thoughtfully planned private tours across India and Nepal, with dependable vehicles, flexible itineraries and personal assistance from Raxaul."}</p></div>
        <div><p className="footer-title">Explore</p><div className="mt-4 grid gap-3 text-sm text-white/70"><Link href="/packages">Tour packages</Link><Link href="/about">About us</Link><Link href="/blog">Travel blog</Link><Link href="/faqs">FAQs</Link><Link href="/admin">Admin</Link></div></div>
        <div><p className="footer-title">Popular packages</p><div className="footer-package-links mt-4 grid gap-3 text-sm text-white/70">{packages.map((item) => <Link key={item.slug} href={`/packages/${item.slug}`}>{item.title}</Link>)}{!packages.length && <Link href="/packages">Explore all tour packages</Link>}</div></div>
        <div><p className="footer-title">Contact</p><div className="mt-4 grid gap-4 text-sm text-white/70"><a href={`tel:${settings.phoneRaw}`} className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-orange-400" />{settings.phone}</a><a href={`mailto:${settings.email}`} className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-orange-400" />{settings.email}</a><p className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-orange-400" />{settings.address}</p></div><div className="footer-socials mt-6 flex flex-wrap gap-2">{socialLinks.filter(([, , url]) => Boolean(url)).map(([Icon, label, url]) => <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={`Follow Mitra Travels on ${label}`} title={label}><Icon aria-hidden="true" /></a>)}</div></div>
      </div>
      <div className="border-t border-white/10"><div className="container-shell flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between"><span>{settings.footerCopyright || "© 2026 Mitra Travels. All rights reserved."}</span><span>{settings.footerTagline || "Travel & Tourism Agency · Raxaul, Bihar"}</span></div></div>
    </footer>
  );
}
