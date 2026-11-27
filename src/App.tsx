import './styles/enhancements.css';
import { MotionConfig } from 'motion/react';
import { SiteHeader } from './components/SiteHeader';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { LeadershipSection } from './components/LeadershipSection';
import { CommitFeed } from './components/CommitFeed';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { SiteFooter } from './components/SiteFooter';
import { Marquee } from './components/vendor/magicui/Marquee';
import { skillsRail } from './data/site';
import { useLenis } from './hooks/useLenis';

export default function App() {
  useLenis();

  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader />

      <main id="page" tabIndex={-1}>
        <Hero />

        <div className="magic-marquee-shell" aria-hidden="true">
          <Marquee duration="30s" gap="1rem" repeat={3} pauseOnHover>
            {skillsRail.map((skill) => (
              <span className="marquee-pill" key={skill}>
                {skill}
              </span>
            ))}
          </Marquee>
        </div>

        <ProjectGrid />
        <LeadershipSection />
        <CommitFeed />
        <AboutSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </MotionConfig>
  );
}
