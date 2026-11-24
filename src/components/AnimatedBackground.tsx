import { useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from 'motion/react';

export function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = Boolean(useReducedMotion());

  const scale = useTransform(scrollYProgress, (progress) => 1 + Math.sin(progress * Math.PI) * 0.06);
  const y = useTransform(scrollYProgress, (progress) => `${Math.sin(progress * Math.PI) * -3}vh`);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 55, damping: 18, mass: 0.6 });
  const springY = useSpring(pointerY, { stiffness: 55, damping: 18, mass: 0.6 });
  const orbX = useTransform(springX, [-1, 1], [-22, 22]);
  const orbY = useTransform(springY, [-1, 1], [-16, 16]);
  const counterX = useTransform(springX, [-1, 1], [14, -14]);
  const counterY = useTransform(springY, [-1, 1], [10, -10]);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 2);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [pointerX, pointerY, reducedMotion]);

  return (
    <>
      <motion.div className="bg" style={reducedMotion ? undefined : { scale, y }} aria-hidden="true" />
      <div className="ambient" aria-hidden="true">
        <motion.div className="ambient__orb ambient__orb--one" style={{ x: orbX, y: orbY }} />
        <motion.div className="ambient__orb ambient__orb--two" style={{ x: counterX, y: counterY }} />
        <div className="ambient__grid" />
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
