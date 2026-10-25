"use client";

import { useEffect, useRef } from "react";

export default function ParallaxBackground() {
  const backRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let ticking = false;

    function apply() {
      const y = window.scrollY;
      if (backRef.current) {
        backRef.current.style.transform = `translate3d(0, ${-y * 0.1}px, 0)`;
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    }

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="parallax-bg" aria-hidden>
      <div ref={backRef} className="parallax-layer">
        <span className="parallax-wash parallax-wash-a" />
        <span className="parallax-wash parallax-wash-b" />
        <span className="parallax-wash parallax-wash-c" />
      </div>
    </div>
  );
}
