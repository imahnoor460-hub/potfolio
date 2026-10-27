"use client";

import { useEffect } from "react";

/**
 * Gives every element marked `data-tilt` a cursor-driven 3D tilt and passes
 * the cursor position to CSS (--mx/--my) for the hover tint. One delegated
 * listener for the whole page instead of one per card. `data-tilt="4"` sets
 * a gentler maximum angle (default 8°). Off for touch screens and for people
 * who prefer reduced motion; the tint still shows on hover.
 */
export default function TiltEffects() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let current: HTMLElement | null = null;
    let frame = 0;

    function reset(el: HTMLElement) {
      el.style.transform = "";
      el.classList.remove("is-tilting");
    }

    function onMove(event: PointerEvent) {
      const el = (event.target as Element | null)?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (el !== current) {
        if (current) reset(current);
        current = el;
      }
      if (!el) return;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const max = Number(el.dataset.tilt) || 8;
        el.classList.add("is-tilting");
        el.style.transform = `perspective(900px) rotateX(${((0.5 - y) * max).toFixed(2)}deg) rotateY(${((x - 0.5) * max).toFixed(2)}deg) translateY(-4px) scale(1.015)`;
        el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
      });
    }

    function onLeave() {
      if (current) reset(current);
      current = null;
    }

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
