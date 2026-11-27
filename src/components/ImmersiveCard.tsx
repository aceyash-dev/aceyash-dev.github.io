import { useRef, type MouseEvent, type ReactNode } from 'react';

type ImmersiveCardProps = {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  maxTilt?: number;
};

/**
 * Immersive, pointer-reactive 3D card with dynamic specular glare,
 * radial spotlight tracking, and spring-like elevation on hover.
 */
export function ImmersiveCard({
  children,
  className = '',
  spotlightColor = 'rgba(240, 120, 54, 0.24)',
  maxTilt = 5
}: ImmersiveCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / Math.max(1, rect.width);
    const py = (e.clientY - rect.top) / Math.max(1, rect.height);
    const rx = (0.5 - py) * (maxTilt * 2);
    const ry = (px - 0.5) * (maxTilt * 2);

    el.style.setProperty('--ic-x', `${(px * 100).toFixed(2)}%`);
    el.style.setProperty('--ic-y', `${(py * 100).toFixed(2)}%`);
    el.style.setProperty('--ic-rx', `${rx.toFixed(2)}deg`);
    el.style.setProperty('--ic-ry', `${ry.toFixed(2)}deg`);
    el.style.setProperty('--ic-spot', spotlightColor);
    el.dataset.hover = 'true';
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--ic-rx', '0deg');
    el.style.setProperty('--ic-ry', '0deg');
    el.dataset.hover = 'false';
  };

  return (
    <div
      ref={ref}
      className={`immersive-card ${className}`.trim()}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-hover="false"
    >
      <span className="immersive-card__glow" aria-hidden="true" />
      <span className="immersive-card__glare" aria-hidden="true" />
      <div className="immersive-card__content">{children}</div>
    </div>
  );
}
