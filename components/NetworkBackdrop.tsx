"use client";

import { useEffect, useRef } from "react";

type Node = {
  /** Resting position, normalised to 0..1 of the canvas. */
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Current pointer displacement in px, eased each frame. */
  dx: number;
  dy: number;
  hub?: string;
};

type Packet = { from: number; to: number; t: number; speed: number; alt: boolean };

const HUBS = ["llm", "tools", "memory", "rag", "eval", "user"];
const EXTRA_NODES = 52;
const LINK_DISTANCE = 145;
const MAX_PACKETS = 64;
const POINTER_RADIUS = 150;
const PUSH = 34;

function readTheme() {
  const s = getComputedStyle(document.documentElement);
  return {
    ink: s.getPropertyValue("--foreground").trim() || "#09090b",
    accent: s.getPropertyValue("--accent").trim() || "#047857",
    accent2: s.getPropertyValue("--accent-2").trim() || "#0e7490",
    muted: s.getPropertyValue("--muted").trim() || "#52525b",
    mono: s.getPropertyValue("--font-geist-mono").trim() || "ui-monospace, monospace",
  };
}

function createNodes(): Node[] {
  // Hubs sit on a loose ring; the rest are scattered and drift.
  const hubs: Node[] = HUBS.map((hub, i) => {
    const angle = (i / HUBS.length) * Math.PI * 2 - Math.PI / 2;
    return {
      x: 0.5 + Math.cos(angle) * 0.4,
      y: 0.5 + Math.sin(angle) * 0.42,
      vx: (Math.random() - 0.5) * 0.00012,
      vy: (Math.random() - 0.5) * 0.00012,
      dx: 0,
      dy: 0,
      hub,
    };
  });
  const extra: Node[] = Array.from({ length: EXTRA_NODES }, () => ({
    x: 0.04 + Math.random() * 0.92,
    y: 0.04 + Math.random() * 0.92,
    vx: (Math.random() - 0.5) * 0.0006,
    vy: (Math.random() - 0.5) * 0.0006,
    dx: 0,
    dy: 0,
  }));
  return [...hubs, ...extra];
}

/**
 * Live agent network behind the hero terminal: drifting nodes that link up
 * when close, data packets hopping along the links, and a pointer that pushes
 * nearby nodes aside, connects to them, and gently pulls the whole field.
 */
