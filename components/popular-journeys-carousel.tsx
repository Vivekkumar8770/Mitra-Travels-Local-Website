"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PackageCard } from "@/components/package-card";
import type { TourPackage } from "@/lib/content";

export function PopularJourneysCarousel({ items }: { items: TourPackage[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || items.length < 2) return;
    const carouselTrack = track;
    const mobile = window.matchMedia("(max-width: 767px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;

    function start() {
      if (!mobile.matches || reducedMotion.matches) return;
      timer = window.setInterval(() => {
        const firstSlide = carouselTrack.querySelector<HTMLElement>(".popular-carousel-slide");
        const step = firstSlide ? firstSlide.offsetWidth + 14 : carouselTrack.clientWidth;
        const atEnd = carouselTrack.scrollLeft + carouselTrack.clientWidth >= carouselTrack.scrollWidth - 4;
        carouselTrack.scrollTo({ left: atEnd ? 0 : carouselTrack.scrollLeft + step, behavior: "smooth" });
      }, 4200);
    }

    function stop() {
      if (timer !== undefined) window.clearInterval(timer);
    }

    start();
    mobile.addEventListener("change", stop);
    reducedMotion.addEventListener("change", stop);
    return () => { stop(); mobile.removeEventListener("change", stop); reducedMotion.removeEventListener("change", stop); };
  }, [items.length]);

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
