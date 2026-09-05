"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PackageCard } from "@/components/package-card";
import type { TourPackage } from "@/lib/content";

export function PopularJourneysCarousel({ items }: { items: TourPackage[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function move(direction: "prev" | "next") {
    trackRef.current?.scrollBy({ left: direction === "next" ? 380 : -380, behavior: "smooth" });
  }

  return (
    <div className="popular-carousel">
      <div className="popular-carousel-controls">
        <span>Curated journeys from Raxaul</span>
        <div className="popular-carousel-actions"><Link href="/packages" className="carousel-view-all">View all packages <ArrowRight /></Link><div className="popular-carousel-arrows"><button type="button" onClick={() => move("prev")} aria-label="Previous popular journey"><ArrowLeft /></button><button type="button" onClick={() => move("next")} aria-label="Next popular journey"><ArrowRight /></button></div></div>
      </div>
      <div className="popular-carousel-track" ref={trackRef}>{items.map((item) => <div className="popular-carousel-slide" key={item.slug}><PackageCard item={item} /></div>)}</div>
    </div>
  );
}
