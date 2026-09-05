import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle, Minus, Phone, Plus, ShieldCheck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getPublicFaqs, getPublicSettings } from "@/lib/store";

export const metadata: Metadata = { title: "Nepal Tour FAQs | Packages, Hotels & Transport | Mitra Travels", description: "Find answers about Nepal tour packages from Raxaul, custom itineraries, hotels, transport, quotations and the Mitra Travels enquiry process.", keywords: ["Nepal tour FAQs", "Raxaul travel questions", "Nepal package hotel inclusion", "Raxaul car rental FAQ"], alternates: { canonical: "/faqs" } };
export default async function FaqPage() {
	const [faqs, settings] = await Promise.all([getPublicFaqs(), getPublicSettings()]);
	const phone = settings.phone || "+91 75458 59616";
	const phoneRaw = settings.phoneRaw || "917545859616";
	const whatsappUrl = `https://wa.me/${phoneRaw.replace("+", "")}`;

	return <main className="faq-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }) }} />
		<section className="page-hero faq-hero"><div className="container-shell page-hero-inner"><p className="eyebrow text-orange-300">Before you travel</p><h1>Frequently Asked Questions</h1><p>Clear answers about custom packages, hotels, transport, quotations and the enquiry process.</p></div></section>
		<section className="faq-intro"><div className="container-shell"><p className="section-kicker">Plan with confidence</p><h2>Common Questions, Clear Answers</h2><p>Everything you need to know before planning your journey with Mitra Travels.</p></div></section>
		<section className="faq-main-section"><div className="container-shell faq-layout">
			<aside className="faq-support-card"><span className="faq-support-icon"><ShieldCheck /></span><p className="section-kicker">Need help?</p><h2>Speak directly with our travel team</h2><p>Can’t find the answer you’re looking for? Share your destination, travel dates and number of guests. Our team will help you plan the right itinerary.</p><div className="faq-support-actions"><a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-primary"><MessageCircle />WhatsApp Us</a><a href={`tel:${phoneRaw}`} className="faq-phone-link"><Phone />Call {phone}</a></div></aside>
			<div className="faq-list"><Accordion type="single" collapsible>{faqs.map((item, index) => <AccordionItem key={item.question} value={`faq-${index}`} className="faq-item"><AccordionTrigger className="faq-trigger"><span>{item.question}</span><span className="faq-toggle" aria-hidden="true"><Plus className="faq-icon-plus" /><Minus className="faq-icon-minus" /></span></AccordionTrigger><AccordionContent className="faq-answer">{item.answer}</AccordionContent></AccordionItem>)}</Accordion></div>
		</div></section>
		<section className="faq-cta"><div className="container-shell faq-cta-inner"><div><p className="eyebrow text-orange-300">Your next journey starts here</p><h2>Ready to plan your journey?</h2><p>Tell us where you want to go and we’ll help create a customised India or Nepal tour for you.</p></div><div className="faq-cta-actions"><Link href="/contact#enquiry" className="btn btn-primary">Plan My Trip <ArrowRight /></Link><a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-glass"><MessageCircle />WhatsApp Us</a></div></div></section>
	</main>;
}
