"use client";

import { useEffect } from "react";

/**
 * Single IntersectionObserver for every `[data-reveal]` element on the page.
 * One observer instead of per-component listeners, and it disconnects itself
 * once everything has been revealed. Elements are revealed immediately when
 * the user prefers reduced motion.
 */
export function useReveal() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (nodes.length === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.setAttribute("data-reveal", "in"));
      return;
    }

    let remaining = nodes.length;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-reveal", "in");
          observer.unobserve(entry.target);
          remaining -= 1;
        }
        if (remaining <= 0) observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}
