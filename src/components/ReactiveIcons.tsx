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

type Glyph = { Icon: ComponentType<any>; x: number; y: number; size: number; depth: number; spin: number };

/** Duotone icons scattered across the viewport. Each one drifts toward the pointer by its own depth. */
const glyphs: Glyph[] = [
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
];

/**
 * Fixed, decorative duotone icon layer behind the whole site. The pointer
 * nudges each icon by its own depth (transform only, rAF-throttled, no re-renders).
 * Static under prefers-reduced-motion.
 */
export function ReactiveIcons() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    let px = 0;
    let py = 0;
    const onMove = (event: PointerEvent) => {
      px = event.clientX / window.innerWidth - 0.5;
      py = event.clientY / window.innerHeight - 0.5;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          layer.style.setProperty('--px', px.toFixed(4));
          layer.style.setProperty('--py', py.toFixed(4));
        });
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={layerRef} className="reactive-icons" aria-hidden="true">
      {glyphs.map(({ Icon, x, y, size, depth, spin }, index) => (
        <span
          key={index}
          className="reactive-icon"
          style={
            {
              left: `${x}%`,
              top: `${y}%`,
              '--depth': depth,
              '--spin': `${spin}deg`,
              '--delay': `${-(index * 1.3) % 9}s`,
              fontSize: `${size}rem`
            } as CSSProperties
          }
        >
          <Icon size={1} aria-hidden={true} />
        </span>
      ))}
    </div>
  );
}
