"use client";

import { useEffect, useRef } from "react";

const GLYPHS = [
  { text: "</>", top: "10vh", left: "6vw", size: "2.75rem" },
  { text: "{ }", top: "34vh", left: "86vw", size: "2.25rem" },
  { text: "=>", top: "64vh", left: "10vw", size: "2rem" },
  { text: "//", top: "92vh", left: "82vw", size: "2.5rem" },
  { text: "[ ]", top: "128vh", left: "8vw", size: "2.25rem" },
  { text: "&&", top: "162vh", left: "78vw", size: "2rem" },
  { text: "01", top: "196vh", left: "14vw", size: "2.5rem" },
  { text: "</>", top: "228vh", left: "84vw", size: "2rem" },
];

export default function ParallaxBackground() {
  const backRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let ticking = false;

    function apply() {
      const y = window.scrollY;
      if (backRef.current) {
        backRef.current.style.transform = `translate3d(0, ${-y * 0.12}px, 0)`;
      }
      if (frontRef.current) {
        frontRef.current.style.transform = `translate3d(0, ${-y * 0.22}px, 0)`;
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
        <span className="parallax-glow parallax-glow-a" />
        <span className="parallax-glow parallax-glow-b" />
        <span className="parallax-glow parallax-glow-c" />
        <span className="parallax-glow parallax-glow-d" />
      </div>
      <div ref={frontRef} className="parallax-layer">
        {GLYPHS.map((glyph, i) => (
          <span
            key={i}
            className="parallax-glyph"
            style={{ top: glyph.top, left: glyph.left, fontSize: glyph.size }}
          >
            {glyph.text}
          </span>
        ))}
      </div>
    </div>
  );
}
