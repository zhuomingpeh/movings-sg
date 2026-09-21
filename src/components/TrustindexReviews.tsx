"use client";

import { useEffect, useRef } from "react";

const WIDGET_URL = "https://cdn.trustindex.io/loader.js?f9bb24381059918453064d5bb7e";
let loader: Promise<void> | undefined;

function loadTrustindex() {
  if (!loader) loader = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.trustindex.io/loader.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      script.remove();
      loader = undefined;
      reject(new Error("Reviews could not load"));
    };
    document.head.appendChild(script);
  });
  return loader;
}

export default function TrustindexReviews() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let cancelled = false;
    let started = false;
    const load = async () => {
      if (started) return;
      started = true;
      const widget = document.createElement("div");
      widget.dataset.src = WIDGET_URL;
      container.appendChild(widget);
      try {
        await loadTrustindex();
        if (!cancelled) (window as typeof window & { renderTrustindexWidgets?: () => void }).renderTrustindexWidgets?.();
      } catch {
        if (!cancelled) container.textContent = "Read our customer reviews using the Google reviews link.";
      }
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        void load();
      }
    }, { rootMargin: "250px" });
    observer.observe(container);
    return () => { cancelled = true; observer.disconnect(); container.replaceChildren(); };
  }, []);
  return <div ref={host} className="trustindex-reviews" aria-label="Google customer reviews" />;
}
