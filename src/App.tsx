import 'glisse/styles.css';
import './styles/enhancements.css';
import { useCallback, useEffect, useState } from 'react';
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
import { ScrollProgress } from './components/vendor/magicui/ScrollProgress';
import { skillsRail, type PageId } from './data/site';
import { useLenis } from './hooks/useLenis';

function resolvePageFromHash(hash: string): PageId {
  const clean = hash.replace(/^#/, '').toLowerCase();
  if (clean === 'about' || clean === 'ace-base') return 'about';
  if (clean === 'skills') return 'skills';
  if (clean === 'contact') return 'contact';
  return 'work';
}

export default function App() {
  useLenis();
  const [activePage, setActivePage] = useState<PageId>('work');

  const navigate = useCallback((page: PageId, updateHash = true) => {
    setActivePage(page);
    if (typeof window !== 'undefined') {
      if (updateHash && window.location.hash !== `#${page}`) {
        window.history.pushState(null, '', `#${page}`);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash) {
      setActivePage(resolvePageFromHash(window.location.hash));
    }
    const onHashChange = () => {
      setActivePage(resolvePageFromHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <SiteHeader activePage={activePage} onSelectPage={(page) => navigate(page)} />

      <main id="page" tabIndex={-1} className="page-shell">
        <div
          className={`page-view ${activePage === 'work' ? 'page-view--active' : 'page-view--hidden'}`}
          hidden={activePage !== 'work'}
        >
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
          <CommitFeed />
        </div>

        <div
          className={`page-view page-view--sub ${activePage === 'about' ? 'page-view--active' : 'page-view--hidden'}`}
          hidden={activePage !== 'about'}
        >
          <AboutSection />
          <LeadershipSection />
        </div>

        <div
          className={`page-view page-view--sub ${activePage === 'skills' ? 'page-view--active' : 'page-view--hidden'}`}
          hidden={activePage !== 'skills'}
        >
          <SkillsSection />
        </div>

        <div
          className={`page-view page-view--sub ${activePage === 'contact' ? 'page-view--active' : 'page-view--hidden'}`}
          hidden={activePage !== 'contact'}
        >
          <ContactSection />
        </div>
      </main>

      <SiteFooter />
    </MotionConfig>
  );
}
