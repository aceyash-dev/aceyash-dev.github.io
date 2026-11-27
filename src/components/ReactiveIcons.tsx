import { useEffect, useRef, type ComponentType, type CSSProperties } from 'react';
import { RocketIcon } from '@solar-icons/react/bold-duotone/rocket';
import { CodeSquareIcon } from '@solar-icons/react/bold-duotone/code-square';
import { CupIcon } from '@solar-icons/react/bold-duotone/cup';
import { HeadphonesRoundIcon } from '@solar-icons/react/bold-duotone/headphones-round';
import { LightbulbIcon } from '@solar-icons/react/bold-duotone/lightbulb';
import { MoonIcon } from '@solar-icons/react/bold-duotone/moon';
import { GhostIcon } from '@solar-icons/react/bold-duotone/ghost';
import { SmartphoneIcon } from '@solar-icons/react/bold-duotone/smartphone';
import { StarShineIcon } from '@solar-icons/react/bold-duotone/star-shine';
import { FireIcon } from '@solar-icons/react/bold-duotone/fire';
import { CameraIcon } from '@solar-icons/react/bold-duotone/camera';
import { HeartIcon } from '@solar-icons/react/bold-duotone/heart';
import { BoltIcon } from '@solar-icons/react/bold-duotone/bolt';
import { PenIcon } from '@solar-icons/react/bold-duotone/pen';
import { PlanetIcon } from '@solar-icons/react/bold-duotone/planet';
import { CpuBoltIcon } from '@solar-icons/react/bold-duotone/cpu-bolt';
import { GamepadIcon } from '@solar-icons/react/bold-duotone/gamepad';
import { PaletteIcon } from '@solar-icons/react/bold-duotone/palette';
import { MusicNoteIcon } from '@solar-icons/react/bold-duotone/music-note';
import { Ufo3Icon } from '@solar-icons/react/bold-duotone/ufo-3';
import { StarsMinimalisticIcon } from '@solar-icons/react/bold-duotone/stars-minimalistic';

type Glyph = { Icon: ComponentType<any>; x: number; y: number; size: number; depth: number; spin: number; drift: number };

/** Duotone icons scattered across the viewport. Each one drifts toward the pointer by its own depth. */
const glyphs: Glyph[] = ([
  { Icon: RocketIcon, x: 5, y: 12, size: 2.4, depth: 22, spin: -8 },
  { Icon: CodeSquareIcon, x: 18, y: 58, size: 2.2, depth: 14, spin: 6 },
  { Icon: CupIcon, x: 30, y: 24, size: 2, depth: 18, spin: 4 },
  { Icon: HeadphonesRoundIcon, x: 46, y: 8, size: 2.1, depth: 26, spin: -5 },
  { Icon: LightbulbIcon, x: 62, y: 44, size: 2.2, depth: 12, spin: 7 },
  { Icon: MoonIcon, x: 80, y: 16, size: 2.3, depth: 20, spin: -6 },
  { Icon: GhostIcon, x: 92, y: 62, size: 2.4, depth: 16, spin: 5 },
  { Icon: SmartphoneIcon, x: 10, y: 84, size: 2.2, depth: 24, spin: -4 },
  { Icon: StarShineIcon, x: 36, y: 90, size: 1.8, depth: 10, spin: 9 },
  { Icon: FireIcon, x: 70, y: 86, size: 2, depth: 18, spin: -7 },
  { Icon: CameraIcon, x: 54, y: 66, size: 2.1, depth: 14, spin: 3 },
  { Icon: HeartIcon, x: 88, y: 34, size: 1.8, depth: 22, spin: -5 },
  { Icon: BoltIcon, x: 24, y: 40, size: 1.9, depth: 12, spin: 6 },
  { Icon: PenIcon, x: 40, y: 76, size: 2, depth: 16, spin: -3 },
  { Icon: PlanetIcon, x: 76, y: 6, size: 2.4, depth: 20, spin: 4 },
  { Icon: CpuBoltIcon, x: 2, y: 36, size: 2.1, depth: 18, spin: -6 },
  { Icon: GamepadIcon, x: 96, y: 86, size: 2, depth: 24, spin: 5 },
  { Icon: PaletteIcon, x: 60, y: 28, size: 1.9, depth: 10, spin: -4 },
  { Icon: MusicNoteIcon, x: 14, y: 70, size: 1.8, depth: 20, spin: 8 },
  { Icon: Ufo3Icon, x: 50, y: 52, size: 2.2, depth: 26, spin: -6 },
  { Icon: StarsMinimalisticIcon, x: 84, y: 76, size: 1.9, depth: 14, spin: 4 }
]).map((g, i) => ({ ...g, depth: g.depth * 2.4, drift: 0.04 + (i % 4) * 0.035 }));

/**
 * Site-wide decorative duotone layer. Three motions, all transform-only:
 *  - entrance: staggered spring-in on mount
 *  - pointer: eased (lerped) drift toward the cursor, scaled by each icon's depth
 *  - scroll: each icon moves at its own rate as the page scrolls (parallax)
 * One rAF loop runs only while values are still settling. Static under reduced motion.
 */
export function ReactiveIcons() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const target = { x: 0, y: 0, s: 0 };
    const current = { x: 0, y: 0, s: 0 };
    let frame = 0;

    const tick = () => {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      current.s += (target.s - current.s) * 0.08;
      layer.style.setProperty('--px', current.x.toFixed(4));
      layer.style.setProperty('--py', current.y.toFixed(4));
      layer.style.setProperty('--sy', current.s.toFixed(2));
      const settled =
        Math.abs(target.x - current.x) < 0.0005 &&
        Math.abs(target.y - current.y) < 0.0005 &&
        Math.abs(target.s - current.s) < 0.05;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX / window.innerWidth - 0.5;
      target.y = event.clientY / window.innerHeight - 0.5;
      kick();
    };
    const onScroll = () => {
      target.s = window.scrollY;
      kick();
    };

    onScroll();
    current.s = target.s;
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    kick();
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={layerRef} className="reactive-icons" aria-hidden="true">
      {glyphs.map(({ Icon, x, y, size, depth, spin, drift }, index) => (
        <span
          key={index}
          className="reactive-icon"
          style={
            {
              left: `${x}%`,
              top: `${y}%`,
              '--depth': depth,
              '--spin': `${spin}deg`,
              '--drift': drift,
              '--delay': `${index * 0.07}s`,
              '--float': `${7 + (index % 5) * 1.3}s`,
              fontSize: `${size}rem`
            } as CSSProperties
          }
        >
          <span className="reactive-icon__inner">
            <Icon size={1} aria-hidden={true} />
          </span>
        </span>
      ))}
    </div>
  );
}
