import { useEffect, useRef, type CSSProperties } from 'react';

export type DitherMode = 'bayer' | 'bayer4' | 'bayer2' | 'halftone' | 'lines' | 'crosshatch' | 'noise' | 'none';
export type MouseEffect = 'erase' | 'reveal' | 'ripple';

export type DitherProps = {
  waveColor?: string | [number, number, number];
  backgroundColor?: string | [number, number, number];
  ditherMode?: DitherMode;
  colorNum?: number;
  pixelSize?: number;
  scale?: number;
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  contrast?: number;
  brightness?: number;
  enableMouseInteraction?: boolean;
  mouseEffect?: MouseEffect;
  mouseRadius?: number;
  mouseStrength?: number;
  clickRipple?: boolean;
  disableAnimation?: boolean;
  dpr?: number;
  className?: string;
  style?: CSSProperties;
};

const BAYER_8X8 = [
  0, 32, 8, 40, 2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44, 4, 36, 14, 46, 6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
  3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47, 7, 39, 13, 45, 5, 37,
  63, 31, 55, 23, 61, 29, 53, 21
];

function parseColor(c: string | [number, number, number], fallback: [number, number, number]): [number, number, number] {
  if (Array.isArray(c)) {
    return [Math.round(c[0] * 255), Math.round(c[1] * 255), Math.round(c[2] * 255)];
  }
  const hex = c.trim().replace('#', '');
  if (hex.length === 6) {
    const n = parseInt(hex, 16);
    if (!Number.isNaN(n)) return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  return fallback;
}

/**
 * ReactBits Dither: retro Bayer 8x8 dithered wave background with pointer interaction.
 */
export default function Dither({
  waveColor = '#f07836',
  backgroundColor = 'transparent',
  ditherMode = 'bayer',
  colorNum = 4,
  pixelSize = 3,
  scale = 1,
  waveSpeed = 0.05,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  contrast = 1,
  brightness = 0,
  enableMouseInteraction = true,
  mouseEffect = 'ripple',
  mouseRadius = 1,
  mouseStrength = 1,
  clickRipple = true,
  disableAnimation = false,
  className = '',
  style
}: DitherProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fg = parseColor(waveColor, [240, 120, 54]);
    const isTransparent = backgroundColor === 'transparent';
    const bg = isTransparent ? [247, 244, 236] : parseColor(backgroundColor, [247, 244, 236]);

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let imgData: ImageData | null = null;
    let rafId = 0;
    let startTime = performance.now();

    const pointer = { x: -1, y: -1, active: false };
    const ripples: Array<{ x: number; y: number; t: number }> = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      const pSize = Math.max(1, pixelSize);
      cols = Math.max(1, Math.ceil(width / pSize));
      rows = Math.max(1, Math.ceil(height / pSize));
      canvas.width = cols;
      canvas.height = rows;
      imgData = ctx.createImageData(cols, rows);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      if (!enableMouseInteraction) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / Math.max(1, rect.width);
      pointer.y = (e.clientY - rect.top) / Math.max(1, rect.height);
      pointer.active = true;
    };

    const onLeave = () => {
      pointer.active = false;
    };

    const onDown = (e: PointerEvent) => {
      if (!enableMouseInteraction || !clickRipple) return;
      const rect = canvas.getBoundingClientRect();
      ripples.push({
        x: (e.clientX - rect.left) / Math.max(1, rect.width),
        y: (e.clientY - rect.top) / Math.max(1, rect.height),
        t: performance.now()
      });
      if (ripples.length > 4) ripples.shift();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });

    const render = (now: number) => {
      if (!imgData) return;
      const data = imgData.data;
      const t = (disableAnimation || reduced) ? 0 : ((now - startTime) * 0.001) * (waveSpeed * 12);
      const levels = Math.max(2, colorNum);

      for (let y = 0; y < rows; y++) {
        const ny = y / rows;
        for (let x = 0; x < cols; x++) {
          const nx = x / cols;
          let u = nx * waveFrequency * scale;
          let v = ny * waveFrequency * scale;

          if (enableMouseInteraction && pointer.active) {
            const dx = nx - pointer.x;
            const dy = ny - pointer.y;
            const dist = Math.hypot(dx, dy);
            const rad = 0.22 * mouseRadius;
            if (dist < rad) {
              const falloff = (1 - dist / rad) * mouseStrength;
              if (mouseEffect === 'ripple') {
                u += Math.sin(dist * 28 - t * 2) * 0.18 * falloff;
                v += Math.cos(dist * 28 - t * 2) * 0.18 * falloff;
              } else if (mouseEffect === 'erase') {
                u -= falloff * 0.6;
              } else {
                u += falloff * 0.6;
              }
            }
          }

          for (let r = 0; r < ripples.length; r++) {
            const rp = ripples[r];
            const age = (now - rp.t) * 0.001;
            if (age < 1.6) {
              const d = Math.hypot(nx - rp.x, ny - rp.y);
              const ring = Math.exp(-Math.pow((d - age * 0.45) * 14, 2));
              u += ring * 0.22 * (1 - age / 1.6);
            }
          }

          const w1 = Math.sin(u * 1.4 + t + Math.cos(v * 1.1 - t * 0.7));
          const w2 = Math.cos(v * 1.7 - t * 0.8 + Math.sin(u * 0.9 + t * 0.5));
          let val = 0.5 + (w1 * 0.55 + w2 * 0.45) * waveAmplitude * 1.35;
          val = (val - 0.5) * contrast + 0.5 + brightness;
          val = Math.max(0, Math.min(1, val));

          let threshold = 0.5;
          if (ditherMode === 'bayer' || ditherMode === 'bayer4' || ditherMode === 'bayer2') {
            threshold = BAYER_8X8[((y & 7) << 3) | (x & 7)] / 64;
          } else if (ditherMode === 'halftone') {
            threshold = ((Math.sin(x * 1.2) + Math.cos(y * 1.2)) * 0.25) + 0.5;
          } else if (ditherMode === 'lines') {
            threshold = (y % 3) / 3;
          } else if (ditherMode === 'noise') {
            threshold = ((Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1 + 1) % 1;
          }

          const quantized = Math.floor(val * (levels - 1) + threshold) / (levels - 1);
          const mix = Math.max(0, Math.min(1, quantized));
          const idx = (y * cols + x) * 4;

          if (isTransparent) {
            data[idx] = fg[0];
            data[idx + 1] = fg[1];
            data[idx + 2] = fg[2];
            data[idx + 3] = Math.round(mix * 255);
          } else {
            data[idx] = Math.round(bg[0] + (fg[0] - bg[0]) * mix);
            data[idx + 1] = Math.round(bg[1] + (fg[1] - bg[1]) * mix);
            data[idx + 2] = Math.round(bg[2] + (fg[2] - bg[2]) * mix);
            data[idx + 3] = 255;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      if (!disableAnimation && !reduced) {
        rafId = window.requestAnimationFrame(render);
      }
    };

    rafId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [
    waveColor,
    backgroundColor,
    ditherMode,
    colorNum,
    pixelSize,
    scale,
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    contrast,
    brightness,
    enableMouseInteraction,
    mouseEffect,
    mouseRadius,
    mouseStrength,
    clickRipple,
    disableAnimation
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`reactbits-dither ${className}`.trim()}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        imageRendering: 'pixelated',
        ...style
      }}
      aria-hidden="true"
    />
  );
}
