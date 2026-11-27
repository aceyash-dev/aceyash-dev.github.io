import { lazy, Suspense } from 'react';
import { Buildings3Icon } from '@solar-icons/react/linear/buildings-3';
import { CodeIcon } from '@solar-icons/react/linear/code';
import { LetterOpenedIcon } from '@solar-icons/react/linear/letter-opened';
import { TextBoldIcon } from '@solar-icons/react/linear/text-bold';
import { navLinks, type PageId } from '../data/site';

const Dock = lazy(() => import('./vendor/reactbits/Dock'));

type SiteHeaderProps = {
  activePage: PageId;
  onSelectPage: (page: PageId) => void;
};

const icons: Record<PageId, JSX.Element> = {
  work: <CodeIcon size={20} aria-hidden="true" />,
  about: <Buildings3Icon size={20} aria-hidden="true" />,
  skills: <TextBoldIcon size={20} aria-hidden="true" />,
  contact: <LetterOpenedIcon size={20} aria-hidden="true" />
};

/**
 * Site identity and the React Bits floating dock used as the primary navigation.
 * The dock is split into its own chunk to keep the initial bundle within budget.
 */
export function SiteHeader({ activePage, onSelectPage }: SiteHeaderProps) {
  const items = navLinks.map((link) => ({
    label: link.label,
    href: link.href,
    icon: icons[link.id],
    active: activePage === link.id,
    onClick: () => onSelectPage(link.id)
  }));

  return (
    <>
      <header className="site-header">
        <div className="site-nav">
          <a
            className="wordmark"
            href="#work"
            aria-label="Ace Yash, home"
            onClick={(event) => {
              event.preventDefault();
              onSelectPage('work');
            }}
          >
            Ace&nbsp;Yash<sup>©</sup>
          </a>
          <span className="site-page-pill" aria-live="polite">
            <span className="site-page-pill__dot" aria-hidden="true" />
            {navLinks.find((link) => link.id === activePage)?.label ?? 'Work'}
          </span>
        </div>
      </header>

      <nav className="floating-dock-shell" aria-label="Primary navigation">
        <Suspense fallback={null}>
          <Dock
            items={items}
            position="bottom"
            theme="light"
            baseItemSize={48}
            magnification={64}
            distance={128}
            panelHeight={68}
            gap={8}
            roundness={0.58}
            bounce
            autoHide={false}
            showLabels
            showIndicators
            showBadges={false}
            accentColor="var(--orange-deep)"
            className="portfolio-dock"
          />
        </Suspense>
      </nav>
    </>
  );
}
