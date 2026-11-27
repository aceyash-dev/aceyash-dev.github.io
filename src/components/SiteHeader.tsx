import { Glass } from 'glisse';
import { motion } from 'motion/react';
import { Buildings3Icon } from '@solar-icons/react/linear/buildings-3';
import { CodeIcon } from '@solar-icons/react/linear/code';
import { LetterOpenedIcon } from '@solar-icons/react/linear/letter-opened';
import { TextBoldIcon } from '@solar-icons/react/linear/text-bold';
import { navLinks, type PageId } from '../data/site';

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
 * Top bar with current page indicator + floating 4-tab Glisse Liquid Glass
 * bottom dock that expands to display the active tab's name.
 */
export function SiteHeader({ activePage, onSelectPage }: SiteHeaderProps) {
  const currentTab = navLinks.find((link) => link.id === activePage) ?? navLinks[0];

  return (
    <>
      <header className="site-header">
        <div className="site-nav">
          <a
            className="wordmark"
            href="#work"
            aria-label="Ace Yash, home"
            onClick={(e) => {
              e.preventDefault();
              onSelectPage('work');
            }}
          >
            Ace&nbsp;Yash<sup>©</sup>
          </a>
          <span className="site-page-pill" aria-live="polite">
            <span className="site-page-pill__dot" aria-hidden="true" />
            {currentTab.label}
          </span>
        </div>
      </header>

      <nav className="floating-dock-shell" aria-label="Primary navigation">
        <Glass className="glisse-dock">
          <div className="glisse-dock__list" role="tablist" aria-label="Portfolio pages">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={link.label}
                  data-active={isActive ? 'true' : 'false'}
                  className="glisse-dock__item"
                  onClick={() => onSelectPage(link.id)}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="glisse-dock-active-pill"
                      className="glisse-dock__pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="glisse-dock__icon">{icons[link.id]}</span>
                  {isActive ? (
                    <motion.span
                      key={link.id}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="glisse-dock__label"
                    >
                      {link.label}
                    </motion.span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </Glass>
      </nav>
    </>
  );
}
