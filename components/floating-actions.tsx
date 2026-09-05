"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import type { PublicSettings } from "@/lib/store";

export function FloatingActions({ settings }: { settings: PublicSettings }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className={`floating-actions ${visible ? "is-visible" : ""}`}>
      <a className="floating-action floating-whatsapp" href={`https://wa.me/${settings.phoneRaw.replace("+", "")}`} target="_blank" rel="noreferrer" aria-label="Chat with Mitra Travels on WhatsApp" title="Chat on WhatsApp">
        <FaWhatsapp aria-hidden="true" />
      </a>
      <button className="floating-action floating-top" type="button" onClick={scrollToTop} aria-label="Scroll to top" title="Back to top">
        <ArrowUp aria-hidden="true" />
      </button>
    </div>
  );
}