export default function NetworkBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = createNodes();
    let packets: Packet[] = [];
    let theme = readTheme();
    let width = 0;
    let height = 0;
    let pointer: { x: number; y: number } | null = null;
    let shiftX = 0;
    let shiftY = 0;
    let time = 0;
    let frame = 0;
    let running = false;
    let inView = true;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduceMotion) draw();
    }

    // Screen position of a node, including pointer push and field shift.
    function pos(n: Node) {
      return { x: n.x * width + n.dx + shiftX, y: n.y * height + n.dy + shiftY };
    }

    function step() {
      time += 1;

      // Ease the whole field a little toward the pointer (parallax).
      const targetX = pointer ? (pointer.x - width / 2) * 0.04 : 0;
      const targetY = pointer ? (pointer.y - height / 2) * 0.04 : 0;
      shiftX += (targetX - shiftX) * 0.06;
      shiftY += (targetY - shiftY) * 0.06;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0.02 || n.x > 0.98) n.vx *= -1;
        if (n.y < 0.02 || n.y > 0.98) n.vy *= -1;

        // Push away from the pointer, easing back when it leaves.
        let tx = 0;
        let ty = 0;
        if (pointer) {
          const px = n.x * width + shiftX;
          const py = n.y * height + shiftY;
          const d = Math.hypot(px - pointer.x, py - pointer.y);
          if (d < POINTER_RADIUS && d > 0.01) {
            const force = (1 - d / POINTER_RADIUS) * PUSH;
            tx = ((px - pointer.x) / d) * force;
            ty = ((py - pointer.y) / d) * force;
          }
        }
        n.dx += (tx - n.dx) * 0.12;
        n.dy += (ty - n.dy) * 0.12;
      }
    }

    function neighboursOf(i: number, points: { x: number; y: number }[]) {
      const out: number[] = [];
      for (let j = 0; j < points.length; j++) {
        if (j === i) continue;
        if (Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y) < LINK_DISTANCE) out.push(j);
      }
      return out;
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const points = nodes.map(pos);

      // Links between nearby nodes.
      ctx!.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const d = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
          if (d > LINK_DISTANCE) continue;
          ctx!.globalAlpha = (1 - d / LINK_DISTANCE) * 0.38;
          ctx!.strokeStyle = theme.accent;
          ctx!.beginPath();
          ctx!.moveTo(points[i].x, points[i].y);
          ctx!.lineTo(points[j].x, points[j].y);
          ctx!.stroke();
        }
      }

      // Pointer links.
      if (pointer) {
        for (const p of points) {
          const d = Math.hypot(p.x - pointer.x, p.y - pointer.y);
          if (d > POINTER_RADIUS * 1.15) continue;
          ctx!.globalAlpha = (1 - d / (POINTER_RADIUS * 1.15)) * 0.6;
          ctx!.strokeStyle = theme.accent2;
          ctx!.beginPath();
          ctx!.moveTo(pointer.x, pointer.y);
          ctx!.lineTo(p.x, p.y);
          ctx!.stroke();
        }
        ctx!.globalAlpha = 0.9;
        ctx!.fillStyle = theme.accent2;
        ctx!.beginPath();
        ctx!.arc(pointer.x, pointer.y, 3, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Data packets with a soft halo.
      for (const pk of packets) {
        const a = points[pk.from];
        const b = points[pk.to];
        const x = a.x + (b.x - a.x) * pk.t;
        const y = a.y + (b.y - a.y) * pk.t;
        const color = pk.alt ? theme.accent2 : theme.accent;
        ctx!.fillStyle = color;
        ctx!.globalAlpha = 0.18;
        ctx!.beginPath();
        ctx!.arc(x, y, 6, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.globalAlpha = 0.95;
        ctx!.beginPath();
        ctx!.arc(x, y, 2.3, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Nodes: hubs are larger, pulse, and carry a label.
      ctx!.font = `11px ${theme.mono}`;
      ctx!.textAlign = "center";
      nodes.forEach((n, i) => {
        const p = points[i];
        if (n.hub) {
          const pulse = (time * 0.02 + i) % 1;
          ctx!.globalAlpha = (1 - pulse) * 0.45;
          ctx!.strokeStyle = theme.accent;
          ctx!.lineWidth = 1.2;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, 5 + pulse * 16, 0, Math.PI * 2);
          ctx!.stroke();
          ctx!.globalAlpha = 0.95;
          ctx!.fillStyle = theme.accent;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.globalAlpha = 0.85;
          ctx!.fillStyle = theme.muted;
          ctx!.fillText(n.hub, p.x, p.y - 12);
        } else {
          ctx!.globalAlpha = 0.55;
          ctx!.fillStyle = theme.ink;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, 1.7, 0, Math.PI * 2);
          ctx!.fill();
        }
      });
      ctx!.globalAlpha = 1;

      return points;
    }

    function updatePackets(points: { x: number; y: number }[]) {
      // Spawn new packets on random live links.
      for (let k = 0; k < 2 && packets.length < MAX_PACKETS; k++) {
        if (Math.random() > 0.35) continue;
        const from = Math.floor(Math.random() * nodes.length);
        const options = neighboursOf(from, points);
        if (!options.length) continue;
        packets.push({
          from,
          to: options[Math.floor(Math.random() * options.length)],
          t: 0,
          speed: 0.012 + Math.random() * 0.018,
          alt: Math.random() < 0.35,
        });
      }

      // Advance; on arrival, usually hop on to a neighbour.
      const next: Packet[] = [];
      for (const pk of packets) {
        pk.t += pk.speed;
        if (pk.t < 1) {
          next.push(pk);
          continue;
        }
        if (Math.random() < 0.75) {
          const options = neighboursOf(pk.to, points).filter((j) => j !== pk.from);
          if (options.length) {
            next.push({ ...pk, from: pk.to, to: options[Math.floor(Math.random() * options.length)], t: 0 });
          }
        }
      }
      packets = next;
    }

    function loop() {
      step();
      const points = draw();
      updatePackets(points);
      frame = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduceMotion || !inView || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pointer = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height ? { x, y } : null;
    }

    function onPointerLeave() {
      pointer = null;
    }

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const viewObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    viewObserver.observe(canvas);
    const themeObserver = new MutationObserver(() => {
      theme = readTheme();
      if (reduceMotion) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    if (reduceMotion) draw();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      viewObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block h-full w-full" />;
}
