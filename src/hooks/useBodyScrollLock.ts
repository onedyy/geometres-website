"use client";

import { useEffect } from "react";

/**
 * Locks background scrolling while an overlay is open, compensating for the
 * scrollbar so the layout does not shift.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    const previousPadding = body.style.paddingRight;

    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    body.classList.add("is-locked");

    return () => {
      body.classList.remove("is-locked");
      body.style.paddingRight = previousPadding;
    };
  }, [locked]);
}
