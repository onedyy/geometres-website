"use client";

import { useReveal } from "@/hooks/useReveal";

/**
 * Mounts the single page-wide reveal observer. Rendering nothing keeps the
 * rest of the page server-rendered.
 */
export function RevealProvider() {
  useReveal();
  return null;
}
