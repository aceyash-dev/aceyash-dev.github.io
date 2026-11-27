import { useEffect, useState } from 'react';
import { ArrowRightUpIcon } from '@solar-icons/react/linear/arrow-right-up';
import { Buildings3Icon } from '@solar-icons/react/linear/buildings-3';
import { CodeIcon } from '@solar-icons/react/linear/code';
import { LetterOpenedIcon } from '@solar-icons/react/linear/letter-opened';
import { TextBoldIcon } from '@solar-icons/react/linear/text-bold';
import Dock from './vendor/reactbits/Dock';
import { navLinks } from '../data/site';

/** Floating React Bits navigation with section tracking and keyboard support. */
export function SiteHeader() {
  const [active, setActive] = useState('#work');

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-24% 0px -58% 0px', threshold: [0, 0.15, 0.35, 0.6] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const items = navLinks.map((link) => ({
    label: link.label,
    icon:
      link.href === '#work' ? <CodeIcon size={22} aria-hidden="true" /> :
      link.href === '#activity' ? <ArrowRightUpIcon size={22} aria-hidden="true" /> :
      link.href === '#about' ? <Buildings3Icon size={22} aria-hidden="true" /> :
      link.href === '#skills' ? <TextBoldIcon size={22} aria-hidden="true" /> :
      <LetterOpenedIcon size={22} aria-hidden="true" />,
    active: active === link.href,
    onClick: () => {
      const target = document.getElementById(link.href.slice(1));
      if (!target) return;
      window.history.pushState(null, '', link.href);
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  }));

  return (
    <>
      <header className="site-header">
        <div className="site-nav">
          <a className="wordmark" href="#top" aria-label="Ace Yash, home">Ace&nbsp;Yash<sup>©</sup></a>
        </div>
      </header>
      <nav className="floating-dock-shell" aria-label="Primary navigation">
        <Dock
          items={items}
          position="bottom"
          theme="light"
          baseItemSize={44}
          magnification={56}
          distance={140}
          panelHeight={62}
          gap={8}
          roundness={0.72}
          accentColor="#f07836"
          showLabels
          showIndicators
          tiles
          autoHide={false}
          className="site-dock"
        />
      </nav>
    </>
  );
}
