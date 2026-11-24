import { MotionConfig } from 'motion/react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { ShaderBackground } from './components/ShaderBackground';
import { BentoSection } from './components/BentoSection';
import { SiteHeader } from './components/SiteHeader';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { CommitFeed } from './components/CommitFeed';
import { ProfileSection } from './components/ProfileSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { SiteFooter } from './components/SiteFooter';
import { useLenis } from './hooks/useLenis';

export default function App() {
  useLenis();

  return (
    <MotionConfig reducedMotion="user">
      <m3e-theme color="#e66a2c" scheme="light" motion="expressive" className="m3e-root">
      <ShaderBackground />
      <AnimatedBackground />
      <SiteHeader />

      <main id="page" tabIndex={-1}>
        <Hero />
        <BentoSection />
        <ProjectGrid />
        <CommitFeed />
        <ProfileSection />
        <AboutSection />
        <ContactSection />
      </main>

      <SiteFooter />
      </m3e-theme>
    </MotionConfig>
  );
}
