"use client";

import { useRef } from "react";
import type { PointerEvent, ReactNode } from "react";

const MAX_TILT = 9; // degrees

/**
 * A card that tilts toward the cursor in 3D, with a soft sheen that follows
 * the pointer. Children can use `translateZ` (e.g. the `.depth-*` classes) to
 * sit on raised layers. Touch input and reduced-motion users get a still card.
 */
export default function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    el.style.setProperty("--rx", `${(0.5 - y) * 2 * MAX_TILT}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 2 * MAX_TILT}deg`);
    el.style.setProperty("--sx", `${x * 100}%`);
    el.style.setProperty("--sy", `${y * 100}%`);
    el.dataset.active = "true";
  }

  function onPointerLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.dataset.active = "false";
  }

  return (
    <div className="[perspective:1000px]">
      <div ref={ref} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className={`tilt-card ${className}`}>
        <span aria-hidden className="tilt-sheen" />
        {children}
      </div>
    </div>
  );
}
