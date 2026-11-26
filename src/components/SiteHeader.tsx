import { useEffect, useRef, useState } from 'react';
import { HamburgerMenuIcon } from '@solar-icons/react/linear/hamburger-menu';
import { CloseIcon } from '@solar-icons/react/linear/close';
import { ArrowRightUpIcon } from '@solar-icons/react/linear/arrow-right-up';
import { navLinks, site } from '../data/site';

/**
 * Fixed milk-glass header with scroll-spy navigation, a reading progress
 * hairline (transform-only, updated via rAF — no re-renders), and a
 * full-screen mobile menu with Escape support and focus restore.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  // Scroll state + progress bar (no React state churn)
  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY || document.documentElement.scrollTop;
      setScrolled(y > 24);

      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? y / max : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is HTMLElement => el instanceof HTMLElement);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: '-38% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll + Escape to close + focus restore
  useEffect(() => {
    if (!menuOpen) return undefined;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };


    const menu = document.getElementById('mobile-menu');
    const onTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !menu) return;
      const focusables = Array.from(
        menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      ).filter((el) => el.tabIndex !== -1 && el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // Move focus into the menu for keyboard users.
    const firstLink = menu?.querySelector<HTMLElement>('a[href]');
    firstLink?.focus();

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keydown', onTab);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keydown', onTab);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <nav className="site-nav" aria-label="Primary navigation">
          <a className="wordmark" href="#top" aria-label="Ace Yash — home" onClick={closeMenu}>
            Ace&nbsp;Yash<sup>©</sup>
          </a>

          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} aria-current={active === link.href ? 'true' : undefined}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a className="btn btn--solid nav-cta" href={`mailto:${site.email}`}>
            Say hello
            <ArrowRightUpIcon size={16} />
          </a>

          <button
            ref={toggleRef}
            className="nav-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon size={18} /> : <HamburgerMenuIcon size={18} />}
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
          </button>
        </nav>
        <div className="nav-progress" aria-hidden="true">
          <span ref={progressRef} />
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="menu-link"
              href={link.href}
              tabIndex={menuOpen ? 0 : -1}
              onClick={closeMenu}
            >
              <span>{link.label}</span>
              <ArrowRightUpIcon size={22} aria-hidden="true" />
            </a>
          ))}
        </nav>
        <div className="menu-foot">
          <a className="inline-link" href={`mailto:${site.email}`} tabIndex={menuOpen ? 0 : -1}>
            {site.email}
          </a>
          <span>Varanasi, India</span>
        </div>
      </div>
    </>
  );
}
