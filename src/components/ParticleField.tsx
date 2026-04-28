import { useEffect, useRef } from 'react';

const SPACING = 36;
const FALLOFF = 160;
const SPRING = 0.06;
const FRICTION = 0.86;
const PUSH = 0.5;
const LINK_DIST = 56;

type Particle = {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const colors = { accent: '#cf6679', base: '#ffffff' };
    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      const a = styles.getPropertyValue('--accent').trim();
      const t = styles.getPropertyValue('--text').trim();
      if (a) colors.accent = a;
      if (t) colors.base = t;
    };
    readColors();
    const themeObserver = new MutationObserver(readColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    let particles: Particle[] = [];
    const cursor = { x: -9999, y: -9999, inside: false };
    let infl = new Float32Array(0);

    const buildGrid = (w: number, h: number) => {
      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      const offX = (w - (cols - 1) * SPACING) / 2;
      const offY = (h - (rows - 1) * SPACING) / 2;
      particles = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const hx = offX + c * SPACING;
          const hy = offY + r * SPACING;
          particles.push({ hx, hy, x: hx, y: hy, vx: 0, vy: 0 });
        }
      }
      infl = new Float32Array(particles.length);
    };

    const resize = (w: number, h: number) => {
      if (w === 0 || h === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid(w, h);
    };

    const drawStatic = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = colors.base;
      ctx.globalAlpha = 0.5;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let rafId = 0;
    let visible = true;

    const tick = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = cursor.inside ? cursor.x : -9999;
      const cy = cursor.inside ? cursor.y : -9999;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let influence = 0;
        if (cursor.inside) {
          const dx = p.x - cx;
          const dy = p.y - cy;
          const dist = Math.hypot(dx, dy);
          if (dist < FALLOFF) {
            const f = 1 - dist / FALLOFF;
            influence = f;
            if (dist > 0.001) {
              const inv = 1 / dist;
              p.vx += dx * inv * f * PUSH;
              p.vy += dy * inv * f * PUSH;
            }
          }
        }
        infl[i] = influence;

        p.vx += (p.hx - p.x) * SPRING;
        p.vy += (p.hy - p.y) * SPRING;
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;
      }

      if (cursor.inside) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = colors.accent;
        for (let i = 0; i < particles.length; i++) {
          if (infl[i] < 0.1) continue;
          const a = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            if (infl[j] < 0.1) continue;
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 > LINK_DIST * LINK_DIST) continue;
            const d = Math.sqrt(d2);
            const linkAlpha = (1 - d / LINK_DIST) * Math.min(infl[i], infl[j]) * 0.7;
            if (linkAlpha < 0.04) continue;
            ctx.globalAlpha = linkAlpha;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        ctx.globalAlpha = 1;
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const f = infl[i];
        const radius = 2 + f * 3;
        const alpha = 0.5 + f * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = f > 0.05 ? colors.accent : colors.base;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (visible) rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cursor.x = x;
      cursor.y = y;
      cursor.inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
    };
    const onLeave = () => {
      cursor.inside = false;
    };

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const cr = entry.contentRect;
      resize(cr.width, cr.height);
      if (reduced) drawStatic();
    });
    ro.observe(canvas);

    if (!reduced) {
      rafId = requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = visible;
        visible = entry.isIntersecting;
        if (visible && !wasVisible && !reduced) {
          rafId = requestAnimationFrame(tick);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 -z-10 size-full" />;
}
