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
import { skillsRail } from './data/site';
import { useLenis } from './hooks/useLenis';

const rail = [...skillsRail, ...skillsRail];

export default function App() {
  useLenis();

  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader />

      <main id="page" tabIndex={-1}>
        <Hero />

        <div className="skills-rail" aria-hidden="true">
          <div className="skills-track">
            {rail.map((skill, index) => (
              <span key={`${skill}-${index}`}>
                {skill}
                <i>·</i>
              </span>
            ))}
          </div>
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
