import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import ClickSpark from './vendor/reactbits/ClickSpark';
import { TextSwap } from './TextSwap';
import { statusWords } from '../data/site';

type ScrollProgress = ReturnType<typeof useScroll>['scrollYProgress'];

type HeroLetterProps = {
  char: string;
  index: number;
  offset: number;
  progress: ScrollProgress;
  reducedMotion: boolean;
};

function HeroLetter({ char, index, offset, progress, reducedMotion }: HeroLetterProps) {
  const x = useTransform(progress, [0, 1], ['0vw', `${offset}vw`]);

  return (
    <span className="m">
      <motion.span
        className="ltr"
        style={reducedMotion ? undefined : { x }}
        initial={reducedMotion ? false : { y: '108%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.15, delay: 0.24 + index * 0.08, ease: 'easeOut' }}
      >
        {char}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const heroFade = useTransform(scrollYProgress, [0, 0.28, 1], [1, 1, 0]);
  const letters = ['Y', 'A', 'S', 'H'];
  const center = (letters.length - 1) / 2;

  return (
    <ClickSpark
      className="hero-spark"
      style={{ minHeight: '100svh', height: 'auto', width: '100%' }}
      sparkColor={['#ff5a1c', '#ffb07a', '#f2ede4']}
      sparkSize={10}
      sparkRadius={30}
      sparkCount={9}
      sparkWidth={1.4}
      duration={520}
      easing="ease-out"
      shape="streak"
      randomness={0.35}
      gravity={0.08}
      spread={360}
      direction={0}
      glow={0.35}
      ring={false}
      layer="front"
      disabled={reducedMotion}
    >
      <header ref={heroRef} className="hero h-card" id="top">
        <motion.div
          className="hero-top"
          initial={reducedMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          <span>01 / Approach</span>
          <em>Portfolio 2024 — 2026</em>
        </motion.div>

        <div className="hero-spacer" />

        <motion.div style={reducedMotion ? undefined : { opacity: heroFade }}>
          <h1 className="name p-name" aria-label="Yash">
            {letters.map((char, index) => (
              <HeroLetter
                key={char}
                char={char}
                index={index}
                offset={((index - center) / center) * 14}
                progress={scrollYProgress}
                reducedMotion={reducedMotion}
              />
            ))}
          </h1>
          <div className="hero-name-sub">Developer & Founder · Varanasi, India · The Ace Base</div>
        </motion.div>

        <motion.div
          className="hero-foot"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.92, ease: 'easeOut' }}
        >
          <p className="hero-note">
            Developer and founder from <em>Varanasi</em>,{' '}
            <TextSwap words={statusWords} className="hero-status" /> thoughtful products at{' '}
            <a href="https://ace-base.cc" target="_blank" rel="noreferrer">The Ace Base</a>.
          </p>
          <div className="hero-marker">
            <span>Fall inward</span>
            <span className="arrow" aria-hidden="true">
              ↓
            </span>
          </div>
        </motion.div>
      </header>
    </ClickSpark>
  );
}
