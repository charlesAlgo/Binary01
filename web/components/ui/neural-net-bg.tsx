"use client";
import { useEffect, useRef } from "react";

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  pulse: number;
  pulseSpeed: number;
}

interface Packet {
  fromNode: number;
  toNode: number;
  progress: number; // 0→1
  speed: number;
}

const ACCENT   = "62,189,122";   // #3EBD7A
const TEAL     = "20,184,166";   // #14B8A6
const NODE_COUNT = 55;
const MAX_DIST   = 180;
const PACKET_SPAWN_CHANCE = 0.003;
const MAX_PACKETS = 18;

export default function NeuralNetBg({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let nodes: Node[] = [];
    let packets: Packet[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width  = canvas.offsetWidth  * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx!.scale(devicePixelRatio, devicePixelRatio);
      initNodes();
    }

    function initNodes() {
      if (!canvas) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2.5 + 1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
      }));
    }

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.28;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${ACCENT},${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Spawn packets
      if (packets.length < MAX_PACKETS && Math.random() < PACKET_SPAWN_CHANCE * nodes.length) {
        const from = Math.floor(Math.random() * nodes.length);
        // Find a connected neighbor
        const neighbors: number[] = [];
        for (let j = 0; j < nodes.length; j++) {
          if (j === from) continue;
          const dx = nodes[from].x - nodes[j].x;
          const dy = nodes[from].y - nodes[j].y;
          if (Math.sqrt(dx * dx + dy * dy) < MAX_DIST) neighbors.push(j);
        }
        if (neighbors.length > 0) {
          packets.push({
            fromNode: from,
            toNode: neighbors[Math.floor(Math.random() * neighbors.length)],
            progress: 0,
            speed: Math.random() * 0.012 + 0.008,
          });
        }
      }

      // Draw & advance packets
      packets = packets.filter(p => p.progress < 1);
      for (const p of packets) {
        p.progress = Math.min(1, p.progress + p.speed);
        const a = nodes[p.fromNode], b = nodes[p.toNode];
        const px = a.x + (b.x - a.x) * p.progress;
        const py = a.y + (b.y - a.y) * p.progress;
        const fade = Math.sin(p.progress * Math.PI);
        // Trail
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${TEAL},${0.85 * fade})`;
        ctx.fill();
        // Glow
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${TEAL},${0.15 * fade})`;
        ctx.fill();
      }

      // Draw nodes
      for (const n of nodes) {
        const glow = Math.sin(n.pulse) * 0.5 + 0.5;
        // Outer glow
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
        grad.addColorStop(0, `rgba(${ACCENT},${0.18 * glow})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT},${0.55 + 0.45 * glow})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
